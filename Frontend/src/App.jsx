import React from 'react';
import { fetchWithRetry } from './lib/fetchWithRetry';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "sonner";
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HomepageFooter from './components/homepage/HomepageFooter';
import PageLoader from './components/PageLoader';
import ProtectedRoute from './components/ProtectedRoute';
import * as Sentry from "@sentry/react";
import GlobalErrorFallback from './components/GlobalErrorFallback';

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
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const PlatformPrivacy = React.lazy(() => import('./pages/PlatformPrivacy'));
const PlatformTerms = React.lazy(() => import('./pages/PlatformTerms'));
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage'));
const CareersPage = React.lazy(() => import('./pages/CareersPage'));
const DocsPage = React.lazy(() => import('./pages/DocsPage'));

function AppContent() {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/workspace');

  // Silent wake-up ping to Render backend & Proctoring API (fires once on app load for real users only)
  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    if (!isBot) {
      fetchWithRetry(`${import.meta.env.VITE_API_URL}/api/health`).catch(() => { });
      const faceApi = import.meta.env.VITE_FACE_API_URL || 'http://localhost:8000';
      fetch(faceApi).catch(() => { });
    }
  }, []);

  return (
    <div className={`flex flex-col bg-[var(--color-dark-bg)] text-white font-sans relative ${isWorkspace ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <ScrollToTop />
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
            <Sentry.ErrorBoundary fallback={GlobalErrorFallback} showDialog={false}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/problemset" element={<ProblemsetPage />} />
                <Route path="/contests" element={<ContestsPage />} />
                <Route path="/company/dashboard" element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/superadmin" element={
                  <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
                    <SuperadminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/workspace/practice/:problemId" element={
                  <ProtectedRoute>
                    <CodingWorkspace />
                  </ProtectedRoute>
                } />
                <Route path="/workspace/contest/:contestId" element={
                  <ProtectedRoute>
                    <ContestArena />
                  </ProtectedRoute>
                } />
                <Route path="/workspace/contest/:contestId/:problemId" element={
                  <ProtectedRoute>
                    <CodingWorkspace />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/ai-roadmap" element={<AiRoadmapPage />} />
                <Route path="/privacy" element={<PlatformPrivacy />} />
                <Route path="/terms" element={<PlatformTerms />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/docs/:section?" element={<DocsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Sentry.ErrorBoundary>
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
      <AppContent />
      <Toaster theme="dark" richColors position="top-center" />
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
