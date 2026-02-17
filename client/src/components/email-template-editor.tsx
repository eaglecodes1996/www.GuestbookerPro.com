import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EmailTemplateEditorProps {
  initialSubject?: string;
  initialBody?: string;
  onSave?: (subject: string, body: string) => void;
}

const availableTokens = [
  { token: "{{host_name}}", description: "Host's name" },
  { token: "{{show_name}}", description: "Show title" },
  { token: "{{your_name}}", description: "Your name" },
  { token: "{{your_title}}", description: "Your title/role" },
  { token: "{{your_main_link}}", description: "Your primary link" },
];

export function EmailTemplateEditor({ initialSubject = "", initialBody = "", onSave }: EmailTemplateEditorProps) {
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const { toast } = useToast();

  const insertToken = (token: string) => {
    setBody(body + token);
  };

  const handleSave = () => {
    onSave?.(subject, body);
    toast({
      title: "Template saved",
      description: "Your email template has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Potential guest for {{show_name}}"
              className="mt-2"
              data-testid="input-email-subject"
            />
          </div>

          <div>
            <Label htmlFor="body">Email Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hello {{host_name}},&#10;&#10;My name is {{your_name}}, and I'm {{your_title}}..."
              className="mt-2 min-h-[300px] font-mono text-sm"
              data-testid="input-email-body"
            />
          </div>

          <div>
            <Label>Available Tokens</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTokens.map(({ token, description }) => (
                <Badge
                  key={token}
                  variant="outline"
                  className="cursor-pointer gap-1 hover-elevate"
                  onClick={() => insertToken(token)}
                  data-testid={`badge-token-${token.replace(/[{}]/g, '')}`}
                >
                  <Copy className="w-3 h-3" />
                  {token}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Click a token to insert it into your template</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {body.length} characters
            </p>
            <Button onClick={handleSave} data-testid="button-save-template">
              Save Template
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Subject:</p>
            <p className="text-sm mt-1" data-testid="text-preview-subject">
              {subject || "(No subject)"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Body:</p>
            <p className="text-sm mt-1 whitespace-pre-wrap" data-testid="text-preview-body">
              {body || "(No body)"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
