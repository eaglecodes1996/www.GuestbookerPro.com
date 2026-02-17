import { ShowCard, ShowStatus } from "@/components/show-card";
import { ShowDetailsDialog } from "@/components/show-details-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Filter, Plus, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Show, Profile } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

type PaginatedShowsResponse = {
  shows: Show[];
  total: number;
};

export default function Shows() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [discoveryDialogOpen, setDiscoveryDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResults, setImportResults] = useState<any>(null);
  const [discoveryProgress, setDiscoveryProgress] = useState<{
    active: boolean;
    progress: number;
    message: string;
    found: number;
    target: number;
  }>({ active: false, progress: 0, message: "", found: 0, target: 0 });
  const pageSize = 20;
  const { toast } = useToast();

  const { data: paginatedData, isLoading, isFetching, error } = useQuery<PaginatedShowsResponse>({
    queryKey: ["/api/shows", { status: statusFilter, search: searchQuery, sortBy, page: currentPage }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (searchQuery) params.append("search", searchQuery);
      if (sortBy && sortBy !== "recent") params.append("sortBy", sortBy);
      params.append("limit", pageSize.toString());
      params.append("offset", ((currentPage - 1) * pageSize).toString());
      
      const url = `/api/shows${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch shows");
      return res.json();
    },
  });

  const shows = paginatedData?.shows || [];
  const totalShows = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalShows / pageSize);
  const isPageTransition = isFetching && !isLoading;

  // Reset page to 1 if query fails (e.g., invalid page number)
  useEffect(() => {
    if (error && currentPage > 1) {
      setCurrentPage(1);
      toast({
        title: "Page Load Failed",
        description: "Returned to first page.",
        variant: "destructive",
      });
    }
  }, [error, currentPage, toast]);

  // Reset to page 1 when search, filter, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy]);

  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const updateShowMutation = useMutation({
    mutationFn: async ({ id, status, contactEmail }: { id: string; status?: string; contactEmail?: string }) => {
      const updates: { status?: string; contactEmail?: string } = {};
      if (status !== undefined) updates.status = status;
      if (contactEmail !== undefined) updates.contactEmail = contactEmail;
      return apiRequest("PATCH", `/api/shows/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
    },
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ 
      id, 
      bookingDate, 
      recordingDate, 
      publicationDate, 
      streamingLink 
    }: { 
      id: string; 
      bookingDate?: string; 
      recordingDate?: string; 
      publicationDate?: string; 
      streamingLink?: string;
    }) => {
      return apiRequest("PATCH", `/api/shows/${id}`, { 
        bookingDate, 
        recordingDate, 
        publicationDate, 
        streamingLink
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      toast({
        title: "Booking Updated",
        description: "Interview details have been saved.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Update Booking",
        description: error.message || "Could not save booking details. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteShowMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mark as "not_interested" instead of deleting, so it won't be re-discovered
      return apiRequest("PATCH", `/api/shows/${id}`, { status: "not_interested" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      toast({
        title: "Show Removed",
        description: "This show has been hidden and won't appear in future discoveries.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove show. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleYouTubeDiscovery = async () => {
    const topics = profile?.topics || [];
    if (topics.length === 0) {
      toast({
        title: "No Topics",
        description: "Please add topics to your profile in Settings first",
        variant: "destructive",
      });
      return;
    }

    setDiscoveryProgress({ 
      active: true, 
      progress: 0, 
      message: "Starting YouTube discovery...", 
      found: 0, 
      target: profile?.targetShowCount || 20 
    });
    setDiscoveryDialogOpen(false);

    try {
      const response = await fetch('/api/discover/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ topics }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Discovery failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream available');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'error') {
                throw new Error(data.error);
              }
              
              if (data.type === 'complete') {
                setDiscoveryProgress({ 
                  active: false, 
                  progress: 100, 
                  message: data.message, 
                  found: data.discovered, 
                  target: data.target 
                });
                
                await queryClient.refetchQueries({ queryKey: ["/api/shows"] });
                await queryClient.refetchQueries({ queryKey: ["/api/analytics/stats"] });
                
                toast({
                  title: "Discovery Complete!",
                  description: `Found ${data.discovered} YouTube shows with contact emails`,
                });
                
                return;
              }
              
              setDiscoveryProgress({
                active: true,
                progress: data.progress || 0,
                message: data.message || "",
                found: data.found || 0,
                target: data.target || profile?.targetShowCount || 20,
              });
              
              // Refresh show list when new shows are found
              if (data.type === 'found') {
                await queryClient.refetchQueries({ queryKey: ["/api/shows"] });
              }
            } catch (parseError) {
              console.error('Failed to parse SSE data:', parseError);
            }
          }
        }
      }
    } catch (error: any) {
      setDiscoveryProgress({ active: false, progress: 0, message: "", found: 0, target: 0 });
      toast({
        title: "Discovery Failed",
        description: error.message || "Failed to discover shows. Please try again.",
        variant: "destructive",
      });
    }
  };

  const importShowsMutation = useMutation({
    mutationFn: async (fileData: string) => {
      return apiRequest("POST", "/api/shows/import", { fileData });
    },
    onSuccess: async (data: any) => {
      setImportResults(data);
      setSelectedFile(null);
      await queryClient.refetchQueries({ queryKey: ["/api/shows"] });
      await queryClient.refetchQueries({ queryKey: ["/api/analytics/stats"] });
      
      toast({
        title: "Import Complete",
        description: `Imported ${data.successful} of ${data.total} shows. ${data.failed} failed.`,
        variant: data.failed > 0 ? "destructive" : "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Import Failed",
        description: error.message || "Failed to import shows. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResults(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const base64Data = result.split(',')[1];
        await importShowsMutation.mutateAsync(base64Data);
      } else {
        toast({
          title: "Import Failed",
          description: "Failed to read file. Please try again.",
          variant: "destructive",
        });
      }
    };
    reader.onerror = () => {
      toast({
        title: "Import Failed",
        description: "Failed to read file. Please try again.",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Shows
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage discovered podcast and YouTube shows
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="gap-2" 
            data-testid="button-import-shows"
            onClick={() => setImportDialogOpen(true)}
          >
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button 
            className="gap-2" 
            data-testid="button-discover-new"
            onClick={() => setDiscoveryDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Discover Shows
          </Button>
        </div>
      </div>

      {/* YouTube Discovery Progress Banner */}
      {discoveryProgress.active && (
        <div 
          className="bg-primary/10 border border-primary/30 rounded-lg px-6 py-4 animate-in slide-in-from-top" 
          data-testid="discovery-progress-banner"
          role="status"
          aria-live="polite"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-semibold text-primary">
                  YouTube Discovery in Progress
                </span>
              </div>
              <span className="text-sm font-mono text-primary">
                {discoveryProgress.found}/{discoveryProgress.target} found
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{discoveryProgress.message}</span>
                <span className="font-mono text-primary">{discoveryProgress.progress}%</span>
              </div>
              <Progress 
                value={discoveryProgress.progress} 
                className="h-2"
                data-testid="progress-bar"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shows by name, host, or topic..."
            className="pl-10"
            data-testid="input-search-shows"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-status-filter">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="discovered">Discovered</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="pitched">Pitched</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-sort-by">
            <SelectValue placeholder="Recently Added" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="subscribers">Subscribers (High to Low)</SelectItem>
            <SelectItem value="averageViews">Avg Views (High to Low)</SelectItem>
            <SelectItem value="lastEpisodeDate">Last Post Date</SelectItem>
            <SelectItem value="guestScore">Guest Score (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {isLoading || isPageTransition ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : !shows || shows.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No shows found. Try adjusting your filters or discover new shows.
          </div>
        ) : (
          <>
            {shows.map((show) => (
              <ShowCard
                key={show.id}
                id={show.id}
                name={show.name}
                host={show.host || ""}
                platform={show.platform as "podcast" | "youtube" | "both"}
                thumbnailUrl={show.thumbnailUrl || undefined}
                channelUrl={show.youtubeChannelUrl || undefined}
                websiteUrl={show.websiteUrl || undefined}
                contactFormUrl={show.contactFormUrl || undefined}
                subscribers={show.subscribers || 0}
                averageViews={show.averageViews}
                episodeCount={show.episodeCount || 0}
                lastEpisode={show.lastEpisodeDate || "Unknown"}
                status={show.status as ShowStatus}
                guestScore={show.guestScore || 0}
                bookingDate={show.bookingDate || undefined}
                recordingDate={show.recordingDate || undefined}
                publicationDate={show.publicationDate || undefined}
                streamingLink={show.streamingLink || undefined}
                onView={() => setSelectedShow(show)}
                onStatusChange={(status) => updateShowMutation.mutate({ id: show.id, status })}
                onUpdateBooking={(details) => updateBookingMutation.mutateAsync({ id: show.id, ...details })}
                onDelete={() => deleteShowMutation.mutate(show.id)}
                isBookingPending={updateBookingMutation.isPending}
              />
            ))}
            
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t pt-4" data-testid="pagination-controls">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalShows)} of {totalShows} shows
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || isPageTransition}
                    data-testid="button-prev-page"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <div className="text-sm font-medium px-3">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || isPageTransition}
                    data-testid="button-next-page"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={discoveryDialogOpen} onOpenChange={setDiscoveryDialogOpen}>
        <DialogContent data-testid="dialog-discover-shows">
          <DialogHeader>
            <DialogTitle>🔍 Discover Real Shows</DialogTitle>
            <DialogDescription>
              Find verified podcasts (Podcast Index) and YouTube channels—contact emails from feed metadata when available
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3">
            <div>
              <p className="text-sm font-medium">Discovery Goal:</p>
              <p className="text-sm text-muted-foreground">
                Find <span className="font-semibold text-foreground">{profile?.targetShowCount || 20}</span> real shows 
                (60% podcasts, 40% YouTube)
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Topics:</p>
              <p className="text-sm text-muted-foreground">
                {profile?.topics?.join(", ") || "No topics set"}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Filters:</p>
              <p className="text-sm text-muted-foreground">
                Min {profile?.minSubscribers || 800} subscribers, 
                {profile?.guestOnlyShows ? " guest-focused shows only" : " all show types"}
              </p>
            </div>
            
            <p className="text-xs text-muted-foreground pt-2 border-t">
              ⚡ Uses Podcast Index API + YouTube API for real show data
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDiscoveryDialogOpen(false)}
              disabled={discoveryProgress.active}
              data-testid="button-cancel-discovery"
            >
              Cancel
            </Button>
            <Button
              onClick={handleYouTubeDiscovery}
              disabled={discoveryProgress.active}
              data-testid="button-start-discovery"
            >
              {discoveryProgress.active ? "Discovering..." : "🔍 Start YouTube Discovery"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Shows Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent data-testid="dialog-import-shows" className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>📊 Import Shows from Spreadsheet</DialogTitle>
            <DialogDescription>
              Upload a CSV or Excel file to import shows for {profile?.profileType === 'guest' ? 'interviews' : 'collaborations'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select File</label>
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                disabled={importShowsMutation.isPending}
                data-testid="input-file-upload"
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: CSV, Excel (.xlsx, .xls)
              </p>
            </div>

            {/* Expected Columns */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Expected Columns:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Required:</strong> name (or Title, Channel Name)</p>
                <p><strong>Optional:</strong> host, email, url, website, description, subscribers, platform</p>
                <p className="pt-1 text-foreground/70">Column names are flexible - the system will automatically map common variations.</p>
              </div>
            </div>

            {/* Import Results */}
            {importResults && (
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Import Results</span>
                  <span className="text-xs text-muted-foreground">
                    {importResults.total} rows processed
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-600">{importResults.successful}</p>
                    <p className="text-xs text-muted-foreground">Successful</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-600">{importResults.failed}</p>
                    <p className="text-xs text-muted-foreground">Failed</p>
                  </div>
                </div>

                {importResults.errors && importResults.errors.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-destructive">Errors:</p>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {importResults.errors.slice(0, 10).map((error: any, idx: number) => (
                        <div key={idx} className="text-xs bg-destructive/5 rounded px-2 py-1">
                          <span className="font-medium">Row {error.row}:</span> {error.error}
                        </div>
                      ))}
                      {importResults.errors.length > 10 && (
                        <p className="text-xs text-muted-foreground pt-1">
                          ...and {importResults.errors.length - 10} more errors
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setImportDialogOpen(false);
                setSelectedFile(null);
                setImportResults(null);
              }}
              disabled={importShowsMutation.isPending}
              data-testid="button-cancel-import"
            >
              {importResults ? 'Close' : 'Cancel'}
            </Button>
            {!importResults && (
              <Button
                onClick={handleImport}
                disabled={!selectedFile || importShowsMutation.isPending}
                data-testid="button-start-import"
              >
                {importShowsMutation.isPending ? "Importing..." : "Import Shows"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedShow && (
        <ShowDetailsDialog
          open={!!selectedShow}
          onOpenChange={(open) => !open && setSelectedShow(null)}
          show={selectedShow}
          onUpdateEmail={async (email) => {
            await updateShowMutation.mutateAsync({
              id: selectedShow.id,
              contactEmail: email,
            });
            // Update the selected show with new email
            setSelectedShow({ ...selectedShow, contactEmail: email });
            toast({
              title: "Email Updated",
              description: "Contact email has been saved.",
            });
          }}
        />
      )}
    </div>
  );
}
