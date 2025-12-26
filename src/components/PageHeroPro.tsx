import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { cn } from '@/lib/utils';

type HeroImage = {
  /** Background image path relative to `public/` (no leading slash), e.g. "gallery/04.jpg". */
  src: string;
  /** Optional responsive srcset for the background image (URLs should already include BASE_URL). */
  srcSet?: string | undefined;
  /** Optional sizes for the background image when using srcset. */
  sizes?: string | undefined;

  /** Optional mobile-only background image path relative to `public/` (no leading slash). */
  srcMobile?: string;
  /** Optional mobile-only srcset (URLs should already include BASE_URL). */
  srcSetMobile?: string | undefined;
  /** Optional mobile-only sizes when using `srcSetMobile`. */
  sizesMobile?: string | undefined;

  /** Decorative background: leave empty to hide from screen readers. */
  alt?: string;
  /** CSS `object-position` value, e.g. "50% 40%". */
  position?: string;
};

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

  /** Optional rotating hero images (e.g., 3 per page). When provided, it will rotate every ~5s. */
  images?: HeroImage[];
  /** Defaults to 5000ms when using `images`. */
  rotateIntervalMs?: number;
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

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

function canAutoRotate(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return false;
  } catch {
    // ignore
  }

  try {
    const conn = (navigator as NavigatorWithConnection).connection;
    if (conn?.saveData) return false;
  } catch {
    // ignore
  }

  return true;
}

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
  images,
  rotateIntervalMs = 5000,
  className,
  children,
}: PageHeroProProps) => {
  const legacyImage: HeroImage | undefined = imageSrc
    ? {
        src: imageSrc,
        ...(imageSrcSet ? { srcSet: imageSrcSet } : {}),
        ...(imageSizes ? { sizes: imageSizes } : {}),
        ...(imageSrcMobile ? { srcMobile: imageSrcMobile } : {}),
        ...(imageSrcSetMobile ? { srcSetMobile: imageSrcSetMobile } : {}),
        ...(imageSizesMobile ? { sizesMobile: imageSizesMobile } : {}),
        ...(imageAlt ? { alt: imageAlt } : {}),
        ...(imagePosition ? { position: imagePosition } : {}),
      }
    : undefined;

  const allImages: HeroImage[] =
    Array.isArray(images) && images.length ? images : legacyImage ? [legacyImage] : [];

  const [idx, setIdx] = React.useState(0);
  const rotationEnabled = allImages.length > 1 && canAutoRotate();

  React.useEffect(() => {
    if (!rotationEnabled) return;

    let timer: number | undefined;
    const start = () => {
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(() => {
        setIdx((prev) => (prev + 1) % allImages.length);
      }, rotateIntervalMs);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [allImages.length, rotateIntervalMs, rotationEnabled]);

  React.useEffect(() => {
    if (!rotationEnabled) return;
    if (allImages.length < 2) return;

    const next = (idx + 1) % allImages.length;
    const nextImg = allImages[next];
    if (!nextImg) return;
    const preload = (src?: string) => {
      if (!src) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = toPublicUrl(src);
    };
    preload(nextImg.src);
    preload(nextImg.srcMobile);
  }, [allImages, idx, rotationEnabled]);

  const current = allImages.length ? allImages[Math.min(idx, allImages.length - 1)] : undefined;

  const resolvedImageSrc = current?.src ? toPublicUrl(current.src) : undefined;
  const resolvedMobileImageSrc = current?.srcMobile ? toPublicUrl(current.srcMobile) : undefined;
  const fallbackImageSrc = toPublicUrl('gallery/services/detail-01.jpg');

  return (
    <div
      className={cn(
        'hero-splash hero-photo border-app relative w-full overflow-hidden border-b antialiased',
        className
      )}
    >
      {resolvedImageSrc ? (
        <div aria-hidden="true" className="absolute inset-0">
          {resolvedMobileImageSrc || current?.srcSetMobile ? (
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet={current?.srcSetMobile ?? resolvedMobileImageSrc}
                sizes={current?.srcSetMobile ? current?.sizesMobile : undefined}
              />
              <img
                key={resolvedImageSrc}
                src={resolvedImageSrc}
                alt={current?.alt ?? ''}
                srcSet={current?.srcSet}
                sizes={current?.srcSet ? current?.sizes : undefined}
                decoding="async"
                fetchPriority="high"
                loading="eager"
                className={cn('damra-fade-in h-full w-full object-cover')}
                style={{ objectPosition: current?.position ?? imagePosition }}
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src !== fallbackImageSrc) el.src = fallbackImageSrc;
                }}
              />
            </picture>
          ) : (
            <img
              key={resolvedImageSrc}
              src={resolvedImageSrc}
              alt={current?.alt ?? ''}
              srcSet={current?.srcSet}
              sizes={current?.srcSet ? current?.sizes : undefined}
              decoding="async"
              fetchPriority="high"
              loading="eager"
              className="damra-fade-in h-full w-full object-cover"
              style={{ objectPosition: current?.position ?? imagePosition }}
              onError={(e) => {
                const el = e.currentTarget;
                if (el.src !== fallbackImageSrc) el.src = fallbackImageSrc;
              }}
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/55 to-slate-950/75 dark:from-slate-950/60 dark:via-slate-950/60 dark:to-slate-950/80"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 text-center">
        <div className={cn(resolvedImageSrc ? 'mx-auto max-w-3xl px-2 sm:px-6' : undefined)}>
          <h1
            className={cn(
              'heading-1 text-balance',
              resolvedImageSrc ? 'text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]' : undefined
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              'mx-auto mt-4 max-w-2xl text-balance text-lg sm:text-xl',
              resolvedImageSrc
                ? 'text-white/85 drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)]'
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
