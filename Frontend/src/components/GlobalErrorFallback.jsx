import React from 'react';
import { Home, RefreshCw } from 'lucide-react';

export default function GlobalErrorFallback({ error, resetError }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[30%] w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
                <div className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
            </div>

            <div className="max-w-lg w-full bg-[#1a1310] border border-red-900/30 rounded-2xl p-8 relative z-10 shadow-2xl">
                
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <img src="/code-arena_shield.webp" alt="CodeArena" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-extrabold text-white tracking-tight">Code<span className="text-osu-text">Arena</span></span>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-3">Something went wrong.</h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        A critical error occurred while rendering this view. Our engineering team has been automatically notified via Sentry.
                    </p>
                </div>

                {/* Technical details (optional, good for devs) */}
                {error && (
                    <div className="bg-[#120a06] border border-[#2d1e16] rounded-xl p-4 mb-8 overflow-x-auto">
                        <p className="text-red-400 font-mono text-xs whitespace-pre-wrap break-words">
                            {error.message || error.toString()}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={18} /> Return Home
                    </button>
                    <button 
                        onClick={resetError}
                        className="flex-1 py-3 px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(246,107,21,0.2)] transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} /> Try Again
                    </button>
                </div>

            </div>
        </div>
    );
}
