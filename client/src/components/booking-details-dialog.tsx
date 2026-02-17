import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface BookingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (details: {
    bookingDate?: string;
    recordingDate?: string;
    publicationDate?: string;
    streamingLink?: string;
  }) => Promise<void>;
  showName: string;
  isPending?: boolean;
  initialBookingDate?: string;
  initialRecordingDate?: string;
  initialPublicationDate?: string;
  initialStreamingLink?: string;
}

export function BookingDetailsDialog({
  open,
  onOpenChange,
  onSave,
  showName,
  isPending = false,
  initialBookingDate = "",
  initialRecordingDate = "",
  initialPublicationDate = "",
  initialStreamingLink = "",
}: BookingDetailsDialogProps) {
  const [bookingDate, setBookingDate] = useState(initialBookingDate);
  const [recordingDate, setRecordingDate] = useState(initialRecordingDate);
  const [publicationDate, setPublicationDate] = useState(initialPublicationDate);
  const [streamingLink, setStreamingLink] = useState(initialStreamingLink);
  const [errors, setErrors] = useState<{ streamingLink?: string }>({});

  useEffect(() => {
    if (open) {
      setBookingDate(initialBookingDate);
      setRecordingDate(initialRecordingDate);
      setPublicationDate(initialPublicationDate);
      setStreamingLink(initialStreamingLink);
      setErrors({});
    }
  }, [open, initialBookingDate, initialRecordingDate, initialPublicationDate, initialStreamingLink]);

  const validateUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    const newErrors: { streamingLink?: string } = {};

    if (streamingLink && !validateUrl(streamingLink)) {
      newErrors.streamingLink = "Please enter a valid URL";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      bookingDate: bookingDate || undefined,
      recordingDate: recordingDate || undefined,
      publicationDate: publicationDate || undefined,
      streamingLink: streamingLink || undefined,
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isPending) {
      return;
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent data-testid="dialog-booking-details">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Track your interview details for {showName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="booking-date">Booking Date</Label>
            <Input
              id="booking-date"
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="mt-2"
              disabled={isPending}
              data-testid="input-booking-date"
            />
            <p className="text-xs text-muted-foreground mt-1">
              When you confirmed the interview
            </p>
          </div>

          <div>
            <Label htmlFor="recording-date">Recording Date</Label>
            <Input
              id="recording-date"
              type="date"
              value={recordingDate}
              onChange={(e) => setRecordingDate(e.target.value)}
              className="mt-2"
              disabled={isPending}
              data-testid="input-recording-date"
            />
            <p className="text-xs text-muted-foreground mt-1">
              When you'll record/recorded the interview
            </p>
          </div>

          <div>
            <Label htmlFor="publication-date">Publication Date</Label>
            <Input
              id="publication-date"
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              className="mt-2"
              disabled={isPending}
              data-testid="input-publication-date"
            />
            <p className="text-xs text-muted-foreground mt-1">
              When the episode will go live
            </p>
          </div>

          <div>
            <Label htmlFor="streaming-link">Streaming Link</Label>
            <Input
              id="streaming-link"
              type="url"
              placeholder="https://..."
              value={streamingLink}
              onChange={(e) => {
                setStreamingLink(e.target.value);
                if (errors.streamingLink) {
                  setErrors({ ...errors, streamingLink: undefined });
                }
              }}
              className="mt-2"
              disabled={isPending}
              data-testid="input-streaming-link"
            />
            {errors.streamingLink ? (
              <p className="text-xs text-destructive mt-1" data-testid="error-streaming-link">
                {errors.streamingLink}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Link to the published episode
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            data-testid="button-cancel-booking"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            data-testid="button-save-booking"
          >
            {isPending ? "Saving..." : "Save Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
