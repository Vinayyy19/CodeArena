import React from 'react';
import { fetchWithRetry } from './lib/fetchWithRetry';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from './components/Navbar';
import HomepageFooter from './components/homepage/HomepageFooter';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';

// Lazy load page routes and heavy components to improve Core Web Vitals (LCP & TBT)
const CodingWorkspace = React.lazy(() => import('./components/CodingWorkspace'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const LeaderboardPage = React.lazy(() => import('./pages/LeaderboardPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const OnboardingPage = React.lazy(() => import('./pages/OnboardingPage'));
const ProblemsetPage = React.lazy(() => import('./pages/ProblemsetPage'));
const ContestsPage = React.lazy(() => import('./pages/ContestsPage'));
const CompanyDashboard = React.lazy(() => import('./pages/CompanyDashboard'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const SuperadminDashboard = React.lazy(() => import('./pages/SuperadminDashboard'));
const ContestArena = React.lazy(() => import('./pages/ContestArena'));
const AiRoadmapPage = React.lazy(() => import('./pages/AiRoadmapPage'));

function AppContent() {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/workspace');

  // Silent wake-up ping to Render backend & Proctoring API (fires once on app load for real users only)
  React.useEffect(() => {
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    if (!isBot) {
      fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/health`).catch(() => { });
      const faceApi = import.meta.env.VITE_FACE_API_URL || 'http://localhost:8000';
      fetch(faceApi).catch(() => { });
    }
  }, []);

  return (
    <div className={`flex flex-col bg-[var(--color-dark-bg)] text-white font-sans relative ${isWorkspace ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(220,68,5,0.15), transparent 70%)"
          }}
        />
      </div>

      <div className={`z-10 flex flex-col w-full relative bg-black ${isWorkspace ? 'h-full overflow-hidden' : 'min-h-screen'}`}>
        <Navbar />
        <main className={`flex-1 flex flex-col pt-16 ${isWorkspace ? 'min-h-0 overflow-hidden' : ''}`}>
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/problemset" element={<ProblemsetPage />} />
              <Route path="/contests" element={<ContestsPage />} />
              <Route path="/company/dashboard" element={<CompanyDashboard />} />
              <Route path="/superadmin" element={<SuperadminDashboard />} />
              <Route path="/workspace/practice/:problemId" element={<CodingWorkspace />} />
              <Route path="/workspace/contest/:contestId" element={<ContestArena />} />
              <Route path="/workspace/contest/:contestId/:problemId" element={<CodingWorkspace />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/ai-roadmap" element={<AiRoadmapPage />} />
            </Routes>
          </React.Suspense>
        </main>
        {!isWorkspace && (
          <div className='bg-black'>
            <HomepageFooter />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
