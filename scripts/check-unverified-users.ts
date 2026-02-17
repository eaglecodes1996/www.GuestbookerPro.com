import "dotenv/config";
import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function checkUnverifiedUsers() {
  console.log("🔍 Checking for unverified users...\n");

  try {
    // Get all users
    const allUsers = await db.select().from(users);

    console.log(`Total users: ${allUsers.length}\n`);

    // Separate verified and unverified
    const verified = allUsers.filter(u => u.emailVerified);
    const unverified = allUsers.filter(u => !u.emailVerified);

    console.log(`✅ Verified users: ${verified.length}`);
    verified.forEach(u => {
      console.log(`   - ${u.username} (${u.email || 'no email'})`);
    });

    console.log(`\n❌ Unverified users: ${unverified.length}`);
    unverified.forEach(u => {
      console.log(`   - ${u.username} (${u.email || 'no email'}) - CANNOT LOGIN`);
    });

    if (unverified.length > 0) {
      console.log(`\n⚠️  These users cannot log in until email is verified!`);
      console.log(`\nOptions to fix:`);
      console.log(`1. Run: npm run verify-admin (for admin)`);
      console.log(`2. User uses "Forgot Password" (auto-verifies email)`);
      console.log(`3. User clicks verification link from signup email`);
      console.log(`4. Manual SQL: UPDATE users SET email_verified = true WHERE username = 'username';`);
    } else {
      console.log(`\n🎉 All users are verified!`);
    }

  } catch (error) {
    console.error("❌ Error checking users:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

checkUnverifiedUsers();

