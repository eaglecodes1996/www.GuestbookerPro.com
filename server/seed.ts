import { storage } from "./storage";
import { db } from "./db";
import { users, profiles, pricingPlans, systemTemplates } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function seedDatabase() {
  try {
    // First, ensure admin user exists
    let adminUser = await db.query.users.findFirst({
      where: eq(users.username, "admin"),
    });

    // Use environment variable for admin password (fallback to "admin" for development only)
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";
    
    if (adminPassword === "admin" && process.env.NODE_ENV === "production") {
      console.error("⚠️  WARNING: Using default admin password in production! Set ADMIN_PASSWORD environment variable!");
    }
    
    // Hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (!adminUser) {
      // Create admin user with unlimited access
      const [newAdmin] = await db.insert(users).values({
        username: "admin",
        password: hashedPassword,
        email: "admin@guestbooker.com",
        emailVerified: true, // Admin email is pre-verified
        subscriptionTier: "unlimited",
        maxProfiles: 999999,
        maxDiscoveryPerMonth: 999999,
        maxEmailsPerMonth: 999999,
      }).returning();
      adminUser = newAdmin;
      
      if (adminPassword === "admin") {
        console.log("⚠️  Created admin user with DEFAULT PASSWORD (admin/admin) - CHANGE THIS IMMEDIATELY!");
      } else {
        console.log("✅ Created admin user with secure password from ADMIN_PASSWORD env var");
      }
    } else {
      // Admin user exists - update password to match current env var
      await db.update(users)
        .set({ 
          password: hashedPassword,
          emailVerified: true, // Ensure admin email is verified
        })
        .where(eq(users.username, "admin"));
      
      if (adminPassword === "admin") {
        console.log("⚠️  Admin user password RESET to DEFAULT (admin/admin) - CHANGE THIS IMMEDIATELY!");
      } else {
        console.log("✅ Admin user password updated from ADMIN_PASSWORD env var");
      }
    }

    // Check if profile exists for admin
    let profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, adminUser.id),
    });
    
    if (!profile) {
      // Create default profile for admin
      const [newProfile] = await db.insert(profiles).values({
        userId: adminUser.id,
        name: "Benton Ryer",
        title: "Shaman in the Japanese Shinto tradition",
        bio: "I specialize in spiritual healing and esoteric practices rooted in the Japanese Shinto tradition.",
        website: "https://esotericshinto.com",
        topics: ["Shinto", "Spiritual Healing", "Occult", "New Age", "Esoteric Traditions"],
        fromEmail: "admin@esotericshinto.com",
        minSubscribers: 800,
        minEpisodes: 10,
        guestOnlyShows: true,
        activeOnlyShows: true,
        maxFollowups: 2,
        followupDelay: 7,
        maxDailyOutreach: 20,
        isActive: true,
      }).returning();
      profile = newProfile;
      console.log("✅ Created default profile for admin");
    }

    // Create default email template
    const templates = await storage.getAllTemplates();
    if (templates.length === 0) {
      await storage.createTemplate({
        name: "Default Outreach",
        subject: "Potential guest for {{show_name}}",
        body: `Hello {{host_name}},

My name is {{your_name}}, and I'm {{your_title}}. I've been following {{show_name}} and I'm impressed by the quality of conversations you have with your guests.

I believe I could bring value to your audience by sharing insights about my work in spiritual healing and esoteric practices from the Japanese Shinto tradition. You can learn more about my background here: {{your_main_link}}

Would you be open to having me as a guest on your show?

Best regards,
{{your_name}}`,
        isDefault: true,
      });
      console.log("✅ Created default email template");
    }

    // No sample shows - user will discover real shows via YouTube API
    console.log("ℹ️ No sample shows created - ready for real discovery");

    // Seed pricing plans
    const existingPlans = await db.select().from(pricingPlans);
    if (existingPlans.length === 0) {
      await db.insert(pricingPlans).values([
        {
          tier: "basic",
          displayName: "Basic",
          monthlyPriceUSD: 2999, // $29.99
          yearlyPriceUSD: 32389, // $323.89 (10% discount)
          maxProfiles: 1,
          maxDiscoveryPerMonth: 100,
          maxEmailsPerMonth: 100,
          deepResearchQuota: 5,
          features: [
            "1 Profile",
            "100 Show Discoveries/month",
            "100 Email Outreach/month",
            "5 AI Deep Research/month",
            "Email Templates",
            "Basic Analytics"
          ],
          isActive: true,
          sortOrder: 0,
        },
        {
          tier: "growth",
          displayName: "Growth",
          monthlyPriceUSD: 5900, // $59.00
          yearlyPriceUSD: 63720, // $637.20 (10% discount)
          maxProfiles: 3,
          maxDiscoveryPerMonth: 500,
          maxEmailsPerMonth: 500,
          deepResearchQuota: 15,
          features: [
            "3 Profiles",
            "500 Show Discoveries/month",
            "500 Email Outreach/month",
            "15 AI Deep Research/month",
            "Advanced Email Templates",
            "Priority Support",
            "Enhanced Analytics"
          ],
          isActive: true,
          sortOrder: 1,
        },
        {
          tier: "pro",
          displayName: "Pro",
          monthlyPriceUSD: 9900, // $99.00
          yearlyPriceUSD: 106920, // $1,069.20 (10% discount)
          maxProfiles: 10,
          maxDiscoveryPerMonth: 1000,
          maxEmailsPerMonth: 1000,
          deepResearchQuota: 50,
          features: [
            "10 Profiles",
            "1,000 Show Discoveries/month",
            "1,000 Email Outreach/month",
            "50 AI Deep Research/month",
            "Custom Email Templates",
            "Priority Support",
            "ROI Tracking",
            "Bulk Import"
          ],
          isActive: true,
          sortOrder: 2,
        },
        {
          tier: "agency",
          displayName: "Agency",
          monthlyPriceUSD: 39999, // $399.99
          yearlyPriceUSD: 431989, // $4,319.89 (10% discount)
          maxProfiles: 999,
          maxDiscoveryPerMonth: 10000,
          maxEmailsPerMonth: 10000,
          deepResearchQuota: 200,
          features: [
            "Unlimited Profiles",
            "10,000 Show Discoveries/month",
            "10,000 Email Outreach/month",
            "200 AI Deep Research/month",
            "White-label Options",
            "Dedicated Account Manager",
            "API Access",
            "Custom Integrations"
          ],
          isActive: true,
          sortOrder: 3,
        },
      ]);
      console.log("✅ Created default pricing plans");
    } else {
      console.log("ℹ️ Pricing plans already exist");
    }

    // Seed system templates (welcome email and invoice)
    const existingSystemTemplates = await db.select().from(systemTemplates);
    
    if (existingSystemTemplates.length === 0) {
      // Create welcome email template
      await db.insert(systemTemplates).values({
        templateType: "welcome_email",
        name: "Welcome Email",
        subject: "Welcome to Guest Booker Pro, {{username}}!",
        body: `Hello {{username}},

Welcome to Guest Booker Pro! Your account has been successfully created and your payment has been processed.

Account Details:
- Email: {{email}}
- Subscription Plan: {{tier}}
- Deep Research Credits: {{searches}}

You can now:
• Discover relevant podcasts and YouTube shows
• Create multiple profiles for different personas
• Automate personalized outreach campaigns
• Track your bookings and appearances
• Analyze your growth impact

Get started now: ${process.env.APP_URL || 'https://guestbookerpro.com'}/dashboard

If you have any questions, feel free to reach out to our support team.

Best regards,
The Guest Booker Pro Team`,
        isActive: true,
      });

      // Create invoice template
      const appUrl = process.env.APP_URL || 'https://guestbookerpro.com';
      await db.insert(systemTemplates).values({
        templateType: "invoice",
        name: "Payment Invoice",
        subject: "Payment Receipt - Guest Booker Pro {{tier}} Plan",
        body: `Hello {{username}},

Thank you for your payment! This email confirms your subscription payment for Guest Booker Pro.

INVOICE DETAILS
-----------------------------------
Invoice Number: {{invoiceNumber}}
Invoice Date: {{invoiceDate}}
Payment Method: {{paymentMethod}}

SUBSCRIPTION DETAILS
-----------------------------------
Plan: {{tier}}
Billing Period: {{billingPeriod}}
Amount Paid: {{amount}}
Next Billing Date: {{nextBillingDate}}

ACCOUNT INFORMATION
-----------------------------------
Email: {{email}}
Customer ID: {{customerId}}

Your subscription is now active and you have full access to all features of your {{tier}} plan.

View your account: ${appUrl}/settings

If you have any questions about your billing, please contact our support team.

Best regards,
The Guest Booker Pro Team

---
This is an automated receipt. Please do not reply to this email.`,
        isActive: true,
      });

      console.log("✅ Created system templates (welcome email and invoice)");
    } else {
      console.log("ℹ️ System templates already exist");
    }

    console.log("✅ Database seeding complete");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  }
}
