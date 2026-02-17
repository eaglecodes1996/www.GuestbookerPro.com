import { Home, Users, Mail, Inbox, BarChart3, Settings, LogOut, Shield, User2, AlertTriangle, CreditCard, DollarSign } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Shows",
    url: "/shows",
    icon: Users,
  },
  {
    title: "Outreach",
    url: "/outreach",
    icon: Mail,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Affiliate",
    url: "/affiliate",
    icon: DollarSign,
  },
  {
    title: "Upgrade",
    url: "/pricing",
    icon: CreditCard,
  },
];

const adminMenuItems = [
  {
    title: "Admin Overview",
    url: "/admin",
    icon: Shield,
    description: "Platform metrics and revenue insights",
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: User2,
    description: "Manage customer subscriptions and quotas",
  },
  {
    title: "Pricing Management",
    url: "/admin/pricing",
    icon: DollarSign,
    description: "Manage subscription pricing tiers",
  },
  {
    title: "Flagged Shows",
    url: "/admin/flagged-shows",
    icon: AlertTriangle,
    description: "Review shows with bounced emails",
  },
  {
    title: "Email Templates",
    url: "/admin/templates",
    icon: Mail,
    description: "Customize welcome emails and invoices",
  },
];

type User = {
  id: string;
  username: string;
  subscriptionTier: string;
  maxProfiles: number;
  monthlyDiscoveryQuota: number;
  monthlyOutreachQuota: number;
};

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: authData } = useQuery<{ user: User | null }>({
    queryKey: ["/api/auth/me"],
  });

  const user = authData?.user;
  const isAdmin = user?.subscriptionTier === "unlimited" || user?.subscriptionTier === "admin";

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      // Optimistically clear auth state to prevent race condition
      queryClient.setQueryData(["/api/auth/me"], { user: null });
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-black text-primary">G</span>
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-foreground" data-testid="text-app-title">
                  Guest Booker
                </h1>
                <p className="text-xs text-muted-foreground">Pro Edition</p>
              </div>
              {isAdmin && (
                <Badge 
                  variant="default" 
                  className="text-xs"
                  data-testid="badge-admin-sidebar"
                >
                  Admin
                </Badge>
              )}
            </div>
          </div>
          <SidebarGroupLabel className="text-muted-foreground/70 uppercase text-xs tracking-wider">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-nav-${item.title.toLowerCase()}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Admin Controls
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      data-testid={`link-admin-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
