import React from 'react';
import { Shield, Cpu, Code2, Globe2, Zap, Users, BrainCircuit } from 'lucide-react';
import { useSEO } from '../lib/useSEO';

const AboutUsPage = () => {
    useSEO({
        title: "About CodeArena | AI-Powered Competitive Programming",
        description: "Learn about CodeArena's mission to revolutionize competitive programming with state-of-the-art AI proctoring, global contests, and secure evaluation.",
        keywords: "about codearena, competitive programming platform, AI proctoring technology, coding contest platform"
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-osu/30">
            {/* Hero Section */}
            <div className="relative py-20 lg:py-32 overflow-hidden border-b border-osu/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,68,5,0.15),transparent_50%)]"></div>
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-osu/10 rounded-full mix-blend-screen filter blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-osu/10 border border-osu/20 text-osu-text text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(220,68,5,0.2)]">
                            <BrainCircuit size={14} /> Our Mission
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Redefining the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-osu to-yellow-500">
                                Coding Arena
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                            CodeArena is the world's most advanced competitive programming platform, built to securely host global hackathons, coding assessments, and algorithmic battles using real-time AI proctoring.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values / Technology */}
            <div className="py-20 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        <div className="bg-[#120a06] border border-[#2d1e16] p-8 rounded-2xl hover:border-osu/50 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-osu/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Cpu size={28} className="text-osu-text" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">AI Face Proctoring</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Our proprietary machine learning models monitor active contests in real-time, detecting multi-face anomalies, head tilting, and focus loss to ensure absolute contest integrity.
                            </p>
                        </div>

                        <div className="bg-[#120a06] border border-[#2d1e16] p-8 rounded-2xl hover:border-blue-500/50 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap size={28} className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast Evaluation</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Powered by Judge0 and highly optimized backend execution nodes, CodeArena compiles and evaluates thousands of submissions per second across 15+ programming languages.
                            </p>
                        </div>

                        <div className="bg-[#120a06] border border-[#2d1e16] p-8 rounded-2xl hover:border-purple-500/50 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Globe2 size={28} className="text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Global Community</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                From university computer science clubs to Fortune 500 hiring assessments, CodeArena scales dynamically to host thousands of concurrent participants seamlessly.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Support / Contact Section */}
            <div className="py-24 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-bold mb-6">Need Support or Custom Solutions?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Whether you are a competitive programmer facing issues or a company looking to host an enterprise-grade technical assessment, our team is ready to help.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a href="mailto:admin@thecodearena.co.in" className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-xl">
                            <Users size={18} /> Contact Support
                        </a>
                        <a href="https://github.com/abwcuri0us" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#1a1310] border border-osu/30 text-white px-8 py-3 rounded-xl font-bold hover:border-osu transition-colors">
                            <Code2 size={18} /> View on GitHub
                        </a>
                    </div>
                </div>
                
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-10" 
                    style={{ backgroundImage: 'linear-gradient(#dc4405 1px, transparent 1px), linear-gradient(90deg, #dc4405 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                ></div>
            </div>
            
        </div>
    );
};

export default AboutUsPage;
