import { siteConfig } from '@/data/siteConfig';
import { useEffect, useState } from 'react';
import { Spotlight } from './ui/Spotlight';

const shouldEnableVideo = () => {
  if (typeof window === 'undefined') return false;

  // Respect reduced motion.
  if (typeof window.matchMedia === 'function') {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return false;
  }

  // Respect data saver / slow connections when available.
  const nav = navigator as Navigator & {
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
  };
  const conn = nav.connection;
  if (conn?.saveData) return false;
  const t = (conn?.effectiveType ?? '').toLowerCase();
  if (t.includes('2g') || t.includes('slow-2g')) return false;

  return true;
};

type HeroProProps = {
  /** Optional fully-qualified (BASE_URL-prefixed) hero image URL. */
  imageSrc?: string;
  /** Optional srcset string for the hero image (URLs should already include BASE_URL). */
  imageSrcSet?: string | undefined;
  /** Optional sizes attribute when using srcset. */
  imageSizes?: string | undefined;

  /** Optional mobile-only hero image URL (BASE_URL-prefixed). Enables art-direction via <picture>. */
  imageSrcMobile?: string;
  /** Optional mobile-only srcset string (URLs should already include BASE_URL). */
  imageSrcSetMobile?: string | undefined;
  /** Optional mobile-only sizes attribute when using the mobile srcset. */
  imageSizesMobile?: string | undefined;

  /** CSS `object-position` value for the hero image, e.g. "50% 30%". */
  imagePosition?: string;
};

export const HeroPro = ({
  imageSrc,
  imageSrcSet,
  imageSizes,
  imageSrcMobile,
  imageSrcSetMobile,
  imageSizesMobile,
  imagePosition = '50% 50%',
}: HeroProProps) => {
  const base = import.meta.env.BASE_URL;
  // Opt-in only: avoids 404 network requests when the optional hero videos are not present.
  // To enable, set PUBLIC_ENABLE_HERO_VIDEO=true and add:
  // - public/media/hero-cleaning.webm
  // - public/media/hero-cleaning.mp4
  const heroVideoOptIn =
    String(import.meta.env.PUBLIC_ENABLE_HERO_VIDEO ?? '').toLowerCase() === 'true';
  // Using a high-quality Unsplash image for the Golden Gate Bridge sunset
  const defaultHeroImg = `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000&auto=format&fit=crop`;
  const heroFallback = `${base}gallery/services/detail-01.jpg`;
  // Logo removed as requested

  const heroImg = imageSrc ?? defaultHeroImg;

  const imagePositionClass =
    imagePosition === '50% 40%'
      ? 'object-[50%_40%]'
      : imagePosition === '50% 45%'
        ? 'object-[50%_45%]'
        : imagePosition === '50% 50%'
          ? 'object-center'
          : 'object-center';

  const heroVideoWebm = `${base}media/hero-cleaning.webm`;
  const heroVideoMp4 = `${base}media/hero-cleaning.mp4`;

  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    if (!heroVideoOptIn) {
      setVideoEnabled(false);
      return;
    }
    setVideoEnabled(shouldEnableVideo());
  }, []);

  return (
    <section className="hero-splash hero-photo relative w-full overflow-hidden antialiased">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Always render a lightweight image base (also acts as the video poster / fallback). */}
        {imageSrcMobile || imageSrcSetMobile ? (
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={imageSrcSetMobile ?? imageSrcMobile}
              sizes={imageSrcSetMobile ? imageSizesMobile : undefined}
            />
            <img
              src={heroImg}
              alt=""
              srcSet={imageSrcSet}
              sizes={imageSrcSet ? imageSizes : undefined}
              className={`h-full w-full object-cover ${imagePositionClass} opacity-[0.62] sm:opacity-[0.72]`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                if (e.currentTarget.src !== heroFallback) e.currentTarget.src = heroFallback;
              }}
            />
          </picture>
        ) : (
          <img
            src={heroImg}
            alt=""
            srcSet={imageSrcSet}
            sizes={imageSrcSet ? imageSizes : undefined}
            className={`h-full w-full object-cover ${imagePositionClass} opacity-[0.62] sm:opacity-[0.72]`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={(e) => {
              if (e.currentTarget.src !== heroFallback) e.currentTarget.src = heroFallback;
            }}
          />
        )}

        {/* Optional background video (muted + playsInline + loop). */}
        {videoEnabled ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImg}
            disablePictureInPicture
            onError={() => setVideoEnabled(false)}
          >
            <source src={heroVideoWebm} type="video/webm" />
            <source src={heroVideoMp4} type="video/mp4" />
          </video>
        ) : null}

        {/* Mobile-first readability veil with brand-tinted overlay (not pure black). */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 via-60% to-teal-900/20 dark:from-slate-950/70 dark:via-slate-950/40 sm:from-slate-900/45 sm:via-slate-900/20" />
      </div>

      {/* Match the inner-page hero corner accent (used on Services) for visual consistency. */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="container-page relative z-10 pb-24 pt-32 lg:pb-36 lg:pt-44 xl:pb-40 xl:pt-48">
        <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
          <h1 className="heading-1 animate-slide-up text-balance font-serif text-white drop-shadow-md lg:text-5xl xl:text-6xl">
            For spaces shaped by ambition and expectation.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-balance text-lg font-medium leading-relaxed text-white/90 drop-shadow-sm [animation-delay:200ms] md:text-xl lg:mt-8 lg:max-w-3xl lg:text-2xl">
            Premium commercial cleaning and facility management for{' '}
            <span className="font-bold text-white">{siteConfig.brand.city}</span>'s most demanding
            environments.
          </p>
          <div className="mt-10 flex animate-slide-up flex-col items-center justify-center gap-4 [animation-delay:400ms] sm:flex-row lg:mt-12 lg:gap-5">
            <a
              href={`${base}contact/`}
              className="btn-accent shadow-accent-900/30 min-w-[180px] shadow-lg lg:min-w-[200px] lg:px-8 lg:py-4 lg:text-base"
            >
              Get a Free Quote
            </a>
            <a
              href={`${base}services/`}
              className="btn-invert min-w-[180px] lg:min-w-[200px] lg:px-8 lg:py-4 lg:text-base"
            >
              View Services
            </a>
          </div>{' '}
        </div>
      </div>
    </section>
  );
};
