import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { cn } from '@/lib/utils';

interface PageHeroProProps {
  title: string;
  description: string;
  /** Optional background image path relative to `public/` (no leading slash), e.g. "gallery/04.jpg". */
  imageSrc?: string;
  /** Optional responsive srcset for the background image (URLs should already include BASE_URL). */
  imageSrcSet?: string | undefined;
  /** Optional sizes for the background image when using srcset. */
  imageSizes?: string | undefined;

  /** Optional mobile-only background image path relative to `public/` (no leading slash). */
  imageSrcMobile?: string;
  /** Optional mobile-only srcset (URLs should already include BASE_URL). */
  imageSrcSetMobile?: string | undefined;
  /** Optional mobile-only sizes when using `imageSrcSetMobile`. */
  imageSizesMobile?: string | undefined;
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
  imageSrcSet,
  imageSizes,
  imageSrcMobile,
  imageSrcSetMobile,
  imageSizesMobile,
  imageAlt = '',
  imagePosition = '50% 40%',
  className,
  children,
}: PageHeroProProps) => {
  const resolvedImageSrc = imageSrc ? toPublicUrl(imageSrc) : undefined;
  const resolvedMobileImageSrc = imageSrcMobile ? toPublicUrl(imageSrcMobile) : undefined;
  const fallbackImageSrc = toPublicUrl('gallery/services/detail-01.jpg');

  return (
    <div
      className={cn(
        'hero-splash border-app relative w-full overflow-hidden border-b antialiased',
        className
      )}
    >
      {resolvedImageSrc ? (
        <div aria-hidden="true" className="absolute inset-0">
          {resolvedMobileImageSrc || imageSrcSetMobile ? (
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet={imageSrcSetMobile ?? resolvedMobileImageSrc}
                sizes={imageSrcSetMobile ? imageSizesMobile : undefined}
              />
              <img
                src={resolvedImageSrc}
                alt={imageAlt}
                srcSet={imageSrcSet}
                sizes={imageSrcSet ? imageSizes : undefined}
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
            </picture>
          ) : (
            <img
              src={resolvedImageSrc}
              alt={imageAlt}
              srcSet={imageSrcSet}
              sizes={imageSrcSet ? imageSizes : undefined}
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
          )}
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
