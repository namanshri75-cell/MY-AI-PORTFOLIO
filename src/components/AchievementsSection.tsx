import React from "react";
import { ACHIEVEMENTS } from "../data/portfolioData";
import { Trophy, Award, Presentation, Sparkles, CheckCircle2 } from "lucide-react";

export const AchievementsSection: React.FC = () => {
  const achievementIcons = [
    <Trophy className="w-8 h-8 text-amber-400" />,
    <Presentation className="w-8 h-8 text-cyan-400" />,
    <Award className="w-8 h-8 text-purple-400" />,
  ];

  return (
    <section id="achievements" className="relative py-20 lg:py-28 w-full border-t border-slate-900 bg-[#07090e]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>MILESTONES & RECOGNITION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            ACHIEVEMENTS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-2xl font-normal">
            Validated milestones showcasing problem solving, public speaking, and project initiative.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* 3 Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8">
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={item.title}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bespoke-card transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] shadow-sm group-hover:scale-105 transition-transform">
                    {achievementIcons[idx]}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-full bespoke-pill text-amber-300 border-amber-500/30 font-medium">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 tracking-tight">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 block mb-3 sm:mb-4">
                  {item.subtitle}
                </span>

                <p className="text-xs sm:text-[13.5px] text-slate-300/90 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-cyan-400">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Verified Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
