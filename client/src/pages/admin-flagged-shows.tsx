import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Check, XCircle, Calendar, Mail } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface FlaggedShow {
  id: string;
  name: string;
  host: string | null;
  platform: string;
  contactEmail: string | null;
  flaggedForReview: boolean;
  flagReason: string | null;
  lastBounceDate: string | null;
  notes: string | null;
  bounceCount: number;
  bounces: Array<{
    id: string;
    sentAt: string | null;
    toEmail: string;
    profileId: string | null;
  }>;
}

export default function AdminFlaggedShows() {
  const { toast } = useToast();
  const [selectedShow, setSelectedShow] = useState<FlaggedShow | null>(null);
  const [dialogAction, setDialogAction] = useState<"unflag" | "mark_dead" | null>(null);
  const [notes, setNotes] = useState("");

  const { data: flaggedShows, isLoading, error } = useQuery<FlaggedShow[]>({
    queryKey: ['/api/admin/flagged-shows'],
  });

  const resolveMutation = useMutation({
    mutationFn: async ({ showId, action, notes }: { showId: string; action: string; notes: string }) => {
      const response = await apiRequest('PATCH', `/api/admin/flagged-shows/${showId}`, { action, notes });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/flagged-shows'] });
      toast({
        title: "Success",
        description: dialogAction === "unflag" ? "Show unflagged successfully" : "Show marked as dead",
      });
      setSelectedShow(null);
      setDialogAction(null);
      setNotes("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update show",
        variant: "destructive",
      });
    },
  });

  const handleAction = (show: FlaggedShow, action: "unflag" | "mark_dead") => {
    setSelectedShow(show);
    setDialogAction(action);
    setNotes(show.notes || "");
  };

  const confirmAction = () => {
    if (!selectedShow || !dialogAction) return;
    
    resolveMutation.mutate({
      showId: selectedShow.id,
      action: dialogAction,
      notes,
    });
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
          <p className="text-sm text-destructive">
            Failed to load flagged shows. You may not have admin permissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Flagged Shows</h1>
        <p className="text-muted-foreground mt-2">
          Review shows flagged for potential issues (bounced emails, dead shows)
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Flagged</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="metric-total-flagged">{flaggedShows?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Shows needing review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bounces</CardTitle>
                <Mail className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="metric-total-bounces">
                  {flaggedShows?.reduce((sum, show) => sum + show.bounceCount, 0) || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all flagged shows
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Bounces/Show</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="metric-avg-bounces">
                  {flaggedShows && flaggedShows.length > 0
                    ? (flaggedShows.reduce((sum, show) => sum + show.bounceCount, 0) / flaggedShows.length).toFixed(1)
                    : '0'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Average per show
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Flagged Shows</CardTitle>
              <CardDescription>
                Shows with multiple bounced emails from different users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!flaggedShows || flaggedShows.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Check className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="text-lg font-medium">No flagged shows</p>
                  <p className="text-sm">All shows are in good standing</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Show</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead>Bounces</TableHead>
                        <TableHead>Last Bounce</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {flaggedShows.map((show) => (
                        <TableRow key={show.id} data-testid={`row-flagged-show-${show.id}`}>
                          <TableCell>
                            <div>
                              <div className="font-medium" data-testid={`text-show-name-${show.id}`}>{show.name}</div>
                              {show.host && (
                                <div className="text-sm text-muted-foreground">{show.host}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {show.platform}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {show.contactEmail || 'N/A'}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive" data-testid={`badge-bounce-count-${show.id}`}>
                              {show.bounceCount} bounces
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {show.lastBounceDate
                              ? format(new Date(show.lastBounceDate), 'MMM d, yyyy')
                              : 'Unknown'}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm text-muted-foreground truncate" title={show.flagReason || undefined}>
                              {show.flagReason || 'No reason provided'}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAction(show, "unflag")}
                                data-testid={`button-unflag-${show.id}`}
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Unflag
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleAction(show, "mark_dead")}
                                data-testid={`button-mark-dead-${show.id}`}
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Mark Dead
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <Dialog open={!!dialogAction} onOpenChange={() => {
        setDialogAction(null);
        setSelectedShow(null);
        setNotes("");
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "unflag" ? "Unflag Show" : "Mark Show as Dead"}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "unflag"
                ? "This will remove the flag and allow the show to be used normally."
                : "This will mark the show as not interested and remove the flag."}
            </DialogDescription>
          </DialogHeader>

          {selectedShow && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{selectedShow.name}</p>
                <p className="text-sm text-muted-foreground">{selectedShow.host}</p>
                <p className="text-sm text-muted-foreground">{selectedShow.contactEmail}</p>
              </div>

              <div>
                <label className="text-sm font-medium">Notes (optional)</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this decision..."
                  className="mt-2"
                  data-testid="textarea-admin-notes"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogAction(null);
                setSelectedShow(null);
                setNotes("");
              }}
              data-testid="button-cancel-action"
            >
              Cancel
            </Button>
            <Button
              variant={dialogAction === "mark_dead" ? "destructive" : "default"}
              onClick={confirmAction}
              disabled={resolveMutation.isPending}
              data-testid="button-confirm-action"
            >
              {resolveMutation.isPending ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
