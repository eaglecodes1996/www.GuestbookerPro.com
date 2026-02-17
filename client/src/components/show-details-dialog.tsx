import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, ExternalLink, Mail, Calendar, Pencil, Save, X } from "lucide-react";
import { SiSpotify, SiApplepodcasts } from "react-icons/si";
import type { ShowStatus } from "./show-card";
import { useState, useEffect } from "react";

interface ShowDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  show: {
    id: string;
    name: string;
    host?: string;
    platform: "youtube" | "podcast" | "both";
    thumbnailUrl?: string;
    channelUrl?: string;
    websiteUrl?: string;
    contactFormUrl?: string;
    rssUrl?: string;
    contactEmail?: string;
    subscribers?: number;
    averageViews?: number | null;
    episodeCount?: number;
    lastEpisode?: string;
    description?: string;
    status: ShowStatus;
    guestScore?: number;
    topicMatchScore?: number;
    bookingDate?: string;
    recordingDate?: string;
    publicationDate?: string;
    streamingLink?: string;
  };
  onUpdateEmail?: (email: string) => Promise<void>;
}

const statusConfig: Record<ShowStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  discovered: { label: "Discovered", variant: "secondary" },
  qualified: { label: "Qualified", variant: "outline" },
  pitched: { label: "Pitched", variant: "default" },
  responded: { label: "Responded", variant: "default" },
  booked: { label: "Booked", variant: "default" },
  published: { label: "Published", variant: "secondary" },
  not_interested: { label: "Not Interested", variant: "destructive" },
};

export function ShowDetailsDialog({ open, onOpenChange, show, onUpdateEmail }: ShowDetailsDialogProps) {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(show.contactEmail || "");
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  
  // Reset email state when show changes
  useEffect(() => {
    setEditedEmail(show.contactEmail || "");
    setIsEditingEmail(false);
  }, [show.id, show.contactEmail]);
  
  const getPlatformIcon = () => {
    if (show.platform === "youtube") return <Youtube className="w-4 h-4" />;
    if (show.platform === "podcast") return <SiSpotify className="w-4 h-4" />;
    return <SiApplepodcasts className="w-4 h-4" />;
  };

  const formatNumber = (num?: number | null) => {
    if (!num) return "N/A";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };
  
  const handleSaveEmail = async () => {
    if (!onUpdateEmail || !editedEmail.trim()) return;
    
    setIsSavingEmail(true);
    try {
      await onUpdateEmail(editedEmail.trim());
      setIsEditingEmail(false);
    } catch (error) {
      // Error handling done by parent
    } finally {
      setIsSavingEmail(false);
    }
  };
  
  const handleCancelEdit = () => {
    setEditedEmail(show.contactEmail || "");
    setIsEditingEmail(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-show-details">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20 rounded-md">
              <AvatarImage src={show.thumbnailUrl} alt={show.name} />
              <AvatarFallback className="rounded-md">{show.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl" data-testid="text-show-details-name">{show.name}</DialogTitle>
              {show.host && (
                <DialogDescription className="mt-1" data-testid="text-show-details-host">
                  Hosted by {show.host}
                </DialogDescription>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={statusConfig[show.status].variant}>
                  {statusConfig[show.status].label}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {getPlatformIcon()}
                  <span>{show.platform === "both" ? "Multi" : show.platform}</span>
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {show.description && (
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-show-details-description">
                {show.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {show.subscribers && (
              <div>
                <h3 className="text-sm font-medium mb-1">Subscribers</h3>
                <p className="text-2xl font-semibold" data-testid="text-show-details-subscribers">
                  {formatNumber(show.subscribers)}
                </p>
              </div>
            )}
            
            {show.averageViews && (
              <div>
                <h3 className="text-sm font-medium mb-1">Average Views</h3>
                <p className="text-2xl font-semibold" data-testid="text-show-details-average-views">
                  {formatNumber(show.averageViews)}
                </p>
              </div>
            )}
            
            {show.episodeCount && (
              <div>
                <h3 className="text-sm font-medium mb-1">Episodes</h3>
                <p className="text-2xl font-semibold" data-testid="text-show-details-episodes">
                  {show.episodeCount}
                </p>
              </div>
            )}
            
            {show.guestScore !== undefined && (
              <div>
                <h3 className="text-sm font-medium mb-1">Guest Score</h3>
                <p className="text-2xl font-semibold" data-testid="text-show-details-guest-score">
                  {show.guestScore}%
                </p>
              </div>
            )}
          </div>

          {show.lastEpisode && (
            <div>
              <h3 className="text-sm font-medium mb-1">Last Episode</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-show-details-last-episode">
                {show.lastEpisode}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Links & Contact</h3>
            <div className="space-y-2">
              {show.channelUrl && (
                <a
                  href={show.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                  data-testid="link-show-details-channel"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {show.websiteUrl && (
                <a
                  href={show.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                  data-testid="link-show-details-website"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
              {show.contactFormUrl && (
                <a
                  href={show.contactFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                  data-testid="link-show-details-contact-form"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {show.rssUrl && (
                <a
                  href={show.rssUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                  data-testid="link-show-details-rss"
                >
                  <SiSpotify className="w-4 h-4" />
                  <span>RSS Feed</span>
                </a>
              )}
              {!isEditingEmail ? (
                <div className="flex items-center gap-2">
                  {show.contactEmail ? (
                    <>
                      <a
                        href={`mailto:${show.contactEmail}`}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                        data-testid="link-show-details-email"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{show.contactEmail}</span>
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setIsEditingEmail(true)}
                        data-testid="button-edit-email"
                        aria-label="Edit email"
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">No email</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingEmail(true)}
                        data-testid="button-add-email"
                      >
                        Add Email
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="host@example.com"
                    className="h-8 text-sm"
                    data-testid="input-email"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleSaveEmail}
                    disabled={isSavingEmail || !editedEmail.trim()}
                    data-testid="button-save-email"
                    aria-label="Save email"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCancelEdit}
                    disabled={isSavingEmail}
                    data-testid="button-cancel-email"
                    aria-label="Cancel editing"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {(show.status === "booked" || show.status === "published") && 
           (show.bookingDate || show.recordingDate || show.publicationDate || show.streamingLink) && (
            <div className="p-4 bg-muted/50 rounded-md space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>Booking Details</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                {show.bookingDate && (
                  <div>
                    <span className="font-medium">Booked:</span> {new Date(show.bookingDate).toLocaleDateString()}
                  </div>
                )}
                {show.recordingDate && (
                  <div>
                    <span className="font-medium">Recording:</span> {new Date(show.recordingDate).toLocaleDateString()}
                  </div>
                )}
                {show.publicationDate && (
                  <div>
                    <span className="font-medium">Publishing:</span> {new Date(show.publicationDate).toLocaleDateString()}
                  </div>
                )}
                {show.streamingLink && (
                  <div>
                    <a
                      href={show.streamingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Episode</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={() => onOpenChange(false)} data-testid="button-close-show-details">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
