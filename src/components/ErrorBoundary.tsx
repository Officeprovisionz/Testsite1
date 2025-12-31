import React, { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and displays a fallback UI
 * Prevents the entire app from crashing due to component errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Send to error tracking service in production
    if (import.meta.env.PROD) {
      // Example: Sentry.captureException(error, { extra: errorInfo });
      // Track error event
      if (typeof window !== 'undefined' && window.damraTrack) {
        window.damraTrack('error_boundary_catch', {
          error: error.message,
          component: errorInfo.componentStack?.split('\n')[1]?.trim(),
        });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[400px] items-center justify-center p-6">
          <div className="max-w-md text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
              <AlertTriangle
                className="h-8 w-8 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
            </div>

            <h2 className="heading-3 mb-2">Something went wrong</h2>

            <p className="mb-6 text-muted">
              We're sorry for the inconvenience. Please try refreshing the page or contact us if the
              problem persists.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="hover:text-strong cursor-pointer text-sm text-muted">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 overflow-auto rounded-lg bg-red-50 p-4 text-xs dark:bg-red-950/20">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary inline-flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Refresh Page
              </button>

              <a href="/" className="btn-secondary">
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    damraTrack?: (event: string, props?: Record<string, unknown>) => void;
  }
}
