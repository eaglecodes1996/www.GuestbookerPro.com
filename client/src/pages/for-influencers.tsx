import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, TrendingUp, Link2, Sprout, Zap, GraduationCap, BookOpen, Mic, Users, Search, Star, Radio, Youtube, Briefcase, Video, Heart, Share2, Target, Crown, Sparkles, Mail, MessageCircle, CheckCircle, Send, BarChart3 } from "lucide-react";
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

export default function ForInfluencers() {
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
            <Video className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">For Influencers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Secure Real Collaborations Through</span>
            <br />
            <span className="text-primary">High-Volume Targeted Outreach</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Cross-collaboration is the fastest, most reliable way for influencers to grow — but it's also the hardest part of being a creator.
            Guest Booker Pro sends the large volume of professional outreach required to secure real collabs.
          </p>
        </motion.div>
      </section>

      {/* The Challenge for Influencers */}
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
                <MessageCircle className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Influencer Outreach Is So Difficult
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Most influencers quickly discover the painful reality of creator outreach:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Common Frustrations:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Cold DMs get ignored</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Emails get lost in the inbox</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Creators are busy and overwhelmed</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Even interested people forget to reply</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Sending 10 messages is not enough</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Sending 100 messages takes too long</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Our Solution</h3>
                <p className="text-muted-foreground mb-4">
                  Guest Booker Pro does the one thing creators don't have time for: <strong className="text-foreground">sending the large volume of professional outreach required to secure real collabs</strong>.
                </p>
                <p className="text-foreground font-medium">We contact many potential collaborators — and from that volume, a meaningful percentage responds. Those responses become real opportunities for you.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Why It's a Numbers Game */}
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
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Influencer Outreach Is a Numbers Game
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Most creators assume: "If I message five people and they don't answer, I guess no one wants to collaborate." <strong className="text-foreground">Not true.</strong>
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              Even very successful influencers only reply to a small percentage of cold outreach. Why?
            </p>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <Mail className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-foreground font-medium">Inbox overwhelm</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-foreground font-medium">Time constraints</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <Heart className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-foreground font-medium">Creator burnout</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 text-center">
                <MessageCircle className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-foreground font-medium">Message overload</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg text-center">
              This doesn't mean they're not interested — it means the message has to reach enough people for opportunities to appear. Guest Booker Pro handles that scale for you.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* How Guest Booker Pro Works */}
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
                How Guest Booker Pro Gets Influencers Real Collaborations
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                  <h3 className="font-semibold text-foreground">We Research Creators Who Match Your Niche</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">We don't email random influencers. We find creators whose:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Audience overlaps with yours</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Tone matches yours</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Content fits naturally</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Style complements your brand</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
                  <h3 className="font-semibold text-foreground">We Send Professional, High-Volume Outreach</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">This is the hardest part for creators. We send many personalized messages:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2"><Send className="w-4 h-4 text-primary" /> Professional collaboration requests</li>
                  <li className="flex items-center gap-2"><Send className="w-4 h-4 text-primary" /> Cross-promotion proposals</li>
                  <li className="flex items-center gap-2"><Send className="w-4 h-4 text-primary" /> Guest-swap suggestions</li>
                  <li className="flex items-center gap-2"><Send className="w-4 h-4 text-primary" /> YouTube collab invites</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
                  <h3 className="font-semibold text-foreground">A Percentage of Creators Respond</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">Those responses become real opportunities:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Collabs and shoutouts</li>
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Podcast swaps</li>
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Video features</li>
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Livestreams and challenges</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">4</div>
                  <h3 className="font-semibold text-foreground">Your Channel Is Always Linked</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">In every collaboration, creators link to your:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2"><Link2 className="w-4 h-4 text-primary" /> YouTube channel</li>
                  <li className="flex items-center gap-2"><Link2 className="w-4 h-4 text-primary" /> TikTok / Reels / Instagram</li>
                  <li className="flex items-center gap-2"><Link2 className="w-4 h-4 text-primary" /> Website and merch</li>
                  <li className="flex items-center gap-2"><Link2 className="w-4 h-4 text-primary" /> Newsletter, Discord, or Patreon</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* The Outreach Formula */}
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
                The Influencer Outreach Formula
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Here's the reality of creator outreach:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10 text-center">
                <p className="text-4xl font-bold text-destructive mb-2">10</p>
                <p className="text-lg font-semibold text-foreground mb-2">emails</p>
                <p className="text-muted-foreground">Almost no responses</p>
              </div>
              <div className="bg-accent/10 rounded-xl p-6 border border-accent/20 text-center">
                <p className="text-4xl font-bold text-accent mb-2">100</p>
                <p className="text-lg font-semibold text-foreground mb-2">emails</p>
                <p className="text-muted-foreground">Some responses</p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20 text-center">
                <p className="text-4xl font-bold text-green-500 mb-2">300+</p>
                <p className="text-lg font-semibold text-foreground mb-2">emails</p>
                <p className="text-muted-foreground">Consistent opportunities</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg text-center">
              Influencers rarely reach this scale — but Guest Booker Pro does. By contacting many relevant creators, we create predictable replies, steady partnerships, and ongoing collaborative relationships.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* What Influencers Get from Collaborations */}
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
                What Influencers Get from Collaborations
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              When another creator shares your content:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Users className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Their audience becomes aware of you</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Heart className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Viewers subscribe to your channel</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Sparkles className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Algorithm sees shared audience interest</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <TrendingUp className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Your videos perform better</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Crown className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Your brand expands</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Share2 className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Future collabs become easier</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Star className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Your credibility increases instantly</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Zap className="w-8 h-8 text-red-500 mb-4" />
                <p className="text-foreground font-medium">Momentum builds exponentially</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg text-center">
              One good collab is worth 50 solo uploads. Guest Booker Pro gives you those opportunities consistently.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* What This Means for Your Growth */}
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
                What This Means for Your Growth
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Because we do high-volume outreach for you:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Don't Have To:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Worry about unread DMs</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Waste time chasing creators</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Get discouraged by no responses</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Send hundreds of emails manually</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Guess what works and what doesn't</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Job Becomes Simple:</h3>
                <div className="space-y-4">
                  <p className="text-foreground font-medium text-lg">Show up. Be yourself. Create great content.</p>
                  <p className="text-muted-foreground">We bring the people.</p>
                  <p className="text-muted-foreground">You get results from scale instead of guessing.</p>
                </div>
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
              Ready to Grow Through Real Collaborations?
            </h2>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
              You don't grow by hoping people find you. You grow by collaborating with other influencers who already have the audience you want.
            </p>
            <p className="text-foreground font-medium mb-8">
              We contact many creators. A percentage respond. Those responses turn into real collaborations.
            </p>
            <p className="text-xl text-foreground font-bold mb-8">
              Consistency leads to Growth leads to Momentum.
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
