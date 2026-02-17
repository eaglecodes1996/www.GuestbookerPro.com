import { ProfileForm } from "@/components/profile-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Profile } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const [emailSettings, setEmailSettings] = useState({
    fromEmail: "",
    maxFollowups: 2,
    followupDelay: 7,
    maxDailyOutreach: 20,
  });

  const [discoverySettings, setDiscoverySettings] = useState({
    minSubscribers: 800,
    minEpisodes: 10,
    guestOnlyShows: true,
    activeOnlyShows: true,
    targetShowCount: 20,
    maxChannelsToSearch: 200,
  });

  useEffect(() => {
    if (profile) {
      setEmailSettings({
        fromEmail: profile.fromEmail || "",
        maxFollowups: profile.maxFollowups || 2,
        followupDelay: profile.followupDelay || 7,
        maxDailyOutreach: profile.maxDailyOutreach || 20,
      });
      setDiscoverySettings({
        minSubscribers: profile.minSubscribers || 800,
        minEpisodes: profile.minEpisodes || 10,
        guestOnlyShows: profile.guestOnlyShows ?? true,
        activeOnlyShows: profile.activeOnlyShows ?? true,
        targetShowCount: profile.targetShowCount || 20,
        maxChannelsToSearch: profile.maxChannelsToSearch || 200,
      });
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      if (profile?.id) {
        return apiRequest("PATCH", `/api/profiles/${profile.id}`, data);
      } else {
        return apiRequest("POST", "/api/profile", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" data-testid="tab-profile">
            Profile
          </TabsTrigger>
          <TabsTrigger value="email" data-testid="tab-email">
            Email Settings
          </TabsTrigger>
          <TabsTrigger value="discovery" data-testid="tab-discovery">
            Discovery Filters
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">
            Account & Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          {profileLoading ? (
            <Skeleton className="h-96" />
          ) : (
            <ProfileForm
              initialData={{
                name: profile?.name || "",
                title: profile?.title || "",
                bio: profile?.bio || "",
                website: profile?.website || "",
                topics: profile?.topics || [],
                keywords: profile?.keywords || [],
              }}
              onSave={(data) => updateProfileMutation.mutate(data)}
            />
          )}
        </TabsContent>

        <TabsContent value="email">
          {profileLoading ? (
            <Skeleton className="h-96" />
          ) : (
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Email Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                      className="mt-2"
                      data-testid="input-from-email"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Follow-up Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="followup-count">Number of Follow-ups</Label>
                    <Input
                      id="followup-count"
                      type="number"
                      min="0"
                      max="3"
                      value={emailSettings.maxFollowups}
                      onChange={(e) => setEmailSettings({ ...emailSettings, maxFollowups: parseInt(e.target.value) || 0 })}
                      className="mt-2"
                      data-testid="input-followup-count"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum 3 follow-ups per show
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="followup-delay">Delay Between Follow-ups (days)</Label>
                    <Input
                      id="followup-delay"
                      type="number"
                      min="1"
                      value={emailSettings.followupDelay}
                      onChange={(e) => setEmailSettings({ ...emailSettings, followupDelay: parseInt(e.target.value) || 1 })}
                      className="mt-2"
                      data-testid="input-followup-delay"
                    />
                  </div>

                  <div>
                    <Label htmlFor="daily-limit">Max Outreach Per Day</Label>
                    <Input
                      id="daily-limit"
                      type="number"
                      min="1"
                      value={emailSettings.maxDailyOutreach}
                      onChange={(e) => setEmailSettings({ ...emailSettings, maxDailyOutreach: parseInt(e.target.value) || 1 })}
                      className="mt-2"
                      data-testid="input-daily-limit"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Prevents spam and respects email provider limits
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={() => updateProfileMutation.mutate(emailSettings)} data-testid="button-save-email-settings">
                  Save Email Settings
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="discovery">
          {profileLoading ? (
            <Skeleton className="h-96" />
          ) : (
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Discovery Goals</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="target-show-count">Target Show Count</Label>
                    <Input
                      id="target-show-count"
                      type="number"
                      min="1"
                      value={discoverySettings.targetShowCount}
                      onChange={(e) => setDiscoverySettings({ ...discoverySettings, targetShowCount: parseInt(e.target.value) || 1 })}
                      className="mt-2"
                      data-testid="input-target-show-count"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      How many qualifying shows you want to discover per run
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="max-channels">Max Channels to Search</Label>
                    <Input
                      id="max-channels"
                      type="number"
                      min="50"
                      value={discoverySettings.maxChannelsToSearch}
                      onChange={(e) => setDiscoverySettings({ ...discoverySettings, maxChannelsToSearch: parseInt(e.target.value) || 50 })}
                      className="mt-2"
                      data-testid="input-max-channels"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum channels to check (prevents API quota exhaustion)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Quality Filters</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="min-subscribers">Minimum Subscribers</Label>
                    <Input
                      id="min-subscribers"
                      type="number"
                      value={discoverySettings.minSubscribers}
                      onChange={(e) => setDiscoverySettings({ ...discoverySettings, minSubscribers: parseInt(e.target.value) || 0 })}
                      className="mt-2"
                      data-testid="input-min-subscribers"
                    />
                  </div>

                  <div>
                    <Label htmlFor="min-episodes">Minimum Episodes</Label>
                    <Input
                      id="min-episodes"
                      type="number"
                      value={discoverySettings.minEpisodes}
                      onChange={(e) => setDiscoverySettings({ ...discoverySettings, minEpisodes: parseInt(e.target.value) || 0 })}
                      className="mt-2"
                      data-testid="input-min-episodes"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label htmlFor="guest-only">Guest-Focused Shows Only</Label>
                      <p className="text-sm text-muted-foreground">
                        Only show podcasts that regularly feature guests
                      </p>
                    </div>
                    <Switch 
                      id="guest-only" 
                      checked={discoverySettings.guestOnlyShows}
                      onCheckedChange={(checked) => setDiscoverySettings({ ...discoverySettings, guestOnlyShows: checked })}
                      data-testid="switch-guest-only" 
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label htmlFor="active-only">Active Shows Only</Label>
                      <p className="text-sm text-muted-foreground">
                        Only shows with episodes in the last 3 months
                      </p>
                    </div>
                    <Switch 
                      id="active-only" 
                      checked={discoverySettings.activeOnlyShows}
                      onCheckedChange={(checked) => setDiscoverySettings({ ...discoverySettings, activeOnlyShows: checked })}
                      data-testid="switch-active-only" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={() => updateProfileMutation.mutate(discoverySettings)} data-testid="button-save-discovery-settings">
                  Save Discovery Settings
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="security">
          {profileLoading ? (
            <Skeleton className="h-96" />
          ) : (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Update your password to keep your account secure. Use a strong password with uppercase letters, lowercase letters, and numbers.
                  </p>
                  
                  <PasswordChangeForm />
                </div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Password Change Form Component
function PasswordChangeForm() {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: async (variables: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
      if (variables.newPassword !== variables.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await apiRequest("POST", "/api/auth/change-password", {
        currentPassword: variables.currentPassword,
        newPassword: variables.newPassword,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Change Password",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation must match",
        variant: "destructive",
      });
      return;
    }
    
    changePasswordMutation.mutate({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          type={showPasswords ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter your current password"
          className="mt-1"
          data-testid="input-current-password"
        />
      </div>

      <div>
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type={showPasswords ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password (min 8 chars)"
          className="mt-1"
          data-testid="input-new-password"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Must be at least 8 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div>
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type={showPasswords ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="mt-1"
          data-testid="input-confirm-password"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch 
          id="show-passwords" 
          checked={showPasswords}
          onCheckedChange={setShowPasswords}
        />
        <Label htmlFor="show-passwords" className="cursor-pointer">
          Show passwords
        </Label>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button 
          type="submit" 
          disabled={changePasswordMutation.isPending}
          data-testid="button-change-password"
        >
          {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
        </Button>
      </div>
    </form>
  );
}
