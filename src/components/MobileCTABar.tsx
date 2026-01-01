import { useEffect, useState } from 'react';
import { Phone, FileText } from 'lucide-react';

/**
 * Bottom-sticky mobile CTA bar
 * Provides always-accessible conversion actions on mobile devices
 * Hides on certain pages and scroll positions for optimal UX
 */
export function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Hide on specific pages
    const hiddenPaths = ['/contact', '/thanks'];
    const currentPath = window.location.pathname;
    const shouldHidePage = hiddenPaths.some((path) => currentPath.includes(path));

    if (shouldHidePage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100; // Show after scrolling 100px

      // Hide when at very top of page
      if (currentScrollY < scrollThreshold) {
        setIsVisible(false);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide when near bottom (footer area)
      const bottomThreshold = document.body.scrollHeight - window.innerHeight - 200;
      if (currentScrollY > bottomThreshold) {
        setIsVisible(false);
        setLastScrollY(currentScrollY);
        return;
      }

      // Show/hide based on scroll direction
      const scrollDelta = currentScrollY - lastScrollY;

      if (scrollDelta > 50) {
        // Scrolling down fast - hide
        setIsVisible(false);
      } else if (scrollDelta < -10) {
        // Scrolling up - show
        setIsVisible(true);
      } else if (currentScrollY > scrollThreshold && !isVisible) {
        // Initial show after threshold
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isVisible]);

  // Track CTA clicks
  const handleCTAClick = (action: 'call' | 'quote') => {
    if (typeof window !== 'undefined' && window.damraTrack) {
      window.damraTrack('mobile_cta_click', { action });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out md:hidden ${isVisible ? 'translate-y-0' : 'translate-y-full'} `}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="border-app border-t bg-surface/95 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur-lg dark:shadow-[0_-4px_12px_rgba(0,0,0,0.24)]">
        <div className="container-page py-3">
          <div className="flex gap-3">
            {/* Call Now Button */}
            <a
              href="tel:+15105551234"
              onClick={() => handleCTAClick('call')}
              className="btn-primary flex flex-1 touch-manipulation items-center justify-center gap-2 transition-transform active:scale-[0.97]"
              aria-label="Call now for a free quote"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call Now</span>
            </a>

            {/* Get Quote Button */}
            <a
              href="/contact"
              onClick={() => handleCTAClick('quote')}
              className="btn-accent flex flex-1 touch-manipulation items-center justify-center gap-2 transition-transform active:scale-[0.97]"
              aria-label="Get a free quote"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Get Quote</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    damraTrack?: (event: string, props?: Record<string, unknown>) => void;
  }
}
