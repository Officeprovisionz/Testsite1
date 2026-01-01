# Master Implementation Prompt

## Core Infrastructure & Mobile Excellence - Zero Visual Changes

> **Philosophy**: Build the invisible foundation. Implement the heavy-duty backend systems, mobile optimizations, and core infrastructure that make the site bulletproof. Never touch design, layout, or visual appearance. Focus on what users _feel_ but don't _see_.

---

## 🎯 Core Directive

**YOU ARE IMPLEMENTING**: Performance, accessibility, mobile infrastructure, error handling, data flow, and professional patterns.

**YOU ARE NOT TOUCHING**: Colors, spacing, typography, layouts, visual design, component positioning, animations (visual appearance).

**Success = Better site, identical appearance.**

---

## Part 1: Performance & Infrastructure (Backend Heavy Lifting)

### 1.1 Image Optimization Pipeline

**Goal**: Serve optimal images with zero visual change

**Tasks**:

- [ ] Generate WebP versions of all gallery/\*.jpg images
- [ ] Generate AVIF versions of hero images (best for LCP)
- [ ] Update image components to use `<picture>` with format cascade
- [ ] Maintain exact same image dimensions and aspect ratios
- [ ] Keep same lazy loading behavior, just add formats
- [ ] Add explicit width/height attributes to prevent CLS

**Implementation Pattern**:

```astro
<!-- Before: Just JPEG -->
<img src="hero.jpg" alt="..." loading="eager" />

<!-- After: Multi-format, same visual result -->
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="..." width="1200" height="800" loading="eager" fetchpriority="high" />
</picture>
```

**Success Criteria**:

- Images look identical to user
- File sizes reduced 40-60%
- LCP improved by 500ms+
- Zero layout shift (CLS = 0)

### 1.2 Resource Loading Strategy

**Goal**: Preload critical resources, defer non-critical

**Tasks**:

- [ ] Add preconnect for external domains (fonts, CDNs)
- [ ] Preload LCP image (hero on homepage)
- [ ] Preload critical fonts (Inter 600/700 for headings)
- [ ] Add modulepreload for critical React chunks
- [ ] Defer analytics scripts (load after interaction)
- [ ] Implement service worker for offline functionality

**Implementation** (in `<head>`):

```astro
<!-- Critical resource hints -->
<link rel="preconnect" href="https://images.unsplash.com" crossorigin />
<link rel="preload" as="image" href="/hero.avif" fetchpriority="high" />
<link rel="preload" as="font" href="/fonts/inter-600.woff2" type="font/woff2" crossorigin />

<!-- Defer non-critical -->
<script defer src="/analytics.js"></script>
```

### 1.3 Code Splitting & Bundle Optimization

**Goal**: Load only what's needed per page

**Tasks**:

- [ ] Split toast library into separate chunk (35KB)
- [ ] Move MobileCTABar to mobile-only bundle
- [ ] Create page-specific bundles (contact page = contact components only)
- [ ] Implement dynamic imports for heavy components
- [ ] Use `client:visible` instead of `client:load` where possible
- [ ] Analyze bundle with vite-bundle-visualizer

**Implementation**:

```typescript
// astro.config.ts - Manual chunks
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'motion': ['framer-motion'],
  'toast': ['sonner'], // Lazy load this
  'mobile': ['@/components/MobileCTABar', '@/components/FloatingActionButton'],
}
```

---

## Part 2: Mobile Infrastructure (The Heavy Lifting)

### 2.1 Mobile Performance Optimization

**Goal**: Fast, smooth mobile experience

**Tasks**:

- [ ] Reduce initial JavaScript bundle for mobile (<100KB)
- [ ] Implement mobile-specific image sizes (smaller)
- [ ] Add `loading="lazy"` to below-fold images on mobile
- [ ] Use Intersection Observer for mobile component activation
- [ ] Defer heavy features until user interaction on mobile
- [ ] Optimize touch event handlers (passive listeners)

**Implementation**:

```typescript
// Lazy load mobile components
const MobileCTABar = lazy(() => import('@/components/MobileCTABar'));

// Use Intersection Observer
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActivate(true);
        observer.disconnect();
      }
    });
  });
  observer.observe(ref.current);
}, []);

// Passive touch listeners
element.addEventListener('touchstart', handler, { passive: true });
```

### 2.2 Mobile Input & Forms

**Goal**: Native mobile form experience

**Tasks**:

- [ ] Add proper `inputmode` attributes (numeric, email, tel)
- [ ] Add `autocomplete` tokens for all form fields
- [ ] Add `enterkeyhint` for keyboard behavior
- [ ] Implement autosave to localStorage (prevent data loss)
- [ ] Add haptic feedback on mobile (vibration API)
- [ ] Fix iOS autocomplete bugs (name/email fields)

**Implementation**:

```astro
<!-- Optimized mobile input -->
<input
  type="tel"
  inputmode="tel"
  autocomplete="tel"
  enterkeyhint="next"
  name="phone"
  aria-label="Phone number"
/>

<!-- Email input -->
<input
  type="email"
  inputmode="email"
  autocomplete="email"
  enterkeyhint="next"
  name="email"
  aria-label="Email address"
/>
```

### 2.3 Mobile Navigation & Gestures

**Goal**: Native app-like navigation

**Tasks**:

- [ ] Implement swipe-to-close for mobile menu (touch gesture)
- [ ] Add pull-to-refresh on long pages (optional)
- [ ] Implement smooth scroll with momentum on mobile
- [ ] Add swipe gestures to gallery (prev/next)
- [ ] Fix iOS scroll lock bugs (body scroll when menu open)
- [ ] Add haptic feedback on menu interactions

**Implementation**:

```typescript
// Swipe to close mobile menu
let startX = 0;
element.addEventListener(
  'touchstart',
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true }
);

element.addEventListener(
  'touchmove',
  (e) => {
    const diff = e.touches[0].clientX - startX;
    if (diff > 50) closeMenu(); // Swipe right to close
  },
  { passive: true }
);

// Haptic feedback
if ('vibrate' in navigator) {
  navigator.vibrate(10); // 10ms vibration
}
```

---

## Part 3: Accessibility Infrastructure (Compliance & Quality)

### 3.1 Keyboard Navigation System

**Goal**: 100% keyboard operable

**Tasks**:

- [ ] Audit all interactive elements for keyboard access
- [ ] Add visible focus indicators (ring-2 ring-brand-500)
- [ ] Implement focus trap in mobile menu/dialogs
- [ ] Add skip-to-content link (hidden but focusable)
- [ ] Fix tab order (sequential, logical)
- [ ] Add keyboard shortcuts for power users (optional)

**Implementation**:

```typescript
// Focus trap for dialogs
const focusableElements = dialog.querySelectorAll(
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});
```

### 3.2 Screen Reader Optimization

**Goal**: Full content accessible to screen readers

**Tasks**:

- [ ] Add `aria-label` to all icon-only buttons
- [ ] Add `aria-describedby` for form field help text
- [ ] Implement `aria-live` regions for dynamic updates (toasts, loading)
- [ ] Add proper heading hierarchy (h1 → h2 → h3, no skips)
- [ ] Add `role="status"` for loading states
- [ ] Test with NVDA, JAWS, and VoiceOver

**Implementation**:

```astro
<!-- Accessible icon button -->
<button aria-label="Close menu" class="icon-btn">
  <svg aria-hidden="true"><path d="..."></path></svg>
</button>

<!-- Form field with help text -->
<label for="email">Email</label>
<input id="email" aria-describedby="email-help" />
<p id="email-help" class="text-sm text-muted">We'll never share your email</p>

<!-- Live region for toasts -->
<div role="status" aria-live="polite" aria-atomic="true">Toast message here</div>
```

### 3.3 Touch Target & Motor Accessibility

**Goal**: Easy to interact on any device

**Tasks**:

- [ ] Audit all interactive elements (min 44x44px)
- [ ] Increase mobile menu item height to 48px
- [ ] Add adequate spacing between clickable elements (8px min)
- [ ] Ensure buttons don't require precise clicking
- [ ] Test on real devices with various hand sizes
- [ ] Add large touch targets on mobile CTAs

**Implementation**:

```css
/* Mobile touch targets */
@media (max-width: 768px) {
  .mobile-nav a {
    min-height: 48px; /* WCAG AAA */
    padding: 12px 16px;
    margin: 4px 0; /* Spacing between targets */
  }

  .btn {
    min-height: 44px; /* WCAG AA minimum */
    min-width: 44px;
  }
}
```

---

## Part 4: Error Handling & Edge Cases (Professional Infrastructure)

### 4.1 Comprehensive Error Boundaries

**Goal**: Graceful degradation, never crash

**Tasks**:

- [ ] Wrap all async components in ErrorBoundary
- [ ] Add fallback UI for each error boundary (context-aware)
- [ ] Implement error reporting (Sentry/custom)
- [ ] Add retry mechanisms for failed requests
- [ ] Log errors to analytics for monitoring
- [ ] Show user-friendly error messages (no stack traces)

**Implementation**:

```tsx
// Page-level error boundary
<ErrorBoundary
  fallback={(error) => (
    <div className="error-state">
      <h2>Something went wrong</h2>
      <p>We're working on fixing this. Try refreshing the page.</p>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  )}
  onError={(error, errorInfo) => {
    // Report to Sentry/analytics
    trackError('component_error', {
      message: error.message,
      component: errorInfo.componentStack,
    });
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### 4.2 Loading State Infrastructure

**Goal**: Never show blank screens

**Tasks**:

- [ ] Replace all loading spinners with Skeleton components
- [ ] Add loading states to form submissions
- [ ] Implement progressive image loading (blur-up)
- [ ] Add loading states to gallery (skeleton grid)
- [ ] Show loading bar for page transitions
- [ ] Use Suspense boundaries for React components

**Implementation**:

```tsx
// Skeleton loading state
{
  isLoading ? (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  ) : (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
}

// Form loading state
<button disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Spinner className="mr-2" />
      Sending...
    </>
  ) : (
    'Submit Request'
  )}
</button>;
```

### 4.3 Network Resilience

**Goal**: Work on slow/unreliable connections

**Tasks**:

- [ ] Add retry logic for failed API calls (exponential backoff)
- [ ] Implement request timeout (10s max)
- [ ] Show offline indicator when connection lost
- [ ] Queue form submissions when offline (IndexedDB)
- [ ] Respect connection quality (navigator.connection)
- [ ] Disable expensive features on slow connections

**Implementation**:

```typescript
// Retry logic with exponential backoff
async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10s timeout
      });
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

// Check connection quality
const connection = (navigator as any).connection;
if (connection?.effectiveType === '4g') {
  // Load high-quality images
} else {
  // Load compressed images
}
```

---

## Part 5: Form Infrastructure (Data Integrity)

### 5.1 Validation System

**Goal**: Prevent bad data, guide users

**Tasks**:

- [ ] Add real-time validation (on blur, not on every keystroke)
- [ ] Show field-level error messages
- [ ] Add success indicators for valid fields
- [ ] Implement custom validation rules (phone format, etc.)
- [ ] Add validation for email format (regex)
- [ ] Show validation state with ARIA attributes

**Implementation**:

```typescript
// Field validation
const validateEmail = (email: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!regex.test(email)) return 'Please enter a valid email';
  return null;
};

// Show validation state
<input
  type="email"
  name="email"
  onBlur={(e) => {
    const error = validateEmail(e.target.value);
    setEmailError(error);
  }}
  aria-invalid={!!emailError}
  aria-describedby={emailError ? 'email-error' : undefined}
/>
{emailError && (
  <p id="email-error" className="text-sm text-red-600" role="alert">
    {emailError}
  </p>
)}
```

### 5.2 Data Persistence

**Goal**: Never lose user input

**Tasks**:

- [ ] Implement autosave to localStorage (every 5s)
- [ ] Restore form data on page reload
- [ ] Clear saved data on successful submission
- [ ] Add "unsaved changes" warning on navigation
- [ ] Encrypt sensitive data before saving (if needed)
- [ ] Add timestamp to saved data (expire after 24h)

**Implementation**:

```typescript
// Autosave form data
const STORAGE_KEY = 'contact-form-draft';

useEffect(() => {
  const interval = setInterval(() => {
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  }, 5000); // Every 5 seconds

  return () => clearInterval(interval);
}, []);

// Restore on mount
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const { data, timestamp } = JSON.parse(saved);
    const age = Date.now() - timestamp;
    if (age < 24 * 60 * 60 * 1000) {
      // Less than 24 hours
      Object.entries(data).forEach(([key, value]) => {
        const input = formRef.current?.querySelector(`[name="${key}"]`);
        if (input) (input as HTMLInputElement).value = value as string;
      });
    }
  }
}, []);
```

### 5.3 Submission Pipeline

**Goal**: Reliable, trackable submissions

**Tasks**:

- [ ] Add loading state during submission
- [ ] Disable form during submission (prevent double-submit)
- [ ] Show toast notification on success/error
- [ ] Clear form on success
- [ ] Track submission in analytics
- [ ] Add submission ID for tracking
- [ ] Implement rate limiting (prevent spam)

**Implementation**:

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return; // Prevent double submit
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget as HTMLFormElement);

  try {
    const response = await fetchWithRetry('/api/contact', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      toast.success("Message sent! We'll reply within 1 business day.");
      (e.target as HTMLFormElement).reset();
      localStorage.removeItem(STORAGE_KEY);

      // Track in analytics
      trackEvent('form_submit_success', {
        form: 'contact',
        timestamp: Date.now(),
      });
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    toast.error('Failed to send. Please try again or call us.');
    trackEvent('form_submit_error', {
      form: 'contact',
      error: (error as Error).message,
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Part 6: Analytics & Monitoring (Data Infrastructure)

### 6.1 Event Tracking System

**Goal**: Understand user behavior

**Tasks**:

- [ ] Track all CTA clicks (buttons, links)
- [ ] Track form interactions (start, complete, abandon)
- [ ] Track scroll depth (25%, 50%, 75%, 100%)
- [ ] Track video plays (if videos added)
- [ ] Track error occurrences
- [ ] Track page performance metrics

**Implementation**:

```typescript
// Centralized tracking function
const track = (event: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  // Send to analytics (Plausible, GA4, custom)
  if (window.plausible) {
    window.plausible(event, { props: properties });
  }

  if (window.dataLayer) {
    window.dataLayer.push({ event, ...properties });
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', event, properties);
  }
};

// Track button clicks
<button onClick={() => {
  track('cta_click', {
    label: 'Get Quote',
    location: 'hero',
  });
  // ... handle click
}}>
  Get Quote
</button>

// Track scroll depth
useEffect(() => {
  const depths = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    depths.forEach(depth => {
      if (percent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        track('scroll_depth', { depth });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 6.2 Performance Monitoring

**Goal**: Catch performance regressions

**Tasks**:

- [ ] Track Core Web Vitals (LCP, FID, CLS)
- [ ] Track page load time
- [ ] Track bundle sizes
- [ ] Monitor API response times
- [ ] Track error rates
- [ ] Set up alerts for regressions

**Implementation**:

```typescript
// Track Core Web Vitals
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS((metric) => {
  track('web_vital_cls', { value: metric.value });
});

getFID((metric) => {
  track('web_vital_fid', { value: metric.value });
});

getLCP((metric) => {
  track('web_vital_lcp', { value: metric.value });
});

// Track bundle size (build-time)
// In astro.config.ts
vite: {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Log bundle sizes during build
          console.log(`Bundle: ${id}`);
        }
      }
    }
  }
}
```

---

## Part 7: PWA Infrastructure (App-Like Experience)

### 7.1 Service Worker Setup

**Goal**: Offline functionality, instant loads

**Tasks**:

- [ ] Create service worker for asset caching
- [ ] Implement cache-first strategy for static assets
- [ ] Implement network-first for API calls
- [ ] Add offline fallback page
- [ ] Pre-cache critical assets
- [ ] Add cache versioning (bust old caches)

**Implementation**:

```typescript
// service-worker.ts
const CACHE_NAME = 'damra-v1';
const ASSETS_TO_CACHE = ['/', '/styles/global.css', '/fonts/inter-600.woff2', '/offline.html'];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('/offline.html');
      })
  );
});
```

### 7.2 App Manifest & Install

**Goal**: Installable web app

**Tasks**:

- [ ] Update site.webmanifest with proper fields
- [ ] Add app icons (192x192, 512x512)
- [ ] Add iOS splash screens
- [ ] Implement install prompt
- [ ] Add "Add to Home Screen" banner on mobile
- [ ] Track install events

**Implementation**:

```json
// site.webmanifest
{
  "name": "DAMRA Professional Cleaning",
  "short_name": "DAMRA",
  "description": "Premium commercial cleaning services",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#00B4A6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## Part 8: TypeScript Infrastructure (Type Safety)

### 8.1 Strict Type System

**Goal**: Zero runtime type errors

**Tasks**:

- [ ] Enable all strict TypeScript options
- [ ] Add explicit return types to all functions
- [ ] Replace all `any` types with proper types
- [ ] Add type guards for runtime validation
- [ ] Create shared type definitions in `src/types/`
- [ ] Add JSDoc to public APIs

**Implementation**:

```typescript
// src/types/forms.ts
export interface ContactFormData {
  companyName: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  servicesNeeded: string[];
  industry: string;
  consent: boolean;
}

export type FormValidationError = {
  field: keyof ContactFormData;
  message: string;
};

// Type-safe form validation
function validateForm(data: ContactFormData): FormValidationError[] {
  const errors: FormValidationError[] = [];

  if (!data.email.includes('@')) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  return errors;
}
```

### 8.2 Runtime Validation

**Goal**: Validate external data (APIs, user input)

**Tasks**:

- [ ] Add Zod schemas for form validation
- [ ] Validate API responses
- [ ] Add type guards for external data
- [ ] Sanitize user input (XSS prevention)
- [ ] Validate environment variables
- [ ] Add runtime checks at system boundaries

**Implementation**:

```typescript
import { z } from 'zod';

// Zod schema for form validation
const contactSchema = z.object({
  companyName: z.string().min(2).max(100),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(1000),
  servicesNeeded: z.array(z.string()).min(1),
  industry: z.string(),
  consent: z.boolean().refine((val) => val === true),
});

// Validate form data
try {
  const data = contactSchema.parse(formData);
  // Data is now typed and validated
} catch (error) {
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      showFieldError(err.path[0] as string, err.message);
    });
  }
}
```

---

## Implementation Checklist (Use This Every Session)

### Before Starting

- [ ] Read this entire document
- [ ] Understand: NO visual changes allowed
- [ ] Set up todo list with specific tasks
- [ ] Check current state (what's implemented, what's not)

### During Implementation

- [ ] Work on ONE part at a time (Part 1, then Part 2, etc.)
- [ ] Test after each change (`pnpm run build`)
- [ ] Verify TypeScript passes (`pnpm run typecheck`)
- [ ] Check bundle size (should stay same or shrink)
- [ ] Ensure design looks identical in browser

### After Implementation

- [ ] Run full build (`pnpm run build`)
- [ ] Check bundle sizes (`dist/_astro/*.js`)
- [ ] Test on real mobile device
- [ ] Test keyboard navigation
- [ ] Test form submissions
- [ ] Verify no visual regressions
- [ ] Commit with descriptive message
- [ ] Update this document with completion status

---

## Success Metrics (Track Progress)

### Performance

- [ ] LCP < 2.5s (currently: measure first)
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle size < 200KB (currently: ~183KB)
- [ ] First load: < 3s on 3G

### Accessibility

- [ ] Lighthouse Accessibility: 100/100
- [ ] All interactive elements keyboard accessible
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Focus indicators visible

### Mobile

- [ ] Touch targets ≥ 44x44px
- [ ] Forms autofill correctly
- [ ] Swipe gestures work
- [ ] iOS safari bugs fixed
- [ ] Works on slow connections

### Quality

- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Build: 0 warnings
- [ ] Console: 0 errors in production
- [ ] Forms: 100% validation coverage

---

## Priority Order (Do In This Sequence)

### Sprint 1: Foundation (Week 1)

1. Part 1.2 - Resource loading (quick win)
2. Part 4.2 - Loading states (user-facing)
3. Part 5.1 - Form validation (quality)
4. Part 3.2 - Screen reader (compliance)

### Sprint 2: Mobile (Week 2)

1. Part 2.2 - Mobile inputs (usability)
2. Part 2.3 - Mobile gestures (UX)
3. Part 3.3 - Touch targets (accessibility)
4. Part 2.1 - Mobile performance (speed)

### Sprint 3: Infrastructure (Week 3)

1. Part 4.1 - Error boundaries (stability)
2. Part 4.3 - Network resilience (reliability)
3. Part 6.1 - Event tracking (data)
4. Part 8.1 - Type system (quality)

### Sprint 4: Advanced (Week 4)

1. Part 1.1 - Image optimization (performance)
2. Part 7.1 - Service worker (PWA)
3. Part 1.3 - Code splitting (optimization)
4. Part 6.2 - Performance monitoring (observability)

---

## Common Pitfalls (Avoid These)

### ❌ DON'T

- Change any colors, fonts, or spacing
- Modify component layouts or positioning
- Add new visual elements (icons, decorations)
- Change animation timings or easing
- Modify button styles or hover states
- Touch CSS except for accessibility/performance

### ✅ DO

- Add data attributes for functionality
- Improve form validation logic
- Add error handling
- Optimize image formats
- Improve loading states
- Add accessibility attributes
- Optimize JavaScript bundles
- Add analytics tracking

---

## Testing Protocol

### Manual Tests (After Each Part)

1. **Visual Regression**: Compare before/after screenshots
2. **Mobile Device**: Test on real iPhone/Android
3. **Keyboard Nav**: Tab through entire site
4. **Form Flow**: Submit test form, check validation
5. **Network**: Test on throttled 3G connection
6. **Offline**: Disable network, check fallbacks

### Automated Tests

```bash
# TypeScript
pnpm run typecheck

# Linting
pnpm run lint

# Build
pnpm run build

# Bundle analysis
pnpm exec vite-bundle-visualizer

# Lighthouse (CI)
pnpm exec unlighthouse --site http://localhost:4321
```

---

**Last Updated**: 2025-12-31
**Status**: Master template - use for every implementation session
**Philosophy**: Build the machine under the hood. Users see speed, feel quality, trust reliability. They never see the code.
