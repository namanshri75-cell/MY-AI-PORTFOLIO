import React from "react";
import { LEADERSHIP_ITEM, EDUCATION_ITEM, CERTIFICATION_ITEM } from "../data/portfolioData";
import { GraduationCap, Users, Award, CheckCircle2, Building, Calendar, Sparkles, FileText } from "lucide-react";

export const LeadershipEducation: React.FC = () => {
  return (
    <section id="education" className="relative py-20 lg:py-28 w-full border-t border-slate-900 bg-[#07090e]">
      {/* Ambience */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-cyan-400 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>FOUNDATIONS & CREDENTIALS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            EDUCATION & LEADERSHIP
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-2xl font-normal">
            Academic business training, creative communications leadership, and verified tool workshop.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 2xl:gap-10">
          {/* Card 1: Education */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bespoke-card transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-full bespoke-pill text-slate-300">
                  Degree
                </span>
              </div>

              <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                ACADEMIC FOUNDATION
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {EDUCATION_ITEM.degree}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-semibold mb-4 flex-wrap">
                <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{EDUCATION_ITEM.institution}</span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-sans">
                {EDUCATION_ITEM.description}
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Business + Technology Focus</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* Card 2: Leadership */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bespoke-card transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-full bespoke-pill text-purple-300 border-purple-500/30">
                  Leadership
                </span>
              </div>

              <span className="text-xs font-mono text-purple-400 font-bold block mb-1">
                CREATIVE DIRECTION
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {LEADERSHIP_ITEM.role}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-semibold mb-4 flex-wrap">
                <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{LEADERSHIP_ITEM.organization}</span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-sans">
                "{LEADERSHIP_ITEM.description}"
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Communication & Content</span>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
          </div>

          {/* Card 3: Certification (Certificate-style interactive card) */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bespoke-card border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Top Certificate Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/20 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-full bespoke-pill text-amber-300 border-amber-500/40 font-bold">
                  VERIFIED WORKSHOP
                </span>
              </div>

              <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                ANALYTICS CREDENTIAL
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {CERTIFICATION_ITEM.title}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-semibold mb-4 flex-wrap">
                <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{CERTIFICATION_ITEM.issuer}</span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-sans">
                {CERTIFICATION_ITEM.description}
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Business Intelligence Capable</span>
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
