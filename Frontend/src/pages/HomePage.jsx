import Hero from "../components/homepage/Hero";
import StatsSection from "../components/homepage/StatsSection";
import SectionDivider from "../components/homepage/SectionDivider";
import Features from "../components/homepage/Features";
import FAQ from "../components/homepage/FAQ";
import { useSEO } from "../lib/useSEO";

export default function HomePage() {
    useSEO({
        title: "CodeArena | AI-Proctored Competitive Programming & Coding Contests",
        description: "CodeArena is a state-of-the-art competitive programming platform featuring real-time AI face proctoring, anti-cheat tracking, live coding contests, and custom challenge creation for universities and companies.",
        keywords: "competitive programming, coding contests, AI proctoring, online compiler, coding interview prep, technical anti-cheat, codearena, live coding arena, dynamic algorithms"
    });

    return (
        <div className="min-h-screen w-full text-white relative bg-black -mt-16">
            <main className="flex max-w-screen-2xl mx-auto gap-4 flex-col items-center justify-between overflow-x-hidden relative z-10">
                <div className="relative overflow-hidden w-full">
                    <Hero />
                </div>

                <StatsSection />

                <SectionDivider className="translate-y-5 mt-2" />

                <div className="relative overflow-hidden w-full">
                    <div className="relative z-10 max-w-screen-2xl mx-auto">
                        <Features />
                    </div>
                </div>

                <SectionDivider />

                <div className="relative overflow-hidden w-full">
                    <div className="max-w-screen-2xl mx-auto">
                        <FAQ />
                    </div>
                </div>

                <SectionDivider />
            </main>
        </div>
    );
}
