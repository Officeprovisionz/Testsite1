import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type RotatingSource = {
  /** Path relative to `public/` (no leading slash) or absolute URL. */
  src: string;
  /** Optional alt text. If omitted, image is treated as decorative. */
  alt?: string;
};

export interface RotatingImageProps {
  sources: RotatingSource[];
  /** Defaults to 5000ms. */
  intervalMs?: number;
  /** Defaults to 650ms. */
  fadeMs?: number;
  className?: string;
  imgClassName?: string;
  /** Optional overlay (scrim) above the image(s). */
  overlayClassName?: string;
}

const toPublicUrl = (src: string) => {
  if (/^https?:\/\//i.test(src)) return src;
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

export function RotatingImage({
  sources,
  intervalMs = 5000,
  fadeMs = 650,
  className,
  imgClassName,
  overlayClassName,
}: RotatingImageProps) {
  const normalized = useMemo(
    () => (Array.isArray(sources) ? sources.filter((s) => s?.src) : []),
    [sources]
  );

  const [index, setIndex] = useState(0);

  const enabled = normalized.length > 1 && canAutoRotate();

  useEffect(() => {
    if (!enabled) return;

    let timer: number | undefined;
    const start = () => {
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % normalized.length);
      }, intervalMs);
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
  }, [enabled, intervalMs, normalized.length]);

  useEffect(() => {
    if (!enabled) return;
    if (normalized.length < 2) return;

    const next = (index + 1) % normalized.length;
    const nextSrc = normalized[next]?.src;
    if (!nextSrc) return;
    const src = toPublicUrl(nextSrc);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  }, [enabled, index, normalized]);

  if (!normalized.length) return null;

  return (
    <div className={cn('relative isolate overflow-hidden', className)}>
      {normalized.map((s, i) => {
        const resolvedSrc = toPublicUrl(s.src);
        const isDecorative = !s.alt;
        return (
          <img
            key={`${s.src}-${i}`}
            src={resolvedSrc}
            alt={s.alt ?? ''}
            aria-hidden={isDecorative ? true : undefined}
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity will-change-[opacity]',
              i === index ? 'opacity-100' : 'opacity-0',
              imgClassName
            )}
            style={{ transitionDuration: `${Math.max(0, fadeMs)}ms` }}
          />
        );
      })}

      {overlayClassName ? (
        <div className={cn('pointer-events-none absolute inset-0', overlayClassName)} />
      ) : null}
    </div>
  );
}
