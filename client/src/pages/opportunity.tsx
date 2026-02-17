import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, TrendingUp, Users, Zap, GraduationCap, BookOpen, Mic, Radio, Briefcase, Video, Crown, Globe, Target, Sparkles, BarChart3, Podcast, Youtube, MessageSquare, Search, DollarSign, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

export default function Opportunity() {
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
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">The Untapped Opportunity</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Millions of Shows</span>
            <br />
            <span className="text-primary">Waiting for Guests Like You</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            The podcast, YouTube, and Spotify interview landscape has exploded. There are more shows actively seeking quality guests 
            than ever before — and most people have no idea how massive this opportunity really is.
          </p>
        </motion.div>
      </section>

      {/* The Numbers */}
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
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Scale of the Opportunity
                </h2>
                <p className="text-muted-foreground">More shows than you can imagine are looking for guests</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/10">
                <Podcast className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-black text-foreground mb-2">5M+</p>
                <p className="text-muted-foreground">Podcasts Worldwide</p>
              </div>
              <div className="text-center p-6 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <Radio className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-black text-foreground mb-2">500K+</p>
                <p className="text-muted-foreground">Active Shows (Weekly Episodes)</p>
              </div>
              <div className="text-center p-6 bg-red-500/5 rounded-xl border border-red-500/10">
                <Youtube className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-black text-foreground mb-2">1M+</p>
                <p className="text-muted-foreground">YouTube Interview Channels</p>
              </div>
              <div className="text-center p-6 bg-green-500/5 rounded-xl border border-green-500/10">
                <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-black text-foreground mb-2">200M+</p>
                <p className="text-muted-foreground">Combined Audience Reach</p>
              </div>
            </div>
            
            <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-center text-foreground text-lg">
                <strong>Most of these shows are actively looking for new guests</strong> — 
                experts, thought leaders, and interesting people to interview. 
                The supply of quality guests is far lower than the demand.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Why This Is Untapped */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why This Opportunity Remains Untapped
                </h2>
                <p className="text-muted-foreground">The friction that keeps most people from accessing this audience</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Discovery Is Overwhelming</h4>
                    <p className="text-muted-foreground text-sm">
                      With millions of shows, finding the right ones that match your niche, audience size, 
                      and format is nearly impossible without specialized tools.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Outreach Takes Forever</h4>
                    <p className="text-muted-foreground text-sm">
                      Finding contact information, crafting personalized pitches, and managing follow-ups 
                      across dozens of shows is a full-time job most people can't afford.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Response Rates Are Low</h4>
                    <p className="text-muted-foreground text-sm">
                      Hosts receive many pitches. Without persistence and professional follow-up systems, 
                      even great candidates get lost in the inbox.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Booking Agencies Are Expensive</h4>
                    <p className="text-muted-foreground text-sm">
                      Traditional PR firms and booking agencies charge thousands of dollars monthly — 
                      pricing out most experts, authors, and entrepreneurs.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Most People Don't Know</h4>
                    <p className="text-muted-foreground text-sm">
                      The strategy of guesting on other shows to build audience isn't widely taught. 
                      Most creators focus on content creation, not distribution.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">No Central Marketplace</h4>
                    <p className="text-muted-foreground text-sm">
                      Unlike job boards or social platforms, there's no single place where guests 
                      and hosts connect — making the entire process fragmented.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* The Result: A Massive Gap */}
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
                  The Result: A Massive Supply-Demand Gap
                </h2>
                <p className="text-muted-foreground">This gap is your opportunity</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 bg-destructive/5 rounded-xl border border-destructive/10">
                <h3 className="text-xl font-bold text-foreground mb-4">What Hosts Experience:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-destructive mt-1 shrink-0" />
                    Constant need for fresh, quality guests
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-destructive mt-1 shrink-0" />
                    Struggling to find experts in specific niches
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-destructive mt-1 shrink-0" />
                    Too many pitches from unqualified people
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-destructive mt-1 shrink-0" />
                    Repetitive guests across the industry
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-destructive mt-1 shrink-0" />
                    Time wasted on guest research and vetting
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-green-500/5 rounded-xl border border-green-500/10">
                <h3 className="text-xl font-bold text-foreground mb-4">What This Means For You:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    Hosts genuinely want to hear from you
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    Your expertise makes you valuable
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    Professional outreach stands out
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    Less competition than you'd expect
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    The system rewards persistence
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-center text-foreground text-lg">
                <strong>There are more open doors than you realize.</strong> The challenge isn't getting opportunities — 
                it's having the system to find and pursue them effectively.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Every Niche Has Shows */}
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
                <Mic className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Shows Exist for Every Niche
                </h2>
                <p className="text-muted-foreground">No matter your expertise, there's an audience waiting</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Business & Entrepreneurship",
                "Health & Wellness",
                "Technology & Innovation",
                "Personal Development",
                "Finance & Investing",
                "Marketing & Sales",
                "Leadership & Management",
                "Science & Research",
                "Psychology & Relationships",
                "Spirituality & Religion",
                "Arts & Creativity",
                "Education & Learning",
                "Sports & Fitness",
                "Politics & Society",
                "True Crime & History",
                "Comedy & Entertainment"
              ].map((niche, index) => (
                <div key={index} className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/10">
                  <p className="text-foreground font-medium text-sm">{niche}</p>
                </div>
              ))}
            </div>
            
            <p className="text-muted-foreground mt-8 text-center">
              And within each category, there are hundreds or thousands of sub-niches. 
              <strong className="text-foreground"> Whatever your specialty, shows exist that want exactly what you offer.</strong>
            </p>
          </Card>
        </motion.div>
      </section>

      {/* The Compounding Effect */}
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
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Compounding Effect
                </h2>
                <p className="text-muted-foreground">Each appearance makes the next one easier</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-accent">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">First Appearances</h4>
                <p className="text-muted-foreground text-sm">Build initial credibility and testimonials</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-accent">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Social Proof Grows</h4>
                <p className="text-muted-foreground text-sm">Your media kit gets stronger with each episode</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-accent">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Bigger Shows Notice</h4>
                <p className="text-muted-foreground text-sm">Larger platforms start accepting your pitches</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-accent">4</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Inbound Requests</h4>
                <p className="text-muted-foreground text-sm">Shows start reaching out to you directly</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-center text-foreground">
                <strong>The hardest part is starting.</strong> Once you have a few appearances under your belt, 
                the flywheel starts spinning and opportunities multiply exponentially.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Tap Into This Opportunity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Guest Booker Pro gives you the discovery tools, outreach automation, and follow-up systems 
              to access this massive untapped market of shows waiting for guests exactly like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="gap-2" data-testid="button-get-started">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" data-testid="button-how-it-works">
                  See How It Works
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Rocket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">Guest Booker Pro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Millions of shows. Billions of listeners. One platform to reach them all.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
