import { siteConfig } from '@/data/siteConfig';
import { useEffect, useState } from 'react';

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
  // Using a high-quality Unsplash image for the Golden Gate Bridge sunset
  const defaultHeroImg = `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000&auto=format&fit=crop`;
  const heroFallback = `${base}gallery/01.jpg`;
  // Logo removed as requested

  const heroImg = imageSrc ?? defaultHeroImg;

  const heroVideoWebm = `${base}media/hero-cleaning.webm`;
  const heroVideoMp4 = `${base}media/hero-cleaning.mp4`;

  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
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
              className="h-full w-full object-cover opacity-[0.62] sm:opacity-[0.72]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={{ objectPosition: imagePosition }}
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
            className="h-full w-full object-cover opacity-[0.62] sm:opacity-[0.72]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: imagePosition }}
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

        {/* Mobile-first readability veil (stronger on small screens, lighter on larger). */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/0 dark:from-black/65 dark:via-black/35 sm:from-black/35 sm:via-black/15" />
      </div>

      <div className="container-page relative z-10 pb-20 pt-28 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="heading-1 animate-slide-up text-balance font-serif text-white drop-shadow-md">
            For spaces shaped by ambition and expectation.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-balance text-lg font-medium leading-relaxed text-white/90 drop-shadow-sm [animation-delay:200ms] md:text-xl">
            Premium commercial cleaning and facility management for{' '}
            <span className="font-bold text-white">{siteConfig.brand.city}</span>'s most demanding
            environments.
          </p>
        </div>
      </div>
    </section>
  );
};
