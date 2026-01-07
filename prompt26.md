Severity: CRITICAL (Fix Immediately)
Enable Content-Security-Policy header - No XSS protection (30 min)
Uncomment sitemap in robots.txt - Search engines can't find sitemap (5 min)
Enable analytics tracking - Zero visibility into user behavior (30 min)
Add CSRF tokens to contact form - Form hijacking vulnerability (2 hrs)
Generate WebP/AVIF image formats - Wasting 30-40% bandwidth (4 hrs)
Severity: HIGH (Fix This Week)
Add Service schema markup - Missing rich snippets for services (1 hr)
Add FAQPage schema markup - Missing FAQ rich snippets (1 hr)
Add Organization schema - Missing knowledge panel eligibility (30 min)
Implement server-side form validation - Client-only validation insufficient (2 hrs)
Add Web Vitals tracking - No performance monitoring (1 hr)
Severity: MEDIUM (Fix This Month)
Expand a11y test coverage to all pages - Only 3/10 pages tested (2 hrs)
Add Sentry error tracking - ErrorBoundary ready but not connected (1 hr)
Fix form error ARIA IDs mismatch - Screen reader accessibility issue (30 min)
Add honeypot field verification - Spam prevention (1 hr)
Create performance budget in CI - Prevent regressions (2 hrs)
📊 DETAILED FINDINGS BY CATEGORY

1. 🚀 PERFORMANCE OPTIMIZATION (30+ IMPROVEMENTS)
   Images & Media (Highest Impact)
   CRITICAL: Modern Image Format Support Missing
   Current: Only JPEG variants in public/gallery/
   Missing: WebP (30% smaller), AVIF (50% smaller)
   Files Affected: 114 static assets
   Impact: ~3-5 MB wasted per page load for gallery pages
   Fix:

# Generate WebP variants for all images

npm install sharp-cli
sharp -i "public/gallery/\*.jpg" -o "public/gallery/{name}-{w}.webp" --format webp
Then update: src/lib/publicImages.ts to generate <picture> elements
Suboptimal Responsive Image Widths
Location: src/lib/publicImages.ts:89
Current: [640, 960, 1280, 1600, 1920, 2560, 3840]
Issue: 2560px and 3840px rarely needed (4K displays are <5% of traffic)
Impact: Extra ~2-3 MB of image data loaded unnecessarily
Fix: Remove 2560 and 3840, add 768 for tablet portrait

const widths = [640, 768, 960, 1280, 1600, 1920];
Missing Image Lazy Loading Optimization
Current: Implicit lazy loading on images
Missing: Explicit loading="lazy" on below-fold images
Files: Gallery.astro, ExpertiseGallery.astro
Fix: Add loading="lazy" to all non-hero images
Impact: Save 1-2s on initial page load
Missing Image Blur Placeholder
Current: No placeholder while images load
Better UX: Low-quality image placeholder (LQIP)
Implementation: Use plaiceholder library to generate blur data URLs
Benefit: Perceived performance improvement
Hero Video Optimization - GOOD
Location: HeroPro.tsx:16-25
✅ Already optimized: Disables video on slow connections (2G)
✅ Uses WebM + MP4 fallback
✅ Checks navigator.connection.effectiveType
JavaScript Bundle Optimization
React Bundle Size Concern
File: dist/\_astro/client.BAYO3tSc.js (179 KB)
Contains: React 19 + React-DOM
Used by: 4 components with client:load:
HeroPro.tsx
FloatingActionButton.tsx
MobileCTABar.tsx
PageHeroPro.tsx
Question: Do these NEED React or can they be vanilla JS?
FloatingActionButton: Simple show/hide logic → Could be vanilla
MobileCTABar: Simple sticky bar → Could be vanilla
HeroPro: Uses useState, useEffect → Justified
Impact: Could save 140 KB by converting 2 components to vanilla
Effort: Medium (3-4 hours)
Scroll Event Performance
Location: BaseLayout.astro:414-449
Issue: window.addEventListener('scroll', requestScrollProgress)
Missing: Throttling/debouncing
Fix:

let ticking = false;
window.addEventListener('scroll', () => {
if (!ticking) {
window.requestAnimationFrame(() => {
requestScrollProgress();
ticking = false;
});
ticking = true;
}
});
Impact: Reduced CPU usage during scroll
Magic Numbers in Scroll Logic
Location: FloatingActionButton.tsx:26
Code: scrollY > 100 && scrollY < docHeight - 200
Issue: 100px and 200px are magic numbers
Fix:

const SHOW_THRESHOLD = 100;
const HIDE_FOOTER_OFFSET = 200;
scrollY > SHOW_THRESHOLD && scrollY < docHeight - HIDE_FOOTER_OFFSET
CSS Optimization
Font Loading Strategy
Current: Preload Inter 600 & 700 (BaseLayout.astro:151-152)
Missing: Preload Playfair Display 600 for h1 headings
Missing: font-display: swap in CSS (prevents invisible text)
Fix: Add to global.css:

@font-face {
font-display: swap;
}
Unused Font Subsets
Current: Includes Latin, Latin-ext, Cyrillic, Cyrillic-ext
Likely needed: Latin only (English site)
Fix: Update @fontsource imports to specify subset:

import '@fontsource/inter/400.css?subset=latin';
Benefit: ~10-15% font file reduction
CSS Bundle Size
File: dist/\_astro/About.B60w2V6j.css (96 KB)
Status: Reasonable for Tailwind with custom theme
Recommendation: Audit for unused utilities with:

npx tailwindcss-analyzer dist/\_astro/\*.css
Resource Hints
GOOD: Current Implementation
✅ dns-prefetch: https://images.unsplash.com (BaseLayout.astro:147)
✅ preconnect: https://images.unsplash.com (BaseLayout.astro:148)
✅ preload: Inter fonts (BaseLayout.astro:151-152)
Missing Resource Hints
Preconnect to form endpoint (if using Formspree):

<link rel="preconnect" href="https://formspree.io" crossorigin />
dns-prefetch for analytics (when enabled):

<link rel="dns-prefetch" href="https://plausible.io" />
Build Output Analysis
Total Size: 75 MB
_astro/: 2.1 MB (JS + CSS + fonts)
public/: ~72 MB (images)
Recommendation:
Add bundle analyzer: npm install rollup-plugin-visualizer
Add to astro.config.ts to visualize chunk sizes
2. 🔍 SEO DEEP ANALYSIS (25+ IMPROVEMENTS)
Structured Data (Schema.org)
CRITICAL: Missing Sitemap Reference
Location: public/robots.txt:7-8
Current: # Sitemap: https://yourdomain.com/sitemap-index.xml (COMMENTED)
Fix: Uncomment and replace with actual domain

Sitemap: https://officeprovisionz.com/sitemap-index.xml
Impact: Search engines can't auto-discover sitemap
LocalBusiness Schema - GOOD but Incomplete
Location: BaseLayout.astro:47-66
Current: ✅ Name, address, telephone, email
Missing:
image: Logo or business photo
sameAs: Social media URLs
priceRange: "$" or "$$" indicator
openingHoursSpecification: Business hours
Fix:

{
"image": "https://yoursite.com/og-image.png",
"sameAs": [
"https://www.linkedin.com/company/office-provisionz",
"https://www.facebook.com/officeprovisionz"
],
"priceRange": "$$",
"openingHoursSpecification": {
"@type": "OpeningHoursSpecification",
"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
"opens": "08:00",
"closes": "18:00"
}
}
CRITICAL: Missing Service Schema
Location: Should be on pages/services.astro
Current: No Service schema
Impact: Missing rich snippets for service searches
Fix: Add for each service:

{
"@context": "https://schema.org",
"@type": "Service",
"serviceType": "Office Cleaning",
"provider": {
"@type": "LocalBusiness",
"name": "Office Provisionz"
},
"areaServed": {
"@type": "City",
"name": "San Francisco"
},
"description": "Professional office cleaning services...",
"offers": {
"@type": "Offer",
"availability": "https://schema.org/InStock"
}
}
CRITICAL: Missing FAQPage Schema
Location: Should be on pages/index.astro or dedicated FAQ page
Current: Has FAQ component but no FAQPage markup
Impact: Missing FAQ rich snippets in search
Fix: Add to page with FAQs:

{
"@context": "https://schema.org",
"@type": "FAQPage",
"mainEntity": [
{
"@type": "Question",
"name": "Do you bring your own supplies?",
"acceptedAnswer": {
"@type": "Answer",
"text": "Yes, we bring all necessary cleaning supplies..."
}
}
]
}
Source: FAQ content in src/content/faqs/
Missing Organization Schema
Should add to homepage for knowledge panel:

{
"@context": "https://schema.org",
"@type": "Organization",
"name": "Office Provisionz",
"url": "https://officeprovisionz.com",
"logo": "https://officeprovisionz.com/brand/logo.svg",
"contactPoint": {
"@type": "ContactPoint",
"telephone": "+1-510-913-2197",
"contactType": "Customer Service",
"email": "officeprovisionz@gmail.com"
}
}
Meta Tags & Open Graph
og:image Validation Needed
Location: BaseLayout.astro:359-360
Current: Points to og-image.svg (SVG file)
Issue: Social platforms prefer PNG/JPG
Fix: Convert to PNG at 1200x630px

# Convert SVG to PNG

npm install sharp-cli
sharp public/brand/og-image.svg -o public/brand/og-image.png --width 1200 --height 630
Missing Dynamic OG Images
Current: Same OG image for all pages
Better: Page-specific OG images
Implementation: Use @vercel/og or similar to generate dynamic OG images
Benefit: Better social sharing CTR
Heading Hierarchy Audit
Potential h1 Issues
Files to check:
pages/checklist.astro
pages/pricing.astro
pages/industries.astro
Rule: Each page MUST have exactly one h1
Fix: Ensure PageHeroPro renders h1, or add explicit h1 to each page
Internal Linking Opportunities
Missing Contextual Links
Services page: Should link to related industries
Industries page: Should link to relevant services
Blog/Resources: Should interlink with services
Implementation: Add "Related" sections to each page
Anchor Text Optimization
Current: Generic "Contact us", "Learn more"
Better: "Get office cleaning quote", "Learn about janitorial services"
SEO benefit: Better context for search engines
Image Alt Text Quality
Generic Alt Text Found
Location: HeroPro.tsx:116
Current: "Professional cleaning services showcase"
Better: "Office cleaning team sanitizing commercial workspace in San Francisco"
Rule: Alt text should describe what's visible AND context 3. ♿ ACCESSIBILITY COMPREHENSIVE AUDIT (20+ IMPROVEMENTS)
WCAG 2.1 AA Compliance
Test Coverage Gap
Location: tests/e2e/a11y.spec.ts
Current: Only tests 3 pages (/, /services/, /contact/)
Missing: /about/, /industries/, /pricing/, /resources/, /checklist/, /404/
Fix: Add test cases for all pages

const pages = ['/', '/about/', '/services/', '/contact/', '/industries/', '/pricing/', '/resources/', '/checklist/'];
for (const page of pages) {
test(`${page} should not have accessibility violations`, async ({ page: p }) => {
await p.goto(page);
const results = await new AxeBuilder({ page: p })
.disallowedImpacts(['critical', 'serious'])
.analyze();
expect(results.violations).toEqual([]);
});
}
Color Contrast
Muted Text Contrast Concern
Location: global.css:26
Current: --color-text-muted: 75 85 99; (gray-600)
On white background: Contrast ratio ~4.5:1 (WCAG AA minimum for body text is 4.5:1)
Status: BORDERLINE - needs verification
Test: Use Chrome DevTools Lighthouse or WebAIM contrast checker
Fix if fails: Darken to --color-text-muted: 55 65 81; (gray-700)
Brand Color Contrast
Primary color: 174 100% 35% (teal)
On white: Good contrast ✅
On brand-50: Needs testing
Location: Check Contact.astro:82 conversation strip
Focus Management
GOOD: Skip Link Implementation
Location: BaseLayout.astro:505-510
✅ Correctly hidden with .sr-only
✅ Visible on focus
✅ Points to #main-content
Missing Focus Indicators
Issue: Not all buttons/links have visible :focus-visible state
Check: Header.astro navigation links
Fix: Add explicit focus-visible styles

a:focus-visible, button:focus-visible {
outline: 2px solid hsl(var(--color-brand-500));
outline-offset: 2px;
}
Mobile Menu Focus Trap
Location: Header.astro
Issue: When mobile menu opens, focus should trap inside
Missing: Focus trap logic
Fix: Use focus-trap library or manual keyboard event handling
Form Accessibility Issues
CRITICAL: Error ID Mismatch
Location: ContactForm.astro:27,30
Current:
servicesHelpId = 'services-help' (line 27)
Error div: data-services-error (line 30)
Issue: aria-describedby={helpId} points to help text, but error shown in different element
Fix:

aria-describedby={`${helpId} services-error`}
Missing aria-required Attributes
Location: ContactForm.astro
Current: Uses required attribute (HTML5)
Missing: aria-required="true" for screen readers
Fix: Add to all required inputs

<input required aria-required="true" />
Error Announcement Level
Location: ContactForm.astro:90-97
Current: aria-live="polite" on error messages
Issue: Errors should be assertive, not polite
Fix:

<div aria-live="assertive" role="alert" data-services-error></div>
ARIA Attributes
Missing aria-expanded on Mobile Menu
Location: Header.astro (mobile toggle button)
Missing: aria-expanded="false" that toggles to true
Fix: Add state tracking and update attribute on click
Missing ARIA Landmarks
Footer: Should have <footer role="contentinfo"> or explicit <nav aria-label="Footer navigation">
Main Navigation: Has <nav> but could benefit from aria-label="Main navigation"
Keyboard Navigation
FAQ Keyboard Support
Location: tests/e2e/smoke.spec.ts:15-32
Current: Only tests mouse click on <summary>
Missing: Keyboard Enter/Space test
Fix: Add keyboard test

await page.locator('summary').first().press('Enter');
Note: <details><summary> natively supports keyboard 4. 🔒 SECURITY HARDENING (15+ IMPROVEMENTS)
Security Headers
CRITICAL: Missing Content-Security-Policy
Location: astro.config.ts:67-76 and public/\_headers:4-10
Current: X-Frame-Options, X-Content-Type-Options, Referrer-Policy ✅
Missing: CSP header
Impact: No XSS protection, inline scripts allowed
Fix: Add to both files

Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https:; connect-src 'self' https://formspree.io https://plausible.io; frame-ancestors 'none';
Note: 'unsafe-inline' needed for Astro inline scripts; tighten with nonces in future
Missing Modern Security Headers
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
X-Permitted-Cross-Domain-Policies: none
Add all to: public/\_headers and astro.config.ts
HSTS Duration
Current: max-age=31536000 (1 year) ✅
Could add: includeSubDomains; preload for stronger enforcement
Form Security
CRITICAL: Missing CSRF Protection
Location: ContactForm.astro
Current: No CSRF token
Issue: Form can be submitted from external sites
Fix Options:
If using Formspree: Check if they provide CSRF tokens
If custom backend: Generate token on page load, validate on submit
Add origin check on server side
Missing Honeypot Field
Mentioned: Contact page mentions "hidden anti-spam field" (Contact.astro:142)
Not found: No actual honeypot field in ContactForm.astro
Fix: Add hidden field that bots will fill

<input type="text" name="website" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" />
Validation: Reject if website field is filled
Message Field Unlimited Length
Location: ContactForm.astro (textarea)
Current: No maxlength attribute
Risk: DoS via extremely large message (100 MB+)
Fix:

<textarea maxlength="5000" aria-describedby="message-help">
<p id="message-help" class="text-sm text-muted">Maximum 5000 characters</p>
Client-Side Validation Only
Location: smoke.spec.ts:59
Current: Uses HTML5 checkValidity()
Missing: Server-side validation
Fix: Validate on Formspree/backend with:
Email format regex
Phone number format
Message length limit
Required fields check
Dependency Security
Missing npm audit in CI
Location: .github/workflows/ (if exists)
Current: No bun audit step
Fix: Add to CI workflow

- name: Audit dependencies
  run: bun bun-audit
  Subresource Integrity Missing
  Location: External font/script tags
  Current: No integrity attribute on @fontsource imports
  Risk: CDN compromise could inject malicious code
  Fix: If using external CDN, add SRI hashes

<link href="..." integrity="sha384-..." crossorigin="anonymous" />
5. 📈 ANALYTICS & TRACKING (15+ OPPORTUNITIES)
Core Issue: Analytics Disabled
CRITICAL: Analytics Not Enabled
Location: siteConfig.ts:388
Current: analytics: { enabled: false }
Impact: ZERO visibility into user behavior
Fix:
Sign up for Plausible Analytics ($9/mo) or Google Analytics (free)
Set enabled: true
Add script tag to BaseLayout.astro:500

<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>

Event Tracking Infrastructure
GOOD: Tracking Hook Implemented
Location: BaseLayout.astro:175-189
✅ Vendor-neutral window.damraTrack() function
✅ Supports Plausible
✅ Supports GTM dataLayer
✅ Try-catch for safety
GOOD: Click Tracking
Location: BaseLayout.astro:192-271
✅ Automatic tracking via data-track attribute
✅ Captures: location, action, label, href, page
✅ Text sliced to 120 chars
✅ Safe href extraction
Missing Event Tracking
Form Submission Events
Current: No tracking on form submit
Fix: Add to ContactForm.astro

form.addEventListener('submit', (e) => {
window.damraTrack?.('form_submit', {
form: 'contact',
services: getSelectedServices(),
page: window.location.pathname
});
});
Track:
Submit attempt
Validation errors
Successful submission
Failed submission
Video Play Events
Location: HeroPro.tsx (if video enabled)
Missing: Video play/pause tracking
Fix:

<video onPlay={() => window.damraTrack?.('video_play', { video: 'hero' })} />
FAQ Interaction
Missing: Track which FAQs are opened
Fix: Add to FAQ component

details.addEventListener('toggle', (e) => {
if (e.target.open) {
window.damraTrack?.('faq_open', { question: summary.textContent });
}
});
Gallery Image Views
Missing: Track lightbox opens
Fix: Add to Gallery lightbox click handler
Scroll Depth Tracking
Missing: 25%, 50%, 75%, 100% scroll milestones
Implementation:

let depth25 = false, depth50 = false, depth75 = false, depth100 = false;
window.addEventListener('scroll', () => {
const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) \* 100;
if (percent >= 25 && !depth25) { depth25 = true; window.damraTrack?.('scroll_depth', { depth: 25 }); }
// ... repeat for 50, 75, 100
});
UTM Parameter Tracking
Form Has UTM Fields But Not Populated
Location: ContactForm.astro:74-78
Current: Hidden fields for utm_source, utm_medium, utm_campaign, utm_content
Issue: Not populated from query string
Fix: Add client-side script

const params = new URLSearchParams(window.location.search);
document.querySelector('[name="utm_source"]').value = params.get('utm_source') || '';
// ... repeat for other UTM fields
Web Vitals Tracking
CRITICAL: No Performance Monitoring
Missing: LCP, FID, CLS, FCP, TTFB tracking
Fix: Install web-vitals

bun add web-vitals
Add to BaseLayout:

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
getCLS(metric => window.damraTrack?.('cls', { value: metric.value }));
getFID(metric => window.damraTrack?.('fid', { value: metric.value }));
getFCP(metric => window.damraTrack?.('fcp', { value: metric.value }));
getLCP(metric => window.damraTrack?.('lcp', { value: metric.value }));
getTTFB(metric => window.damraTrack?.('ttfb', { value: metric.value })); 6. 💻 CODE QUALITY (15+ IMPROVEMENTS)
TypeScript
EXCELLENT: Strict Configuration
Location: tsconfig.json:1-13
✅ strict: true
✅ noUncheckedIndexedAccess: true
✅ exactOptionalPropertyTypes: true
✅ Extends "astro/tsconfigs/strict"
Test Coverage Gaps
Missing Unit Tests
Current: Only E2E tests (tests/e2e/)
Missing: Unit tests for utilities
Files to test:
src/lib/publicImages.ts - getPublicResponsiveImage()
src/lib/utils.ts - cn(), getImagePositionClass()
src/lib/links.ts - makeTelHref(), etc.
Create: tests/unit/utils.test.ts

import { describe, it, expect } from 'vitest';
import { cn } from '../src/lib/utils';

describe('cn()', () => {
it('merges class names', () => {
expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
});
});
Missing Visual Regression Tests
File exists: tests/e2e/visual.spec.ts
Status: Likely placeholder or minimal
Expand with: Percy, Chromatic, or Playwright screenshots

test('homepage visual regression', async ({ page }) => {
await page.goto('/');
await expect(page).toHaveScreenshot('homepage.png');
});
Missing Lighthouse CI
No Performance Budget in CI
Current: CI runs lint + build + tests
Missing: Lighthouse performance scoring
Fix: Add to GitHub Actions

- name: Run Lighthouse CI
  run: |
  npm install -g @lhci/cli
  lhci autorun --collect.url=http://localhost:3000
  Configure: .lighthouserc.json with budgets

{
"ci": {
"assert": {
"assertions": {
"categories:performance": ["error", {"minScore": 0.9}],
"categories:accessibility": ["error", {"minScore": 0.9}]
}
}
}
}
Environment Variable Validation
No Runtime Validation
Current: Environment variables read but not validated
Risk: Build succeeds with invalid config
Fix: Add Zod validation in env.d.ts or separate file

import { z } from 'zod';

const envSchema = z.object({
SITE_URL: z.string().url().optional(),
PUBLIC_FORM_ENDPOINT: z.string().url(),
PEXELS_API_KEY: z.string().optional(),
});

envSchema.parse(import.meta.env); 7. 🌐 MODERN WEB STANDARDS
Service Worker
Service Worker Exists
Location: public/sw.js
Strategy: Network-first for HTML, cache-first for assets
Fallback: Offline page or cached home page ✅
Missing Service Worker Verification
No test: Service worker registration success
Add: Registration error handling

navigator.serviceWorker.register('/sw.js')
.then(reg => console.log('SW registered'))
.catch(err => console.error('SW failed:', err));
Progressive Web App
PWA Manifest Generated
Location: pages/site.webmanifest.ts
✅ Dynamic generation from siteConfig
✅ Icons, theme color, display mode
Missing PWA Features
Install prompt: No "Add to Home Screen" prompt
Offline page: Service worker falls back but no dedicated offline page
Update notification: No "New version available" prompt
🎯 PRIORITIZED ACTION PLAN
PHASE 1: Critical Security & Visibility (Week 1)
Action File Time Impact
Add CSP header astro.config.ts:67, \_headers:4 30 min Critical
Uncomment sitemap in robots.txt robots.txt:7 5 min Critical
Enable analytics siteConfig.ts:388, BaseLayout.astro:500 1 hr Critical
Add Service schema services.astro 1 hr High
Add FAQPage schema index.astro 1 hr High
Add Web Vitals tracking BaseLayout.astro 1 hr High
Fix form ARIA error IDs ContactForm.astro:27-30 30 min Medium
Add honeypot field ContactForm.astro 30 min Medium
Total: ~6 hours
PHASE 2: Performance & UX (Week 2)
Action File Time Impact
Generate WebP images publicImages.ts, build script 4 hrs Critical
Remove 2560/3840px widths publicImages.ts:89 15 min Medium
Add lazy loading to images Gallery.astro 30 min Medium
Add font-display: swap global.css 15 min Medium
Throttle scroll events BaseLayout.astro:414 30 min Low
Add form submission tracking ContactForm.astro 1 hr High
Add scroll depth tracking BaseLayout.astro 1 hr Medium
Populate UTM parameters ContactForm.astro:74 30 min Medium
Total: ~8.5 hours
PHASE 3: Testing & Robustness (Week 3)
Action File Time Impact
Expand a11y test coverage a11y.spec.ts 2 hrs High
Add unit tests for utils Create tests/unit/ 3 hrs Medium
Add Lighthouse CI .github/workflows/ 2 hrs Medium
Add environment validation env.d.ts 1 hr Medium
Add CSRF tokens ContactForm.astro 2 hrs Critical
Add modern security headers \_headers, astro.config.ts 30 min High
Total: ~10.5 hours
📊 IMPACT MATRIX
Improvement Effort Impact Priority
Enable Analytics Low (1 hr) Critical 🔥 P0
Add CSP Header Low (30 min) Critical 🔥 P0
Generate WebP Images Medium (4 hrs) Critical 🔥 P0
Fix Sitemap in robots.txt Low (5 min) Critical 🔥 P0
Add Service/FAQ Schemas Low (2 hrs) High ⭐ P1
Track Web Vitals Low (1 hr) High ⭐ P1
CSRF Protection Medium (2 hrs) Critical 🔥 P0
Expand A11y Tests Medium (2 hrs) High ⭐ P1
Unit Tests Medium (3 hrs) Medium ✅ P2
Lighthouse CI Medium (2 hrs) Medium ✅ P2
Form Event Tracking Low (1 hr) High ⭐ P1
UTM Parameter Capture Low (30 min) Medium ✅ P2
Modern Security Headers Low (30 min) High ⭐ P1
🏆 EXPECTED OUTCOMES
After Phase 1 (Week 1):
✅ Full visibility into user behavior via analytics
✅ Enhanced search engine ranking via Service & FAQ schemas
✅ Improved security posture with CSP
✅ Faster search engine indexing via sitemap
After Phase 2 (Week 2):
✅ 30-40% bandwidth reduction from WebP
✅ Better perceived performance from lazy loading
✅ Complete conversion funnel tracking
✅ Faster font rendering
After Phase 3 (Week 3):
✅ Comprehensive test coverage (E2E + Unit + Lighthouse)
✅ Form security hardened against CSRF/spam
✅ Production-grade security headers
✅ Validated environment configuration
