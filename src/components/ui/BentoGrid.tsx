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
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
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
        'glass-panel border-app card-hover group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border p-5 transition duration-200',
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="text-strong mb-2 mt-2 text-base font-semibold tracking-tight">{title}</div>
        <div className="text-sm leading-relaxed text-muted">{description}</div>
      </div>
    </div>
  );
};
