import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Rocket, ArrowRight, TrendingUp, Users, Zap, Target, 
  GraduationCap, BookOpen, Mic, Search, Radio, Youtube, 
  Briefcase, Video, Award, DollarSign, Globe, MessageSquare,
  CheckCircle2, ArrowDown, Sparkles, BarChart3, Crown, MessageCircle
} from "lucide-react";
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

function FlowStep({ icon: Icon, title, description, step, isLast = false }: { 
  icon: any; 
  title: string; 
  description: string; 
  step: number;
  isLast?: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">{step}</span>
          </div>
        </div>
        <h4 className="font-semibold text-foreground mt-3 mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground max-w-[120px]">{description}</p>
      </div>
      {!isLast && (
        <div className="hidden md:flex items-center justify-center mx-2">
          <div className="flex items-center">
            <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
            <ArrowRight className="w-5 h-5 text-primary/60" />
          </div>
        </div>
      )}
      {!isLast && (
        <div className="md:hidden flex items-center justify-center my-3">
          <div className="flex flex-col items-center">
            <div className="h-6 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20" />
            <ArrowDown className="w-5 h-5 text-primary/60" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function HowItWorks() {
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">The Power of Audience</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">How Guest Appearances</span>
            <br />
            <span className="text-primary">Transform Careers</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Understanding the journey from obscurity to influence. See exactly how podcast, YouTube, and Spotify appearances 
            create compound growth opportunities that benefit every type of career.
          </p>
        </motion.div>
      </section>

      {/* The Guest Booking Process Flow */}
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
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Guest Booking Process
                </h2>
                <p className="text-muted-foreground">From discovery to published appearance</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-2">
              <FlowStep 
                icon={Search} 
                title="Discovery" 
                description="Find shows aligned with your expertise and goals"
                step={1}
              />
              <FlowStep 
                icon={MessageSquare} 
                title="Outreach" 
                description="Send personalized pitches to show hosts"
                step={2}
              />
              <FlowStep 
                icon={CheckCircle2} 
                title="Response" 
                description="Hosts respond with interest and scheduling"
                step={3}
              />
              <FlowStep 
                icon={Mic} 
                title="Appearance" 
                description="Join live or record your interview"
                step={4}
              />
              <FlowStep 
                icon={Globe} 
                title="Publication" 
                description="Episode goes live across platforms"
                step={5}
              />
              <FlowStep 
                icon={TrendingUp} 
                title="Growth" 
                description="New audience discovers your work"
                step={6}
                isLast
              />
            </div>

            <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-center text-foreground">
                <strong>Guest Booker Pro automates steps 1-3</strong> — discovery, outreach, and follow-ups — 
                so you can focus on delivering great content during your appearances.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Audience Growth Flywheel */}
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
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Audience Growth Flywheel
                </h2>
                <p className="text-muted-foreground">How visibility compounds over time</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Flywheel Visualization - Circular Layout with Dotted Border */}
              <div className="w-full max-w-md mx-auto py-8">
                <div className="relative w-64 h-64 mx-auto">
                  {/* Dotted circle connecting icons */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/40" />
                  
                  {/* Center - Your Brand */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                      <span className="text-primary font-bold text-center text-sm">Your Brand</span>
                    </div>
                  </div>
                  
                  {/* Top - Appearances (icon centered on circle edge) */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex flex-col items-center">
                    <span className="text-sm text-foreground mb-1 font-medium">Appearances</span>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <Video className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  
                  {/* Right - Exposure (icon outside circle) */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-16 flex flex-row items-center">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                    <span className="text-sm text-foreground ml-1 font-medium">Exposure</span>
                  </div>
                  
                  {/* Bottom - Subscribers (icon centered on circle edge) */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-sm text-foreground mt-1 font-medium">Subscribers</span>
                  </div>
                  
                  {/* Left - Opportunities (icon outside circle) */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-16 flex flex-row items-center">
                    <span className="text-sm text-foreground mr-1 font-medium">Opportunities</span>
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </div>
                
                {/* Arrow indicators between elements */}
                <div className="mt-10 flex justify-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap justify-center">
                    <span>Appearances</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Exposure</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Subscribers</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Opportunities</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Repeat</span>
                  </div>
                </div>
              </div>
              
              {/* Explanation */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Make Appearances</h4>
                    <p className="text-muted-foreground text-sm">Guest on podcasts, YouTube, and Spotify shows (live or recorded)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                    <span className="text-green-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Gain Exposure</h4>
                    <p className="text-muted-foreground text-sm">Reach established audiences who trust the host</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Build Subscribers</h4>
                    <p className="text-muted-foreground text-sm">Convert listeners into your own loyal followers</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                    <span className="text-orange-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Unlock Opportunities</h4>
                    <p className="text-muted-foreground text-sm">Larger shows invite you, more doors open</p>
                  </div>
                </div>
                
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-foreground text-sm">
                    <strong>The flywheel effect:</strong> Each cycle increases momentum. More appearances lead to more exposure, 
                    which leads to more subscribers, which attracts bigger opportunities — and the cycle accelerates.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Career Benefits of Audience */}
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
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  How Audience Benefits Every Career
                </h2>
                <p className="text-muted-foreground">From credibility to concrete opportunities</p>
              </div>
            </div>
            
            {/* Flow: Audience → Credibility → Opportunities */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex flex-col items-center text-center p-6 bg-blue-500/5 rounded-xl border border-blue-500/10 max-w-xs">
                  <Users className="w-10 h-10 text-blue-400 mb-3" />
                  <h3 className="font-bold text-foreground text-lg">Audience</h3>
                  <p className="text-muted-foreground text-sm">People who know and follow your work</p>
                </div>
                
                <ArrowRight className="w-8 h-8 text-muted-foreground/50 hidden md:block" />
                <ArrowDown className="w-8 h-8 text-muted-foreground/50 md:hidden" />
                
                <div className="flex flex-col items-center text-center p-6 bg-purple-500/5 rounded-xl border border-purple-500/10 max-w-xs">
                  <Award className="w-10 h-10 text-purple-400 mb-3" />
                  <h3 className="font-bold text-foreground text-lg">Credibility</h3>
                  <p className="text-muted-foreground text-sm">Social proof that validates your expertise</p>
                </div>
                
                <ArrowRight className="w-8 h-8 text-muted-foreground/50 hidden md:block" />
                <ArrowDown className="w-8 h-8 text-muted-foreground/50 md:hidden" />
                
                <div className="flex flex-col items-center text-center p-6 bg-green-500/5 rounded-xl border border-green-500/10 max-w-xs">
                  <Zap className="w-10 h-10 text-green-400 mb-3" />
                  <h3 className="font-bold text-foreground text-lg">Opportunities</h3>
                  <p className="text-muted-foreground text-sm">Doors that open because people know you</p>
                </div>
              </div>
            </div>
            
            {/* Opportunity Types Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-background rounded-xl border border-border">
                <Mic className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Speaking Engagements</h4>
                <p className="text-muted-foreground text-sm">Conferences, panels, and keynotes pay for visible experts</p>
              </div>
              
              <div className="p-5 bg-background rounded-xl border border-border">
                <BookOpen className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Book Deals</h4>
                <p className="text-muted-foreground text-sm">Publishers want authors who bring their own audience</p>
              </div>
              
              <div className="p-5 bg-background rounded-xl border border-border">
                <Briefcase className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Consulting</h4>
                <p className="text-muted-foreground text-sm">Clients seek advisors with demonstrated thought leadership</p>
              </div>
              
              <div className="p-5 bg-background rounded-xl border border-border">
                <DollarSign className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Sponsorships</h4>
                <p className="text-muted-foreground text-sm">Brands partner with people who have engaged followings</p>
              </div>
              
              <div className="p-5 bg-background rounded-xl border border-border">
                <Rocket className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Investment Access</h4>
                <p className="text-muted-foreground text-sm">Founders with audiences attract investor attention</p>
              </div>
              
              <div className="p-5 bg-background rounded-xl border border-border">
                <GraduationCap className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Academic Recognition</h4>
                <p className="text-muted-foreground text-sm">Public impact increasingly matters for tenure and grants</p>
              </div>
              
              <div className="p-5 bg-background rounded-xl border border-border">
                <Globe className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Media Appearances</h4>
                <p className="text-muted-foreground text-sm">Journalists quote experts who already have platforms</p>
              </div>
              
              <div className="p-5 bg-background rounded-xl border border-border">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Network Effects</h4>
                <p className="text-muted-foreground text-sm">Visible people attract connections from other visible people</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Why Traditional Methods Fail */}
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
                <Search className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Traditional Visibility Methods Fall Short
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">X</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Social Media Algorithms</h4>
                    <p className="text-muted-foreground text-sm">Favor entertainment over expertise. Your content competes with viral trends.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">X</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Paid Advertising</h4>
                    <p className="text-muted-foreground text-sm">Expensive, often ignored, and doesn't build lasting trust or relationships.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">X</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cold Outreach</h4>
                    <p className="text-muted-foreground text-sm">Low response rates. No context or warm introduction.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">X</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Networking Events</h4>
                    <p className="text-muted-foreground text-sm">Time-intensive, geographically limited, inconsistent results.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Guest Appearances Work Because:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Borrowed trust:</strong> The host's audience already trusts them, and that trust transfers to you</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Long-form format:</strong> 30-60+ minutes to demonstrate expertise, not 280 characters</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Evergreen content:</strong> Episodes continue attracting listeners months and years later</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Direct links:</strong> Show notes include links to your website, products, and social profiles</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* The Math of Consistent Appearances */}
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
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                The Math of Consistent Appearances
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-background rounded-xl border border-border">
                <div className="text-4xl font-black text-primary mb-2">2</div>
                <div className="text-foreground font-medium">Appearances per month</div>
                <div className="text-muted-foreground text-sm mt-1">A sustainable pace for most professionals</div>
              </div>
              
              <div className="text-center p-6 bg-background rounded-xl border border-border">
                <div className="text-4xl font-black text-primary mb-2">500</div>
                <div className="text-foreground font-medium">Average listeners per episode</div>
                <div className="text-muted-foreground text-sm mt-1">Conservative estimate for niche shows</div>
              </div>
              
              <div className="text-center p-6 bg-background rounded-xl border border-border">
                <div className="text-4xl font-black text-primary mb-2">12,000</div>
                <div className="text-foreground font-medium">New listeners per year</div>
                <div className="text-muted-foreground text-sm mt-1">That's 12,000 people who now know your name</div>
              </div>
            </div>
            
            <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-foreground text-center text-lg">
                <strong>And that's just direct listeners.</strong> Episodes get shared, clipped, and discovered via search. 
                The actual reach compounds significantly over time as your library of appearances grows.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-10 md:p-16 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Ready to Start Building Your Audience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Guest Booker Pro handles the discovery, outreach, and follow-ups so you can focus on 
              what you do best — sharing your expertise with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="gap-2" data-testid="button-get-started">
                  Get Started Today
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Guest Booker Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
