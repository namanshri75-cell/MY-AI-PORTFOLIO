/**
 * Naman Srivastava — Interactive 3D Web Resume & Portfolio
 * Tailored for AI Applications, Automation & AI Operations Roles
 */

import React, { useState } from "react";
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

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#06080d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
        {/* Subtle physical film grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Sticky Navigation Bar */}
        <Navbar onOpenResumePreview={() => setResumeModalOpen(true)} />

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
    </ErrorBoundary>
  );
}
