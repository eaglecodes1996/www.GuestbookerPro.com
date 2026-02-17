import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useRecaptcha } from "@/hooks/useRecaptcha";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { executeRecaptcha, ready: recaptchaReady } = useRecaptcha();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('signup');
      
      const response = await apiRequest("POST", "/api/auth/signup", { 
        username, 
        email, 
        password,
        recaptchaToken 
      });
      const data = await response.json();
      
      if (data.requiresVerification) {
        toast({
          title: "Check your email!",
          description: "We've sent you a verification link. Please check your inbox to activate your account.",
          duration: 10000,
        });
        setLocation("/verify-email");
      } else {
        // Fallback for old flow (shouldn't happen)
        await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
        toast({
          title: "Account created!",
          description: "Welcome to Guest Booker Pro.",
        });
        setLocation("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Username already taken or invalid data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Rocket className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl">Guest Booker Pro</span>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Create Your Account</h1>
        <p className="text-center text-muted-foreground mb-8">
          Start booking more guest appearances today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              data-testid="input-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              data-testid="input-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              data-testid="input-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            data-testid="button-submit"
            disabled={isLoading || !recaptchaReady}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <a
            href="/login"
            className="text-primary hover:underline"
            data-testid="link-login"
          >
            Sign in
          </a>
        </div>
      </Card>
    </div>
  );
}
