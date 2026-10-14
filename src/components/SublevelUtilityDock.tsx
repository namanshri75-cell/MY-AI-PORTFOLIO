import React, { useState, useEffect } from "react";
import { Terminal, Cpu, FileDown, Film, Layers, Activity, X, Maximize2 } from "lucide-react";
import { generateResumePDF } from "../utils/resumePdf";
import { SublevelStudioLandingPage } from "./SublevelStudioScene";

interface SublevelUtilityDockProps {
  onSwitchToNetflix: () => void;
  onOpenResumePreview: () => void;
}

export const SublevelUtilityDock: React.FC<SublevelUtilityDockProps> = ({
  onSwitchToNetflix,
  onOpenResumePreview,
}) => {
  const [activeSection, setActiveSection] = useState("home");
  const [showSublevelModal, setShowSublevelModal] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Sublevel OS Dock — Sharp Corners & Gold Accent */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-max pointer-events-auto">
        <div className="p-1.5 sm:p-2 rounded-none bg-[#050507]/95 border border-amber-500/30 backdrop-blur-xl shadow-2xl flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-300">
          {/* OS Status indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 border-r border-amber-500/20 text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-none bg-amber-400 animate-pulse" />
            <span className="text-[10px] tracking-wider text-amber-300 font-bold">GOLD.OS</span>
            <span className="text-amber-500/40">|</span>
            <span className="text-[10px] text-neutral-400">{time}</span>
          </div>

          {/* Section Navigation Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => scrollTo("home")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              [01] HERO
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              [02] ABOUT
            </button>
            <button
              onClick={() => scrollTo("skills")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              [03] SKILLS
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              [04] PROJECTS
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap hidden sm:inline-flex"
            >
              [05] OPS
            </button>
            <button
              onClick={() => scrollTo("achievements")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap hidden md:inline-flex"
            >
              [06] ORBIT
            </button>
            <button
              onClick={() => scrollTo("lab")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap hidden lg:inline-flex"
            >
              [07] LAB
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-2.5 py-1.5 rounded-none hover:bg-neutral-800/60 text-neutral-300 hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              [08] TERMINAL
            </button>
          </div>

          {/* Actions separator */}
          <div className="h-5 w-[1px] bg-amber-500/20 hidden sm:block" />

          {/* ThreeUI Engine Toggle */}
          <button
            onClick={() => setShowSublevelModal(true)}
            title="Inspect Canonical Sublevel Three.js 0.160 Engine"
            className="px-2.5 py-1.5 rounded-none bg-[#09090c] hover:bg-neutral-800 text-neutral-200 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">3D ENGINE</span>
          </button>

          {/* Resume Quick Action */}
          <button
            onClick={generateResumePDF}
            title="Download Candidate Resume PDF"
            className="px-2.5 py-1.5 rounded-none bg-[#09090c] hover:bg-neutral-800 text-neutral-200 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">RESUME</span>
          </button>

          {/* Switch to Netflix View */}
          <button
            onClick={onSwitchToNetflix}
            title="Switch to Cinematic Netflix Mode"
            className="px-3 py-1.5 rounded-none bg-gradient-to-r from-red-700 to-red-800 hover:brightness-110 text-white font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-md shadow-red-950/40 border border-red-500/30"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-wide font-bold">NETFLIX</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Sublevel Studio ThreeUI Canonical Frame Modal */}
      {showSublevelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-2 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-7xl h-[92vh] rounded-none bg-[#050507] border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#09090c] border-b border-amber-500/20 flex items-center justify-between font-mono text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-none bg-amber-400 animate-ping" />
                <span className="font-semibold text-white">SUBLEVEL.STUDIO — CANONICAL THREE.JS 0.160 ENGINE</span>
                <span className="text-amber-500/40 hidden sm:inline">•</span>
                <span className="text-amber-400/80 text-[11px] hidden sm:inline">SHA-256 91db5c1bb779</span>
              </div>
              <button
                onClick={() => setShowSublevelModal(false)}
                className="p-1.5 rounded-none hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Sublevel Studio Canvas */}
            <div className="flex-1 w-full h-full relative overflow-hidden bg-[#050507]">
              <SublevelStudioLandingPage />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-2.5 bg-[#09090c] border-t border-amber-500/20 flex items-center justify-between font-mono text-[11px] text-neutral-400">
              <span>Interactive Three.js Paper Mesh & Tactical Black & Gold Operating System</span>
              <button
                onClick={() => setShowSublevelModal(false)}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                Return to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SublevelUtilityDock;
