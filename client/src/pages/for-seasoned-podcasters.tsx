import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, TrendingUp, Users, Zap, GraduationCap, BookOpen, Mic, Radio, Briefcase, Video, Crown, Star, Target, Sparkles, MessageSquare, Award, DollarSign, Share2, CheckCircle2, Headphones, BarChart3, Info, MessageCircle } from "lucide-react";
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

export default function ForSeasonedPodcasters() {
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
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">For Seasoned Podcasters</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Upgrade Guest Quality,</span>
            <br />
            <span className="text-primary">Scale Without Burnout</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            You've built something worth listening to. Now it's time to consistently bring in higher-value guests, 
            expand your reach, and grow without the booking fatigue that slows production.
          </p>
        </motion.div>
      </section>

      {/* Why Established Podcasters Hit a Plateau */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Established Podcasters Hit a Growth Plateau
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Even successful podcasters face the same recurring challenges that stall growth and drain energy.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Common Challenges:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> The best guest prospects are busy</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Your audience expects bigger and better every season</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Outreach becomes a full-time job</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> High-caliber guests require persistence and professionalism</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Not every guest delivers quality content</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Booking fatigue slows the entire production cycle</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">The Result:</h3>
                <p className="text-muted-foreground mb-4">
                  Eventually, you hit a point where the show is strong — but growth stalls. 
                  Content stays consistent, but reach plateaus.
                </p>
                <p className="text-foreground font-medium">
                  This is where Guest Booker Pro becomes transformational — helping you break through 
                  to the next level of guest quality and audience growth.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What Guest Booker Pro Does for Seasoned Podcasters */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What Guest Booker Pro Does for Seasoned Podcasters
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Top-Tier, High-Quality Guests</h4>
                    <p className="text-muted-foreground text-sm">
                      Experts, authors, founders, academics, niche specialists, and cultural voices who speak clearly, 
                      hold attention, bring insight, add credibility, and elevate your show's reputation.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Guests Who Match Your Brand</h4>
                    <p className="text-muted-foreground text-sm">
                      Whether your audience loves deeper conversations, educational content, founder stories, 
                      cultural analysis, or personal journeys — we match you with guests who deliver those styles effectively.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">High-Volume Outreach for Big Guests</h4>
                    <p className="text-muted-foreground text-sm">
                      Top-tier guests rarely respond to one email. They respond to persistent, professional, 
                      well-managed outreach. We email many potential guests, follow up, maintain communication, 
                      handle scheduling, and remove friction.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Scale Without Sacrificing Quality</h4>
                    <p className="text-muted-foreground text-sm">
                      More guests means more options, better content, higher retention, and faster growth. 
                      Your show stays consistent, engaging, varied, professionally produced, and easier to maintain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* How High-Quality Guests Grow Your Show */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                How High-Quality Guests Grow Your Show
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Better guests bring compounding benefits that accelerate your show's growth and reputation.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                <Users className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Larger Audiences</h4>
                <p className="text-muted-foreground text-sm">Big guests bring their followers to your show</p>
              </div>
              <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                <Headphones className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Stronger Retention</h4>
                <p className="text-muted-foreground text-sm">Quality content keeps listeners coming back</p>
              </div>
              <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                <BarChart3 className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Better Algorithms</h4>
                <p className="text-muted-foreground text-sm">Higher watch time means more platform recommendations</p>
              </div>
              <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                <Share2 className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">More Episode Shares</h4>
                <p className="text-muted-foreground text-sm">Compelling guests inspire listeners to share</p>
              </div>
              <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                <MessageSquare className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Community Engagement</h4>
                <p className="text-muted-foreground text-sm">Great conversations spark discussions</p>
              </div>
              <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                <Award className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Back Catalog Performance</h4>
                <p className="text-muted-foreground text-sm">Quality episodes keep performing for years</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-green-500/5 rounded-xl border border-green-500/10">
              <p className="text-center text-foreground">
                <strong>Your podcast becomes a place where people return for the guest lineup alone.</strong>
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Guest Promotion as Growth Engine */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Guest Promotion Becomes a Growth Engine
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Big guests always promote their episodes. This creates a powerful viral loop for your show.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10 text-center">
                <p className="text-foreground font-medium">Your links in their descriptions</p>
              </div>
              <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10 text-center">
                <p className="text-foreground font-medium">Your episode shared to their followers</p>
              </div>
              <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10 text-center">
                <p className="text-foreground font-medium">Your show mentioned in their content</p>
              </div>
              <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10 text-center">
                <p className="text-foreground font-medium">You appearing in their community</p>
              </div>
              <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10 text-center">
                <p className="text-foreground font-medium">Your brand reaching new audiences</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mt-8 text-center">
              For seasoned podcasters, this is the fuel you need to <strong className="text-foreground">scale beyond your plateau</strong>.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* What You Already Have vs What You Need */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Seasoned Podcasters Benefit More
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              New podcasters want guests. Seasoned podcasters want <strong className="text-foreground">better</strong> guests — consistently.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-accent/5 rounded-xl p-6 border border-accent/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Already Have:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Production quality dialed in</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Your hosting style mastered</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Your format perfected</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Your audience built</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Now You Need:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> More influential voices</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> More engaging conversations</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> More variety in your lineup</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> More reach and collaboration</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> More growth momentum</li>
                </ul>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg text-center mt-8">
              Guest Booker Pro provides exactly that.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Opportunities for Seasoned Podcasters */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Opportunities That Open Up
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              With stronger guests, established shows often experience new levels of success.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <DollarSign className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Sponsorship Upgrades</h4>
                <p className="text-muted-foreground text-sm">Better guests attract premium sponsors</p>
              </div>
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <BarChart3 className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Higher CPMs</h4>
                <p className="text-muted-foreground text-sm">Quality audiences command premium rates</p>
              </div>
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <Award className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Network Attention</h4>
                <p className="text-muted-foreground text-sm">Major networks notice top-performing shows</p>
              </div>
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <Share2 className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Cross-Promo Deals</h4>
                <p className="text-muted-foreground text-sm">Bigger shows want to collaborate with you</p>
              </div>
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <Users className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Guest Referrals</h4>
                <p className="text-muted-foreground text-sm">Great guests recommend other great guests</p>
              </div>
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <Mic className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Live Events</h4>
                <p className="text-muted-foreground text-sm">Your audience grows enough for live shows</p>
              </div>
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <Video className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">YouTube Growth</h4>
                <p className="text-muted-foreground text-sm">Video clips drive discovery and subscribers</p>
              </div>
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/10">
                <MessageSquare className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Host Requests</h4>
                <p className="text-muted-foreground text-sm">Other podcasters want you as a guest</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-orange-500/5 rounded-xl border border-orange-500/10">
              <p className="text-center text-foreground">
                <strong>The show becomes not just consistent — but competitive at the top level of your niche.</strong>
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
              Ready to Break Through Your Plateau?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              You've already built something worth listening to. Guest Booker Pro helps you elevate the guest lineup, 
              scale more episodes, increase impact, reach new audiences, and remove booking stress — 
              so you can focus on the conversations, not logistics.
            </p>
            <p className="text-lg text-foreground font-medium mb-8">
              Better guests = better episodes = better growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="gap-2" data-testid="button-get-started">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" data-testid="button-learn-more">
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
              Seasoned podcasters deserve a tool that matches their professionalism.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
