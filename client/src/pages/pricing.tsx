import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Rocket, Sparkles, ArrowRight } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserData {
  user: {
    id: number;
    username: string;
    subscriptionTier: string;
  } | null;
}

interface PricingTier {
  tier: string;
  displayName: string;
  monthlyPriceUSD: number;
  yearlyPriceUSD: number;
  features: string[];
  maxProfiles: number;
  maxDiscoveryPerMonth: number;
  maxEmailsPerMonth: number;
  deepResearchQuota: number;
  isActive: boolean;
  sortOrder: number;
}

export default function Pricing() {
  const { toast } = useToast();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const { data: userData } = useQuery<UserData>({
    queryKey: ['/api/auth/me'],
  });

  // Fetch pricing plans from API
  const { data: pricingTiers = [], isLoading: isPricingLoading } = useQuery<PricingTier[]>({
    queryKey: ['/api/pricing'],
  });

  const isLoggedIn = !!userData?.user;
  const currentTier = userData?.user?.subscriptionTier || null;

  const createCheckoutMutation = useMutation({
    mutationFn: async ({ tier, billing }: { tier: string; billing: 'monthly' | 'yearly' }) => {
      const endpoint = isLoggedIn 
        ? '/api/stripe/create-checkout-session' 
        : '/api/stripe/create-signup-checkout';
      
      // Get affiliate ID from cookie
      const cookies = document.cookie.split(';');
      let affiliateId = '';
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'guestbooker_affiliate') {
          affiliateId = value;
          break;
        }
      }
      
      const res = await apiRequest('POST', endpoint, { tier, billing, affiliateId });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (tierId: string) => {
    createCheckoutMutation.mutate({ tier: tierId, billing: billingPeriod });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scale your guest booking strategy with flexible pricing that grows with you
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingPeriod === 'monthly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover-elevate'
              }`}
              data-testid="button-billing-monthly"
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingPeriod === 'yearly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover-elevate'
              }`}
              data-testid="button-billing-yearly"
            >
              Yearly
              <Badge className="ml-2 bg-green-600 text-white">Save 10%</Badge>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isPricingLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground">Loading pricing...</div>
            </div>
          ) : pricingTiers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground">No pricing plans available</div>
            </div>
          ) : (
            pricingTiers.map((tier) => {
              const isCurrentPlan = tier.tier === currentTier;
              const isUpgrade = !isCurrentPlan && tier.monthlyPriceUSD > (pricingTiers.find(t => t.tier === currentTier)?.monthlyPriceUSD || 0);
              const displayPrice = billingPeriod === 'monthly' ? tier.monthlyPriceUSD / 100 : tier.yearlyPriceUSD / 100;
              const priceLabel = billingPeriod === 'monthly' ? '/month' : '/year';
              // Mark Growth plan as recommended
              const isRecommended = tier.tier === 'growth';

              return (
                <Card 
                  key={tier.tier} 
                  className={`relative flex flex-col ${isRecommended ? 'border-primary shadow-lg' : ''}`}
                  data-testid={`card-pricing-${tier.tier}`}
                >
                  {isRecommended && (
                    <Badge 
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      data-testid="badge-recommended"
                    >
                      Recommended
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-2xl" data-testid={`text-tier-name-${tier.tier}`}>
                      {tier.displayName}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold" data-testid={`text-price-${tier.tier}`}>
                        ${displayPrice.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">{priceLabel}</span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        ${((tier.monthlyPriceUSD * 12 - tier.yearlyPriceUSD) / 100).toFixed(2)} savings per year
                      </p>
                    )}
                    <CardDescription className="mt-2" data-testid={`text-description-${tier.tier}`}>
                      Perfect for {tier.tier === 'basic' ? 'individual creators' : tier.tier === 'growth' ? 'growing creators' : tier.tier === 'pro' ? 'power users' : 'large agencies'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{tier.maxProfiles}</strong> Profile{tier.maxProfiles > 1 ? 's' : ''}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{tier.maxDiscoveryPerMonth.toLocaleString()}</strong> Show Discoveries/month
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{tier.maxEmailsPerMonth.toLocaleString()}</strong> Email Outreach/month
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{tier.deepResearchQuota}</strong> AI Deep Research/month
                        </span>
                      </li>
                      {/* Only show non-duplicate features */}
                      {tier.features.filter((feature: string) => 
                        !feature.toLowerCase().includes('profile') &&
                        !feature.toLowerCase().includes('discovery') &&
                        !feature.toLowerCase().includes('email') &&
                        !feature.toLowerCase().includes('research')
                      ).map((feature: string, index: number) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2"
                          data-testid={`feature-${tier.tier}-${index}`}
                        >
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={isCurrentPlan ? "secondary" : isRecommended ? "default" : "outline"}
                      disabled={isCurrentPlan || createCheckoutMutation.isPending}
                      onClick={() => handleSubscribe(tier.tier)}
                      data-testid={`button-subscribe-${tier.tier}`}
                    >
                      {isCurrentPlan 
                        ? 'Current Plan' 
                        : createCheckoutMutation.isPending 
                        ? 'Loading...' 
                        : isLoggedIn
                        ? (isUpgrade ? 'Upgrade' : 'Subscribe')
                        : 'Get Started'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All plans include AI-powered email generation and comprehensive analytics.</p>
          <p className="mt-2">Need a custom plan? Contact us for enterprise pricing.</p>
        </div>

      </div>
    </div>
  );
}
