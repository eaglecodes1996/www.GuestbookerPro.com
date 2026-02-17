import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, ExternalLink, Mail, Users, TrendingUp, Youtube, Podcast } from "lucide-react";
import { useState } from "react";
import type { Show } from "@shared/schema";

export type MessageSentiment = "positive" | "neutral" | "negative";

interface Message {
  id: string;
  from: string;
  fromEmail: string;
  content: string;
  timestamp: string;
  isYou: boolean;
}

interface ConversationThreadProps {
  show: Show;
  messages: Message[];
  sentiment?: MessageSentiment;
  onReply?: (content: string) => void;
}

const sentimentConfig: Record<MessageSentiment, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  positive: { label: "Interested", variant: "default" },
  neutral: { label: "Maybe Later", variant: "secondary" },
  negative: { label: "Not Interested", variant: "destructive" },
};

export function ConversationThread({ show, messages, sentiment, onReply }: ConversationThreadProps) {
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    if (replyText.trim()) {
      onReply?.(replyText);
      setReplyText("");
    }
  };
  
  const formatNumber = (num: number | null | undefined) => {
    if (!num) return "N/A";
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Show Details Card */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={show.thumbnailUrl || ""} />
            <AvatarFallback>
              {show.host?.slice(0, 2).toUpperCase() || show.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold" data-testid="text-conversation-show">
                    {show.name}
                  </h2>
                  {show.platform === 'youtube' ? (
                    <Badge variant="secondary" className="gap-1">
                      <Youtube className="w-3 h-3" />
                      YouTube
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <Podcast className="w-3 h-3" />
                      Podcast
                    </Badge>
                  )}
                </div>
                
                {show.host && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Hosted by {show.host}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {show.subscribers && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(show.subscribers)} subscribers</span>
                    </div>
                  )}
                  {show.averageViews && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{formatNumber(show.averageViews)} avg views</span>
                    </div>
                  )}
                  {show.guestScore && (
                    <Badge variant="outline" className="text-xs">
                      Guest Score: {show.guestScore}/100
                    </Badge>
                  )}
                </div>
              </div>
              
              {sentiment && (
                <Badge variant={sentimentConfig[sentiment].variant} data-testid="badge-sentiment">
                  {sentimentConfig[sentiment].label}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {show.contactEmail && (
                <a
                  href={`mailto:${show.contactEmail}`}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                  data-testid="link-show-email"
                >
                  <Mail className="w-4 h-4" />
                  {show.contactEmail}
                </a>
              )}
              
              {show.platform === 'youtube' && show.youtubeChannelId && (
                <a
                  href={`https://youtube.com/channel/${show.youtubeChannelId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                  data-testid="link-show-channel"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Channel
                </a>
              )}
              
              {show.websiteUrl && (
                <a
                  href={show.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                  data-testid="link-show-website"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`p-4 ${message.isYou ? "bg-accent/20" : ""}`}>
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback>{message.from.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-medium text-sm" data-testid={`text-message-from-${message.id}`}>
                    {message.from}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`text-message-time-${message.id}`}>
                    {message.timestamp}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{message.fromEmail}</p>
                <p className="text-sm mt-2 whitespace-pre-wrap" data-testid={`text-message-content-${message.id}`}>
                  {message.content}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className="min-h-[100px]"
            data-testid="input-reply"
          />
          <div className="flex justify-end">
            <Button onClick={handleSendReply} className="gap-2" data-testid="button-send-reply">
              <Send className="w-4 h-4" />
              Send Reply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
