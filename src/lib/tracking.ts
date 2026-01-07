/**
 * Tracking utilities for Plausible and custom events.
 */

export const trackEvent = (eventName: string, props?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, props ? { props } : undefined);
  } else if (import.meta.env.DEV) {
    console.log(`[Tracking] ${eventName}`, props);
  }
};

/**
 * Initializes scroll depth tracking.
 * Reports when user hits 25%, 50%, 75%, and 90% of page height.
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const thresholds = [25, 50, 75, 90];
  const tracked = new Set<number>();

  const checkScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPercent = (window.scrollY / scrollHeight) * 100;

    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackEvent('Scroll Depth', { depth: `${threshold}%` });
      }
    });
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  // Initial check in case page is already scrolled or very short
  checkScroll();
};

/**
 * Captures UTM parameters from URL and saves them to sessionStorage.
 */
export const captureUTMs = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  const utmKeys: string[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
    'msclkid',
  ];

  utmKeys.forEach((key: string) => {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
      try {
        sessionStorage.setItem(key, value);
      } catch {
        // ignore
      }
    } else {
      // Try to recover from sessionStorage
      try {
        const saved = sessionStorage.getItem(key);
        if (saved) utms[key] = saved;
      } catch {
        // ignore
      }
    }
  });

  return utms;
};

/**
 * Gets all saved UTMs from sessionStorage.
 */
export const getSavedUTMs = () => {
  if (typeof window === 'undefined') return {};
  const utms: Record<string, string> = {};
  const utmKeys: string[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
    'msclkid',
  ];
  utmKeys.forEach((key: string) => {
    try {
      const value = sessionStorage.getItem(key);
      if (value) utms[key] = value;
    } catch {
      // ignore
    }
  });
  return utms;
};
