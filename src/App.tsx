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
  // Always default to Classic Portfolio on page load/visit as requested
  const [themeMode, setThemeMode] = useState<"classic" | "netflix">("classic");
  const [showNetflixIntro, setShowNetflixIntro] = useState(false);

  const handleSwitchToNetflix = () => {
    // Mount Netflix theme and trigger cinematic TA-DUM intro
    setThemeMode("netflix");
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
        </div>
      )}
    </ErrorBoundary>
  );
}
