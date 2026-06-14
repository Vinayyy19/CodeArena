import React from 'react';
import { useSEO } from '../lib/useSEO';

export default function TermsOfService() {
  useSEO({
    title: "Terms of Service | CodeArena",
  });

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using the CodeArena platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">2. Code of Conduct and Anti-Cheat</h2>
        <p>CodeArena is committed to fair competition. Any attempt to bypass our AI proctoring system, use unauthorized third-party tools, share code during contests, or manipulate the platform's leaderboard will result in immediate disqualification and potential account suspension.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
        <p>The code submitted by users remains their intellectual property. However, by submitting code during public contests, you grant CodeArena a license to execute, analyze, and display the code for judging and educational purposes.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
        <p>CodeArena provides its services "as is" without warranties of any kind. We are not liable for any damages resulting from platform downtime, data loss, or inaccurate AI proctoring results.</p>
      </section>
    </div>
  );
}
