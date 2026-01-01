import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Base skeleton component with shimmer animation
 * Used for loading states to prevent layout shift
 */
export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-brand/10 dark:bg-brand/10 animate-pulse rounded-lg',
        'relative overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {/* Shimmer overlay */}
      <div
        className="shimmer absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, rgba(var(--color-brand), 0.2), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />
      {children}
    </div>
  );
}

/**
 * Card skeleton for service/industry cards
 */
export function CardSkeleton() {
  return (
    <div className="card overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-b-none rounded-t-xl" />

      {/* Content skeleton */}
      <div className="space-y-3 p-6">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description lines */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        {/* Button skeleton */}
        <Skeleton className="mt-4 h-10 w-32" />
      </div>
    </div>
  );
}

/**
 * Gallery image skeleton (maintains 16:9 aspect ratio)
 */
export function GallerySkeleton() {
  return (
    <div className="gallery-card">
      <Skeleton className="aspect-video w-full rounded-xl" />
    </div>
  );
}

/**
 * Testimonial card skeleton
 */
export function TestimonialSkeleton() {
  return (
    <div className="card space-y-4 p-6">
      {/* Quote icon */}
      <Skeleton className="h-8 w-8 rounded-full" />

      {/* Quote text */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * Form field skeleton
 */
export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Name field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

/**
 * Grid of card skeletons
 */
interface SkeletonGridProps {
  count?: number;
  variant?: 'card' | 'gallery' | 'testimonial';
}

export function SkeletonGrid({ count = 6, variant = 'card' }: SkeletonGridProps) {
  const SkeletonComponent = {
    card: CardSkeleton,
    gallery: GallerySkeleton,
    testimonial: TestimonialSkeleton,
  }[variant];

  return (
    <div
      className={cn(
        'grid gap-6',
        variant === 'gallery'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
