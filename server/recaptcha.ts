import { Request, Response, NextFunction } from "express";

/**
 * reCAPTCHA v3 verification middleware
 * 
 * Verifies reCAPTCHA tokens from client requests to prevent bot spam.
 * 
 * Usage:
 * app.post('/api/auth/signup', verifyRecaptcha, signupHandler);
 * 
 * Environment Variables:
 * - RECAPTCHA_SECRET_KEY: Your reCAPTCHA secret key from Google
 * - NODE_ENV: Set to 'development' to skip verification in dev mode
 */

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verifies reCAPTCHA token with Google's API
 */
async function verifyRecaptchaToken(token: string): Promise<RecaptchaResponse> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured');
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  return response.json();
}

/**
 * Express middleware to verify reCAPTCHA tokens
 * 
 * In development mode (NODE_ENV=development), this middleware is bypassed.
 * In production, it requires a valid reCAPTCHA token with score >= 0.5.
 */
export async function verifyRecaptcha(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Skip reCAPTCHA in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('🔓 reCAPTCHA verification skipped (development mode)');
    return next();
  }

  // Check if reCAPTCHA is configured
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error('❌ RECAPTCHA_SECRET_KEY not configured');
    res.status(500).json({ 
      error: 'reCAPTCHA not configured',
      message: 'Server configuration error'
    });
    return;
  }

  // Extract token from request
  const token = req.body.recaptchaToken;

  if (!token) {
    console.warn('⚠️  reCAPTCHA token missing from request');
    res.status(400).json({ 
      error: 'reCAPTCHA verification failed',
      message: 'Please complete the reCAPTCHA verification'
    });
    return;
  }

  try {
    // Verify token with Google
    const verification = await verifyRecaptchaToken(token);

    if (!verification.success) {
      console.warn('⚠️  reCAPTCHA verification failed:', verification['error-codes']);
      res.status(400).json({ 
        error: 'reCAPTCHA verification failed',
        message: 'Unable to verify you are human. Please try again.'
      });
      return;
    }

    // Check score (reCAPTCHA v3 scores: 0.0 = bot, 1.0 = human)
    const score = verification.score || 0;
    const threshold = 0.5; // Adjust this threshold as needed (0.0 to 1.0)

    if (score < threshold) {
      console.warn(`⚠️  reCAPTCHA score too low: ${score} (threshold: ${threshold})`);
      res.status(400).json({ 
        error: 'reCAPTCHA verification failed',
        message: 'Security check failed. If you believe this is an error, please contact support.'
      });
      return;
    }

    // Success - log and continue
    console.log(`✅ reCAPTCHA verified (score: ${score}, action: ${verification.action})`);
    next();

  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error);
    res.status(500).json({ 
      error: 'reCAPTCHA verification error',
      message: 'Unable to verify security check. Please try again.'
    });
  }
}

/**
 * Optional: Verify reCAPTCHA with custom score threshold
 */
export function verifyRecaptchaWithScore(minScore: number) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔓 reCAPTCHA verification skipped (development mode)');
      return next();
    }

    const token = req.body.recaptchaToken;
    if (!token) {
      res.status(400).json({ 
        error: 'reCAPTCHA verification failed',
        message: 'Please complete the reCAPTCHA verification'
      });
      return;
    }

    try {
      const verification = await verifyRecaptchaToken(token);
      const score = verification.score || 0;

      if (!verification.success || score < minScore) {
        console.warn(`⚠️  reCAPTCHA failed (score: ${score}, min: ${minScore})`);
        res.status(400).json({ 
          error: 'reCAPTCHA verification failed',
          message: 'Security check failed. Please try again.'
        });
        return;
      }

      console.log(`✅ reCAPTCHA verified (score: ${score})`);
      next();
    } catch (error) {
      console.error('❌ reCAPTCHA verification error:', error);
      res.status(500).json({ 
        error: 'reCAPTCHA verification error',
        message: 'Unable to verify security check. Please try again.'
      });
    }
  };
}

