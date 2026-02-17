import { MetricCard } from "@/components/metric-card";
import { StatusPipeline } from "@/components/status-pipeline";
import { ShowCard } from "@/components/show-card";
import { ShowDetailsDialog } from "@/components/show-details-dialog";
import { MomentumScore } from "@/components/momentum-score";
import { StreakTracker } from "@/components/streak-tracker";
import { Users, Mail, CheckCircle, TrendingUp, Loader2, UserCircle, Trash2, Sparkles, Shield, DollarSign, Activity, Edit2, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Show, Profile } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AnalyticsStats {
  totalShows: number;
  outreachSent: number;
  positiveReplies: number;
  bookings: number;
  responseRate: number;
  pipelineCounts: {
    discovered: number;
    qualified: number;
    pitched: number;
    followup: number;
    responded: number;
    booked: number;
  };
}

interface AdminUsageStats {
  summary: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    totalTokens: number;
    totalCostCents: number;
    totalCostDollars: string;
  };
  byRequestType: Record<string, { count: number; tokens: number; cost: number }>;
  byUser: Record<string, { count: number; tokens: number; cost: number }>;
  recentUsage: Array<{
    id: string;
    userId: string;
    endpoint: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCost: number;
    requestType: string;
    success: boolean;
    createdAt: string;
  }>;
}

interface User {
  id: string;
  username: string;
  subscriptionTier: string;
  maxProfiles: number;
  maxDiscoveryPerMonth: number;
  discoveryUsedThisMonth: number;
}

export default function Dashboard() {
  const [discoveryDialogOpen, setDiscoveryDialogOpen] = useState(false);
  const [createProfileDialogOpen, setCreateProfileDialogOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileTitle, setNewProfileTitle] = useState("");
  const [newProfileBio, setNewProfileBio] = useState("");
  const [newProfileType, setNewProfileType] = useState<"guest" | "influencer">("guest");
  const [requireEmail, setRequireEmail] = useState(true);
  const [showDetailsDialogOpen, setShowDetailsDialogOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const { toast } = useToast();

  const { data: userData } = useQuery<{ user: User | null }>({
    queryKey: ["/api/auth/me"],
  });

  const user = userData?.user;
  const isAdmin = user?.subscriptionTier === "unlimited";

  const { data: stats, isLoading: statsLoading } = useQuery<AnalyticsStats>({
    queryKey: ["/api/analytics/stats"],
  });

  const { data: paginatedData, isLoading: showsLoading } = useQuery<{ shows: Show[], total: number }>({
    queryKey: ["/api/shows"],
  });

  const shows = paginatedData?.shows || [];
  const recentShows = shows.slice(0, 3);

  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: profiles = [] } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
  });

  const { data: adminUsage, isLoading: adminUsageLoading, error: adminUsageError } = useQuery<AdminUsageStats>({
    queryKey: ["/api/admin/usage"],
    enabled: isAdmin,
    retry: false, // Don't retry on 403
  });

  const createProfileMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/profiles", {
        name: newProfileName,
        title: newProfileTitle,
        bio: newProfileBio,
        profileType: newProfileType,
        isActive: true,
        topics: [],
        keywords: [],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      setCreateProfileDialogOpen(false);
      setNewProfileName("");
      setNewProfileTitle("");
      setNewProfileBio("");
      setNewProfileType("guest");
      toast({
        title: "Profile Created",
        description: "New profile has been created and activated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const switchProfileMutation = useMutation({
    mutationFn: async (profileId: string) => {
      return apiRequest("POST", `/api/profiles/${profileId}/activate`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      toast({
        title: "Profile Switched",
        description: "Active profile has been changed.",
      });
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: async (profileId: string) => {
      return apiRequest("DELETE", `/api/profiles/${profileId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      toast({
        title: "Profile Deleted",
        description: "Profile and all associated data have been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete profile. You must have at least one profile.",
        variant: "destructive",
      });
    },
  });

  const updateShowMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PATCH", `/api/shows/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
    },
  });

  const updateShowEmailMutation = useMutation({
    mutationFn: async ({ id, email }: { id: string; email: string }) => {
      return apiRequest("PATCH", `/api/shows/${id}`, { contactEmail: email });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      toast({
        title: "Email Updated",
        description: "Contact email has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update contact email.",
        variant: "destructive",
      });
    },
  });

  const handleViewShow = (show: Show) => {
    setSelectedShow(show);
    setShowDetailsDialogOpen(true);
  };

  const handleUpdateEmail = async (email: string) => {
    if (!selectedShow) return;
    await updateShowEmailMutation.mutateAsync({ id: selectedShow.id, email });
    setSelectedShow({ ...selectedShow, contactEmail: email });
  };

  const discoverShowsMutation = useMutation({
    mutationFn: async () => {
      const topics = profile?.topics || [];
      if (topics.length === 0) {
        throw new Error("Please add topics to your profile in Settings first");
      }
      return apiRequest("POST", "/api/discover/ai", { topics, deepResearch: false, requireEmail });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/shows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      setDiscoveryDialogOpen(false);
      
      const discovered = data.discovered || 0;
      const podcasts = data.breakdown?.podcasts || 0;
      const youtube = data.breakdown?.youtube || 0;
      const withEmails = data.breakdown?.withEmails || 0;
      const withoutEmails = data.breakdown?.withoutEmails || 0;
      const deepStats = data.deepResearchStats;
      
      // Show deep research errors as a separate warning toast
      if (deepStats && deepStats.errors && deepStats.errors.length > 0) {
        toast({
          title: "Deep Research Issues",
          description: `Deep research encountered problems: ${deepStats.errors.join(', ')}. Only ${deepStats.successful} of ${deepStats.attempted} YouTube channels were researched successfully.`,
          variant: "destructive",
        });
      }
      
      if (discovered === 0) {
        let noResultsMessage = "No new shows found with contact emails. Try adjusting your topics or discovery filters.";
        if (deepStats && deepStats.attempted > 0 && deepStats.successful === 0) {
          noResultsMessage = "Discovery completed but Deep Research couldn't find any YouTube emails. This may be due to API quota limits or channels without public contact information.";
        }
        toast({
          title: "Discovery Complete",
          description: noResultsMessage,
          variant: "destructive",
        });
        return;
      }
      
      let description = `Found ${discovered} new show${discovered !== 1 ? 's' : ''}`;
      
      // Add email status
      if (withEmails > 0 && withoutEmails > 0) {
        description += ` (${withEmails} with email${withEmails !== 1 ? 's' : ''}, ${withoutEmails} without)`;
      } else if (withEmails > 0) {
        description += ` with contact emails`;
      } else if (withoutEmails > 0) {
        description += ` without contact emails`;
      }
      
      // Add platform breakdown
      if (podcasts > 0 && youtube > 0) {
        description += `. Platforms: ${podcasts} podcast${podcasts !== 1 ? 's' : ''}, ${youtube} YouTube channel${youtube !== 1 ? 's' : ''}`;
      } else if (podcasts > 0) {
        description += ` (${podcasts} podcast${podcasts !== 1 ? 's' : ''})`;
      } else if (youtube > 0) {
        description += ` (${youtube} YouTube channel${youtube !== 1 ? 's' : ''})`;
      }
      description += '.';
      
      if (data.deepResearch && deepStats && deepStats.successful > 0) {
        description += ` Deep research found ${deepStats.successful} YouTube email${deepStats.successful !== 1 ? 's' : ''}!`;
      }
      
      toast({
        title: "Discovery Complete",
        description,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Discovery Failed",
        description: error.message || "Failed to discover shows. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
              Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Level up your podcast guest booking game
          </p>
        </div>
        <Button 
          className="gap-2 px-6" 
          data-testid="button-discover-shows"
          onClick={() => setDiscoveryDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Discover Shows
        </Button>
      </div>

      {/* Gamification Top Section */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MomentumScore
            totalShows={stats.totalShows}
            outreachSent={stats.outreachSent}
            positiveReplies={stats.positiveReplies}
            bookings={stats.bookings}
          />
          <StreakTracker currentStreak={3} longestStreak={7} />
        </div>
      )}

      {/* Profile Management Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Active Profile</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCreateProfileDialogOpen(true)}
            data-testid="button-create-profile"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-muted-foreground">Select Profile</Label>
            <Select
              value={profile?.id || ""}
              onValueChange={(value) => switchProfileMutation.mutate(value)}
              disabled={switchProfileMutation.isPending}
            >
              <SelectTrigger className="mt-1" data-testid="select-profile">
                <SelectValue placeholder="Select a profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <div className="flex items-center gap-2">
                      <span>{p.name} ({p.title})</span>
                      <Badge variant={p.profileType === "influencer" ? "default" : "secondary"} className="text-xs">
                        {p.profileType === "influencer" ? "Influencer" : "Guest"}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {profile && (
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground">Current Profile</Label>
                <div className="mt-1 p-2 border rounded-md bg-muted/30">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.title}</p>
                    </div>
                    <Badge variant={profile.profileType === "influencer" ? "default" : "secondary"} className="text-xs">
                      {profile.profileType === "influencer" ? "Influencer" : "Guest"}
                    </Badge>
                  </div>
                </div>
              </div>
              {profiles.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (confirm(`Delete profile "${profile.name}"? All associated shows and data will be permanently removed.`)) {
                      deleteProfileMutation.mutate(profile.id);
                    }
                  }}
                  disabled={deleteProfileMutation.isPending}
                  data-testid="button-delete-profile"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {profile?.bio && (
          <div className="mt-4">
            <Label className="text-sm text-muted-foreground">Bio</Label>
            <p className="text-sm mt-1">{profile.bio}</p>
          </div>
        )}
      </Card>

      {/* Admin Controls Section */}
      {isAdmin && (
        <Card className="p-6 border-2 border-primary">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Admin Controls</h2>
            <Badge variant="default" className="ml-2">System Admin</Badge>
          </div>

          {adminUsageLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          ) : adminUsageError ? (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
              <p className="text-sm text-destructive">
                Failed to load admin usage data. You may not have admin permissions.
              </p>
            </div>
          ) : adminUsage ? (
            <div className="space-y-6">
              {/* API Usage Summary */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  API Usage Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Total Requests</p>
                    </div>
                    <p className="text-2xl font-bold">{adminUsage.summary.totalRequests}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {adminUsage.summary.successfulRequests} successful, {adminUsage.summary.failedRequests} failed
                    </p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Total Tokens</p>
                    </div>
                    <p className="text-2xl font-bold">{adminUsage.summary.totalTokens.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Across all API calls
                    </p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Estimated Cost</p>
                    </div>
                    <p className="text-2xl font-bold">${adminUsage.summary.totalCostDollars}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on OpenAI pricing
                    </p>
                  </Card>
                </div>
              </div>

              {/* By Request Type */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Usage by Request Type</h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request Type</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Tokens</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(adminUsage.byRequestType).map(([type, data]) => (
                        <TableRow key={type}>
                          <TableCell className="font-medium">{type}</TableCell>
                          <TableCell className="text-right">{data.count}</TableCell>
                          <TableCell className="text-right">{data.tokens.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${(data.cost / 100).toFixed(4)}</TableCell>
                        </TableRow>
                      ))}
                      {Object.keys(adminUsage.byRequestType).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No API usage recorded yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Recent API Calls */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Recent API Calls (Last 20)</h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead className="text-right">Tokens</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminUsage.recentUsage.map((usage) => (
                        <TableRow key={usage.id}>
                          <TableCell className="font-medium">{usage.requestType}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{usage.model}</TableCell>
                          <TableCell className="text-right">{usage.totalTokens.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${(usage.estimatedCost / 100).toFixed(4)}</TableCell>
                          <TableCell>
                            <Badge variant={usage.success ? "default" : "destructive"} className="text-xs">
                              {usage.success ? "Success" : "Failed"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(usage.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      {adminUsage.recentUsage.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            No recent API calls
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ) : null}
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          <>
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </>
        ) : (
          <>
            <MetricCard
              title="Total Shows"
              value={stats?.totalShows.toString() || "0"}
              icon={Users}
              color="cyan"
              testId="metric-total-shows"
            />
            <MetricCard
              title="Outreach Sent"
              value={stats?.outreachSent.toString() || "0"}
              icon={Mail}
              color="purple"
              testId="metric-outreach"
            />
            <MetricCard
              title="Positive Replies"
              value={stats?.positiveReplies.toString() || "0"}
              icon={CheckCircle}
              color="pink"
              testId="metric-replies"
            />
            <MetricCard
              title="Bookings"
              value={stats?.bookings.toString() || "0"}
              icon={TrendingUp}
              color="green"
              testId="metric-bookings"
            />
          </>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Pipeline Overview</h2>
        {statsLoading ? (
          <Skeleton className="h-32" />
        ) : (
          <StatusPipeline
            counts={stats?.pipelineCounts || {
              discovered: 0,
              qualified: 0,
              pitched: 0,
              followup: 0,
              responded: 0,
              booked: 0,
            }}
            onStageClick={(stage) => console.log("Navigate to stage:", stage)}
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Shows</h2>
          <Button variant="outline" data-testid="button-view-all-shows">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {showsLoading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : recentShows.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No shows discovered yet. Click "Discover Shows" to get started.
            </div>
          ) : (
            recentShows.map((show) => (
              <ShowCard
                key={show.id}
                id={show.id}
                name={show.name}
                host={show.host || ""}
                platform={show.platform as "podcast" | "youtube" | "both"}
                subscribers={show.subscribers || 0}
                episodeCount={show.episodeCount || 0}
                lastEpisode={show.lastEpisodeDate || "Unknown"}
                status={show.status as any}
                guestScore={show.guestScore || 0}
                onView={() => handleViewShow(show)}
                onStatusChange={(status) => updateShowMutation.mutate({ id: show.id, status })}
              />
            ))
          )}
        </div>
      </div>

      {/* Show Details Dialog */}
      {selectedShow && (
        <ShowDetailsDialog
          open={showDetailsDialogOpen}
          onOpenChange={setShowDetailsDialogOpen}
          show={{
            id: selectedShow.id,
            name: selectedShow.name,
            host: selectedShow.host || undefined,
            platform: selectedShow.platform as "youtube" | "podcast" | "both",
            thumbnailUrl: selectedShow.thumbnailUrl || undefined,
            channelUrl: selectedShow.youtubeChannelUrl || undefined,
            websiteUrl: selectedShow.websiteUrl || undefined,
            rssUrl: selectedShow.podcastRssUrl || undefined,
            contactEmail: selectedShow.contactEmail || undefined,
            subscribers: selectedShow.subscribers || undefined,
            averageViews: selectedShow.averageViews,
            episodeCount: selectedShow.episodeCount || undefined,
            lastEpisode: selectedShow.lastEpisodeDate || undefined,
            description: selectedShow.description || undefined,
            status: selectedShow.status as any,
            guestScore: selectedShow.guestScore || undefined,
            topicMatchScore: selectedShow.topicMatchScore || undefined,
            bookingDate: selectedShow.bookingDate || undefined,
            recordingDate: selectedShow.recordingDate || undefined,
            publicationDate: selectedShow.publicationDate || undefined,
            streamingLink: selectedShow.streamingLink || undefined,
          }}
          onUpdateEmail={handleUpdateEmail}
        />
      )}

      <Dialog open={discoveryDialogOpen} onOpenChange={setDiscoveryDialogOpen}>
        <DialogContent data-testid="dialog-discover-shows">
          <DialogHeader>
            <DialogTitle>Discover Shows</DialogTitle>
            <DialogDescription>
              Search for podcasts and YouTube shows matching your expertise topics. Only shows with contact emails will be discovered.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-medium">Discovery Goal:</p>
              <p className="text-sm text-muted-foreground">
                Find <span className="font-semibold text-foreground">{profile?.targetShowCount || 20}</span> qualifying shows 
                (search up to {profile?.maxChannelsToSearch || 200} channels)
              </p>
            </div>
            
            {profile?.topics && profile.topics.length > 0 ? (
              <div>
                <p className="text-sm font-medium mb-2">Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.topics.map((topic: string, idx: number) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  No topics found. Please add your expertise topics in Settings first.
                </p>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium">Filters:</p>
              <p className="text-sm text-muted-foreground">
                Min {profile?.minSubscribers || 800} subscribers, 
                {profile?.guestOnlyShows ? " guest-focused shows only" : " all show types"}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Require e-mail?</p>
                <p className="text-xs text-muted-foreground">
                  Only add shows that have verified contact email addresses. Turn off to include all shows.
                </p>
              </div>
              <Switch
                checked={requireEmail}
                onCheckedChange={setRequireEmail}
                data-testid="switch-require-email"
              />
            </div>

            
            <p className="text-xs text-muted-foreground pt-2 border-t">
              💡 Adjust these settings in Settings → Discovery Filters
            </p>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDiscoveryDialogOpen(false)}
              disabled={discoverShowsMutation.isPending}
              data-testid="button-cancel-discovery"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => discoverShowsMutation.mutate()}
              disabled={discoverShowsMutation.isPending || !profile?.topics || profile.topics.length === 0}
              data-testid="button-start-discovery"
            >
              {discoverShowsMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {discoverShowsMutation.isPending ? "Discovering..." : "Start Discovery"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={createProfileDialogOpen} onOpenChange={setCreateProfileDialogOpen}>
        <DialogContent data-testid="dialog-create-profile">
          <DialogHeader>
            <DialogTitle>Create New Profile</DialogTitle>
            <DialogDescription>
              Choose your profile type and create a new profile with its own settings, shows, and outreach campaigns.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Profile Type *</Label>
              <RadioGroup
                value={newProfileType}
                onValueChange={(value) => setNewProfileType(value as "guest" | "influencer")}
                className="mt-2"
                data-testid="radio-profile-type"
              >
                <div className="flex items-start space-x-2 p-3 border rounded-md hover-elevate">
                  <RadioGroupItem value="guest" id="guest" />
                  <div className="flex-1">
                    <Label htmlFor="guest" className="font-semibold cursor-pointer">
                      Guest Profile
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      For speakers who want to be interviewed on podcasts or YouTube shows. Find host-driven formats that feature guest interviews.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 p-3 border rounded-md hover-elevate">
                  <RadioGroupItem value="influencer" id="influencer" />
                  <div className="flex-1">
                    <Label htmlFor="influencer" className="font-semibold cursor-pointer">
                      Influencer Profile
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      For creators seeking video collaborations, cross-channel appearances, or co-productions. Discover channels open to collaborative content.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="e.g., John Smith"
                data-testid="input-profile-name"
              />
            </div>

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newProfileTitle}
                onChange={(e) => setNewProfileTitle(e.target.value)}
                placeholder="e.g., Spiritual Healer & Energy Worker"
                data-testid="input-profile-title"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                value={newProfileBio}
                onChange={(e) => setNewProfileBio(e.target.value)}
                placeholder="Brief description of your expertise and background..."
                rows={4}
                data-testid="input-profile-bio"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              You can add topics, keywords, and other settings in Settings after creating the profile.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCreateProfileDialogOpen(false);
                setNewProfileName("");
                setNewProfileTitle("");
                setNewProfileBio("");
                setNewProfileType("guest");
              }}
              disabled={createProfileMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={() => createProfileMutation.mutate()}
              disabled={createProfileMutation.isPending || !newProfileName.trim() || !newProfileTitle.trim()}
              data-testid="button-save-profile"
            >
              {createProfileMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
