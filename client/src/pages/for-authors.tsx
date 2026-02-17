import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight, Mic, Target, Users, Zap, GraduationCap, BookOpen, Radio, TrendingUp, Link2, Youtube, Briefcase, Star, Sprout, PenTool, Feather, Video, Crown, Sparkles, BarChart3, MessageCircle } from "lucide-react";
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

export default function ForAuthors() {
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
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">For Authors</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Grow Your Readership,</span>
            <br />
            <span className="text-primary">Increase Book Sales</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            The biggest challenge most authors face is not writing the book — it's helping readers discover it.
            Guest Booker Pro places authors in long-form conversations where stories, ideas, and craft actually matter.
          </p>
        </motion.div>
      </section>

      {/* Why Authors Get Lost */}
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
                Why Authors Get Lost in Modern Media
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              In an online landscape dominated by influencers and fast-moving trends, authors often feel overshadowed, unheard, and disconnected from readers.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">The Algorithm Rewards:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Short, flashy content</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Viral moments</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Quick reactions</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> Surface-level entertainment</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">But Books Reward:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Depth and imagination</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Nuance and storytelling</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Long-term engagement</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Thoughtful exploration</li>
                </ul>
                <p className="text-foreground font-medium mt-4">
                  Podcasts, YouTube, and Spotify interviews are one of the few places where long-form thinking, storytelling, and personal insight not only survive — they thrive.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* What We Do for Authors */}
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
                What Guest Booker Pro Does for Authors
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              We help authors of all genres reach new readers by aligning them with podcast hosts and channels whose audiences connect with their work.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <Radio className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Smart Matching</h3>
                <p className="text-muted-foreground text-sm">We match you with shows based on your genre, themes in your writing, your personal story, research or world-building, professional background, and your message and audience.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Outreach Done For You</h3>
                <p className="text-muted-foreground text-sm">We reach out to hosts on your behalf, presenting your book, story, background, talking points, and unique insights. No cold outreach, no guesswork — only targeted, professional connection.</p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Long-Form Conversations That Sell</h3>
                <p className="text-muted-foreground text-sm">When readers hear you talk about your creative process, characters, research, and themes, they feel a connection. That connection leads directly to book sales and long-term fans.</p>
              </div>
            </div>
            
            <p className="text-foreground font-medium text-lg mt-8">
              Whether you write fiction, nonfiction, memoir, academic work, fantasy, or spirituality, there is a community waiting for you.
            </p>
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
              Authors often believe they need huge audiences to make an impact. <strong className="text-foreground">This is not true.</strong> Most successful authors grow through small, highly engaged groups of readers who discover them through interviews, podcasts, and conversations.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-accent/5 rounded-xl p-6 border border-accent/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Initial Audience May Be:</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-background rounded-lg px-4 py-2 border border-border">
                    <p className="text-2xl font-bold text-accent">200</p>
                    <p className="text-sm text-muted-foreground">listeners</p>
                  </div>
                  <div className="bg-background rounded-lg px-4 py-2 border border-border">
                    <p className="text-2xl font-bold text-accent">500</p>
                    <p className="text-sm text-muted-foreground">listeners</p>
                  </div>
                  <div className="bg-background rounded-lg px-4 py-2 border border-border">
                    <p className="text-2xl font-bold text-accent">1,000</p>
                    <p className="text-sm text-muted-foreground">listeners</p>
                  </div>
                </div>
                <p className="text-foreground font-medium mt-4">These numbers are more than enough to spark momentum.</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-accent">✔</span> Interviews Have Long-Tail Growth
                </h3>
                <p className="text-muted-foreground">
                  Unlike social media posts, podcast episodes stay live forever. YouTube and Spotify conversations are evergreen. People discover your interview months or years later, and new readers continually find you.
                </p>
                <p className="text-foreground font-medium">Every appearance adds to your long-term visibility.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* How Interviews Drive Book Sales */}
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
                How Interviews Drive Book Sales and Readership
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Every podcast, YouTube channel, and Spotify show includes guest links in the video or episode description. This means each appearance can promote:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {["Your book(s)", "Amazon page", "Website", "YouTube channel", "Substack/blog", "Social media", "Author newsletter", "Upcoming releases", "Patreon/membership", "Signed editions"].map((item) => (
                <div key={item} className="bg-green-500/5 rounded-lg p-3 border border-green-500/10 text-center">
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-foreground font-medium text-lg">
              Readers who enjoy your interview click these links — and often become lifelong supporters. This is one of the most organic and effective sales channels an author can have.
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
                Why Authors Should Consider a YouTube Channel
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              You don't need to be a "YouTuber." But having a place for readers to find you after hearing an interview dramatically increases your growth.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Can Post:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Short behind-the-scenes videos</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Research insights</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Book readings</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Writing tips</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Lore/world-building content</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Q&A sessions</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> Updates on future releases</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Only Need Basic Production</h3>
                <p className="text-muted-foreground mb-4">Just:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> A good microphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> A clean camera or smartphone</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Simple lighting</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Basic editing</li>
                </ul>
                <p className="text-foreground font-medium mt-4">
                  Readers come for authenticity, voice, and insight — not Hollywood production.
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
              Publishing a book is just the beginning — visibility expands what becomes possible. Authors who appear on the right shows often experience:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {["Increased sales", "Foreign rights inquiries", "Audiobook opportunities", "Event invitations", "Convention appearances", "Collaboration offers", "Teaching opportunities", "Agent interest", "Invitations for future interviews", "Stronger fan communities"].map((item) => (
                <div key={item} className="bg-background rounded-lg p-4 border border-border">
                  <p className="text-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-foreground font-medium text-lg">
              Book careers grow through connection — interviews create those connections.
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
                <Feather className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What Guest Booker Pro Means for Your Writing Career
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Don't Need:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> A massive marketing budget</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> A huge social media following</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-destructive" /> To fight the algorithm</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">You Only Need:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Your voice</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Your story</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Your passion</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Your writing</li>
                </ul>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-4">
              We help ensure people can hear that voice and find your work. Guest Booker Pro brings authors into the conversations where readers discover new favorites and fall in love with new worlds.
            </p>
            
            <p className="text-xl text-accent font-bold">
              If you write it — we help the world find it.
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
            Your Book Deserves More Readers
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop hoping readers will find you. Start actively connecting with audiences who are ready to discover your work.
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
