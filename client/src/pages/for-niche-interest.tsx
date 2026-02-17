import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, Mic, Target, Users, Zap, GraduationCap, BookOpen, Radio, Heart, Compass, TrendingUp, Link2, Youtube, Briefcase, Star, Sprout, Video, Crown, Sparkles, BarChart3, MessageCircle } from "lucide-react";
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

export default function ForNicheInterest() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm border border-accent/20 mb-6">
            <Mic className="w-4 h-4 text-accent" />
            <span className="text-foreground font-medium">For Niche Experts & Specialized Creators</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Your Unique Knowledge</span>
            <br />
            <span className="text-accent">Deserves to Be Heard</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            The internet is full of noise — yet some of the most interesting, original, and valuable ideas live in niche communities.
            Guest Booker Pro lifts niche creators into the spotlight without forcing you to become an influencer or chase trends.
          </p>
        </motion.div>
      </section>

      {/* Why Niche Interests Struggle */}
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
                Why Niche Interests Struggle to Be Seen
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Your content is incredibly valuable to the right people — but the algorithm doesn't know how to find those people.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Mainstream Platforms Reward:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Broad appeal</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Controversial takes</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Quick, bite-sized content</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Trend participation</li>
                </ul>
              </div>
              
              <div className="bg-accent/5 rounded-xl p-6 border border-accent/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">But Niche Knowledge Is:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> Detailed and specific</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> Long-form and thoughtful</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> Community-driven</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-accent" /> Built on deep expertise</li>
                </ul>
                <p className="text-foreground font-medium mt-4">The algorithm isn't built for that — but podcast and interview audiences are.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What We Do for Niche Experts */}
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
                What Guest Booker Pro Does for Niche Experts
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              We help you find (and be found by) shows that value your specific expertise — whether your niche is:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
              {["Folklore", "Martial arts", "Video game design", "Traditional crafts", "Paranormal research", "History", "Alternative health", "Mythology", "Linguistics", "Technology micro-fields", "Cultural practices", "Specialized healing"].map((topic) => (
                <div key={topic} className="bg-accent/5 rounded-lg p-3 border border-accent/10 text-center">
                  <p className="text-sm text-foreground">{topic}</p>
                </div>
              ))}
            </div>
            
            <p className="text-foreground font-medium text-lg mb-8">
              If your topic matters deeply to some people — we find those people.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Radio className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Smart Matching</h3>
                <p className="text-muted-foreground text-sm">We locate podcasts, YouTube channels, and Spotify shows where your topic — no matter how unique — fits naturally.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Zap className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Automatic Outreach</h3>
                <p className="text-muted-foreground text-sm">No guessing who to contact, no awkward cold emails. We introduce you professionally to hosts who want niche guests.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Target className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Right Audience, Not Massive Audience</h3>
                <p className="text-muted-foreground text-sm">You don't need a massive audience — you need the right audience. We deliver you to communities already interested in your subject.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <BookOpen className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Long-Form Conversations</h3>
                <p className="text-muted-foreground text-sm">Niche topics thrive in interviews where you can explain context, history, and personal experience.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Users className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Collaborations</h3>
                <p className="text-muted-foreground text-sm">Guest appearances on larger channels, product sales, commissions, private clients, brand partnerships.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Event Invitations</h3>
                <p className="text-muted-foreground text-sm">Online courses, memberships, Patreon growth — public visibility opens doors niche communities rarely get elsewhere.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Audience Size */}
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
                Audience Size: What to Expect
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Niche creators often worry that their interest is "too small" to attract listeners. In reality: <strong className="text-foreground">niche audiences are some of the most loyal and engaged communities in the world.</strong>
            </p>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 mb-8">
              <p className="text-lg text-foreground font-medium">
                A podcast with 300 listeners focused on your topic is far more valuable than a platform with 10,000 random viewers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">✔</span> Small Audiences, High Engagement
                </h3>
                <p className="text-muted-foreground">
                  Your first interviews might reach 200, 500, or 1,000 people — but these are people who care about your subject. They share episodes, join communities, buy products, and follow your work closely.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">✔</span> Compound Growth
                </h3>
                <p className="text-muted-foreground">
                  Each appearance increases discoverability, community interest, channel traffic, search visibility, and social following. Niche creators grow by depth, not by virality.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* How Interviews Bring People to Your Work */}
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
                How Interviews Bring People to Your Work
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Just like with academics, niche guests receive links in the video or podcast description — a standard practice that drives real traffic. This turns one appearance into:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Long-term followers</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Product sales</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Commissions</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Student enrollments</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Booked sessions</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Repeat customers</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Patreon support</p>
              </div>
              <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                <p className="text-foreground font-medium">Email subscribers</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg">
              For niche creators, a link in the description can be transformative.
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
                Why You Should Consider Your Own YouTube Channel
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              You don't need to be a full-time YouTuber, but having a place for people to find you is extremely powerful. After hearing you on a podcast, people look you up — they want your deeper content, tutorials, explanations, and stories.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Minimal Production Is Enough</h3>
                <p className="text-muted-foreground mb-4">All you need is:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> A decent microphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> A good camera or modern smartphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Simple lighting</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Clean editing</li>
                </ul>
              </div>
              
              <div className="bg-accent/5 rounded-xl p-6 border border-accent/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Ideas Carry the Content</h3>
                <p className="text-muted-foreground mb-4">
                  Your ideas and personality will carry the content — not Hollywood-level production.
                </p>
                <p className="text-foreground font-medium">
                  Guest Booker Pro sends listeners to your channel. Your channel keeps them in your world.
                </p>
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
          <Card className="p-8 md:p-12 bg-accent/5 border-accent/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                New Opportunities That Grow From Visibility
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Once you begin appearing on shows, niche creators often experience:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Collaborations with other creators</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Invitations to speak or teach</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Growth in online communities</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Patreon or membership support</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Increased commissions or clients</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Crossovers into related niches</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Book or course opportunities</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium">Brand partnerships</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg">
              Many creators discover that their niche is far bigger than they realized — it just needed a doorway into the public.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* What This Means for You */}
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
                What This Means for You
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              If you have a passion, a specialized skill, or a deep, unusual interest, Guest Booker Pro is your amplification tool.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Do NOT Need:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Viral content</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> A massive following</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> To chase trends</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> To change who you are</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Only Need:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Your knowledge</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Your authenticity</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Your enthusiasm for your niche</li>
                </ul>
              </div>
            </div>
            
            <p className="text-xl text-primary font-bold">
              Your niche has value. Your voice has weight. Your work has a place. We make sure people can find it.
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
            Your Expertise Deserves an Audience
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop wondering if anyone cares about your niche. Start connecting with the communities that are already passionate about it.
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
