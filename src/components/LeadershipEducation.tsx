import React from "react";
import { LEADERSHIP_ITEM, EDUCATION_ITEM, CERTIFICATION_ITEM } from "../data/portfolioData";
import { GraduationCap, Users, Award, CheckCircle2, Building, Calendar, Sparkles, FileText } from "lucide-react";

export const LeadershipEducation: React.FC = () => {
  return (
    <section id="education" className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406]">
      {/* Ambience */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/5 rounded-none blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/07] FOUNDATIONS & CREDENTIALS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            EDUCATION & LEADERSHIP
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl font-normal">
            Academic business training, creative communications leadership, and verified tool mastery.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 2xl:gap-10">
          {/* Card 1: Education */}
          <div className="p-5 sm:p-8 rounded-none bespoke-card transition-all flex flex-col justify-between shadow-xl border border-amber-500/25 hover:border-amber-400">
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-none bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-none bespoke-pill text-amber-300 border-amber-500/30">
                  Degree
                </span>
              </div>

              <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                ACADEMIC FOUNDATION
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {EDUCATION_ITEM.degree}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 font-semibold mb-4 flex-wrap">
                <Building className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>{EDUCATION_ITEM.institution}</span>
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                {EDUCATION_ITEM.description}
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Business + Automation Focus</span>
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          {/* Card 2: Leadership */}
          <div className="p-5 sm:p-8 rounded-none bespoke-card transition-all flex flex-col justify-between shadow-xl border border-amber-500/25 hover:border-amber-400">
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-none bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-none bespoke-pill text-amber-300 border-amber-500/30">
                  Leadership
                </span>
              </div>

              <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                CREATIVE DIRECTION
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {LEADERSHIP_ITEM.role}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 font-semibold mb-4 flex-wrap">
                <Building className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>{LEADERSHIP_ITEM.organization}</span>
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                "{LEADERSHIP_ITEM.description}"
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Communication & Content</span>
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          {/* Card 3: Certification (Certificate-style interactive card) */}
          <div className="p-5 sm:p-8 rounded-none bespoke-card border-amber-500/35 hover:border-amber-400 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Top Certificate Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/20 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-none bg-amber-500/15 text-amber-300 border border-amber-500/40 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-none bespoke-pill text-amber-300 border-amber-500/40 font-bold">
                  VERIFIED WORKSHOP
                </span>
              </div>

              <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                ANALYTICS CREDENTIAL
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                {CERTIFICATION_ITEM.title}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 font-semibold mb-4 flex-wrap">
                <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{CERTIFICATION_ITEM.issuer}</span>
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                {CERTIFICATION_ITEM.description}
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Business Intelligence Capable</span>
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
