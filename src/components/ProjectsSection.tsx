import React, { useState, useEffect } from "react";
import { PROJECTS } from "../data/portfolioData";
import { Project, ProjectMilestone } from "../types";
import { 
  Sparkles, 
  ExternalLink, 
  Github, 
  Layers, 
  ArrowUpRight, 
  Play, 
  CheckCircle2, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Terminal, 
  X, 
  Bot, 
  Volume2, 
  VolumeX, 
  Square, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Cpu, 
  Activity, 
  RotateCw 
} from "lucide-react";
import { nexaVoice } from "../utils/nexaVoice";

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [projectViews, setProjectViews] = useState<Record<string, "overview" | "timeline">>({
    nexa: "overview",
    "excel-dashboard": "timeline", // start with timeline on second card to show off feature immediately
    "ai-social": "overview",
    "local-ai": "timeline",
  });
  const [activeMilestones, setActiveMilestones] = useState<Record<string, number>>({
    nexa: 0,
    "excel-dashboard": 0,
    "ai-social": 0,
    "local-ai": 0,
  });
  const [simulatingStep, setSimulatingStep] = useState<string | null>(null);

  const [currentlySpeakingIndex, setCurrentlySpeakingIndex] = useState<number | null>(null);
  const [voiceAutoPlay, setVoiceAutoPlay] = useState<boolean>(true);
  const [nexaMessages, setNexaMessages] = useState<Array<{ role: "user" | "nexa"; text: string }>>([
    {
      role: "nexa",
      text: "Welcome to the NEXA interactive demo screen! I am an AI assistant prototype built by Naman Srivastava. Click any inquiry below to explore my reasoning and listen to my spoken answers.",
    },
  ]);

  // Clean up speech synthesis on unmount or modal close
  useEffect(() => {
    return () => {
      nexaVoice.stop();
    };
  }, [activeModalProject]);

  const speakText = (text: string, index: number) => {
    if (currentlySpeakingIndex === index) {
      nexaVoice.stop();
      setCurrentlySpeakingIndex(null);
      return;
    }

    setCurrentlySpeakingIndex(index);
    nexaVoice.speak(text, index, {
      onStart: () => setCurrentlySpeakingIndex(index),
      onEnd: () => setCurrentlySpeakingIndex(null),
      onError: () => setCurrentlySpeakingIndex(null),
    });
  };

  const handleSendNexa = (question: string) => {
    if (!question.trim()) return;

    const newMsgs = [...nexaMessages, { role: "user" as const, text: question }];
    setNexaMessages(newMsgs);

    setTimeout(() => {
      let reply =
        "I analyzed that request using workflow automation concepts. By connecting an AI model to an event webhook and business APIs, we can automate this task seamlessly.";

      const q = question.toLowerCase();
      if (q.includes("why hire") || (q.includes("hire") && q.includes("naman"))) {
        reply =
          "Why hire Naman: He bridges the critical gap between business administration and hands-on AI engineering. With a BBA degree from BBD University, battle-tested technical support experience at Clickretina resolving high-volume issues under SLAs, a Hackathon Championship win, and keynote speaking at IIT Roorkee, Naman delivers real ROI by converting tedious manual bottlenecks into automated, high-speed AI workflows.";
      } else if (q.includes("who is naman") || q.includes("who is he")) {
        reply =
          "Who is Naman: Naman Srivastava is a BBA graduate turned AI operations builder and automation engineer. He designs autonomous workflows, prototypes generative AI tools, and implements robust technical solutions with tools like n8n, LLM APIs, and webhooks to solve real business challenges.";
      } else if (q.includes("skills") || q.includes("core ai")) {
        reply =
          "Naman's core technical capabilities span Generative AI integration, workflow automation with n8n & webhooks, technical troubleshooting, API development, rapid prototyping, and translating business processes into automated data pipelines.";
      } else if (q.includes("support") || q.includes("ticket")) {
        reply =
          "In technical support operations, AI auto-triages ticket urgency, extracts order identifiers from incoming customer messages, drafts high-empathy responses, and accelerates resolution times while elevating CSAT scores.";
      } else if (q.includes("excel") || q.includes("dashboard")) {
        reply =
          "The AI Excel Dashboard concept ingests multi-sheet CSV or workbook data, parses schemas, calculates variance metrics, and automatically generates interactive executive KPI visual reports.";
      } else if (q.includes("bba") || q.includes("education") || q.includes("degree")) {
        reply =
          "Naman holds a Bachelor of Business Administration (BBA) degree from BBD University, Lucknow. This academic foundation grounds his technical projects in organizational strategy, profitability, and cost-effective operations.";
      }

      setNexaMessages((prev) => {
        const updated = [...prev, { role: "nexa" as const, text: reply }];
        if (voiceAutoPlay) {
          setTimeout(() => speakText(reply, updated.length - 1), 100);
        }
        return updated;
      });
    }, 450);
  };

  const handleSimulateMilestone = (projectId: string, stepIdx: number) => {
    const key = `${projectId}-${stepIdx}`;
    setSimulatingStep(key);
    setTimeout(() => {
      setSimulatingStep(null);
    }, 900);
  };

  const toggleProjectView = (projectId: string, view: "overview" | "timeline") => {
    setProjectViews((prev) => ({ ...prev, [projectId]: view }));
  };

  const setMilestone = (projectId: string, idx: number) => {
    setActiveMilestones((prev) => ({ ...prev, [projectId]: idx }));
  };

  return (
    <section id="projects" className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 rounded-none blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/03] MODULAR PROJECT CELLS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            FEATURED PROJECTS & AUTOMATION TIMELINES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl font-normal font-sans">
            Hands-on explorations turning AI tools and automation into practical digital experiences with verified milestone progressions.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 2xl:gap-10">
          {PROJECTS.map((project, idx) => {
            const currentView = projectViews[project.id] || "overview";
            const milestones = project.milestones || [];
            const activeStepIdx = activeMilestones[project.id] ?? 0;
            const currentMilestone = milestones[activeStepIdx] || milestones[0];
            const isSimulating = simulatingStep === `${project.id}-${activeStepIdx}`;

            return (
              <div
                key={project.id}
                className="p-5 sm:p-7 rounded-none bespoke-card transition-all duration-300 flex flex-col justify-between group shadow-2xl border border-amber-500/25 hover:border-amber-400/80 bg-[#07070a]"
              >
                <div>
                  {/* Top Bar: Cell Index + Category + Mode Switcher */}
                  <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-none bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                        [CELL/0{idx + 1}]
                      </span>
                      <span className="text-xs font-mono text-neutral-300 font-semibold tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* View Switcher: Overview vs Horizontal Timeline */}
                    <div className="flex items-center border border-amber-500/30 bg-black/60 p-0.5">
                      <button
                        type="button"
                        onClick={() => toggleProjectView(project.id, "overview")}
                        className={`px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                          currentView === "overview"
                            ? "bg-amber-400 text-black font-bold shadow-sm"
                            : "text-neutral-400 hover:text-amber-300"
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleProjectView(project.id, "timeline")}
                        className={`px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                          currentView === "timeline"
                            ? "bg-amber-400 text-black font-bold shadow-sm"
                            : "text-neutral-400 hover:text-amber-300"
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>Timeline ({milestones.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] font-normal text-neutral-300 mt-1 leading-relaxed font-sans">
                      "{project.tagline || project.description}"
                    </p>
                  </div>

                  {/* VIEW 1: Overview Mode */}
                  {currentView === "overview" && (
                    <div className="space-y-3.5 mb-5 animate-in fade-in duration-200">
                      {/* Problem Explored */}
                      <div className="p-3.5 sm:p-4 rounded-none bespoke-inset border-amber-500/15">
                        <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                          Problem Explored
                        </span>
                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                          {project.problemExplored}
                        </p>
                      </div>

                      {/* My Contribution */}
                      <div className="p-3.5 sm:p-4 rounded-none bespoke-inset border-amber-500/15">
                        <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-400/90 font-bold block mb-1">
                          Naman's Automation Contribution
                        </span>
                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                          {project.myContribution}
                        </p>
                      </div>

                      {/* Mini Horizontal Milestone Preview Bar */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-[10.5px] font-mono text-neutral-400 mb-1.5">
                          <span className="uppercase text-amber-400/90 font-bold">Automation Milestones Reached</span>
                          <button
                            type="button"
                            onClick={() => toggleProjectView(project.id, "timeline")}
                            className="text-amber-300 hover:text-white underline cursor-pointer"
                          >
                            Inspect All 5 Stages →
                          </button>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {milestones.map((m, mIdx) => (
                            <button
                              key={m.step}
                              type="button"
                              onClick={() => {
                                setMilestone(project.id, mIdx);
                                toggleProjectView(project.id, "timeline");
                              }}
                              className="p-1.5 bg-[#0e0e13] border border-amber-500/25 hover:border-amber-400 text-left transition-all group/node cursor-pointer"
                              title={`Step ${m.step}: ${m.title}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-mono text-amber-400 font-bold">
                                  S{m.step}
                                </span>
                                <Check className="w-2.5 h-2.5 text-amber-300" />
                              </div>
                              <span className="text-[9.5px] text-neutral-300 truncate block mt-0.5">
                                {m.phase}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tech Pills */}
                      <div className="pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                          Technologies & Concepts
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((t) => (
                            <span
                              key={t}
                              className="bespoke-pill px-2.5 py-0.5 rounded-none text-neutral-300 text-[11px] border-amber-500/20 bg-amber-500/5 font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VIEW 2: Horizontal Timeline View */}
                  {currentView === "timeline" && (
                    <div className="space-y-4 mb-5 animate-in fade-in duration-200">
                      {/* Interactive Horizontal Timeline Track */}
                      <div className="p-3 bg-[#0a0a0e] border border-amber-500/30 relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10.5px] font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Activity className="w-3 h-3 text-amber-400" />
                            <span>Horizontal Automation Milestones</span>
                          </span>
                          <span className="text-[10.5px] font-mono text-neutral-400">
                            Node {activeStepIdx + 1} of {milestones.length}
                          </span>
                        </div>

                        {/* Horizontal Timeline Track Bar with Nodes */}
                        <div className="relative py-2 px-1">
                          {/* Connecting Background Line */}
                          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-amber-950/80 -translate-y-1/2 z-0" />
                          {/* Active Progress Fill Line */}
                          <div
                            className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 -translate-y-1/2 z-0 transition-all duration-300"
                            style={{
                              width: `${(activeStepIdx / Math.max(1, milestones.length - 1)) * 92}%`,
                            }}
                          />

                          {/* Horizontal Milestone Nodes */}
                          <div className="relative z-10 flex items-center justify-between">
                            {milestones.map((m, mIdx) => {
                              const isActive = activeStepIdx === mIdx;
                              const isPast = mIdx <= activeStepIdx;

                              return (
                                <button
                                  key={m.step}
                                  type="button"
                                  onClick={() => setMilestone(project.id, mIdx)}
                                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                                    isActive ? "scale-105" : "hover:scale-102"
                                  }`}
                                  aria-label={`Select Milestone ${m.step}: ${m.title}`}
                                >
                                  {/* Milestone Node Badge */}
                                  <div
                                    className={`w-7 h-7 flex items-center justify-center font-mono text-[11px] font-bold border transition-all ${
                                      isActive
                                        ? "bg-amber-400 text-black border-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                                        : isPast
                                        ? "bg-[#141208] text-amber-300 border-amber-500/50"
                                        : "bg-black text-neutral-500 border-neutral-700"
                                    }`}
                                  >
                                    {m.step}
                                  </div>
                                  <span
                                    className={`text-[9.5px] font-mono uppercase tracking-wider hidden sm:block max-w-[64px] truncate text-center ${
                                      isActive ? "text-amber-300 font-bold" : "text-neutral-400"
                                    }`}
                                  >
                                    {m.phase}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Active Milestone Deep Dive Card */}
                      {currentMilestone && (
                        <div className="p-4 bg-[#0d0d12] border border-amber-500/35 relative shadow-lg">
                          {/* Milestone Step Header */}
                          <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-400 text-black font-bold uppercase">
                                  STAGE {currentMilestone.step} · {currentMilestone.phase}
                                </span>
                                <span className="text-[10.5px] font-mono text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>{currentMilestone.status.toUpperCase()}</span>
                                </span>
                              </div>
                              <h4 className="text-base font-display font-bold text-white mt-1.5">
                                {currentMilestone.title}
                              </h4>
                            </div>

                            {/* Performance Metric Badge */}
                            <div className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold text-right">
                              <span className="text-[9px] text-neutral-400 block uppercase">Verified Metric</span>
                              {currentMilestone.metrics}
                            </div>
                          </div>

                          {/* Technical Description */}
                          <p className="text-xs text-neutral-300 font-sans leading-relaxed mb-3">
                            {currentMilestone.description}
                          </p>

                          {/* Automation Outcome Banner */}
                          <div className="p-2.5 bg-black/60 border-l-2 border-amber-400 text-xs font-sans text-neutral-200 mb-3 flex items-start gap-2">
                            <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-400 font-bold flex-shrink-0">
                              Automation Outcome:
                            </span>
                            <span>{currentMilestone.automationOutcome}</span>
                          </div>

                          {/* Tools Used Pills */}
                          <div className="flex items-center justify-between gap-2 flex-wrap pt-1 border-t border-amber-500/15">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {currentMilestone.toolsUsed.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/25"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            {/* Simulate Step Execution Button */}
                            <button
                              type="button"
                              onClick={() => handleSimulateMilestone(project.id, activeStepIdx)}
                              disabled={isSimulating}
                              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                            >
                              {isSimulating ? (
                                <>
                                  <RotateCw className="w-3 h-3 animate-spin text-amber-400" />
                                  <span>Simulating Step...</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-2.5 h-2.5 fill-amber-300" />
                                  <span>Simulate Step {currentMilestone.step}</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Previous / Next Milestone Step Buttons */}
                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-amber-500/15 text-xs font-mono">
                            <button
                              type="button"
                              disabled={activeStepIdx === 0}
                              onClick={() => setMilestone(project.id, Math.max(0, activeStepIdx - 1))}
                              className="px-2.5 py-1 text-neutral-400 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Prev Stage</span>
                            </button>

                            <button
                              type="button"
                              disabled={activeStepIdx === milestones.length - 1}
                              onClick={() => setMilestone(project.id, Math.min(milestones.length - 1, activeStepIdx + 1))}
                              className="px-2.5 py-1 text-neutral-400 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>Next Stage</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons (Bottom Bar) */}
                <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded-none text-xs font-mono font-bold bg-amber-400 text-black hover:bg-amber-300 transition-all flex items-center gap-2 cursor-pointer shadow-sm tracking-wide active:scale-95 border border-amber-300/40"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>Interactive Concept Demo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleProjectView(project.id, currentView === "timeline" ? "overview" : "timeline")}
                      className="px-3 py-2.5 min-h-[44px] rounded-none text-xs font-mono font-semibold bg-[#111116] hover:bg-amber-500/15 text-neutral-300 hover:text-amber-300 border border-amber-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentView === "timeline" ? "View Overview" : "View Timeline"}</span>
                    </button>
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none bg-[#09090c] text-neutral-400 hover:text-amber-300 border border-amber-500/20 hover:border-amber-400 transition-all active:scale-95"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Concept Demo Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-none bespoke-card p-4 sm:p-7 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-amber-500/40 bg-[#09090d]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 sm:pb-4 mb-4 sm:mb-5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                  {activeModalProject.interactiveType === "nexa" && <Bot className="w-5 h-5 text-amber-400" />}
                  {activeModalProject.interactiveType === "excel" && <BarChart3 className="w-5 h-5 text-amber-400" />}
                  {activeModalProject.interactiveType === "social" && <Users className="w-5 h-5 text-amber-400" />}
                  {activeModalProject.interactiveType === "local_ai" && <Terminal className="w-5 h-5 text-amber-400" />}
                </div>
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-white truncate">{activeModalProject.title}</h4>
                  <span className="text-[11px] sm:text-xs font-mono text-amber-400 block">Interactive Concept Simulator</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors active:scale-95 cursor-pointer"
                aria-label="Close interactive demo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Interactive Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
              {/* Demo Type 1: NEXA Assistant Conversation */}
              {activeModalProject.interactiveType === "nexa" && (
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Assistant Status & TTS Controls */}
                  <div className="p-3.5 bg-black/70 border border-amber-500/30 text-xs text-neutral-300 font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 overflow-hidden border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)] flex-shrink-0 bg-black">
                        <img src="./nexa_avatar.svg" alt="NEXA Assistant Thumbnail" className="w-full h-full object-cover" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 border border-black animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-amber-300 tracking-wide font-display">NEXA AI Assistant</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                            ONLINE TTS
                          </span>
                        </div>
                        <span className="text-neutral-400 text-[11px] block mt-0.5 font-sans">
                          Tap any question or speaker icon to hear NEXA speak with synchronized voice synthesis.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (currentlySpeakingIndex !== null) {
                            nexaVoice.stop();
                            setCurrentlySpeakingIndex(null);
                          }
                          setVoiceAutoPlay(!voiceAutoPlay);
                        }}
                        className={`px-3 py-1.5 text-[11px] font-semibold border flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                          voiceAutoPlay
                            ? "bg-amber-500/25 text-amber-300 border-amber-500/60 shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                            : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white"
                        }`}
                        title={voiceAutoPlay ? "Voice TTS auto-playback is ON (Click to mute)" : "Voice TTS is muted (Click to enable)"}
                      >
                        {voiceAutoPlay ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>{voiceAutoPlay ? "Auto-TTS: Active" : "TTS: Muted"}</span>
                      </button>

                      {currentlySpeakingIndex !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            nexaVoice.stop();
                            setCurrentlySpeakingIndex(null);
                          }}
                          className="px-2.5 py-1.5 text-[11px] bg-red-500/25 text-red-200 border border-red-500/50 hover:bg-red-500/35 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        >
                          <Square className="w-3 h-3 fill-red-400" />
                          <span>Stop</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="h-56 sm:h-64 overflow-y-auto space-y-3.5 p-3.5 sm:p-4 bg-black/90 border border-amber-500/20 font-sans">
                    {nexaMessages.map((m, i) => {
                      const isSpeakingThis = currentlySpeakingIndex === i;
                      const isNexa = m.role === "nexa";
                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-2.5 ${isNexa ? "justify-start" : "justify-end"}`}
                        >
                          {isNexa && (
                            <div className="w-7 h-7 bg-amber-400 text-black font-bold flex items-center justify-center font-mono text-xs flex-shrink-0">
                              N
                            </div>
                          )}
                          <div
                            className={`p-3 max-w-[85%] text-xs leading-relaxed border ${
                              isNexa
                                ? "bg-[#111116] border-amber-500/30 text-neutral-200"
                                : "bg-amber-400/20 border-amber-400/40 text-amber-200"
                            }`}
                          >
                            <p>{m.text}</p>
                            {isNexa && (
                              <button
                                type="button"
                                onClick={() => speakText(m.text, i)}
                                className={`mt-2 flex items-center gap-1 font-mono text-[10px] cursor-pointer ${
                                  isSpeakingThis ? "text-amber-400 animate-pulse" : "text-neutral-400 hover:text-amber-300"
                                }`}
                              >
                                {isSpeakingThis ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                                <span>{isSpeakingThis ? "Speaking now..." : "Listen to audio"}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick question prompts */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Suggested Recruiter Inquiries
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Why hire Naman?",
                        "Who is Naman?",
                        "What are Naman's core AI skills?",
                        "How can AI improve technical support?",
                        "What is the AI Excel Dashboard concept?",
                      ].map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => handleSendNexa(q)}
                          className="px-2.5 py-1 text-[11px] font-sans bg-[#111116] hover:bg-amber-400 hover:text-black border border-amber-500/30 text-amber-200 transition-all cursor-pointer active:scale-95"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Type 2: Excel Dashboard Concept */}
              {activeModalProject.interactiveType === "excel" && (
                <div className="space-y-4">
                  <div className="p-3 bg-black/60 border border-amber-500/30 text-xs text-neutral-300 font-sans">
                    <span className="font-bold text-amber-300 font-mono">AUTOMATED PIPELINE:</span> Simulates the ingestion of a 10,000-row spreadsheet, schema classification, and instantaneous dashboard rendering.
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-center">
                    <div className="p-3 bg-[#0d0d12] border border-amber-500/20">
                      <span className="text-[10px] text-neutral-400 block">Ingested Rows</span>
                      <span className="text-xl font-bold text-amber-300">10,480</span>
                      <span className="text-[10px] text-neutral-500 block mt-1">Multi-Sheet CSV</span>
                    </div>
                    <div className="p-3 bg-[#0d0d12] border border-amber-500/20">
                      <span className="text-[10px] text-neutral-400 block">Synthesis Time</span>
                      <span className="text-xl font-bold text-amber-400">3.2 sec</span>
                      <span className="text-[10px] text-neutral-500 block mt-1">Automated Pipeline</span>
                    </div>
                  </div>

                  <div className="p-4 bg-black border border-amber-500/25 space-y-3 font-sans">
                    <span className="text-xs font-bold text-white block font-mono uppercase tracking-wider">
                      Simulated Generated Executive KPI Chart
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-neutral-300 font-mono">
                        <span>Workflow Cycle Time</span>
                        <span className="text-amber-400 font-bold">-42% Manual Delay</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-900 overflow-hidden">
                        <div className="h-full bg-amber-400 w-[78%]" />
                      </div>

                      <div className="flex items-center justify-between text-neutral-300 font-mono pt-2">
                        <span>Data Categorization Accuracy</span>
                        <span className="text-emerald-400 font-bold">98.4% Match</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-900 overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[94%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Type 3: AI Social Media Concept */}
              {activeModalProject.interactiveType === "social" && (
                <div className="space-y-4 font-sans">
                  <div className="p-3 bg-black/60 border border-amber-500/30 text-xs text-neutral-300">
                    <span className="font-bold text-amber-300 font-mono">Interest Vector Matching:</span> Rather than superficial follower counts, user profiles are scored on shared curiosity vectors (AI Automation, Technical Ops, Business Strategy).
                  </div>

                  <div className="p-4 bg-black border border-amber-500/25 space-y-3">
                    <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                      <span className="text-white font-semibold">User Profile A: BBA Graduate + AI Exploration</span>
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold border border-amber-500/40">
                        89% Compatibility
                      </span>
                    </div>
                    <div className="text-xs text-neutral-300">
                      Shared vectors: "Automation pipelines", "Practical LLM prompt engineering", "Business workflow optimization".
                    </div>
                    <div className="p-2.5 bg-[#0e0e14] border border-amber-500/20 text-[11px] font-mono text-neutral-300">
                      Recommendation: Initiated collaborative project workspace for mutual learning.
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Type 4: Local AI & FastAPI Integration */}
              {activeModalProject.interactiveType === "local_ai" && (
                <div className="space-y-4 font-sans">
                  <div className="p-3 bg-black/60 border border-amber-500/30 text-xs text-neutral-300">
                    <span className="font-bold text-amber-300 font-mono">Local Privacy Architecture:</span> Evaluated running lightweight open models (e.g. Llama 3 / Mistral) locally via Ollama with REST routing via FastAPI endpoints.
                  </div>

                  <div className="p-4 bg-black border border-amber-500/25 font-mono text-[11px] sm:text-xs text-neutral-300 space-y-2 overflow-x-auto">
                    <div className="text-neutral-500">// Simulated FastAPI Endpoint Route</div>
                    <div className="text-amber-400">POST /api/v1/local-inference HTTP/1.1</div>
                    <div className="text-neutral-400">{"{"}</div>
                    <div className="pl-4 text-emerald-300">"model": "ollama/llama-3-8b",</div>
                    <div className="pl-4 text-emerald-300">"context": "Customer support ticket classification",</div>
                    <div className="pl-4 text-emerald-300">"temperature": 0.2</div>
                    <div className="text-neutral-400">{"}"}</div>
                    <div className="pt-2 text-neutral-300">
                      Status: <span className="text-emerald-400 font-bold">200 OK</span> • Latency: <span className="text-amber-300">210ms (Zero Cloud Egress)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-neutral-400 font-sans">
              <span className="text-center sm:text-left text-[11px] sm:text-xs">
                Factual concept exploration for workflow evaluation
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 min-h-[44px] bg-[#111116] hover:bg-neutral-800 text-neutral-200 hover:text-white border border-amber-500/25 transition-colors flex items-center justify-center gap-2 text-xs font-mono font-medium"
                    title="View GitHub Repository"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] bg-amber-400 text-black hover:bg-amber-300 transition-colors flex items-center justify-center font-mono font-bold text-xs cursor-pointer active:scale-95"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
