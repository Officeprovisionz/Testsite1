import { describe, expect, it } from 'vitest';
import { cn, getImagePositionClass } from './utils';

describe('cn', () => {
  it('merges class names and resolves Tailwind conflicts', () => {
    // tailwind-merge should keep the last conflicting class.
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('ignores falsy values', () => {
    expect(cn('text-sm', false, undefined, null, '')).toBe('text-sm');
  });
});

describe('getImagePositionClass', () => {
  it('maps known object-position values', () => {
    expect(getImagePositionClass('50% 40%')).toBe('object-[50%_40%]');
    expect(getImagePositionClass('50% 45%')).toBe('object-[50%_45%]');
    expect(getImagePositionClass('50% 50%')).toBe('object-center');
  });

  it('falls back to object-center for unknown values', () => {
    expect(getImagePositionClass(undefined)).toBe('object-center');
    expect(getImagePositionClass('10% 10%')).toBe('object-center');
  });
});
