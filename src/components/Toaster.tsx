import { Toaster as SonnerToaster } from 'sonner';

/**
 * Global toast notification system
 * Provides instant feedback for user actions across the site
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            'rounded-(--radius-card) shadow-md border bg-surface/95 border-brand/20 dark:border-brand/20',
          title: 'text-sm font-semibold text-strong',
          description: 'text-sm text-muted',
          actionButton:
            'bg-brand hover:bg-brand/90 text-white px-3 py-1.5 rounded-(--radius-control) text-sm font-medium transition-colors',
          cancelButton:
            'bg-surface/85 hover:bg-surface text-muted hover:text-strong px-3 py-1.5 rounded-(--radius-control) text-sm font-medium transition-colors border border-brand/20 dark:border-brand/20',
          closeButton:
            'bg-surface/85 hover:bg-surface border border-brand/20 dark:border-brand/20 text-muted hover:text-strong transition-colors',
          success: 'border-brand/20 bg-brand/5',
          error: 'border-destructive/20 bg-destructive/5',
          warning: 'border-amber-500/20 bg-amber-500/5',
          info: 'border-brand/20 bg-brand/5',
        },
        style: {
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        },
      }}
      // Mobile optimizations
      gap={8}
      visibleToasts={3}
    />
  );
}
