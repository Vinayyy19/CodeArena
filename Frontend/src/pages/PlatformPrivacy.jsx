import React from 'react';
import { useSEO } from '../lib/useSEO';

export default function PrivacyPolicy() {
  useSEO({
    title: "Privacy Policy | CodeArena",
  });

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
        <p>CodeArena collects information that you provide directly to us when you register for an account, participate in contests, or communicate with us. This may include your name, email address, educational institution, and profile photo.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">2. AI Proctoring and Facial Data</h2>
        <p>During AI-proctored contests, we may temporarily access your webcam to monitor exam integrity. Facial tracking data is processed in real-time to detect multiple faces, absence from the screen, or unauthorized objects (like mobile phones). We do not permanently store your biometric data unless explicitly required by your institution for verification purposes.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
        <p>We use the information we collect to operate our platform, maintain the integrity of coding contests, prevent fraud and cheating, and communicate with you about your account.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at hello@codearena.dev.</p>
      </section>
    </div>
  );
}
