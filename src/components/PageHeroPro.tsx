import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { cn, getImagePositionClass } from '@/lib/utils';

export interface PageHeroProProps {
  title: string;
  description: string;
  /** Optional background image path relative to `public/` (no leading slash), e.g. "gallery/04.jpg". */
  imageSrc?: string | undefined;
  /** Optional responsive srcset for the background image (URLs should already include BASE_URL). */
  imageSrcSet?: string | undefined;
  /** Optional sizes for the background image when using srcset. */
  imageSizes?: string | undefined;

  /** Optional mobile-only background image path relative to `public/` (no leading slash). */
  imageSrcMobile?: string | undefined;
  /** Optional mobile-only srcset (URLs should already include BASE_URL). */
  imageSrcSetMobile?: string | undefined;
  /** Optional mobile-only sizes when using `imageSrcSetMobile`. */
  imageSizesMobile?: string | undefined;
  /** Decorative background: leave empty to hide from screen readers. */
  imageAlt?: string | undefined;
  /** CSS `object-position` value, e.g. "50% 40%". */
  imagePosition?: string | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
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
  const fallbackImageSrc = resolvedImageSrc ?? resolvedMobileImageSrc ?? '';

  const imagePositionClass = getImagePositionClass(imagePosition);

  return (
    <div
      className={cn(
        'hero-splash hero-photo border-app relative w-full overflow-hidden border-b antialiased',
        className
      )}
    >
      {/* Top-down gradient overlay for header readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/40 to-transparent opacity-60"
      />
      {resolvedImageSrc ? (
        <div className="absolute inset-0">
          {resolvedMobileImageSrc || imageSrcSetMobile ? (
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet={imageSrcSetMobile ?? resolvedMobileImageSrc}
                sizes={imageSrcSetMobile ? imageSizesMobile : undefined}
              />
              <img
                src={resolvedImageSrc}
                alt={imageAlt || ''}
                srcSet={imageSrcSet}
                sizes={imageSrcSet ? imageSizes : undefined}
                decoding="async"
                fetchPriority="high"
                loading="eager"
                className={cn('damra-fade-in h-full w-full object-cover', imagePositionClass)}
                onError={(e) => {
                  const el = e.currentTarget;
                  if (fallbackImageSrc && el.src !== fallbackImageSrc) el.src = fallbackImageSrc;
                }}
              />
            </picture>
          ) : (
            <img
              src={resolvedImageSrc}
              alt={imageAlt || ''}
              srcSet={imageSrcSet}
              sizes={imageSrcSet ? imageSizes : undefined}
              decoding="async"
              fetchPriority="high"
              loading="eager"
              className={cn('damra-fade-in h-full w-full object-cover', imagePositionClass)}
              onError={(e) => {
                const el = e.currentTarget;
                if (fallbackImageSrc && el.src !== fallbackImageSrc) el.src = fallbackImageSrc;
              }}
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-900/50 via-60% to-teal-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/70"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 py-16 text-center md:py-20 lg:py-24">
        <div
          className={cn(
            resolvedImageSrc ? 'mx-auto max-w-3xl px-2 sm:px-6 lg:max-w-4xl' : undefined
          )}
        >
          <h1
            className={cn(
              'heading-1 text-balance lg:text-5xl xl:text-6xl',
              resolvedImageSrc ? 'text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]' : undefined
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              'mx-auto mt-4 max-w-2xl text-balance text-lg sm:text-xl lg:mt-6 lg:max-w-3xl lg:text-2xl',
              resolvedImageSrc
                ? 'text-white/90 drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)]'
                : 'text-muted'
            )}
          >
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
};
