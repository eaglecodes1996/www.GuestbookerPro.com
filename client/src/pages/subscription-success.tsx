import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function SubscriptionSuccess() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);

  useEffect(() => {
    const verifySession = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const res = await apiRequest('GET', `/api/stripe/verify-session/${sessionId}`);
        const data = await res.json();

        if (data.success) {
          setSubscriptionInfo(data);
          setStatus('success');
          // Invalidate user data to refresh subscription info
          queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifySession();
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" data-testid="loader-verifying" />
            <p className="text-lg">Verifying your subscription...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive" data-testid="text-error-title">Payment Verification Failed</CardTitle>
            <CardDescription data-testid="text-error-description">
              We couldn't verify your payment. Please contact support if you were charged.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setLocation('/pricing')} 
              variant="outline" 
              className="w-full"
              data-testid="button-back-pricing"
            >
              Back to Pricing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" data-testid="icon-success" />
          </div>
          <CardTitle className="text-2xl" data-testid="text-success-title">
            Welcome to {subscriptionInfo?.tier?.charAt(0).toUpperCase() + subscriptionInfo?.tier?.slice(1)}!
          </CardTitle>
          <CardDescription data-testid="text-success-description">
            Your subscription is now active and ready to use.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium capitalize" data-testid="text-subscription-status">
                {subscriptionInfo?.subscription?.status || 'Active'}
              </span>
            </div>
            {subscriptionInfo?.subscription?.currentPeriodEnd && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-medium" data-testid="text-billing-date">
                  {new Date(subscriptionInfo.subscription.currentPeriodEnd * 1000).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button 
              onClick={() => setLocation('/dashboard')} 
              className="w-full"
              data-testid="button-dashboard"
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => setLocation('/pricing')} 
              variant="outline" 
              className="w-full"
              data-testid="button-view-plans"
            >
              View Other Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
