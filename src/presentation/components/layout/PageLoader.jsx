import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-default)] font-primary">
      <div className="relative">
        <div className="absolute inset-0 bg-[var(--primary)] blur-[30px] opacity-20 rounded-full animate-pulse"></div>
        <Loader2 size={48} className="text-[var(--primary)] animate-spin relative z-10" />
      </div>
      <p className="mt-4 text-[var(--text-muted)] font-bold uppercase tracking-widest text-xs animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default PageLoader;
