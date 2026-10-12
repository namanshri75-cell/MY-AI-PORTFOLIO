/**
 * Naman Srivastava — Interactive 3D Web Resume & Portfolio
 * Tailored for AI Applications, Automation & AI Operations Roles
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { LeadershipEducation } from "./components/LeadershipEducation";
import { WhyAISection } from "./components/WhyAISection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ResumeModal } from "./components/ResumeModal";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { NetflixTheme } from "./components/netflix/NetflixTheme";
import { NetflixIntro } from "./components/netflix/NetflixIntro";

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"classic" | "netflix">(() => {
    try {
      const saved = localStorage.getItem("naman_portfolio_theme");
      return saved === "netflix" ? "netflix" : "classic";
    } catch {
      return "classic";
    }
  });
  const [showNetflixIntro, setShowNetflixIntro] = useState(false);

  useEffect(() => {
    try {
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (search.includes("netflix") || hash.includes("netflix") || search.includes("intro")) {
        setThemeMode("netflix");
        setShowNetflixIntro(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSwitchToNetflix = () => {
    // Mount Netflix theme underneath immediately so billboard & assets are ready
    setThemeMode("netflix");
    try {
      localStorage.setItem("naman_portfolio_theme", "netflix");
    } catch {
      // ignore
    }
    // Show the iconic Netflix TA-DUM intro animation over it
    setShowNetflixIntro(true);
  };

  const handleReplayIntro = () => {
    setShowNetflixIntro(true);
  };

  const handleIntroComplete = () => {
    // Intro video has smoothly dissolved into the ready Netflix theme
    setShowNetflixIntro(false);
  };

  const handleSwitchToClassic = () => {
    setThemeMode("classic");
    try {
      localStorage.setItem("naman_portfolio_theme", "classic");
    } catch {
      // ignore
    }
  };

  return (
    <ErrorBoundary>
      {/* Netflix Intro Splash Animation (TA-DUM) */}
      {showNetflixIntro && <NetflixIntro onComplete={handleIntroComplete} />}

      {themeMode === "netflix" ? (
        /* Full-Fledged Netflix Theme View */
        <NetflixTheme
          onSwitchToClassic={handleSwitchToClassic}
          onReplayIntro={handleReplayIntro}
        />
      ) : (
        /* Classic High-Tech Cybernetic Portfolio View */
        <div className="min-h-screen bg-[#06080d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
          {/* Animated Reading Progress Bar tracking scroll depth */}
          <ScrollProgressBar />

          {/* Subtle physical film grain texture overlay */}
          <div className="grain-overlay" aria-hidden="true" />

          {/* Sticky Navigation Bar */}
          <Navbar
            onOpenResumePreview={() => setResumeModalOpen(true)}
            onSwitchToNetflix={handleSwitchToNetflix}
          />

          {/* Main Content Sections */}
          <main className="flex flex-col w-full">
            <HeroSection onOpenResumePreview={() => setResumeModalOpen(true)} />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <AchievementsSection />
            <LeadershipEducation />
            <WhyAISection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Resume Preview Modal */}
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => setResumeModalOpen(false)}
          />

          {/* Floating Netflix Theme Switcher Pill */}
          <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
            <button
              onClick={handleSwitchToNetflix}
              type="button"
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-red-600 via-[#E50914] to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(229,9,20,0.6)] hover:shadow-[0_4px_35px_rgba(229,9,20,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-red-400/40"
              title="Experience Portfolio in Netflix Theme"
            >
              <span className="text-base">🍿</span>
              <span>Netflix Theme</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono font-semibold text-red-200">
                PRO
              </span>
            </button>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
