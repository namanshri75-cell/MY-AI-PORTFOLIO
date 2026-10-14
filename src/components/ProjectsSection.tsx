import React, { useState, useEffect } from "react";
import { PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import { Sparkles, ExternalLink, Github, Layers, ArrowUpRight, Play, CheckCircle2, MessageSquare, BarChart3, Users, Terminal, X, Bot, Volume2, VolumeX, Square, Sparkle } from "lucide-react";
import { nexaVoice } from "../utils/nexaVoice";

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
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
          // Speak the new message automatically
          setTimeout(() => speakText(reply, updated.length - 1), 100);
        }
        return updated;
      });
    }, 450);
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
            FEATURED PROJECTS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl font-normal">
            Hands-on explorations turning AI tools and automation into practical digital experiences.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 2xl:gap-10">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="p-5 sm:p-8 rounded-none bespoke-card transition-all duration-300 flex flex-col justify-between group shadow-xl border border-amber-500/25 hover:border-amber-400"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-none bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                      [CELL/0{idx + 1}]
                    </span>
                    <span className="text-xs font-mono text-neutral-300 font-semibold tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="bespoke-pill px-2.5 py-1 rounded-none text-amber-300 border-amber-500/30 text-[11px] sm:text-xs">
                    {project.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-[14.5px] font-normal text-neutral-300 mb-4 leading-relaxed font-sans">
                  "{project.description}"
                </p>

                {/* Problem Explored */}
                <div className="p-3.5 sm:p-4 rounded-none bespoke-inset mb-3 border-amber-500/15">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    Problem Explored
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {project.problemExplored}
                  </p>
                </div>

                {/* My Contribution */}
                <div className="p-3.5 sm:p-4 rounded-none bespoke-inset mb-5 border-amber-500/15">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-400/80 font-bold block mb-1">
                    Naman's Contribution
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {project.myContribution}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                    Technologies & Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="bespoke-pill px-2.5 py-1 rounded-none text-neutral-300 text-[11px] sm:text-xs border-amber-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded-none text-xs font-mono font-bold bg-amber-400 text-black hover:bg-amber-300 transition-all flex items-center gap-2 cursor-pointer shadow-sm tracking-wide active:scale-95 border border-amber-300/40"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Interactive Concept Demo</span>
                </button>

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
          ))}
        </div>
      </div>

      {/* Interactive Concept Demo Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bespoke-card p-4 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col !border-white/20">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 mb-4 sm:mb-5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex-shrink-0">
                  {activeModalProject.interactiveType === "nexa" && <Bot className="w-5 h-5" />}
                  {activeModalProject.interactiveType === "excel" && <BarChart3 className="w-5 h-5" />}
                  {activeModalProject.interactiveType === "social" && <Users className="w-5 h-5" />}
                  {activeModalProject.interactiveType === "local_ai" && <Terminal className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-white truncate">{activeModalProject.title}</h4>
                  <span className="text-[11px] sm:text-xs font-mono text-cyan-400 block">Interactive Concept Simulator</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
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
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-300 font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex-shrink-0 bg-slate-950 group">
                        <img src="./nexa_avatar.svg" alt="NEXA Assistant Thumbnail" className="w-full h-full object-cover" />
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-cyan-300 tracking-wide">NEXA AI Assistant</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
                            ONLINE TTS
                          </span>
                        </div>
                        <span className="text-slate-400 text-[11px] block mt-0.5">
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
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 transition-all shadow-sm ${
                          voiceAutoPlay
                            ? "bg-cyan-500/25 text-cyan-300 border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                        }`}
                        title={voiceAutoPlay ? "Voice TTS auto-playback is ON (Click to mute)" : "Voice TTS is muted (Click to enable)"}
                      >
                        {voiceAutoPlay ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>{voiceAutoPlay ? "Auto-TTS: Active" : "TTS: Muted"}</span>
                      </button>

                      {currentlySpeakingIndex !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            nexaVoice.stop();
                            setCurrentlySpeakingIndex(null);
                          }}
                          className="px-2.5 py-1.5 rounded-lg text-[11px] bg-red-500/25 text-red-200 border border-red-500/50 hover:bg-red-500/35 flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Square className="w-3 h-3 fill-red-400" />
                          <span>Stop</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="h-56 sm:h-64 overflow-y-auto space-y-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
                    {nexaMessages.map((m, i) => {
                      const isSpeakingThis = currentlySpeakingIndex === i;
                      const isNexa = m.role === "nexa";
                      const isWelcomeMessage =
                        i === 0 &&
                        m.text.includes("Welcome to the NEXA interactive demo screen");

                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-2.5 ${isNexa ? "justify-start" : "justify-end"}`}
                        >
                          {/* NEXA Avatar Thumbnail */}
                          {isNexa && (
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40 flex-shrink-0 shadow-sm bg-slate-900 mt-0.5">
                              <img src="./nexa_avatar.svg" alt="NEXA" className="w-full h-full object-cover" />
                            </div>
                          )}

                          <div
                            className={`max-w-[85%] sm:max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed relative group shadow-sm ${
                              !isNexa
                                ? "bg-cyan-500/15 text-cyan-100 border border-cyan-400/30 rounded-tr-xs"
                                : "bg-slate-900/90 text-slate-200 border border-slate-800/80 rounded-tl-xs pr-8"
                            }`}
                          >
                            {/* Rich Thumbnail Banner for the Welcome Message */}
                            {isWelcomeMessage && (
                              <div className="mb-2.5 p-2 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] flex-shrink-0 bg-slate-950">
                                  <img
                                    src="./nexa_avatar.svg"
                                    alt="NEXA AI Prototype"
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="absolute bottom-0 inset-x-0 bg-cyan-600 text-[8px] font-black text-center text-white uppercase tracking-tighter py-0.2">
                                    NEXA AI
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-white">NEXA Neural Engine</span>
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
                                      VOICE READY
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    Interactive voice synthesis & reasoning
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakText(m.text, i);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border transition-all ${
                                    isSpeakingThis
                                      ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                                      : "bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-200 border-cyan-700/50"
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3 text-cyan-300" />
                                  <span>{isSpeakingThis ? "Speaking..." : "Play Intro"}</span>
                                </button>
                              </div>
                            )}

                            <div className={!isNexa ? "pr-7" : ""}>{m.text}</div>

                            {/* Speaker button on EVERY message (NEXA and User) */}
                            <button
                              type="button"
                              onClick={() => speakText(m.text, i)}
                              aria-label={isSpeakingThis ? "Stop speaking this message" : "Listen to this message"}
                              className={`absolute top-2.5 right-2 p-1.5 rounded-lg transition-all ${
                                isSpeakingThis
                                  ? "bg-cyan-400 text-slate-950 shadow-md ring-2 ring-cyan-300"
                                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                              }`}
                              title={isSpeakingThis ? "Stop voice playback" : "Read aloud with TTS"}
                            >
                              {isSpeakingThis ? (
                                <div className="flex items-end gap-0.5 h-3 w-3">
                                  <span className="w-0.5 bg-slate-950 h-3 animate-bounce" />
                                  <span className="w-0.5 bg-slate-950 h-2 animate-bounce delay-75" />
                                  <span className="w-0.5 bg-slate-950 h-3 animate-bounce delay-150" />
                                </div>
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {/* User Avatar */}
                          {!isNexa && (
                            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-[10px] font-bold text-cyan-300 flex-shrink-0 shadow-sm mt-0.5">
                              YOU
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Curated Interactive Query Buttons (replaces text typing input) */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium pb-1">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Instant Inquiries (Click to hear NEXA reply):</span>
                      </span>
                      <span className="text-[10px] text-cyan-400/80 font-mono">6 PRESETS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSendNexa("Why hire Naman?")}
                        className="px-3 py-2.5 text-xs text-left rounded-xl bg-gradient-to-r from-cyan-500/15 to-blue-500/10 hover:from-cyan-500/25 hover:to-blue-500/20 text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 transition-all font-semibold flex items-center justify-between group active:scale-98 shadow-sm"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                          <span>Why hire Naman?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("Who is Naman?")}
                        className="px-3 py-2.5 text-xs text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all font-medium flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Who is Naman?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("What are Naman's core AI skills?")}
                        className="px-3 py-2.5 text-xs text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all font-medium flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>What are Naman's core AI skills?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("How can AI assist support tickets?")}
                        className="px-3 py-2.5 text-xs text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all font-medium flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>How can AI assist support tickets?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("How does Excel dashboard generation work?")}
                        className="px-3 py-2.5 text-xs text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all font-medium flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          <span>How does the Excel AI dashboard work?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("What is his BBA background?")}
                        className="px-3 py-2.5 text-xs text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all font-medium flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span>What is his BBA background?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Type 2: Excel Dashboard Concept */}
              {activeModalProject.interactiveType === "excel" && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-300">
                    <span className="font-bold text-emerald-300">Pipeline Flow:</span> Raw spreadsheet rows are parsed by an LLM prompt recipe, extracting monthly trends and auto-assembling KPI visual cards.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block">Parsed Rows</span>
                      <span className="text-xl font-bold text-emerald-400">1,420</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Spreadsheet Data</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block">Identified KPIs</span>
                      <span className="text-xl font-bold text-cyan-400">8 Metrics</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Variance & Growth</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block">Synthesis Time</span>
                      <span className="text-xl font-bold text-purple-400">3.2 sec</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Automated Pipeline</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-bold text-slate-200 block mb-2">
                      Simulated Generated Executive Chart
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Workflow Cycle Time</span>
                        <span className="text-cyan-300 font-mono">-42% Manual Delay</span>
                      </div>
                      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full w-[78%]" />
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                        <span>Data Categorization Accuracy</span>
                        <span className="text-emerald-300 font-mono">98.4% Match</span>
                      </div>
                      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Type 3: AI Social Media Concept */}
              {activeModalProject.interactiveType === "social" && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-slate-300">
                    <span className="font-bold text-purple-300">Interest Vector Matching:</span> Rather than superficial follower counts, user profiles are scored on shared curiosity vectors (AI Automation, Technical Ops, Business Strategy).
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                      <span className="text-slate-300 font-semibold">User Profile A: BBA Graduate + AI Exploration</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[11px]">89% Compatibility</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Shared vectors: "Automation pipelines", "Practical LLM prompt engineering", "Business workflow optimization".
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                      Recommendation: Initiated collaborative project workspace for mutual learning.
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Type 4: Local AI & FastAPI Integration */}
              {activeModalProject.interactiveType === "local_ai" && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-slate-300">
                    <span className="font-bold text-blue-300">Local Privacy Architecture:</span> Evaluated running lightweight open models (e.g. Llama 3 / Mistral) locally via Ollama with REST routing via FastAPI endpoints.
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] sm:text-xs text-slate-300 space-y-2 overflow-x-auto">
                    <div className="text-slate-500">// Simulated FastAPI Endpoint Route</div>
                    <div className="text-cyan-400">POST /api/v1/local-inference HTTP/1.1</div>
                    <div className="text-slate-400">{"{"}</div>
                    <div className="pl-4 text-emerald-300">"model": "ollama/llama-3-8b",</div>
                    <div className="pl-4 text-emerald-300">"context": "Customer support ticket classification",</div>
                    <div className="pl-4 text-emerald-300">"temperature": 0.2</div>
                    <div className="text-slate-400">{"}"}</div>
                    <div className="pt-2 text-slate-400">
                      Status: <span className="text-emerald-400 font-bold">200 OK</span> • Latency: <span className="text-cyan-300">210ms (Zero Cloud Egress)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-400">
              <span className="text-center sm:text-left text-[11px] sm:text-xs">Factual concept exploration for workflow evaluation</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-2 text-xs font-medium"
                    title="View GitHub Repository"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 transition-colors flex items-center justify-center font-medium"
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
