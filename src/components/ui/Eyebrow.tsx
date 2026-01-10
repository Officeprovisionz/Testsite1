import React from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow = ({ children, className }: EyebrowProps) => {
  return (
    <span className={cn('eyebrow', className)}>
      <span className="eyebrow__line" aria-hidden="true"></span>
      {children}
    </span>
  );
};
