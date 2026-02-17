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

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { executeRecaptcha, ready: recaptchaReady } = useRecaptcha();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('login');
      
      await apiRequest("POST", "/api/auth/login", { 
        username, 
        password,
        recaptchaToken 
      });
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      // Safely parse error data with fallback
      let errorData: any = {};
      try {
        if (error.message && error.message.includes(':')) {
          const jsonPart = error.message.split(': ')[1];
          if (jsonPart) {
            errorData = JSON.parse(jsonPart);
          }
        }
      } catch (parseError) {
        // JSON parse failed - use default error data
        console.warn('Failed to parse error message:', parseError);
      }
      
      if (errorData.requiresVerification) {
        toast({
          title: "Email not verified",
          description: "Please check your email and click the verification link to activate your account. You can resend the verification email from the verify email page.",
          variant: "destructive",
          duration: 10000,
        });
      } else {
        toast({
          title: "Login failed",
          description: errorData.message || error.message || "Invalid username or password",
          variant: "destructive",
        });
      }
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
        
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-muted-foreground mb-8">
          Sign in to your account to continue
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
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
                data-testid="link-forgot-password"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              data-testid="input-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            data-testid="button-submit"
            disabled={isLoading || !recaptchaReady}
          >
            {isLoading ? "Signing in..." : "Sign In"}
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
          <span className="text-muted-foreground">Don't have an account? </span>
          <a
            href="/signup"
            className="text-primary hover:underline"
            data-testid="link-signup"
          >
            Sign up
          </a>
        </div>
      </Card>
    </div>
  );
}
