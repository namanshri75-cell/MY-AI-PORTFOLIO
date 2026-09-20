import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Application caught error in boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-[#06080d] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl bespoke-card border border-cyan-500/30">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">Portfolio Loaded</h2>
            <p className="text-sm text-slate-300 mb-6">
              An unexpected issue occurred while rendering a dynamic component. You can reload or proceed to contact.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 cursor-pointer"
              >
                Reload Page
              </button>
              <a
                href="mailto:namansrivastava11345@gmail.com"
                className="px-5 py-2.5 rounded-xl border border-white/20 text-white font-medium text-xs hover:bg-white/10"
              >
                Contact Naman
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
