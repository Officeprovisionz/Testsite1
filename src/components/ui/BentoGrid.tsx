import { cn } from '@/lib/utils';
import React from 'react';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-5 md:auto-rows-[20rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group/bento relative row-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-100/50 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-brand-200 hover:shadow-md dark:border-brand-800/30 dark:bg-slate-900/50',
        className
      )}
    >
      {header}
      <div className="mt-auto pt-4">
        <div className="mb-2 flex items-center gap-2">
          {icon}
          <div className="text-strong text-base font-semibold tracking-tight">{title}</div>
        </div>
        <div className="text-sm leading-relaxed text-muted">{description}</div>
      </div>
    </div>
  );
};
