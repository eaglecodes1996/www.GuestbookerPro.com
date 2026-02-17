import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { 
  DollarSign, 
  Users, 
  MousePointerClick, 
  UserCheck, 
  Copy, 
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AffiliateData {
  affiliate: {
    id: string;
    email: string;
    name: string;
    referralId: string;
    referralLink: string;
    commissionRate: number;
    paypalEmail: string | null;
    clicks: number;
    signups: number;
    activeSubscribers: number;
    totalCommissionEarned: number;
    totalCommissionPaid: number;
    pendingBalance: number;
    status: string;
    createdAt: string;
  };
  commissions: Array<{
    id: string;
    amount: number;
    month: string;
    status: string;
    createdAt: string;
  }>;
  referredUsers: Array<{
    id: string;
    subscriptionStatus: string;
    monthlyPrice: number;
    createdAt: string;
  }>;
}

interface AffiliateStatus {
  isAffiliate: boolean;
  affiliate: AffiliateData['affiliate'] | null;
}

export default function AffiliateDashboard() {
  const { toast } = useToast();
  const [paypalEmail, setPaypalEmail] = useState("");
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  const { data: statusData, isLoading: statusLoading } = useQuery<AffiliateStatus>({
    queryKey: ['/api/affiliate/status'],
  });

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery<AffiliateData>({
    queryKey: ['/api/affiliate/dashboard'],
    enabled: statusData?.isAffiliate,
  });

  const signupMutation = useMutation({
    mutationFn: async (paypalEmail: string) => {
      const res = await apiRequest('POST', '/api/affiliate/signup', { paypalEmail });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "You are now registered as an affiliate!" });
      queryClient.invalidateQueries({ queryKey: ['/api/affiliate/status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/affiliate/dashboard'] });
      setShowSignupDialog(false);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to register as affiliate", variant: "destructive" });
    },
  });

  const payoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/affiliate/request-payout', {
        paymentMethod: 'paypal',
        paymentDetails: dashboardData?.affiliate.paypalEmail,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Payout Requested", description: "Your payout request has been submitted for processing." });
      queryClient.invalidateQueries({ queryKey: ['/api/affiliate/dashboard'] });
      setShowPayoutDialog(false);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to request payout", variant: "destructive" });
    },
  });

  const updatePaymentMutation = useMutation({
    mutationFn: async (paypalEmail: string) => {
      const res = await apiRequest('PATCH', '/api/affiliate/payment-details', { paypalEmail });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Updated", description: "Payment details updated successfully." });
      queryClient.invalidateQueries({ queryKey: ['/api/affiliate/dashboard'] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update payment details", variant: "destructive" });
    },
  });

  const copyReferralLink = () => {
    if (dashboardData?.affiliate.referralLink) {
      navigator.clipboard.writeText(dashboardData.affiliate.referralLink);
      toast({ title: "Copied!", description: "Referral link copied to clipboard" });
    }
  };

  if (statusLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!statusData?.isAffiliate) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Become a GuestBooker Pro Affiliate</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Earn 20% monthly recurring commissions for each person you refer. 
            Your earnings continue as long as they stay subscribed.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-semibold">20% Commission</p>
                <p className="text-sm text-muted-foreground">On every payment</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-semibold">Recurring</p>
                <p className="text-sm text-muted-foreground">Monthly payouts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-semibold">90-Day Cookie</p>
                <p className="text-sm text-muted-foreground">Long tracking window</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Wallet className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="font-semibold">$50 Min Payout</p>
                <p className="text-sm text-muted-foreground">Via PayPal</p>
              </CardContent>
            </Card>
          </div>

          <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
            <DialogTrigger asChild>
              <Button size="lg" data-testid="button-become-affiliate">
                Start Earning Today
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Become an Affiliate</DialogTitle>
                <DialogDescription>
                  Enter your PayPal email to receive commission payouts.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="paypal">PayPal Email</Label>
                  <Input 
                    id="paypal" 
                    type="email" 
                    placeholder="your@paypal.email"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    data-testid="input-paypal-email"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={() => signupMutation.mutate(paypalEmail)}
                  disabled={signupMutation.isPending}
                  data-testid="button-confirm-affiliate"
                >
                  {signupMutation.isPending ? "Creating..." : "Create Affiliate Account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  if (dashboardLoading || !dashboardData) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const { affiliate, commissions, referredUsers } = dashboardData;
  const canRequestPayout = affiliate.pendingBalance >= 5000;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {affiliate.name}</p>
        </div>
        <Badge variant={affiliate.status === 'active' ? 'default' : 'destructive'}>
          {affiliate.status === 'active' ? 'Active' : 'Suspended'}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Referral Link</CardTitle>
          <CardDescription>Share this link to earn commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              readOnly 
              value={affiliate.referralLink} 
              className="font-mono text-sm"
              data-testid="text-referral-link"
            />
            <Button variant="outline" onClick={copyReferralLink} data-testid="button-copy-link">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Commission Rate: <span className="font-semibold text-foreground">{affiliate.commissionRate}%</span>
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Balance</p>
                <p className="text-2xl font-bold" data-testid="text-pending-balance">
                  ${(affiliate.pendingBalance / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold" data-testid="text-total-earned">
                  ${(affiliate.totalCommissionEarned / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MousePointerClick className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-bold" data-testid="text-clicks">{affiliate.clicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <UserCheck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Subscribers</p>
                <p className="text-2xl font-bold" data-testid="text-subscribers">{affiliate.activeSubscribers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
          <DialogTrigger asChild>
            <Button disabled={!canRequestPayout} data-testid="button-request-payout">
              <Wallet className="w-4 h-4 mr-2" />
              Request Payout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Payout</DialogTitle>
              <DialogDescription>
                Your payout will be sent to: {affiliate.paypalEmail || 'No PayPal email set'}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-2xl font-bold text-center">
                ${(affiliate.pendingBalance / 100).toFixed(2)}
              </p>
              <p className="text-center text-muted-foreground">Available for payout</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPayoutDialog(false)}>Cancel</Button>
              <Button 
                onClick={() => payoutMutation.mutate()}
                disabled={payoutMutation.isPending || !affiliate.paypalEmail}
                data-testid="button-confirm-payout"
              >
                {payoutMutation.isPending ? "Requesting..." : "Confirm Payout"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!canRequestPayout && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Minimum payout: $50.00
          </p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
          <CardDescription>Your earnings from referred customers</CardDescription>
        </CardHeader>
        <CardContent>
          {commissions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No commissions yet. Share your referral link to start earning!
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>{commission.month}</TableCell>
                    <TableCell className="font-semibold">
                      ${(commission.amount / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        commission.status === 'paid' ? 'default' :
                        commission.status === 'payable' ? 'secondary' : 'outline'
                      }>
                        {commission.status === 'paid' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {commission.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {commission.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(commission.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Update your payout preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paypal-update">PayPal Email</Label>
            <div className="flex gap-2">
              <Input 
                id="paypal-update"
                type="email"
                placeholder="your@paypal.email"
                defaultValue={affiliate.paypalEmail || ''}
                onChange={(e) => setPaypalEmail(e.target.value)}
                data-testid="input-update-paypal"
              />
              <Button 
                variant="outline"
                onClick={() => updatePaymentMutation.mutate(paypalEmail)}
                disabled={updatePaymentMutation.isPending}
                data-testid="button-update-paypal"
              >
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
