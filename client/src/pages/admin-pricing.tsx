import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Save, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PricingPlan {
  id: string;
  tier: string;
  displayName: string;
  monthlyPriceUSD: number;
  yearlyPriceUSD: number;
  stripePriceIdMonthly: string | null;
  stripePriceIdYearly: string | null;
  maxProfiles: number;
  maxDiscoveryPerMonth: number;
  maxEmailsPerMonth: number;
  deepResearchQuota: number;
  features: string[];
  isActive: boolean;
  sortOrder: number;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPricing() {
  const { toast } = useToast();
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const [editedValues, setEditedValues] = useState({
    monthlyPriceUSD: 0,
    yearlyPriceUSD: 0,
    maxProfiles: 0,
    maxDiscoveryPerMonth: 0,
    maxEmailsPerMonth: 0,
    deepResearchQuota: 0,
  });

  const { data: plans, isLoading } = useQuery<PricingPlan[]>({
    queryKey: ["/api/admin/pricing"],
  });

  const updatePlanMutation = useMutation({
    mutationFn: async ({ tier, updates }: { tier: string; updates: any }) => {
      return apiRequest("PUT", `/api/admin/pricing/${tier}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pricing"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing"] });
      setEditDialogOpen(false);
      setEditingPlan(null);
      toast({
        title: "Pricing Updated",
        description: "Pricing plan has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update pricing plan.",
        variant: "destructive",
      });
    },
  });

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setEditedValues({
      monthlyPriceUSD: plan.monthlyPriceUSD,
      yearlyPriceUSD: plan.yearlyPriceUSD,
      maxProfiles: plan.maxProfiles,
      maxDiscoveryPerMonth: plan.maxDiscoveryPerMonth,
      maxEmailsPerMonth: plan.maxEmailsPerMonth,
      deepResearchQuota: plan.deepResearchQuota,
    });
    setEditDialogOpen(true);
  };

  const handleSavePlan = () => {
    if (!editingPlan) return;
    
    updatePlanMutation.mutate({
      tier: editingPlan.tier,
      updates: editedValues,
    });
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Pricing Management</h1>
          </div>
          <p className="text-muted-foreground">
            Manage subscription pricing tiers and limits
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Important Notes</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1 list-disc list-inside">
              <li>Price changes take effect immediately for new signups</li>
              <li>Existing subscribers keep their current pricing until renewal</li>
              <li>Update Stripe Price IDs if you change prices in Stripe Dashboard</li>
              <li>Yearly prices typically offer 10% discount on monthly * 12</li>
            </ul>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans?.map((plan) => (
            <Card key={plan.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{plan.displayName}</h2>
                  <Badge variant={plan.isActive ? "default" : "secondary"}>
                    {plan.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPlan(plan)}
                >
                  Edit
                </Button>
              </div>

              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-primary">
                      {formatPrice(plan.monthlyPriceUSD)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    or {formatPrice(plan.yearlyPriceUSD)}/year
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Limits</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profiles:</span>
                      <span className="font-medium">{plan.maxProfiles}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discovery/month:</span>
                      <span className="font-medium">{plan.maxDiscoveryPerMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emails/month:</span>
                      <span className="font-medium">{plan.maxEmailsPerMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deep Research:</span>
                      <span className="font-medium">{plan.deepResearchQuota}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="space-y-1 text-sm">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-muted-foreground ml-6">
                        +{plan.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {plan.stripePriceIdMonthly && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Stripe Price ID (Monthly): <code className="bg-muted px-1 py-0.5 rounded">{plan.stripePriceIdMonthly}</code>
                    </p>
                    {plan.stripePriceIdYearly && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Stripe Price ID (Yearly): <code className="bg-muted px-1 py-0.5 rounded">{plan.stripePriceIdYearly}</code>
                      </p>
                    )}
                  </div>
                )}

                <div className="pt-2 text-xs text-muted-foreground">
                  Last updated: {new Date(plan.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {editingPlan?.displayName} Plan</DialogTitle>
            <DialogDescription>
              Update pricing and limits for the {editingPlan?.tier} tier
            </DialogDescription>
          </DialogHeader>

          {editingPlan && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyPrice">Monthly Price (USD)</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg">$</span>
                    <Input
                      id="monthlyPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={(editedValues.monthlyPriceUSD / 100).toFixed(2)}
                      onChange={(e) => setEditedValues({
                        ...editedValues,
                        monthlyPriceUSD: Math.round(parseFloat(e.target.value) * 100)
                      })}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current: {formatPrice(editingPlan.monthlyPriceUSD)}
                  </p>
                </div>

                <div>
                  <Label htmlFor="yearlyPrice">Yearly Price (USD)</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg">$</span>
                    <Input
                      id="yearlyPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={(editedValues.yearlyPriceUSD / 100).toFixed(2)}
                      onChange={(e) => setEditedValues({
                        ...editedValues,
                        yearlyPriceUSD: Math.round(parseFloat(e.target.value) * 100)
                      })}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current: {formatPrice(editingPlan.yearlyPriceUSD)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Usage Limits</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxProfiles">Max Profiles</Label>
                    <Input
                      id="maxProfiles"
                      type="number"
                      min="1"
                      value={editedValues.maxProfiles}
                      onChange={(e) => setEditedValues({
                        ...editedValues,
                        maxProfiles: parseInt(e.target.value) || 1
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxDiscovery">Discovery Per Month</Label>
                    <Input
                      id="maxDiscovery"
                      type="number"
                      min="0"
                      value={editedValues.maxDiscoveryPerMonth}
                      onChange={(e) => setEditedValues({
                        ...editedValues,
                        maxDiscoveryPerMonth: parseInt(e.target.value) || 0
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxEmails">Emails Per Month</Label>
                    <Input
                      id="maxEmails"
                      type="number"
                      min="0"
                      value={editedValues.maxEmailsPerMonth}
                      onChange={(e) => setEditedValues({
                        ...editedValues,
                        maxEmailsPerMonth: parseInt(e.target.value) || 0
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deepResearch">Deep Research Quota</Label>
                    <Input
                      id="deepResearch"
                      type="number"
                      min="0"
                      value={editedValues.deepResearchQuota}
                      onChange={(e) => setEditedValues({
                        ...editedValues,
                        deepResearchQuota: parseInt(e.target.value) || 0
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Changing prices here doesn't automatically update Stripe. 
                  You'll need to create new Price IDs in Stripe Dashboard and update them here separately.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={updatePlanMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePlan}
              disabled={updatePlanMutation.isPending}
            >
              {updatePlanMutation.isPending && (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              )}
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

