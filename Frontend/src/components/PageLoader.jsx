import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[100vh] bg-black text-white relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--color-primary)]/5 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Loading animation container */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <div className="relative w-16 h-16">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-primary)] animate-spin" style={{ animationDuration: '1s' }} />
          
          {/* Inner pulsing sparkles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-[var(--color-primary)] animate-pulse" size={20} />
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center animate-pulse">
          <p className="text-sm font-semibold tracking-widest text-white/85 uppercase">Loading Arena</p>
          <p className="text-[10px] text-gray-500 mt-1">Preparing workspace...</p>
        </div>
      </div>
    </div>
  );
}
