# Cleanup & Organization Roadmap

## Surgical Precision Cleanup - No Design Changes, Just Excellence

> **Philosophy**: Remove clutter, organize chaos, eliminate dead code, and tighten loose ends. Every file should serve a purpose. Every line should earn its place. No design changes. No layout modifications. Just ruthless cleanup and intelligent organization.

---

## 🎯 Guiding Principles

1. **Delete, don't comment** - Dead code gets removed, not commented out
2. **Organize by purpose** - Files grouped by function, not scattered randomly
3. **One source of truth** - No duplicate logic, no redundant files
4. **Explicit over implicit** - Clear names, clear structure, clear purpose
5. **Consistency everywhere** - Same patterns, same conventions, same style
6. **Performance through simplicity** - Less code = faster code

---

## Phase 1: Dead Code Elimination

### 1.1 Unused Imports Audit

**Goal**: Remove every import that isn't actually used

**Process**:

1. Scan all `.astro`, `.tsx`, `.ts` files for unused imports
2. Look for imports that are referenced in comments but not code
3. Check for duplicate imports (same thing imported twice)
4. Remove imports that were used during development but not in final code
5. Verify build still succeeds after each removal

**Files to Check**:

- [ ] All component files in `src/components/`
- [ ] All page files in `src/pages/`
- [ ] Layout files in `src/layouts/`
- [ ] Utility files in `src/lib/`

**Common Patterns to Find**:

```typescript
// Unused import - DELETE
import { SomethingNeverUsed } from 'package';

// Duplicate import - CONSOLIDATE
import { A } from 'lib';
import { B } from 'lib';
// Should be: import { A, B } from 'lib';

// Type-only import not marked - FIX
import { TypeName } from 'package';
// Should be: import type { TypeName } from 'package';
```

### 1.2 Unused Variables & Functions

**Goal**: Find and remove variables/functions that are declared but never used

**Process**:

1. Enable TypeScript's `noUnusedLocals` and `noUnusedParameters` temporarily
2. Review all warnings
3. Delete truly unused code
4. Mark intentionally unused params with `_` prefix
5. Document why something exists if it looks unused but isn't

**Patterns**:

```typescript
// Unused variable - DELETE
const neverUsedValue = calculateSomething();

// Unused function parameter - PREFIX WITH _
function onClick(e: Event) {} // if 'e' is unused
// Should be: function onClick(_e: Event) { }

// Unused function - DELETE OR DOCUMENT
function helperNeverCalled() {}
```

### 1.3 Commented-Out Code

**Goal**: Remove all commented-out code blocks

**Process**:

1. Search for multi-line comments with code-like content
2. Search for `// const`, `// function`, `// import` patterns
3. Check git history - if code was removed intentionally, delete the comment
4. If unsure, create a GitHub issue to discuss, then delete
5. Keep only explanatory comments, never code comments

**What to Remove**:

```typescript
// ❌ REMOVE - Old implementation
// function oldApproach() {
//   return something;
// }

// ❌ REMOVE - Debugging code
// console.log('debug:', value);
// console.log('checking state');

// ❌ REMOVE - Temporary experiments
// const testValue = 123;
// if (testValue > 100) { }

// ✅ KEEP - Explanatory comment
// We use CIELAB here for perceptual uniformity
const colorSpace = 'lab';
```

### 1.4 Debug & Development Code

**Goal**: Remove code that only exists for debugging

**Process**:

1. Search for `console.log`, `console.warn`, `console.debug`
2. Remove or guard behind `import.meta.env.DEV` check
3. Search for `debugger` statements - remove all
4. Look for dev-only features that snuck into production
5. Check for `TODO`, `FIXME`, `HACK` comments - resolve or document

**Patterns**:

```typescript
// ❌ REMOVE completely
console.log('Component rendered');
debugger;

// ✅ CONVERT to proper logging
if (import.meta.env.DEV) {
  console.log('Dev mode: state =', state);
}

// ✅ RESOLVE or CREATE ISSUE
// TODO: Optimize this loop
// Should be either fixed NOW or tracked in GitHub
```

---

## Phase 2: File Organization

### 2.1 Component Organization

**Goal**: Group components by purpose, not alphabetically

**Current State**: Flat `src/components/` directory
**Desired State**: Organized into logical subdirectories

**Proposed Structure**:

```
src/components/
├── layout/          # Layout components (Header, Footer)
│   ├── Header.astro
│   ├── Footer.astro
│   └── index.ts     # Re-export all layout components
├── sections/        # Page sections (Hero, Gallery, Testimonials)
│   ├── HeroPro.tsx
│   ├── PageHeroPro.tsx
│   ├── Gallery.astro
│   ├── Testimonials.astro
│   ├── FAQ.astro
│   ├── Contact.astro
│   ├── ExpertiseGallery.astro
│   └── index.ts
├── features/        # Feature components (ProcessSteps, Pricing)
│   ├── ProcessStepsPro.tsx
│   ├── PricingPro.tsx
│   ├── ServicesPro.tsx
│   ├── IndustriesPro.tsx
│   └── index.ts
├── forms/           # Form-related components
│   ├── ContactForm.astro
│   └── index.ts
├── ui/              # Reusable UI primitives (buttons, etc.)
│   ├── button.tsx
│   ├── Spotlight.tsx
│   ├── HoverEffect.tsx
│   ├── SectionHeader.astro
│   └── index.ts
├── decorative/      # Visual elements (dividers, backgrounds)
│   ├── WaveDivider.astro
│   ├── BridgeDivider.astro
│   └── index.ts
├── mobile/          # Mobile-specific components
│   ├── MobileCTABar.tsx
│   ├── FloatingActionButton.tsx
│   └── index.ts
├── feedback/        # User feedback components
│   ├── Toaster.tsx
│   ├── ErrorBoundary.tsx
│   └── index.ts
├── skeletons/       # Already organized!
│   └── Skeleton.tsx
└── misc/            # One-off components
    ├── TrustBar.astro
    ├── QualityPromise.astro
    ├── ConversionStrip.astro
    ├── CTASection.astro
    ├── CTAStrip.astro
    ├── Services.astro
    ├── Scope.astro
    ├── HowItWorks.astro
    ├── AreasServed.astro
    └── index.ts
```

**Migration Steps**:

1. Create new directory structure
2. Move files to appropriate directories
3. Create `index.ts` in each directory for clean exports
4. Update all imports across the codebase
5. Verify build succeeds
6. Delete old flat structure

**Example `index.ts`**:

```typescript
// src/components/layout/index.ts
export { default as Header } from './Header.astro';
export { default as Footer } from './Footer.astro';

// Usage becomes:
// import { Header, Footer } from '@/components/layout';
```

### 2.2 Type Definitions Organization

**Goal**: Centralize shared types, keep component-specific types local

**Process**:

1. Create `src/types/` directory
2. Move shared types to dedicated files:
   - `src/types/gallery.ts` - GalleryItem, etc.
   - `src/types/site.ts` - Site config types
   - `src/types/forms.ts` - Form-related types
   - `src/types/common.ts` - Utility types
3. Keep component-specific types in component files
4. Create barrel export `src/types/index.ts`

**Example Structure**:

```
src/types/
├── index.ts         # Barrel export
├── gallery.ts       # GalleryItem, GalleryCategory
├── site.ts          # SiteConfig, NavItem
├── forms.ts         # FormField, ValidationRule
└── common.ts        # Optional<T>, Nullable<T>, etc.
```

### 2.3 Utility Functions Organization

**Goal**: Group utilities by purpose, eliminate duplication

**Current State**: `src/lib/` has mixed utilities
**Desired State**: Organized by domain

**Proposed Structure**:

```
src/lib/
├── images/
│   ├── publicImages.ts     # getPublicResponsiveImage
│   ├── optimization.ts     # Image optimization helpers
│   └── index.ts
├── navigation/
│   ├── nav.ts              # makeHref, makeIsActive
│   ├── links.ts            # makeTelHref, makeEmailHref
│   └── index.ts
├── styles/
│   ├── utils.ts            # cn, getImagePositionClass
│   └── index.ts
└── validation/
    ├── forms.ts            # Form validation utilities
    └── index.ts
```

### 2.4 Data Organization

**Goal**: Ensure data files are properly structured

**Current State**: Good structure in `src/data/`
**Improvements**:

1. Add JSDoc comments to all exported functions
2. Ensure consistent return types
3. Add validation/schemas for data shapes
4. Document data sources (where images come from, etc.)

---

## Phase 3: Consistency Enforcement

### 3.1 Naming Conventions Audit

**Goal**: Ensure consistent naming across the codebase

**Rules**:

- Components: PascalCase (e.g., `HeroPro.tsx`)
- Utilities: camelCase (e.g., `makeHref`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT`)
- Files: Match export name (e.g., `HeroPro.tsx` exports `HeroPro`)
- Directories: kebab-case (e.g., `mobile-components/`)

**Process**:

1. Scan for naming inconsistencies
2. Create rename plan (to avoid breaking imports)
3. Execute renames with search-replace
4. Verify build succeeds

**Common Issues**:

```typescript
// ❌ Inconsistent
const API_endpoint = '...';  // Should be: API_ENDPOINT
function MakeHref() { }      // Should be: makeHref
const hero-component.tsx     // Should be: HeroComponent.tsx

// ✅ Consistent
const API_ENDPOINT = '...';
function makeHref() { }
const HeroComponent.tsx
```

### 3.2 Import Path Consistency

**Goal**: Use consistent import style everywhere

**Rules**:

- Always use `@/` alias for `src/` imports
- Group imports: external → internal → relative
- Sort alphabetically within each group
- Prefer named exports over default (except Astro components)

**Process**:

1. Search for `import .* from ['"]\.\./` (relative imports going up)
2. Replace with `@/` alias imports
3. Organize import order
4. Run format to ensure consistency

**Example**:

```typescript
// ❌ Before - Messy imports
import { useState } from 'react';
import WaveDivider from '../WaveDivider.astro';
import { siteConfig } from '../../data/siteConfig';
import type { GalleryItem } from '@/types';
import { cn } from '../lib/utils';

// ✅ After - Clean imports
import { useState } from 'react';

import type { GalleryItem } from '@/types';
import { cn } from '@/lib/styles';
import { siteConfig } from '@/data/siteConfig';
import WaveDivider from '@/components/decorative/WaveDivider.astro';
```

### 3.3 Code Style Consistency

**Goal**: Same patterns everywhere

**Process**:

1. Ensure Prettier is enforced (already is via lint-staged)
2. Check for inconsistent patterns:
   - Arrow functions vs function declarations
   - Single quotes vs double quotes (should match Prettier config)
   - Semicolons vs no semicolons (should match Prettier)
   - Ternary vs if/else for simple conditions
3. Document preferred patterns in code style guide

**Patterns to Unify**:

```typescript
// Prefer arrow functions for callbacks
// ✅ Good
const onClick = () => {};
items.map((item) => item.id);

// ❌ Avoid
function onClick() {}
items.map(function (item) {
  return item.id;
});

// Prefer early returns over nested ifs
// ✅ Good
if (!value) return;
processValue(value);

// ❌ Avoid
if (value) {
  processValue(value);
}

// Prefer template literals for strings with variables
// ✅ Good
const message = `Hello, ${name}!`;

// ❌ Avoid
const message = 'Hello, ' + name + '!';
```

---

## Phase 4: Dependency Cleanup

### 4.1 Package.json Audit

**Goal**: Ensure all dependencies are actually used

**Process**:

1. Run `pnpm why <package>` for each dependency
2. Check if dependency is actually imported anywhere
3. Look for outdated or deprecated packages
4. Consolidate packages that do the same thing
5. Move dev dependencies to devDependencies correctly

**Checks**:

```bash
# Find unused dependencies
pnpm exec depcheck

# Check for outdated packages
pnpm outdated

# Verify each package is imported
# (Manual grep through codebase)
```

**Questions to Ask**:

- Is this package used in any file?
- Can we use native browser/Node APIs instead?
- Is there a lighter alternative?
- Should this be in dependencies vs devDependencies?

### 4.2 Remove Redundant Polyfills

**Goal**: Only polyfill what's actually needed

**Process**:

1. Check browser support matrix (defined in browserslist or package.json)
2. Verify which features need polyfills for target browsers
3. Remove polyfills for features that are now native
4. Document why each polyfill exists

---

## Phase 5: Documentation & Comments Cleanup

### 5.1 Comment Quality Audit

**Goal**: Keep only valuable comments

**Rules**:

- **Keep**: Why something is done (not what)
- **Keep**: Complex algorithm explanations
- **Keep**: Workarounds with issue links
- **Keep**: Important warnings/gotchas
- **Remove**: Obvious comments (e.g., `// Set value to 5`)
- **Remove**: Commented-out code
- **Remove**: Outdated comments

**Process**:

1. Review every comment in codebase
2. Ask: "Does this add information the code doesn't convey?"
3. If no, delete
4. If yes, ensure it's clear and accurate

**Examples**:

```typescript
// ❌ REMOVE - Obvious
// Set the title
const title = 'My Title';

// ❌ REMOVE - Outdated
// TODO: Add dark mode support
// (dark mode already implemented)

// ✅ KEEP - Explains why
// Use CIELAB for perceptual uniformity (human vision is non-linear)
const colorSpace = 'lab';

// ✅ KEEP - Documents workaround
// Safari doesn't support inert, so we manually manage tabindex
// Issue: https://bugs.webkit.org/show_bug.cgi?id=123456
panel.setAttribute('inert', '');
```

### 5.2 JSDoc Completeness

**Goal**: Add JSDoc to public APIs, remove from obvious code

**Process**:

1. Add JSDoc to all exported functions
2. Add JSDoc to all type definitions
3. Don't add JSDoc to private/internal helpers (unless complex)
4. Include `@param`, `@returns`, `@example` where helpful

**Example**:

```typescript
/**
 * Generates a responsive image with multiple sizes for optimal loading.
 *
 * @param src - Image path relative to public directory
 * @param base - Base URL for the site (e.g., "/" or "/repo/")
 * @param options - Optional configuration for sizes attribute
 * @returns Object with src, srcSet, and sizes for <img> tag
 *
 * @example
 * const img = getPublicResponsiveImage('hero.jpg', '/', { sizes: '100vw' });
 * // <img src={img.src} srcset={img.srcSet} sizes={img.sizes} />
 */
export function getPublicResponsiveImage(src: string, base: string, options?: { sizes?: string }) {
  // ...
}
```

---

## Phase 6: Configuration Cleanup

### 6.1 Environment Variables Audit

**Goal**: Ensure all env vars are documented and used

**Process**:

1. Check `.env.example` - does it match what's actually used?
2. Search codebase for `import.meta.env.*` and `process.env.*`
3. Ensure every env var has:
   - Entry in `.env.example` with description
   - Type validation/fallback in code
   - Documentation of expected format
4. Remove unused env vars

### 6.2 Config File Organization

**Goal**: Clean, documented configuration

**Files to Review**:

- `astro.config.ts` - Remove unused options, add comments
- `tailwind.config.ts` - Remove unused theme extensions
- `tsconfig.json` - Ensure all compiler options are intentional
- `.eslintrc` / `eslint.config.js` - Remove unused rules
- `.prettierrc` - Document style choices

**Process**:

1. Review each config file
2. Comment out unused options temporarily
3. Verify build still works
4. If yes, delete. If no, document why it's needed
5. Add comments explaining non-obvious settings

---

## Phase 7: Performance Cleanup

### 7.1 Remove Unused CSS

**Goal**: Only ship CSS that's actually used

**Process**:

1. Check Tailwind purge is working correctly
2. Look for unused global styles in `global.css`
3. Check for duplicate CSS definitions
4. Remove vendor prefixes that are no longer needed (autoprefixer handles this)

**Tools**:

```bash
# Analyze CSS usage
pnpm exec unlighthouse --site http://localhost:4321

# Check bundle size
pnpm run build && du -sh dist/_astro/*
```

### 7.2 Optimize Bundle Splitting

**Goal**: Load only what's needed per page

**Current State**: Manual chunks in `astro.config.ts`
**Process**:

1. Review current chunk strategy
2. Check for chunks that are loaded but not used on certain pages
3. Consider splitting large components into separate chunks
4. Ensure vendor chunks are properly separated

---

## Phase 8: Error Handling Cleanup

### 8.1 Consistent Error Patterns

**Goal**: Handle errors the same way everywhere

**Process**:

1. Search for `try/catch` blocks
2. Ensure each catch does something useful:
   - Log in development
   - Track in production (Sentry/etc)
   - Show user feedback (toast/alert)
   - Provide fallback behavior
3. Remove empty catch blocks or document why they're silent

**Patterns**:

```typescript
// ❌ REMOVE - Silent failure with no tracking
try {
  await riskyOperation();
} catch {
  // ignore
}

// ✅ IMPROVE - Track error, provide fallback
try {
  await riskyOperation();
} catch (error) {
  if (import.meta.env.PROD) {
    trackError('risky_operation_failed', { error });
  }
  // Provide fallback behavior
  return defaultValue;
}
```

### 8.2 Remove Defensive Code That's No Longer Needed

**Goal**: Trust TypeScript, remove redundant checks

**Process**:

1. Look for null checks on values that TypeScript guarantees aren't null
2. Remove redundant type guards
3. Keep only checks at system boundaries (user input, API responses)

**Examples**:

```typescript
// ❌ REMOVE - TypeScript already ensures this
function greet(name: string) {
  if (!name) return; // TypeScript ensures name is string (not null/undefined)
  console.log(`Hello, ${name}`);
}

// ✅ KEEP - User input needs validation
function submitForm(data: FormData) {
  const name = String(data.get('name') ?? '').trim();
  if (!name) {
    showError('Name is required');
    return;
  }
  // ...
}
```

---

## Phase 9: Git & Repository Cleanup

### 9.1 .gitignore Audit

**Goal**: Ensure all build artifacts are ignored

**Process**:

1. Check for files in repo that shouldn't be there
2. Add patterns to `.gitignore` for:
   - Editor config (`.vscode/`, `.idea/`)
   - OS files (`.DS_Store`, `Thumbs.db`)
   - Build artifacts (`dist/`, `.astro/`)
   - Temp files (`*.tmp`, `*.log`)
3. Remove files that were accidentally committed

### 9.2 Remove Large Unused Assets

**Goal**: Keep repository lean

**Process**:

1. Check `public/` for unused images/media
2. Run `git ls-files --others` to find untracked files
3. Remove any assets that aren't referenced in code
4. Consider moving large media to CDN/external storage

---

## Phase 10: Final Verification

### 10.1 Build & Test Matrix

**Goal**: Ensure nothing broke during cleanup

**Checklist**:

- [ ] `pnpm run build` succeeds with 0 errors, 0 warnings
- [ ] `pnpm run typecheck` passes
- [ ] `pnpm run lint` passes
- [ ] `pnpm run format` makes no changes (already formatted)
- [ ] All pages load without console errors
- [ ] Forms still submit correctly
- [ ] Mobile menu works
- [ ] Gallery lightbox works
- [ ] Toast notifications appear
- [ ] Dark mode toggle works

### 10.2 Performance Comparison

**Goal**: Ensure cleanup improved or maintained performance

**Metrics to Compare** (Before vs After):

- Bundle size (total JS)
- Number of HTTP requests
- Lighthouse scores
- Build time
- Type check time

### 10.3 Documentation Update

**Goal**: Update docs to reflect new organization

**Tasks**:

- [ ] Update import examples in comments/docs
- [ ] Document new directory structure
- [ ] Add CONTRIBUTING.md with code organization guide
- [ ] Update README if needed

---

## Execution Order (Step-by-Step)

### Week 1: Foundation Cleanup

1. **Day 1**: Phase 1.1 - Unused imports audit
2. **Day 2**: Phase 1.2 - Unused variables/functions
3. **Day 3**: Phase 1.3-1.4 - Commented code & debug cleanup
4. **Day 4**: Phase 3.1 - Naming conventions
5. **Day 5**: Phase 3.2 - Import path consistency

### Week 2: Organization

6. **Day 6-7**: Phase 2.1 - Component organization (plan + execute)
7. **Day 8**: Phase 2.2 - Type definitions organization
8. **Day 9**: Phase 2.3 - Utility functions organization
9. **Day 10**: Phase 3.3 - Code style consistency

### Week 3: Deep Cleanup

10. **Day 11**: Phase 4.1 - Package.json audit
11. **Day 12**: Phase 5.1 - Comment quality audit
12. **Day 13**: Phase 5.2 - JSDoc completeness
13. **Day 14**: Phase 6.1-6.2 - Configuration cleanup
14. **Day 15**: Phase 7.1-7.2 - Performance cleanup

### Week 4: Polish & Verification

15. **Day 16**: Phase 8.1-8.2 - Error handling cleanup
16. **Day 17**: Phase 9.1-9.2 - Git cleanup
17. **Day 18**: Phase 10.1 - Build & test verification
18. **Day 19**: Phase 10.2 - Performance comparison
19. **Day 20**: Phase 10.3 - Documentation update

---

## Success Criteria

### Code Quality

✅ Zero TypeScript errors
✅ Zero ESLint warnings
✅ Zero console.logs in production code
✅ Zero commented-out code blocks
✅ Zero unused imports/variables

### Organization

✅ Every component in logical directory
✅ Every utility in appropriate namespace
✅ Consistent import patterns (100% using `@/` alias)
✅ Consistent naming conventions throughout

### Performance

✅ Build time: Same or better
✅ Bundle size: Same or smaller
✅ Type check time: Same or faster
✅ Lighthouse scores: Same or better

### Documentation

✅ All public functions have JSDoc
✅ All complex logic has explanatory comments
✅ Zero obvious/redundant comments
✅ README reflects current structure

---

## Tools & Commands

```bash
# Find unused exports
pnpm exec ts-prune

# Find unused dependencies
pnpm exec depcheck

# Check for duplicate code
pnpm exec jscpd src/

# Analyze bundle size
pnpm exec vite-bundle-visualizer

# Find large files
find . -type f -size +100k | grep -v node_modules | grep -v .git

# Count lines of code
cloc src/

# Find commented code
grep -r "^[[:space:]]*// [a-z]" src/ | grep -v "// [A-Z]"
```

---

## Notes

### What NOT to Change

❌ **Never modify**:

- Visual design (colors, spacing, typography)
- Layout structure (component hierarchy)
- User-facing behavior (interactions, animations)
- URL structure or routing
- Build output (unless optimizing size)

✅ **Always modify**:

- Code organization (file structure)
- Import paths (use aliases)
- Internal naming (variables, functions)
- Comments (improve clarity)
- Dead code (delete it)

### Red Flags During Cleanup

If you encounter any of these, STOP and investigate:

- ⚠️ Removing import causes build to fail (might be side effect import)
- ⚠️ Deleting file breaks multiple imports (might need gradual migration)
- ⚠️ Comment mentions "critical" or "do not remove" (respect it)
- ⚠️ Code looks dead but has complex logic (might be future feature)
- ⚠️ Performance degrades after cleanup (revert and analyze)

### Git Strategy

1. Create cleanup branch: `git checkout -b cleanup/organization`
2. Commit after each phase: `git commit -m "cleanup: remove unused imports"`
3. Test after each commit: `pnpm run build && pnpm run typecheck`
4. Create PR for review before merging
5. Squash commits into logical units

---

**Last Updated**: 2025-12-31
**Status**: Ready for execution
**Philosophy**: Clean code is a love letter to the future.
