import React from 'react';
import { useSEO } from '../lib/useSEO';
import { Briefcase, Rocket, Code2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CareersPage() {
    useSEO({
        title: "Careers at CodeArena | Build the Future of Coding",
        description: "Join CodeArena and help us build the world's most advanced AI-proctored competitive programming platform.",
        keywords: "codearena careers, jobs, hiring, software engineering jobs"
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-osu/30 py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-osu/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Build the arena. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-osu to-yellow-500">
                            Empower developers.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        At CodeArena, we are building the infrastructure for the next generation of global coding competitions and enterprise assessments.
                    </p>
                </div>

                {/* Culture */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                        <Rocket size={24} className="text-osu-text mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Ship Fast</h3>
                        <p className="text-sm text-gray-400">We iterate quickly and push code to production daily.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                        <Code2 size={24} className="text-blue-500 mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Developer First</h3>
                        <p className="text-sm text-gray-400">We build tools that we actually want to use ourselves.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                        <Heart size={24} className="text-purple-500 mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Global Impact</h3>
                        <p className="text-sm text-gray-400">Your code will run contests for thousands of developers worldwide.</p>
                    </div>
                </div>

                {/* Open Positions */}
                <div className="bg-[#120a06] border border-osu/20 rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 bg-osu/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase size={28} className="text-osu-text" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                        We are not actively hiring for any specific roles right now, but we are always on the lookout for exceptional talent. If you love compilers, AI, and scalable systems, we want to hear from you.
                    </p>
                    
                    <a href="mailto:admin@thecodearena.co.in?subject=CodeArena Application" className="inline-flex items-center gap-2 bg-osu hover:bg-osu-light text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(220,68,5,0.3)] hover:scale-105 active:scale-95">
                        Send us your Resume
                    </a>
                </div>

            </div>
        </div>
    );
}
