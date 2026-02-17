import { useEffect } from 'react';
import { useLocation } from 'wouter';

const AFFILIATE_COOKIE_NAME = 'guestbooker_affiliate';
const COOKIE_DURATION_DAYS = 90;

export function useAffiliateTracking() {
  const [location] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get('ref');

    if (refId) {
      setAffiliateCookie(refId);
      trackAffiliateClick(refId);
      
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('ref');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [location]);
}

function setAffiliateCookie(referralId: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DURATION_DAYS);
  document.cookie = `${AFFILIATE_COOKIE_NAME}=${referralId}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function getAffiliateId(): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === AFFILIATE_COOKIE_NAME) {
      return value;
    }
  }
  return null;
}

async function trackAffiliateClick(referralId: string) {
  try {
    await fetch('/api/affiliate/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referralId }),
    });
  } catch (error) {
    console.error('Failed to track affiliate click:', error);
  }
}
