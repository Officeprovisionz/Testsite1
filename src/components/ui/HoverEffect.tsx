import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('grid grid-cols-1 gap-5 py-8 md:grid-cols-2 lg:gap-6', className)}>
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className="group relative block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onFocus={() => setHoveredIndex(idx)}
          onBlur={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="bg-brand/10 absolute inset-0 block h-full w-full rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15 },
                }}
              />
            )}
          </AnimatePresence>

          {item.link ? (
            <a
              href={item.link}
              className="focus-visible:ring-brand relative z-20 block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-bg))]"
              aria-label={item.title}
            >
              <Card isHovered={hoveredIndex === idx}>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <div className="text-brand group-hover:text-brand mt-4 flex items-center text-sm font-medium transition-colors">
                  <span>Learn more about {item.title}</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </a>
          ) : (
            <Card isHovered={hoveredIndex === idx}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  isHovered,
}: {
  className?: string;
  children: React.ReactNode;
  isHovered?: boolean;
}) => {
  return (
    <div
      className={cn(
        'card relative z-20 h-full w-full overflow-hidden p-6 transition-all duration-300 lg:p-8',
        isHovered ? 'border-brand/40 shadow-brand/10 shadow-xl' : 'shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn('text-strong text-lg font-semibold tracking-tight lg:text-xl', className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        'mt-2 text-sm leading-relaxed text-muted lg:text-base lg:leading-relaxed',
        className
      )}
    >
      {children}
    </p>
  );
};
