import React from "react";
import { ArrowRight, FileDown, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { generateResumePDF } from "../utils/resumePdf";
import { SplineSceneBasic } from "@/components/ui/demo";

interface HeroSectionProps {
  onOpenResumePreview?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumePreview }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] w-full flex flex-col justify-center pt-24 pb-16 lg:pt-28 overflow-hidden bg-[#040406]"
    >
      {/* Background Ambience Gradients — Warm Gold Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[600px] h-[340px] sm:h-[500px] lg:h-[600px] bg-amber-500/8 rounded-none blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-48 sm:w-[450px] h-48 sm:h-[450px] bg-yellow-600/6 rounded-none blur-[130px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 2xl:gap-16 items-center">
          {/* Left Column: Typography & Intent with Sharp Corners & Black/Gold Theme */}
          <div className="lg:col-span-6 flex flex-col items-start text-left w-full relative z-20">
            {/* Sublevel OS Coordinate Pill — Sharp Cornered Gold */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-4 border-amber-500/40">
              <span className="w-1.5 h-1.5 rounded-none bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest">[SYS/01] TACTILE OPERATING SYSTEM • PORTFOLIO CORE</span>
            </div>

            {/* Candidate DP Badge & Focus — Sharp Metallic Obsidian */}
            <div className="flex items-center gap-3 p-2 pr-4 rounded-none bespoke-card mb-5 shadow-xl transition-all max-w-full border-amber-500/30">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-none overflow-hidden border border-amber-400 shadow-[0_0_14px_rgba(212,175,55,0.3)] flex-shrink-0">
                <img
                  src="./naman_dp.jpg"
                  alt="Naman Srivastava"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-none bg-amber-400 border border-black" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-white tracking-wide truncate">Naman Srivastava</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-amber-950/60 text-amber-300 border border-amber-400/40 font-semibold tracking-wider whitespace-nowrap">
                    Available for Roles
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-amber-400/80 tracking-tight truncate">
                  AI Applications & Automation
                </span>
              </div>
            </div>

            {/* Candidate Name */}
            <h1 className="relative z-30 isolate font-display text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-white leading-[1.06] mb-4 break-words select-text">
              NAMAN <br />
              <span className="relative z-30 inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
                SRIVASTAVA
              </span>
            </h1>

            {/* Subtitle */}
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm font-mono tracking-[0.1em] sm:tracking-[0.18em] text-amber-400/90 uppercase font-semibold mb-5 flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>AI APPLICATIONS</span>
              <span className="text-amber-600/70">/</span>
              <span>AUTOMATION</span>
              <span className="text-amber-600/70">/</span>
              <span>AI OPERATIONS</span>
            </div>

            {/* Short Introduction */}
            <p className="text-sm sm:text-base 2xl:text-lg text-neutral-300 font-normal leading-[1.65] max-w-xl 2xl:max-w-2xl mb-7 2xl:mb-9 font-sans">
              Exploring practical applications of AI and autonomous pipelines to simplify enterprise workflows, solve customer problems, and build robust digital experiences.
            </p>

            {/* Three Action Buttons — Sharp Corners & Gold Accents */}
            <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 mb-8 w-full sm:w-auto">
              {/* Button 1: View My Work */}
              <button
                onClick={() => scrollToSection("projects")}
                className="px-5 sm:px-6 py-3 min-h-[46px] rounded-none font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer border border-amber-300/50"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Download Resume */}
              <button
                onClick={() => {
                  generateResumePDF();
                }}
                className="px-5 sm:px-6 py-3 min-h-[46px] rounded-none font-semibold text-xs sm:text-sm bespoke-card text-white hover:border-amber-400 hover:text-amber-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group border-amber-500/30"
              >
                <FileDown className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Resume PDF</span>
              </button>

              {/* Button 3: Subtle Contact Me */}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-3 min-h-[46px] rounded-none font-medium text-xs sm:text-sm text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-amber-500/20 hover:border-amber-400/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Fast 10-Second Recruiter Snapshot — Sharp Box */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 p-3 sm:p-4 2xl:p-5 rounded-none bespoke-card w-full max-w-xl 2xl:max-w-2xl border-amber-500/25">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[10.5px] 2xl:text-[11px] font-mono text-amber-400/80 uppercase tracking-wider truncate">Focus</span>
                <span className="text-[11px] sm:text-xs 2xl:text-sm font-semibold text-neutral-100 mt-1 leading-tight break-words">Practical AI & n8n</span>
              </div>
              <div className="flex flex-col border-l border-amber-500/20 pl-2 sm:pl-3 2xl:pl-4 min-w-0">
                <span className="text-[10px] sm:text-[10.5px] 2xl:text-[11px] font-mono text-amber-400/80 uppercase tracking-wider truncate">Experience</span>
                <span className="text-[11px] sm:text-xs 2xl:text-sm font-semibold text-neutral-100 mt-1 leading-tight break-words">Tech Support & Ops</span>
              </div>
              <div className="flex flex-col border-l border-amber-500/20 pl-2 sm:pl-3 2xl:pl-4 min-w-0">
                <span className="text-[10px] sm:text-[10.5px] 2xl:text-[11px] font-mono text-amber-400/80 uppercase tracking-wider truncate">Location</span>
                <span className="text-[11px] sm:text-xs 2xl:text-sm font-semibold text-neutral-100 mt-1 leading-tight break-words">Lucknow, India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Showcase (Pure Robot with Zoom controls & Floating Performance overlay) */}
          <div className="lg:col-span-6 relative z-10 flex flex-col items-center w-full mt-6 lg:mt-0">
            <SplineSceneBasic className="w-full h-[400px] sm:h-[480px] lg:h-[560px] xl:h-[580px] 2xl:h-[650px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
