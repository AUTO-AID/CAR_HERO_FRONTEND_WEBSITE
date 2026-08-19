import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-default)] font-primary p-4">
          <div className="max-w-md w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] shadow-2xl rounded-3xl p-8 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle size={40} className="text-rose-500" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[var(--text-dark)] uppercase tracking-tight">
                Oops! Something went wrong.
              </h1>
              <p className="text-sm font-bold text-[var(--text-muted)]">
                We encountered an unexpected error. Our team has been notified.
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-[var(--primary-surface)] hover:bg-[var(--primary-surface-hover)] text-[var(--on-primary)] py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 shadow-lg shadow-[var(--shadow-hover)]"
            >
              <RefreshCw size={18} />
              Refresh Page
            </button>
            
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-6 p-4 bg-slate-900 rounded-lg text-left overflow-auto max-h-48 border border-rose-500/30">
                 <p className="text-rose-400 font-mono text-xs mb-2 font-bold">{this.state.error.toString()}</p>
                 <pre className="text-slate-400 font-mono text-[10px] whitespace-pre-wrap">
                   {this.state.errorInfo?.componentStack}
                 </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
