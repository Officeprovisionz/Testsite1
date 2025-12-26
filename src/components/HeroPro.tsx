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
};

export const HeroPro = ({ imageSrc, imageSrcSet, imageSizes }: HeroProProps) => {
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
        <img
          src={heroImg}
          alt=""
          srcSet={imageSrcSet}
          sizes={imageSrcSet ? imageSizes : undefined}
          className="h-full w-full object-cover opacity-[0.72]"
          loading="eager"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== heroFallback) e.currentTarget.src = heroFallback;
          }}
        />

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

        {/* Gentle readability veil that still lets the photo show through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent dark:from-black/50 dark:via-black/25" />
      </div>

      <div className="container-page relative z-10 pb-20 pt-28 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="heading-1 text-balance">For spaces shaped by ambition and expectation.</h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl">
            {siteConfig.brand.tagline} Serving{' '}
            <span className="text-strong font-semibold">{siteConfig.brand.city}</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
