import React from 'react';
import { useSEO } from '../lib/useSEO';
import { ShieldCheck, Lock, EyeOff, Server, FileCheck, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
    useSEO({
        title: "Security & Compliance | CodeArena",
        description: "Learn how CodeArena secures competitive programming contests with enterprise-grade encryption, privacy-first AI proctoring, and strict data compliance.",
        keywords: "codearena security, ai proctoring privacy, competitive programming compliance, secure coding assessments"
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-osu/30 py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-osu/10 mb-6 border border-osu/20 shadow-[0_0_20px_rgba(220,68,5,0.2)]">
                        <ShieldCheck size={32} className="text-osu-text" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Enterprise-Grade Security</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We build trust through transparency. CodeArena is engineered from the ground up to protect user privacy while maintaining absolute contest integrity.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="bg-[#120a06] border border-[#2d1e16] p-6 rounded-2xl">
                        <EyeOff size={24} className="text-osu-text mb-4" />
                        <h3 className="text-xl font-bold mb-2">Privacy-First AI Proctoring</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Our proprietary AI proctoring models process webcam feeds in real-time. We do not permanently store facial recognition data, ensuring compliance with global biometric privacy laws.
                        </p>
                    </div>

                    <div className="bg-[#120a06] border border-[#2d1e16] p-6 rounded-2xl">
                        <Lock size={24} className="text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            All network traffic, code submissions, and real-time socket connections are secured using TLS 1.3. Data at rest is encrypted using AES-256 standards.
                        </p>
                    </div>

                    <div className="bg-[#120a06] border border-[#2d1e16] p-6 rounded-2xl">
                        <Server size={24} className="text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Isolated Execution Nodes</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Code submissions are executed in highly isolated, ephemeral Docker containers without network access. This prevents malicious code from escaping the sandbox.
                        </p>
                    </div>

                    <div className="bg-[#120a06] border border-[#2d1e16] p-6 rounded-2xl">
                        <FileCheck size={24} className="text-green-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Compliance & Auditing</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Our infrastructure is continuously audited and aligns with industry best practices for GDPR and CCPA data handling requirements.
                        </p>
                    </div>
                </div>

                {/* Enterprise Compliance */}
                <div className="bg-[#120a06] border border-[#2d1e16] rounded-2xl p-8 mb-16">
                    <h3 className="text-2xl font-bold mb-6">Enterprise Compliance Standards</h3>
                    <div className="space-y-6 text-sm text-gray-300">
                        <div>
                            <h4 className="text-white font-bold mb-1">Data Retention Policy</h4>
                            <p>Contest monitoring data, including temporary webcam snapshots analyzed by our AI proctoring models, are retained for a maximum of 30 days and automatically deleted thereafter unless explicitly requested for an active academic integrity investigation.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Vulnerability Reporting</h4>
                            <p>We take security seriously. If you discover a potential security vulnerability in CodeArena, please disclose it to us responsibly. You can submit vulnerability reports directly to <a href="mailto:security@thecodearena.co.in" className="text-osu-text hover:underline">security@thecodearena.co.in</a>. We strive to acknowledge all reports within 24 hours.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Incident Response</h4>
                            <p>CodeArena maintains a strict incident response protocol. In the event of a confirmed security incident, our team initiates investigation immediately, mitigates the threat, and notifies affected universities and enterprise users within 72 hours as mandated by GDPR.</p>
                        </div>
                    </div>
                </div>

                {/* Checklist */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
                    <h3 className="text-2xl font-bold mb-6 text-center">Our Security Commitments</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {[
                            "No sale of user data to third parties",
                            "Strict role-based access control (RBAC)",
                            "Automated vulnerability scanning",
                            "DDoS protection and mitigation",
                            "Secure WebSockets for live contests",
                            "Immediate incident response protocols"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <CheckCircle size={18} className="text-osu-text shrink-0" />
                                <span className="text-sm text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500">
                    For detailed security whitepapers or compliance requests, contact <a href="mailto:admin@thecodearena.co.in" className="text-osu-text hover:underline">admin@thecodearena.co.in</a>
                </div>
            </div>
        </div>
    );
}
