import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, Mic, Target, Users, Zap, GraduationCap, BookOpen, Radio, TrendingUp, Link2, Youtube, Briefcase, Star, Sprout, DollarSign, Building, Video, Crown, Sparkles, BarChart3, MessageCircle } from "lucide-react";
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

export default function ForEntrepreneurs() {
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
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">For Entrepreneurs</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Build Brand Authority,</span>
            <br />
            <span className="text-primary">Open New Opportunities</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            You have something valuable to offer, but most potential customers never see it.
            Guest Booker Pro helps entrepreneurs turn expertise into visibility, authority, and consistent inbound opportunities.
          </p>
        </motion.div>
      </section>

      {/* Why Entrepreneurs Get Overlooked */}
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
                Why Entrepreneurs Get Overlooked in Modern Media
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Most platforms reward trends over substance, loud opinions over proven results, quick tips over real strategy. Real entrepreneurs aren't performing for algorithms — they're building.
            </p>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <p className="text-lg text-muted-foreground mb-4">
                People want trustworthy, real-world insights… but the algorithm keeps showing them recycled advice from non-experts.
              </p>
              <p className="text-foreground font-medium">
                Guest Booker Pro solves this by placing you in front of audiences actively seeking practical experience, knowledge, and inspiration from real business builders.
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What We Do for Entrepreneurs */}
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
                What Guest Booker Pro Does for Entrepreneurs
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              We connect founders, builders, and business owners with podcasts and video channels that value real expertise and authentic business stories.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Direct Access to Targeted Audiences</h3>
                <p className="text-muted-foreground text-sm">We match you with shows whose listeners are customers, clients, investors, collaborators, early adopters, business learners, and aspiring founders. These aren't passive viewers — they're engaged communities.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Professional Outreach Done For You</h3>
                <p className="text-muted-foreground text-sm">No cold emailing, no chasing hosts. We contact shows with a polished pitch about your business journey, expertise, market insights, product or service, story and mission.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Visibility That Builds Trust</h3>
                <p className="text-muted-foreground text-sm">Podcast and video interviews build instant credibility in a way ads and posts never can. People hear your voice, understand your reasoning, and trust you.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Brand Positioning Without Ads</h3>
                <p className="text-muted-foreground text-sm">Guest appearances position you as a thought leader, an authority in your field, a problem-solver with valuable insight. It's the most cost-efficient form of PR.</p>
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
                Audience Size & Growth for Entrepreneurs
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Most entrepreneurs start small — and that's exactly how real momentum begins. Initial appearances typically reach a few hundred to a few thousand listeners, sometimes niche communities with high purchase intent. These audiences may seem modest, but <strong className="text-foreground">they convert at far higher rates than broad advertising audiences.</strong>
            </p>

            <div className="bg-accent/5 rounded-xl p-6 border border-accent/10 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Visibility Compounds</h3>
              <p className="text-muted-foreground mb-4">Each appearance:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Strengthens your brand</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Increases inbound traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Builds SEO visibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Creates customer leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Attracts investors/partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Leads to more invitations</span>
                </div>
              </div>
            </div>
            
            <p className="text-foreground font-medium">
              Interviews create an ever-expanding web of visibility that continues generating attention long after the recording.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* How Interviews Bring Customers */}
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
                How Interviews Bring Customers Directly to Your Business
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Standard practice on podcasts, YouTube, and Spotify includes adding guest links in the episode description. This is a major advantage for entrepreneurs.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {["Website", "Product page", "Landing pages", "Offers", "Books", "Newsletter", "Social media", "Founder story", "Videos or funnels", "Contact forms"].map((item) => (
                <div key={item} className="bg-green-500/5 rounded-lg p-3 border border-green-500/10 text-center">
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-foreground font-medium text-lg">
              This is one of the most organic and authentic ways to convert listeners into customers. When someone hears your story and your expertise, they click. They buy. They follow. They share. They return.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* YouTube Channel */}
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
                Why Entrepreneurs Should Consider a YouTube Channel
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              You don't have to be a creator — but having a place to direct listeners is a strategic advantage. A YouTube channel increases trust, centralizes your content, shows your personality, builds community, creates passive lead generation, and positions you as a leader in your space.
            </p>

            <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/10">
              <h3 className="text-lg font-semibold text-foreground mb-4">You Only Need Basic Production</h3>
              <p className="text-muted-foreground mb-4">High quality ≠ complicated. You need:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> A good microphone</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> A sharp camera or modern smartphone</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Clean lighting</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Simple editing</li>
              </ul>
              <p className="text-foreground font-medium mt-4">
                YouTube is one of the most powerful business tools available, and Guest Booker Pro funnels traffic directly into it.
              </p>
            </div>
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
          <Card className="p-8 md:p-12 bg-primary/5 border-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                New Opportunities for Entrepreneurs
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Guest appearances often create opportunities you didn't even know existed:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {["Customer acquisition", "Investor interest", "JV partnerships", "Collaborations", "Mastermind invitations", "Paid speaking", "New distribution channels", "Press coverage", "Affiliate relationships", "B2B inquiries", "Consulting clients", "Strategic advisors"].map((item) => (
                <div key={item} className="bg-background rounded-lg p-4 border border-border">
                  <p className="text-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-foreground font-medium text-lg">
              Many entrepreneurs discover that one good interview can change the trajectory of their brand. Guest Booker Pro ensures those interviews happen consistently.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* What This Means */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12 bg-accent/5 border-accent/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What Guest Booker Pro Means for Your Business
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              You no longer have to fight the algorithm or rely on luck. We place you in front of people who want your knowledge, your experience, your product, your story, your leadership.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6">
              Interviews transform the way your audience sees you: not as a marketer, but as a founder with real insight and real value.
            </p>
            
            <p className="text-xl text-accent font-bold">
              If you build — we amplify.
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
            Ready to Build Your Brand Authority?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join entrepreneurs who are growing their businesses through strategic guest appearances and authentic visibility.
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
