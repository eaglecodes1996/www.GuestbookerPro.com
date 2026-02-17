import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { executeRecaptcha, ready: recaptchaReady } = useRecaptcha();

  const forgotPasswordMutation = useMutation({
    mutationFn: async () => {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('forgot_password');
      
      const response = await apiRequest("POST", "/api/auth/forgot-password", { 
        email,
        recaptchaToken 
      });
      return response.json();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/login">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
          </div>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {forgotPasswordMutation.isSuccess ? (
              <Alert className="bg-green-500/10 border-green-500/50">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-500">
                  <strong>Check your email!</strong>
                  <p className="mt-1">
                    If an account exists with that email, we've sent a password reset link.
                    The link will expire in 1 hour.
                  </p>
                  {forgotPasswordMutation.data?.resetLink && (
                    <div className="mt-3 p-2 bg-background rounded text-xs font-mono break-all">
                      <strong>Development Mode Link:</strong><br />
                      <a href={forgotPasswordMutation.data.resetLink} className="text-primary hover:underline">
                        {forgotPasswordMutation.data.resetLink}
                      </a>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {forgotPasswordMutation.isError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {(forgotPasswordMutation.error as any)?.message || "Failed to send reset email"}
                    </AlertDescription>
                  </Alert>
                )}

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
                  <p className="text-xs text-muted-foreground">
                    We'll never share your email with anyone else
                  </p>
                </div>
              </>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {!forgotPasswordMutation.isSuccess && (
              <>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={forgotPasswordMutation.isPending || !email || !recaptchaReady}
                  data-testid="button-send-reset-link"
                >
                  {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
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
              </>
            )}

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <Link href="/login">
                <Button variant="link" className="p-0 h-auto" data-testid="link-back-to-login">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

