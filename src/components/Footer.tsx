import React from "react";
import { ArrowUp, Heart, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-slate-900 bg-[#05070a] text-slate-400 text-xs">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Mission */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm font-display">
              N
            </div>
            <div>
              <span className="font-display font-bold text-slate-200 block text-sm tracking-wide">
                NAMAN SRIVASTAVA
              </span>
              <span className="text-[11px] font-mono text-cyan-400/90 tracking-tight">
                AI Applications, Automation & Operations • Naman Srivastava
              </span>
            </div>
          </div>

          {/* Quick Socials */}
          <div className="flex items-center gap-3 sm:gap-4 text-slate-400">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="min-w-[44px] min-h-[44px] rounded-lg bg-white/[0.03] border border-white/[0.06] hover:text-cyan-400 hover:border-cyan-400/40 transition-colors flex items-center justify-center"
              aria-label="Email Naman"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] rounded-lg bg-white/[0.03] border border-white/[0.06] hover:text-cyan-400 hover:border-cyan-400/40 transition-colors flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] rounded-lg bg-white/[0.03] border border-white/[0.06] hover:text-cyan-400 hover:border-cyan-400/40 transition-colors flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center">
            <span className="text-[11px] text-slate-500 font-mono">
              © {new Date().getFullYear()} Naman Srivastava. Verified credentials.
            </span>
            <button
              onClick={scrollToTop}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bespoke-card text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
