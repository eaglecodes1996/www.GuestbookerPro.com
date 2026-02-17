import { EmailTemplateEditor } from "@/components/email-template-editor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Clock, Send } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { EmailTemplate, OutreachCampaign } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function Outreach() {
  const { toast } = useToast();

  const { data: template, isLoading: templateLoading } = useQuery<EmailTemplate>({
    queryKey: ["/api/templates/default"],
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery<OutreachCampaign[]>({
    queryKey: ["/api/outreach"],
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async ({ subject, body }: { subject: string; body: string }) => {
      if (template) {
        return apiRequest("PATCH", `/api/templates/${template.id}`, { subject, body });
      } else {
        return apiRequest("POST", "/api/templates", { name: "Default", subject, body, isDefault: true });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates/default"] });
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      toast({
        title: "Template saved",
        description: "Your email template has been updated.",
      });
    },
  });

  const sentToday = campaigns?.filter((c) => {
    if (!c.sentAt) return false;
    const today = new Date();
    const sentDate = new Date(c.sentAt);
    return sentDate.toDateString() === today.toDateString();
  }).length || 0;

  const pending = campaigns?.filter((c) => c.status === "pending").length || 0;
  const totalSent = campaigns?.filter((c) => c.status === "sent" || c.status === "replied").length || 0;

  const outreachStats = [
    { label: "Sent Today", value: sentToday, icon: Send },
    { label: "Pending", value: pending, icon: Clock },
    { label: "Total Sent", value: totalSent, icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">
          Outreach
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage email templates and outreach campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {outreachStats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-md">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="template" className="space-y-6">
        <TabsList>
          <TabsTrigger value="template" data-testid="tab-template">
            Email Template
          </TabsTrigger>
          <TabsTrigger value="queue" data-testid="tab-queue">
            Outreach Queue
          </TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-history">
            Send History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="template">
          {templateLoading ? (
            <Skeleton className="h-96" />
          ) : (
            <EmailTemplateEditor
              initialSubject={template?.subject || "Potential guest for {{show_name}}"}
              initialBody={template?.body || `Hello {{host_name}},\n\nMy name is {{your_name}}, and I'm {{your_title}}. I've been following {{show_name}} and I'm impressed by the quality of conversations you have with your guests.\n\nI believe I could bring value to your audience by sharing insights about my work. You can learn more about my background here: {{your_main_link}}\n\nWould you be open to having me as a guest on your show?\n\nBest regards,\n{{your_name}}`}
              onSave={(subject, body) =>
                updateTemplateMutation.mutate({ subject, body })
              }
            />
          )}
        </TabsContent>

        <TabsContent value="queue">
          <Card className="p-6">
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No shows in queue</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Approve shows from the Shows page to add them to your outreach queue
              </p>
              <Button data-testid="button-browse-shows">Browse Shows</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          {campaignsLoading ? (
            <Skeleton className="h-64" />
          ) : campaigns && campaigns.length > 0 ? (
            <div className="space-y-3">
              {campaigns
                .filter((c) => c.status === "sent" || c.status === "replied")
                .map((campaign) => (
                  <Card key={campaign.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">Show ID: {campaign.showId}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sent to {campaign.toEmail}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={campaign.status === "replied" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {campaign.sentAt ? formatDistanceToNow(new Date(campaign.sentAt), { addSuffix: true }) : ""}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No emails sent yet</h3>
                <p className="text-sm text-muted-foreground">
                  Your sent emails will appear here
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
