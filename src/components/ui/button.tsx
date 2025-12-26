import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'btn disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'btn-primary',
        accent: 'btn-accent',
        secondary: 'btn-secondary',
        outline: 'btn-secondary',
        ghost: 'bg-transparent hover:bg-brand-500/5',
        link: 'h-auto px-0 py-0 underline underline-offset-4',
        destructive: 'bg-rose-600 text-white hover:bg-rose-700',
      },
      size: {
        default: '',
        sm: 'min-h-10 px-4 py-2 text-sm',
        lg: 'min-h-12 px-8 py-3 text-base',
        icon: 'icon-btn',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
