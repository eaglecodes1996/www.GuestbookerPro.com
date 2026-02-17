import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Search,
  Download,
  FileJson,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Zap,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: string;
  username: string;
  subscriptionTier: string;
  maxProfiles: number;
  maxDiscoveryPerMonth: number;
  discoveryUsedThisMonth: number;
  nextResetDate: string;
};

type ResearchResult = {
  requestId: string;
  query: string;
  status: string;
  results: {
    results: any[];
    summary?: string;
    totalFound?: number;
  };
  resultCount: number;
  tokensUsed: number;
  estimatedCost: number;
  cached?: boolean;
  completedAt: string | null;
};

export default function Research() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [maxResults, setMaxResults] = useState(100);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentResult, setCurrentResult] = useState<ResearchResult | null>(null);

  const { data: authData } = useQuery<{ user: User | null }>({
    queryKey: ["/api/auth/me"],
  });

  const user = authData?.user;

  // Define tier limits for display
  const tierLimits: Record<string, { monthly: number; tokens: number }> = {
    basic: { monthly: 500, tokens: 2000 },
    growth: { monthly: 2000, tokens: 4000 },
    pro: { monthly: 10000, tokens: 8000 },
    agency: { monthly: 999999, tokens: 16000 },
    unlimited: { monthly: 999999, tokens: 16000 },
  };

  const limits = user ? tierLimits[user.subscriptionTier] || tierLimits.basic : tierLimits.basic;
  const remainingSearches = user ? user.maxDiscoveryPerMonth - user.discoveryUsedThisMonth : 0;

  const researchMutation = useMutation({
    mutationFn: async (): Promise<ResearchResult> => {
      if (!query.trim()) {
        throw new Error("Please enter a research query");
      }
      const response = await apiRequest("POST", "/api/research", { query, maxResults });
      return response.json();
    },
    onSuccess: (data: ResearchResult) => {
      setCurrentResult(data);
      
      if (data.cached) {
        toast({
          title: "Research Complete (Cached)",
          description: `Found ${data.resultCount} results from cache. No tokens used.`,
        });
      } else {
        toast({
          title: "Research Complete",
          description: `Found ${data.resultCount} results. Used ${data.tokensUsed} tokens ($${(data.estimatedCost / 100).toFixed(4)})${(data as any).showsCreated ? `. Saved ${(data as any).showsCreated} shows to database.` : ''}`,
        });
      }
      
      // Refresh user data to get updated usage
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
    },
    onError: (error: any) => {
      const errorData = error.response?.data;
      
      if (error.response?.status === 429) {
        const resetDate = new Date(errorData.resetAt);
        toast({
          title: "Monthly Deep Research Quota Exceeded",
          description: `You've used ${errorData.used}/${errorData.limit} research requests this month. Resets on ${resetDate.toLocaleDateString()}.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Research Failed",
          description: error.message || "Failed to complete research. Please try again.",
          variant: "destructive",
        });
      }
      
      // Refresh user data to get updated usage
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const handleExportCSV = () => {
    if (!currentResult || !currentResult.results?.results) return;

    const results = currentResult.results.results;
    if (results.length === 0) {
      toast({
        title: "No Data",
        description: "No results to export",
        variant: "destructive",
      });
      return;
    }

    // Get all unique keys from results
    const allKeys = new Set<string>();
    results.forEach((item: any) => {
      Object.keys(item).forEach((key) => allKeys.add(key));
    });
    const headers = Array.from(allKeys);

    // Build CSV
    const csvRows = [];
    csvRows.push(headers.join(","));

    results.forEach((item: any) => {
      const values = headers.map((header) => {
        const value = item[header];
        // Escape quotes and wrap in quotes if contains comma
        if (value === null || value === undefined) return "";
        const stringValue = String(value).replace(/"/g, '""');
        return stringValue.includes(",") ? `"${stringValue}"` : stringValue;
      });
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `research-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${results.length} results to CSV`,
    });
  };

  const handleExportJSON = () => {
    if (!currentResult || !currentResult.results?.results) return;

    const results = currentResult.results.results;
    if (results.length === 0) {
      toast({
        title: "No Data",
        description: "No results to export",
        variant: "destructive",
      });
      return;
    }

    const jsonContent = JSON.stringify(currentResult.results, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `research-${Date.now()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${results.length} results to JSON`,
    });
  };

  const filteredResults =
    (currentResult?.results?.results || []).filter((item: any) => {
      if (!searchFilter) return true;
      const searchLower = searchFilter.toLowerCase();
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      );
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2" data-testid="text-page-title">
          <Sparkles className="w-8 h-8 text-primary" />
          Deep Research
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered structured research for discovering shows at scale
        </p>
      </div>

      {/* Quota Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4" data-testid="card-monthly-usage">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Monthly Usage</p>
              <p className="text-xl font-bold" data-testid="text-monthly-usage">
                {user ? `${user.discoveryUsedThisMonth}/${user.maxDiscoveryPerMonth}` : '—'}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user && remainingSearches > 0 ? `${remainingSearches} remaining` : user ? 'Quota exceeded' : ''}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Tokens</p>
              <p className="text-xl font-bold">{limits.tokens.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resets In</p>
              <p className="text-xl font-bold" data-testid="text-reset-date">
                {user?.nextResetDate ? `${Math.ceil((new Date(user.nextResetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}d` : '—'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Research Form */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="query">Research Query</Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Example: "List 1,000 active YouTube shows in English about the supernatural, metaphysics, New Age, and occult. Include contact emails, guest policy, subscriber count, and host name if available."'
              className="min-h-32"
              data-testid="textarea-research-query"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Enter a detailed research query. The AI will return structured JSON results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxResults">Max Results</Label>
              <Input
                id="maxResults"
                type="number"
                value={maxResults}
                onChange={(e) => setMaxResults(parseInt(e.target.value) || 100)}
                min={1}
                max={1000}
                data-testid="input-max-results"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => researchMutation.mutate()}
                disabled={researchMutation.isPending || !query.trim()}
                className="w-full gap-2"
                data-testid="button-start-research"
              >
                {researchMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Start Research
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {currentResult && (
        <div className="space-y-4">
          {/* Result Summary */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-semibold">Research Results</h2>
                    {currentResult.cached && (
                      <Badge variant="outline">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Cached
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{currentResult.query}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    className="gap-2"
                    data-testid="button-export-csv"
                  >
                    <Download className="w-4 h-4" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportJSON}
                    className="gap-2"
                    data-testid="button-export-json"
                  >
                    <FileJson className="w-4 h-4" />
                    JSON
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Results</p>
                  <p className="text-2xl font-bold">{currentResult.resultCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tokens Used</p>
                  <p className="text-2xl font-bold">{(currentResult.tokensUsed || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="text-2xl font-bold">${((currentResult.estimatedCost || 0) / 100).toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-sm font-medium">
                    {currentResult.completedAt
                      ? new Date(currentResult.completedAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {currentResult.results?.summary && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Summary</p>
                  <p className="text-sm text-muted-foreground">{currentResult.results.summary}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Search Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter results by any field..."
                className="pl-10"
                data-testid="input-filter-results"
              />
            </div>
            <Badge variant="outline" className="px-4 py-2">
              {filteredResults.length} / {currentResult.resultCount} results
            </Badge>
          </div>

          {/* Results Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {filteredResults.length > 0 &&
                      Object.keys(filteredResults[0]).map((key) => (
                        <TableHead key={key} className="whitespace-nowrap">
                          {key}
                        </TableHead>
                      ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={100} className="text-center py-8 text-muted-foreground">
                        No results found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.map((item: any, index: number) => (
                      <TableRow key={index} data-testid={`row-result-${index}`}>
                        {Object.entries(item).map(([key, value]) => (
                          <TableCell key={key} className="max-w-xs truncate">
                            {String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}

      {/* Help Card */}
      {!currentResult && (
        <Card className="p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold">How Deep Research Works</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enter a detailed research query describing what you're looking for</li>
                <li>• AI analyzes your request and returns structured JSON data</li>
                <li>• Results are cached for 7 days to save tokens on repeated queries</li>
                <li>• Export results as CSV or JSON for further analysis</li>
                <li>• Search and filter results directly in the interface</li>
                <li>• Daily quotas and token limits apply based on your subscription tier</li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
