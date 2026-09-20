import React, { useState } from "react";
import { ArrowRight, FileDown, Mail, Eye, Sparkles, Bot, ShieldCheck, CheckCircle2, Linkedin, Github } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { Hero3DCanvas } from "./Hero3DCanvas";
import { RobotHero } from "./ui/robot-hero";
import { generateResumePDF } from "../utils/resumePdf";

interface HeroSectionProps {
  onOpenResumePreview?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumePreview }) => {
  const [active3DMode, setActive3DMode] = useState<"neural" | "robot">("neural");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] w-full flex flex-col justify-center pt-24 pb-16 lg:pt-28 overflow-hidden"
    >
      {/* Background Ambience Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[600px] h-[340px] sm:h-[500px] lg:h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-48 sm:w-[450px] h-48 sm:h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 2xl:gap-16 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 flex flex-col items-start text-left w-full relative z-20">
            {/* Candidate DP Badge & Focus */}
            <div className="flex items-center gap-3 p-1.5 pr-3.5 rounded-full bespoke-card mb-5 shadow-xl transition-all max-w-full">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_14px_rgba(0,255,198,0.3)] flex-shrink-0">
                <img
                  src="/naman_dp.jpg"
                  alt="Naman Srivastava"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-white tracking-wide truncate">Naman Srivastava</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-400/40 font-semibold tracking-wider whitespace-nowrap">
                    Available for Roles
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 tracking-tight truncate">
                  AI Applications & Automation
                </span>
              </div>
            </div>

            {/* Candidate Name */}
            <h1 className="relative z-30 isolate font-display text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-white leading-[1.06] mb-4 break-words select-text">
              NAMAN <br />
              <span className="relative z-30 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                SRIVASTAVA
              </span>
            </h1>

            {/* Subtitle */}
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm font-mono tracking-[0.1em] sm:tracking-[0.18em] text-cyan-400/90 uppercase font-semibold mb-5 flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>AI APPLICATIONS</span>
              <span className="text-slate-600">/</span>
              <span>AUTOMATION</span>
              <span className="text-slate-600">/</span>
              <span>AI OPERATIONS</span>
            </div>

            {/* Short Introduction */}
            <p className="text-sm sm:text-base 2xl:text-lg text-slate-300/95 font-normal leading-[1.65] max-w-xl 2xl:max-w-2xl mb-7 2xl:mb-9">
              Exploring practical applications of AI and automation to simplify workflows, solve problems, and build useful digital experiences.
            </p>

            {/* Three Action Buttons */}
            <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 mb-8 w-full sm:w-auto">
              {/* Button 1: View My Work */}
              <button
                onClick={() => scrollToSection("projects")}
                className="px-5 sm:px-6 py-3 min-h-[46px] rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:shadow-[0_0_25px_rgba(0,255,198,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer border border-cyan-300/30"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Download Resume */}
              <button
                onClick={() => {
                  generateResumePDF();
                }}
                className="px-5 sm:px-6 py-3 min-h-[46px] rounded-xl font-semibold text-xs sm:text-sm bespoke-card text-white hover:border-cyan-400/60 hover:text-cyan-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
              >
                <FileDown className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </button>

              {/* Button 3: Subtle Contact Me */}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-3 min-h-[46px] rounded-xl font-medium text-xs sm:text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Fast 10-Second Recruiter Snapshot */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 p-3 sm:p-4 2xl:p-5 rounded-2xl bespoke-card w-full max-w-xl 2xl:max-w-2xl">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[10.5px] 2xl:text-[11px] font-mono text-slate-400 uppercase tracking-wider truncate">Focus</span>
                <span className="text-[11px] sm:text-xs 2xl:text-sm font-semibold text-slate-100 mt-1 leading-tight break-words">Practical AI & n8n</span>
              </div>
              <div className="flex flex-col border-l border-white/[0.06] pl-2 sm:pl-3 2xl:pl-4 min-w-0">
                <span className="text-[10px] sm:text-[10.5px] 2xl:text-[11px] font-mono text-slate-400 uppercase tracking-wider truncate">Experience</span>
                <span className="text-[11px] sm:text-xs 2xl:text-sm font-semibold text-slate-100 mt-1 leading-tight break-words">Tech Support & Ops</span>
              </div>
              <div className="flex flex-col border-l border-white/[0.06] pl-2 sm:pl-3 2xl:pl-4 min-w-0">
                <span className="text-[10px] sm:text-[10.5px] 2xl:text-[11px] font-mono text-slate-400 uppercase tracking-wider truncate">Location</span>
                <span className="text-[11px] sm:text-xs 2xl:text-sm font-semibold text-slate-100 mt-1 leading-tight break-words">Lucknow, India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas Showcase */}
          <div className="lg:col-span-6 relative z-10 flex flex-col items-center w-full mt-6 lg:mt-0">
            {/* 3D Scene Container */}
            <div className="relative w-full h-[350px] sm:h-[460px] lg:h-[560px] xl:h-[580px] 2xl:h-[650px] rounded-3xl bespoke-card overflow-hidden flex items-center justify-center">
              {active3DMode === "neural" ? (
                <Hero3DCanvas />
              ) : (
                <div className="w-full h-full relative flex items-center justify-center">
                  <RobotHero
                    scale={1.05}
                    pantallaColor="#00ffc6"
                    pantallaBrillo={1.6}
                    color="#1e2433"
                    className="w-full h-full"
                  />
                  {/* Subtle interactive helper pill */}
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-950/85 border border-slate-800/80 backdrop-blur-md flex items-center gap-2 max-w-[90%]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-300 truncate">
                      Cursor-guided 3D Robot Assistant
                    </span>
                  </div>
                </div>
              )}

              {/* 3D Model Switcher Pill */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 flex items-center p-1 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md max-w-[calc(100%-24px)]">
                <button
                  onClick={() => setActive3DMode("neural")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-all ${
                    active3DMode === "neural"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Neural Core</span>
                </button>
                <button
                  onClick={() => setActive3DMode("robot")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-all ${
                    active3DMode === "robot"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Assistant</span>
                </button>
              </div>

              {/* Verified Profile Tag */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-slate-300 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Candidate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
