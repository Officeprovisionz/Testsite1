import React, { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { Sparkles, Box, ClipboardCheck, Wrench } from 'lucide-react';

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(Boolean(mq.matches));
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
};

const RotatingHeaderImage = ({
  images,
  alt,
  fallbackSvg,
  intervalMs = 9000,
}: {
  images: string[];
  alt: string;
  fallbackSvg: string;
  intervalMs?: number;
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pool = useMemo(() => Array.from(new Set(images)).filter(Boolean), [images]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (pool.length < 2) return;

    let mounted = true;
    const tick = () => {
      // Avoid advancing when the tab is hidden (feels less "busy" and saves work).
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      if (!mounted) return;
      setIdx((i) => (i + 1) % pool.length);
    };

    // Small jitter prevents everything on the page flipping on the same millisecond.
    const jitter = Math.floor(Math.random() * 900);
    const id = window.setInterval(tick, intervalMs + jitter);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, [intervalMs, pool.length, prefersReducedMotion]);

  const src = pool[idx] ?? pool[0] ?? '';

  const srcSet = (() => {
    if (!src) return undefined;
    if (!/\.jpe?g$/i.test(src)) return undefined;
    const stem = src.replace(/\.jpe?g$/i, '');
    const ext = src.toLowerCase().endsWith('.jpeg') ? '.jpeg' : '.jpg';
    const widths = [640, 960, 1280, 1600, 1920];
    return widths.map((w) => `${stem}-${w}${ext} ${w}w`).join(', ');
  })();

  return (
    <img
      key={src}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? '(min-width: 768px) 520px, 100vw' : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className="damra-fade-in absolute inset-0 h-full w-full object-cover opacity-90"
      onError={(e) => {
        // If the JPG is missing (e.g., before running gallery:fetch), fall back to the SVG placeholder.
        if (e.currentTarget.src !== fallbackSvg) e.currentTarget.src = fallbackSvg;
      }}
    />
  );
};

export function ServicesPro() {
  const icons: Record<string, React.ReactNode> = {
    'Janitorial & recurring cleaning': <Sparkles className="h-5 w-5 text-brand-500" />,
    'Deep / detail cleaning': <ClipboardCheck className="h-5 w-5 text-brand-500" />,
    'Supplies & restocking': <Box className="h-5 w-5 text-brand-500" />,
    'Facilities support': <Wrench className="h-5 w-5 text-brand-500" />,
  };

  const base = import.meta.env.BASE_URL;

  const headerImageByTitle: Record<string, { images: string[]; svg: string; alt: string }> = {
    'Janitorial & recurring cleaning': {
      svg: `${base}gallery/02.svg`,
      alt: 'Janitorial service in an office environment',
      images: [
        `${base}gallery/services/janitorial-01.jpg`,
        `${base}gallery/services/janitorial-02.jpg`,
        `${base}gallery/services/janitorial-03.jpg`,
        `${base}gallery/02.jpg`,
      ],
    },
    'Deep / detail cleaning': {
      svg: `${base}gallery/04.svg`,
      alt: 'Detail cleaning and disinfecting in a conference room',
      images: [
        `${base}gallery/services/detail-01.jpg`,
        `${base}gallery/services/detail-02.jpg`,
        `${base}gallery/services/detail-03.jpg`,
        `${base}gallery/04.jpg`,
      ],
    },
    'Supplies & restocking': {
      svg: `${base}gallery/06.svg`,
      alt: 'Supply shelves and inventory organization for restocking',
      images: [
        `${base}gallery/services/restocking-01.jpg`,
        `${base}gallery/services/restocking-02.jpg`,
        `${base}gallery/services/restocking-03.jpg`,
        `${base}gallery/06.jpg`,
      ],
    },
    'Facilities support': {
      svg: `${base}gallery/05.svg`,
      alt: 'Floor care and upkeep in a commercial space',
      images: [
        `${base}gallery/services/facilities-01.jpg`,
        `${base}gallery/services/facilities-02.jpg`,
        `${base}gallery/services/facilities-03.jpg`,
        `${base}gallery/05.jpg`,
      ],
    },
  };

  const renderHeader = (title: string) => {
    const img = headerImageByTitle[title];

    return (
      <div className="relative flex h-32 w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-brand-100/50 bg-slate-50 dark:border-brand-800/30 dark:bg-slate-950/30 sm:h-28 md:h-24">
        {img ? (
          <RotatingHeaderImage images={img.images} alt={img.alt} fallbackSvg={img.svg} />
        ) : null}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/65 via-white/40 to-transparent dark:from-slate-950/70 dark:via-slate-950/45"
        />
      </div>
    );
  };

  return (
    <section
      className="section bg-gradient-to-b from-transparent via-brand-50/30 to-transparent dark:via-brand-950/20"
      id="services"
    >
      <div className="container-page">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur-sm dark:border-brand-700/40 dark:bg-brand-950/60 dark:text-brand-200">
            Services
          </div>
          <h2 className="heading-2">Service families</h2>
          <p className="lede mx-auto mt-4 max-w-2xl">
            Clear scope, consistent delivery, and one point of contact—built for busy workplaces.
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-5xl md:grid-cols-2">
          {siteConfig.serviceFamilies.map((family) => {
            return (
              <BentoGridItem
                key={family.title}
                title={family.title}
                description={
                  <div className="mt-1">
                    <p className="mb-3 text-sm text-muted-foreground">{family.description}</p>
                    <ul className="space-y-1.5">
                      {family.bullets.map((b) => (
                        <li key={b} className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2 h-1 w-1 rounded-full bg-brand-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                header={renderHeader(family.title)}
                icon={icons[family.title]}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
