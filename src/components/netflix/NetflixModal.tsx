import React, { useState, useEffect } from "react";
import { X, Play, Plus, Check, ThumbsUp, Volume2, VolumeX, Sparkles, Bot, BarChart3, Users, Terminal, ExternalLink, Github, Trophy, Presentation, Star, Square } from "lucide-react";
import { netflixAudio } from "../../utils/netflixAudio";
import { NetflixPoster } from "./NetflixPosters";
import { nexaVoice } from "../../utils/nexaVoice";

export interface NetflixTitleItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  matchScore: number;
  year: string;
  rating: string;
  durationOrSeason: string;
  description: string;
  detailedProblem?: string;
  detailedContribution?: string;
  technologies: string[];
  githubUrl?: string;
  interactiveType?: "nexa" | "excel" | "social" | "local_ai" | "doc";
}

interface NetflixModalProps {
  item: NetflixTitleItem | null;
  onClose: () => void;
  isInMyList: boolean;
  onToggleMyList: (id: string) => void;
  onSelectTitle: (item: NetflixTitleItem) => void;
}

export const NetflixModal: React.FC<NetflixModalProps> = ({
  item,
  onClose,
  isInMyList,
  onToggleMyList,
  onSelectTitle,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "interactive" | "episodes">("overview");
  const [liked, setLiked] = useState(false);
  const [currentlySpeakingIdx, setCurrentlySpeakingIdx] = useState<number | null>(null);
  const [autoTTS, setAutoTTS] = useState<boolean>(true);
  const [nexaMessages, setNexaMessages] = useState<Array<{ role: "user" | "nexa"; text: string }>>([
    {
      role: "nexa",
      text: "Welcome to the NEXA interactive demo screen! I am an AI assistant prototype built by Naman Srivastava. Click any inquiry below to explore my reasoning and listen to my spoken answers.",
    },
  ]);
  const [excelQuarter, setExcelQuarter] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q4");

  // Clean up voice playback on close/unmount
  useEffect(() => {
    return () => {
      nexaVoice.stop();
    };
  }, [item]);

  if (!item) return null;

  const speakText = (text: string, index: number) => {
    if (currentlySpeakingIdx === index) {
      nexaVoice.stop();
      setCurrentlySpeakingIdx(null);
      return;
    }

    setCurrentlySpeakingIdx(index);
    nexaVoice.speak(text, index, {
      onStart: () => setCurrentlySpeakingIdx(index),
      onEnd: () => setCurrentlySpeakingIdx(null),
      onError: () => setCurrentlySpeakingIdx(null),
    });
  };

  const handleSendNexa = (customText: string) => {
    if (!customText.trim()) return;

    netflixAudio.playClick();
    const nextList = [...nexaMessages, { role: "user" as const, text: customText }];
    setNexaMessages(nextList);

    setTimeout(() => {
      let reply = "Processing via automated webhook architecture. In a production pipeline, this request routes to the LLM agent and formats the output into clean structured JSON.";
      const lower = customText.toLowerCase();
      if (lower.includes("why hire") || (lower.includes("hire") && lower.includes("naman"))) {
        reply =
          "Why hire Naman: He provides a distinctive edge by combining a BBA graduate's business vision with hands-on AI prototyping. Having driven high-volume ticket resolution under SLAs at Clickretina, clinched 1st place in Sprint Hackathons, and delivered AI keynotes at IIT Roorkee, Naman solves operational bottlenecks with fast, reliable, automated AI workflows.";
      } else if (lower.includes("who is naman") || lower.includes("who is he")) {
        reply =
          "Who is Naman: Naman Srivastava is a BBA graduate from BBD University who builds practical AI operations and workflow automations. He designs AI assistant concepts, automated sheet analytics, and production-minded LLM integrations.";
      } else if (lower.includes("support") || lower.includes("ticket") || lower.includes("customer")) {
        reply =
          "Support Operations flow: I parse customer inquiry urgency, extract order identifiers, cross-reference logs, and craft empathy-rich resolution drafts to dramatically reduce support response times.";
      } else if (lower.includes("excel") || lower.includes("metric") || lower.includes("sheet")) {
        reply =
          "Spreadsheet engine: Analyzed 1,420 rows. Revenue is up +18.4% with operational bottlenecks concentrated in dispatch staging.";
      } else if (lower.includes("skills") || lower.includes("core ai")) {
        reply =
          "Naman's key skills include Generative AI integrations, n8n autonomous workflows, webhook event routing, technical operations, and turning complex workflows into intuitive tools.";
      } else if (lower.includes("bba") || lower.includes("education")) {
        reply =
          "Naman graduated with a Bachelor of Business Administration (BBA). This gives him a solid grip on business economics, operational efficiency, customer success, and leadership.";
      }

      setNexaMessages((prev) => {
        const updated = [...prev, { role: "nexa" as const, text: reply }];
        if (autoTTS) {
          setTimeout(() => speakText(reply, updated.length - 1), 100);
        }
        return updated;
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#141414] text-white rounded-none sm:rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-neutral-800 z-10 my-0 sm:my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            netflixAudio.playClick();
            onClose();
          }}
          type="button"
          aria-label="Close details"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#181818]/90 hover:bg-[#282828] text-white/90 hover:text-white border border-white/20 transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner / Cinematic Backdrop */}
        <div className="relative w-full h-72 sm:h-96 md:h-[420px] overflow-hidden bg-neutral-900">
          <NetflixPoster id={item.id} className="w-full h-full" variant="backdrop" />
          
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-transparent hidden sm:block" />

          {/* Banner Meta and Quick Actions */}
          <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 z-20">
            {/* Studio Tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-black text-[#E50914] text-sm tracking-tighter">NAMANFLIX</span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-white/70">
                {item.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg mb-2">
              {item.title}
            </h2>

            {item.subtitle && (
              <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-2xl line-clamp-2 mb-4 drop-shadow">
                {item.subtitle}
              </p>
            )}

            {/* Netflix Hero Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => {
                  netflixAudio.playClick();
                  setActiveTab("interactive");
                }}
                type="button"
                className="px-6 py-2.5 rounded bg-white hover:bg-neutral-200 text-black font-bold text-sm tracking-wide flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Play Interactive Demo</span>
              </button>

              <button
                onClick={() => {
                  netflixAudio.playClick();
                  onToggleMyList(item.id);
                }}
                type="button"
                className="p-2.5 rounded-full border-2 border-neutral-500 hover:border-white bg-[#2a2a2a]/60 hover:bg-[#2a2a2a] text-white transition-all"
                title={isInMyList ? "Remove from My List" : "Add to My List"}
              >
                {isInMyList ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  netflixAudio.playClick();
                  setLiked(!liked);
                }}
                type="button"
                className="p-2.5 rounded-full border-2 border-neutral-500 hover:border-white bg-[#2a2a2a]/60 hover:bg-[#2a2a2a] text-white transition-all"
                title="Rate this project"
              >
                <ThumbsUp className={`w-4 h-4 ${liked ? "text-[#E50914] fill-[#E50914]" : ""}`} />
              </button>

              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded bg-[#333333]/80 hover:bg-[#444] text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 border border-white/20 hover:border-white/50 transition-all ml-auto active:scale-95"
                  title="View GitHub Repository"
                  aria-label="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-8 px-6 sm:px-10 border-b border-neutral-800 bg-[#181818]/50 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Overview & Details
          </button>
          <button
            onClick={() => setActiveTab("interactive")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "interactive"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Interactive Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab("episodes")}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === "episodes"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Cast & Tech Specs
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Synopsis & Story */}
              <div className="md:col-span-8 space-y-5">
                {/* Meta Row */}
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium flex-wrap">
                  <span className="text-emerald-400 font-bold tracking-wide">
                    {item.matchScore}% Match
                  </span>
                  <span className="text-neutral-400">{item.year}</span>
                  <span className="px-1.5 py-0.5 border border-neutral-600 rounded text-[10px] text-neutral-300 font-mono">
                    {item.rating}
                  </span>
                  <span className="text-neutral-400 font-mono text-xs">
                    {item.durationOrSeason}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] font-mono font-bold text-neutral-200 border border-neutral-700">
                    4K ULTRA HD
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] font-mono font-bold text-neutral-200 border border-neutral-700">
                    5.1 AUDIO
                  </span>
                </div>

                <p className="text-base text-neutral-200 leading-relaxed font-sans">
                  {item.description}
                </p>

                {item.detailedProblem && (
                  <div className="p-4 rounded-lg bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                    <div className="text-xs font-mono uppercase text-[#E50914] font-bold tracking-wider">
                      The Challenge / Plot Tension
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {item.detailedProblem}
                    </p>
                  </div>
                )}

                {item.detailedContribution && (
                  <div className="p-4 rounded-lg bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                    <div className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                      Naman's Architectural Contribution
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {item.detailedContribution}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Cast & Genres */}
              <div className="md:col-span-4 space-y-4 text-xs font-sans text-neutral-400">
                <div>
                  <span className="text-neutral-500 block mb-1">Director & Creator:</span>
                  <span className="text-neutral-200 font-medium">Naman Srivastava (BBA Graduate)</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Target Role:</span>
                  <span className="text-neutral-200 font-medium">AI Applications & Automation</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Genres:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-[11px] border border-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">Production Maturity:</span>
                  <span className="text-emerald-400 font-medium">{item.durationOrSeason}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "interactive" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E50914]" />
                    <span>Interactive Stage Simulator</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Experience the concept's live behavioral logic directly in the Netflix theatre.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-1 rounded">
                  Status: Active Concept
                </span>
              </div>

              {/* Specific interactive view based on item type */}
              {item.interactiveType === "excel" ? (
                <div className="bg-[#0b0f19] rounded-xl border border-neutral-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold text-sm text-white">AI Executive Dashboard Preview</span>
                    </div>
                    <div className="flex gap-1.5 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                      {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            netflixAudio.playClick();
                            setExcelQuarter(q);
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                            excelQuarter === q
                              ? "bg-emerald-500 text-black shadow"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
                      <span className="text-[11px] text-neutral-400 uppercase font-mono">Revenue Synthesized</span>
                      <div className="text-xl font-black text-white mt-1">
                        {excelQuarter === "Q4" ? "$248,500" : excelQuarter === "Q3" ? "$212,000" : "$184,300"}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">+19.4% vs Prev Quarter</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
                      <span className="text-[11px] text-neutral-400 uppercase font-mono">SLA Resolution Rate</span>
                      <div className="text-xl font-black text-white mt-1">98.2%</div>
                      <span className="text-[10px] text-cyan-400 font-mono">4.8m Avg Turnaround</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
                      <span className="text-[11px] text-neutral-400 uppercase font-mono">Automated Ingestion</span>
                      <div className="text-xl font-black text-white mt-1">100% Zero-Loss</div>
                      <span className="text-[10px] text-purple-400 font-mono">CSV / XLSX / Webhooks</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-black/40 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <div className="text-emerald-400 font-bold mb-1">AI Prompt Analysis Summary:</div>
                    "Data ingestion verified across {excelQuarter}. Recommending inventory buffer reallocation to support operations and customer support ticket surge prevention."
                  </div>
                </div>
              ) : (
                /* Default AI Chatbot Simulator (NEXA & others) */
                <div className="bg-[#0b0f19] rounded-xl border border-neutral-800 overflow-hidden flex flex-col min-h-[380px]">
                  {/* Top Header Bar with TTS State */}
                  <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#E50914]/60 shadow-[0_0_15px_rgba(229,9,20,0.4)] flex-shrink-0 bg-black">
                        <img src="/nexa_avatar.svg" alt="NEXA AI Thumbnail" className="w-full h-full object-cover" />
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white tracking-wide">NEXA AI Companion</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#E50914]/20 text-red-300 border border-[#E50914]/50 font-mono font-bold">
                            ONLINE TTS
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          Tap any question or speaker button to hear voice synthesis
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (currentlySpeakingIdx !== null) {
                            nexaVoice.stop();
                            setCurrentlySpeakingIdx(null);
                          }
                          setAutoTTS(!autoTTS);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 transition-all shadow-sm ${
                          autoTTS
                            ? "bg-[#E50914]/25 text-white border-[#E50914]/70 shadow-[0_0_10px_rgba(229,9,20,0.4)]"
                            : "bg-neutral-900 text-neutral-400 border-neutral-800"
                        }`}
                        title={autoTTS ? "Voice auto-playback is ON" : "Voice is muted"}
                      >
                        {autoTTS ? <Volume2 className="w-3.5 h-3.5 text-[#E50914] animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>{autoTTS ? "Voice: Active" : "Voice: Muted"}</span>
                      </button>

                      {currentlySpeakingIdx !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            nexaVoice.stop();
                            setCurrentlySpeakingIdx(null);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] bg-red-900/50 text-red-200 border border-red-700/60 flex items-center gap-1.5 shadow-sm"
                        >
                          <Square className="w-3 h-3 fill-red-400" />
                          <span>Stop</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3.5 font-sans h-56">
                    {nexaMessages.map((msg, i) => {
                      const isSpeakingThis = currentlySpeakingIdx === i;
                      const isNexa = msg.role === "nexa";
                      const isWelcomeMessage =
                        i === 0 &&
                        msg.text.includes("Welcome to the NEXA interactive demo screen");

                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                            isNexa ? "justify-start" : "justify-end"
                          }`}
                        >
                          {/* NEXA Thumbnail Avatar */}
                          {isNexa && (
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#E50914]/50 flex-shrink-0 shadow bg-black mt-0.5">
                              <img src="/nexa_avatar.svg" alt="NEXA" className="w-full h-full object-cover" />
                            </div>
                          )}

                          <div
                            className={`p-3.5 rounded-xl max-w-[85%] leading-relaxed relative group shadow-sm ${
                              !isNexa
                                ? "bg-neutral-800 text-white rounded-tr-xs"
                                : "bg-neutral-900/90 text-neutral-200 border border-neutral-800 rounded-tl-xs pr-8"
                            }`}
                          >
                            {/* Rich Thumbnail Banner for the Welcome Message */}
                            {isWelcomeMessage && (
                              <div className="mb-2.5 p-2 rounded-xl bg-black/70 border border-[#E50914]/40 flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.5)] flex-shrink-0 bg-black">
                                  <img
                                    src="/nexa_avatar.svg"
                                    alt="NEXA AI Assistant"
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="absolute bottom-0 inset-x-0 bg-[#E50914] text-[8px] font-black text-center text-white uppercase tracking-tighter py-0.2">
                                    NEXA AI
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-white">NEXA Neural Engine</span>
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono">
                                      VOICE READY
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-neutral-400 truncate">
                                    Spoken voice synthesis & reasoning
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakText(msg.text, i);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border transition-all ${
                                    isSpeakingThis
                                      ? "bg-[#E50914] text-white border-red-500 shadow-[0_0_10px_rgba(229,9,20,0.7)]"
                                      : "bg-red-950/60 hover:bg-red-900/60 text-red-200 border-red-800/60"
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3 text-red-300" />
                                  <span>{isSpeakingThis ? "Speaking..." : "Play Intro"}</span>
                                </button>
                              </div>
                            )}

                            <div className={!isNexa ? "pr-6" : ""}>{msg.text}</div>

                            {/* Speaker button on EVERY message (NEXA and user) */}
                            <button
                              type="button"
                              onClick={() => speakText(msg.text, i)}
                              aria-label={isSpeakingThis ? "Stop message voice" : "Listen to message"}
                              className={`absolute top-2 right-2 p-1.5 rounded-lg transition-colors ${
                                isSpeakingThis
                                  ? "bg-[#E50914] text-white shadow ring-2 ring-red-400"
                                  : "text-neutral-500 hover:text-white hover:bg-neutral-800"
                              }`}
                              title={isSpeakingThis ? "Stop speaking" : "Read aloud with TTS"}
                            >
                              {isSpeakingThis ? (
                                <div className="flex items-end gap-0.5 h-3 w-3">
                                  <span className="w-0.5 bg-white h-3 animate-bounce" />
                                  <span className="w-0.5 bg-white h-2 animate-bounce delay-75" />
                                  <span className="w-0.5 bg-white h-3 animate-bounce delay-150" />
                                </div>
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {/* User Avatar */}
                          {!isNexa && (
                            <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-[10px] text-neutral-300 flex-shrink-0 shadow mt-0.5">
                              YOU
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Query Prompt Buttons (Replaces text typing input) */}
                  <div className="p-3 bg-neutral-950 border-t border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#E50914]" />
                        <span>Instant Inquiries (Click to hear NEXA):</span>
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">Select Question</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleSendNexa("Why hire Naman?")}
                        className="px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-200 border border-red-800/60 transition-all font-semibold text-left flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                          <span>Why hire Naman?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-[#E50914] opacity-80 group-hover:opacity-100" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("Who is Naman?")}
                        className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-all font-medium text-left flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Who is Naman?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("What are Naman's core AI skills?")}
                        className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-all font-medium text-left flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>What are Naman's core AI skills?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("How do you handle customer support tickets?")}
                        className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-all font-medium text-left flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>How do you handle tickets?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("Can you parse Excel data into visual reports?")}
                        className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-all font-medium text-left flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>Parse Excel data into charts?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendNexa("What is his BBA background?")}
                        className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-all font-medium text-left flex items-center justify-between group active:scale-98"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span>What is his BBA background?</span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "episodes" && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white">Production Tech Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.technologies.map((tech, i) => (
                  <div
                    key={tech}
                    className="p-3.5 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#E50914]">0{i + 1}</span>
                      <span className="text-sm font-semibold text-neutral-200">{tech}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
