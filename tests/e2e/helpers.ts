import type { Page } from '@playwright/test';

export async function disableAnimations(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
      }

      /* Prevent the route progress bar from animating during screenshot stabilization. */
      [data-route-progress] {
        transition-duration: 0.001ms !important;
      }
    `,
  });

  // Give the page a chance to settle before screenshot assertions.
  // - Wait for the route progress bar to return to idle (it uses timeouts on page-load)
  // - Encourage images to eagerly decode so fullPage screenshots don't change between captures
  await page
    .waitForFunction(() => {
      const el = document.querySelector('[data-route-progress]');
      if (!el || !(el instanceof HTMLElement)) return true;
      return el.dataset.state === 'idle';
    })
    .catch(() => {
      // ignore
    });

  await page
    .evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs.map((img) => {
          try {
            img.loading = 'eager';
          } catch {
            // ignore
          }

          if (!img.complete) {
            return new Promise<void>((resolve) => {
              img.addEventListener('load', () => resolve(), { once: true });
              img.addEventListener('error', () => resolve(), { once: true });
            });
          }

          try {
            // decode() helps stabilize rendering and avoids late paints.
            // Not supported everywhere; safe to ignore.
            return img.decode().catch(() => undefined);
          } catch {
            return undefined;
          }
        })
      );
    })
    .catch(() => {
      // ignore
    });
}
