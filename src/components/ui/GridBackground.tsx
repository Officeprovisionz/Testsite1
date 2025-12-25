import React from 'react';

export function GridBackground() {
  return (
    <div className="dark:bg-grid-white/[0.05] bg-grid-black/[0.05] pointer-events-none absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}
