import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Rocket, ArrowRight, TrendingUp, Users, Zap, Target, 
  GraduationCap, BookOpen, Mic, Radio, 
  Briefcase, Video, Crown, DollarSign, Clock, CheckCircle2, 
  Sparkles, BarChart3, MessageCircle, Heart, Shield, Eye
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";

function UseCasesDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="dropdown-use-cases">Use Cases</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[320px] gap-1 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-academics">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <GraduationCap className="w-4 h-4" />
                        For Academics & Researchers
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Expand your research reach beyond academia
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-niche-interest">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <Mic className="w-4 h-4" />
                        For Niche Experts
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Connect with specialized communities
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-entrepreneurs">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <Briefcase className="w-4 h-4" />
                        For Entrepreneurs
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Build brand authority and reach customers
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-startup-founders">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <Rocket className="w-4 h-4" />
                        For Startup Founders
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Attract investors and accelerate traction
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-authors">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <BookOpen className="w-4 h-4" />
                        For Authors
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Grow readership and increase book sales
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-influencers">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <Video className="w-4 h-4" />
                        For Influencers
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Cross-collaborate with YouTube and Spotify creators
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-new-podcasters">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <Radio className="w-4 h-4" />
                        For New Podcasters
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Grow your audience by guesting on other shows
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/for-seasoned-podcasters">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <Crown className="w-4 h-4" />
                        For Seasoned Podcasters
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Upgrade guest quality and scale without burnout
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function InformationDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="dropdown-information">Information</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-1 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/how-it-works">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <Sparkles className="w-4 h-4" />
                        How It Works
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        See the guest booking process and growth flywheel
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/opportunity">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <BarChart3 className="w-4 h-4" />
                        The Untapped Opportunity
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Millions of shows waiting for guests like you
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/comparison">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <TrendingUp className="w-4 h-4" />
                        Why Guest Booking?
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        See how guest booking outperforms advertising
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/contact">
                    <div className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <MessageCircle className="w-4 h-4" />
                        Contact Us
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        Get in touch with our support team
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const costComparisonData = [
  {
    name: "Guest Appearances",
    costPerLead: 0,
    costPerCustomer: 0,
    fill: "hsl(var(--primary))",
  },
  {
    name: "Social Media Ads",
    costPerLead: 85,
    costPerCustomer: 320,
    fill: "hsl(var(--destructive))",
  },
  {
    name: "Sponsored Content",
    costPerLead: 120,
    costPerCustomer: 450,
    fill: "hsl(var(--muted-foreground))",
  },
];

const roiComparisonData = [
  {
    name: "Guest Appearances",
    roi: 999,
    fill: "hsl(var(--primary))",
  },
  {
    name: "Social Media Ads",
    roi: -35,
    fill: "hsl(var(--destructive))",
  },
  {
    name: "Sponsored Content",
    roi: -15,
    fill: "hsl(var(--muted-foreground))",
  },
];

const trustEngagementData = [
  {
    metric: "Trust Score",
    guestAppearances: 92,
    socialAds: 28,
    sponsoredContent: 35,
  },
  {
    metric: "Engagement Rate",
    guestAppearances: 78,
    socialAds: 12,
    sponsoredContent: 18,
  },
  {
    metric: "Brand Recall",
    guestAppearances: 85,
    socialAds: 22,
    sponsoredContent: 30,
  },
  {
    metric: "Conversion Intent",
    guestAppearances: 70,
    socialAds: 15,
    sponsoredContent: 20,
  },
  {
    metric: "Audience Quality",
    guestAppearances: 88,
    socialAds: 40,
    sponsoredContent: 45,
  },
];

const contentLongevityData = [
  { month: "Month 1", guestAppearances: 100, socialAds: 100, sponsoredContent: 100 },
  { month: "Month 2", guestAppearances: 95, socialAds: 15, sponsoredContent: 25 },
  { month: "Month 3", guestAppearances: 90, socialAds: 5, sponsoredContent: 10 },
  { month: "Month 6", guestAppearances: 82, socialAds: 2, sponsoredContent: 5 },
  { month: "Month 12", guestAppearances: 75, socialAds: 0, sponsoredContent: 2 },
  { month: "Month 24", guestAppearances: 65, socialAds: 0, sponsoredContent: 0 },
];

interface PricingPlan {
  tier: string;
  displayName: string;
  monthlyPriceUSD: number;
  yearlyPriceUSD: number;
  maxProfiles: number;
  maxDiscoveryPerMonth: number;
  maxEmailsPerMonth: number;
  deepResearchQuota: number;
}

export default function Comparison() {
  // Fetch dynamic pricing from API
  const { data: pricingPlans = [] } = useQuery<PricingPlan[]>({
    queryKey: ['/api/pricing'],
  });

  // Calculate price range from plans
  const priceRange = pricingPlans.length > 0 
    ? `$${(pricingPlans[0].monthlyPriceUSD / 100).toFixed(2)} - $${(pricingPlans[pricingPlans.length - 1].monthlyPriceUSD / 100).toFixed(0)}`
    : "$29.99 - $99";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground">Guest Booker Pro</span>
              </div>
            </Link>
            <InformationDropdown />
            <UseCasesDropdown />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">Login</Button>
            </Link>
            <Link href="/pricing">
              <Button data-testid="button-signup">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm border border-primary/20 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">The Smart Marketing Choice</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Guest Appearances vs</span>
            <br />
            <span className="text-primary">Paid Advertising</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop burning money on ads that disappear. Guest appearances on podcasts and YouTube deliver 
            higher trust, better engagement, and evergreen content that keeps working for years.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/pricing">
              <Button size="lg" data-testid="button-hero-signup" className="gap-2">
                Start Guest Booking
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-black text-foreground">$0</p>
            <p className="text-sm text-muted-foreground">Cost Per Lead</p>
          </Card>
          <Card className="p-6 text-center">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-foreground">92x</p>
            <p className="text-sm text-muted-foreground">Higher Trust Score</p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-foreground">24+</p>
            <p className="text-sm text-muted-foreground">Months of Visibility</p>
          </Card>
          <Card className="p-6 text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-foreground">6x</p>
            <p className="text-sm text-muted-foreground">Better Engagement</p>
          </Card>
        </motion.div>
      </section>

      {/* Cost Comparison Chart */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Cost Per Lead & Customer
                </h2>
                <p className="text-muted-foreground">Guest appearances dramatically reduce acquisition costs</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costComparisonData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" className="text-muted-foreground" tickFormatter={(value) => `$${value}`} />
                    <YAxis type="category" dataKey="name" className="text-muted-foreground" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`$${value}`, '']}
                    />
                    <Legend />
                    <Bar dataKey="costPerLead" name="Cost Per Lead" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="costPerCustomer" name="Cost Per Customer" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Guest Appearances: FREE</h4>
                    <p className="text-muted-foreground text-sm">Just your time - organic reach through trusted host endorsement</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <DollarSign className="w-5 h-5 text-destructive mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Social Media Ads: $85/lead (loses money)</h4>
                    <p className="text-muted-foreground text-sm">Paid interruption with ad fatigue - often results in net loss</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sponsored Content: $120/lead (loses money)</h4>
                    <p className="text-muted-foreground text-sm">One-time placement with limited reach and poor ROI</p>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mt-6">
                  <p className="text-foreground text-sm">
                    <strong>The bottom line:</strong> Guest appearances are essentially FREE - you invest time, not money.
                    Meanwhile, paid ads typically lose money on average.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* ROI Comparison */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Return on Investment
                </h2>
                <p className="text-muted-foreground">Average ROI percentage by marketing channel</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {roiComparisonData.map((item) => (
                <Card key={item.name} className="p-6 text-center border-2" style={{ borderColor: item.fill }}>
                  <h3 className="font-semibold text-foreground mb-4">{item.name}</h3>
                  <p className="text-5xl font-black mb-2" style={{ color: item.fill }}>{item.roi}%</p>
                  <p className="text-muted-foreground text-sm">Average ROI</p>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-500/20">
              <p className="text-center text-foreground text-lg">
                <strong>Guest appearances deliver virtually infinite ROI</strong> — because they cost nothing but your time.
                Meanwhile, social ads and sponsored content typically lose money.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Trust & Engagement Radar Chart */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Trust & Engagement Metrics
                </h2>
                <p className="text-muted-foreground">How audiences perceive and interact with each channel</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={trustEngagementData}>
                    <PolarGrid className="stroke-border" />
                    <PolarAngleAxis dataKey="metric" className="text-muted-foreground text-xs" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-muted-foreground" />
                    <Radar
                      name="Guest Appearances"
                      dataKey="guestAppearances"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Social Ads"
                      dataKey="socialAds"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive))"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Sponsored Content"
                      dataKey="sponsoredContent"
                      stroke="hsl(var(--muted-foreground))"
                      fill="hsl(var(--muted-foreground))"
                      fillOpacity={0.1}
                    />
                    <Legend />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">92% Trust Score</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Audiences trust host recommendations. When a podcaster endorses you, 
                    their audience sees you as a credible expert.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold text-foreground">78% Engagement Rate</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Long-form conversations create deeper connections than 
                    scrollable social media ads.
                  </p>
                </div>
                
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-foreground">88% Audience Quality</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Podcast listeners are highly targeted. You reach people who are 
                    actively interested in your topic.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Content Longevity Chart */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Content Longevity
                </h2>
                <p className="text-muted-foreground">How long your content keeps generating value</p>
              </div>
            </div>
            
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={contentLongevityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="guestAppearances" 
                    name="Guest Appearances"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="socialAds" 
                    name="Social Ads"
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--destructive))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sponsoredContent" 
                    name="Sponsored Content"
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <h4 className="font-bold text-2xl text-primary mb-1">65%</h4>
                <p className="text-foreground font-medium">Guest Appearances</p>
                <p className="text-muted-foreground text-sm">Still generating leads after 2 years</p>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
                <h4 className="font-bold text-2xl text-destructive mb-1">0%</h4>
                <p className="text-foreground font-medium">Social Ads</p>
                <p className="text-muted-foreground text-sm">Value drops to zero when ad spend stops</p>
              </div>
              <div className="p-4 bg-muted rounded-lg border border-border text-center">
                <h4 className="font-bold text-2xl text-muted-foreground mb-1">0%</h4>
                <p className="text-foreground font-medium">Sponsored Content</p>
                <p className="text-muted-foreground text-sm">Buried in feed within weeks</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Why Guest Appearances Win */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why Guest Appearances Outperform Ads
                </h2>
                <p className="text-muted-foreground">The psychology behind the numbers</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Third-Party Endorsement</h4>
                    <p className="text-muted-foreground text-sm">
                      When a host invites you on their show, they're vouching for your expertise. 
                      This borrowed trust is far more valuable than self-promotion.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Long-Form Connection</h4>
                    <p className="text-muted-foreground text-sm">
                      A 45-minute podcast conversation creates deeper connection than 
                      a 6-second ad that viewers are trying to skip.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Pre-Qualified Audience</h4>
                    <p className="text-muted-foreground text-sm">
                      Podcast listeners chose to listen. They're actively interested in 
                      the topic — unlike random ad impressions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">No Ad Fatigue</h4>
                    <p className="text-muted-foreground text-sm">
                      People actively seek out podcast content. There's no banner blindness, 
                      no skip button, no "Skip Ad in 5 seconds."
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Evergreen Content</h4>
                    <p className="text-muted-foreground text-sm">
                      Podcast episodes stay online forever. New listeners discover your 
                      interview months or years later.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">No Ongoing Cost</h4>
                    <p className="text-muted-foreground text-sm">
                      Once published, your episode generates leads without additional spend. 
                      Ads stop the moment you stop paying.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Guest Booker Pro vs Booking Agencies */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Guest Booker Pro vs. Booking Agencies
                </h2>
                <p className="text-muted-foreground">Get the same results at a fraction of the cost</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional Agencies */}
              <Card className="p-6 border-2 border-destructive/30 bg-destructive/5">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Podcast Booking Agencies</h3>
                  <p className="text-4xl font-black text-destructive">$2,000 - $5,000</p>
                  <p className="text-muted-foreground">per month</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">High monthly retainers with long contracts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">Slow, manual outreach process</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">Generic templates sent to limited shows</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">Limited visibility into their process</p>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-destructive/10 rounded-lg text-center">
                  <p className="text-sm text-destructive font-medium">Typical cost: $24,000 - $60,000/year</p>
                </div>
              </Card>
              
              {/* Guest Booker Pro */}
              <Card className="p-6 border-2 border-primary bg-primary/5">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Guest Booker Pro</h3>
                  <p className="text-4xl font-black text-primary">{priceRange}</p>
                  <p className="text-muted-foreground">per month</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">Affordable plans with no long-term commitment</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">AI-powered discovery finds perfect-fit shows</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">Personalized pitches generated for each show</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground text-sm">Full control and visibility over your pipeline</p>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-green-500/10 rounded-lg text-center">
                  <p className="text-sm text-green-600 font-medium">Save up to 95% compared to agencies</p>
                </div>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <div className="text-center">
                <p className="text-foreground text-lg mb-2">
                  <strong>Same goal, fraction of the cost.</strong>
                </p>
                <p className="text-muted-foreground">
                  Booking agencies charge premium rates for manual work. Guest Booker Pro automates the entire process — 
                  discovery, personalized outreach, and follow-ups — so you get booked on more shows without the agency price tag.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 text-center bg-primary/5 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to <span className="text-primary">Stop Burning Money</span> on Ads?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of experts, authors, and entrepreneurs who've switched from 
              paid advertising to guest appearances — and never looked back.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/pricing">
                <Button size="lg" data-testid="button-cta-signup" className="gap-2">
                  Start Guest Booking Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" data-testid="button-cta-learn">
                  See How It Works
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Rocket className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Guest Booker Pro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The smart alternative to paid advertising.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
