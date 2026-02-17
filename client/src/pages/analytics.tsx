import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { TrendingUp, Target, Mail, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function Analytics() {
  const { data: stats, isLoading } = useQuery<AnalyticsStats>({
    queryKey: ["/api/analytics/stats"],
  });

  const bookingRate = stats && stats.outreachSent > 0 
    ? Math.round((stats.bookings / stats.outreachSent) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your outreach performance and success metrics
          </p>
        </div>

        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]" data-testid="select-timeframe">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </>
        ) : (
          <>
            <MetricCard
              title="Response Rate"
              value={`${stats?.responseRate || 0}%`}
              icon={TrendingUp}
              testId="metric-response-rate"
            />
            <MetricCard
              title="Booking Rate"
              value={`${bookingRate}%`}
              icon={Target}
              testId="metric-booking-rate"
            />
            <MetricCard
              title="Emails Sent"
              value={stats?.outreachSent.toString() || "0"}
              icon={Mail}
              testId="metric-emails-sent"
            />
            <MetricCard
              title="Positive Replies"
              value={stats?.positiveReplies.toString() || "0"}
              icon={CheckCircle}
              testId="metric-positive-replies"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Performance by Topic</h3>
          <div className="space-y-4">
            {[
              { topic: "Spiritual Healing", sent: 25, replies: 9, rate: "36%" },
              { topic: "Shinto Traditions", sent: 18, replies: 7, rate: "39%" },
              { topic: "Occult Studies", sent: 15, replies: 4, rate: "27%" },
              { topic: "New Age", sent: 10, replies: 3, rate: "30%" },
            ].map((item) => (
              <div key={item.topic} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{item.topic}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.sent} sent · {item.replies} replies
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{item.rate}</p>
                  <p className="text-xs text-muted-foreground">response rate</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Performance by Platform</h3>
          <div className="space-y-4">
            {[
              { platform: "YouTube", sent: 32, replies: 12, rate: "38%" },
              { platform: "Podcast", sent: 28, replies: 9, rate: "32%" },
              { platform: "Both", sent: 8, replies: 2, rate: "25%" },
            ].map((item) => (
              <div key={item.platform} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{item.platform}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.sent} sent · {item.replies} replies
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{item.rate}</p>
                  <p className="text-xs text-muted-foreground">response rate</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Bookings</h3>
        <div className="space-y-3">
          {[
            {
              show: "The Spiritual Journey Podcast",
              date: "Dec 15, 2024",
              status: "Scheduled",
            },
            {
              show: "Mystic Minds YouTube",
              date: "Dec 22, 2024",
              status: "Confirmed",
            },
            {
              show: "Healing Conversations",
              date: "Jan 5, 2025",
              status: "Pending",
            },
          ].map((booking, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-md"
            >
              <div>
                <p className="font-medium">{booking.show}</p>
                <p className="text-sm text-muted-foreground">{booking.date}</p>
              </div>
              <div className="text-sm text-muted-foreground">{booking.status}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
