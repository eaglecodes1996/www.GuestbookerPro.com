import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, Mic, Target, Users, Zap, GraduationCap, BookOpen, Radio, TrendingUp, Link2, Youtube, Briefcase, Star, Sprout, DollarSign, Lightbulb, PieChart, Video, Crown, Sparkles, BarChart3, MessageCircle } from "lucide-react";
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

export default function ForStartupFounders() {
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
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">For Startup Founders</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Build Credibility,</span>
            <br />
            <span className="text-primary">Accelerate Traction</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Investors, customers, partners, and early adopters are all searching for founders who can clearly articulate their vision, their product, and the problem they're solving.
            Guest Booker Pro helps you get that visibility — without relying on virality, influencer status, or expensive PR agencies.
          </p>
        </motion.div>
      </section>

      {/* Why Founders Need Visibility */}
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
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why Startup Founders Need Visibility Early
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              A founder's reputation often matters as much as the product itself.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">In Reality:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Investors fund founders they trust</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Customers buy from founders they understand</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Talent joins founders they believe in</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Partners work with founders they recognize</li>
                </ul>
              </div>
              
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">The Paradox:</h3>
                <p className="text-muted-foreground mb-4">
                  You need attention to grow, but you need growth to get attention.
                </p>
                <p className="text-foreground font-medium">
                  Guest Booker Pro breaks that cycle by placing you in front of audiences who care about innovation, product design, entrepreneurship, and market insight.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What We Do for Startup Founders */}
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
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What Guest Booker Pro Does for Startup Founders
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              We put founders on podcasts, YouTube shows, and interview channels where startup stories thrive — the places where early traction, brand trust, and thought leadership are built.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Lightbulb className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Founder Story Positioning</h3>
                <p className="text-muted-foreground text-sm">We help you communicate your mission, product vision, the problem you're solving, your market insights, and the journey behind the company. This storytelling is essential for customer trust and investor confidence.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Target className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Smart Matching With Relevant Platforms</h3>
                <p className="text-muted-foreground text-sm">You are matched with hosts whose audiences include startup enthusiasts, early adopters, potential customers, angel investors, founders, operators, and people actively looking for new tools and ideas.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Zap className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Automated Professional Outreach</h3>
                <p className="text-muted-foreground text-sm">We handle the outreach for you, sending high-quality pitches that highlight your traction, innovation, and differentiation.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Users className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Credibility Beyond Advertising</h3>
                <p className="text-muted-foreground text-sm">Podcasts and interviews build trust in a way ads cannot. People hear your voice, understand your reasoning, and relate to your story. Authentic visibility turns founders into leaders.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Audience Size & Early Traction */}
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
                Audience Size & Early Traction
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Founders often worry that their company is "too early" or "too small" to attract attention. In truth: <strong className="text-foreground">small, targeted audiences are perfect for startups.</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground mb-4">Your initial appearances may reach 300–1,000 engaged listeners, niche communities of innovators, enthusiasts looking for new tools, and early adopters who influence broader trends.</p>
                <p className="text-muted-foreground">These early supporters often become users, join your waiting list, share your story, introduce you to investors, and recommend your product.</p>
              </div>
              
              <div className="bg-green-500/5 rounded-xl p-6 border border-green-500/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Visibility Compounds Fast</h3>
                <p className="text-muted-foreground mb-4">Each appearance increases:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-500" /> Website traffic & sign-ups</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-500" /> Preorders & brand recognition</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-500" /> Inbound investor interest</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-500" /> Invitation to larger shows</li>
                </ul>
                <p className="text-foreground font-medium mt-4">
                  This is how founders bootstrap their public presence without spending money on PR.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* How Interviews Turn Listeners Into Users */}
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
                <Link2 className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                How Interviews Turn Listeners Into Users & Backers
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Hosts typically include guest links in every episode description. This is a major advantage for founders.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {["Product landing pages", "Waitlist forms", "Demo sign-ups", "Fundraising updates", "Pitch decks", "Social media", "Founder updates", "Community links", "YouTube channel", "Newsletter"].map((item) => (
                <div key={item} className="bg-primary/5 rounded-lg p-3 border border-primary/10 text-center">
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-foreground font-medium text-lg">
              Listeners become users because they have heard your logic, understood the problem, connected with the story, and developed trust in you. Interviews convert far better than ads because they build a relationship first.
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
                Founders Benefit Greatly From a YouTube Channel
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Every founder should consider a simple YouTube channel — not for influencer status, but as a credibility anchor. When people search for you after hearing an interview, they should find short explanations of your product, updates on your journey, your thinking about the market, and your personality and leadership style.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">This Gives Investors & Customers Confidence That:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> You understand your space</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> You communicate well</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> You have a real vision</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> You are trustworthy</li>
                </ul>
              </div>
              
              <div className="bg-accent/5 rounded-xl p-6 border border-accent/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Only Need Basic Production</h3>
                <p className="text-muted-foreground mb-4">Good founder videos need:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> A clean microphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> A clear camera or smartphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> Basic lighting</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> Simple editing</li>
                </ul>
                <p className="text-foreground font-medium mt-4">Your ideas matter more than cinema-quality visuals.</p>
              </div>
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
                New Opportunities Created Through Visibility
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Founders who appear on the right podcasts often experience:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {["Inbound investor interest", "Accelerator invitations", "Networking introductions", "Partnership opportunities", "Media coverage", "Early adopter growth", "B2B leads", "Talent recruiting", "Conference invitations", "Increased market trust"].map((item) => (
                <div key={item} className="bg-background rounded-lg p-4 border border-border">
                  <p className="text-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-xl text-primary font-bold">
              Visibility creates leverage. Leverage creates momentum. Momentum creates growth.
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
                What Guest Booker Pro Means for Your Startup
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              You no longer need to hope the right people discover you. We put your voice, your mission, and your product in front of audiences who want innovation, solutions, leadership, authenticity, and founders with real insight.
            </p>
            
            <div className="bg-background rounded-xl p-6 border border-border mb-6">
              <p className="text-lg text-foreground font-medium">
                You speak. They listen. Your startup grows.
              </p>
            </div>
            
            <p className="text-xl text-accent font-bold">
              If you are building something meaningful — we amplify it.
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
            Ready to Accelerate Your Startup?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join founders who are building credibility and attracting investors through strategic guest appearances.
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
