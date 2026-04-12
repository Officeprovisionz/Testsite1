export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--color-brand)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-brand)/0.05)_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[4rem_4rem]" />
      {/* Radial fade */}
      <div className="via-surface/80 to-surface absolute inset-0 bg-linear-to-b from-transparent" />
    </div>
  );
}
