import { Component, ErrorInfo, ReactNode } from 'react';
import { LuAlertTriangle, LuRotateCcw } from 'react-icons/lu';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Unhandled application error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section
          role='alert'
          className='my-8 border border-red-300 bg-red-50 p-6 shadow-none dark:border-red-900/60 dark:bg-red-950/40'
        >
          <div className='flex items-start gap-4'>
            <span className='border border-red-600 bg-red-600 p-2 text-white'>
              <LuAlertTriangle className='size-5' />
            </span>
            <div className='flex-1'>
              <h2 className='text-base font-bold text-red-900 dark:text-red-200'>
                Terjadi Kesalahan pada Aplikasi
              </h2>
              <p className='mt-1 text-xs text-red-800 dark:text-red-300'>
                {this.state.error?.message ||
                  'Terjadi gangguan saat merender halaman ini. Silakan coba muat ulang.'}
              </p>
              <div className='mt-4 flex gap-3'>
                <button
                  type='button'
                  onClick={this.handleReset}
                  className='inline-flex items-center gap-1.5 border border-red-600 bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-700'
                >
                  <LuRotateCcw className='size-3.5' />
                  <span>Muat Ulang Halaman</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
