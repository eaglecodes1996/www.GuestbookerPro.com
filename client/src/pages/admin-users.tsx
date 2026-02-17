import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  User2,
  Search,
  Edit2,
  Shield,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserWithStats = {
  id: string;
  username: string;
  subscriptionTier: string;
  maxProfiles: number;
  maxDiscoveryPerMonth: number;
  maxEmailsPerMonth: number;
  createdAt: string | null;
  profileCount: number;
  showCount: number;
};

// Subscription tier configurations
const tierConfigs = {
  basic: {
    price: "$29.99/mo",
    maxProfiles: 1,
    monthlyDiscoveryQuota: 100,
    monthlyOutreachQuota: 100,
  },
  growth: {
    price: "$59/mo",
    maxProfiles: 3,
    monthlyDiscoveryQuota: 500,
    monthlyOutreachQuota: 500,
  },
  pro: {
    price: "$99/mo",
    maxProfiles: 10,
    monthlyDiscoveryQuota: 1000,
    monthlyOutreachQuota: 1000,
  },
  agency: {
    price: "$399.99/mo",
    maxProfiles: Infinity,
    monthlyDiscoveryQuota: 10000,
    monthlyOutreachQuota: 10000,
  },
  unlimited: {
    price: "Admin",
    maxProfiles: Infinity,
    monthlyDiscoveryQuota: Infinity,
    monthlyOutreachQuota: Infinity,
  },
};

export default function AdminUsers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null);
  const [editForm, setEditForm] = useState({
    subscriptionTier: "",
    maxProfiles: 0,
    maxDiscoveryPerMonth: 0,
    maxEmailsPerMonth: 0,
  });

  const { data: users = [], isLoading } = useQuery<UserWithStats[]>({
    queryKey: ["/api/admin/users"],
  });

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/admin/users/${selectedUser!.id}`, editForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "User Updated",
        description: "User subscription has been updated successfully.",
      });
      setEditDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    },
  });

  const handleEditUser = (user: UserWithStats) => {
    setSelectedUser(user);
    setEditForm({
      subscriptionTier: user.subscriptionTier,
      maxProfiles: user.maxProfiles,
      maxDiscoveryPerMonth: user.maxDiscoveryPerMonth,
      maxEmailsPerMonth: user.maxEmailsPerMonth,
    });
    setEditDialogOpen(true);
  };

  const handleTierChange = (tier: string) => {
    const config = tierConfigs[tier as keyof typeof tierConfigs];
    setEditForm({
      subscriptionTier: tier,
      maxProfiles: config.maxProfiles === Infinity ? 99999 : config.maxProfiles,
      maxDiscoveryPerMonth: config.monthlyDiscoveryQuota === Infinity ? 99999 : config.monthlyDiscoveryQuota,
      maxEmailsPerMonth: config.monthlyOutreachQuota === Infinity ? 99999 : config.monthlyOutreachQuota,
    });
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2" data-testid="text-page-title">
          <Shield className="w-8 h-8 text-primary" />
          User Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage customer subscriptions, quotas, and account settings
        </p>
      </div>

      {/* Subscription Tiers Info */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(tierConfigs).map(([tier, config]) => (
          <Card key={tier} className="p-4">
            <div>
              <Badge variant="outline">
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </Badge>
              <p className="text-lg font-bold mt-2">{config.price}</p>
              <div className="text-xs text-muted-foreground mt-2 space-y-1">
                <p>Profiles: {config.maxProfiles === Infinity ? "Unlimited" : config.maxProfiles}</p>
                <p>Discovery: {config.monthlyDiscoveryQuota === Infinity ? "Unlimited" : config.monthlyDiscoveryQuota}/mo</p>
                <p>Outreach: {config.monthlyOutreachQuota === Infinity ? "Unlimited" : config.monthlyOutreachQuota}/mo</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by username..."
            className="pl-10"
            data-testid="input-search-users"
          />
        </div>
        <Badge variant="outline" className="px-4 py-2">
          {filteredUsers.length} / {users.length} users
        </Badge>
      </div>

      {/* Users Table */}
      <Card>
        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Profiles</TableHead>
                  <TableHead className="text-right">Shows</TableHead>
                  <TableHead className="text-right">Discovery</TableHead>
                  <TableHead className="text-right">Outreach</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => {
                    const tierConfig = tierConfigs[user.subscriptionTier as keyof typeof tierConfigs] || tierConfigs.basic;
                    return (
                      <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <User2 className="w-4 h-4 text-muted-foreground" />
                          {user.username}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {user.subscriptionTier}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{tierConfig.price}</TableCell>
                        <TableCell className="text-right">
                          {user.profileCount} / {user.maxProfiles === 99999 ? "∞" : user.maxProfiles}
                        </TableCell>
                        <TableCell className="text-right">{user.showCount}</TableCell>
                        <TableCell className="text-right">
                          {user.maxDiscoveryPerMonth === 99999 ? "Unlimited" : user.maxDiscoveryPerMonth.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {user.maxEmailsPerMonth === 99999 ? "Unlimited" : user.maxEmailsPerMonth.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            data-testid={`button-edit-user-${user.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent data-testid="dialog-edit-user">
          <DialogHeader>
            <DialogTitle>Edit User Subscription</DialogTitle>
            <DialogDescription>
              Update {selectedUser?.username}'s subscription tier and quotas
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="tier">Subscription Tier</Label>
              <Select value={editForm.subscriptionTier} onValueChange={handleTierChange}>
                <SelectTrigger id="tier" data-testid="select-tier">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - $29.99/mo</SelectItem>
                  <SelectItem value="growth">Growth - $39/mo</SelectItem>
                  <SelectItem value="pro">Pro - $99/mo</SelectItem>
                  <SelectItem value="agency">Agency - $399.99/mo</SelectItem>
                  <SelectItem value="unlimited">Admin (Unlimited)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxProfiles">Max Profiles</Label>
                <Input
                  id="maxProfiles"
                  type="number"
                  value={editForm.maxProfiles}
                  onChange={(e) => setEditForm({ ...editForm, maxProfiles: parseInt(e.target.value) || 0 })}
                  data-testid="input-max-profiles"
                />
              </div>

              <div>
                <Label htmlFor="discoveryQuota">Discovery Quota/Month</Label>
                <Input
                  id="discoveryQuota"
                  type="number"
                  value={editForm.maxDiscoveryPerMonth}
                  onChange={(e) => setEditForm({ ...editForm, maxDiscoveryPerMonth: parseInt(e.target.value) || 0 })}
                  data-testid="input-discovery-quota"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="outreachQuota">Outreach Quota/Month</Label>
              <Input
                id="outreachQuota"
                type="number"
                value={editForm.maxEmailsPerMonth}
                onChange={(e) => setEditForm({ ...editForm, maxEmailsPerMonth: parseInt(e.target.value) || 0 })}
                data-testid="input-outreach-quota"
              />
            </div>

          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => updateUserMutation.mutate()}
              disabled={updateUserMutation.isPending}
              data-testid="button-save-user"
            >
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
