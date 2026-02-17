import "dotenv/config";
import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function changeAdminPassword() {
  console.log("🔐 Emergency Password Reset Utility");
  console.log("⚠️  This tool bypasses normal authentication for emergency access\n");
  console.log("📝 For normal password changes, use the web interface:");
  console.log("   - Settings → Account & Security (if logged in)");
  console.log("   - Login → Forgot Password (if locked out)\n");

  // Get username
  const username = await question("Enter username (default: admin): ") || "admin";

  // Get new password
  const newPassword = await question("Enter new password (min 8 chars, uppercase, lowercase, number): ");

  // Validate password strength
  if (newPassword.length < 8) {
    console.error("❌ Password must be at least 8 characters");
    rl.close();
    process.exit(1);
  }

  if (!/[A-Z]/.test(newPassword)) {
    console.error("❌ Password must contain at least one uppercase letter");
    rl.close();
    process.exit(1);
  }

  if (!/[a-z]/.test(newPassword)) {
    console.error("❌ Password must contain at least one lowercase letter");
    rl.close();
    process.exit(1);
  }

  if (!/[0-9]/.test(newPassword)) {
    console.error("❌ Password must contain at least one number");
    rl.close();
    process.exit(1);
  }

  const confirm = await question(`\n⚠️  Are you sure you want to change the password for '${username}'? (yes/no): `);

  if (confirm.toLowerCase() !== "yes") {
    console.log("❌ Cancelled");
    rl.close();
    process.exit(0);
  }

  try {
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      console.error(`❌ User '${username}' not found`);
      rl.close();
      process.exit(1);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.username, username));

    console.log(`\n✅ Password successfully changed for '${username}'!`);
    console.log("🔐 You can now log in with:");
    console.log(`   Username: ${username}`);
    console.log("   Password: [your new password]");
    
    if (username === "admin") {
      console.log("\n⚠️  Tip: Update ADMIN_PASSWORD in your Railway environment variables for consistency");
    }

  } catch (error) {
    console.error("❌ Error changing password:", error);
    process.exit(1);
  } finally {
    rl.close();
    process.exit(0);
  }
}

changeAdminPassword();

