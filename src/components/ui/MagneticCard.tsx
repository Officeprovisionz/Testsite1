import { useEffect, useRef, useState } from 'react';

type MagneticCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Strength in px at the edges (subtle recommended: 6-14). */
  strength?: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

export function MagneticCard({ children, className, strength = 10 }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / Math.max(1, rect.width);
      const py = (e.clientY - rect.top) / Math.max(1, rect.height);

      // Map 0..1 -> -1..1
      const dx = (px - 0.5) * 2;
      const dy = (py - 0.5) * 2;

      setXy({
        x: Math.max(-1, Math.min(1, dx)) * strength,
        y: Math.max(-1, Math.min(1, dy)) * strength,
      });
    };

    const onEnter = () => setActive(true);
    const onLeave = () => {
      setActive(false);
      setXy({ x: 0, y: 0 });
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointermove', onMove);

    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointermove', onMove);
    };
  }, [strength]);

  const transform = active ? `translate3d(${xy.x}px, ${xy.y}px, 0)` : 'translate3d(0,0,0)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition: prefersReducedMotion()
          ? undefined
          : 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
