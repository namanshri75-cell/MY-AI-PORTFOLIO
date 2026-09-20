import React, { useState, useEffect } from "react";
import { WHY_AI_CONTENT, PERSONAL_INFO } from "../data/portfolioData";
import { Sparkles, ArrowRight, Zap, Bot, Cpu, CheckCircle2, ChevronRight } from "lucide-react";

export const WhyAISection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycling continuous workflow animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WHY_AI_CONTENT.steps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="why-ai" className="relative py-20 lg:py-28 w-full border-t border-slate-900 bg-[#07090e]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>VISION & PHILOSOPHY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            WHY AI?
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* Mission Statement Quote Box */}
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bespoke-card shadow-2xl relative overflow-hidden text-center !border-cyan-500/30">
            <div className="text-cyan-400/20 text-5xl sm:text-6xl font-serif absolute top-2 sm:top-3 left-4 sm:left-6 select-none pointer-events-none">
              “
            </div>
            <p className="font-display text-base sm:text-xl md:text-2xl text-slate-100 font-medium leading-relaxed mb-4 relative z-10 tracking-tight break-words">
              "{WHY_AI_CONTENT.quote}"
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 mt-4 flex-wrap">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Naman Srivastava • AI & Automation Specialist</span>
            </div>
          </div>
        </div>

        {/* Animated Continuous AI Workflow: Problem → AI → Automation → Solution */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              CONTINUOUS WORKFLOW PARADIGM
            </span>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-white tracking-tight">
              Problem → AI → Automation → Solution
            </h3>
          </div>

          {/* Workflow Stage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 relative">
            {WHY_AI_CONTENT.steps.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl bespoke-card transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                    isActive
                      ? "!border-cyan-400/80 !shadow-[0_0_25px_rgba(0,255,198,0.2)] -translate-y-1 sm:-translate-y-1.5"
                      : "hover:border-white/20"
                  }`}
                >
                  {/* Top glowing bar when active */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-teal-400" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <span className="bespoke-pill text-xs font-mono font-bold px-2.5 py-1 rounded-lg text-slate-300">
                        {item.step}
                      </span>
                      {isActive ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-700" />
                      )}
                    </div>

                    <h4 className="font-display text-base sm:text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors tracking-tight">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono text-cyan-400/90 font-medium block mb-2.5 sm:mb-3">
                      {item.subtitle}
                    </span>

                    <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{isActive ? "Active Phase" : "Stage " + item.step}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-cyan-400 translate-x-1" : "text-slate-600"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-World Concrete Automation Workflow Example */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Zap className="w-4 h-4" />
              </div>
              <span>
                <strong className="text-white">Applied Example:</strong> Inbound customer support ticket → LLM classifies urgency & extracts order ID → n8n webhook checks backend DB → Auto-drafts verified update for agent approval.
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 whitespace-nowrap bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              Zero Guesswork • High ROI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
