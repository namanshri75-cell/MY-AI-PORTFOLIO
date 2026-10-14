import React, { useState } from "react";
import { ACHIEVEMENTS } from "../data/portfolioData";
import { 
  Trophy, 
  Award, 
  Presentation, 
  Sparkles, 
  CheckCircle2, 
  Orbit, 
  Grid3X3, 
  Cpu, 
  Zap, 
  ShieldCheck 
} from "lucide-react";
import { RadialOrbitalTimeline, TimelineItem } from "@/components/ui/radial-orbital-timeline";

export const AchievementsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<"orbital" | "grid">("orbital");

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "GenAI Hackathon Champion",
      date: "2024",
      content: "Secured 1st place in competitive AI hackathon by architecting and prototyping an end-to-end intelligent pipeline integrating multi-agent LLM reasoning with automated webhook dispatch.",
      category: "Hackathon & Competition",
      icon: Trophy,
      relatedIds: [2, 3],
      status: "completed",
      energy: 98,
    },
    {
      id: 2,
      title: "IIT Roorkee AI Speaker",
      date: "2024",
      content: "Selected to deliver an honored presentation on emerging Generative AI models and autonomous operational workflows before faculty and peers at prestigious IIT Roorkee.",
      category: "Keynote & Speech",
      icon: Presentation,
      relatedIds: [1, 4],
      status: "completed",
      energy: 95,
    },
    {
      id: 3,
      title: "Autonomous n8n Pipeline",
      date: "2024",
      content: "Architected 5-stage automated pipeline connecting webhooks, Claude 3.5 structured JSON parsing, conditional logic routing, and CRM updates with zero human intervention.",
      category: "Engineering Concept",
      icon: Cpu,
      relatedIds: [1, 5],
      status: "completed",
      energy: 92,
    },
    {
      id: 4,
      title: "Power BI Certification",
      date: "2023",
      content: "Completed OfficeMaster intensive professional workshop mastering dynamic business analytics dashboards, DAX formulas, data cleaning, and KPI visual reporting.",
      category: "Professional Credential",
      icon: Award,
      relatedIds: [2, 6],
      status: "completed",
      energy: 88,
    },
    {
      id: 5,
      title: "NEXA AI Assistant Engine",
      date: "2024",
      content: "Designed and built full-stack conversational intelligence concept with voice interactions, system prompt personas, session context memory, and responsive web canvas.",
      category: "Product Prototype",
      icon: Sparkles,
      relatedIds: [1, 3],
      status: "completed",
      energy: 91,
    },
    {
      id: 6,
      title: "Customer Support SLA Excellence",
      date: "2023 - Present",
      content: "Managed end-to-end user tickets, diagnosed technical root causes, documented reproducible escalation bugs, and maintained a 99.2%+ verified customer satisfaction score.",
      category: "Operations Mastery",
      icon: CheckCircle2,
      relatedIds: [3, 4],
      status: "completed",
      energy: 89,
    },
  ];

  const achievementIcons = [
    <Trophy key="1" className="w-8 h-8 text-amber-400" />,
    <Presentation key="2" className="w-8 h-8 text-yellow-400" />,
    <Award key="3" className="w-8 h-8 text-amber-300" />,
  ];

  return (
    <section id="achievements" className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406]">
      {/* Background Ambience — Gold Glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 rounded-none blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/06] MILESTONES & HONORS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            ACHIEVEMENTS & RECOGNITION
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl font-normal">
            Validated milestones showcasing problem solving, rapid prototyping, public speaking, and operational rigor.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        {/* View Switcher: Radial Orbital Timeline vs Sharp Grid */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setViewMode("orbital")}
            className={`px-5 py-2.5 rounded-none text-xs font-mono tracking-wider transition-all border flex items-center gap-2 cursor-pointer ${
              viewMode === "orbital"
                ? "bg-amber-400 text-black border-amber-300 font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "bg-[#0a0a0d] text-neutral-300 border-amber-500/20 hover:text-amber-200 hover:border-amber-400/50"
            }`}
          >
            <Orbit className="w-4 h-4" />
            <span>RADIAL ORBITAL TIMELINE</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-5 py-2.5 rounded-none text-xs font-mono tracking-wider transition-all border flex items-center gap-2 cursor-pointer ${
              viewMode === "grid"
                ? "bg-amber-400 text-black border-amber-300 font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "bg-[#0a0a0d] text-neutral-300 border-amber-500/20 hover:text-amber-200 hover:border-amber-400/50"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>VERIFIED MILESTONES GRID</span>
          </button>
        </div>

        {/* Mode 1: Radial Orbital Timeline */}
        {viewMode === "orbital" && (
          <div className="w-full mb-12">
            <div className="relative border border-amber-500/30 bg-[#020203] shadow-2xl overflow-hidden rounded-none">
              {/* Header badge inside orbital container */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0e]/90 border border-amber-500/40 backdrop-blur-md">
                <span className="w-2 h-2 bg-amber-400 rounded-none animate-ping" />
                <span className="text-[11px] font-mono text-amber-300 tracking-wider">
                  CELESTIAL RECOGNITION ORBIT · CLICK NODES TO EXPAND
                </span>
              </div>

              {/* The Radial Orbital Timeline Component */}
              <RadialOrbitalTimeline timelineData={timelineItems} />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-400 px-2 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-amber-400/90">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto-orbiting celestial clockwork · Select node to center camera and reveal verified dossiers</span>
              </span>
              <span>6 VERIFIED MILESTONES · 100% AUDITABLE</span>
            </div>
          </div>
        )}

        {/* Mode 2: Sharp Black & Gold Milestone Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${viewMode === "orbital" ? "mt-8" : ""}`}>
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 sm:p-8 rounded-none bespoke-card transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 border border-amber-500/25 hover:border-amber-400"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-none bg-amber-500/10 border border-amber-500/30 shadow-sm group-hover:scale-105 transition-transform">
                    {achievementIcons[idx]}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-none bespoke-pill text-amber-300 border-amber-500/40 font-semibold tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 tracking-tight">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-amber-400/80 block mb-3">
                  {item.subtitle}
                </span>

                <p className="text-xs sm:text-[13.5px] text-neutral-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center gap-2 text-xs font-mono text-amber-400">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span className="tracking-wide">Verified Milestone · Fully Auditable</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
