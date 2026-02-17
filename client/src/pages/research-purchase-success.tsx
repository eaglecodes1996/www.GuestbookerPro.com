import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Sparkles } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ResearchPurchaseSuccess() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [purchaseInfo, setPurchaseInfo] = useState<any>(null);

  useEffect(() => {
    const verifyPurchase = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const res = await apiRequest('GET', `/api/stripe/verify-research-purchase/${sessionId}`);
        const data = await res.json();

        if (data.success) {
          setPurchaseInfo(data);
          setStatus('success');
          // Invalidate user data to refresh quota info
          queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifyPurchase();
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" data-testid="loader-verifying" />
            <p className="text-lg">Verifying your purchase...</p>
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
            <CardTitle className="text-destructive" data-testid="text-error-title">Purchase Verification Failed</CardTitle>
            <CardDescription data-testid="text-error-description">
              We couldn't verify your purchase. Please contact support if you were charged.
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
            <div className="relative">
              <CheckCircle className="w-16 h-16 text-green-500" data-testid="icon-success" />
              <Sparkles className="w-8 h-8 text-primary absolute -top-1 -right-1" />
            </div>
          </div>
          <CardTitle className="text-2xl" data-testid="text-success-title">
            Deep Research Searches Added!
          </CardTitle>
          <CardDescription data-testid="text-success-description">
            Your searches are now available and ready to use
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Searches Purchased</span>
              <span className="font-medium text-green-600" data-testid="text-searches-added">
                +{purchaseInfo?.searchesAdded || 0} searches
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">New Total</span>
              <span className="font-medium" data-testid="text-new-quota">
                {purchaseInfo?.newQuota || 0} searches
              </span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <Sparkles className="w-4 h-4 inline mr-1" />
              Searches never expire and can be used anytime for AI-powered deep research
            </p>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={() => setLocation('/research')} 
              className="w-full"
              data-testid="button-start-research"
            >
              Start Deep Research
            </Button>
            <Button 
              onClick={() => setLocation('/dashboard')} 
              variant="outline" 
              className="w-full"
              data-testid="button-dashboard"
            >
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
