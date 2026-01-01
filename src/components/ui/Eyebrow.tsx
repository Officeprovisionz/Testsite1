import React from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow = ({ children, className }: EyebrowProps) => {
  return (
    <div
      className={cn(
        'border-brand/20 text-brand dark:border-brand/20 dark:text-brand mb-4 inline-flex items-center rounded-full border bg-surface/60 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm dark:bg-surface-muted/60 lg:px-5 lg:py-2 lg:text-base',
        className
      )}
    >
      {children}
    </div>
  );
};
