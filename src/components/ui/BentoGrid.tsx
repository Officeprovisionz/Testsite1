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
        'mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[22rem] md:grid-cols-3',
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
  const hasHeader = Boolean(header);

  return (
    <div
      className={cn(
        'group/bento relative row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-none',
        className
      )}
    >
      <div className="flex h-full flex-col">
        {header}
        <div
          className={cn(
            'transition-all duration-300 group-hover/bento:translate-x-1',
            hasHeader ? 'mt-6' : 'mt-1'
          )}
        >
          <div className="mb-4 flex items-center gap-3">
            {icon}
            <div className="font-serif text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {title}
            </div>
          </div>
          <div className="line-clamp-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
