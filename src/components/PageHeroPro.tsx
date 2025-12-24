import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { cn } from '@/lib/utils';

interface PageHeroProProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export const PageHeroPro = ({ title, description, className, children }: PageHeroProProps) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-slate-950 pb-20 pt-32 antialiased md:pb-32 md:pt-40',
        className
      )}
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 text-center">
        <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300 sm:text-xl">{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
      <div className="bg-grid-white/[0.02] absolute inset-0 -z-10" />
    </div>
  );
};
