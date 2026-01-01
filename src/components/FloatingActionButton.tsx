import { useEffect, useState } from 'react';
import { MessageCircle, X, Phone, Mail, FileText } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { makeMailtoHref, makeTelHref } from '@/lib/links';

/**
 * Floating Action Button (FAB)
 * Provides quick access to primary actions on mobile
 * Expandable speed dial for multiple actions
 */
export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const base = import.meta.env.BASE_URL;
  const contactHref = `${base}contact/`;
  const telHref = makeTelHref(siteConfig.contact.phoneE164);
  const mailtoHref = makeMailtoHref(siteConfig.contact.email);

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
      window.damraTrack('cta_click', {
        location: 'fab',
        action,
        href:
          action === 'call'
            ? telHref
            : action === 'email'
              ? mailtoHref
              : action === 'quote'
                ? contactHref
                : undefined,
      });
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
          href={telHref}
          onClick={() => handleActionClick('call')}
          className="border-app flex touch-manipulation items-center gap-3 whitespace-nowrap rounded-full border bg-surface py-3 pl-4 pr-5 text-sm font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          aria-label="Call now"
        >
          <Phone className="text-brand h-4 w-4" aria-hidden="true" />
          <span>Call Now</span>
        </a>

        {/* Email Action */}
        <a
          href={mailtoHref}
          onClick={() => handleActionClick('email')}
          className="border-app flex touch-manipulation items-center gap-3 whitespace-nowrap rounded-full border bg-surface py-3 pl-4 pr-5 text-sm font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          aria-label="Email us"
        >
          <Mail className="text-brand h-4 w-4" aria-hidden="true" />
          <span>Email Us</span>
        </a>

        {/* Get Quote Action */}
        <a
          href={contactHref}
          onClick={() => handleActionClick('quote')}
          className="bg-brand shadow-brand/30 hover:shadow-brand/40 flex touch-manipulation items-center gap-3 whitespace-nowrap rounded-full py-3 pl-4 pr-5 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          aria-label="Get a free quote"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Get Quote</span>
        </a>
      </div>

      {/* Main FAB Button */}
      <button
        onClick={handleToggle}
        className={`bg-brand shadow-brand/30 hover:shadow-brand/40 flex h-14 w-14 touch-manipulation items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95 ${isExpanded ? 'rotate-90' : 'rotate-0'} `}
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
        <div className="bg-brand pointer-events-none absolute inset-0 animate-ping rounded-full opacity-20 [animation-duration:1.5s] [animation-iteration-count:1]" />
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
