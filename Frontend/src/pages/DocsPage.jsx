import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../lib/useSEO';
import { Book, Terminal, Shield, Trophy, FileJson, Play } from 'lucide-react';

const docsContent = {
    "getting-started": {
        title: "Getting Started",
        icon: <Book size={24} />,
        content: `Welcome to CodeArena. Here you will find everything you need to start practicing coding, hosting contests, and analyzing performance. 
        Whether you are a university looking to host an assessment, or a developer sharpening your skills, our platform is built for you.`
    },
    "host-contest": {
        title: "Host a Contest",
        icon: <Play size={24} />,
        content: `Hosting a contest on CodeArena is straightforward. Navigate to the Company Dashboard, click 'Create Contest', and set your parameters (duration, visibility, problems). 
        You can assign custom or existing problems, invite users via link, and monitor the live dashboard for real-time submissions and proctoring alerts.`
    },
    "create-problem": {
        title: "Create Custom Problems",
        icon: <Terminal size={24} />,
        content: `CodeArena allows Superadmins and Company accounts to write custom algorithms. You can define problem statements, constraints, 
        and provide hidden test cases. Our execution engine currently supports over 15 programming languages.`
    },
    "ai-proctoring": {
        title: "AI Proctoring & Anti-Cheat",
        icon: <Shield size={24} />,
        content: `Our proprietary AI proctoring engine uses real-time browser APIs to detect multiple faces, absence of faces, or mobile phone usage during a contest. 
        All flag events are logged in the contest dashboard. Webcams are processed entirely in memory without permanent storage to ensure absolute GDPR compliance.`
    },
    "leaderboards": {
        title: "Live Leaderboards",
        icon: <Trophy size={24} />,
        content: `The CodeArena Live Leaderboard ranks participants using dynamic scoring rules. Rankings update via WebSockets instantly as submissions are evaluated. 
        Penalties are automatically applied for wrong submissions in standard ICPC-style formats.`
    },
    "api": {
        title: "API Reference",
        icon: <FileJson size={24} />,
        content: `CodeArena exposes a RESTful API for universities and enterprise clients to sync users, fetch contest results, and retrieve proctoring logs. 
        (Full API documentation and SDKs are currently in private beta).`
    }
};

export default function DocsPage() {
    const { section } = useParams();
    const currentSection = section && docsContent[section] ? section : "getting-started";
    const data = docsContent[currentSection];

    useSEO({
        title: `${data.title} - Documentation | CodeArena`,
        description: `Learn more about ${data.title} on CodeArena. Explore our comprehensive guides for hosting contests, AI proctoring, and APIs.`,
        keywords: `codearena docs, ${data.title.toLowerCase()}, coding platform documentation`
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-osu/30 pt-8 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
                
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-24">
                        <h2 className="text-xl font-bold mb-6 text-white px-4">Documentation</h2>
                        <nav className="space-y-1">
                            {Object.keys(docsContent).map((key) => {
                                const isActive = currentSection === key;
                                return (
                                    <Link
                                        key={key}
                                        to={`/docs/${key}`}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            isActive 
                                            ? "bg-osu/10 text-osu-text border border-osu/20" 
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        <span className={isActive ? "text-osu-text" : "text-gray-500"}>
                                            {docsContent[key].icon}
                                        </span>
                                        {docsContent[key].title}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-[#0a0503] border border-white/5 p-8 md:p-12 rounded-2xl min-h-[60vh]">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-osu-text">
                            {data.icon}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{data.title}</h1>
                    </div>
                    
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        {data.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 leading-relaxed">{paragraph.trim()}</p>
                        ))}
                    </div>

                    {/* Placeholder for future detailed markdown rendering */}
                    <div className="mt-12 p-6 bg-osu/5 border border-osu/20 rounded-xl">
                        <h4 className="text-osu-text font-bold mb-2">Note:</h4>
                        <p className="text-sm text-gray-400">
                            This section is currently a placeholder baseline. To expand this, integrate a Markdown parser (like react-markdown) 
                            and serve .md files from your backend or a headless CMS.
                        </p>
                    </div>
                </main>

            </div>
        </div>
    );
}
