import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "@/pages/dashboard";
import Shows from "@/pages/shows";
import Outreach from "@/pages/outreach";
import Inbox from "@/pages/inbox";
import Analytics from "@/pages/analytics";
import Settings from "@/pages/settings";
import Research from "@/pages/research";
import AdminUsers from "@/pages/admin-users";
import AdminOverview from "@/pages/admin-overview";
import AdminFlaggedShows from "@/pages/admin-flagged-shows";
import AdminTemplates from "@/pages/admin-templates";
import AdminPricing from "@/pages/admin-pricing";
import Pricing from "@/pages/pricing";
import SubscriptionSuccess from "@/pages/subscription-success";
import ResearchPurchaseSuccess from "@/pages/research-purchase-success";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import CompleteSignup from "@/pages/complete-signup";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import VerifyEmail from "@/pages/verify-email";
import AffiliateDashboard from "@/pages/affiliate-dashboard";
import ForAcademics from "@/pages/for-academics";
import ForNicheInterest from "@/pages/for-niche-interest";
import ForEntrepreneurs from "@/pages/for-entrepreneurs";
import ForStartupFounders from "@/pages/for-startup-founders";
import ForAuthors from "@/pages/for-authors";
import ForInfluencers from "@/pages/for-influencers";
import ForNewPodcasters from "@/pages/for-new-podcasters";
import ForSeasonedPodcasters from "@/pages/for-seasoned-podcasters";
import HowItWorks from "@/pages/how-it-works";
import Opportunity from "@/pages/opportunity";
import Comparison from "@/pages/comparison";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { useAffiliateTracking } from "@/hooks/use-affiliate-tracking";

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/complete-signup" component={CompleteSignup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/for-academics" component={ForAcademics} />
      <Route path="/for-niche-interest" component={ForNicheInterest} />
      <Route path="/for-entrepreneurs" component={ForEntrepreneurs} />
      <Route path="/for-startup-founders" component={ForStartupFounders} />
      <Route path="/for-authors" component={ForAuthors} />
      <Route path="/for-influencers" component={ForInfluencers} />
      <Route path="/for-new-podcasters" component={ForNewPodcasters} />
      <Route path="/for-seasoned-podcasters" component={ForSeasonedPodcasters} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/opportunity" component={Opportunity} />
      <Route path="/comparison" component={Comparison} />
      <Route path="/contact" component={Contact} />
      <Route component={Landing} />
    </Switch>
  );
}

function ProtectedRouter() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/shows" component={Shows} />
      <Route path="/outreach" component={Outreach} />
      <Route path="/inbox" component={Inbox} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/settings" component={Settings} />
      <Route path="/research" component={Research} />
      <Route path="/admin" component={AdminOverview} />
      <Route path="/admin/overview" component={AdminOverview} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/flagged-shows" component={AdminFlaggedShows} />
      <Route path="/admin/templates" component={AdminTemplates} />
      <Route path="/admin/pricing" component={AdminPricing} />
      <Route path="/affiliate" component={AffiliateDashboard} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/subscription/success" component={SubscriptionSuccess} />
      <Route path="/research/purchase-success" component={ResearchPurchaseSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 relative">
          <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="h-6 w-px bg-border" />
              <span className="text-sm text-muted-foreground hidden md:block">Welcome back</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-6">
              <ProtectedRouter />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppContent() {
  const [location, setLocation] = useLocation();
  const { data: authData, isLoading } = useQuery<{ user: any | null }>({
    queryKey: ["/api/auth/me"],
  });

  // Redirect to dashboard if already logged in and on public pages
  useEffect(() => {
    if (authData?.user && (location === "/" || location === "/login" || location === "/signup")) {
      setLocation("/dashboard");
    }
  }, [authData, location, setLocation]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (authData?.user) {
    return <AuthenticatedApp />;
  }

  return <PublicRouter />;
}

function AmbientBackground() {
  return (
    <>
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-purple" />
    </>
  );
}

function App() {
  // Use dark mode for the neon gamified aesthetic
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Track affiliate referrals from URL
  useAffiliateTracking();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen animated-gradient-bg">
          <AmbientBackground />
          <AppContent />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
