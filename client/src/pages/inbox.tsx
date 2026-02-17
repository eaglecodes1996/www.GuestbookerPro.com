import { ConversationThread, MessageSentiment } from "@/components/conversation-thread";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Inbox as InboxIcon, Youtube, Podcast, Users } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Conversation as ConversationType, Show } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export default function Inbox() {
  const { data: conversations, isLoading } = useQuery<ConversationType[]>({
    queryKey: ["/api/conversations"],
  });

  const { data: shows } = useQuery<Show[]>({
    queryKey: ["/api/shows"],
  });

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const [selectedConversationState, setSelectedConversationState] = useState<ConversationType | null>(null);

  const selected = conversations?.find((c) => c.id === selectedConversation);
  
  if (selected && selected !== selectedConversationState) {
    setSelectedConversationState(selected);
  }

  const selectedShow = selected ? shows?.find((s) => s.id === selected.showId) : null;

  const messages = selected ? (selected.messages as any[]) : [];

  const replyMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      return apiRequest("POST", `/api/conversations/${id}/reply`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Inbox
          </h1>
          <p className="text-muted-foreground mt-1">
            Track replies and manage conversations
          </p>
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Inbox
          </h1>
          <p className="text-muted-foreground mt-1">
            Track replies and manage conversations
          </p>
        </div>

        <Card className="p-12">
          <div className="text-center">
            <InboxIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
            <p className="text-sm text-muted-foreground">
              Your conversations will appear here once hosts reply to your outreach
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">
          Inbox
        </h1>
        <p className="text-muted-foreground mt-1">
          Track replies and manage conversations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {conversations.map((conv) => {
            const show = shows?.find((s) => s.id === conv.showId);
            const convMessages = (conv.messages as any[]) || [];
            const lastMsg = convMessages[convMessages.length - 1];
            
            return (
              <Card
                key={conv.id}
                className={`p-4 cursor-pointer hover-elevate ${
                  selectedConversation === conv.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedConversation(conv.id)}
                data-testid={`card-conversation-${conv.id}`}
              >
                <div className="flex gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={show?.thumbnailUrl || ""} />
                    <AvatarFallback>
                      {show?.host?.slice(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <h4 className="font-medium text-sm truncate">
                          {show?.name || "Unknown Show"}
                        </h4>
                        {show?.platform === 'youtube' ? (
                          <Youtube className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <Podcast className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                      {conv.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-muted-foreground truncate">
                        {show?.host || "Unknown Host"}
                      </p>
                      {show?.subscribers && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{show.subscribers.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {lastMsg?.content || "No messages"}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        {conv.lastMessageAt ? formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true }) : ""}
                      </p>
                      <Badge
                        variant={
                          conv.sentiment === "positive"
                            ? "default"
                            : conv.sentiment === "neutral"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {conv.sentiment || "neutral"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-2">
          {selected && selectedShow ? (
            <ConversationThread
              show={selectedShow}
              messages={messages}
              sentiment={selected.sentiment as MessageSentiment || "neutral"}
              onReply={(content) => replyMutation.mutate({ id: selected.id, content })}
            />
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <InboxIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a conversation from the list to view messages and reply
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
