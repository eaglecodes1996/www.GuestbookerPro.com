import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, TrendingUp, Link2, Sprout, Zap, GraduationCap, BookOpen, Mic, Users, Search, Star, Radio, Youtube, Briefcase, PenTool, Video, Crown, Sparkles, BarChart3, MessageCircle } from "lucide-react";
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

export default function ForAcademics() {
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
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">For Academics & Researchers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Elevate Your Voice,</span>
            <br />
            <span className="text-primary">Expand Your Reach</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Academics and researchers produce some of the most valuable knowledge in society — yet much of it never reaches the audiences who need it. 
            Guest Booker Pro helps scholars step into the public conversation, build visibility beyond the algorithm, and access opportunities that traditional academic pathways rarely provide.
          </p>
        </motion.div>
      </section>

      {/* Why Academics Feel Buried */}
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
                Why Academics Feel Buried in Today's Media Landscape
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              The internet rewards viral reactions over informed analysis, trends over truth, and personalities over expertise. This leaves academics feeling overshadowed, even though <strong className="text-foreground">people want intelligent conversation</strong> — they're simply not being shown it.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">The Algorithm Rewards:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Viral reactions over informed analysis</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Trends over truth</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Personalities over expertise</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Superficial takes over long-form thinking</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">The Issue Is Distribution, Not Value</h3>
                <p className="text-muted-foreground mb-4">
                  The issue is not the value of your work — the issue is distribution. Guest Booker Pro bridges that gap by connecting you directly with audiences who value depth and expertise.
                </p>
                <p className="text-foreground font-medium">We help you reach the people who are already looking for intelligent conversation.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What Guestbooker Pro Does */}
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
                What Guest Booker Pro Does for You
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              We place academics directly in front of audiences looking for depth, clarity, and intellectual leadership.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Radio className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Intelligent Matching</h3>
                <p className="text-muted-foreground text-sm">Our system identifies podcasts, YouTube channels, Spotify shows, livestreams, and interview formats aligned with your field of expertise.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Automated Outreach</h3>
                <p className="text-muted-foreground text-sm">We contact hosts for you, presenting your credentials, research topics, and interview angles professionally.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Visibility Beyond the Algorithm</h3>
                <p className="text-muted-foreground text-sm">You don't have to compete with influencers. We deliver you to platforms that value expertise.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Long-Form Space</h3>
                <p className="text-muted-foreground text-sm">Unlike short-form media, interviews allow you to explore ideas with nuance, context, and rigor.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <GraduationCap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Authority & Recognition</h3>
                <p className="text-muted-foreground text-sm">Every appearance builds your public footprint, amplifies your reputation, and strengthens your academic presence online.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">New Opportunities</h3>
                <p className="text-muted-foreground text-sm">Speaking engagements, research collaborations, book sales, consulting invitations, and more.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Audience Size & Growth */}
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
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Audience Size & Realistic Growth
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              A common misconception is that public impact requires a massive audience. In reality, most scholars begin with modest but <strong className="text-foreground">highly engaged listeners</strong> — 300-500 viewers, 1,000 listeners, or niche communities with high retention. These numbers are not small — they are valuable.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-accent">✔</span> Content That Keeps Working
                </h3>
                <p className="text-muted-foreground">
                  Podcast and YouTube audiences do not disappear after the recording. They continue growing month after month, often bringing in far more cumulative listeners than a lecture hall ever could.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-accent">✔</span> Compound Growth
                </h3>
                <p className="text-muted-foreground">Each appearance increases discoverability, strengthens your authority, encourages hosts to invite you again, and expands your audience across platforms.</p>
                <p className="text-foreground font-medium mt-4">Visibility in academia is linear. Visibility in media is exponential.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* How Interviews Drive Traffic */}
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
                <Link2 className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                How Interviews Drive Traffic to Your Work
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              One of the strongest advantages of modern interviews is the standard practice of placing guest links in the episode description. Every appearance can include direct links to your work.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Academic website</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Publications & books</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Research papers</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">University profile</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Events & lectures</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">YouTube channel</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Social platforms</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Newsletter signup</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg">
              A single impactful interview can bring more traffic to your work than months of traditional outreach.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Small Audiences Lead to Larger Ones */}
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
                <Sprout className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Small Audiences Lead to Larger Ones
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Academics often underestimate the influence of niche platforms. Even a small podcast can trigger a cascade of opportunities:
            </p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-accent mt-1 shrink-0" />
                <span className="text-muted-foreground">Invitations from bigger channels</span>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-accent mt-1 shrink-0" />
                <span className="text-muted-foreground">Media requests</span>
              </div>
              <div className="flex items-start gap-3">
                <Mic className="w-5 h-5 text-accent mt-1 shrink-0" />
                <span className="text-muted-foreground">Panel discussions</span>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-accent mt-1 shrink-0" />
                <span className="text-muted-foreground">Increased book sales</span>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-accent mt-1 shrink-0" />
                <span className="text-muted-foreground">Departmental recognition</span>
              </div>
            </div>
            
            <p className="text-foreground font-medium">
              The path from obscurity to visibility rarely comes from one viral moment — it comes from consistent, meaningful appearances across aligned platforms. Guest Booker Pro makes that pathway organized, efficient, and ongoing.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Why You Should Consider YouTube */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Academics Should Consider Their Own YouTube Channel
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              While not required, having your own channel dramatically strengthens your public presence. Viewers from interviews will look you up — giving them a destination builds long-term followers, centralizes your work, increases citations, and amplifies your voice as a public scholar.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Don't Need Hollywood Production</h3>
                <p className="text-muted-foreground mb-4">You only need:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> A decent external microphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> A good-quality camera or modern smartphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Basic lighting</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Simple editing</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Ideas Do the Heavy Lifting</h3>
                <p className="text-muted-foreground mb-4">
                  Production value doesn't need to be cinematic — it just needs to be clear, professional, and watchable.
                </p>
                <p className="text-foreground font-medium">
                  Guest Booker Pro brings the audience. Your channel retains them.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What This Means for Your Academic Future */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12 bg-primary/5 border-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What This Means for Your Academic Future
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Guest appearances and public-facing content help you expand your influence, strengthen your professional identity, share your work with global audiences, build authority beyond your institution, open doors to collaborations and opportunities, and grow as a public intellectual.
            </p>
            
            <div className="bg-background rounded-xl p-6 border border-border mb-6">
              <p className="text-lg text-foreground font-medium mb-4">
                This is not about becoming an entertainer or influencer.
              </p>
              <p className="text-muted-foreground">
                It's about reclaiming space in public discourse that has been dominated by shallow commentary.
              </p>
            </div>
            
            <p className="text-xl text-primary font-bold">
              Your expertise matters. Your voice is needed. We make sure it's heard.
            </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Expand Your Reach?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join academics and researchers who are building their public presence through strategic guest appearances.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/pricing">
              <Button size="lg" data-testid="button-cta-pricing" className="gap-2 px-8 text-lg shadow-lg">
                View Pricing Plans
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" data-testid="button-cta-home" className="px-8 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
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
