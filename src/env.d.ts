/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_ENABLE_HERO_VIDEO?: string;
  readonly SITE_URL?: string;
  readonly PUBLIC_SITE_BASE?: string;
  readonly GALLERY_SHUFFLE_SEED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Global analytics tracking function.
 * Supports Plausible, GTM dataLayer, or custom implementations.
 */
type DamraTrackFn = (event: string, props?: Record<string, unknown>) => void;

/**
 * Extended Window interface with custom globals.
 */
interface Window {
  /** Vendor-neutral analytics tracking hook */
  damraTrack?: DamraTrackFn;
  /** Plausible Analytics (if installed) */
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  /** Google Tag Manager dataLayer */
  dataLayer?: Array<Record<string, unknown>>;
}

/**
 * Legacy MediaQueryList API (Safari < 14).
 * Extends the standard interface with deprecated addListener/removeListener methods.
 */
interface MediaQueryListLegacy extends MediaQueryList {
  /** @deprecated Use addEventListener('change', cb) instead */
  addListener(callback: (this: MediaQueryList, ev: MediaQueryListEvent) => void): void;
  /** @deprecated Use removeEventListener('change', cb) instead */
  removeListener(callback: (this: MediaQueryList, ev: MediaQueryListEvent) => void): void;
}
