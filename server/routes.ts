import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema, insertShowSchema, insertEmailTemplateSchema, insertOutreachCampaignSchema, insertChannelStatsSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { google } from "googleapis";
import OpenAI from "openai";
import crypto from "crypto";
import session from "express-session";
import * as XLSX from "xlsx";
import  { createRequire } from "module";
const require = createRequire(import.meta.url);
const pgSession = require("connect-pg-simple")(session);
import { requireAuth, optionalAuth } from "./auth";
import { verifyRecaptcha } from "./recaptcha";
import { db } from "./db";
import { users, profiles, shows, researchRequests, apiUsage, processedPaymentSessions, systemTemplates, affiliates, referredUsers, commissions, affiliatePayouts, passwordResetTokens, pricingPlans } from "@shared/schema";
import { sendEmail, sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail as sendWelcomeEmailNew, sendInvoiceEmail } from "./email";
import { eq, and, sql, desc } from "drizzle-orm";
import bcrypt from "bcrypt";
import Stripe from "stripe";


// Initialize Stripe (use testing keys in development/testing)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY or TESTING_STRIPE_SECRET_KEY');
}
console.log('Initializing Stripe with key starting with:', stripeSecretKey.substring(0, 7));
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-11-20",
});

// Initialize OpenAI (works on Vercel/local + optional Replit AI integrations)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL, // only set if you actually use Replit integrations
});

// Initialize YouTube API
async function getAccessToken() {
  if (!process.env.YOUTUBE_API_KEY) {
  throw new Error('YOUTUBE_API_KEY not set in environment variables');
  }
  return process.env.YOUTUBE_API_KEY;
}

async function getYoutubeClient() {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("YOUTUBE_API_KEY missing from .env file");
  }
  return google.youtube({ version: "v3", auth: process.env.YOUTUBE_API_KEY });
}

// Fetch channel statistics from YouTube Data API
async function fetchChannelStats(channelId: string) {
  const youtube = await getYoutubeClient();
  
  try {
    // Get channel statistics
    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [channelId],
    });
    
    const channelData = channelResponse.data.items?.[0];
    if (!channelData || !channelData.statistics) {
      throw new Error("Channel not found or has no statistics");
    }
    
    const stats = channelData.statistics;
    const subscribers = parseInt(stats.subscriberCount || "0");
    const totalViews = parseInt(stats.viewCount || "0");
    const videoCount = parseInt(stats.videoCount || "0");
    const avgViewsPerVideo = videoCount > 0 ? Math.floor(totalViews / videoCount) : 0;
    
    // Get recent videos to calculate engagement (last 10 videos)
    const videoSearchResponse = await youtube.search.list({
      part: ["id"],
      channelId,
      type: ["video"],
      maxResults: 10,
      order: "date",
    });
    
    const videoIds = videoSearchResponse.data.items
      ?.map((item: any) => item.id?.videoId)
      .filter(Boolean) || [];
    
    let totalLikes = 0;
    let totalComments = 0;
    let sampledVideoViews = 0;
    
    if (videoIds.length > 0) {
      const videoStatsResponse = await youtube.videos.list({
        part: ["statistics"],
        id: videoIds,
      });
      
      videoStatsResponse.data.items?.forEach((video: any) => {
        const stats = video.statistics;
        totalLikes += parseInt(stats?.likeCount || "0");
        totalComments += parseInt(stats?.commentCount || "0");
        sampledVideoViews += parseInt(stats?.viewCount || "0");
      });
    }
    
    // Calculate engagement rate (basis points: likes + comments per sampled video views * 10000)
    const engagementRate = sampledVideoViews > 0 
      ? Math.floor(((totalLikes + totalComments) / sampledVideoViews) * 10000) 
      : 0;
    
    return {
      subscribers,
      totalViews,
      videoCount,
      avgViewsPerVideo,
      totalLikes,
      totalComments,
      engagementRate,
    };
  } catch (error: any) {
    console.error("Error fetching channel stats:", error.message);
    throw error;
  }
}

// Initialize Gmail API (using connectors)
async function getGmailClient() {
  // For now, return null - will be implemented via connectors API  
  return null;
}

// Send welcome email to new users
async function sendWelcomeEmail(user: { id: any; username: string; email: string | null; subscriptionTier: string; deepResearchQuota?: number }) {
  try {
    if (!user.email) {
      console.log("No email provided for welcome email");
      return;
    }

    // Get the welcome email template
    const template = await db.select().from(systemTemplates)
      .where(and(
        eq(systemTemplates.templateType, 'welcome_email'),
        eq(systemTemplates.isActive, true)
      ))
      .limit(1);

    if (!template.length) {
      console.log("Welcome email template not found or inactive");
      return;
    }

    const tierName = user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1);
    // Use the actual quota from user record, fallback to tier-based defaults only if not provided
    const searches = user.deepResearchQuota ?? 5;

    // Replace template tokens
    const subject = template[0].subject
      .replace(/\{\{username\}\}/g, user.username)
      .replace(/\{\{email\}\}/g, user.email)
      .replace(/\{\{tier\}\}/g, tierName)
      .replace(/\{\{searches\}\}/g, searches.toString());

    const body = template[0].body
      .replace(/\{\{username\}\}/g, user.username)
      .replace(/\{\{email\}\}/g, user.email)
      .replace(/\{\{tier\}\}/g, tierName)
      .replace(/\{\{searches\}\}/g, searches.toString());

    // Try to get Gmail client
    const gmail = await getGmailClient();
    
    if (gmail) {
      // Send via Gmail
      const rawMessage = [
        `To: ${user.email}`,
        `Subject: ${subject}`,
        'Content-Type: text/plain; charset=utf-8',
        '',
        body
      ].join('\r\n');

      const encodedMessage = Buffer.from(rawMessage)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      await (gmail as any).users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });

      console.log(`Welcome email sent to ${user.email}`);
    } else {
      // Log the email content for debugging (Gmail not connected)
      console.log(`[WELCOME EMAIL QUEUED] To: ${user.email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${body.substring(0, 200)}...`);
    }
  } catch (error: any) {
    console.error("Failed to send welcome email:", error.message);
    // Don't throw - welcome email failure shouldn't block signup
  }
}

// Podcast Index API helpers
function generatePodcastIndexAuthHeaders() {
  const apiKey = process.env.PODCAST_INDEX_API_KEY;
  const apiSecret = process.env.PODCAST_INDEX_API_SECRET;
  
  if (!apiKey || !apiSecret) {
    throw new Error('Podcast Index API credentials not configured');
  }
  
  const timestamp = Math.floor(Date.now() / 1000);
  const authString = apiKey + apiSecret + timestamp.toString();
  const authHash = crypto.createHash('sha1').update(authString).digest('hex');
  
  return {
    'User-Agent': 'PodcastGuestBooking/1.0',
    'X-Auth-Date': timestamp.toString(),
    'X-Auth-Key': apiKey,
    'Authorization': authHash
  };
}

async function searchPodcastsByTerm(searchTerm: string, maxResults: number = 20): Promise<any[]> {
  const headers = generatePodcastIndexAuthHeaders();
  const url = `https://api.podcastindex.org/api/1.0/search/byterm?q=${encodeURIComponent(searchTerm)}&max=${maxResults}`;
  
  try {
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Podcast Index API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.feeds || [];
  } catch (error: any) {
    console.error('Podcast Index search error:', error);
    throw error;
  }
}

// Security: Validate URL to prevent SSRF attacks
function isValidPublicUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    
    // Only allow HTTP and HTTPS
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    
    // Block local/internal addresses
    const hostname = parsed.hostname.toLowerCase();
    const blockedPatterns = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '10.',
      '172.16.',
      '172.17.',
      '172.18.',
      '172.19.',
      '172.20.',
      '172.21.',
      '172.22.',
      '172.23.',
      '172.24.',
      '172.25.',
      '172.26.',
      '172.27.',
      '172.28.',
      '172.29.',
      '172.30.',
      '172.31.',
      '192.168.',
      'metadata.google.internal',
      '169.254.',
    ];
    
    for (const pattern of blockedPatterns) {
      if (hostname.includes(pattern)) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
}

// Web scraping + GPT extraction for contact emails (with SSRF protection)
async function extractContactEmail(websiteUrl: string): Promise<string | null> {
  if (!websiteUrl) return null;
  
  // Security: Validate URL to prevent SSRF
  if (!isValidPublicUrl(websiteUrl)) {
    console.warn(`⚠️ Blocked potentially unsafe URL: ${websiteUrl}`);
    return null;
  }
  
  try {
    // Fetch the website with strict timeout
    const response = await fetch(websiteUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PodcastGuestBooking/1.0)'
      },
      signal: AbortSignal.timeout(8000), // 8 second timeout
      redirect: 'follow',
    });
    
    if (!response.ok || response.status >= 400) return null;
    
    // Limit response size to prevent DoS
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1000000) { // 1MB limit
      console.warn(`⚠️ Page too large: ${websiteUrl}`);
      return null;
    }
    
    const html = await response.text();
    
    // Limit HTML size processed by GPT
    const htmlSnippet = html.slice(0, 5000);
    
    // Use GPT to extract contact email from HTML
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a contact information extraction assistant. Extract the primary contact email from website HTML. Look for contact pages, about sections, footer areas, and mailto links. Return ONLY the email address or 'null' if none found."
        },
        {
          role: "user",
          content: `Extract the primary contact email from this website HTML:\n\n${htmlSnippet}\n\nReturn only the email address or 'null'.`
        }
      ],
      temperature: 0.1,
      max_tokens: 50
    });
    
    const extractedEmail = completion.choices[0]?.message?.content?.trim();
    
    // Validate email format
    if (extractedEmail && extractedEmail !== 'null' && extractedEmail.includes('@') && extractedEmail.includes('.')) {
      // Additional validation: basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(extractedEmail)) {
        return extractedEmail;
      }
    }
    
    return null;
  } catch (error: any) {
    // Suppress errors for timeouts and network issues (common for scraping)
    if (!error.message?.includes('aborted')) {
      console.error(`Error extracting email from ${websiteUrl}:`, error.message);
    }
    return null;
  }
}

// Simple concurrency limiter for async operations
async function limitConcurrency<T>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<any>
): Promise<any[]> {
  const results: any[] = [];
  const executing: Promise<any>[] = [];
  
  for (const item of items) {
    const promise = fn(item).then(result => {
      results.push(result);
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  await Promise.all(executing);
  return results;
}

// Helper function to use GPT to extract contact email from YouTube channel data
async function extractEmailWithGPT(channelData: any, recentVideos: any[]): Promise<string | null> {
  try {
    const channelTitle = channelData.snippet?.title || "Unknown";
    const channelDescription = channelData.snippet?.description || "";
    const customUrl = channelData.snippet?.customUrl || "";
    
    // Compile research packet from available data
    const videoDescriptions = recentVideos.slice(0, 5).map((v: any) => v.snippet?.description || "").join("\n\n");
    
    const researchPacket = `
Channel: ${channelTitle}
Custom URL: ${customUrl}
Channel Description: ${channelDescription}

Recent Video Descriptions:
${videoDescriptions}
`.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an email extraction specialist. Your task is to find valid contact email addresses from YouTube channel data.

RULES:
1. Only return emails you can see verbatim in the provided text
2. Quote the exact source snippet where you found the email
3. Validate email format (must have @ and valid domain)
4. Do NOT hallucinate or guess emails
5. Business/contact emails are preferred over generic ones
6. If no email found, return "NONE"

Return format:
EMAIL: [email or NONE]
SOURCE: [exact quote from text or N/A]
CONFIDENCE: [HIGH/MEDIUM/LOW]`
        },
        {
          role: "user",
          content: researchPacket
        }
      ],
      temperature: 0,
      max_tokens: 300
    });

    const response = completion.choices[0]?.message?.content || "";
    console.log(`     🤖 GPT Response:\n${response}`);
    
    // Parse GPT response
    const emailMatch = response.match(/EMAIL:\s*([^\s\n]+)/i);
    const confidenceMatch = response.match(/CONFIDENCE:\s*(HIGH|MEDIUM|LOW)/i);
    
    if (emailMatch && emailMatch[1] !== "NONE") {
      const email = emailMatch[1].toLowerCase();
      const confidence = confidenceMatch?.[1] || "UNKNOWN";
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        console.log(`     ✅ GPT found email: ${email} (confidence: ${confidence})`);
        return email;
      } else {
        console.log(`     ⚠️  Invalid email format from GPT: ${email}`);
        return null;
      }
    }
    
    console.log(`     ❌ No email found by GPT`);
    return null;
  } catch (error: any) {
    console.error(`     ❌ GPT extraction error:`, error.message);
    return null;
  }
}

// Analyze YouTube channel's recent videos for guest interview patterns and engagement
async function analyzeChannelForGuests(youtube: any, channelId: string): Promise<{ guestScore: number; averageViews: number | null }> {
  try {
    // Fetch recent uploads
    const uploadsResponse = await youtube.search.list({
      part: ['snippet'],
      channelId: channelId,
      order: 'date',
      type: ['video'],
      maxResults: 10, // Analyze last 10 videos
    });
    
    const videos = uploadsResponse.data.items || [];
    if (videos.length === 0) return { guestScore: 0, averageViews: null };
    
    // Extract video IDs to fetch statistics
    const videoIds = videos.map((v: any) => v.id.videoId).filter(Boolean);
    
    // Fetch video statistics (view counts)
    let totalViews = 0;
    let viewCount = 0;
    
    if (videoIds.length > 0) {
      try {
        const statsResponse = await youtube.videos.list({
          part: ['statistics'],
          id: videoIds,
        });
        
        const videoStats = statsResponse.data.items || [];
        for (const video of videoStats) {
          const views = parseInt(video.statistics?.viewCount || '0', 10);
          if (views > 0) {
            totalViews += views;
            viewCount++;
          }
        }
      } catch (statsError: any) {
        console.error(`Error fetching video statistics for channel ${channelId}:`, statsError.message);
      }
    }
    
    const averageViews = viewCount > 0 ? Math.round(totalViews / viewCount) : null;
    
    let guestIndicatorCount = 0;
    const guestKeywords = [
      'interview',
      'guest',
      'conversation with',
      'talks with',
      'featuring',
      'sits down with',
      'chat with',
      'discussion with',
      'ep.',
      'episode',
      'ft.',
      'feat.'
    ];
    
    for (const video of videos) {
      const title = video.snippet?.title?.toLowerCase() || '';
      const description = video.snippet?.description?.toLowerCase() || '';
      const combined = title + ' ' + description;
      
      // Check if video title/description indicates guest interview
      for (const keyword of guestKeywords) {
        if (combined.includes(keyword)) {
          guestIndicatorCount++;
          break;
        }
      }
    }
    
    // Score: (videos with guest indicators / total videos) * 100
    const guestScore = Math.round((guestIndicatorCount / videos.length) * 100);
    return { 
      guestScore: Math.max(guestScore, 20), // Minimum 20 if any videos found
      averageViews 
    };
  } catch (error: any) {
    console.error(`Error analyzing channel ${channelId}:`, error.message);
    return { guestScore: 50, averageViews: null }; // Default moderate score on error
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // SECURITY: Hard fail in production if no secret is set
  if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing in production environment!");
  }
  // Session middleware (requires trust proxy to be set for Railway/production)
  app.use(
    session({
      store: new pgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
        tableName: 'session', // Explicit table name
      }),
      secret: process.env.SESSION_SECRET || "podcast-guest-booking-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "lax", // Allows cookies on same-site navigation
        path: '/', // Cookie available for entire site
      },
      proxy: true, // Trust the reverse proxy (Railway, Heroku, etc.)
    })
  );

  // Authentication routes
  app.post("/api/auth/signup", verifyRecaptcha, async (req, res) => {
    try {
      const { username, password, email } = insertUserSchema.parse(req.body);
      
      // Email is now REQUIRED for signup
      if (!email) {
        res.status(400).json({ error: "Email is required for registration" });
        return;
      }
      
      // Check if username already exists
      const existingUsername = await db.query.users.findFirst({
        where: eq(users.username, username),
      });
      
      if (existingUsername) {
        res.status(400).json({ error: "Username already taken" });
        return;
      }
      
      // Check if email already exists
      const existingEmail = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      
      if (existingEmail) {
        res.status(400).json({ error: "Email already registered" });
        return;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Generate email verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      // Create user with default Basic plan (email NOT verified yet)
      const [newUser] = await db.insert(users).values({
        username,
        password: hashedPassword,
        email,
        emailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
        subscriptionTier: "basic",
        maxProfiles: 1,
        maxDiscoveryPerMonth: 500,
        maxEmailsPerMonth: 100,
      }).returning();
      
      // Send verification email (non-blocking)
      sendVerificationEmail(email, username, verificationToken)
        .then(sent => {
          if (sent) {
            console.log(`✅ Verification email sent to ${email}`);
          } else {
            console.error(`⚠️  Verification email failed for ${email}`);
          }
        })
        .catch(err => console.error("Verification email error:", err));
      
      // DO NOT log the user in yet - they must verify email first
      res.json({ 
        success: true,
        message: "Account created! Please check your email to verify your account.",
        email: email,
        requiresVerification: true
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle database constraint violations
      if (error.code === '23505') {
        if (error.constraint === 'users_email_unique') {
          res.status(400).json({ error: "Email already registered" });
          return;
        }
        if (error.constraint === 'users_username_unique') {
          res.status(400).json({ error: "Username already taken" });
          return;
        }
      }
      
      res.status(400).json({ error: "Invalid signup data" });
    }
  });

  app.post("/api/auth/login", verifyRecaptcha, async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await db.query.users.findFirst({
        where: eq(users.username, username),
      });
      
      if (!user) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }
      
      // Compare hashed password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }
      
      // Check if email is verified (unless it's the admin or unlimited tier)
      if (user.email && !user.emailVerified && user.subscriptionTier !== 'unlimited') {
        res.status(403).json({ 
          error: "Email not verified",
          message: "Please verify your email address before logging in. Check your inbox for the verification link.",
          email: user.email,
          requiresVerification: true
        });
        return;
      }
      
      req.session.userId = user.id;
      
      // Save session before responding (important for Railway/production)
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          subscriptionTier: user.subscriptionTier,
          maxProfiles: user.maxProfiles,
          emailVerified: user.emailVerified,
        } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Logout failed" });
        return;
      }
      res.json({ success: true });
    });
  });

  // Diagnostic endpoint to check email configuration
  app.get("/api/test-email-config", (req, res) => {
    const hasResendKey = Boolean(process.env.RESEND_API_KEY);
    const resendKeyPreview = process.env.RESEND_API_KEY 
      ? `${process.env.RESEND_API_KEY.substring(0, 8)}...${process.env.RESEND_API_KEY.slice(-4)}`
      : 'NOT SET';
    
    res.json({
      emailConfigured: hasResendKey,
      resendApiKey: resendKeyPreview,
      fromEmail: process.env.FROM_EMAIL || 'NOT SET (will use onboarding@resend.dev)',
      appUrl: process.env.APP_URL || 'NOT SET (will use localhost)',
      nodeEnv: process.env.NODE_ENV || 'NOT SET',
      status: hasResendKey ? '✅ Ready to send emails' : '❌ Resend not configured - emails will only log to console'
    });
  });

  app.get("/api/auth/me", optionalAuth, (req, res) => {
    if (!req.user) {
      res.json({ user: null });
      return;
    }
    
    // Calculate next reset date
    const lastReset = req.user.lastResetAt ? new Date(req.user.lastResetAt) : new Date(0);
    const nextReset = new Date(lastReset.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    res.json({ 
      user: { 
        id: req.user.id, 
        username: req.user.username,
        subscriptionTier: req.user.subscriptionTier,
        maxProfiles: req.user.maxProfiles,
        maxDiscoveryPerMonth: req.user.maxDiscoveryPerMonth,
        discoveryUsedThisMonth: req.user.discoveryUsedThisMonth,
        nextResetDate: nextReset.toISOString(),
      } 
    });
  });

  // Password Management Routes
  
  // Change Password (for logged-in users)
  app.post("/api/auth/change-password", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        res.status(400).json({ error: "Current password and new password are required" });
        return;
      }
      
      const user = req.user!;
      
      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Current password is incorrect" });
        return;
      }
      
      // Validate new password strength
      try {
        z.string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/[0-9]/, "Password must contain at least one number")
          .parse(newPassword);
          
        // Check against common weak passwords
        const commonPasswords = ['password', 'admin', '12345678', 'qwerty', 'letmein'];
        if (commonPasswords.some(weak => newPassword.toLowerCase().includes(weak))) {
          res.status(400).json({ error: "Password is too common or weak" });
          return;
        }
      } catch (error: any) {
        res.status(400).json({ error: error.errors?.[0]?.message || "Invalid password format" });
        return;
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update password
      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, user.id));
      
      res.json({ success: true, message: "Password successfully changed" });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ error: "Failed to change password" });
    }
  });
  
  // Forgot Password (request reset token via email)
  app.post("/api/auth/forgot-password", verifyRecaptcha, async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }
      
      // Find user by email
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      
      // Always return success (don't reveal if email exists for security)
      if (!user) {
        res.json({ 
          success: true, 
          message: "If an account exists with that email, a password reset link has been sent" 
        });
        return;
      }
      
      // Generate secure random token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
      
      // Store token in database
      await db.insert(passwordResetTokens).values({
        userId: user.id,
        token,
        expiresAt,
      });
      
      // Send reset email via Resend
      await sendPasswordResetEmail(email, user.username, token);
      
      res.json({ 
        success: true, 
        message: "If an account exists with that email, a password reset link has been sent"
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "Failed to process password reset request" });
    }
  });
  
  // Reset Password (verify token and set new password)
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      if (!token || !newPassword) {
        res.status(400).json({ error: "Token and new password are required" });
        return;
      }
      
      // Find valid token
      const resetToken = await db.query.passwordResetTokens.findFirst({
        where: and(
          eq(passwordResetTokens.token, token),
          eq(passwordResetTokens.used, false)
        ),
      });
      
      if (!resetToken) {
        res.status(400).json({ error: "Invalid or expired reset token" });
        return;
      }
      
      // Check if token is expired
      if (new Date() > new Date(resetToken.expiresAt)) {
        res.status(400).json({ error: "Reset token has expired" });
        return;
      }
      
      // Validate new password strength
      try {
        z.string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/[0-9]/, "Password must contain at least one number")
          .parse(newPassword);
          
        // Check against common weak passwords
        const commonPasswords = ['password', 'admin', '12345678', 'qwerty', 'letmein'];
        if (commonPasswords.some(weak => newPassword.toLowerCase().includes(weak))) {
          res.status(400).json({ error: "Password is too common or weak" });
          return;
        }
      } catch (error: any) {
        res.status(400).json({ error: error.errors?.[0]?.message || "Invalid password format" });
        return;
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update password AND verify email (if they can access the email, it's verified!)
      await db
        .update(users)
        .set({ 
          password: hashedPassword,
          emailVerified: true, // Reset password via email proves email ownership
          emailVerificationToken: null,
          emailVerificationExpires: null
        })
        .where(eq(users.id, resetToken.userId));
      
      // Mark token as used
      await db
        .update(passwordResetTokens)
        .set({ used: true })
        .where(eq(passwordResetTokens.id, resetToken.id));
      
      res.json({ success: true, message: "Password successfully reset and email verified. You can now log in!" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });

  // Email Verification Routes
  
  // Verify Email (click link from email)
  app.post("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        res.status(400).json({ error: "Verification token is required" });
        return;
      }
      
      // Find user with this verification token
      const user = await db.query.users.findFirst({
        where: eq(users.emailVerificationToken, token),
      });
      
      if (!user) {
        res.status(400).json({ error: "Invalid verification token" });
        return;
      }
      
      // Check if token has expired
      if (user.emailVerificationExpires && new Date() > new Date(user.emailVerificationExpires)) {
        res.status(400).json({ 
          error: "Verification token has expired",
          message: "Please request a new verification email",
          expired: true
        });
        return;
      }
      
      // Check if already verified
      if (user.emailVerified) {
        res.json({ 
          success: true, 
          message: "Email already verified! You can now log in.",
          alreadyVerified: true
        });
        return;
      }
      
      // Mark email as verified and clear verification token
      await db
        .update(users)
        .set({ 
          emailVerified: true,
          emailVerificationToken: null,
          emailVerificationExpires: null
        })
        .where(eq(users.id, user.id));
      
      // Send welcome email after verification
      if (user.email) {
        sendWelcomeEmailNew(user.email, user.username, user.subscriptionTier)
          .catch(err => console.error("Welcome email error:", err));
      }
      
      res.json({ 
        success: true, 
        message: "Email verified successfully! You can now log in.",
        username: user.username
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ error: "Failed to verify email" });
    }
  });
  
  // Resend Verification Email
  app.post("/api/auth/resend-verification", verifyRecaptcha, async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }
      
      // Find user by email
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      
      // Always return success for security (don't reveal if email exists)
      if (!user) {
        res.json({ 
          success: true, 
          message: "If an account exists with that email, a verification link has been sent" 
        });
        return;
      }
      
      // Check if already verified
      if (user.emailVerified) {
        res.json({ 
          success: true, 
          message: "Email is already verified! You can log in now.",
          alreadyVerified: true
        });
        return;
      }
      
      // Generate new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      // Update user with new token
      await db
        .update(users)
        .set({ 
          emailVerificationToken: verificationToken,
          emailVerificationExpires: verificationExpires
        })
        .where(eq(users.id, user.id));
      
      // Send verification email
      await sendVerificationEmail(email, user.username, verificationToken);
      
      res.json({ 
        success: true, 
        message: "Verification email sent! Please check your inbox." 
      });
    } catch (error) {
      console.error("Resend verification error:", error);
      res.status(500).json({ error: "Failed to resend verification email" });
    }
  });

  // Stripe Checkout Routes (Subscriptions)
  app.post("/api/stripe/create-checkout-session", requireAuth, async (req, res) => {
    try {
      const { tier } = req.body;
      const user = req.user!;
      
      // Fetch pricing from database
      const pricingPlan = await db.query.pricingPlans.findFirst({
        where: and(
          eq(pricingPlans.tier, tier),
          eq(pricingPlans.isActive, true)
        ),
      });

      if (!pricingPlan) {
        res.status(400).json({ error: "Invalid or inactive subscription tier" });
        return;
      }

      // Create or retrieve Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          metadata: {
            userId: user.id,
            username: user.username,
          }
        });
        customerId = customer.id;
      }

      // Create Checkout Session for subscription
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${pricingPlan.displayName} Plan`,
                description: `${pricingPlan.maxProfiles} profile(s), ${pricingPlan.maxDiscoveryPerMonth} monthly discoveries`,
              },
              recurring: {
                interval: 'month',
              },
              unit_amount: pricingPlan.monthlyPriceUSD,
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin || 'http://localhost:5000'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'http://localhost:5000'}/pricing`,
        metadata: {
          userId: user.id,
          tier: tier,
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Stripe Checkout for New Signups (Payment Before Account Creation)
  app.post("/api/stripe/create-signup-checkout", async (req, res) => {
    try {
      const { tier, billing, affiliateId } = req.body;
      
      // Fetch pricing from database
      const pricingPlan = await db.query.pricingPlans.findFirst({
        where: and(
          eq(pricingPlans.tier, tier),
          eq(pricingPlans.isActive, true)
        ),
      });

      if (!pricingPlan) {
        res.status(400).json({ error: "Invalid or inactive subscription tier" });
        return;
      }

      const isYearly = billing === 'yearly';
      const priceInCents = isYearly ? pricingPlan.yearlyPriceUSD : pricingPlan.monthlyPriceUSD;

      // Create Checkout Session for new signup
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Guest Booker Pro - ${pricingPlan.displayName} Plan (${isYearly ? 'Yearly' : 'Monthly'})`,
                description: `${pricingPlan.maxProfiles} profile(s), ${pricingPlan.maxDiscoveryPerMonth} monthly discoveries`,
              },
              recurring: {
                interval: isYearly ? 'year' : 'month',
              },
              unit_amount: priceInCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin || 'http://localhost:5000'}/complete-signup?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'http://localhost:5000'}/pricing`,
        metadata: {
          tier: tier,
          flow: 'signup',
          billing: isYearly ? 'yearly' : 'monthly',
          affiliateId: affiliateId || '',
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe signup checkout error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Complete signup after successful payment
  app.post("/api/auth/complete-signup", async (req, res) => {
    try {
      const { sessionId, username, email, password } = req.body;

      if (!sessionId || !username || !email || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      // Verify the Stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session.payment_status !== 'paid') {
        res.status(400).json({ error: "Payment not completed" });
        return;
      }

      if (session.metadata?.flow !== 'signup') {
        res.status(400).json({ error: "Invalid session type" });
        return;
      }

      // Check if session has already been used
      const existingUserByStripe = await db.select().from(users)
        .where(eq(users.stripeCustomerId, session.customer as string))
        .limit(1);
      
      if (existingUserByStripe.length > 0) {
        res.status(400).json({ error: "This payment session has already been used to create an account" });
        return;
      }

      // Check for existing username or email
      const existingUser = await db.select().from(users)
        .where(sql`${users.username} = ${username} OR ${users.email} = ${email}`)
        .limit(1);

      if (existingUser.length > 0) {
        if (existingUser[0].username === username) {
          res.status(400).json({ error: "Username already taken" });
        } else {
          res.status(400).json({ error: "Email already registered" });
        }
        return;
      }

      const tier = session.metadata?.tier || 'basic';
      const affiliateReferralId = session.metadata?.affiliateId || null;
      
      // Fetch limits from pricing plan database
      const pricingPlan = await db.query.pricingPlans.findFirst({
        where: eq(pricingPlans.tier, tier),
      });
      
      if (!pricingPlan) {
        res.status(400).json({ error: "Invalid tier configuration" });
        return;
      }

      const limits = {
        maxProfiles: pricingPlan.maxProfiles,
        maxDiscovery: pricingPlan.maxDiscoveryPerMonth,
        deepResearchQuota: pricingPlan.deepResearchQuota,
        maxEmails: pricingPlan.maxEmailsPerMonth,
        monthlyPriceInCents: pricingPlan.monthlyPriceUSD,
      };
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Get the subscription ID
      const subscription = session.subscription 
        ? await stripe.subscriptions.retrieve(session.subscription as string)
        : null;

      // Check for affiliate referral
      let affiliateRecord = null;
      if (affiliateReferralId) {
        const [foundAffiliate] = await db.select().from(affiliates).where(eq(affiliates.referralId, affiliateReferralId));
        if (foundAffiliate) {
          affiliateRecord = foundAffiliate;
        }
      }

      // Create the user with subscription details
      const [newUser] = await db.insert(users).values({
        username,
        email,
        password: hashedPassword,
        subscriptionTier: tier,
        maxProfiles: limits.maxProfiles,
        maxDiscoveryPerMonth: limits.maxDiscovery,
        maxEmailsPerMonth: limits.maxEmails,
        deepResearchQuota: limits.deepResearchQuota,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscription?.id || null,
        referredByAffiliateId: affiliateRecord?.id || null,
      }).returning();

      // If user was referred by an affiliate, create the referredUsers record and update affiliate stats
      if (affiliateRecord) {
        try {
          // Create referredUsers record
          await db.insert(referredUsers).values({
            userId: newUser.id,
            affiliateId: affiliateRecord.id,
            subscriptionStatus: 'active',
            monthlyPrice: limits.monthlyPriceInCents,
            commissionRate: affiliateRecord.commissionRate,
          });

          // Update affiliate signup count and active subscribers
          await db.update(affiliates)
            .set({ 
              signups: sql`${affiliates.signups} + 1`,
              activeSubscribers: sql`${affiliates.activeSubscribers} + 1`,
            })
            .where(eq(affiliates.id, affiliateRecord.id));

          // Calculate and create first commission
          const commissionAmount = Math.floor(limits.monthlyPriceInCents * (affiliateRecord.commissionRate / 100));
          const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
          
          await db.insert(commissions).values({
            affiliateId: affiliateRecord.id,
            userId: newUser.id,
            amount: commissionAmount,
            month: currentMonth,
            status: 'pending',
          });

          // Update affiliate pending balance and total earned
          await db.update(affiliates)
            .set({ 
              pendingBalance: sql`${affiliates.pendingBalance} + ${commissionAmount}`,
              totalCommissionEarned: sql`${affiliates.totalCommissionEarned} + ${commissionAmount}`,
            })
            .where(eq(affiliates.id, affiliateRecord.id));

          console.log(`Affiliate commission created: $${(commissionAmount / 100).toFixed(2)} for affiliate ${affiliateRecord.referralId}`);
        } catch (affiliateError) {
          console.error("Error processing affiliate referral:", affiliateError);
          // Don't fail the signup if affiliate tracking fails
        }
      }

      // Update Stripe customer metadata with user ID
      if (session.customer) {
        await stripe.customers.update(session.customer as string, {
          metadata: {
            userId: newUser.id,
            username: newUser.username,
          }
        });
      }

      // Update subscription metadata
      if (subscription) {
        await stripe.subscriptions.update(subscription.id, {
          metadata: {
            userId: newUser.id,
          }
        });
      }

      // Send welcome email (non-blocking)
      sendWelcomeEmail({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        subscriptionTier: newUser.subscriptionTier,
        deepResearchQuota: newUser.deepResearchQuota || limits.deepResearchQuota
      }).catch(err => console.error("Welcome email error:", err));

      // Log the user in
      (req as any).login(newUser, (err: any) => {
        if (err) {
          console.error("Login error after signup:", err);
          res.status(500).json({ error: "Account created but login failed" });
          return;
        }

        res.json({ 
          success: true, 
          user: { 
            id: newUser.id, 
            username: newUser.username, 
            subscriptionTier: newUser.subscriptionTier 
          },
          tier,
          subscription: subscription ? {
            status: subscription.status,
            currentPeriodEnd: (subscription as any).current_period_end,
          } : null,
        });
      });
    } catch (error: any) {
      console.error("Complete signup error:", error);
      res.status(500).json({ error: "Failed to complete signup" });
    }
  });

  // Verify signup session (pre-account creation check)
  app.get("/api/stripe/verify-signup-session/:sessionId", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
      
      // Check if it's a valid signup session
      if (session.metadata?.flow !== 'signup') {
        res.json({ valid: false, error: "Invalid session type" });
        return;
      }

      if (session.payment_status !== 'paid') {
        res.json({ valid: false, error: "Payment not completed" });
        return;
      }

      // Check if session has already been used
      const existingUser = await db.select().from(users)
        .where(eq(users.stripeCustomerId, session.customer as string))
        .limit(1);
      
      if (existingUser.length > 0) {
        res.json({ valid: false, error: "This payment session has already been used" });
        return;
      }

      res.json({ 
        valid: true, 
        tier: session.metadata?.tier || 'basic',
      });
    } catch (error: any) {
      console.error("Session verification error:", error);
      res.json({ valid: false, error: "Failed to verify session" });
    }
  });

  // Verify checkout session and update user subscription
  app.get("/api/stripe/verify-session/:sessionId", requireAuth, async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
      
      // SECURITY: Verify session belongs to the current user
      const sessionUserId = session.metadata?.userId;
      if (!sessionUserId || sessionUserId !== String(req.user!.id)) {
        console.error(`Session verification failed: Session userId ${sessionUserId} does not match authenticated user ${req.user!.id}`);
        res.status(403).json({ error: "Unauthorized: This session does not belong to you" });
        return;
      }
      
      if (session.payment_status === 'paid' && session.subscription) {
        const tier = session.metadata?.tier || 'basic';
        
        // Fetch limits from pricing plan database
        const pricingPlan = await db.query.pricingPlans.findFirst({
          where: eq(pricingPlans.tier, tier),
        });
        
        if (!pricingPlan) {
          console.error(`Invalid tier in session metadata: ${tier}`);
          res.status(400).json({ error: "Invalid subscription tier" });
          return;
        }
        
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        // Update user with Stripe info and new tier
        await storage.updateUserStripeInfo(req.user!.id, session.customer as string, subscription.id);
        
        // Update subscription tier and limits
        const limits = {
          maxProfiles: pricingPlan.maxProfiles,
          maxDiscovery: pricingPlan.maxDiscoveryPerMonth,
          deepResearchQuota: pricingPlan.deepResearchQuota,
          maxEmails: pricingPlan.maxEmailsPerMonth,
        };
        await db.update(users)
          .set({
            subscriptionTier: tier,
            maxProfiles: limits.maxProfiles,
            maxDiscoveryPerMonth: limits.maxDiscovery,
            maxEmailsPerMonth: limits.maxEmails,
            deepResearchQuota: limits.deepResearchQuota,
          })
          .where(eq(users.id, req.user!.id));
        
        res.json({ 
          success: true, 
          tier,
          subscription: {
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
          }
        });
      } else {
        res.status(400).json({ error: "Payment not completed" });
      }
    } catch (error: any) {
      console.error("Session verification error:", error);
      res.status(500).json({ error: "Failed to verify session" });
    }
  });

  // Stripe Webhook Handler for subscription events
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    if (!sig) {
      res.status(400).send('Missing signature');
      return;
    }

    // Note: For webhooks to work in production, you need to:
    // 1. Set up a webhook endpoint in Stripe Dashboard
    // 2. Add STRIPE_WEBHOOK_SECRET to your environment
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.warn("STRIPE_WEBHOOK_SECRET not configured - webhooks will not be verified");
      res.status(400).send('Webhook secret not configured');
      return;
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle subscription events
    try {
      switch (event.type) {
        case 'customer.subscription.deleted':
        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          const userId = subscription.metadata?.userId;
          
          if (userId) {
            if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
              // Downgrade to basic plan
              await db.update(users)
                .set({
                  subscriptionTier: 'basic',
                  maxProfiles: 1,
                  maxDiscoveryPerMonth: 500,
                  deepResearchQuota: 5,
                  stripeSubscriptionId: null,
                })
                .where(eq(users.id, userId));
            }
          }
          break;
        }

        case 'invoice.payment_succeeded': {
          const invoice = event.data.object as Stripe.Invoice;
          
          // Get customer and subscription details
          const customerId = invoice.customer as string;
          const subscriptionId = invoice.subscription as string;
          
          if (!customerId) break;
          
          try {
            // Find user by Stripe customer ID
            const user = await db.query.users.findFirst({
              where: eq(users.stripeCustomerId, customerId),
            });
            
            if (!user || !user.email) {
              console.warn(`User not found for customer ${customerId} or email missing`);
              break;
            }
            
            // Get subscription details if available
            let billingPeriod = 'Monthly';
            let nextBillingDate = 'N/A';
            
            if (subscriptionId) {
              const subscription = await stripe.subscriptions.retrieve(subscriptionId);
              const interval = subscription.items.data[0]?.price?.recurring?.interval;
              billingPeriod = interval === 'year' ? 'Annual' : 'Monthly';
              nextBillingDate = new Date(subscription.current_period_end * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
            }
            
            // Format amount (convert from cents to dollars)
            const amount = (invoice.amount_paid / 100).toFixed(2);
            
            // Get payment method details
            const paymentMethod = invoice.charge 
              ? await stripe.charges.retrieve(invoice.charge as string).then(charge => {
                  const pm = charge.payment_method_details;
                  if (pm?.card) {
                    return `${pm.card.brand.toUpperCase()} •••• ${pm.card.last4}`;
                  }
                  return 'Card';
                })
              : 'Card';
            
            // Format invoice date
            const invoiceDate = new Date(invoice.created * 1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            
            // Capitalize tier name
            const tierName = user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1);
            
            // Send invoice email (non-blocking)
            sendInvoiceEmail({
              email: user.email,
              username: user.username,
              tier: tierName,
              amount,
              invoiceNumber: invoice.number || invoice.id,
              invoiceDate,
              paymentMethod,
              billingPeriod,
              nextBillingDate,
              customerId,
            }).catch(err => {
              console.error('Failed to send invoice email:', err);
            });
            
            console.log(`✅ Invoice email queued for ${user.email} - Invoice: ${invoice.number || invoice.id}`);
          } catch (emailError: any) {
            console.error('Error processing invoice email:', emailError);
            // Don't fail the webhook if email fails
          }
          break;
        }
      }
      
      res.json({ received: true });
    } catch (error: any) {
      console.error("Webhook handler error:", error);
      res.status(500).json({ error: "Webhook handler failed" });
    }
  });

  // POST /api/stripe/purchase-research - Purchase additional deep research credits (one-time payment)
  app.post("/api/stripe/purchase-research", requireAuth, async (req, res) => {
    try {
      const { quantity } = req.body; // Number of deep research searches to purchase
      
      if (!quantity || quantity < 1 || quantity > 100) {
        res.status(400).json({ error: "Quantity must be between 1 and 100" });
        return;
      }

      const pricePerSearch = 1000; // $10.00 per deep research search
      const totalAmount = pricePerSearch * quantity;
      
      const user = req.user!;

      // Create or retrieve Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          metadata: {
            userId: user.id,
            username: user.username,
          }
        });
        customerId = customer.id;
        
        // Update user with Stripe customer ID
        await db.update(users)
          .set({ stripeCustomerId: customerId })
          .where(eq(users.id, user.id));
      }

      // Create Checkout Session for one-time payment
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'payment', // One-time payment, not subscription
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Deep Research Searches`,
                description: `${quantity} AI Deep Research search${quantity > 1 ? 'es' : ''}`,
              },
              unit_amount: pricePerSearch,
            },
            quantity: quantity,
          },
        ],
        metadata: {
          type: 'deep_research_searches',
          userId: user.id,
          quantity: quantity.toString(),
          unitAmount: pricePerSearch.toString(),
        },
        success_url: `${req.headers.origin || 'http://localhost:5000'}/research/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'http://localhost:5000'}/pricing`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Research search purchase error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // GET /api/stripe/verify-research-purchase/:sessionId - Verify research search purchase
  app.get("/api/stripe/verify-research-purchase/:sessionId", requireAuth, async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      
      // SECURITY: Check if session was already processed (prevent replay attacks)
      const existingSession = await db.query.processedPaymentSessions.findFirst({
        where: eq(processedPaymentSessions.sessionId, sessionId),
      });
      
      if (existingSession) {
        console.warn(`Session ${sessionId} already processed for user ${existingSession.userId}`);
        res.status(400).json({ error: "This purchase has already been processed" });
        return;
      }
      
      // Retrieve full session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
      });
      
      // SECURITY: Verify session belongs to the current user via metadata (first check)
      const sessionUserId = session.metadata?.userId;
      if (!sessionUserId || sessionUserId !== String(req.user!.id)) {
        console.error(`Session verification failed: Session userId ${sessionUserId} does not match authenticated user ${req.user!.id}`);
        res.status(403).json({ error: "Unauthorized: This session does not belong to you" });
        return;
      }
      
      // SECURITY: Verify session customer matches authenticated user's Stripe customer
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });
      
      if (!currentUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      
      if (session.customer !== currentUser.stripeCustomerId) {
        console.error(`Customer mismatch: session.customer ${session.customer} !== user.stripeCustomerId ${currentUser.stripeCustomerId}`);
        res.status(403).json({ error: "Unauthorized: Session customer mismatch" });
        return;
      }
      
      // SECURITY: Validate payment status
      if (session.payment_status !== 'paid') {
        res.status(400).json({ error: "Payment not completed" });
        return;
      }
      
      // SECURITY: Validate session type from metadata (advisory check)
      if (session.metadata?.type !== 'deep_research_searches') {
        res.status(400).json({ error: "Invalid session type" });
        return;
      }
      
      // SECURITY: Validate currency
      if (session.currency !== 'usd') {
        res.status(400).json({ error: "Invalid currency" });
        return;
      }
      
      // SECURITY: Get quantity and unit amount from IMMUTABLE line_items (not metadata)
      const lineItems = session.line_items?.data || [];
      if (lineItems.length !== 1) {
        res.status(400).json({ error: "Invalid line items count" });
        return;
      }
      
      const lineItem = lineItems[0];
      const quantity = lineItem.quantity || 0;
      const unitAmount = lineItem.price?.unit_amount || 0;
      
      // Validate quantity is within acceptable range
      if (quantity < 1 || quantity > 100) {
        res.status(400).json({ error: "Invalid quantity" });
        return;
      }
      
      // SECURITY: Validate unit amount is exactly $10.00 (1000 cents)
      if (unitAmount !== 1000) {
        console.error(`Unit amount mismatch: expected 1000 cents, got ${unitAmount}`);
        res.status(400).json({ error: "Invalid unit amount" });
        return;
      }
      
      // SECURITY: Validate total amount matches quantity × unit amount
      const expectedTotal = quantity * unitAmount;
      if (lineItem.amount_total !== expectedTotal) {
        console.error(`Amount mismatch: expected ${expectedTotal}, got ${lineItem.amount_total}`);
        res.status(400).json({ error: "Amount verification failed" });
        return;
      }
      
      // All validations passed - add searches to user's quota
      const newQuota = (currentUser.deepResearchQuota || 0) + quantity;
      
      // Update user quota and record processed session in a transaction
      await db.transaction(async (tx) => {
        // Update user's quota
        await tx.update(users)
          .set({ deepResearchQuota: newQuota })
          .where(eq(users.id, req.user!.id));
        
        // Record processed session to prevent replay
        await tx.insert(processedPaymentSessions).values({
          sessionId: sessionId,
          userId: req.user!.id,
          quantity: quantity,
          amount: session.amount_total || 0,
        });
      });
      
      console.log(`Successfully processed research search purchase: ${quantity} searches for user ${req.user!.id}`);
      
      res.json({ 
        success: true, 
        searchesAdded: quantity,
        newQuota: newQuota,
      });
    } catch (error: any) {
      console.error("Research purchase verification error:", error);
      res.status(500).json({ error: "Failed to verify purchase" });
    }
  });

  // Profile routes (protected)
  // Get all profiles
  app.get("/api/profiles", requireAuth, async (req, res) => {
    try {
      const profiles = await storage.getAllProfiles(req.user!.id);
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  });

  // Get active profile (compatibility endpoint)
  app.get("/api/profile", requireAuth, async (req, res) => {
    try {
      const profile = await storage.getActiveProfile(req.user!.id);
      res.json(profile || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Create new profile
  app.post("/api/profiles", requireAuth, async (req, res) => {
    try {
      const data = insertProfileSchema.parse(req.body);
      data.userId = req.user!.id;
      const profile = await storage.createProfile(data);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  // Update profile
  app.patch("/api/profiles/:id", requireAuth, async (req, res) => {
    try {
      const profile = await storage.updateProfile(req.user!.id, req.params.id, req.body);
      if (!profile) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Set active profile
  app.post("/api/profiles/:id/activate", requireAuth, async (req, res) => {
    try {
      const profile = await storage.setActiveProfile(req.user!.id, req.params.id);
      if (!profile) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to activate profile" });
    }
  });

  // Delete profile
  app.delete("/api/profiles/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteProfile(req.user!.id, req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete profile" });
    }
  });

  // AI Keyword Generation
  app.post("/api/keywords/generate", requireAuth, async (req, res) => {
    try {
      const { seedKeyword } = req.body;

      if (!seedKeyword || typeof seedKeyword !== "string" || seedKeyword.trim().length === 0) {
        return res.status(400).json({ error: "Seed keyword is required" });
      }

      const startTime = Date.now();
      
      // Use OpenAI to generate related keywords
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expertise keyword expansion assistant. Given a seed keyword, generate 8-10 highly related keywords or topics that someone with expertise in the seed keyword would likely also know about. Include synonyms, related concepts, subtopics, and adjacent fields. Return a JSON object with a 'keywords' array."
          },
          {
            role: "user",
            content: `Seed keyword: "${seedKeyword}"\n\nGenerate 8-10 related keywords or topics. Return as JSON object: {"keywords": ["keyword1", "keyword2", ...]}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
        response_format: { type: "json_object" },
      });

      const responseText = completion.choices[0]?.message?.content || "{}";
      let keywords: string[] = [];
      
      try {
        const parsed = JSON.parse(responseText);
        keywords = parsed.keywords || [];
        
        if (!Array.isArray(keywords) || keywords.length === 0) {
          console.error("Invalid keywords format:", responseText);
          return res.status(500).json({ error: "Failed to generate keywords" });
        }
        
        console.log(`✨ Parsed ${keywords.length} keywords:`, keywords);
      } catch (e) {
        console.error("Failed to parse OpenAI response:", responseText);
        return res.status(500).json({ error: "Failed to generate keywords" });
      }

      // Track API usage
      const promptTokens = completion.usage?.prompt_tokens || 0;
      const completionTokens = completion.usage?.completion_tokens || 0;
      const totalTokens = completion.usage?.total_tokens || 0;
      
      await trackApiUsage(
        req.user!.id,
        "/api/keywords/generate",
        "gpt-4o-mini",
        promptTokens,
        completionTokens,
        "keyword_generation",
        true
      );

      const duration = Date.now() - startTime;
      console.log(`✨ Generated ${keywords.length} keywords for "${seedKeyword}" in ${duration}ms`);

      const estimatedCost = estimateOpenAICost("gpt-4o-mini", promptTokens, completionTokens);
      
      res.json({ 
        keywords,
        seedKeyword,
        usage: {
          totalTokens,
          estimatedCost
        }
      });
    } catch (error: any) {
      console.error("Keyword generation error:", error);
      
      // Track failed API usage
      await trackApiUsage(
        req.user!.id,
        "/api/keywords/generate",
        "gpt-4o-mini",
        0,
        0,
        "keyword_generation",
        false,
        error.message
      );

      res.status(500).json({ error: "Failed to generate keywords" });
    }
  });

  // Channel Growth Analytics
  app.post("/api/analytics/refresh-channel-stats", requireAuth, async (req, res) => {
    try {
      const profile = await storage.getProfile(req.user!.id);
      
      if (!profile?.userChannelId) {
        return res.status(400).json({ error: "No YouTube channel ID configured. Please add your channel ID in Settings." });
      }

      console.log(`\n📊 Fetching channel stats for: ${profile.userChannelId}`);
      
      // Fetch stats from YouTube API
      const stats = await fetchChannelStats(profile.userChannelId);
      
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Check if stats already exist for today
      const existing = await storage.getChannelStatsByDate(profile.id, today);
      
      if (existing) {
        console.log(`   ⚠️  Stats already recorded for ${today}, skipping...`);
        return res.json({ 
          message: "Stats already recorded for today",
          stats: existing
        });
      }
      
      // Validate and save stats to database
      const statsData = insertChannelStatsSchema.parse({
        profileId: profile.id,
        date: today,
        subscribers: stats.subscribers,
        totalViews: stats.totalViews,
        videoCount: stats.videoCount,
        avgViewsPerVideo: stats.avgViewsPerVideo,
        totalLikes: stats.totalLikes,
        totalComments: stats.totalComments,
        engagementRate: stats.engagementRate,
      });
      
      const channelStats = await storage.createChannelStats(statsData);
      
      console.log(`   ✅ Stats saved:`, {
        subscribers: stats.subscribers.toLocaleString(),
        totalViews: stats.totalViews.toLocaleString(),
        videoCount: stats.videoCount,
        engagementRate: `${(stats.engagementRate / 100).toFixed(2)}%`
      });
      
      res.json({
        message: "Channel stats refreshed successfully",
        stats: channelStats
      });
    } catch (error: any) {
      console.error("Error refreshing channel stats:", error);
      res.status(500).json({ error: error.message || "Failed to refresh channel stats" });
    }
  });

  app.get("/api/analytics/channel-stats", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      const stats = await storage.getAllChannelStats(profile.id);
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch channel stats" });
    }
  });

  app.get("/api/analytics/appearance-impact", requireAuth, async (req, res) => {
    try {
      const impacts = await storage.getAllAppearanceImpact();
      
      // Fetch associated shows for each impact
      const impactsWithShows = await Promise.all(
        impacts.map(async (impact) => {
          const show = await storage.getShowById(req.user!.id, impact.showId);
          return { ...impact, show };
        })
      );
      
      res.json(impactsWithShows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appearance impact data" });
    }
  });

  // Show routes
  app.get("/api/shows", requireAuth, async (req, res) => {
    try {
      const { status, search, limit, offset, sortBy } = req.query;
      
      // Parse pagination parameters with defaults
      const parsedLimit = limit && typeof limit === "string" ? parseInt(limit, 10) : 50;
      const parsedOffset = offset && typeof offset === "string" ? parseInt(offset, 10) : 0;
      // Treat "recent" as undefined (default ordering)
      const parsedSortBy = sortBy && typeof sortBy === "string" && sortBy !== "recent" ? sortBy : undefined;
      
      // Validate pagination parameters
      if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        return res.status(400).json({ error: "Limit must be between 1 and 100" });
      }
      if (isNaN(parsedOffset) || parsedOffset < 0) {
        return res.status(400).json({ error: "Offset must be >= 0" });
      }
      
      // Validate sortBy parameter
      const validSortOptions = ['subscribers', 'averageViews', 'lastEpisodeDate', 'guestScore'];
      if (parsedSortBy && !validSortOptions.includes(parsedSortBy)) {
        return res.status(400).json({ error: `Invalid sortBy value. Must be one of: ${validSortOptions.join(', ')}` });
      }

      let result;

      // Use paginated methods with sorting
      if (search && typeof search === "string") {
        result = await storage.searchShowsPaginated(req.user!.id, search, parsedLimit, parsedOffset, parsedSortBy);
      } else if (status && typeof status === "string" && status !== "all") {
        result = await storage.getShowsByStatusPaginated(req.user!.id, status, parsedLimit, parsedOffset, parsedSortBy);
      } else {
        result = await storage.getAllShowsPaginated(req.user!.id, parsedLimit, parsedOffset, parsedSortBy);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shows" });
    }
  });

  app.get("/api/shows/:id", requireAuth, async (req, res) => {
    try {
      const show = await storage.getShowById(req.user!.id, req.params.id);
      if (!show) {
        res.status(404).json({ error: "Show not found" });
        return;
      }
      res.json(show);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch show" });
    }
  });

  app.post("/api/shows", requireAuth, async (req, res) => {
    try {
      const data = insertShowSchema.parse(req.body);
      // Ensure profileId is set to active profile if not provided
      if (!data.profileId) {
        const activeProfile = await storage.getActiveProfile(req.user!.id);
        if (!activeProfile) {
          return res.status(400).json({ error: "No active profile found. Please create a profile first." });
        }
        data.profileId = activeProfile.id;
      }
      const show = await storage.createShow(req.user!.id, data);
      res.json(show);
    } catch (error) {
      res.status(400).json({ error: "Invalid show data" });
    }
  });

  app.patch("/api/shows/:id", requireAuth, async (req, res) => {
    try {
      const show = await storage.updateShow(req.user!.id, req.params.id, req.body);
      if (!show) {
        res.status(404).json({ error: "Show not found" });
        return;
      }
      res.json(show);
    } catch (error) {
      res.status(500).json({ error: "Failed to update show" });
    }
  });

  app.delete("/api/shows/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteShow(req.user!.id, req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete show" });
    }
  });

  // POST /api/shows/import - Import shows from spreadsheet
  app.post("/api/shows/import", requireAuth, async (req, res) => {
    try {
      // Validate request body
      const importSchema = z.object({
        fileData: z.string().min(1, "File data is required"),
      });
      
      const validatedBody = importSchema.safeParse(req.body);
      if (!validatedBody.success) {
        res.status(400).json({ 
          error: "Invalid request",
          details: validatedBody.error.issues.map(i => i.message).join(", ")
        });
        return;
      }

      let { fileData } = validatedBody.data;

      // Get active profile (storage will use this automatically)
      const profile = await storage.getProfile(req.user!.id);
      if (!profile) {
        res.status(404).json({ error: "No active profile found. Please create a profile first." });
        return;
      }

      // Strip data URL prefix if present (e.g., "data:application/...;base64,")
      const commaIndex = fileData.indexOf(',');
      if (commaIndex !== -1) {
        fileData = fileData.substring(commaIndex + 1);
      }

      // Sanitize base64: trim whitespace and handle URL-safe characters
      fileData = fileData.trim().replace(/-/g, '+').replace(/_/g, '/');

      // Validate and decode base64
      let decodedBuffer;
      try {
        decodedBuffer = Buffer.from(fileData, 'base64');
        // Verify it's valid base64 by checking if re-encoding matches
        if (decodedBuffer.length === 0) {
          throw new Error('Empty file data');
        }
      } catch (decodeError) {
        res.status(400).json({ 
          error: "Invalid file data format. Must be base64 encoded.",
          details: decodeError instanceof Error ? decodeError.message : "Failed to decode base64"
        });
        return;
      }

      // Parse the spreadsheet with error handling
      let workbook;
      try {
        workbook = XLSX.read(decodedBuffer, { type: 'buffer' });
      } catch (parseError) {
        res.status(400).json({ 
          error: "Failed to parse spreadsheet",
          details: parseError instanceof Error ? parseError.message : "Invalid file format"
        });
        return;
      }
      
      // Validate workbook has sheets
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        res.status(400).json({ error: "Spreadsheet contains no sheets" });
        return;
      }
      
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!firstSheet) {
        res.status(400).json({ error: "First sheet is empty or invalid" });
        return;
      }
      
      let rows;
      try {
        rows = XLSX.utils.sheet_to_json(firstSheet) as any[];
      } catch (jsonError) {
        res.status(400).json({ 
          error: "Failed to convert sheet to JSON",
          details: jsonError instanceof Error ? jsonError.message : "Invalid sheet format"
        });
        return;
      }
      
      if (rows.length === 0) {
        res.status(400).json({ error: "Spreadsheet contains no data rows" });
        return;
      }

      const results = {
        total: rows.length,
        successful: 0,
        failed: 0,
        errors: [] as { row: number; error: string; data: any }[],
      };

      // Process each row
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        
        try {
          // Map common column names to our schema with flexible, intelligent mapping
          const showData = {
            profileId: profile.id,
            // Name - try many common variations
            name: row.name || row.Name || row.title || row.Title || row['Show Name'] || row['Channel Name'] || 
                  row['Podcast Name'] || row.show || row.Show || row.channel || row.Channel,
            // Host - various host field names
            host: row.host || row.Host || row.hostname || row['Host Name'] || row.presenter || row.Presenter || 
                  row.creator || row.Creator || row['Hosted By'],
            // Description - bio, about, summary, etc.
            description: row.description || row.Description || row.bio || row.Bio || row.about || row.About || 
                        row.summary || row.Summary || row.overview || row.Overview,
            // Platform - default to youtube
            platform: (row.platform || row.Platform || row.type || row.Type || 'youtube').toLowerCase(),
            // YouTube Channel ID
            youtubeChannelId: row.youtubeChannelId || row['YouTube ID'] || row.channelId || row['Channel ID'],
            // YouTube URL - handle many variations
            youtubeChannelUrl: row.youtubeChannelUrl || row.youtubeUrl || row['YouTube URL'] || row.channelUrl || 
                              row['Channel URL'] || row.youtube || row.YouTube || row.url || row.URL || row.link || row.Link,
            // Podcast RSS URL
            podcastRssUrl: row.podcastRssUrl || row.podcastRss || row['RSS URL'] || row.rss || row.RSS || 
                          row.feed || row.Feed || row['RSS Feed'],
            // Website URL - handle "site" and many variations
            websiteUrl: row.websiteUrl || row.Website || row.website || row.site || row.Site || 
                       row.web || row.Web || row['Web Site'] || row.homepage || row.Homepage,
            // Contact Form URL
            contactFormUrl: row.contactFormUrl || row.contactForm || row['Contact Form'] || row.formUrl || 
                           row['Form URL'] || row.form || row.Form,
            // Contact Email - many variations
            contactEmail: row.contactEmail || row.email || row.Email || row['Contact Email'] || 
                         row.mail || row.Mail || row['E-mail'] || row['E-Mail'] || row.contact || row.Contact,
            // Subscribers - parse as number
            subscribers: row.subscribers || row.Subscribers || row.subs || row.Subs || row.followers || row.Followers ? 
                        parseInt(row.subscribers || row.Subscribers || row.subs || row.Subs || row.followers || row.Followers) : undefined,
            // Episode Count
            episodeCount: row.episodeCount || row['Episode Count'] || row.episodes || row.Episodes ? 
                         parseInt(row.episodeCount || row['Episode Count'] || row.episodes || row.Episodes) : undefined,
            // Status - default to discovered
            status: 'discovered',
            // Notes - comments, remarks, etc.
            notes: row.notes || row.Notes || row.comments || row.Comments || row.remarks || row.Remarks,
          };

          // Validate required fields
          if (!showData.name || showData.name.trim() === '') {
            throw new Error('Missing required field: name');
          }

          // Validate at least one contact method exists
          if (!showData.contactEmail && !showData.youtubeChannelUrl && !showData.podcastRssUrl && !showData.websiteUrl && !showData.contactFormUrl) {
            throw new Error('At least one contact method required (email, URL, contact form, or RSS)');
          }

          // Validate email format if provided
          if (showData.contactEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(showData.contactEmail)) {
              throw new Error(`Invalid email format: ${showData.contactEmail}`);
            }
          }

          // Validate URL formats if provided
          const urlFields = [
            { field: 'youtubeChannelUrl', value: showData.youtubeChannelUrl },
            { field: 'podcastRssUrl', value: showData.podcastRssUrl },
            { field: 'websiteUrl', value: showData.websiteUrl },
            { field: 'contactFormUrl', value: showData.contactFormUrl },
          ];
          
          for (const { field, value } of urlFields) {
            if (value) {
              try {
                new URL(value);
              } catch {
                throw new Error(`Invalid URL format for ${field}: ${value}`);
              }
            }
          }

          // Check for duplicates (returns undefined if no duplicate found)
          const channelId = showData.youtubeChannelId || showData.youtubeChannelUrl;
          if (channelId) {
            const existing = await storage.findDuplicateShow(req.user!.id, channelId);
            if (existing) {
              throw new Error(`Duplicate show already exists`);
            }
          }

          // Create the show - storage will validate profileId belongs to user
          await storage.createShow(req.user!.id, showData);
          results.successful++;
          
        } catch (error) {
          results.failed++;
          results.errors.push({
            row: i + 2, // +2 because row 1 is header and arrays are 0-indexed
            error: error instanceof Error ? error.message : 'Unknown error',
            data: row,
          });
        }
      }

      res.json(results);
    } catch (error) {
      console.error('Error importing shows:', error);
      res.status(500).json({ 
        error: "Failed to import shows",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

 // YouTube Discovery with Progress Streaming (POWERFUL VERSION)
app.post("/api/discover/youtube", requireAuth, async (req, res) => {
  try {
    const { topics } = req.body;
    const requireEmail = req.body?.requireEmail ?? true;
    const profile = await storage.getProfile(req.user!.id);

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      res.status(400).json({ error: "Topics are required" });
      return;
    }

      // Validate OpenAI for email discovery
const hasOpenAI =
  Boolean(process.env.OPENAI_API_KEY) ||
  Boolean(process.env.AI_INTEGRATIONS_OPENAI_API_KEY);

if (!hasOpenAI) {
  res.status(503).json({
    error: "OpenAI integration required for YouTube email discovery. Please configure OPENAI_API_KEY (or AI_INTEGRATIONS_OPENAI_API_KEY).",
  });
  return;
}

      // Setup Server-Sent Events for progress streaming
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      });
      res.flushHeaders();

      const sendProgress = (data: any) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      const youtube = await getYoutubeClient();
      
      const targetCount = profile?.targetShowCount || 20;
      // Increased Search Limit to find more emails
      const maxChannels = 500; 
      
      console.log(`🔍 POWERFUL SEARCH STARTING: ${topics.join(", ")}`);
      
      sendProgress({
        type: 'start',
        message: `Initializing powerful search for ${topics.join(", ")}...`,
        target: targetCount,
        maxChannels,
      });

      const discoveredShows = [];
      const allChannels = new Map();
      const processedChannelIds = new Set();
      
      // 1. Generate 10 Variations per Topic (Logic Upgrade)
      const searchQueries: string[] = [];
      const variations = [
        "podcast", 
        "interview", 
        "show", 
        "channel", 
        "conversations", 
        "talks", 
        "podcast clips", 
        "stories", 
        "insights", 
        "hosted by"
      ];

      for (const topic of topics) {
        for (const suffix of variations) {
           searchQueries.push(`${topic} ${suffix}`);
        }
      }

      // Randomize queries to get diverse results quickly
      searchQueries.sort(() => Math.random() - 0.5);
      
      // 2. Execute Search Loop
      for (const searchQuery of searchQueries) {
        // Stop if we hit the target
        if (discoveredShows.length >= targetCount) break;
        // Stop if we checked too many channels (safety limit)
        if (allChannels.size >= maxChannels) break;

        console.log(` 🔎 Searching: "${searchQuery}"`);
        
        sendProgress({
          type: 'searching',
          message: `Deep Search: "${searchQuery}"`,
          progress: Math.round((processedChannelIds.size / maxChannels) * 100),
          found: discoveredShows.length,
          target: targetCount,
        });
        
        try {
          // Fetch MAX results (50) for better discovery
          const searchResponse = await youtube.search.list({
            part: ["snippet"],
            q: searchQuery,
            type: ["channel"],
            maxResults: 50, 
            relevanceLanguage: "en",
          });

          const channels = searchResponse.data.items || [];
          
          for (const channel of channels) {
            if (channel.id?.channelId && !allChannels.has(channel.id.channelId)) {
              allChannels.set(channel.id.channelId, channel);
            }
          }
        } catch (error) {
          console.error(` ❌ Error searching "${searchQuery}":`, error);
          // Continue to next query instead of crashing
          continue;
        }

        // Process newly found channels immediately
        // (Converted logic to process in batches to keep UI responsive)
        for (const [channelId, channel] of Array.from(allChannels.entries())) {
          if (processedChannelIds.has(channelId)) continue;
          if (discoveredShows.length >= targetCount) break;
          
          processedChannelIds.add(channelId);
          
          // Check duplicates
          const existing = await storage.findDuplicateShow(req.user!.id, channelId);
          if (existing) continue;

          try {
            const channelResponse = await youtube.channels.list({
              part: ["snippet", "statistics", "contentDetails"],
              id: [channelId],
            });

            const channelData = channelResponse.data.items?.[0];
            if (!channelData) continue;

            const subscribers = parseInt(channelData.statistics?.subscriberCount || "0");
            const channelTitle = channelData.snippet?.title || "Unknown";

            // Filter: Min Subscribers
            if (profile?.minSubscribers && subscribers < profile.minSubscribers) continue;

            // Filter: Guest Score (Relaxed slightly for better discovery)
            const { guestScore, averageViews } = await analyzeChannelForGuests(youtube, channelId);
            if (profile?.guestOnlyShows && guestScore < 40) continue; // Lowered threshold to 40

            // Get videos for email extraction
            const videosResponse = await youtube.search.list({
              part: ["snippet"],
              channelId,
              type: ["video"],
              maxResults: 5, // Reduced to 5 to save quota, usually enough
              order: "date",
            });
            const recentVideos = videosResponse.data.items || [];

            sendProgress({
              type: 'email_search',
              message: `Analyzing: ${channelTitle}...`,
              progress: Math.round((processedChannelIds.size / maxChannels) * 100),
              found: discoveredShows.length,
            });
            
            // Extract Email
            const contactEmail = await extractEmailWithGPT(channelData, recentVideos);
            
            if (!contactEmail && requireEmail) continue;

            console.log(` ✅ FOUND MATCH: "${channelTitle}" (${contactEmail || "no email"})`);
            
            const lastVideoDate = recentVideos[0]?.snippet?.publishedAt || null;

            const show = await storage.createShow(req.user!.id, {
              profileId: profile!.id,
              name: channelTitle,
              host: channelData.snippet?.customUrl || null,
              description: channelData.snippet?.description ? channelData.snippet.description.substring(0, 500) : null,
              platform: "youtube",
              youtubeChannelUrl: `https://www.youtube.com/channel/${channelId}`,
              youtubeChannelId: channelId,
              contactEmail,
              subscribers: subscribers,
              guestScore,
              averageViews,
              lastEpisodeDate: lastVideoDate,
            });

            discoveredShows.push(show);
            
            sendProgress({
              type: 'found',
              message: `Added: ${channelTitle}`,
              progress: Math.round((processedChannelIds.size / maxChannels) * 100),
              found: discoveredShows.length,
              target: targetCount,
              show: {
                name: channelTitle,
                email: contactEmail,
                subscribers,
              }
            });
          } catch (error) {
            console.error(`Error processing channel ${channelId}:`, error);
          }
        }
      }
      
      sendProgress({
        type: 'complete',
        message: `Discovery complete! Found ${discoveredShows.length} shows`,
        discovered: discoveredShows.length,
        totalSearched: processedChannelIds.size,
        target: targetCount,
      });

      res.end();
    } catch (error: any) {
      console.error("YouTube discovery error:", error);
      res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
      res.end();
    }
  });

  // Hybrid Discovery (Podcast Index + YouTube + Contact Enrichment)
  app.post("/api/discover/ai", requireAuth, async (req, res) => {
    try {
      const { topics, deepResearch = false, requireEmail = true } = req.body;
      const profile = await storage.getProfile(req.user!.id);

      if (!topics || !Array.isArray(topics) || topics.length === 0) {
        res.status(400).json({ error: "Topics are required" });
        return;
      }

      const minSubscribers = profile?.minSubscribers || 100;
      
      // Validate OpenAI credentials if Deep Research is enabled
if (deepResearch) {
  console.log(`🔬 DEEP RESEARCH MODE ENABLED - Will use GPT to find YouTube channel emails`);

  const hasOpenAI =
    Boolean(process.env.OPENAI_API_KEY) ||
    Boolean(process.env.AI_INTEGRATIONS_OPENAI_API_KEY);

  if (!hasOpenAI) {
    res.status(503).json({
      error:
        "Deep Research unavailable: OpenAI not configured. Please set OPENAI_API_KEY (preferred) or AI_INTEGRATIONS_OPENAI_API_KEY.",
    });
    return;
  }
}

      console.log(`\n🔍 HYBRID DISCOVERY STARTED`);
      console.log(`📋 Topics: ${topics.join(", ")}`);
      console.log(`📊 Min Subscribers: ${minSubscribers}`);
      console.log(`📧 Require Email: ${requireEmail ? 'Yes' : 'No'}`);
      
      const discoveredShows = [];
      const deepResearchStats = {
        attempted: 0,
        successful: 0,
        failed: 0,
        errors: [] as string[],
      };
      
      // Increase limits to discover more shows per topic
      const podcastsPerTopic = 100; // Get 100 podcasts per topic
      const youtubePerTopic = 50; // Get 50 YouTube channels per topic
      
      // PHASE 1: Discover podcasts from Podcast Index
      console.log(`\n📻 PHASE 1: Searching Podcast Index...`);
      for (const topic of topics) {
        try {
          console.log(`\n  🔎 Searching podcasts for: "${topic}"`);
          const podcasts = await searchPodcastsByTerm(topic, podcastsPerTopic);
          console.log(`     Found ${podcasts.length} podcasts`);
          
          for (const podcast of podcasts) {
            // Check for duplicates by RSS URL only
            const existing = await storage.findDuplicateShow(req.user!.id, undefined, podcast.url, undefined);
            if (existing) {
              console.log(`     ⏭️  Skipping "${podcast.title}" - duplicate RSS URL`);
              continue;
            }
            
            // Use email from Podcast Index if available (no scraping during discovery to prevent timeouts/SSRF)
            const contactEmail = podcast.email || null;
            
            // Skip shows without emails if email is required
            if (!contactEmail && requireEmail) {
              console.log(`     ⏭️  Skipping "${podcast.title}" - no email address (email required)`);
              continue;
            }
            
            console.log(`     ✉️  Email from feed: ${contactEmail}`);
            
            const show = await storage.createShow(req.user!.id, {
              profileId: profile!.id,
              name: podcast.title,
              host: podcast.author || null,
              description: podcast.description ? podcast.description.substring(0, 500) : null,
              platform: "podcast",
              podcastRssUrl: podcast.url,
              websiteUrl: podcast.link,
              thumbnailUrl: podcast.image,
              contactEmail: contactEmail,
              episodeCount: podcast.episodeCount || null,
              lastEpisodeDate: podcast.newestItemPubdate ? new Date(podcast.newestItemPubdate * 1000).toISOString() : null,
              guestScore: 65, // Moderate score - would need episode analysis for certainty
              topicMatchScore: 85, // High match from search
              status: "discovered",
            });
            
            discoveredShows.push(show);
            console.log(`     ✅ Added podcast: "${podcast.title}"`);
          }
        } catch (error: any) {
          console.error(`     ❌ Error searching podcasts for "${topic}":`, error.message);
        }
      }
      
      // PHASE 2: Discover YouTube channels
      console.log(`\n📺 PHASE 2: Searching YouTube...`);
      try {
        const youtube = await getYoutubeClient();
        
        for (const topic of topics) {
          console.log(`\n  🔎 Searching YouTube for: "${topic} podcast interview"`);
          const searchResponse = await youtube.search.list({
            part: ["snippet"],
            q: `${topic} podcast interview`,
            type: ["channel"],
            maxResults: youtubePerTopic,
            relevanceLanguage: "en",
          });
          
          const channels = searchResponse.data.items || [];
          console.log(`     Found ${channels.length} channels`);
          
          // Process channels with concurrency limiting when deep research is enabled
          const processChannel = async (channel: any) => {
            try {
              if (!channel.id?.channelId) return null;
              
              // Check for duplicates
              const existing = await storage.findDuplicateShow(req.user!.id, channel.id.channelId, undefined, undefined);
              if (existing) {
                console.log(`     ⏭️  Skipping "${channel.snippet?.title}" - duplicate`);
                return null;
              }
              
              // Fetch full channel details
              const channelDetails = await youtube.channels.list({
                part: ["snippet", "statistics"],
                id: [channel.id.channelId],
              });
              
              const channelData = channelDetails.data.items?.[0];
              if (!channelData) return null;
              
              const subscribers = parseInt(channelData.statistics?.subscriberCount || "0");
              
              // Apply subscriber filter
              if (subscribers < minSubscribers) {
                console.log(`     ⏭️  Skipping "${channelData.snippet?.title}" - ${subscribers} subs < ${minSubscribers} min`);
                return null;
              }
              
              // Analyze recent videos for guest interview patterns and engagement
              console.log(`     🎬 Analyzing recent videos for guest patterns and engagement...`);
              const { guestScore, averageViews } = await analyzeChannelForGuests(youtube, channel.id.channelId);
              console.log(`     📊 Guest score: ${guestScore}/100, Avg views: ${averageViews ? averageViews.toLocaleString() : 'N/A'}`);
              
              // Filter by guest score if enabled
              if (profile?.guestOnlyShows && guestScore < 50) {
                console.log(`     ⏭️  Skipping "${channelData.snippet?.title}" - guest score ${guestScore} too low`);
                return null;
              }
              
              // DEEP RESEARCH: Use GPT to find contact email
              let contactEmail = null;
              if (deepResearch) {
                console.log(`     🔬 Deep Research: Searching for contact email...`);
                deepResearchStats.attempted++;
                
                try {
                  // Get recent videos for this channel
                  const recentVideosResponse = await youtube.search.list({
                    part: ["snippet"],
                    channelId: channel.id.channelId,
                    type: ["video"],
                    maxResults: 5,
                    order: "date",
                  });
                  const recentVideos = recentVideosResponse.data.items || [];
                  
                  // Use GPT to extract email
                  contactEmail = await extractEmailWithGPT(channelData, recentVideos);
                  
                  if (contactEmail) {
                    deepResearchStats.successful++;
                  } else {
                    deepResearchStats.failed++;
                  }
                } catch (error: any) {
                  deepResearchStats.failed++;
                  const errorMsg = error.message?.includes('quota') 
                    ? 'OpenAI API quota exceeded'
                    : error.message?.includes('rate') 
                    ? 'OpenAI API rate limit hit'
                    : 'GPT extraction failed';
                  
                  if (!deepResearchStats.errors.includes(errorMsg)) {
                    deepResearchStats.errors.push(errorMsg);
                  }
                  console.error(`     ❌ Deep Research error:`, error.message);
                }
              }
              
              // Skip if no email found and email is required
              if (!contactEmail && requireEmail) {
                console.log(`     ⏭️  Skipping YouTube channel "${channelData.snippet?.title}" - no email found${deepResearch ? ' (even with deep research)' : ''} (email required)`);
                return null;
              }
              
              // If email not required and no email found, just note it
              if (!contactEmail) {
                console.log(`     ℹ️  Adding YouTube channel "${channelData.snippet?.title}" without email (email not required)`);
              } else {
                console.log(`     ✅ Adding YouTube show: "${channelData.snippet?.title}" with email ${contactEmail}`);
              }
              
              const show = await storage.createShow(req.user!.id, {
                profileId: profile!.id,
                name: channelData.snippet?.title || "Unknown",
                platform: "youtube",
                youtubeChannelId: channel.id.channelId,
                contactEmail,
                subscribers,
                averageViews,
                guestScore,
                topicMatchScore: 90,
                status: "discovered",
              });
              
              return show;
            } catch (error: any) {
              console.error(`     ❌ Error processing channel:`, error.message);
              return null;
            }
          };
          
          // Use concurrency limiting (3 parallel GPT calls max) when deep research is enabled
          const concurrencyLimit = deepResearch ? 3 : channels.length;
          const results = await limitConcurrency(channels, concurrencyLimit, processChannel);
          
          // Add successful results to discoveredShows
          for (const show of results) {
            if (show) {
              discoveredShows.push(show);
            }
          }
        }
      } catch (error: any) {
        console.error(`     ❌ YouTube search error:`, error.message);
      }
      
      const youtubeCount = discoveredShows.filter(s => s.platform === 'youtube').length;
      
      console.log(`\n✅ HYBRID DISCOVERY COMPLETE`);
      console.log(`   Total discovered: ${discoveredShows.length} shows`);
      console.log(`   Podcasts: ${discoveredShows.filter(s => s.platform === 'podcast').length}`);
      console.log(`   YouTube: ${youtubeCount}`);
      console.log(`   With emails: ${discoveredShows.filter(s => s.contactEmail).length}`);
      if (deepResearch) {
        console.log(`   🔬 Deep research stats:`);
        console.log(`      Attempted: ${deepResearchStats.attempted}`);
        console.log(`      Successful: ${deepResearchStats.successful}`);
        console.log(`      Failed: ${deepResearchStats.failed}`);
        if (deepResearchStats.errors.length > 0) {
          console.log(`      Errors: ${deepResearchStats.errors.join(', ')}`);
        }
      }

      const withEmailsCount = discoveredShows.filter(s => s.contactEmail).length;
      const withoutEmailsCount = discoveredShows.length - withEmailsCount;
      
      res.json({
        discovered: discoveredShows.length,
        shows: discoveredShows,
        method: "hybrid",
        deepResearch,
        requireEmail,
        deepResearchStats: deepResearch ? {
          attempted: deepResearchStats.attempted,
          successful: deepResearchStats.successful,
          failed: deepResearchStats.failed,
          errors: deepResearchStats.errors,
        } : undefined,
        breakdown: {
          podcasts: discoveredShows.filter(s => s.platform === 'podcast').length,
          youtube: youtubeCount,
          withEmails: withEmailsCount,
          withoutEmails: withoutEmailsCount,
        }
      });
    } catch (error: any) {
      console.error("Hybrid discovery error:", error);
      res.status(500).json({ error: error.message || "Failed to discover shows" });
    }
  });

  // ChatGPT-Powered Discovery: Generate show suggestions using AI
  app.post("/api/discover/chatgpt", requireAuth, async (req, res) => {
    try {
      const { topics } = req.body;
      const profile = await storage.getProfile(req.user!.id);

      if (!topics || !Array.isArray(topics) || topics.length === 0) {
        res.status(400).json({ error: "Topics are required" });
        return;
      }

      console.log(`\n🤖 CHATGPT DISCOVERY STARTED`);
      console.log(`📋 Topics: ${topics.join(", ")}`);

      // Use ChatGPT to generate show suggestions
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a podcast and YouTube channel discovery expert. Generate a comprehensive list of real, existing podcasts and YouTube channels that feature guest interviews.
            
For each show, provide:
- name: The exact name of the show
- platform: "podcast" or "youtube"
- description: Brief description (100 chars max)
- host: Host name if known
- estimatedSubscribers: Rough subscriber/listener estimate

Focus on shows that:
1. Actively feature guest interviews
2. Are currently active (published in last 6 months)
3. Match the user's expertise topics
4. Have a track record of quality interviews

Return a JSON object with a "shows" field containing an array of show objects.`
          },
          {
            role: "user",
            content: `Generate 50 podcasts and YouTube channels for these topics: ${topics.join(", ")}.

Return a JSON object with a "shows" field containing the array of shows in this exact format:
{
  "shows": [
    {
      "name": "Show Name",
      "platform": "podcast",
      "host": "Host Name",
      "description": "Brief description",
      "estimatedSubscribers": 5000
    }
  ]
}`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const responseText = completion.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error("ChatGPT returned empty response");
      }

      // Parse the JSON response
      let chatgptData;
      try {
        chatgptData = JSON.parse(responseText);
      } catch (error) {
        console.error("Failed to parse ChatGPT response:", responseText);
        throw new Error("Invalid JSON response from ChatGPT");
      }

      // Extract and validate shows array from the response
      const suggestions = Array.isArray(chatgptData?.shows) ? chatgptData.shows : [];
      
      if (suggestions.length === 0) {
        console.warn("⚠️ ChatGPT returned no shows. Response:", JSON.stringify(chatgptData));
      }
      
      console.log(`🤖 ChatGPT suggested ${suggestions.length} shows`);
      console.log(`📊 Breakdown: ${suggestions.filter((s: any) => s.platform === 'podcast').length} podcasts, ${suggestions.filter((s: any) => s.platform === 'youtube').length} YouTube`);

      // Return suggestions as CSV/JSON for user to review and import
      res.json({
        discovered: suggestions.length,
        suggestions: suggestions,
        method: "chatgpt",
        note: "These are AI-generated suggestions. Use the import feature to validate and add them to your shows list."
      });
    } catch (error: any) {
      console.error("ChatGPT discovery error:", error);
      res.status(500).json({ error: error.message || "Failed to generate show suggestions" });
    }
  });

  // =====================================
  // DEEP RESEARCH ENDPOINTS
  // =====================================

  // Utility: Calculate OpenAI cost estimate in cents
  function estimateOpenAICost(model: string, promptTokens: number, completionTokens: number): number {
    // Pricing per 1M tokens (as of 2024, approximate)
    const pricing: Record<string, { input: number; output: number }> = {
      "gpt-4o": { input: 250, output: 1000 }, // $2.50 input, $10 output per 1M tokens
      "gpt-4o-mini": { input: 15, output: 60 }, // $0.15 input, $0.60 output per 1M tokens
      "gpt-4-turbo": { input: 1000, output: 3000 },
      "gpt-4": { input: 3000, output: 6000 },
      "gpt-3.5-turbo": { input: 50, output: 150 },
    };

    const modelPricing = pricing[model] || pricing["gpt-4o"]; // Default to gpt-4o
    const inputCost = (promptTokens / 1000000) * modelPricing.input;
    const outputCost = (completionTokens / 1000000) * modelPricing.output;
    return Math.ceil((inputCost + outputCost) * 100); // Convert to cents
  }

  // Utility: Track API usage in database
  async function trackApiUsage(
    userId: string,
    endpoint: string,
    model: string,
    promptTokens: number,
    completionTokens: number,
    requestType: string,
    success: boolean,
    errorMessage?: string
  ) {
    try {
      const totalTokens = promptTokens + completionTokens;
      const estimatedCost = estimateOpenAICost(model, promptTokens, completionTokens);

      await db.insert(apiUsage).values({
        userId,
        endpoint,
        model,
        promptTokens,
        completionTokens,
        totalTokens,
        estimatedCost,
        requestType,
        success,
        errorMessage,
      });

      console.log(`📊 API Usage tracked: ${requestType} - ${totalTokens} tokens ($${(estimatedCost / 100).toFixed(4)})`);
    } catch (error) {
      console.error("Failed to track API usage:", error);
    }
  }

  // POST /api/research - Structured AI research endpoint
  app.post("/api/research", requireAuth, async (req, res) => {
    try {
      const { query, maxResults = 100 } = req.body;

      if (!query || typeof query !== "string") {
        res.status(400).json({ error: "Query is required" });
        return;
      }

      console.log(`\n🔬 DEEP RESEARCH REQUEST`);
      console.log(`👤 User: ${req.user!.username}`);
      console.log(`📝 Query: ${query}`);
      console.log(`🎯 Max Results: ${maxResults}`);

      // Rate limiting and quota management
      const user = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      if (!user) {
        res.status(401).json({ error: "User not found" });
        return;
      }

      // Check if we need to reset monthly counters
      const now = new Date();
      const lastReset = user.lastResetAt ? new Date(user.lastResetAt) : new Date(0);
      const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceReset >= 30) {
        console.log(`🔄 Resetting monthly usage counters for user ${user.username}`);
        await db.update(users)
          .set({
            discoveryUsedThisMonth: 0,
            emailsUsedThisMonth: 0,
            lastResetAt: now,
          })
          .where(eq(users.id, user.id));
        
        // Reload user with reset counters
        const updatedUser = await db.query.users.findFirst({
          where: eq(users.id, req.user!.id),
        });
        
        if (updatedUser) {
          Object.assign(user, updatedUser);
        }
      }

      // Check monthly Deep Research limit
      const monthlyLimit = user.maxDiscoveryPerMonth;
      const monthlyUsed = user.discoveryUsedThisMonth;

      if (monthlyUsed >= monthlyLimit) {
        console.log(`⚠️ Monthly Deep Research limit reached: ${monthlyUsed}/${monthlyLimit}`);
        const resetDate = new Date(lastReset.getTime() + 30 * 24 * 60 * 60 * 1000);
        res.status(429).json({
          error: "Monthly Deep Research quota exceeded",
          limit: monthlyLimit,
          used: monthlyUsed,
          resetAt: resetDate.toISOString(),
        });
        return;
      }

      console.log(`📊 Monthly Deep Research usage: ${monthlyUsed}/${monthlyLimit} requests`);

      // Limit max tokens per request based on subscription tier
      const maxTokenLimits: Record<string, number> = {
        basic: 2000,
        growth: 4000,
        pro: 8000,
        agency: 16000,
        unlimited: 16000,
      };

      const maxTokens = maxTokenLimits[user.subscriptionTier] || maxTokenLimits.basic;

      // Check for existing cached result (within last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const cachedResult = await db.query.researchRequests.findFirst({
        where: and(
          eq(researchRequests.userId, req.user!.id),
          eq(researchRequests.query, query),
          eq(researchRequests.status, "completed"),
          sql`${researchRequests.createdAt} > ${sevenDaysAgo.toISOString()}`
        ),
      });

      if (cachedResult) {
        console.log(`✅ Found cached result from ${cachedResult.createdAt}`);
        
        // Still increment usage counter for cached results
        await db.update(users)
          .set({
            discoveryUsedThisMonth: sql`${users.discoveryUsedThisMonth} + 1`,
          })
          .where(eq(users.id, req.user!.id));
        
        console.log(`📈 Updated monthly usage (cached): ${monthlyUsed + 1}/${monthlyLimit}`);
        
        res.json({
          requestId: cachedResult.id,
          query: cachedResult.query,
          status: "completed",
          results: cachedResult.results,
          resultCount: cachedResult.resultCount,
          tokensUsed: cachedResult.tokensUsed,
          estimatedCost: cachedResult.estimatedCost,
          cached: true,
          completedAt: cachedResult.completedAt,
        });
        return;
      }

      // Create research request record
      const [researchRequest] = await db.insert(researchRequests).values({
        userId: req.user!.id,
        query,
        status: "processing",
      }).returning();

      console.log(`📋 Created research request: ${researchRequest.id}`);

      // Build AI prompt for structured research
      const systemPrompt = `You are a research assistant that provides structured, accurate data in JSON format.
Your task is to research and provide detailed information based on user queries.

IMPORTANT RULES:
1. Always return valid JSON with a "results" array
2. Each result should have relevant fields based on the query
3. For YouTube/podcast channels, include: name, url, description, subscribers, contactEmail (if available), platform
4. Be comprehensive but accurate - don't make up data
5. Return up to ${maxResults} results
6. If you cannot find enough results, return what you can find`;

      const userPrompt = `Research query: ${query}

Please provide structured research results in the following JSON format:
{
  "results": [
    // Array of relevant results with appropriate fields
  ],
  "summary": "Brief summary of findings",
  "totalFound": number
}`;

      // Call OpenAI API
      const model = "gpt-4o";
      console.log(`🎯 Max tokens for this request: ${maxTokens}`);
      const completion = await openai.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: maxTokens,
        response_format: { type: "json_object" },
      });

      const usage = completion.usage;
      const responseText = completion.choices[0]?.message?.content;

      if (!responseText || !usage) {
        throw new Error("OpenAI returned invalid response");
      }

      // Parse JSON response
      let researchData;
      try {
        researchData = JSON.parse(responseText);
      } catch (error) {
        throw new Error("Failed to parse AI response as JSON");
      }

      const results = researchData.results || [];
      const resultCount = results.length;
      const tokensUsed = usage.total_tokens;
      const estimatedCost = estimateOpenAICost(model, usage.prompt_tokens, usage.completion_tokens);

      console.log(`✅ Research completed: ${resultCount} results found`);
      console.log(`📊 Tokens: ${tokensUsed} | Cost: $${(estimatedCost / 100).toFixed(4)}`);

      // Update research request with results
      await db.update(researchRequests)
        .set({
          status: "completed",
          results: researchData,
          resultCount,
          tokensUsed,
          estimatedCost,
          completedAt: new Date(),
        })
        .where(eq(researchRequests.id, researchRequest.id));

      // Track API usage
      await trackApiUsage(
        req.user!.id,
        "/api/research",
        model,
        usage.prompt_tokens,
        usage.completion_tokens,
        "research",
        true
      );

      // Increment monthly usage counter
      await db.update(users)
        .set({
          discoveryUsedThisMonth: sql`${users.discoveryUsedThisMonth} + 1`,
        })
        .where(eq(users.id, req.user!.id));

      console.log(`📈 Updated monthly usage: ${monthlyUsed + 1}/${monthlyLimit}`);

      // Automatically save shows from research results to database
      let showsCreated = 0;
      const profile = await storage.getActiveProfile(req.user!.id);
      
      if (profile && results.length > 0) {
        console.log(`💾 Saving ${results.length} research results as shows...`);
        
        for (const result of results) {
          try {
            // Skip if this doesn't look like a show/channel
            if (!result.name && !result.title) continue;
            
            // Determine platform from URL or explicit platform field
            let platform = result.platform || 'both';
            if (result.url) {
              if (result.url.includes('youtube.com')) platform = 'youtube';
              else if (result.url.includes('podcasts.')) platform = 'podcast';
            }
            
            // Check for duplicates (by name, case-insensitive, scoped to profile)
            const showName = result.name || result.title;
            const existingShows = await db.query.shows.findMany({
              where: and(
                eq(shows.profileId, profile.id),
                showName ? sql`LOWER(${shows.name}) = LOWER(${showName})` : sql`false`
              ),
            });

            if (existingShows.length > 0) {
              console.log(`  ⏭️  Skipping duplicate: ${showName}`);
              continue;
            }

            // Create show from research result
            const showData: InsertShow = {
              profileId: profile.id,
              name: result.name || result.title || 'Unknown Show',
              host: result.host,
              description: result.description || result.summary,
              platform,
              websiteUrl: result.url || result.websiteUrl,
              contactEmail: result.contactEmail || result.email,
              subscribers: result.subscribers,
              youtubeChannelUrl: platform === 'youtube' ? result.url : undefined,
              status: 'discovered',
              notes: `Added via Deep Research: ${query}`,
            };

            await storage.createShow(req.user!.id, showData);
            showsCreated++;
            console.log(`  ✅ Created show: ${showData.name}`);
          } catch (error: any) {
            console.error(`  ❌ Failed to create show:`, error.message);
          }
        }
        
        console.log(`💾 Successfully saved ${showsCreated}/${results.length} shows to database`);
      }

      res.json({
        requestId: researchRequest.id,
        query,
        status: "completed",
        results: researchData.results,
        summary: researchData.summary,
        resultCount,
        tokensUsed,
        estimatedCost,
        cached: false,
        completedAt: new Date(),
        showsCreated,
      });
    } catch (error: any) {
      console.error("Research error:", error);

      // Track failed API usage
      if (req.user) {
        await trackApiUsage(
          req.user.id,
          "/api/research",
          "gpt-4o",
          0,
          0,
          "research",
          false,
          error.message
        );
      }

      res.status(500).json({ error: error.message || "Research request failed" });
    }
  });

  // GET /api/research/:id - Get research request status/results
  app.get("/api/research/:id", requireAuth, async (req, res) => {
    try {
      const researchRequest = await db.query.researchRequests.findFirst({
        where: and(
          eq(researchRequests.id, req.params.id),
          eq(researchRequests.userId, req.user!.id)
        ),
      });

      if (!researchRequest) {
        res.status(404).json({ error: "Research request not found" });
        return;
      }

      res.json(researchRequest);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch research request" });
    }
  });

  // GET /api/research - List user's research requests
  app.get("/api/research", requireAuth, async (req, res) => {
    try {
      const requests = await db.query.researchRequests.findMany({
        where: eq(researchRequests.userId, req.user!.id),
        orderBy: [sql`created_at DESC`],
        limit: 50,
      });

      res.json(requests);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch research requests" });
    }
  });

  // GET /api/admin/usage - Admin usage statistics
  app.get("/api/admin/usage", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const user = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = user?.subscriptionTier === "unlimited" || user?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      // Get usage stats
      const totalUsage = await db.query.apiUsage.findMany({
        orderBy: [sql`created_at DESC`],
        limit: 100,
      });

      // Calculate aggregates
      const totalTokens = totalUsage.reduce((sum, u) => sum + u.totalTokens, 0);
      const totalCost = totalUsage.reduce((sum, u) => sum + u.estimatedCost, 0);
      const successCount = totalUsage.filter(u => u.success).length;
      const failureCount = totalUsage.filter(u => !u.success).length;

      // Group by request type
      const byRequestType: Record<string, { count: number; tokens: number; cost: number }> = {};
      totalUsage.forEach(u => {
        if (!byRequestType[u.requestType]) {
          byRequestType[u.requestType] = { count: 0, tokens: 0, cost: 0 };
        }
        byRequestType[u.requestType].count++;
        byRequestType[u.requestType].tokens += u.totalTokens;
        byRequestType[u.requestType].cost += u.estimatedCost;
      });

      // Group by user
      const byUser: Record<string, { count: number; tokens: number; cost: number }> = {};
      totalUsage.forEach(u => {
        if (!byUser[u.userId]) {
          byUser[u.userId] = { count: 0, tokens: 0, cost: 0 };
        }
        byUser[u.userId].count++;
        byUser[u.userId].tokens += u.totalTokens;
        byUser[u.userId].cost += u.estimatedCost;
      });

      res.json({
        summary: {
          totalRequests: totalUsage.length,
          successfulRequests: successCount,
          failedRequests: failureCount,
          totalTokens,
          totalCostCents: totalCost,
          totalCostDollars: (totalCost / 100).toFixed(2),
        },
        byRequestType,
        byUser,
        recentUsage: totalUsage.slice(0, 20),
      });
    } catch (error: any) {
      console.error("Admin usage error:", error);
      res.status(500).json({ error: "Failed to fetch usage statistics" });
    }
  });

  // GET /api/admin/users - Get all users (admin only)
  app.get("/api/admin/users", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = currentUser?.subscriptionTier === "unlimited" || currentUser?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      // Get all users
      const allUsers = await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
      });

      // Get usage stats for each user
      const usersWithStats = await Promise.all(
        allUsers.map(async (user) => {
          const userProfiles = await db.query.profiles.findMany({
            where: eq(profiles.userId, user.id),
          });

          // Get shows for all user's profiles
          let totalShows = 0;
          for (const profile of userProfiles) {
            const profileShows = await db.query.shows.findMany({
              where: eq(shows.profileId, profile.id),
            });
            totalShows += profileShows.length;
          }

          return {
            ...user,
            profileCount: userProfiles.length,
            showCount: totalShows,
          };
        })
      );

      res.json(usersWithStats);
    } catch (error: any) {
      console.error("Admin users error:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // PATCH /api/admin/users/:id - Update user subscription (admin only)
  app.patch("/api/admin/users/:userId", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = currentUser?.subscriptionTier === "unlimited" || currentUser?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      const { subscriptionTier, maxProfiles, maxDiscoveryPerMonth, maxEmailsPerMonth, deepResearchQuota } = req.body;

      // Update user
      const [updatedUser] = await db
        .update(users)
        .set({
          subscriptionTier,
          maxProfiles,
          maxDiscoveryPerMonth,
          maxEmailsPerMonth,
          deepResearchQuota,
        })
        .where(eq(users.id, req.params.userId))
        .returning();

      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(updatedUser);
    } catch (error: any) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // GET /api/admin/overview - Get admin overview dashboard metrics (admin only)
  app.get("/api/admin/overview", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = currentUser?.subscriptionTier === "unlimited" || currentUser?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Use SQL aggregates for better performance
      const [totalUsersResult] = await db.select({ count: sql<number>`count(*)::int` }).from(users);
      const totalUsers = totalUsersResult.count;

      const [newUsers7DResult] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(users)
        .where(sql`${users.createdAt} >= ${sevenDaysAgo}`);
      const newUsersLast7Days = newUsers7DResult.count;

      const [newUsers30DResult] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(users)
        .where(sql`${users.createdAt} >= ${thirtyDaysAgo}`);
      const newUsersLast30Days = newUsers30DResult.count;

      // Get subscription counts by tier using SQL
      const tierCounts = await db
        .select({ 
          tier: users.subscriptionTier, 
          count: sql<number>`count(*)::int` 
        })
        .from(users)
        .groupBy(users.subscriptionTier);

      const subscriptionsByTier = tierCounts.reduce((acc, row) => {
        acc[row.tier] = row.count;
        return acc;
      }, {} as Record<string, number>);

      // Calculate MRR (using in-memory calc for tier pricing)
      const tierPricing: Record<string, number> = {
        basic: 29.99,
        growth: 39,
        pro: 99,
        agency: 399.99,
        unlimited: 0,
      };
      
      const mrr = tierCounts.reduce((total, row) => {
        return total + (tierPricing[row.tier] || 0) * row.count;
      }, 0);

      // Get counts using SQL aggregates
      const [showsResult] = await db.select({ count: sql<number>`count(*)::int` }).from(shows);
      const totalShows = showsResult.count;

      const [profilesResult] = await db.select({ count: sql<number>`count(*)::int` }).from(profiles);
      const totalProfiles = profilesResult.count;

      // Get recent signups with limit in SQL
      const recentSignups = await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
        limit: 10,
        columns: {
          id: true,
          username: true,
          subscriptionTier: true,
          createdAt: true,
        },
      });

      // Get API usage summary with aggregates
      const [apiStatsResult] = await db
        .select({
          count: sql<number>`count(*)::int`,
          totalTokens: sql<number>`sum(${apiUsage.totalTokens})::int`,
          totalCost: sql<number>`sum(${apiUsage.estimatedCost})::int`,
        })
        .from(apiUsage);

      const totalApiCalls = apiStatsResult.count || 0;
      const totalTokens = apiStatsResult.totalTokens || 0;
      const totalCostCents = apiStatsResult.totalCost || 0;

      res.json({
        users: {
          total: totalUsers,
          newLast7Days: newUsersLast7Days,
          newLast30Days: newUsersLast30Days,
          recentSignups,
        },
        subscriptions: {
          byTier: subscriptionsByTier,
          mrr: mrr.toFixed(2),
        },
        activity: {
          totalShows,
          totalProfiles,
          totalApiCalls,
          totalTokens,
          totalCostDollars: (totalCostCents / 100).toFixed(2),
        },
      });
    } catch (error: any) {
      console.error("Admin overview error:", error);
      res.status(500).json({ error: "Failed to fetch overview metrics" });
    }
  });

  // GET /api/admin/flagged-shows - Get all flagged shows (admin only)
  app.get("/api/admin/flagged-shows", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = currentUser?.subscriptionTier === "unlimited" || currentUser?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      // Get all flagged shows with their bounce history
      const flaggedShows = await db.query.shows.findMany({
        where: eq(shows.flaggedForReview, true),
        orderBy: [desc(shows.lastBounceDate)],
      });

      // For each show, get the bounce history
      const showsWithBounces = await Promise.all(
        flaggedShows.map(async (show) => {
          const bounces = await db.query.outreachCampaigns.findMany({
            where: and(
              eq(outreachCampaigns.showId, show.id),
              eq(outreachCampaigns.status, "bounced")
            ),
            orderBy: [desc(outreachCampaigns.sentAt)],
          });

          return {
            ...show,
            bounceCount: bounces.length,
            bounces,
          };
        })
      );

      res.json(showsWithBounces);
    } catch (error: any) {
      console.error("Get flagged shows error:", error);
      res.status(500).json({ error: "Failed to fetch flagged shows" });
    }
  });

  // PATCH /api/admin/flagged-shows/:showId - Resolve or unflag a show (admin only)
  app.patch("/api/admin/flagged-shows/:showId", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = currentUser?.subscriptionTier === "unlimited" || currentUser?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      const { action, notes } = req.body; // action: "unflag" | "mark_dead"

      if (!action || !["unflag", "mark_dead"].includes(action)) {
        res.status(400).json({ error: "Invalid action. Must be 'unflag' or 'mark_dead'" });
        return;
      }

      if (action === "unflag") {
        // Unflag the show
        await db.update(shows)
          .set({
            flaggedForReview: false,
            flagReason: null,
            notes: notes || null,
            updatedAt: new Date(),
          })
          .where(eq(shows.id, req.params.showId));

        res.json({ success: true, message: "Show unflagged" });
      } else if (action === "mark_dead") {
        // Mark the show as not interested and unflag
        await db.update(shows)
          .set({
            status: "not_interested",
            flaggedForReview: false,
            notes: notes || "Marked as dead show by admin due to bounced emails",
            updatedAt: new Date(),
          })
          .where(eq(shows.id, req.params.showId));

        res.json({ success: true, message: "Show marked as dead" });
      }
    } catch (error: any) {
      console.error("Update flagged show error:", error);
      res.status(500).json({ error: "Failed to update flagged show" });
    }
  });

  // GET /api/research/:id/export - Export research results as CSV or JSON
  app.get("/api/research/:id/export", requireAuth, async (req, res) => {
    try {
      const { format = "json" } = req.query;

      const researchRequest = await db.query.researchRequests.findFirst({
        where: and(
          eq(researchRequests.id, req.params.id),
          eq(researchRequests.userId, req.user!.id)
        ),
      });

      if (!researchRequest || researchRequest.status !== "completed") {
        res.status(404).json({ error: "Research request not found or not completed" });
        return;
      }

      const results = researchRequest.results as any;

      if (format === "csv") {
        // Convert to CSV
        const data = results.results || [];
        if (data.length === 0) {
          res.status(404).json({ error: "No results to export" });
          return;
        }

        // Get all unique keys from all objects
        const keys = Array.from(
          new Set(data.flatMap((obj: any) => Object.keys(obj)))
        );

        // Create CSV header
        const csv = [
          keys.join(","),
          ...data.map((row: any) =>
            keys.map(key => {
              const value = row[key];
              const escaped = String(value || "").replace(/"/g, '""');
              return `"${escaped}"`;
            }).join(",")
          ),
        ].join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename="research_${researchRequest.id}.csv"`);
        res.send(csv);
      } else {
        // Export as JSON
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename="research_${researchRequest.id}.json"`);
        res.json(results);
      }
    } catch (error: any) {
      console.error("Export error:", error);
      res.status(500).json({ error: "Failed to export research results" });
    }
  });

  // GET /api/admin/templates - Get all system templates (admin only)
  app.get("/api/admin/templates", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = currentUser?.subscriptionTier === "unlimited" || currentUser?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      const templates = await db.query.systemTemplates.findMany({
        orderBy: [systemTemplates.templateType, systemTemplates.name],
      });

      res.json(templates);
    } catch (error: any) {
      console.error("Get templates error:", error);
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  // PUT /api/admin/templates/:id - Update a system template (admin only)
  app.put("/api/admin/templates/:id", requireAuth, async (req, res) => {
    try {
      // Check if user is admin
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });

      const isAdmin = currentUser?.subscriptionTier === "unlimited" || currentUser?.subscriptionTier === "admin";
      if (!isAdmin) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      // Validate request body with Zod
      const updateTemplateSchema = z.object({
        name: z.string().min(1, "Template name is required"),
        subject: z.string().optional().nullable(),
        body: z.string().min(1, "Template body is required"),
        isActive: z.boolean().optional(),
      });

      const validatedData = updateTemplateSchema.parse(req.body);

      // Build update object with only provided fields
      const updateData: any = {
        name: validatedData.name,
        body: validatedData.body,
        updatedBy: req.user!.id,
        updatedAt: new Date(),
      };

      // Only update subject if provided (nullable for invoice templates)
      if (validatedData.subject !== undefined) {
        updateData.subject = validatedData.subject;
      }

      // Only update isActive if explicitly provided
      if (validatedData.isActive !== undefined) {
        updateData.isActive = validatedData.isActive;
      }

      const [updatedTemplate] = await db
        .update(systemTemplates)
        .set(updateData)
        .where(eq(systemTemplates.id, req.params.id))
        .returning();

      if (!updatedTemplate) {
        res.status(404).json({ error: "Template not found" });
        return;
      }

      res.json(updatedTemplate);
    } catch (error: any) {
      console.error("Update template error:", error);
      
      // Return Zod validation errors
      if (error.name === "ZodError") {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
        return;
      }
      
      res.status(500).json({ error: "Failed to update template" });
    }
  });

  // GET /api/admin/pricing - Get all pricing plans (admin only)
  app.get("/api/admin/pricing", requireAuth, async (req, res) => {
    try {
      const user = req.user;
      if (!user || (user.subscriptionTier !== "unlimited" && user.subscriptionTier !== "admin")) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      const plans = await db.select().from(pricingPlans).orderBy(pricingPlans.sortOrder);
      res.json(plans);
    } catch (error: any) {
      console.error("Get pricing plans error:", error);
      res.status(500).json({ error: "Failed to fetch pricing plans" });
    }
  });

  // PUT /api/admin/pricing/:tier - Update a pricing plan (admin only)
  app.put("/api/admin/pricing/:tier", requireAuth, async (req, res) => {
    try {
      const user = req.user;
      if (!user || (user.subscriptionTier !== "unlimited" && user.subscriptionTier !== "admin")) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      const { tier } = req.params;
      const updates = req.body;

      // Validate required fields
      if (updates.monthlyPriceUSD !== undefined && (typeof updates.monthlyPriceUSD !== 'number' || updates.monthlyPriceUSD < 0)) {
        res.status(400).json({ error: "Invalid monthly price" });
        return;
      }

      if (updates.yearlyPriceUSD !== undefined && (typeof updates.yearlyPriceUSD !== 'number' || updates.yearlyPriceUSD < 0)) {
        res.status(400).json({ error: "Invalid yearly price" });
        return;
      }

      // Update the pricing plan
      const [updatedPlan] = await db
        .update(pricingPlans)
        .set({
          ...updates,
          updatedBy: user.id,
          updatedAt: new Date(),
        })
        .where(eq(pricingPlans.tier, tier))
        .returning();

      if (!updatedPlan) {
        res.status(404).json({ error: "Pricing plan not found" });
        return;
      }

      console.log(`✅ Pricing plan updated: ${tier} by admin ${user.username}`);
      res.json(updatedPlan);
    } catch (error: any) {
      console.error("Update pricing plan error:", error);
      res.status(500).json({ error: "Failed to update pricing plan" });
    }
  });

  // GET /api/pricing - Get active pricing plans (public)
  app.get("/api/pricing", async (_req, res) => {
    try {
      const plans = await db
        .select()
        .from(pricingPlans)
        .where(eq(pricingPlans.isActive, true))
        .orderBy(pricingPlans.sortOrder);
      
      res.json(plans);
    } catch (error: any) {
      console.error("Get public pricing error:", error);
      res.status(500).json({ error: "Failed to fetch pricing" });
    }
  });

  // Bulk Import: Validate and import show suggestions
  app.post("/api/import/shows", requireAuth, async (req, res) => {
    try {
      const { shows } = req.body;

      if (!shows || !Array.isArray(shows) || shows.length === 0) {
        res.status(400).json({ error: "Shows array is required" });
        return;
      }

      console.log(`\n📥 BULK IMPORT STARTED`);
      console.log(`📊 Importing ${shows.length} shows`);

      const imported = [];
      const skipped = [];
      const errors = [];

      for (const showData of shows) {
        try {
          const { name, platform, host, description, estimatedSubscribers } = showData;

          if (!name || !platform) {
            errors.push({ show: name || "Unknown", reason: "Missing required fields (name, platform)" });
            continue;
          }

          // Attempt to find and validate the show using trusted APIs
          let validatedShow = null;

          if (platform === "podcast") {
            // Search Podcast Index to validate
            const podcasts = await searchPodcastsByTerm(name, 5);
            const match = podcasts.find((p: any) => 
              p.title.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase().includes(p.title.toLowerCase())
            );

            if (match) {
              // Check for duplicates
              const existing = await storage.findDuplicateShow(req.user!.id, undefined, match.url, undefined);
              if (existing) {
                skipped.push({ show: name, reason: "Duplicate RSS URL" });
                continue;
              }

              // SKIP podcasts without emails
              if (!match.email) {
                skipped.push({ show: name, reason: "No contact email" });
                continue;
              }

              const activeProfile = await storage.getActiveProfile(req.user!.id);
              if (!activeProfile) {
                errors.push({ show: name, reason: "No active profile found" });
                continue;
              }

              validatedShow = await storage.createShow(req.user!.id, {
                profileId: activeProfile.id,
                name: match.title,
                host: match.author || host || null,
                description: match.description?.substring(0, 500) || description || null,
                platform: "podcast",
                podcastRssUrl: match.url,
                websiteUrl: match.link,
                thumbnailUrl: match.image,
                contactEmail: match.email,
                episodeCount: match.episodeCount || null,
                lastEpisodeDate: match.newestItemPubdate ? new Date(match.newestItemPubdate * 1000).toISOString() : null,
                guestScore: 70,
                topicMatchScore: 90,
                status: "discovered",
              });
              
              imported.push(validatedShow);
              console.log(`     ✅ Imported podcast: "${match.title}"`);
            } else {
              errors.push({ show: name, reason: "Could not validate via Podcast Index API" });
            }
          } else if (platform === "youtube") {
            // Search YouTube to validate
            try {
              const youtube = await getYoutubeClient();
              const searchResponse = await youtube.search.list({
                part: ["snippet"],
                q: name,
                type: ["channel"],
                maxResults: 5,
              });

              const channels = searchResponse.data.items || [];
              const match = channels.find((c: any) =>
                c.snippet?.title?.toLowerCase().includes(name.toLowerCase()) ||
                name.toLowerCase().includes(c.snippet?.title?.toLowerCase())
              );

              if (match && match.id?.channelId) {
                // SKIP YouTube channels - they don't have emails
                skipped.push({ show: name, reason: "YouTube channels don't have contact emails" });
              } else {
                errors.push({ show: name, reason: "Could not validate via YouTube API" });
              }
            } catch (ytError: any) {
              errors.push({ show: name, reason: `YouTube API error: ${ytError.message}` });
            }
          }
        } catch (error: any) {
          errors.push({ show: showData.name || "Unknown", reason: error.message });
        }
      }

      console.log(`\n✅ BULK IMPORT COMPLETE`);
      console.log(`   Imported: ${imported.length} shows`);
      console.log(`   Skipped: ${skipped.length} duplicates`);
      console.log(`   Errors: ${errors.length} failed validations`);

      res.json({
        imported: imported.length,
        skipped: skipped.length,
        errors: errors.length,
        shows: imported,
        skippedDetails: skipped,
        errorDetails: errors
      });
    } catch (error: any) {
      console.error("Bulk import error:", error);
      res.status(500).json({ error: error.message || "Failed to import shows" });
    }
  });

  // Email template routes
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/default", async (req, res) => {
    try {
      const template = await storage.getDefaultTemplate();
      res.json(template || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch default template" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const data = insertEmailTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(data);
      res.json(template);
    } catch (error) {
      res.status(400).json({ error: "Invalid template data" });
    }
  });

  app.patch("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.updateTemplate(req.params.id, req.body);
      if (!template) {
        res.status(404).json({ error: "Template not found" });
        return;
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to update template" });
    }
  });

  // Utility: Check and flag shows with multiple bounced emails from different users on different days
  async function checkAndFlagDeadShow(showId: string) {
    try {
      // Get all bounced campaigns for this show, joined with profiles to get actual user IDs
      const bouncedCampaigns = await db.query.outreachCampaigns.findMany({
        where: and(
          eq(outreachCampaigns.showId, showId),
          eq(outreachCampaigns.status, "bounced")
        ),
        with: {
          profile: true, // Join to get userId
        },
      });

      if (bouncedCampaigns.length < 2) return; // Need at least 2 bounces

      // Group bounces by actual userId (not profileId) to prevent single user with multiple profiles from triggering flag
      const bouncesByUser = new Map<string, Date[]>();
      for (const campaign of bouncedCampaigns) {
        const userId = campaign.profile?.userId;
        if (!userId || !campaign.bouncedAt) continue; // Use bouncedAt as authoritative bounce timestamp
        
        if (!bouncesByUser.has(userId)) {
          bouncesByUser.set(userId, []);
        }
        bouncesByUser.get(userId)!.push(new Date(campaign.bouncedAt));
      }

      // Check if we have bounces from multiple actual users
      const userCount = bouncesByUser.size;
      if (userCount < 2) return; // Need bounces from at least 2 different users

      // Check if bounces occurred on different days (using authoritative bouncedAt timestamps)
      const allBounceDates = Array.from(bouncesByUser.values()).flat();
      const uniqueDays = new Set(
        allBounceDates.map(date => date.toISOString().split('T')[0])
      );

      if (uniqueDays.size < 2) return; // Need bounces on at least 2 different days

      // Flag the show for admin review
      const latestBounce = new Date(Math.max(...allBounceDates.map(d => d.getTime())));
      
      await db.update(shows)
        .set({
          flaggedForReview: true,
          flagReason: `${userCount} different users reported bounced emails on ${uniqueDays.size} different days. Possible dead show.`,
          lastBounceDate: latestBounce,
          updatedAt: new Date(),
        })
        .where(eq(shows.id, showId));

      console.log(`🚩 Flagged show ${showId} for review: ${userCount} users, ${uniqueDays.size} days with bounces`);
    } catch (error) {
      console.error("Error checking dead show status:", error);
    }
  }

  // Outreach routes
  app.get("/api/outreach", requireAuth, async (req, res) => {
    try {
      const campaigns = await storage.getAllOutreachCampaigns(req.user!.id);
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch outreach campaigns" });
    }
  });

  // Update outreach campaign status
  app.patch("/api/outreach/:id", requireAuth, async (req, res) => {
    try {
      const { status } = req.body;
      
      if (!status || !["pending", "sent", "replied", "bounced", "failed"].includes(status)) {
        res.status(400).json({ error: "Invalid status" });
        return;
      }

      // Get the campaign with its profile to verify ownership (CRITICAL: prevents cross-tenant escalation)
      const campaign = await db.query.outreachCampaigns.findFirst({
        where: eq(outreachCampaigns.id, req.params.id),
        with: {
          profile: true, // Join to verify userId ownership
        },
      });

      if (!campaign) {
        res.status(404).json({ error: "Campaign not found" });
        return;
      }

      // SECURITY: Verify user owns this campaign through their profile
      if (!campaign.profile || campaign.profile.userId !== req.user!.id) {
        res.status(403).json({ error: "Unauthorized: You do not own this campaign" });
        return;
      }

      // Update campaign status (set bouncedAt when status becomes "bounced", clear it when leaving "bounced")
      const updates: { status: string; updatedAt: Date; bouncedAt?: Date | null } = {
        status,
        updatedAt: new Date(),
      };
      
      if (status === "bounced") {
        updates.bouncedAt = new Date(); // Set authoritative bounce timestamp
      } else if (campaign.status === "bounced" && status !== "bounced") {
        updates.bouncedAt = null; // Clear bounce timestamp when status changes away from bounced
      }
      
      await db.update(outreachCampaigns)
        .set(updates)
        .where(eq(outreachCampaigns.id, req.params.id));

      // If status is bounced, check if we should flag the show
      if (status === "bounced") {
        await checkAndFlagDeadShow(campaign.showId);
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Update outreach status error:", error);
      res.status(500).json({ error: "Failed to update campaign status" });
    }
  });

  app.post("/api/outreach/send", requireAuth, async (req, res) => {
    try {
      const gmail = await getGmailClient();
      
      if (!gmail) {
        res.status(501).json({ error: "Gmail connector not configured. Please set up the Gmail integration in Replit." });
        return;
      }

      const { showIds } = req.body;
      const profile = await storage.getProfile(req.user!.id);
      const defaultTemplate = await storage.getDefaultTemplate();

      if (!profile) {
        res.status(400).json({ error: "Profile not set up" });
        return;
      }

      if (!defaultTemplate) {
        res.status(400).json({ error: "No default email template found" });
        return;
      }

      const sent = [];

      for (const showId of showIds) {
        const show = await storage.getShowById(req.user!.id, showId);
        if (!show || !show.contactEmail) continue;

        // Personalize email
        const subject = personalizeTemplate(defaultTemplate.subject, profile, show);
        const body = personalizeTemplate(defaultTemplate.body, profile, show);

        // Create email
        const message = [
          `To: ${show.contactEmail}`,
          `Subject: ${subject}`,
          "",
          body,
        ].join("\n");

        const encodedMessage = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");

        // Send via Gmail
        const response = await gmail.users.messages.send({
          userId: "me",
          requestBody: {
            raw: encodedMessage,
          },
        });

        // Create outreach campaign record
        const campaign = await storage.createOutreachCampaign(req.user!.id, {
          showId,
          templateId: defaultTemplate.id,
          subject,
          body,
          toEmail: show.contactEmail,
          status: "sent",
          sentAt: new Date(),
          followupNumber: 0,
          gmailMessageId: response.data.id || undefined,
          gmailThreadId: response.data.threadId || undefined,
        });

        // Update show status
        await storage.updateShow(req.user!.id, showId, { status: "pitched" });

        sent.push(campaign);
      }

      res.json({ sent: sent.length, campaigns: sent });
    } catch (error: any) {
      console.error("Send outreach error:", error);
      res.status(500).json({ error: error.message || "Failed to send outreach" });
    }
  });

  // Conversations routes
  app.get("/api/conversations", requireAuth, async (req, res) => {
    try {
      const conversations = await storage.getAllConversations(req.user!.id);
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.post("/api/conversations/sync", requireAuth, async (req, res) => {
    try {
      const gmail = await getGmailClient();
      
      if (!gmail) {
        res.status(501).json({ error: "Gmail connector not configured. Please set up the Gmail integration in Replit." });
        return;
      }

      const profile = await storage.getProfile(req.user!.id);
      
      // Get all sent outreach campaigns with thread IDs
      const campaigns = await storage.getAllOutreachCampaigns(req.user!.id);
      const threadsToCheck = campaigns
        .filter((c) => c.gmailThreadId && c.status === "sent")
        .map((c) => c.gmailThreadId!);

      let newReplies = 0;

      for (const threadId of threadsToCheck) {
        const thread = await gmail.users.threads.get({
          userId: "me",
          id: threadId,
        });

        const messages = thread.data.messages || [];
        if (messages.length <= 1) continue; // No replies

        const campaign = campaigns.find((c) => c.gmailThreadId === threadId);
        if (!campaign) continue;

        // Parse messages
        const parsedMessages = messages.map((msg) => {
          const headers = msg.payload?.headers || [];
          const from = headers.find((h) => h.name === "From")?.value || "";
          const date = headers.find((h) => h.name === "Date")?.value || "";
          const body = msg.payload?.body?.data
            ? Buffer.from(msg.payload.body.data, "base64").toString()
            : "";

          return {
            id: msg.id,
            from,
            fromEmail: from.match(/<(.+)>/)?.[1] || from,
            content: body.substring(0, 500), // Truncate for storage
            timestamp: new Date(date).toISOString(),
            isYou: from.includes(profile?.fromEmail || ""),
          };
        });

        // Analyze sentiment with AI
        const lastReply = parsedMessages[parsedMessages.length - 1];
        let sentiment: "positive" | "neutral" | "negative" = "neutral";

        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "Analyze the sentiment of this email reply. Respond with only one word: 'positive' if interested in having guest, 'neutral' if maybe later, or 'negative' if not interested.",
              },
              { role: "user", content: lastReply.content },
            ],
          });

          const result = completion.choices[0]?.message?.content?.toLowerCase().trim();
          if (result === "positive" || result === "neutral" || result === "negative") {
            sentiment = result;
          }
        } catch (aiError) {
          console.error("AI sentiment analysis failed:", aiError);
        }

        // Create or update conversation
        const existingConv = await storage.getConversationByThreadId(req.user!.id, threadId);
        if (existingConv) {
          await storage.updateConversation(req.user!.id, existingConv.id, {
            messages: parsedMessages as any,
            sentiment,
            lastMessageAt: new Date(),
            unread: true,
          });
        } else {
          await storage.createConversation(req.user!.id, {
            showId: campaign.showId,
            gmailThreadId: threadId,
            messages: parsedMessages as any,
            sentiment,
            lastMessageAt: new Date(),
            unread: true,
          });
          newReplies++;
        }

        // Update campaign and show status
        await storage.updateOutreachCampaign(req.user!.id, campaign.id, { status: "replied" });
        await storage.updateShow(req.user!.id, campaign.showId, { status: "responded" });
      }

      res.json({ synced: threadsToCheck.length, newReplies });
    } catch (error: any) {
      console.error("Sync conversations error:", error);
      res.status(500).json({ error: error.message || "Failed to sync conversations" });
    }
  });

  app.post("/api/conversations/:id/reply", requireAuth, async (req, res) => {
    try {
      const gmail = await getGmailClient();
      
      if (!gmail) {
        res.status(501).json({ error: "Gmail connector not configured. Please set up the Gmail integration in Replit." });
        return;
      }

      const { content } = req.body;
      const conversation = await storage.getConversationByShowId(req.user!.id, req.params.id);

      if (!conversation) {
        res.status(404).json({ error: "Conversation not found" });
        return;
      }

      const profile = await storage.getProfile(req.user!.id);

      const message = [
        `To: ${(conversation.messages as any)[0]?.fromEmail}`,
        `Subject: Re: Guest opportunity`,
        `In-Reply-To: ${conversation.gmailThreadId}`,
        "",
        content,
      ].join("\n");

      const encodedMessage = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");

      await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
          threadId: conversation.gmailThreadId,
        },
      });

      // Update conversation
      const messages = conversation.messages as any[];
      messages.push({
        id: Date.now().toString(),
        from: profile?.name || "You",
        fromEmail: profile?.fromEmail || "",
        content,
        timestamp: new Date().toISOString(),
        isYou: true,
      });

      await storage.updateConversation(req.user!.id, conversation.id, {
        messages: messages as any,
        lastMessageAt: new Date(),
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Reply error:", error);
      res.status(500).json({ error: error.message || "Failed to send reply" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/stats", requireAuth, async (req, res) => {
    try {
      const shows = await storage.getAllShows(req.user!.id);
      const campaigns = await storage.getAllOutreachCampaigns(req.user!.id);
      const conversations = await storage.getAllConversations(req.user!.id);

      const stats = {
        totalShows: shows.length,
        outreachSent: campaigns.filter((c) => c.status === "sent" || c.status === "replied").length,
        positiveReplies: conversations.filter((c) => c.sentiment === "positive").length,
        bookings: shows.filter((s) => s.status === "booked").length,
        responseRate: campaigns.length > 0 
          ? Math.round((campaigns.filter((c) => c.status === "replied").length / campaigns.length) * 100)
          : 0,
        pipelineCounts: {
          discovered: shows.filter((s) => s.status === "discovered").length,
          qualified: shows.filter((s) => s.status === "qualified").length,
          pitched: shows.filter((s) => s.status === "pitched").length,
          followup: shows.filter((s) => s.status === "followup").length,
          responded: shows.filter((s) => s.status === "responded").length,
          booked: shows.filter((s) => s.status === "booked").length,
        },
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // ============== AFFILIATE PROGRAM ROUTES ==============

  // Generate unique affiliate referral ID
  function generateReferralId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'AFF';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // Get affiliate dashboard data (for logged-in affiliates)
  app.get("/api/affiliate/dashboard", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      
      // Find affiliate by userId
      const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.userId, userId));
      
      if (!affiliate) {
        return res.status(404).json({ error: "You are not registered as an affiliate" });
      }

      // Get commission history
      const commissionList = await db.select().from(commissions)
        .where(eq(commissions.affiliateId, affiliate.id))
        .orderBy(desc(commissions.createdAt));

      // Get referred users count
      const referred = await db.select().from(referredUsers)
        .where(eq(referredUsers.affiliateId, affiliate.id));

      res.json({
        affiliate: {
          ...affiliate,
          referralLink: `https://guestbookerpro.com?ref=${affiliate.referralId}`,
        },
        commissions: commissionList,
        referredUsers: referred,
      });
    } catch (error) {
      console.error("Error fetching affiliate dashboard:", error);
      res.status(500).json({ error: "Failed to fetch affiliate dashboard" });
    }
  });

  // Become an affiliate (for existing users)
  app.post("/api/affiliate/signup", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const { paypalEmail } = req.body;

      // Check if user already has an affiliate account
      const [existingAffiliate] = await db.select().from(affiliates).where(eq(affiliates.userId, userId));
      if (existingAffiliate) {
        return res.status(400).json({ error: "You already have an affiliate account" });
      }

      // Get user details
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      if (!user || !user.email) {
        return res.status(400).json({ error: "User email is required for affiliate signup" });
      }

      // Generate unique referral ID
      let referralId = generateReferralId();
      let attempts = 0;
      while (attempts < 10) {
        const [existing] = await db.select().from(affiliates).where(eq(affiliates.referralId, referralId));
        if (!existing) break;
        referralId = generateReferralId();
        attempts++;
      }

      // Create affiliate account
      const [newAffiliate] = await db.insert(affiliates).values({
        userId,
        email: user.email,
        name: user.username,
        referralId,
        paypalEmail: paypalEmail || null,
        commissionRate: 20, // Default 20%
      }).returning();

      res.json({
        success: true,
        affiliate: {
          ...newAffiliate,
          referralLink: `https://guestbookerpro.com?ref=${newAffiliate.referralId}`,
        },
      });
    } catch (error: any) {
      console.error("Error creating affiliate:", error);
      if (error.code === '23505') { // Unique violation
        return res.status(400).json({ error: "An affiliate account with this email already exists" });
      }
      res.status(500).json({ error: "Failed to create affiliate account" });
    }
  });

  // Track affiliate click (public endpoint)
  app.post("/api/affiliate/track-click", async (req, res) => {
    try {
      const { referralId } = req.body;
      if (!referralId) {
        return res.status(400).json({ error: "Referral ID is required" });
      }

      // Find affiliate and increment clicks
      const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.referralId, referralId));
      if (affiliate) {
        await db.update(affiliates)
          .set({ clicks: sql`${affiliates.clicks} + 1` })
          .where(eq(affiliates.id, affiliate.id));
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking click:", error);
      res.status(500).json({ error: "Failed to track click" });
    }
  });

  // Request affiliate payout
  app.post("/api/affiliate/request-payout", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const { paymentMethod, paymentDetails } = req.body;

      // Find affiliate
      const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.userId, userId));
      if (!affiliate) {
        return res.status(404).json({ error: "Affiliate account not found" });
      }

      // Check minimum payout threshold ($50 = 5000 cents)
      if (affiliate.pendingBalance < 5000) {
        return res.status(400).json({ 
          error: "Minimum payout threshold is $50. Your current balance is $" + (affiliate.pendingBalance / 100).toFixed(2)
        });
      }

      // Create payout request
      const [payout] = await db.insert(affiliatePayouts).values({
        affiliateId: affiliate.id,
        amount: affiliate.pendingBalance,
        paymentMethod: paymentMethod || 'paypal',
        paymentDetails: paymentDetails || affiliate.paypalEmail,
        status: 'pending',
      }).returning();

      // Mark pending commissions as payable
      await db.update(commissions)
        .set({ status: 'payable' })
        .where(and(
          eq(commissions.affiliateId, affiliate.id),
          eq(commissions.status, 'pending')
        ));

      res.json({ success: true, payout });
    } catch (error) {
      console.error("Error requesting payout:", error);
      res.status(500).json({ error: "Failed to request payout" });
    }
  });

  // Update affiliate PayPal email
  app.patch("/api/affiliate/payment-details", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const { paypalEmail } = req.body;

      const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.userId, userId));
      if (!affiliate) {
        return res.status(404).json({ error: "Affiliate account not found" });
      }

      await db.update(affiliates)
        .set({ paypalEmail })
        .where(eq(affiliates.id, affiliate.id));

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating payment details:", error);
      res.status(500).json({ error: "Failed to update payment details" });
    }
  });

  // Admin: Get all affiliates
  app.get("/api/admin/affiliates", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!user || user.subscriptionTier !== 'admin') {
        return res.status(403).json({ error: "Admin access required" });
      }

      const allAffiliates = await db.select().from(affiliates).orderBy(desc(affiliates.createdAt));
      
      res.json(allAffiliates);
    } catch (error) {
      console.error("Error fetching affiliates:", error);
      res.status(500).json({ error: "Failed to fetch affiliates" });
    }
  });

  // Admin: Update affiliate commission rate
  app.patch("/api/admin/affiliates/:id/commission-rate", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!user || user.subscriptionTier !== 'admin') {
        return res.status(403).json({ error: "Admin access required" });
      }

      const { id } = req.params;
      const { commissionRate } = req.body;

      if (![20, 25, 30].includes(commissionRate)) {
        return res.status(400).json({ error: "Commission rate must be 20, 25, or 30" });
      }

      await db.update(affiliates)
        .set({ commissionRate })
        .where(eq(affiliates.id, id));

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating commission rate:", error);
      res.status(500).json({ error: "Failed to update commission rate" });
    }
  });

  // Admin: Process payout
  app.patch("/api/admin/payouts/:id/process", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!user || user.subscriptionTier !== 'admin') {
        return res.status(403).json({ error: "Admin access required" });
      }

      const { id } = req.params;
      const { status } = req.body; // completed or failed

      const [payout] = await db.select().from(affiliatePayouts).where(eq(affiliatePayouts.id, id));
      if (!payout) {
        return res.status(404).json({ error: "Payout not found" });
      }

      // Update payout status
      await db.update(affiliatePayouts)
        .set({ 
          status,
          processedAt: new Date(),
        })
        .where(eq(affiliatePayouts.id, id));

      if (status === 'completed') {
        // Update affiliate totals
        await db.update(affiliates)
          .set({ 
            totalCommissionPaid: sql`${affiliates.totalCommissionPaid} + ${payout.amount}`,
            pendingBalance: sql`${affiliates.pendingBalance} - ${payout.amount}`,
          })
          .where(eq(affiliates.id, payout.affiliateId));

        // Mark commissions as paid
        await db.update(commissions)
          .set({ status: 'paid' })
          .where(and(
            eq(commissions.affiliateId, payout.affiliateId),
            eq(commissions.status, 'payable')
          ));
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error processing payout:", error);
      res.status(500).json({ error: "Failed to process payout" });
    }
  });

  // Admin: Get pending payouts
  app.get("/api/admin/payouts", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!user || user.subscriptionTier !== 'admin') {
        return res.status(403).json({ error: "Admin access required" });
      }

      const payouts = await db.select().from(affiliatePayouts).orderBy(desc(affiliatePayouts.createdAt));
      
      res.json(payouts);
    } catch (error) {
      console.error("Error fetching payouts:", error);
      res.status(500).json({ error: "Failed to fetch payouts" });
    }
  });

  // Check if current user is an affiliate
  app.get("/api/affiliate/status", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.userId, userId));
      
      res.json({ 
        isAffiliate: !!affiliate,
        affiliate: affiliate ? {
          ...affiliate,
          referralLink: `https://guestbookerpro.com?ref=${affiliate.referralId}`,
        } : null,
      });
    } catch (error) {
      console.error("Error checking affiliate status:", error);
      res.status(500).json({ error: "Failed to check affiliate status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
// Helper functions
function calculateGuestScore(titles: string[]): number {
  if (!titles || titles.length === 0) return 0;
  
  const guestKeywords = [
    "interview", "with", "featuring", "feat.", "feat ", "ft.", "ft ",
    "guest", "conversation with", "talks with", "speaks with", 
    "episode", "podcast", "chat with", "discussion with"
  ];
  
  let guestEpisodes = 0;
  for (const title of titles) {
    const lowerTitle = title.toLowerCase();
    
    // Check if title contains multiple indicators
    const matches = guestKeywords.filter((keyword) => lowerTitle.includes(keyword));
    
    // If has "with", "featuring", or "ft." it's very likely a guest episode
    if (matches.some(k => ["with", "featuring", "feat.", "feat ", "ft.", "ft "].includes(k))) {
      guestEpisodes += 1;
    } 
    // If has "interview" or "conversation" it's likely a guest show
    else if (matches.some(k => ["interview", "conversation with", "talks with", "speaks with"].includes(k))) {
      guestEpisodes += 0.8;
    }
    // If has "episode" or "podcast" it might be a regular show format
    else if (matches.some(k => ["episode", "podcast"].includes(k))) {
      guestEpisodes += 0.3;
    }
  }

  return Math.round((guestEpisodes / titles.length) * 100);
}

function personalizeTemplate(template: string, profile: any, show: any): string {
  return template
    .replace(/\{\{host_name\}\}/g, show.host || "there")
    .replace(/\{\{show_name\}\}/g, show.name)
    .replace(/\{\{your_name\}\}/g, profile.name)
    .replace(/\{\{your_title\}\}/g, profile.title)
    .replace(/\{\{your_main_link\}\}/g, profile.website || "");
}
