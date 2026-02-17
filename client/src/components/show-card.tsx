import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Youtube, Calendar, ExternalLink, Users, Eye } from "lucide-react";
import { SiSpotify, SiApplepodcasts } from "react-icons/si";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookingDetailsDialog } from "./booking-details-dialog";
import { useState } from "react";

export type ShowStatus = "discovered" | "qualified" | "pitched" | "responded" | "booked" | "published" | "not_interested";

interface ShowCardProps {
  id: string;
  name: string;
  host?: string;
  platform: "youtube" | "podcast" | "both";
  thumbnailUrl?: string;
  channelUrl?: string;
  websiteUrl?: string;
  contactFormUrl?: string;
  subscribers?: number;
  averageViews?: number | null;
  episodeCount?: number;
  lastEpisode?: string;
  status: ShowStatus;
  guestScore?: number;
  bookingDate?: string;
  recordingDate?: string;
  publicationDate?: string;
  streamingLink?: string;
  onView?: () => void;
  onStatusChange?: (status: ShowStatus) => void;
  onUpdateBooking?: (details: { bookingDate?: string; recordingDate?: string; publicationDate?: string; streamingLink?: string }) => Promise<void>;
  onDelete?: () => void;
  isBookingPending?: boolean;
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

export function ShowCard({
  id,
  name,
  host,
  platform,
  thumbnailUrl,
  channelUrl,
  websiteUrl,
  contactFormUrl,
  subscribers,
  averageViews,
  episodeCount,
  lastEpisode,
  status,
  guestScore,
  bookingDate,
  recordingDate,
  publicationDate,
  streamingLink,
  onView,
  onStatusChange,
  onUpdateBooking,
  onDelete,
  isBookingPending = false,
}: ShowCardProps) {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const handleMarkAsBooked = () => {
    if (status !== "booked" && status !== "published") {
      onStatusChange?.("booked");
    }
    setBookingDialogOpen(true);
  };

  const handleSaveBooking = async (details: { bookingDate?: string; recordingDate?: string; publicationDate?: string; streamingLink?: string }) => {
    if (!onUpdateBooking) {
      setBookingDialogOpen(false);
      return;
    }
    
    try {
      await onUpdateBooking(details);
      setBookingDialogOpen(false);
    } catch (error) {
      // Error is handled by mutation's onError toast, dialog stays open
    }
  };
  const getPlatformIcon = () => {
    if (platform === "youtube") return <Youtube className="w-4 h-4" />;
    if (platform === "podcast") return <SiSpotify className="w-4 h-4" />;
    return <SiApplepodcasts className="w-4 h-4" />;
  };

  const formatNumber = (num?: number) => {
    if (!num) return "N/A";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="p-4 hover-elevate">
      <div className="flex gap-4">
        <Avatar className="w-16 h-16 rounded-md">
          <AvatarImage src={thumbnailUrl} alt={name} />
          <AvatarFallback className="rounded-md">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className="text-lg font-medium truncate cursor-pointer hover-elevate"
                  onClick={onView}
                  data-testid={`text-show-name-${id}`}
                >
                  {name}
                </h3>
                {(channelUrl || websiteUrl) && (
                  <a
                    href={channelUrl || websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    data-testid={`link-show-channel-${id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
              {host && (
                <p className="text-sm text-muted-foreground" data-testid={`text-show-host-${id}`}>
                  Hosted by {host}
                </p>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid={`button-show-menu-${id}`}>
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onView}>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("qualified")}>
                  Mark as Qualified
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("pitched")}>
                  Mark as Pitched
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMarkAsBooked}>
                  {status === "booked" || status === "published" ? "Edit Booking Details" : "Mark as Booked"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("published")}>
                  Mark as Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("not_interested")}>
                  Not Interested
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                  data-testid={`menu-delete-show-${id}`}
                >
                  Delete Show
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge variant="outline" className="gap-1">
              {getPlatformIcon()}
              <span>{platform === "both" ? "Multi" : platform}</span>
            </Badge>

            {platform !== "podcast" && subscribers && (
              <Badge 
                variant="secondary" 
                className="gap-1 text-primary"
                data-testid={`badge-subscribers-${id}`}
              >
                <Users className="w-3 h-3" />
                {formatNumber(subscribers)} subs
              </Badge>
            )}

            {averageViews && (
              <Badge variant="secondary" className="gap-1" data-testid={`badge-average-views-${id}`}>
                <Eye className="w-3 h-3" />
                {formatNumber(averageViews)} avg views
              </Badge>
            )}

            {episodeCount && (
              <Badge variant="secondary" data-testid={`badge-episodes-${id}`}>
                {episodeCount} episodes
              </Badge>
            )}

            {guestScore && (
              <Badge variant="secondary" data-testid={`badge-guest-score-${id}`}>
                Guest Score: {guestScore}%
              </Badge>
            )}

            <Badge variant={statusConfig[status].variant} data-testid={`badge-status-${id}`}>
              {statusConfig[status].label}
            </Badge>
            
            {(channelUrl || websiteUrl) && (
              <a
                href={channelUrl || websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge variant="outline" className="gap-1 cursor-pointer" data-testid={`link-visit-channel-${id}`}>
                  <Youtube className="w-3 h-3" />
                  <span>Visit Channel</span>
                </Badge>
              </a>
            )}
          </div>

          {lastEpisode && (
            <p className="text-xs text-muted-foreground mt-2">
              Last episode: {lastEpisode}
            </p>
          )}

          {(status === "booked" || status === "published") && (bookingDate || recordingDate || publicationDate || streamingLink) && (
            <div className="mt-3 p-3 bg-muted/50 rounded-md space-y-2" data-testid={`booking-info-${id}`}>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>Booking Details</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                {bookingDate && (
                  <div data-testid={`text-booking-date-${id}`}>
                    <span className="font-medium">Booked:</span> {new Date(bookingDate).toLocaleDateString()}
                  </div>
                )}
                {recordingDate && (
                  <div data-testid={`text-recording-date-${id}`}>
                    <span className="font-medium">Recording:</span> {new Date(recordingDate).toLocaleDateString()}
                  </div>
                )}
                {publicationDate && (
                  <div data-testid={`text-publication-date-${id}`}>
                    <span className="font-medium">Publishing:</span> {new Date(publicationDate).toLocaleDateString()}
                  </div>
                )}
                {streamingLink && (
                  <div>
                    <a
                      href={streamingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                      data-testid={`link-streaming-${id}`}
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
      </div>

      <BookingDetailsDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        onSave={handleSaveBooking}
        showName={name}
        isPending={isBookingPending}
        initialBookingDate={bookingDate}
        initialRecordingDate={recordingDate}
        initialPublicationDate={publicationDate}
        initialStreamingLink={streamingLink}
      />
    </Card>
  );
}
