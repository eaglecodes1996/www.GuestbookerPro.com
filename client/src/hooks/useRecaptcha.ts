import { useEffect, useState } from 'react';

/**
 * Google reCAPTCHA v3 Hook
 * 
 * Usage:
 * const { executeRecaptcha, ready } = useRecaptcha();
 * 
 * const token = await executeRecaptcha('signup');
 * // Send token to backend with form data
 */

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export function useRecaptcha() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip in development if no site key
    if (!RECAPTCHA_SITE_KEY) {
      console.warn('⚠️  VITE_RECAPTCHA_SITE_KEY not set - reCAPTCHA disabled');
      setReady(true); // Allow forms to work without reCAPTCHA in dev
      return;
    }

    // Check if already loaded
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => {
        setReady(true);
      });
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => {
          console.log('✅ reCAPTCHA loaded and ready');
          setReady(true);
        });
      }
    };

    script.onerror = () => {
      console.error('❌ Failed to load reCAPTCHA script');
      setError('Failed to load reCAPTCHA. Please check your internet connection.');
      setReady(true); // Allow form to work without reCAPTCHA
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  /**
   * Execute reCAPTCHA and get token
   * @param action - The action name (e.g., 'signup', 'login', 'forgot_password')
   * @returns Promise<string | null> - The reCAPTCHA token or null if disabled/error
   */
  const executeRecaptcha = async (action: string): Promise<string | null> => {
    // If no site key, return null (development mode)
    if (!RECAPTCHA_SITE_KEY) {
      console.log('🔓 reCAPTCHA skipped (no site key)');
      return null;
    }

    // If not ready yet, wait a bit
    if (!ready) {
      console.warn('⚠️  reCAPTCHA not ready yet, waiting...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    try {
      if (!window.grecaptcha?.execute) {
        console.error('❌ reCAPTCHA not available');
        return null;
      }

      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      console.log(`✅ reCAPTCHA token generated for action: ${action}`);
      return token;
    } catch (err) {
      console.error('❌ reCAPTCHA execution error:', err);
      setError('Failed to verify reCAPTCHA. Please try again.');
      return null;
    }
  };

  return {
    executeRecaptcha,
    ready,
    error,
    isEnabled: !!RECAPTCHA_SITE_KEY,
  };
}

