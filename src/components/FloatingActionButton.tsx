import { useEffect, useState } from 'react';
import { MessageCircle, X, Phone, Mail, FileText } from 'lucide-react';

/**
 * Floating Action Button (FAB)
 * Provides quick access to primary actions on mobile
 * Expandable speed dial for multiple actions
 */
export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;

      // Show when scrolled past 100px but not near bottom (where CTA bar shows)
      const shouldShow = scrollY > 100 && scrollY < docHeight - 200;

      setIsVisible(shouldShow);

      // Collapse when scrolling
      if (isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Auto-collapse after 3 seconds of inactivity
  useEffect(() => {
    if (!isExpanded) return;

    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);

    if (typeof window !== 'undefined' && window.damraTrack) {
      window.damraTrack('fab_toggle', { action: isExpanded ? 'collapse' : 'expand' });
    }
  };

  const handleActionClick = (action: string) => {
    if (typeof window !== 'undefined' && window.damraTrack) {
      window.damraTrack('fab_action', { action });
    }
    setIsExpanded(false);
  };

  return (
    <div
      className={`fixed bottom-24 right-4 z-30 transition-all duration-300 md:hidden ${isVisible ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-20 opacity-0'} `}
    >
      {/* Speed Dial Actions */}
      <div
        className={`absolute bottom-16 right-0 flex origin-bottom-right flex-col gap-3 transition-all duration-300 ${isExpanded ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'} `}
      >
        {/* Call Action */}
        <a
          href="tel:+15105551234"
          onClick={() => handleActionClick('call')}
          className="flex touch-manipulation items-center gap-3 whitespace-nowrap rounded-full border border-brand-100/60 bg-white py-3 pl-4 pr-5 text-sm font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 dark:border-brand-800/40 dark:bg-slate-800"
          aria-label="Call now"
        >
          <Phone className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
          <span>Call Now</span>
        </a>

        {/* Email Action */}
        <a
          href="mailto:info@damra.com"
          onClick={() => handleActionClick('email')}
          className="flex touch-manipulation items-center gap-3 whitespace-nowrap rounded-full border border-brand-100/60 bg-white py-3 pl-4 pr-5 text-sm font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 dark:border-brand-800/40 dark:bg-slate-800"
          aria-label="Email us"
        >
          <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
          <span>Email Us</span>
        </a>

        {/* Get Quote Action */}
        <a
          href="/contact"
          onClick={() => handleActionClick('quote')}
          className="flex touch-manipulation items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-600 to-brand-500 py-3 pl-4 pr-5 text-sm font-medium text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-brand-600/40 active:scale-95 dark:from-brand-500 dark:to-brand-600"
          aria-label="Get a free quote"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Get Quote</span>
        </a>
      </div>

      {/* Main FAB Button */}
      <button
        onClick={handleToggle}
        className={`flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-brand-600/40 active:scale-95 dark:from-brand-500 dark:to-brand-600 ${isExpanded ? 'rotate-90' : 'rotate-0'} `}
        aria-label={isExpanded ? 'Close menu' : 'Quick actions'}
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Ripple effect on mount */}
      {isVisible && (
        <div
          className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-20"
          style={{ animationDuration: '1.5s', animationIterationCount: '1' }}
        />
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    damraTrack?: (event: string, props?: Record<string, unknown>) => void;
  }
}
