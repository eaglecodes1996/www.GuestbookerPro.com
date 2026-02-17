import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users (accounts with subscription tiers)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  emailVerified: boolean("email_verified").notNull().default(false), // Email verification status
  emailVerificationToken: text("email_verification_token"), // Token for email verification
  emailVerificationExpires: timestamp("email_verification_expires"), // Verification link expires after 24 hours
  subscriptionTier: text("subscription_tier").notNull().default("basic"), // basic, growth, pro, agency, admin
  referredByAffiliateId: text("referred_by_affiliate_id"), // Affiliate who referred this user
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  maxProfiles: integer("max_profiles").notNull().default(1),
  maxDiscoveryPerMonth: integer("max_discovery_per_month").notNull().default(500),
  maxEmailsPerMonth: integer("max_emails_per_month").notNull().default(999999), // Unlimited for all tiers
  discoveryUsedThisMonth: integer("discovery_used_this_month").notNull().default(0),
  emailsUsedThisMonth: integer("emails_used_this_month").notNull().default(0),
  deepResearchQuota: integer("deep_research_quota").notNull().default(5), // Monthly quota for AI Deep Research
  deepResearchUsed: integer("deep_research_used").notNull().default(0), // Deep research calls used this month
  lastResetAt: timestamp("last_reset_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  lastResetAt: true,
  subscriptionTier: true,
  referredByAffiliateId: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
  maxProfiles: true,
  maxDiscoveryPerMonth: true,
  maxEmailsPerMonth: true,
  discoveryUsedThisMonth: true,
  emailsUsedThisMonth: true,
  deepResearchQuota: true,
  deepResearchUsed: true,
  emailVerified: true,
  emailVerificationToken: true,
  emailVerificationExpires: true,
}).extend({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .refine(
      (password) => {
        // Check against common weak passwords
        const commonPasswords = ['password', 'admin', '12345678', 'qwerty', 'letmein'];
        return !commonPasswords.some(weak => password.toLowerCase().includes(weak));
      },
      "Password is too common or weak"
    ),
  email: z.string().email("Invalid email address"), // Email is now REQUIRED
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Session table (managed by connect-pg-simple, defined here for Drizzle awareness)
export const sessions = pgTable("session", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

// Password Reset Tokens
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(), // Secure random token
  expiresAt: timestamp("expires_at").notNull(), // Tokens expire after 1 hour
  used: boolean("used").notNull().default(false), // Prevent token reuse
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPasswordResetTokenSchema = createInsertSchema(passwordResetTokens).omit({ 
  id: true, 
  createdAt: true,
  used: true,
});
export type InsertPasswordResetToken = z.infer<typeof insertPasswordResetTokenSchema>;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;

// Processed Payment Sessions (prevent replay attacks)
export const processedPaymentSessions = pgTable("processed_payment_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull().unique(), // Stripe session ID
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(), // Number of credits purchased
  amount: integer("amount").notNull(), // Amount paid in cents
  processedAt: timestamp("processed_at").defaultNow(),
});

export const insertProcessedPaymentSessionSchema = createInsertSchema(processedPaymentSessions).omit({ id: true, processedAt: true });
export type InsertProcessedPaymentSession = z.infer<typeof insertProcessedPaymentSessionSchema>;
export type ProcessedPaymentSession = typeof processedPaymentSessions.$inferSelect;

// User Profile
export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  profileType: text("profile_type").notNull().default("guest"), // "guest" or "influencer"
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio"),
  website: text("website"),
  topics: text("topics").array().notNull().default(sql`ARRAY[]::text[]`),
  keywords: text("keywords").array().notNull().default(sql`ARRAY[]::text[]`), // Filtering keywords (Shamanism, Energy Clearing, etc.)
  userChannelId: text("user_channel_id"), // User's own YouTube channel ID for growth tracking
  fromEmail: text("from_email"),
  minSubscribers: integer("min_subscribers").default(800),
  minEpisodes: integer("min_episodes").default(10),
  guestOnlyShows: boolean("guest_only_shows").default(true),
  activeOnlyShows: boolean("active_only_shows").default(true),
  targetShowCount: integer("target_show_count").default(20),
  maxChannelsToSearch: integer("max_channels_to_search").default(200),
  maxFollowups: integer("max_followups").default(2),
  followupDelay: integer("followup_delay").default(7),
  maxDailyOutreach: integer("max_daily_outreach").default(20),
  isActive: boolean("is_active").default(false), // Only one profile can be active at a time
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({ id: true, userId: true, createdAt: true }).extend({
  profileType: z.enum(["guest", "influencer"]).default("guest"),
});
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

// Shows (Podcasts/YouTube channels)
export const shows = pgTable("shows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  host: text("host"),
  description: text("description"),
  platform: text("platform").notNull(), // 'youtube', 'podcast', 'both'
  youtubeChannelId: text("youtube_channel_id"),
  youtubeChannelUrl: text("youtube_channel_url"),
  podcastRssUrl: text("podcast_rss_url"),
  websiteUrl: text("website_url"),
  contactFormUrl: text("contact_form_url"),
  thumbnailUrl: text("thumbnail_url"),
  subscribers: integer("subscribers"),
  averageViews: integer("average_views"), // Average views per video (for ranking by engagement)
  episodeCount: integer("episode_count"),
  lastEpisodeDate: text("last_episode_date"),
  contactEmail: text("contact_email"),
  guestScore: integer("guest_score"), // 0-100 likelihood of featuring guests
  topicMatchScore: integer("topic_match_score"), // 0-100 relevance to user topics
  status: text("status").notNull().default("discovered"), // discovered, qualified, pitched, followup, responded, booked, published, not_interested
  notes: text("notes"),
  bookingDate: text("booking_date"), // Date the interview was booked
  recordingDate: text("recording_date"), // Date the interview was/will be recorded
  publicationDate: text("publication_date"), // Date the episode was/will be published
  streamingLink: text("streaming_link"), // Link to the published episode
  flaggedForReview: boolean("flagged_for_review").default(false), // Admin review flag
  flagReason: text("flag_reason"), // Reason for flagging (e.g., "Multiple bounced emails from different users")
  lastBounceDate: timestamp("last_bounce_date"), // Most recent bounce timestamp
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertShowSchema = createInsertSchema(shows).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertShow = z.infer<typeof insertShowSchema>;
export type Show = typeof shows.$inferSelect;

// Email Templates
export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;

// Outreach Campaigns (emails sent to shows)
export const outreachCampaigns = pgTable("outreach_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  showId: varchar("show_id").notNull().references(() => shows.id, { onDelete: "cascade" }),
  templateId: varchar("template_id").references(() => emailTemplates.id),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  toEmail: text("to_email").notNull(),
  status: text("status").notNull().default("pending"), // pending, sent, replied, bounced, failed
  sentAt: timestamp("sent_at"),
  bouncedAt: timestamp("bounced_at"), // Set ONLY when status transitions to "bounced"
  followupNumber: integer("followup_number").default(0), // 0 = initial, 1+ = follow-ups
  gmailMessageId: text("gmail_message_id"),
  gmailThreadId: text("gmail_thread_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertOutreachCampaignSchema = createInsertSchema(outreachCampaigns).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOutreachCampaign = z.infer<typeof insertOutreachCampaignSchema>;
export type OutreachCampaign = typeof outreachCampaigns.$inferSelect;

// Conversations (email threads with show hosts)
export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  showId: varchar("show_id").notNull().references(() => shows.id, { onDelete: "cascade" }),
  gmailThreadId: text("gmail_thread_id").notNull(),
  messages: jsonb("messages").notNull().default('[]'), // Array of message objects
  sentiment: text("sentiment"), // 'positive', 'neutral', 'negative'
  lastMessageAt: timestamp("last_message_at"),
  unread: boolean("unread").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

// Channel Statistics (YouTube growth tracking)
export const channelStats = pgTable("channel_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  date: text("date").notNull(), // YYYY-MM-DD format for easy grouping
  subscribers: integer("subscribers").notNull(),
  totalViews: integer("total_views").notNull(),
  videoCount: integer("video_count").notNull(),
  avgViewsPerVideo: integer("avg_views_per_video"), // Calculated: totalViews / videoCount
  totalLikes: integer("total_likes"),
  totalComments: integer("total_comments"),
  engagementRate: integer("engagement_rate"), // Calculated: (likes + comments) / totalViews * 10000 (basis points)
  fetchedAt: timestamp("fetched_at").defaultNow(),
});

export const insertChannelStatsSchema = createInsertSchema(channelStats).omit({ id: true, fetchedAt: true });
export type InsertChannelStats = z.infer<typeof insertChannelStatsSchema>;
export type ChannelStats = typeof channelStats.$inferSelect;

// Appearance Impact (correlates guest bookings with channel growth)
export const appearanceImpact = pgTable("appearance_impact", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  showId: varchar("show_id").notNull().references(() => shows.id, { onDelete: "cascade" }),
  preSnapshotId: varchar("pre_snapshot_id").references(() => channelStats.id), // Stats before appearance
  postSnapshotId: varchar("post_snapshot_id").references(() => channelStats.id), // Stats after appearance
  subscriberGain: integer("subscriber_gain"), // Calculated difference
  viewGain: integer("view_gain"), // Calculated difference
  impactScore: integer("impact_score"), // 0-100 score of overall impact
  roiNarrative: text("roi_narrative"), // Auto-generated description of impact
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppearanceImpactSchema = createInsertSchema(appearanceImpact).omit({ id: true, createdAt: true });
export type InsertAppearanceImpact = z.infer<typeof insertAppearanceImpactSchema>;
export type AppearanceImpact = typeof appearanceImpact.$inferSelect;

// Research Requests (AI-powered structured research queries)
export const researchRequests = pgTable("research_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  query: text("query").notNull(), // Original user query (e.g., "List 1,000 New Age YouTube channels with emails")
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  results: jsonb("results"), // Structured JSON results
  resultCount: integer("result_count").default(0), // Number of results returned
  tokensUsed: integer("tokens_used").default(0), // Total tokens used
  estimatedCost: integer("estimated_cost").default(0), // Cost in cents
  errorMessage: text("error_message"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResearchRequestSchema = createInsertSchema(researchRequests).omit({ id: true, createdAt: true });
export type InsertResearchRequest = z.infer<typeof insertResearchRequestSchema>;
export type ResearchRequest = typeof researchRequests.$inferSelect;

// API Usage Tracking (OpenAI token usage and cost tracking)
export const apiUsage = pgTable("api_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  endpoint: text("endpoint").notNull(), // API endpoint that made the call
  model: text("model").notNull(), // OpenAI model used (gpt-4o, gpt-4o-mini, etc.)
  promptTokens: integer("prompt_tokens").notNull().default(0),
  completionTokens: integer("completion_tokens").notNull().default(0),
  totalTokens: integer("total_tokens").notNull().default(0),
  estimatedCost: integer("estimated_cost").notNull().default(0), // Cost in cents
  requestType: text("request_type").notNull(), // research, discovery, email_generation, etc.
  success: boolean("success").notNull().default(true),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertApiUsageSchema = createInsertSchema(apiUsage).omit({ id: true, createdAt: true });
export type InsertApiUsage = z.infer<typeof insertApiUsageSchema>;
export type ApiUsage = typeof apiUsage.$inferSelect;

// System Templates (admin-editable welcome emails and invoices)
export const systemTemplates = pgTable("system_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateType: text("template_type").notNull(), // "welcome_email", "invoice"
  name: text("name").notNull(), // Display name for admin UI
  subject: text("subject"), // For email templates
  body: text("body").notNull(), // Template content with {{token}} placeholders
  isActive: boolean("is_active").notNull().default(true),
  updatedBy: varchar("updated_by").references(() => users.id), // Admin who last edited
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSystemTemplateSchema = createInsertSchema(systemTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSystemTemplate = z.infer<typeof insertSystemTemplateSchema>;
export type SystemTemplate = typeof systemTemplates.$inferSelect;

// Affiliates (users who earn commissions for referrals)
export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }), // Optional: affiliate may or may not be a customer
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  referralId: text("referral_id").notNull().unique(), // e.g. AFF12345
  commissionRate: integer("commission_rate").notNull().default(20), // 20, 25, or 30 percent
  paypalEmail: text("paypal_email"), // For payouts
  clicks: integer("clicks").notNull().default(0),
  signups: integer("signups").notNull().default(0),
  activeSubscribers: integer("active_subscribers").notNull().default(0),
  totalCommissionEarned: integer("total_commission_earned").notNull().default(0), // In cents
  totalCommissionPaid: integer("total_commission_paid").notNull().default(0), // In cents
  pendingBalance: integer("pending_balance").notNull().default(0), // In cents
  status: text("status").notNull().default("active"), // active, suspended
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({ id: true, createdAt: true, clicks: true, signups: true, activeSubscribers: true, totalCommissionEarned: true, totalCommissionPaid: true, pendingBalance: true });
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliates.$inferSelect;

// Referred Users (tracks which users were referred by which affiliate)
export const referredUsers = pgTable("referred_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  affiliateId: varchar("affiliate_id").notNull().references(() => affiliates.id, { onDelete: "cascade" }),
  subscriptionStatus: text("subscription_status").notNull().default("pending"), // pending, trial, active, canceled
  monthlyPrice: integer("monthly_price").notNull().default(0), // In cents
  commissionRate: integer("commission_rate").notNull().default(20), // Commission rate at time of signup
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReferredUserSchema = createInsertSchema(referredUsers).omit({ id: true, createdAt: true });
export type InsertReferredUser = z.infer<typeof insertReferredUserSchema>;
export type ReferredUser = typeof referredUsers.$inferSelect;

// Commissions (ledger of all commission payments)
export const commissions = pgTable("commissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  affiliateId: varchar("affiliate_id").notNull().references(() => affiliates.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // In cents
  month: text("month").notNull(), // e.g. "2025-01"
  status: text("status").notNull().default("pending"), // pending, payable, paid
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCommissionSchema = createInsertSchema(commissions).omit({ id: true, createdAt: true });
export type InsertCommission = z.infer<typeof insertCommissionSchema>;
export type Commission = typeof commissions.$inferSelect;

// Affiliate Payouts (record of all payouts made to affiliates)
export const affiliatePayouts = pgTable("affiliate_payouts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  affiliateId: varchar("affiliate_id").notNull().references(() => affiliates.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // In cents
  paymentMethod: text("payment_method").notNull(), // paypal, wise, stripe_connect
  paymentDetails: text("payment_details"), // Account email/ID
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAffiliatePayoutSchema = createInsertSchema(affiliatePayouts).omit({ id: true, createdAt: true, processedAt: true });
export type InsertAffiliatePayout = z.infer<typeof insertAffiliatePayoutSchema>;
export type AffiliatePayout = typeof affiliatePayouts.$inferSelect;

// Pricing Plans (dynamic subscription pricing)
export const pricingPlans = pgTable("pricing_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tier: text("tier").notNull().unique(), // basic, growth, pro, agency
  displayName: text("display_name").notNull(), // "Basic", "Growth", "Pro", "Agency"
  monthlyPriceUSD: integer("monthly_price_usd").notNull(), // Price in cents (e.g., 2999 = $29.99)
  yearlyPriceUSD: integer("yearly_price_usd").notNull(), // Price in cents with discount
  stripePriceIdMonthly: text("stripe_price_id_monthly"), // Stripe Price ID for monthly billing
  stripePriceIdYearly: text("stripe_price_id_yearly"), // Stripe Price ID for yearly billing
  maxProfiles: integer("max_profiles").notNull().default(1),
  maxDiscoveryPerMonth: integer("max_discovery_per_month").notNull().default(100),
  maxEmailsPerMonth: integer("max_emails_per_month").notNull().default(100),
  deepResearchQuota: integer("deep_research_quota").notNull().default(5),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`), // List of features for display
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0), // Display order (0 = first)
  updatedBy: varchar("updated_by").references(() => users.id), // Admin who last updated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPricingPlanSchema = createInsertSchema(pricingPlans).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPricingPlan = z.infer<typeof insertPricingPlanSchema>;
export type PricingPlan = typeof pricingPlans.$inferSelect;

// Relations
export const outreachCampaignsRelations = relations(outreachCampaigns, ({ one }) => ({
  profile: one(profiles, {
    fields: [outreachCampaigns.profileId],
    references: [profiles.id],
  }),
}));

export const profilesRelations = relations(profiles, ({ many }) => ({
  outreachCampaigns: many(outreachCampaigns),
}));
