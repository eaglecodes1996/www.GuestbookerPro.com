/**
 * Script to reset the admin user password
 * 
 * Usage:
 *   # Reset to "admin" (default)
 *   npm run reset-admin-password
 * 
 *   # Or set ADMIN_PASSWORD env var
 *   ADMIN_PASSWORD=newsecurepassword npm run reset-admin-password
 */

import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { pool } from "../server/db";

async function resetAdminPassword() {
  try {
    console.log("🔄 Resetting admin password...");
    
    // Get password from env var or use default
    const newPassword = process.env.ADMIN_PASSWORD || "admin";
    
    if (newPassword === "admin") {
      console.warn("⚠️  WARNING: Using default password 'admin'. For production, set ADMIN_PASSWORD env var!");
    }
    
    // Check if admin user exists
    const adminUser = await db.query.users.findFirst({
      where: eq(users.username, "admin"),
    });
    
    if (!adminUser) {
      console.error("❌ Admin user not found in database!");
      console.log("   Run the application first to create the admin user via seeding.");
      process.exit(1);
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the admin user
    await db.update(users)
      .set({ 
        password: hashedPassword,
        emailVerified: true, // Ensure admin can login
      })
      .where(eq(users.username, "admin"));
    
    console.log("✅ Admin password reset successfully!");
    console.log("");
    console.log("📝 Login credentials:");
    console.log("   Username: admin");
    if (newPassword === "admin") {
      console.log("   Password: admin");
      console.log("");
      console.log("⚠️  IMPORTANT: Change this password immediately after logging in!");
    } else {
      console.log("   Password: [set from ADMIN_PASSWORD env var]");
    }
    
    // Close database connection
    await pool.end();
    
  } catch (error) {
    console.error("❌ Failed to reset admin password:", error);
    process.exit(1);
  }
}

resetAdminPassword();

