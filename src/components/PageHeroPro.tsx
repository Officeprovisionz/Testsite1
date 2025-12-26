import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { cn } from '@/lib/utils';

interface PageHeroProProps {
  title: string;
  description: string;
  /** Optional background image path relative to `public/` (no leading slash), e.g. "gallery/04.jpg". */
  imageSrc?: string;
  /** Decorative background: leave empty to hide from screen readers. */
  imageAlt?: string;
  /** CSS `object-position` value, e.g. "50% 40%". */
  imagePosition?: string;
  className?: string;
  children?: React.ReactNode;
}

const toPublicUrl = (src: string) => {
  // Allow absolute URLs
  if (/^https?:\/\//i.test(src)) return src;
  // Ensure BASE_URL works for GitHub Pages
  const cleaned = src.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${cleaned}`;
};

export const PageHeroPro = ({
  title,
  description,
  imageSrc,
  imageAlt = '',
  imagePosition = '50% 40%',
  className,
  children,
}: PageHeroProProps) => {
  const resolvedImageSrc = imageSrc ? toPublicUrl(imageSrc) : undefined;
  const fallbackImageSrc = toPublicUrl('gallery/01.svg');

  return (
    <div
      className={cn(
        'hero-splash border-app relative w-full overflow-hidden border-b antialiased',
        className
      )}
    >
      {resolvedImageSrc ? (
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src={resolvedImageSrc}
            alt={imageAlt}
            decoding="async"
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover"
            style={{ objectPosition: imagePosition }}
            onError={(e) => {
              const el = e.currentTarget;
              if (el.src !== fallbackImageSrc) el.src = fallbackImageSrc;
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/70 to-white/90 dark:from-slate-950/55 dark:via-slate-950/70 dark:to-slate-950/85"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 text-center">
        <div
          className={cn(
            resolvedImageSrc
              ? 'hero-panel glass-panel mx-auto max-w-3xl px-6 py-7 sm:px-10 sm:py-9'
              : undefined
          )}
        >
          <h1 className="heading-1 text-balance">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted sm:text-xl">
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
};
