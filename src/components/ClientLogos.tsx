import React from 'react';
import Marquee from './ui/Marquee';
import { cn } from '@/lib/utils';

const reviews = [
  {
    name: 'TechCorp',
    username: '@techcorp',
    body: 'Reliable cleaning for our 500-person HQ.',
    img: 'https://avatar.vercel.sh/techcorp',
  },
  {
    name: 'InnovateLabs',
    username: '@innovate',
    body: "Best facilities support we've had in years.",
    img: 'https://avatar.vercel.sh/innovate',
  },
  {
    name: 'GlobalSystems',
    username: '@globalsys',
    body: 'Consistent, professional, and invisible.',
    img: 'https://avatar.vercel.sh/global',
  },
  {
    name: 'NextGen',
    username: '@nextgen',
    body: 'They handle everything from supplies to deep cleans.',
    img: 'https://avatar.vercel.sh/nextgen',
  },
  {
    name: 'FutureWorks',
    username: '@future',
    body: 'Highly recommended for any commercial space.',
    img: 'https://avatar.vercel.sh/future',
  },
  {
    name: 'AlphaGroup',
    username: '@alpha',
    body: 'Seamless integration with our ops team.',
    img: 'https://avatar.vercel.sh/alpha',
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'glass-panel card-hover relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-strong text-sm font-semibold">{name}</figcaption>
          <p className="text-subtle text-xs font-medium">{username}</p>
        </div>
      </div>
      <blockquote className="text-muted mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function ClientLogos() {
  return (
    <div className="border-app surface-muted relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border">
      <div className="mb-8 text-center">
        <p className="eyebrow">Trusted by industry leaders</p>
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[rgb(var(--color-surface-muted))] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[rgb(var(--color-surface-muted))] to-transparent"></div>
    </div>
  );
}
