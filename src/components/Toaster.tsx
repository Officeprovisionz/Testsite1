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
            'rounded-xl shadow-lg border backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 border-brand-100/60 dark:border-brand-800/40',
          title: 'text-sm font-semibold text-strong',
          description: 'text-sm text-muted',
          actionButton:
            'bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
          cancelButton:
            'bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-muted hover:text-strong px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-brand-100/40 dark:border-brand-800/40',
          closeButton:
            'bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-brand-100/40 dark:border-brand-800/40 text-muted hover:text-strong transition-colors',
          success:
            'border-green-200/60 dark:border-green-800/40 bg-gradient-to-br from-green-50/90 to-white/90 dark:from-green-950/50 dark:to-slate-900/90',
          error:
            'border-red-200/60 dark:border-red-800/40 bg-gradient-to-br from-red-50/90 to-white/90 dark:from-red-950/50 dark:to-slate-900/90',
          warning:
            'border-amber-200/60 dark:border-amber-800/40 bg-gradient-to-br from-amber-50/90 to-white/90 dark:from-amber-950/50 dark:to-slate-900/90',
          info: 'border-blue-200/60 dark:border-blue-800/40 bg-gradient-to-br from-blue-50/90 to-white/90 dark:from-blue-950/50 dark:to-slate-900/90',
        },
        style: {
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        },
      }}
      // Respect user preferences
      pauseWhenPageIsHidden
      // Mobile optimizations
      gap={8}
      visibleToasts={3}
    />
  );
}
