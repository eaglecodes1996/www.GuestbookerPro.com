import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, AlertCircle, Mail, Loader2 } from "lucide-react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [showResend, setShowResend] = useState(false);
  const { executeRecaptcha, ready: recaptchaReady } = useRecaptcha();

  // Define mutations BEFORE useEffect that uses them
  const verifyMutation = useMutation({
    mutationFn: async (tokenToVerify?: string) => {
      const verificationToken = tokenToVerify || token;
      const response = await apiRequest("POST", "/api/auth/verify-email", { token: verificationToken });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        // Redirect to login after 3 seconds
        setTimeout(() => {
          setLocation("/login");
        }, 3000);
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (emailToResend: string) => {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('resend_verification');
      
      const response = await apiRequest("POST", "/api/auth/resend-verification", { 
        email: emailToResend,
        recaptchaToken 
      });
      return response.json();
    },
  });

  // Extract token from URL query params (NOW SAFE - mutations defined above)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      // Auto-verify if token is in URL - pass token directly!
      verifyMutation.mutate(tokenParam);
    } else {
      setShowResend(true);
    }
  }, []);

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    resendMutation.mutate(email);
  };

  // Auto-verifying with token from URL
  if (token && verifyMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-center text-muted-foreground">
              Verifying your email address...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            {token ? "Processing your verification..." : "Enter your email to receive a new verification link"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {verifyMutation.isSuccess && (
            <Alert className="bg-green-500/10 border-green-500/50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-500">
                <strong>Email Verified Successfully!</strong>
                <p className="mt-1">
                  {verifyMutation.data?.alreadyVerified 
                    ? "Your email was already verified. You can log in now."
                    : "Your account is now active. Redirecting to login..."}
                </p>
              </AlertDescription>
            </Alert>
          )}

          {verifyMutation.isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {(verifyMutation.error as any)?.message || "Invalid or expired verification link"}
                {(verifyMutation.error as any)?.expired && (
                  <p className="mt-2">Please request a new verification email below.</p>
                )}
              </AlertDescription>
            </Alert>
          )}

          {resendMutation.isSuccess && (
            <Alert className="bg-blue-500/10 border-blue-500/50">
              <Mail className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-500">
                <strong>Verification Email Sent!</strong>
                <p className="mt-1">
                  {resendMutation.data?.alreadyVerified 
                    ? "Your email is already verified. You can log in now!"
                    : "Check your inbox for the verification link."}
                </p>
              </AlertDescription>
            </Alert>
          )}

          {resendMutation.isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {(resendMutation.error as any)?.message || "Failed to send verification email"}
              </AlertDescription>
            </Alert>
          )}

          {(showResend || verifyMutation.isError || (verifyMutation.error as any)?.expired) && (
            <form onSubmit={handleResend} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={resendMutation.isPending || !email || !recaptchaReady}
                data-testid="button-resend"
              >
                {resendMutation.isPending ? "Sending..." : "Send Verification Email"}
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
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already verified? </span>
            <Link href="/login" className="text-primary hover:underline" data-testid="link-login">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

