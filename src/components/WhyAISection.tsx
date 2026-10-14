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
    <section id="why-ai" className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-none blur-[150px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/08] VISION & PHILOSOPHY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            WHY AI?
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        {/* Mission Statement Quote Box */}
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="p-5 sm:p-10 rounded-none bespoke-card shadow-2xl relative overflow-hidden text-center border-amber-500/35">
            <div className="text-amber-400/15 text-5xl sm:text-6xl font-serif absolute top-2 sm:top-3 left-4 sm:left-6 select-none pointer-events-none">
              “
            </div>
            <p className="font-display text-base sm:text-xl md:text-2xl text-neutral-100 font-medium leading-relaxed mb-4 relative z-10 tracking-tight break-words">
              "{WHY_AI_CONTENT.quote}"
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-300 mt-4 flex-wrap">
              <span className="w-1.5 h-1.5 rounded-none bg-amber-400" />
              <span>Naman Srivastava • Practical AI & Autonomous Pipelines</span>
            </div>
          </div>
        </div>

        {/* Animated Continuous AI Workflow: Problem → AI → Automation → Solution */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
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
                  className={`p-5 sm:p-6 rounded-none bespoke-card transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                    isActive
                      ? "!border-amber-400 !shadow-[0_0_25px_rgba(212,175,55,0.35)] -translate-y-1 sm:-translate-y-1.5"
                      : "hover:border-amber-500/40"
                  }`}
                >
                  {/* Top glowing bar when active */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <span className="bespoke-pill text-xs font-mono font-bold px-2.5 py-1 rounded-none text-amber-300 border-amber-500/30">
                        {item.step}
                      </span>
                      {isActive ? (
                        <span className="w-2.5 h-2.5 rounded-none bg-amber-400 animate-ping" />
                      ) : (
                        <span className="w-2 h-2 rounded-none bg-neutral-700" />
                      )}
                    </div>

                    <h4 className="font-display text-base sm:text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors tracking-tight">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono text-amber-400/90 font-medium block mb-2.5 sm:mb-3">
                      {item.subtitle}
                    </span>

                    <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{isActive ? "Active Phase" : "Stage " + item.step}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-amber-400 translate-x-1" : "text-neutral-600"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-World Concrete Automation Workflow Example */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-none bg-[#08080a] border border-amber-500/30 text-xs text-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-none bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Zap className="w-4 h-4" />
              </div>
              <span>
                <strong className="text-white">Applied Example:</strong> Inbound customer ticket → LLM classifies urgency & extracts order ID → n8n webhook checks backend DB → Auto-drafts verified update for agent approval.
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-300 whitespace-nowrap bg-black px-3 py-1.5 rounded-none border border-amber-500/40 font-bold">
              Zero Guesswork • High ROI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
