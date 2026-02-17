import "dotenv/config";
import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function verifyAdminEmail() {
  console.log("🔐 Verifying Admin Email...\n");

  try {
    // Find admin user
    const adminUser = await db.query.users.findFirst({
      where: eq(users.username, "admin"),
    });

    if (!adminUser) {
      console.error("❌ Admin user not found");
      console.log("\nMake sure the admin user exists in your database.");
      process.exit(1);
    }

    console.log(`Found admin user: ${adminUser.username}`);
    console.log(`Email: ${adminUser.email || '(not set)'}`);
    console.log(`Email verified: ${adminUser.emailVerified ? 'Yes ✅' : 'No ❌'}\n`);

    if (adminUser.emailVerified) {
      console.log("✅ Admin email is already verified! Nothing to do.");
      process.exit(0);
    }

    // Update admin to verified
    await db
      .update(users)
      .set({ 
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null
      })
      .where(eq(users.username, "admin"));

    console.log("✅ Admin email successfully verified!");
    console.log("\nThe admin user can now log in without email verification.");
    console.log(`\nCredentials:`);
    console.log(`  Username: admin`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'admin'}`);
    console.log(`  Email: ${adminUser.email || 'admin@guestbooker.com'}`);

  } catch (error) {
    console.error("❌ Error verifying admin email:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

verifyAdminEmail();

