import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Maps a CSS object-position value to a Tailwind class.
 * Used for hero image positioning across HeroPro and PageHeroPro.
 */
export function getImagePositionClass(position: string | undefined): string {
  switch (position) {
    case '50% 40%':
      return 'object-[50%_40%]';
    case '50% 45%':
      return 'object-[50%_45%]';
    case '50% 50%':
      return 'object-center';
    default:
      return 'object-center';
  }
}
