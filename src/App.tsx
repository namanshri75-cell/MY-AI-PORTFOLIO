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
import { SublevelUtilityDock } from "./components/SublevelUtilityDock";
import { LabExperimentsSection } from "./components/LabExperimentsSection";
import { NetflixTheme } from "./components/netflix/NetflixTheme";
import { NetflixIntro } from "./components/netflix/NetflixIntro";
import { netflixAudio } from "./utils/netflixAudio";

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  // Check URL param ?theme=netflix or persisted selection
  const [themeMode, setThemeMode] = useState<"classic" | "netflix">(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get("theme") === "netflix") return "netflix";
        const saved = localStorage.getItem("naman_theme_mode");
        if (saved === "netflix" || saved === "classic") return saved;
      } catch {
        // ignore
      }
    }
    return "classic";
  });
  const [showNetflixIntro, setShowNetflixIntro] = useState(false);

  const handleSwitchToNetflix = () => {
    // Mount Netflix theme and trigger cinematic TA-DUM intro
    setThemeMode("netflix");
    try {
      localStorage.setItem("naman_theme_mode", "netflix");
    } catch {
      // ignore
    }
    setShowNetflixIntro(true);
  };

  const handleReplayIntro = () => {
    setShowNetflixIntro(true);
  };

  const handleIntroComplete = () => {
    // Intro video dissolves into the Netflix theme
    setShowNetflixIntro(false);
  };

  const handleSwitchToClassic = () => {
    setShowNetflixIntro(false);
    setThemeMode("classic");
    try {
      localStorage.setItem("naman_theme_mode", "classic");
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
        /* Classic High-Tech Cybernetic Portfolio View — Premium Black & Gold Edition */
        <div className="min-h-screen bg-[#040406] text-[#f1f1eb] font-sans selection:bg-amber-400/30 selection:text-amber-200 overflow-x-hidden relative">
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
            <LabExperimentsSection />
            <ContactSection />
          </main>

          {/* Floating Sublevel OS Dock */}
          <SublevelUtilityDock
            onSwitchToNetflix={handleSwitchToNetflix}
            onOpenResumePreview={() => setResumeModalOpen(true)}
          />

          {/* Footer */}
          <Footer />

          {/* Resume Preview Modal */}
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => setResumeModalOpen(false)}
          />
        </div>
      )}
    </ErrorBoundary>
  );
}
