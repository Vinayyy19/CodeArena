import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { useSEO } from '../lib/useSEO';

export default function NotFoundPage() {
  useSEO({
    title: "Page Not Found | CodeArena",
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-[var(--color-dark-bg)] p-8 rounded-2xl border border-[var(--color-border)] shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-primary)] opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--color-primary)] opacity-20 blur-3xl rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Page Not Found</h2>
          
          <p className="text-gray-400 mb-8 max-w-xs mx-auto">
            Oops! The page you are looking for does not exist, has been removed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link 
              to="/" 
              className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(246,107,21,0.4)] w-full sm:w-auto justify-center"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>
            <Link 
              to="/problemset" 
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Problems
            </Link>
            <Link 
              to="/contests" 
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Contests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
