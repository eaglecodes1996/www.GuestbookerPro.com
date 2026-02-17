import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileFormProps {
  initialData?: {
    name: string;
    title: string;
    bio: string;
    website?: string;
    topics: string[];
    keywords?: string[];
  };
  onSave?: (data: any) => void;
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [topics, setTopics] = useState<string[]>(initialData?.topics || []);
  const [topicInput, setTopicInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const [keywordInput, setKeywordInput] = useState("");
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiSeedKeyword, setAiSeedKeyword] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);
  const { toast } = useToast();

  const addTopic = () => {
    // Split by comma and add all non-empty, non-duplicate topics
    const newTopics = topicInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t && !topics.includes(t));
    
    if (newTopics.length > 0) {
      setTopics([...topics, ...newTopics]);
      setTopicInput("");
    }
  };

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  const addKeyword = () => {
    // Split by comma and add all non-empty, non-duplicate keywords
    const newKeywords = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k && !keywords.includes(k));
    
    if (newKeywords.length > 0) {
      setKeywords([...keywords, ...newKeywords]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const generateKeywordsMutation = useMutation({
    mutationFn: async (seedKeyword: string) => {
      const response = await apiRequest("POST", "/api/keywords/generate", { seedKeyword });
      return response.json();
    },
    onSuccess: (data: any) => {
      setGeneratedKeywords(data.keywords || []);
      toast({
        title: "Keywords Generated",
        description: `Generated ${data.keywords?.length || 0} related keywords using AI.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate keywords",
        variant: "destructive",
      });
    },
  });

  const handleGenerateKeywords = () => {
    if (!aiSeedKeyword.trim()) {
      toast({
        title: "Seed Required",
        description: "Please enter a seed keyword to generate similar keywords.",
        variant: "destructive",
      });
      return;
    }
    setGeneratedKeywords([]);
    generateKeywordsMutation.mutate(aiSeedKeyword);
  };

  const addGeneratedKeyword = (keyword: string) => {
    if (!keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setGeneratedKeywords(generatedKeywords.filter((k) => k !== keyword));
      toast({
        title: "Keyword Added",
        description: `"${keyword}" added to your keywords`,
      });
    }
  };

  const addAllGeneratedKeywords = () => {
    const newKeywords = generatedKeywords.filter((k) => !keywords.includes(k));
    setKeywords([...keywords, ...newKeywords]);
    setGeneratedKeywords([]);
    setAiDialogOpen(false);
    toast({
      title: "Keywords Added",
      description: `Added ${newKeywords.length} keywords to your profile`,
    });
  };

  const handleSave = () => {
    onSave?.({ name, title, bio, website, topics, keywords });
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="mt-2"
            data-testid="input-name"
          />
        </div>

        <div>
          <Label htmlFor="title">Title / Role</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Shaman in the Japanese Shinto tradition"
            className="mt-2"
            data-testid="input-title"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            className="mt-2 min-h-[120px]"
            data-testid="input-bio"
          />
        </div>

        <div>
          <Label htmlFor="website">Website / Main Link</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="mt-2"
            data-testid="input-website"
          />
        </div>

        <div>
          <Label htmlFor="topics">Expertise Topics</Label>
          <p className="text-xs text-muted-foreground mt-1">
            Broad areas of expertise for show discovery. Add multiple by separating with commas (e.g., Shinto, Spiritual Healing, Occult)
          </p>
          <div className="flex gap-2 mt-2">
            <Input
              id="topics"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())}
              placeholder="Add a topic..."
              data-testid="input-topic"
            />
            <Button onClick={addTopic} data-testid="button-add-topic">
              Add
            </Button>
          </div>

          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="gap-1" data-testid={`badge-topic-${topic}`}>
                  {topic}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTopic(topic)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="keywords">Filtering Keywords</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAiDialogOpen(true)}
              className="gap-2"
              data-testid="button-ai-keywords"
            >
              <Sparkles className="w-4 h-4" />
              AI Generate
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Specific keywords to filter relevant shows. Add multiple by separating with commas (e.g., Shamanism, Energy Clearing, Kundalini, Mediumship)
          </p>
          <div className="flex gap-2 mt-2">
            <Input
              id="keywords"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
              placeholder="Add a keyword..."
              data-testid="input-keyword"
            />
            <Button onClick={addKeyword} data-testid="button-add-keyword">
              Add
            </Button>
          </div>

          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="gap-1" data-testid={`badge-keyword-${keyword}`}>
                  {keyword}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeKeyword(keyword)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* AI Keyword Generation Dialog */}
        <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
          <DialogContent data-testid="dialog-ai-keywords">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Keyword Generation
              </DialogTitle>
              <DialogDescription>
                Enter a seed keyword and AI will generate related expertise topics and keywords for you.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="seed-keyword">Seed Keyword</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="seed-keyword"
                    value={aiSeedKeyword}
                    onChange={(e) => setAiSeedKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleGenerateKeywords())}
                    placeholder="e.g., Meditation"
                    data-testid="input-seed-keyword"
                  />
                  <Button
                    onClick={handleGenerateKeywords}
                    disabled={generateKeywordsMutation.isPending}
                    data-testid="button-generate-keywords"
                  >
                    {generateKeywordsMutation.isPending ? "Generating..." : "Generate"}
                  </Button>
                </div>
              </div>

              {generatedKeywords.length > 0 && (
                <div>
                  <Label>Generated Keywords</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click on a keyword to add it to your profile, or add all at once.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {generatedKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="gap-1 cursor-pointer hover-elevate"
                        onClick={() => addGeneratedKeyword(keyword)}
                        data-testid={`badge-generated-${keyword}`}
                      >
                        <Plus className="w-3 h-3" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setAiDialogOpen(false)}>
                Cancel
              </Button>
              {generatedKeywords.length > 0 && (
                <Button
                  onClick={addAllGeneratedKeywords}
                  data-testid="button-add-all-keywords"
                >
                  Add All ({generatedKeywords.length})
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSave} data-testid="button-save-profile">
            Save Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
