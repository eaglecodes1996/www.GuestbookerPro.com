import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, TrendingUp, Link2, Sprout, Zap, GraduationCap, BookOpen, Mic, Users, Search, Star, Radio, Youtube, Briefcase, PenTool, Video, Heart, Share2, Target, Crown, Sparkles, Headphones, MessageCircle, Download, Clock, BarChart3 } from "lucide-react";
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

export default function ForNewPodcasters() {
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
            <Radio className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">For New Podcasters</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Grow Your Podcast by</span>
            <br />
            <span className="text-primary">Being a Guest on Other Shows</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Starting a podcast is exciting — but growing one is extremely difficult, especially when you're unknown. 
            The fastest way to grow your podcast is NOT posting more episodes... It's appearing as a guest on other podcasts.
          </p>
        </motion.div>
      </section>

      {/* Why New Podcasters Struggle */}
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
                Why New Podcasters Struggle to Grow
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Early on, most hosts face the same problems. These challenges are normal — but they don't have to stay that way.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Common Growth Barriers:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Very few people know your show exists</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Social media posts bring almost no listeners</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Platforms don't recommend small podcasts</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> You don't know how to reach larger audiences</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Growth feels painfully slow</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Big guests won't come on yet</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">The Easiest Shortcut to Growth</h3>
                <p className="text-muted-foreground mb-4">
                  Get in front of other people's audiences. This is exactly what Guest Booker Pro does for you.
                </p>
                <p className="text-foreground font-medium">Guest Booker Pro was built to make this easy, consistent, and scalable — even if your show is brand new and your audience is tiny.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What Guest Booker Pro Does */}
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
                What Guest Booker Pro Does for New Podcasters
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              We book you as a guest on other podcasts — not just anyone, but shows that match your niche, your message, and your personality.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Exposure</h3>
                <p className="text-muted-foreground text-sm">Get in front of audiences who already love podcasts in your niche.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Crown className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Credibility</h3>
                <p className="text-muted-foreground text-sm">Build authority and trust by appearing on established shows.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Audience Growth</h3>
                <p className="text-muted-foreground text-sm">Turn other hosts' listeners into your subscribers.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Link2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Backlinks</h3>
                <p className="text-muted-foreground text-sm">Get SEO-boosting links back to your podcast from every appearance.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Heart className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Recurring Listeners</h3>
                <p className="text-muted-foreground text-sm">Connect with people who become long-term subscribers.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Search className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Discoverability</h3>
                <p className="text-muted-foreground text-sm">Get found by listeners actively searching for content like yours.</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mt-8 text-center">
              This is the same strategy used by <strong className="text-foreground">top YouTubers, authors, entrepreneurs, coaches, and major podcasts</strong>. Guesting is the fastest growth engine in the industry.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Your Channel Is Linked Every Time */}
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
                Your Channel Is Linked Every Time
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Even if your podcast is tiny, your episode description always includes links to your work. Standard practice. Zero extra work from you.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Your podcast link</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Your YouTube channel</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Your social media</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Your website</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Upcoming episodes</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg text-center">
              Every appearance sends people directly to your show.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Audience Size Expectations */}
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
                <Headphones className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Audience Size: What New Podcasters Should Expect
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Your early guest appearances may reach:
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <p className="text-3xl font-bold text-foreground">150</p>
                <p className="text-muted-foreground">listeners</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <p className="text-3xl font-bold text-foreground">300</p>
                <p className="text-muted-foreground">listeners</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <p className="text-3xl font-bold text-foreground">700</p>
                <p className="text-muted-foreground">listeners</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <p className="text-3xl font-bold text-foreground">2,000+</p>
                <p className="text-muted-foreground">depending on niche</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">These Numbers Matter Because:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> These listeners already enjoy podcasts</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> They already listen in your niche</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> They convert at a high rate</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> They become long-term subscribers</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" /> Evergreen Content
                </h3>
                <p className="text-muted-foreground">
                  A single appearance can double or triple a new podcast's audience. And unlike social media, <strong className="text-foreground">podcast episodes are evergreen</strong> — they keep sending listeners to your show for months or years.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* How Guest Appearances Grow Your Show */}
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
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                How Guest Appearances Grow YOUR Show
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Every time you appear on a podcast:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">Listeners get to know you</span>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">They trust you faster</span>
              </div>
              <div className="flex items-start gap-3">
                <Link2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">They click your links</span>
              </div>
              <div className="flex items-start gap-3">
                <Radio className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">They check out your podcast</span>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">They subscribe if they like you</span>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <p className="text-foreground font-medium text-lg">
                This is the most natural form of marketing. People follow the host-guest connection. If they like you in the interview... they follow you home. This is how small podcasts quietly become mid-sized podcasts.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Podcast Growth Without Fancy Gear */}
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
                <Mic className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Podcast Growth Without Fancy Gear
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              New podcasters don't need a studio. To be a great guest, you only need:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-background rounded-xl p-6 border border-border text-center">
                <Mic className="w-8 h-8 text-accent mx-auto mb-4" />
                <p className="text-foreground font-medium">A good USB microphone</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border text-center">
                <Video className="w-8 h-8 text-accent mx-auto mb-4" />
                <p className="text-foreground font-medium">A webcam or smartphone camera</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border text-center">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
                <p className="text-foreground font-medium">Simple lighting</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border text-center">
                <PenTool className="w-8 h-8 text-accent mx-auto mb-4" />
                <p className="text-foreground font-medium">Basic editing skills</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg text-center">
              The value is in your voice and your ideas — not expensive equipment. Guest Booker Pro ensures you sound professional and get matched to the right audiences.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* New Opportunities */}
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
                <Sprout className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                New Opportunities for New Podcasters
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Once you begin appearing on shows, you'll see:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Users className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Other hosts inviting you</h3>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Share2 className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Collaborations with podcast networks</h3>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Download className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Rapid increases in downloads</h3>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">New followers on your platforms</h3>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <MessageCircle className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Requests for cross-promotions</h3>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Video className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Invitations to panels or livestreams</h3>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Star className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Better guests agreeing to come on your show</h3>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Crown className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Faster monetization potential</h3>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg text-center">
              Momentum builds quietly — then suddenly.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* What Guest Booker Pro Means */}
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
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What Guest Booker Pro Means for Your New Podcast
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Don't Have To:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Beg for guests</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Hope someone notices your show</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Rely on social media</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Fight the algorithm</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Grow painfully slowly</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Guess how to build an audience</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Instead, Guest Booker Pro Helps You:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Get discovered</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Build authority</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Grow your audience faster</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Meet other creators</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Become someone listeners remember</li>
                </ul>
                <p className="text-foreground font-medium mt-4">You grow by stepping onto platforms that already have an audience.</p>
              </div>
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
          <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Grow Your Podcast the Fast Way?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you're a new podcaster — the path to growth is being a guest. We make that path easy, consistent, and effective.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="text-lg px-8" data-testid="button-view-pricing">
                View Pricing Plans
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Guest Booker Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
