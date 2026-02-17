import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Mail, Info } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { SystemTemplate } from "@shared/schema";

export default function AdminTemplates() {
  const { toast } = useToast();
  const [editingTemplate, setEditingTemplate] = useState<SystemTemplate | null>(null);
  const [formData, setFormData] = useState({ name: "", subject: "", body: "", isActive: true });

  const { data: templates, isLoading, error } = useQuery<SystemTemplate[]>({
    queryKey: ["/api/admin/templates"],
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; name: string; subject: string; body: string; isActive: boolean }) => {
      return apiRequest("/api/admin/templates/" + data.id, "PUT", {
        name: data.name,
        subject: data.subject,
        body: data.body,
        isActive: data.isActive,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/templates"] });
      setEditingTemplate(null);
      toast({
        title: "Template Updated",
        description: "The template has been saved successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update template",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (template: SystemTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject || "",
      body: template.body,
      isActive: template.isActive,
    });
  };

  const handleSave = () => {
    if (!editingTemplate) return;
    
    // Validate form
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Template name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.body.trim()) {
      toast({
        title: "Validation Error",
        description: "Template body is required",
        variant: "destructive",
      });
      return;
    }
    
    updateMutation.mutate({
      id: editingTemplate.id,
      name: formData.name,
      subject: formData.subject,
      body: formData.body,
      isActive: formData.isActive,
    });
  };

  const handleCancel = () => {
    setEditingTemplate(null);
    setFormData({ name: "", subject: "", body: "", isActive: true });
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
          <p className="text-sm text-destructive">
            Failed to load templates. You may not have admin permissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="heading-admin-templates">
          Email & Invoice Templates
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize welcome emails and invoice templates sent to users
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {templates?.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {template.templateType === "welcome_email" ? (
                      <Mail className="w-5 h-5 text-primary" />
                    ) : (
                      <FileText className="w-5 h-5 text-primary" />
                    )}
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <Badge variant="outline">{template.templateType.replace("_", " ")}</Badge>
                </div>
                {template.subject && (
                  <CardDescription className="mt-2">
                    Subject: {template.subject}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {editingTemplate?.id === template.id ? (
                  <>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1 text-xs">
                          <p className="font-semibold">Available template tokens:</p>
                          <ul className="list-disc list-inside space-y-0.5">
                            <li><code>{"{{"} username {"}}}"}</code> - User's username</li>
                            <li><code>{"{{"} email {"}}}"}</code> - User's email address</li>
                            <li><code>{"{{"} tier {"}}}"}</code> - Subscription tier (Basic, Growth, Pro, Agency)</li>
                            <li><code>{"{{"} searches {"}}}"}</code> - Monthly show discovery quota</li>
                            {template.templateType === "invoice" && (
                              <>
                                <li><code>{"{{"} amount {"}}}"}</code> - Payment amount</li>
                                <li><code>{"{{"} billing_period {"}}}"}</code> - Billing period</li>
                                <li><code>{"{{"} next_billing_date {"}}}"}</code> - Next billing date</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <div className="flex items-center justify-between gap-4 p-3 bg-muted/50 rounded-md">
                      <div className="space-y-0.5">
                        <Label htmlFor={`active-${template.id}`}>Template Active</Label>
                        <p className="text-xs text-muted-foreground">
                          {formData.isActive ? "This template will be used" : "This template is disabled"}
                        </p>
                      </div>
                      <Switch
                        id={`active-${template.id}`}
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                        data-testid={`switch-template-active-${template.id}`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`name-${template.id}`}>Template Name</Label>
                      <Input
                        id={`name-${template.id}`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        data-testid={`input-template-name-${template.id}`}
                      />
                    </div>
                    {template.templateType === "welcome_email" && (
                      <div className="space-y-2">
                        <Label htmlFor={`subject-${template.id}`}>Email Subject</Label>
                        <Input
                          id={`subject-${template.id}`}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          data-testid={`input-template-subject-${template.id}`}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor={`body-${template.id}`}>Template Body</Label>
                      <Textarea
                        id={`body-${template.id}`}
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        className="min-h-[300px] font-mono text-sm"
                        data-testid={`textarea-template-body-${template.id}`}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSave} 
                        disabled={updateMutation.isPending}
                        data-testid={`button-save-template-${template.id}`}
                      >
                        {updateMutation.isPending ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        data-testid={`button-cancel-edit-${template.id}`}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={template.isActive ? "default" : "secondary"}>
                        {template.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="bg-muted/50 rounded-md p-4">
                      <pre className="text-xs whitespace-pre-wrap font-mono">
                        {template.body}
                      </pre>
                    </div>
                    <Button 
                      onClick={() => handleEdit(template)}
                      data-testid={`button-edit-template-${template.id}`}
                    >
                      Edit Template
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
