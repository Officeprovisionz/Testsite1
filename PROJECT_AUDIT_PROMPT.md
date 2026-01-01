# Project Health & Growth Audit Prompt

This prompt is designed to help GitHub Copilot (or any advanced AI agent) perform a deep audit and implementation of previously "unchecked" areas in the **Office Provisionz** project.

---

## The Prompt

"I want you to perform a **Comprehensive Project Health & Growth Audit** on this Astro-based landing page. We have a solid foundation, but I want to push it to the next level in areas that have been left unchecked.

Please follow these steps:

### 1. Data & Content Architecture Audit

- **Unification**: Analyze `src/data/siteConfig.ts` and `src/content/`. Identify redundancies and propose a plan to unify all business data (services, industries, testimonials) into Astro Content Collections for better type safety and validation.
- **Integrity Check**: Create a script (or enhance `scripts/check-mojibake.mjs`) to validate all internal and external links across the site, ensuring no 404s or broken references.

### 2. Advanced SEO & Schema Implementation

- **Service Schema**: Implement `schema.org/Service` markup for each service family in `src/pages/services.astro`.
- **Organization Schema**: Enhance `BaseLayout.astro` with `schema.org/Organization` and `schema.org/CleaningService` (a more specific sub-type of LocalBusiness).
- **Dynamic OG Images**: Propose and implement a strategy for generating dynamic Open Graph images for each page (e.g., using an Astro endpoint or a script).

### 3. Testing Infrastructure (The "Missing Piece")

- **Unit Testing**: Set up **Vitest** and write unit tests for critical utility functions in `src/lib/utils.ts` and `src/lib/publicImages.ts`.
- **E2E Testing**: Set up **Playwright** and create a basic test suite that verifies:
  - The contact form is present and interactive.
  - Navigation links work correctly.
  - The FAQ accordion functions as expected.
- **Visual Regression**: Add a Playwright test to capture screenshots of key pages (`index`, `services`, `industries`) to prevent future UI regressions.

### 4. Performance & Accessibility Guardrails

- **Automated Audit**: Create a script that runs **Lighthouse** or **axe-core** against the build output and fails if scores drop below a certain threshold (e.g., 95+ for Accessibility and SEO).
- **Image Audit**: Analyze `public/media/` and `public/brand/`. Identify any unused assets or images that could be further optimized beyond the current `sharp` implementation.

### 5. Developer Experience (DX)

- **VS Code Tasks**: Create a `.vscode/tasks.json` file that maps common `pnpm` scripts (dev, build, lint, typecheck) to VS Code tasks for easier access.
- **Component Documentation**: Create a hidden `/dev/styleguide` page that renders all UI components from `src/components/ui/` with their various states (hover, active, etc.) to ensure design consistency.

**Instructions for the AI:**

1. Start by researching the current state of each area mentioned above.
2. Provide a summary of your findings and a prioritized implementation plan.
3. Proceed to implement the changes one by one, starting with the most impactful (e.g., SEO and Testing)."
