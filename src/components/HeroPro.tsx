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
  const defaultHeroImg = `${base}gallery/01.jpg`;
  const heroFallback = `${base}gallery/01.svg`;
  const logoSrc = `${base}brand/logo-orb.svg`;

  const heroImg = imageSrc ?? defaultHeroImg;

  const heroVideoWebm = `${base}media/hero-cleaning.webm`;
  const heroVideoMp4 = `${base}media/hero-cleaning.mp4`;

  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    setVideoEnabled(shouldEnableVideo());
  }, []);

  return (
    <section className="hero-splash relative w-full overflow-hidden antialiased">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Always render a lightweight image base (also acts as the video poster / fallback). */}
        <img
          src={heroImg}
          alt=""
          srcSet={imageSrcSet}
          sizes={imageSrcSet ? imageSizes : undefined}
          className="h-full w-full object-cover opacity-[0.26]"
          loading="eager"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== heroFallback) e.currentTarget.src = heroFallback;
          }}
        />

        {/* Optional background video (muted + playsInline + loop). */}
        {videoEnabled ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
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

        <div className="via-white/28 absolute inset-0 bg-gradient-to-b from-white/45 to-transparent dark:from-slate-950/65 dark:via-slate-950/45" />
      </div>

      <div className="container-page relative z-10 pb-20 pt-28 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-[28px] bg-white/70 ring-1 ring-black/5 backdrop-blur dark:bg-slate-900/35 dark:ring-white/10">
            <img
              src={logoSrc}
              alt=""
              width={64}
              height={64}
              loading="eager"
              decoding="async"
              className="block h-16 w-16"
            />
          </div>

          <h1 className="heading-1 text-balance">Details matter here.</h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl">
            {siteConfig.brand.tagline} Serving{' '}
            <span className="text-strong font-semibold">{siteConfig.brand.city}</span>.
          </p>

          <p className="text-subtle mt-10 text-sm">
            Use the phone number above or request a quote from the top menu.
          </p>
        </div>
      </div>
    </section>
  );
};
