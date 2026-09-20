import React from "react";
import { EXPERIENCE_DATA } from "../data/portfolioData";
import { Briefcase, CheckCircle2, Headphones, Search, MessageSquare, ShieldAlert, Sparkles, Building2, Calendar, MapPin } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 lg:py-28 w-full border-t border-slate-900 bg-[#07090e]">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-cyan-400 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPERATIONAL TRACK RECORD</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            PROFESSIONAL EXPERIENCE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-2xl font-normal">
            Real-world technical support, customer communication, and issue investigation.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* Experience Card Container */}
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto">
          <div className="relative pl-4 sm:pl-8 border-l-2 border-cyan-500/30 space-y-8 sm:space-y-10">
            {/* Timeline Bullet */}
            <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(0,255,198,0.5)]">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>

            {/* Experience Box */}
            <div className="p-5 sm:p-9 rounded-2xl sm:rounded-3xl bespoke-card shadow-xl">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 sm:pb-6 border-b border-white/[0.07]">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {EXPERIENCE_DATA.role}
                    </h3>
                    <span className="bespoke-pill px-2.5 py-0.5 rounded-full text-cyan-300 border-cyan-400/40 font-semibold text-[11px] sm:text-xs">
                      Verified Role
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-cyan-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {EXPERIENCE_DATA.company}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 bespoke-pill px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {EXPERIENCE_DATA.period}
                  </span>
                  <span className="flex items-center gap-1.5 bespoke-pill px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {EXPERIENCE_DATA.location}
                  </span>
                </div>
              </div>

              {/* Summary Statement */}
              <p className="text-xs sm:text-base text-slate-300/90 leading-[1.65] mb-6 sm:mb-8 font-sans">
                {EXPERIENCE_DATA.summary}
              </p>

              {/* Evidence Formula Banner */}
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bespoke-inset mb-6 sm:mb-8 flex items-center justify-center text-center">
                <span className="text-[11px] sm:text-[12.5px] font-mono font-semibold text-cyan-300 tracking-wider break-words">
                  EVIDENCE: Problem Solving + Customer Communication + Technical Operations
                </span>
              </div>

              {/* Three Structured Evidence Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {EXPERIENCE_DATA.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bespoke-inset flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {idx === 0 && <Search className="w-4 h-4 text-cyan-400" />}
                        {idx === 1 && <MessageSquare className="w-4 h-4 text-emerald-400" />}
                        {idx === 2 && <ShieldAlert className="w-4 h-4 text-purple-400" />}
                        <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                          {pillar.title}
                        </h4>
                      </div>

                      <ul className="space-y-2.5">
                        {pillar.points.map((pt, pIdx) => (
                          <li key={pIdx} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed font-sans">
                            <span className="text-cyan-400 font-bold mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
