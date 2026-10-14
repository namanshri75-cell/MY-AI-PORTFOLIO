import React from "react";
import { ABOUT_TEXT, PERSONAL_INFO } from "../data/portfolioData";
import { About3DCube } from "./About3DCube";
import { MapPin, Briefcase, GraduationCap, CheckCircle2, Sparkles, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406]">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-none blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/02] CANDIDATE DOSSIER & PROFILE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {ABOUT_TEXT.heading}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-3.5" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 2xl:gap-16 items-center">
          {/* Left Column: Authentic Bio & Candidate Identity */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Profile Identity Card with Real DP — Sharp Corners & Gold Accents */}
            <div className="p-5 sm:p-7 rounded-none bespoke-card flex flex-col sm:row items-center sm:items-start gap-5 sm:gap-6 border-amber-500/30">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-none overflow-hidden border border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.25)] flex-shrink-0 group">
                <img
                  src="./naman_dp.jpg"
                  alt="Naman Srivastava"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded-none bg-black/90 text-[10px] font-mono text-amber-300 border border-amber-400/50 font-semibold tracking-wider">
                  Verified
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap justify-center sm:justify-start">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">Naman Srivastava</h3>
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                </div>
                <span className="text-xs font-mono text-amber-400 font-semibold mb-2 tracking-wide break-words">
                  BBA Graduate • AI Operations & Automation
                </span>
                <p className="text-xs sm:text-[13.5px] text-neutral-300 leading-relaxed mb-4 font-sans">
                  Focused on building practical automated workflows and evaluating modern AI tools to streamline business operations and eliminate friction.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="px-3.5 py-2 min-h-[38px] rounded-none bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 text-xs font-medium border border-amber-400/40 transition-colors flex items-center gap-1.5 font-mono"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Direct</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 min-h-[38px] rounded-none bg-[#0a0a0d] text-neutral-300 hover:text-white text-xs font-medium border border-amber-500/20 hover:border-amber-400/40 transition-colors flex items-center gap-1.5 font-mono"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Prompt Statement Box — Sharp Corners */}
            <div className="p-5 sm:p-8 rounded-none bespoke-card border-amber-500/25">
              <p className="text-[15px] sm:text-[17px] text-neutral-100 font-medium leading-[1.65] mb-4 break-words">
                {ABOUT_TEXT.lead}
              </p>
              <p className="text-xs sm:text-[14px] text-neutral-400 leading-relaxed font-sans break-words">
                {ABOUT_TEXT.secondary}
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-amber-500/15">
                {ABOUT_TEXT.pillars.map((p, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      {p.title}
                    </span>
                    <span className="text-[11.5px] text-neutral-400 leading-normal">
                      {p.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Candidate Snapshot Card — Sharp Corners */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-none bespoke-card flex items-center gap-3 border-amber-500/20">
                <div className="p-2.5 rounded-none bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Education</span>
                  <span className="text-xs font-bold text-neutral-100">BBA Graduate</span>
                </div>
              </div>

              <div className="p-4 rounded-none bespoke-card flex items-center gap-3 border-amber-500/20">
                <div className="p-2.5 rounded-none bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Operations</span>
                  <span className="text-xs font-bold text-neutral-100">Technical Support</span>
                </div>
              </div>

              <div className="p-4 rounded-none bespoke-card flex items-center gap-3 border-amber-500/20">
                <div className="p-2.5 rounded-none bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Location</span>
                  <span className="text-xs font-bold text-neutral-100">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Concept Cube Visual */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <About3DCube />
          </div>
        </div>
      </div>
    </section>
  );
};
