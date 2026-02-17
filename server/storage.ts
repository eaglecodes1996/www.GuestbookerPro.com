import { eq, and, desc, sql, ilike, or, ne, inArray } from "drizzle-orm";
import {
  users,
  profiles,
  shows,
  emailTemplates,
  outreachCampaigns,
  conversations,
  channelStats,
  appearanceImpact,
  type User,
  type Profile,
  type InsertProfile,
  type Show,
  type InsertShow,
  type EmailTemplate,
  type InsertEmailTemplate,
  type OutreachCampaign,
  type InsertOutreachCampaign,
  type Conversation,
  type InsertConversation,
  type ChannelStats,
  type InsertChannelStats,
  type AppearanceImpact,
  type InsertAppearanceImpact,
} from "@shared/schema";

import { db } from "./db";

export interface IStorage {
  // User management (Stripe integration)
  updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User | undefined>;
  
  // Profile management
  getAllProfiles(userId: string): Promise<Profile[]>;
  getActiveProfile(userId: string): Promise<Profile | undefined>;
  getProfile(userId: string, id?: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, id: string, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  setActiveProfile(userId: string, id: string): Promise<Profile | undefined>;
  deleteProfile(userId: string, id: string): Promise<void>;

  // Show management
  getAllShows(userId: string): Promise<Show[]>;
  getAllShowsPaginated(userId: string, limit: number, offset: number): Promise<{ shows: Show[], total: number }>;
  getShowById(userId: string, id: string): Promise<Show | undefined>;
  getShowsByStatus(userId: string, status: string): Promise<Show[]>;
  getShowsByStatusPaginated(userId: string, status: string, limit: number, offset: number): Promise<{ shows: Show[], total: number }>;
  searchShows(userId: string, query: string): Promise<Show[]>;
  searchShowsPaginated(userId: string, query: string, limit: number, offset: number): Promise<{ shows: Show[], total: number }>;
  createShow(userId: string, show: InsertShow): Promise<Show>;
  updateShow(userId: string, id: string, show: Partial<InsertShow>): Promise<Show | undefined>;
  deleteShow(userId: string, id: string): Promise<void>;
  findDuplicateShow(userId: string, channelId?: string, rssUrl?: string, name?: string): Promise<Show | undefined>;

  // Email template management (global, not user-scoped for now)
  getAllTemplates(): Promise<EmailTemplate[]>;
  getTemplateById(id: string): Promise<EmailTemplate | undefined>;
  getDefaultTemplate(): Promise<EmailTemplate | undefined>;
  createTemplate(template: InsertEmailTemplate): Promise<EmailTemplate>;
  updateTemplate(id: string, template: Partial<InsertEmailTemplate>): Promise<EmailTemplate | undefined>;
  deleteTemplate(id: string): Promise<void>;

  // Outreach campaigns
  getAllOutreachCampaigns(userId: string): Promise<OutreachCampaign[]>;
  getOutreachCampaignsByShow(userId: string, showId: string): Promise<OutreachCampaign[]>;
  getOutreachCampaignsToSend(userId: string): Promise<OutreachCampaign[]>;
  createOutreachCampaign(userId: string, campaign: InsertOutreachCampaign): Promise<OutreachCampaign>;
  updateOutreachCampaign(userId: string, id: string, campaign: Partial<InsertOutreachCampaign>): Promise<OutreachCampaign | undefined>;

  // Conversations
  getAllConversations(userId: string): Promise<Conversation[]>;
  getConversationByShowId(userId: string, showId: string): Promise<Conversation | undefined>;
  getConversationByThreadId(userId: string, threadId: string): Promise<Conversation | undefined>;
  createConversation(userId: string, conversation: InsertConversation): Promise<Conversation>;
  updateConversation(userId: string, id: string, conversation: Partial<InsertConversation>): Promise<Conversation | undefined>;

  // Channel Statistics
  getAllChannelStats(profileId: string): Promise<ChannelStats[]>;
  getLatestChannelStats(profileId: string): Promise<ChannelStats | undefined>;
  getChannelStatsByDate(profileId: string, date: string): Promise<ChannelStats | undefined>;
  createChannelStats(stats: InsertChannelStats): Promise<ChannelStats>;

  // Appearance Impact
  getAllAppearanceImpact(): Promise<AppearanceImpact[]>;
  getAppearanceImpactByShow(showId: string): Promise<AppearanceImpact | undefined>;
  createAppearanceImpact(impact: InsertAppearanceImpact): Promise<AppearanceImpact>;
  updateAppearanceImpact(id: string, impact: Partial<InsertAppearanceImpact>): Promise<AppearanceImpact | undefined>;
}

export class DbStorage implements IStorage {
  // User management (Stripe integration)
  async updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ 
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId 
      })
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }

  // Profile
  async getAllProfiles(userId: string): Promise<Profile[]> {
    return await db.select().from(profiles).where(eq(profiles.userId, userId)).orderBy(desc(profiles.createdAt));
  }

  async getActiveProfile(userId: string): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(and(eq(profiles.userId, userId), eq(profiles.isActive, true))).limit(1);
    return result[0];
  }

  async getProfile(userId: string, id?: string): Promise<Profile | undefined> {
    if (id) {
      const result = await db.select().from(profiles).where(and(eq(profiles.userId, userId), eq(profiles.id, id))).limit(1);
      return result[0];
    }
    // Fallback to active profile if no ID provided
    return this.getActiveProfile(userId);
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    // If this is the first profile or isActive is true, deactivate all others for this user
    if (profile.isActive && profile.userId) {
      await db.update(profiles).set({ isActive: false }).where(eq(profiles.userId, profile.userId));
    }
    
    const result = await db.insert(profiles).values(profile).returning();
    return result[0];
  }

  async updateProfile(userId: string, id: string, profile: Partial<InsertProfile>): Promise<Profile | undefined> {
    // If setting this profile as active, deactivate all others for this user
    if (profile.isActive) {
      await db.update(profiles).set({ isActive: false }).where(and(eq(profiles.userId, userId), ne(profiles.id, id)));
    }
    
    const result = await db.update(profiles).set(profile).where(and(eq(profiles.userId, userId), eq(profiles.id, id))).returning();
    return result[0];
  }

  async setActiveProfile(userId: string, id: string): Promise<Profile | undefined> {
    // Deactivate all profiles for this user
    await db.update(profiles).set({ isActive: false }).where(eq(profiles.userId, userId));
    // Activate the selected profile for this user
    const result = await db.update(profiles).set({ isActive: true }).where(and(eq(profiles.userId, userId), eq(profiles.id, id))).returning();
    return result[0];
  }

  async deleteProfile(userId: string, id: string): Promise<void> {
    await db.delete(profiles).where(and(eq(profiles.userId, userId), eq(profiles.id, id)));
  }

  // Shows
  async getAllShows(userId: string): Promise<Show[]> {
    // Filter by active profile for this user
    const activeProfile = await this.getActiveProfile(userId);
    if (!activeProfile) return [];
    
    return await db.select().from(shows)
      .where(eq(shows.profileId, activeProfile.id))
      .orderBy(desc(shows.createdAt));
  }

  async getAllShowsPaginated(userId: string, limit: number, offset: number, sortBy?: string): Promise<{ shows: Show[], total: number }> {
    // Filter by active profile for this user and exclude "not_interested" shows
    const activeProfile = await this.getActiveProfile(userId);
    if (!activeProfile) return { shows: [], total: 0 };
    
    const whereClause = and(
      eq(shows.profileId, activeProfile.id),
      ne(shows.status, 'not_interested')
    );
    
    // Determine sort column based on sortBy parameter
    let orderByClause;
    switch (sortBy) {
      case 'subscribers':
        orderByClause = desc(shows.subscribers);
        break;
      case 'averageViews':
        orderByClause = desc(shows.averageViews);
        break;
      case 'lastEpisodeDate':
        orderByClause = desc(shows.lastEpisodeDate);
        break;
      case 'guestScore':
        orderByClause = desc(shows.guestScore);
        break;
      default:
        orderByClause = desc(shows.createdAt);
    }

    const [showsData, countResult] = await Promise.all([
      db.select().from(shows).where(whereClause).orderBy(orderByClause).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(shows).where(whereClause)
    ]);
    
    return {
      shows: showsData,
      total: Number(countResult[0]?.count || 0)
    };
  }

  async getShowById(userId: string, id: string): Promise<Show | undefined> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return undefined;
    
    const result = await db.select().from(shows)
      .where(and(eq(shows.id, id), inArray(shows.profileId, profileIds)))
      .limit(1);
    return result[0];
  }

  async getShowsByStatus(userId: string, status: string): Promise<Show[]> {
    const activeProfile = await this.getActiveProfile(userId);
    if (!activeProfile) return [];
    
    return await db.select().from(shows)
      .where(and(
        eq(shows.profileId, activeProfile.id),
        eq(shows.status, status)
      ))
      .orderBy(desc(shows.createdAt));
  }

  async getShowsByStatusPaginated(userId: string, status: string, limit: number, offset: number, sortBy?: string): Promise<{ shows: Show[], total: number }> {
    const activeProfile = await this.getActiveProfile(userId);
    if (!activeProfile) return { shows: [], total: 0 };
    
    const whereClause = and(
      eq(shows.profileId, activeProfile.id),
      eq(shows.status, status)
    );
    
    // Determine sort column based on sortBy parameter
    let orderByClause;
    switch (sortBy) {
      case 'subscribers':
        orderByClause = desc(shows.subscribers);
        break;
      case 'averageViews':
        orderByClause = desc(shows.averageViews);
        break;
      case 'lastEpisodeDate':
        orderByClause = desc(shows.lastEpisodeDate);
        break;
      case 'guestScore':
        orderByClause = desc(shows.guestScore);
        break;
      default:
        orderByClause = desc(shows.createdAt);
    }
    
    const [showsData, countResult] = await Promise.all([
      db.select().from(shows).where(whereClause).orderBy(orderByClause).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(shows).where(whereClause)
    ]);
    
    return {
      shows: showsData,
      total: Number(countResult[0]?.count || 0)
    };
  }

  async searchShows(userId: string, query: string): Promise<Show[]> {
    const activeProfile = await this.getActiveProfile(userId);
    if (!activeProfile) return [];
    
    return await db
      .select()
      .from(shows)
      .where(
        and(
          eq(shows.profileId, activeProfile.id),
          or(
            ilike(shows.name, `%${query}%`),
            ilike(shows.host, `%${query}%`),
            ilike(shows.description, `%${query}%`)
          )
        )
      )
      .orderBy(desc(shows.createdAt));
  }

  async searchShowsPaginated(userId: string, query: string, limit: number, offset: number, sortBy?: string): Promise<{ shows: Show[], total: number }> {
    const activeProfile = await this.getActiveProfile(userId);
    if (!activeProfile) return { shows: [], total: 0 };
    
    // Filter by profile and exclude "not_interested" shows from search results
    const whereClause = and(
      eq(shows.profileId, activeProfile.id),
      or(
        ilike(shows.name, `%${query}%`),
        ilike(shows.host, `%${query}%`),
        ilike(shows.description, `%${query}%`)
      ),
      ne(shows.status, 'not_interested')
    );
    
    // Determine sort column based on sortBy parameter
    let orderByClause;
    switch (sortBy) {
      case 'subscribers':
        orderByClause = desc(shows.subscribers);
        break;
      case 'averageViews':
        orderByClause = desc(shows.averageViews);
        break;
      case 'lastEpisodeDate':
        orderByClause = desc(shows.lastEpisodeDate);
        break;
      case 'guestScore':
        orderByClause = desc(shows.guestScore);
        break;
      default:
        orderByClause = desc(shows.createdAt);
    }
    
    const [showsData, countResult] = await Promise.all([
      db.select().from(shows).where(whereClause).orderBy(orderByClause).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(shows).where(whereClause)
    ]);
    
    return {
      shows: showsData,
      total: Number(countResult[0]?.count || 0)
    };
  }

  async createShow(userId: string, show: InsertShow): Promise<Show> {
    // Get active profile for this user to use as profileId if not provided
    if (!show.profileId) {
      const activeProfile = await this.getActiveProfile(userId);
      if (!activeProfile) {
        throw new Error("No active profile found for user");
      }
      show.profileId = activeProfile.id;
    } else {
      // Verify the profileId belongs to this user
      const profile = await this.getProfile(userId, show.profileId);
      if (!profile) {
        throw new Error("Profile does not belong to user");
      }
    }
    
    const result = await db.insert(shows).values(show).returning();
    return result[0];
  }

  async updateShow(userId: string, id: string, show: Partial<InsertShow>): Promise<Show | undefined> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return undefined;
    
    const result = await db
      .update(shows)
      .set({ ...show, updatedAt: new Date() })
      .where(and(eq(shows.id, id), inArray(shows.profileId, profileIds)))
      .returning();
    return result[0];
  }

  async deleteShow(userId: string, id: string): Promise<void> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return;
    
    await db.delete(shows).where(and(eq(shows.id, id), inArray(shows.profileId, profileIds)));
  }

  async findDuplicateShow(userId: string, channelId?: string, rssUrl?: string, name?: string): Promise<Show | undefined> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return undefined;
    
    // Strong match: YouTube channel ID or URL (exact duplicate)
    if (channelId) {
      // Check by channel ID
      const resultById = await db.select().from(shows)
        .where(and(eq(shows.youtubeChannelId, channelId), inArray(shows.profileId, profileIds)))
        .limit(1);
      if (resultById[0]) {
        console.log(`🔍 Duplicate found by YouTube channel ID: ${channelId}`);
        return resultById[0];
      }
      
      // Also check by channel URL (in case channelId is actually a URL)
      const resultByUrl = await db.select().from(shows)
        .where(and(eq(shows.youtubeChannelUrl, channelId), inArray(shows.profileId, profileIds)))
        .limit(1);
      if (resultByUrl[0]) {
        console.log(`🔍 Duplicate found by YouTube channel URL: ${channelId}`);
        return resultByUrl[0];
      }
    }
    
    // Strong match: RSS URL (exact duplicate)
    if (rssUrl) {
      const result = await db.select().from(shows)
        .where(and(eq(shows.podcastRssUrl, rssUrl), inArray(shows.profileId, profileIds)))
        .limit(1);
      if (result[0]) {
        console.log(`🔍 Duplicate found by RSS URL: ${rssUrl}`);
        return result[0];
      }
    }
    
    // Weak match: Name only (skip name-only checks to avoid false positives)
    // Names can be similar but shows can be different
    // We'll only check name if user explicitly enables strict duplicate checking
    
    return undefined;
  }

  // Email Templates
  async getAllTemplates(): Promise<EmailTemplate[]> {
    return await db.select().from(emailTemplates).orderBy(desc(emailTemplates.createdAt));
  }

  async getTemplateById(id: string): Promise<EmailTemplate | undefined> {
    const result = await db.select().from(emailTemplates).where(eq(emailTemplates.id, id)).limit(1);
    return result[0];
  }

  async getDefaultTemplate(): Promise<EmailTemplate | undefined> {
    const result = await db.select().from(emailTemplates).where(eq(emailTemplates.isDefault, true)).limit(1);
    return result[0];
  }

  async createTemplate(template: InsertEmailTemplate): Promise<EmailTemplate> {
    const result = await db.insert(emailTemplates).values(template).returning();
    return result[0];
  }

  async updateTemplate(id: string, template: Partial<InsertEmailTemplate>): Promise<EmailTemplate | undefined> {
    const result = await db
      .update(emailTemplates)
      .set({ ...template, updatedAt: new Date() })
      .where(eq(emailTemplates.id, id))
      .returning();
    return result[0];
  }

  async deleteTemplate(id: string): Promise<void> {
    await db.delete(emailTemplates).where(eq(emailTemplates.id, id));
  }

  // Outreach Campaigns
  async getAllOutreachCampaigns(userId: string): Promise<OutreachCampaign[]> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return [];
    
    // Get all show IDs for these profiles
    const userShows = await db.select({ id: shows.id }).from(shows).where(inArray(shows.profileId, profileIds));
    const showIds = userShows.map(s => s.id);
    
    if (showIds.length === 0) return [];
    
    return await db.select().from(outreachCampaigns)
      .where(inArray(outreachCampaigns.showId, showIds))
      .orderBy(desc(outreachCampaigns.createdAt));
  }

  async getOutreachCampaignsByShow(userId: string, showId: string): Promise<OutreachCampaign[]> {
    // Verify the show belongs to this user
    const show = await this.getShowById(userId, showId);
    if (!show) return [];
    
    return await db
      .select()
      .from(outreachCampaigns)
      .where(eq(outreachCampaigns.showId, showId))
      .orderBy(desc(outreachCampaigns.createdAt));
  }

  async getOutreachCampaignsToSend(userId: string): Promise<OutreachCampaign[]> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return [];
    
    // Get all show IDs for these profiles
    const userShows = await db.select({ id: shows.id }).from(shows).where(inArray(shows.profileId, profileIds));
    const showIds = userShows.map(s => s.id);
    
    if (showIds.length === 0) return [];
    
    return await db
      .select()
      .from(outreachCampaigns)
      .where(and(eq(outreachCampaigns.status, "pending"), inArray(outreachCampaigns.showId, showIds)))
      .orderBy(outreachCampaigns.createdAt);
  }

  async createOutreachCampaign(userId: string, campaign: InsertOutreachCampaign): Promise<OutreachCampaign> {
    // Verify the show belongs to this user
    const show = await this.getShowById(userId, campaign.showId);
    if (!show) {
      throw new Error("Show does not belong to user");
    }
    
    const result = await db.insert(outreachCampaigns).values(campaign).returning();
    return result[0];
  }

  async updateOutreachCampaign(
    userId: string,
    id: string,
    campaign: Partial<InsertOutreachCampaign>
  ): Promise<OutreachCampaign | undefined> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return undefined;
    
    // Get all show IDs for these profiles
    const userShows = await db.select({ id: shows.id }).from(shows).where(inArray(shows.profileId, profileIds));
    const showIds = userShows.map(s => s.id);
    
    if (showIds.length === 0) return undefined;
    
    const result = await db.update(outreachCampaigns)
      .set(campaign)
      .where(and(eq(outreachCampaigns.id, id), inArray(outreachCampaigns.showId, showIds)))
      .returning();
    return result[0];
  }

  // Conversations
  async getAllConversations(userId: string): Promise<Conversation[]> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return [];
    
    // Get all show IDs for these profiles
    const userShows = await db.select({ id: shows.id }).from(shows).where(inArray(shows.profileId, profileIds));
    const showIds = userShows.map(s => s.id);
    
    if (showIds.length === 0) return [];
    
    return await db.select().from(conversations)
      .where(inArray(conversations.showId, showIds))
      .orderBy(desc(conversations.lastMessageAt));
  }

  async getConversationByShowId(userId: string, showId: string): Promise<Conversation | undefined> {
    // Verify the show belongs to this user
    const show = await this.getShowById(userId, showId);
    if (!show) return undefined;
    
    const result = await db.select().from(conversations).where(eq(conversations.showId, showId)).limit(1);
    return result[0];
  }

  async getConversationByThreadId(userId: string, threadId: string): Promise<Conversation | undefined> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return undefined;
    
    // Get all show IDs for these profiles
    const userShows = await db.select({ id: shows.id }).from(shows).where(inArray(shows.profileId, profileIds));
    const showIds = userShows.map(s => s.id);
    
    if (showIds.length === 0) return undefined;
    
    const result = await db.select().from(conversations)
      .where(and(eq(conversations.gmailThreadId, threadId), inArray(conversations.showId, showIds)))
      .limit(1);
    return result[0];
  }

  async createConversation(userId: string, conversation: InsertConversation): Promise<Conversation> {
    // Verify the show belongs to this user
    const show = await this.getShowById(userId, conversation.showId);
    if (!show) {
      throw new Error("Show does not belong to user");
    }
    
    const result = await db.insert(conversations).values(conversation).returning();
    return result[0];
  }

  async updateConversation(userId: string, id: string, conversation: Partial<InsertConversation>): Promise<Conversation | undefined> {
    // Get all profile IDs for this user
    const userProfiles = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.userId, userId));
    const profileIds = userProfiles.map(p => p.id);
    
    if (profileIds.length === 0) return undefined;
    
    // Get all show IDs for these profiles
    const userShows = await db.select({ id: shows.id }).from(shows).where(inArray(shows.profileId, profileIds));
    const showIds = userShows.map(s => s.id);
    
    if (showIds.length === 0) return undefined;
    
    const result = await db
      .update(conversations)
      .set({ ...conversation, updatedAt: new Date() })
      .where(and(eq(conversations.id, id), inArray(conversations.showId, showIds)))
      .returning();
    return result[0];
  }

  // Channel Statistics
  async getAllChannelStats(profileId: string): Promise<ChannelStats[]> {
    return await db
      .select()
      .from(channelStats)
      .where(eq(channelStats.profileId, profileId))
      .orderBy(desc(channelStats.date));
  }

  async getLatestChannelStats(profileId: string): Promise<ChannelStats | undefined> {
    const result = await db
      .select()
      .from(channelStats)
      .where(eq(channelStats.profileId, profileId))
      .orderBy(desc(channelStats.date))
      .limit(1);
    return result[0];
  }

  async getChannelStatsByDate(profileId: string, date: string): Promise<ChannelStats | undefined> {
    const result = await db
      .select()
      .from(channelStats)
      .where(and(eq(channelStats.profileId, profileId), eq(channelStats.date, date)))
      .limit(1);
    return result[0];
  }

  async createChannelStats(stats: InsertChannelStats): Promise<ChannelStats> {
    const result = await db.insert(channelStats).values(stats).returning();
    return result[0];
  }

  // Appearance Impact
  async getAllAppearanceImpact(): Promise<AppearanceImpact[]> {
    return await db.select().from(appearanceImpact).orderBy(desc(appearanceImpact.createdAt));
  }

  async getAppearanceImpactByShow(showId: string): Promise<AppearanceImpact | undefined> {
    const result = await db
      .select()
      .from(appearanceImpact)
      .where(eq(appearanceImpact.showId, showId))
      .limit(1);
    return result[0];
  }

  async createAppearanceImpact(impact: InsertAppearanceImpact): Promise<AppearanceImpact> {
    const result = await db.insert(appearanceImpact).values(impact).returning();
    return result[0];
  }

  async updateAppearanceImpact(
    id: string,
    impact: Partial<InsertAppearanceImpact>
  ): Promise<AppearanceImpact | undefined> {
    const result = await db
      .update(appearanceImpact)
      .set(impact)
      .where(eq(appearanceImpact.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DbStorage();
