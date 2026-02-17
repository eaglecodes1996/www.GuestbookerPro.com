/**
 * Email Service
 * Handles all email sending functionality with SendGrid integration
 */

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email using Resend (or log to console in development)
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, text, html } = options;
  
  // Check if Resend is configured
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  
  if (hasResend) {
    try {
      // Import Resend dynamically (only if configured)
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY!);
      
      const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Use your verified domain
      
      const result = await resend.emails.send({
        from: fromEmail,
        to: [to],
        subject,
        text: text || '',
        html: html || text || '',
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      console.log(`✅ Email sent to ${to}: ${subject} (ID: ${result.data?.id})`);
      return true;
    } catch (error: any) {
      console.error(`❌ Failed to send email to ${to}:`, error.message);
      // In development, still log the email even if sending fails
      if (process.env.NODE_ENV === 'development') {
        console.log('\n📧 ===== EMAIL (FALLBACK) =====');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`---`);
        console.log(text || html || '(no content)');
        console.log('📧 ===========================\n');
      }
      return false;
    }
  } else {
    // Development mode or Resend not configured - log to console
    console.log('\n📧 ===== EMAIL (DEV MODE) =====');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`---`);
    console.log(text || html || '(no content)');
    console.log('📧 ===========================\n');
    return true;
  }
}

/**
 * Send email verification email
 */
export async function sendVerificationEmail(email: string, username: string, token: string): Promise<boolean> {
  const appUrl = process.env.APP_URL || 'http://localhost:5000';
  const verificationLink = `${appUrl}/verify-email?token=${token}`;
  
  const subject = 'Verify Your Email - Guest Booker Pro';
  
  const text = `
Hello ${username},

Welcome to Guest Booker Pro! Please verify your email address to complete your registration.

Click the link below to verify your email:
${verificationLink}

This link will expire in 24 hours.

If you didn't create an account, you can safely ignore this email.

Best regards,
Guest Booker Pro Team
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066ff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Verify Your Email Address</h2>
    <p>Hello ${username},</p>
    <p>Welcome to Guest Booker Pro! Please verify your email address to complete your registration and start discovering shows.</p>
    <a href="${verificationLink}" class="button">Verify Email Address</a>
    <p>This link will expire in 24 hours.</p>
    <p>If you didn't create an account, you can safely ignore this email.</p>
    <div class="footer">
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
    </div>
  </div>
</body>
</html>
`;

  return sendEmail({ to: email, subject, text, html });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, username: string, token: string): Promise<boolean> {
  const appUrl = process.env.APP_URL || 'http://localhost:5000';
  const resetLink = `${appUrl}/reset-password?token=${token}`;
  
  const subject = 'Reset Your Password - Guest Booker Pro';
  
  const text = `
Hello ${username},

You requested to reset your password for your Guest Booker Pro account.

Click the link below to reset your password:
${resetLink}

This link will expire in 1 hour.

If you didn't request this, you can safely ignore this email. Your password will not be changed.

Best regards,
Guest Booker Pro Team
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066ff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Reset Your Password</h2>
    <p>Hello ${username},</p>
    <p>You requested to reset your password for your Guest Booker Pro account.</p>
    <a href="${resetLink}" class="button">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, you can safely ignore this email. Your password will not be changed.</p>
    <div class="footer">
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
    </div>
  </div>
</body>
</html>
`;

  return sendEmail({ to: email, subject, text, html });
}

/**
 * Send welcome email after email verification
 */
export async function sendWelcomeEmail(email: string, username: string, tier: string): Promise<boolean> {
  const appUrl = process.env.APP_URL || 'http://localhost:5000';
  
  const subject = `Welcome to Guest Booker Pro, ${username}!`;
  
  const text = `
Hello ${username},

Welcome to Guest Booker Pro! Your email has been verified and your account is ready to use.

Your Current Plan: ${tier}

You can now:
- Discover relevant podcasts and YouTube shows
- Create multiple profiles for different personas
- Automate personalized outreach campaigns
- Track your bookings and appearances
- Analyze your growth impact

Get started: ${appUrl}/dashboard

If you have any questions, feel free to reach out to our support team.

Best regards,
Guest Booker Pro Team
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066ff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0; }
    .features { background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .features li { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome to Guest Booker Pro! 🎉</h2>
    <p>Hello ${username},</p>
    <p>Your email has been verified and your account is ready to use.</p>
    <p><strong>Your Current Plan:</strong> ${tier}</p>
    
    <div class="features">
      <p><strong>What you can do now:</strong></p>
      <ul>
        <li>✅ Discover relevant podcasts and YouTube shows</li>
        <li>✅ Create multiple profiles for different personas</li>
        <li>✅ Automate personalized outreach campaigns</li>
        <li>✅ Track your bookings and appearances</li>
        <li>✅ Analyze your growth impact</li>
      </ul>
    </div>
    
    <a href="${appUrl}/dashboard" class="button">Go to Dashboard</a>
    
    <p>If you have any questions, feel free to reach out to our support team.</p>
    
    <p>Best regards,<br>Guest Booker Pro Team</p>
  </div>
</body>
</html>
`;

  return sendEmail({ to: email, subject, text, html });
}

/**
 * Send invoice/payment confirmation email
 */
export async function sendInvoiceEmail(params: {
  email: string;
  username: string;
  tier: string;
  amount: string; // Formatted amount like "29.99"
  invoiceNumber: string;
  invoiceDate: string;
  paymentMethod: string;
  billingPeriod: string;
  nextBillingDate: string;
  customerId: string;
}): Promise<boolean> {
  const appUrl = process.env.APP_URL || 'http://localhost:5000';
  
  const {
    email,
    username,
    tier,
    amount,
    invoiceNumber,
    invoiceDate,
    paymentMethod,
    billingPeriod,
    nextBillingDate,
    customerId,
  } = params;
  
  const subject = `Payment Receipt - Guest Booker Pro ${tier} Plan`;
  
  const text = `Hello ${username},

Thank you for your payment! This email confirms your subscription payment for Guest Booker Pro.

INVOICE DETAILS
-----------------------------------
Invoice Number: ${invoiceNumber}
Invoice Date: ${invoiceDate}
Payment Method: ${paymentMethod}

SUBSCRIPTION DETAILS
-----------------------------------
Plan: ${tier}
Billing Period: ${billingPeriod}
Amount Paid: $${amount}
Next Billing Date: ${nextBillingDate}

ACCOUNT INFORMATION
-----------------------------------
Email: ${email}
Customer ID: ${customerId}

Your subscription is now active and you have full access to all features of your ${tier} plan.

View your account: ${appUrl}/settings

If you have any questions about your billing, please contact our support team.

Best regards,
Guest Booker Pro Team

---
This is an automated receipt. Please do not reply to this email.`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0066ff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .invoice-details { background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
    .detail-label { font-weight: bold; }
    .amount { font-size: 24px; color: #0066ff; font-weight: bold; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066ff; color: white !important; text-decoration: none; border-radius: 4px; margin: 16px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Receipt</h1>
      <p>Invoice #${invoiceNumber}</p>
    </div>
    
    <h2>Hello ${username},</h2>
    <p>Thank you for your payment! This email confirms your subscription payment for Guest Booker Pro.</p>
    
    <div class="invoice-details">
      <h3>Invoice Details</h3>
      <div class="detail-row">
        <span class="detail-label">Invoice Date:</span>
        <span>${invoiceDate}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payment Method:</span>
        <span>${paymentMethod}</span>
      </div>
    </div>
    
    <div class="invoice-details">
      <h3>Subscription Details</h3>
      <div class="detail-row">
        <span class="detail-label">Plan:</span>
        <span>${tier}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Billing Period:</span>
        <span>${billingPeriod}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Amount Paid:</span>
        <span class="amount">$${amount}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Next Billing Date:</span>
        <span>${nextBillingDate}</span>
      </div>
    </div>
    
    <div class="invoice-details">
      <h3>Account Information</h3>
      <div class="detail-row">
        <span class="detail-label">Email:</span>
        <span>${email}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Customer ID:</span>
        <span>${customerId}</span>
      </div>
    </div>
    
    <p>Your subscription is now active and you have full access to all features of your ${tier} plan.</p>
    
    <center>
      <a href="${appUrl}/settings" class="button">View Your Account</a>
    </center>
    
    <p>If you have any questions about your billing, please contact our support team.</p>
    
    <div class="footer">
      <p>This is an automated receipt. Please do not reply to this email.</p>
      <p>&copy; ${new Date().getFullYear()} Guest Booker Pro. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

  return sendEmail({ to: email, subject, text, html });
}

