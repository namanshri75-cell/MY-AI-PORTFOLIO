import React, { useState, useEffect } from "react";
import { FileDown, Film } from "lucide-react";
import { generateResumePDF } from "../utils/resumePdf";

interface SublevelUtilityDockProps {
  onSwitchToNetflix: () => void;
  onOpenResumePreview: () => void;
}

export const SublevelUtilityDock: React.FC<SublevelUtilityDockProps> = ({
  onSwitchToNetflix,
  onOpenResumePreview,
}) => {
  const [activeSection, setActiveSection] = useState("home");
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
            [07] WORKFLOW
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
    </>
  );
};

export default SublevelUtilityDock;
