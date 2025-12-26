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
        'hero-splash border-app relative w-full overflow-hidden border-b antialiased',
        className
      )}
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 text-center">
        <h1 className="heading-1 text-balance">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted sm:text-xl">
          {description}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
};
