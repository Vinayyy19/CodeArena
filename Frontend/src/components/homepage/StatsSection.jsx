import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
    return (
        <section className="w-full py-12 md:py-20 relative border-t border-b border-white/5 bg-[#0a0503] overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[200px] bg-osu/10 blur-[100px] pointer-events-none rounded-full" />
            
            <div className="max-w-screen-xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2">
                            15,000+
                        </div>
                        <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">
                            Submissions Processed
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col items-center justify-center pl-8 md:pl-12"
                    >
                        <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2">
                            99.9%
                        </div>
                        <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">
                            Compiler Uptime
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col items-center justify-center pl-8 md:pl-12"
                    >
                        <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2">
                            15+
                        </div>
                        <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">
                            Supported Languages
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col items-center justify-center pl-8 md:pl-12"
                    >
                        <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-osu to-yellow-500 mb-2">
                            50+
                        </div>
                        <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">
                            Universities Onboarded
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
