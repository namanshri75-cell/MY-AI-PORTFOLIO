import React from "react";
import { ArrowUp, Heart, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-amber-500/20 bg-[#020204] text-neutral-400 text-xs">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Mission */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm font-display">
              N
            </div>
            <div>
              <span className="font-display font-bold text-neutral-100 block text-sm tracking-wide">
                NAMAN SRIVASTAVA
              </span>
              <span className="text-[11px] font-mono text-amber-400/90 tracking-tight">
                AI Applications, Autonomous Workflows & Operations
              </span>
            </div>
          </div>

          {/* Quick Socials */}
          <div className="flex items-center gap-3 sm:gap-4 text-neutral-400">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="min-w-[42px] min-h-[42px] rounded-none bg-[#070709] border border-amber-500/20 hover:text-amber-300 hover:border-amber-400/50 transition-colors flex items-center justify-center"
              aria-label="Email Naman"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[42px] min-h-[42px] rounded-none bg-[#070709] border border-amber-500/20 hover:text-amber-300 hover:border-amber-400/50 transition-colors flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[42px] min-h-[42px] rounded-none bg-[#070709] border border-amber-500/20 hover:text-amber-300 hover:border-amber-400/50 transition-colors flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center">
            <span className="text-[11px] text-neutral-500 font-mono">
              © {new Date().getFullYear()} Naman Srivastava. Premium Gold Edition.
            </span>
            <button
              onClick={scrollToTop}
              className="min-h-[42px] px-4 py-2 rounded-none bespoke-card text-neutral-400 hover:text-amber-300 hover:border-amber-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-amber-500/20"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
