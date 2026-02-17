import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { 
  DollarSign, 
  Users, 
  TrendingUp,
  Check,
  X,
  Edit,
  Wallet
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

interface AffiliateAdmin {
  id: string;
  userId: string;
  email: string;
  name: string;
  referralId: string;
  commissionRate: number;
  status: string;
  paypalEmail: string | null;
  clicks: number;
  signups: number;
  activeSubscribers: number;
  totalCommissionEarned: number;
  totalCommissionPaid: number;
  pendingBalance: number;
  createdAt: string;
}

interface PendingPayout {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateEmail: string;
  amount: number;
  paymentMethod: string;
  paymentDetails: string;
  requestedAt: string;
  status: string;
}

export default function AdminAffiliates() {
  const { toast } = useToast();
  const [editingAffiliate, setEditingAffiliate] = useState<AffiliateAdmin | null>(null);
  const [newCommissionRate, setNewCommissionRate] = useState<number>(30);
  const [processingPayoutId, setProcessingPayoutId] = useState<string | null>(null);
  const [payoutNote, setPayoutNote] = useState("");

  const { data: affiliates = [], isLoading } = useQuery<AffiliateAdmin[]>({
    queryKey: ['/api/admin/affiliates'],
  });

  const { data: pendingPayouts = [] } = useQuery<PendingPayout[]>({
    queryKey: ['/api/admin/pending-payouts'],
  });

  const updateCommissionMutation = useMutation({
    mutationFn: async ({ affiliateId, commissionRate }: { affiliateId: string; commissionRate: number }) => {
      const res = await apiRequest('PATCH', `/api/admin/affiliates/${affiliateId}/commission-rate`, { commissionRate });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Updated", description: "Commission rate updated successfully." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/affiliates'] });
      setEditingAffiliate(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update commission rate", variant: "destructive" });
    },
  });

  const processPayoutMutation = useMutation({
    mutationFn: async ({ payoutId, status, note }: { payoutId: string; status: 'completed' | 'rejected'; note?: string }) => {
      const res = await apiRequest('POST', `/api/admin/process-payout/${payoutId}`, { status, note });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Processed", description: "Payout processed successfully." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pending-payouts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/affiliates'] });
      setProcessingPayoutId(null);
      setPayoutNote("");
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to process payout", variant: "destructive" });
    },
  });

  const totalAffiliates = affiliates.length;
  const activeAffiliates = affiliates.filter(a => a.status === 'active').length;
  const totalEarnings = affiliates.reduce((sum, a) => sum + a.totalCommissionEarned, 0);
  const pendingPayoutsTotal = affiliates.reduce((sum, a) => sum + a.pendingBalance, 0);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Loading affiliates...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Affiliate Management</h1>
        <p className="text-muted-foreground">Manage affiliate partners and payouts</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Affiliates</p>
                <p className="text-2xl font-bold" data-testid="text-total-affiliates">
                  {totalAffiliates}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Affiliates</p>
                <p className="text-2xl font-bold" data-testid="text-active-affiliates">
                  {activeAffiliates}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Commissions</p>
                <p className="text-2xl font-bold" data-testid="text-total-commissions">
                  ${(totalEarnings / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold" data-testid="text-pending-payouts">
                  ${(pendingPayoutsTotal / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {pendingPayouts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Pending Payout Requests
            </CardTitle>
            <CardDescription>Review and process affiliate payout requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payout.affiliateName}</p>
                        <p className="text-sm text-muted-foreground">{payout.affiliateEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${(payout.amount / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{payout.paymentMethod}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{payout.paymentDetails}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(payout.requestedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => processPayoutMutation.mutate({ 
                            payoutId: payout.id, 
                            status: 'completed' 
                          })}
                          disabled={processPayoutMutation.isPending}
                          data-testid={`button-approve-payout-${payout.id}`}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => setProcessingPayoutId(payout.id)}
                          data-testid={`button-reject-payout-${payout.id}`}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Affiliates</CardTitle>
          <CardDescription>View and manage affiliate partners</CardDescription>
        </CardHeader>
        <CardContent>
          {affiliates.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No affiliates registered yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Referral ID</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliates.map((affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{affiliate.name}</p>
                        <p className="text-sm text-muted-foreground">{affiliate.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {affiliate.referralId}
                      </code>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {affiliate.commissionRate}%
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{affiliate.clicks} clicks</p>
                        <p>{affiliate.signups} signups</p>
                        <p>{affiliate.activeSubscribers} active</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-semibold">${(affiliate.totalCommissionEarned / 100).toFixed(2)} earned</p>
                        <p className="text-muted-foreground">${(affiliate.pendingBalance / 100).toFixed(2)} pending</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={affiliate.status === 'active' ? 'default' : 'destructive'}>
                        {affiliate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingAffiliate(affiliate);
                          setNewCommissionRate(affiliate.commissionRate);
                        }}
                        data-testid={`button-edit-affiliate-${affiliate.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editingAffiliate} onOpenChange={() => setEditingAffiliate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Affiliate</DialogTitle>
            <DialogDescription>
              Update commission rate for {editingAffiliate?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Commission Rate (%)</label>
              <Input 
                type="number"
                min={1}
                max={50}
                value={newCommissionRate}
                onChange={(e) => setNewCommissionRate(parseInt(e.target.value) || 30)}
                className="w-24"
                data-testid="input-commission-rate"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAffiliate(null)}>Cancel</Button>
            <Button 
              onClick={() => editingAffiliate && updateCommissionMutation.mutate({ 
                affiliateId: editingAffiliate.id, 
                commissionRate: newCommissionRate 
              })}
              disabled={updateCommissionMutation.isPending}
              data-testid="button-save-commission"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!processingPayoutId} onOpenChange={() => setProcessingPayoutId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payout</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this payout request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input 
              placeholder="Reason for rejection (optional)"
              value={payoutNote}
              onChange={(e) => setPayoutNote(e.target.value)}
              data-testid="input-rejection-reason"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProcessingPayoutId(null)}>Cancel</Button>
            <Button 
              variant="destructive"
              onClick={() => processingPayoutId && processPayoutMutation.mutate({ 
                payoutId: processingPayoutId, 
                status: 'rejected',
                note: payoutNote
              })}
              disabled={processPayoutMutation.isPending}
              data-testid="button-confirm-reject"
            >
              Reject Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
