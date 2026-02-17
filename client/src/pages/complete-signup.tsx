import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Rocket, CheckCircle, Sparkles, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

export default function CompleteSignup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tier, setTier] = useState<string | null>(null);
  const [sessionVerified, setSessionVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get("session_id");
    
    if (sid) {
      setSessionId(sid);
      verifySession(sid);
    } else {
      setVerifying(false);
    }
  }, []);

  const verifySession = async (sid: string) => {
    try {
      const response = await fetch(`/api/stripe/verify-signup-session/${sid}`);
      const data = await response.json();
      
      if (data.valid) {
        setTier(data.tier);
        setSessionVerified(true);
      } else {
        toast({
          title: "Invalid Session",
          description: data.error || "This payment session is invalid or has already been used.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify payment session.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const completeSignupMutation = useMutation({
    mutationFn: async (data: { sessionId: string; username: string; email: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/complete-signup", data);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Welcome to Guest Booker Pro!",
        description: `Your ${tier?.toUpperCase() || "subscription"} account is ready. Let's discover some shows!`,
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    if (!sessionId) {
      toast({
        title: "Error",
        description: "No payment session found. Please return to pricing.",
        variant: "destructive",
      });
      return;
    }

    completeSignupMutation.mutate({ sessionId, username, email, password });
  };

  const tierNames: Record<string, string> = {
    basic: "Basic",
    growth: "Growth",
    pro: "Pro",
    agency: "Agency",
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-lg">Verifying your payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!sessionId || !sessionVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-400">Invalid Session</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              This payment session is invalid, expired, or has already been used.
            </p>
            <Button onClick={() => setLocation("/pricing")}>
              Return to Pricing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl text-foreground">Payment Successful!</CardTitle>
            <CardDescription className="text-base mt-2">
              You're getting the <span className="font-bold text-secondary">
                {tierNames[tier || "basic"]}
              </span> plan. Now let's create your account.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  data-testid="input-username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  data-testid="input-email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  data-testid="input-password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  data-testid="input-confirm-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full text-lg py-6"
                disabled={completeSignupMutation.isPending}
                data-testid="button-complete-signup"
              >
                {completeSignupMutation.isPending ? (
                  "Creating Account..."
                ) : (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    Complete Signup
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-muted text-sm space-y-2">
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Payment confirmed</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{tierNames[tier || "basic"]} plan activated</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                <span>Create your account</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
