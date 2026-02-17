import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Rocket, Mail, Target, Zap, Users, Sparkles, ArrowRight, Play, GraduationCap, Mic, BookOpen, Briefcase, Video, Radio, Crown, BarChart3, MessageCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import interview1 from "@assets/Screenshot_2025-12-08_at_7.54.30_PM_1765191315784.png";
import interview2 from "@assets/Screenshot_2025-12-08_at_7.45.44_PM_1765191315785.png";
import interview3 from "@assets/Screenshot_2025-12-08_at_8.12.47_PM_1765192388379.png";
import interview4 from "@assets/Screenshot_2025-12-08_at_8.11.10_PM_1765192388380.png";

interface PricingPlan {
  tier: string;
  displayName: string;
  monthlyPriceUSD: number;
  yearlyPriceUSD: number;
  maxProfiles: number;
  maxDiscoveryPerMonth: number;
  maxEmailsPerMonth: number;
  deepResearchQuota: number;
  sortOrder: number;
}

export default function Landing() {
  // Fetch dynamic pricing from API
  const { data: pricingPlans = [] } = useQuery<PricingPlan[]>({
    queryKey: ['/api/pricing'],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Rocket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">Guest Booker Pro</span>
            </div>
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
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                Login
              </Button>
            </Link>
            <Link href="/pricing">
              <Button data-testid="button-signup">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">Guest Booking & Outreach Platform</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-primary">Get Guest Spots</span>
            <br />
            <span className="text-foreground">&amp; Land Influencer Collabs</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you want to be interviewed as a guest speaker or collaborate with influencers
            for video partnerships, our platform gives you direct access to show databases,
            automates your outreach, and manages your entire booking pipeline.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/pricing">
              <Button size="lg" data-testid="button-hero-signup" className="gap-2 px-8 text-lg shadow-lg">
                Start Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" data-testid="button-hero-login" className="px-8 text-lg">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Taglines for all creators */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/20">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                Any subject, any topic, any niche. Find your audience.
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 border border-accent/20">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-foreground font-medium">
                Having trouble getting your channel or brand off the ground? We can help!
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-2 gap-8 max-w-xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center">
            <p className="text-4xl font-black text-primary">100K+</p>
            <p className="text-sm text-muted-foreground mt-1">Shows Discovered</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-secondary">10K+</p>
            <p className="text-sm text-muted-foreground mt-1">Bookings Made</p>
          </div>
        </motion.div>

        {/* Interview Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16"
        >
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider font-medium">Real Bookings Made with Guest Booker Pro</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-border shadow-md aspect-video hover-elevate">
              <img 
                src={interview1} 
                alt="Through A Glass Darkly podcast interview" 
                className="w-full h-full object-cover"
                data-testid="img-interview-1"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-md aspect-video hover-elevate">
              <img 
                src={interview2} 
                alt="The Guernica podcast interview" 
                className="w-full h-full object-cover"
                data-testid="img-interview-2"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-md aspect-video hover-elevate">
              <img 
                src={interview3} 
                alt="Podcast interview session" 
                className="w-full h-full object-cover"
                data-testid="img-interview-3"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-md aspect-video hover-elevate">
              <img 
                src={interview4} 
                alt="Miguel Conner podcast interview" 
                className="w-full h-full object-cover"
                data-testid="img-interview-4"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Two Profile Types, <span className="text-primary">Unlimited Opportunities</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the path that fits your goals
            </p>
          </motion.div>
          
          {/* Profile Types */}
          <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 h-full hover-elevate bg-card border-border">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">Guest Profile</h3>
                <p className="text-muted-foreground text-lg">
                  For speakers who want to be interviewed on podcasts or YouTube shows.
                  Find host-driven formats that feature guest interviews and get your voice heard.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 h-full hover-elevate bg-card border-border">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Play className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-secondary">Influencer Profile</h3>
                <p className="text-muted-foreground text-lg">
                  For creators seeking video collaborations, cross-channel appearances, or
                  co-productions. Discover channels open to collaborative content.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Core Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Powerful Features for <span className="text-primary">Both Profile Types</span>
            </h3>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Show Database Access",
                description: "Browse thousands of podcasts, YouTube channels, and Spotify shows from Podcast Index and YouTube Data APIs. Filter by topic, audience size, and more.",
                color: "primary"
              },
              {
                icon: Zap,
                title: "Host Contact Discovery",
                description: "Get detailed host information, booking contacts, and episode insights. We find the right person to pitch so you don't have to.",
                color: "secondary"
              },
              {
                icon: Mail,
                title: "Outreach Automation",
                description: "Send personalized pitch emails and automated follow-ups directly through Gmail. Track responses and manage your pipeline.",
                color: "accent"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-elevate bg-card border-border">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-5`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 text-${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Simple, <span className="text-primary">Transparent Pricing</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the plan that scales with your needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const monthlyPrice = (plan.monthlyPriceUSD / 100).toFixed(2);
              const yearlyPrice = (plan.yearlyPriceUSD / 100).toFixed(2);
              const isPopular = plan.tier === 'growth';
              const colorMap: Record<string, string> = {
                basic: "primary",
                growth: "secondary",
                pro: "primary",
                agency: "accent"
              };
              const color = colorMap[plan.tier] || "primary";
              
              const crmFeatureMap: Record<string, string> = {
                basic: "Basic CRM",
                growth: "Auto follow-ups",
                pro: "Multi-step sequences",
                agency: "Team accounts"
              };
              const crmFeature = crmFeatureMap[plan.tier] || "CRM Features";
              
              return (
                <motion.div
                  key={plan.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 relative hover-elevate bg-card border-border ${isPopular ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                          POPULAR
                        </span>
                      </div>
                    )}
                    <h3 className={`text-xl font-bold mb-2 text-${color}`}>
                      {plan.displayName}
                    </h3>
                    <div className="mb-2">
                      <span className="text-4xl font-black text-foreground">${monthlyPrice}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium mb-4">
                      or ${yearlyPrice}/yr (save {Math.round((1 - plan.yearlyPriceUSD / (plan.monthlyPriceUSD * 12)) * 100)}%)
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 text-${color}`} />
                        <span className="text-foreground">{plan.maxDiscoveryPerMonth.toLocaleString()} shows discovered/mo</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 text-${color}`} />
                        <span className="text-foreground">{plan.maxEmailsPerMonth.toLocaleString()} outreach emails/mo</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 text-${color}`} />
                        <span className="text-foreground">{crmFeature}</span>
                      </li>
                    </ul>
                    <Link href="/pricing">
                      <Button className="w-full" variant={isPopular ? "default" : "outline"}>
                        Get Started
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary-foreground" />
            <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
              Ready to Level Up?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of content creators who are booking more guest appearances
              and landing influencer collaborations with Guest Booker Pro.
            </p>
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="gap-2 px-10 text-lg shadow-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Rocket className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Guest Booker Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 Guest Booker Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
