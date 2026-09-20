import React, { useState } from "react";
import { PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import { Sparkles, ExternalLink, Github, Layers, ArrowUpRight, Play, CheckCircle2, MessageSquare, BarChart3, Users, Terminal, X, Send, Bot } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [nexaInput, setNexaInput] = useState("");
  const [nexaMessages, setNexaMessages] = useState<Array<{ role: "user" | "nexa"; text: string }>>([
    {
      role: "nexa",
      text: "Hello! I am NEXA, an AI assistant concept designed by Naman. I focus on practical workflow assistance, conversational clarity, and voice-assisted interactions. How can I help explore automation today?",
    },
  ]);

  const handleSendNexa = (textToSend?: string) => {
    const q = textToSend || nexaInput;
    if (!q.trim()) return;

    const newMsgs = [...nexaMessages, { role: "user" as const, text: q }];
    setNexaMessages(newMsgs);
    setNexaInput("");

    setTimeout(() => {
      let reply = "I analyzed that request using workflow automation concepts. By connecting an AI model to an event webhook, we can automate this task seamlessly.";
      if (q.toLowerCase().includes("support") || q.toLowerCase().includes("ticket")) {
        reply = "In technical support operations, I can auto-triage ticket urgency, extract order numbers from user messages, and draft empathy-focused responses for human review.";
      } else if (q.toLowerCase().includes("excel") || q.toLowerCase().includes("dashboard")) {
        reply = "Spreadsheet analysis concept: I can ingest CSV records, compute metric variances, and suggest visual chart groupings for executive reporting.";
      } else if (q.toLowerCase().includes("fit") || q.toLowerCase().includes("automation") || q.toLowerCase().includes("role")) {
        reply = "I combine a business administration perspective with hands-on automation prototyping and verified support problem solving to streamline operations and drive business ROI.";
      }
      setNexaMessages((prev) => [...prev, { role: "nexa", text: reply }]);
    }, 600);
  };

  return (
    <section id="projects" className="relative py-20 lg:py-28 w-full border-t border-slate-900 bg-[#07090e]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI PROTOTYPING & CONCEPTS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            FEATURED PROJECTS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-2xl font-normal">
            Hands-on explorations turning AI tools and automation into practical digital experiences.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 2xl:gap-10">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bespoke-card transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="bespoke-pill px-2.5 py-1 rounded-full text-slate-300 text-[11px] sm:text-xs">
                    {project.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-[14.5px] font-normal text-slate-300/90 mb-4 leading-relaxed font-sans">
                  "{project.description}"
                </p>

                {/* Problem Explored */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bespoke-inset mb-3">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                    Problem Explored
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {project.problemExplored}
                  </p>
                </div>

                {/* My Contribution */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bespoke-inset mb-5">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Naman's Contribution
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {project.myContribution}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                    Technologies & Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="bespoke-pill px-2.5 py-1 rounded-lg text-slate-300 text-[11px] sm:text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer shadow-sm tracking-wide active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-cyan-300" />
                  <span>Interactive Concept Demo</span>
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all active:scale-95"
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
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 font-sans">
                    <span className="font-bold text-cyan-300">NEXA Concept Demo:</span> Test sample prompts below or type your own question to experience the conversational and support reasoning concept.
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <button
                      onClick={() => handleSendNexa("How can AI assist technical support tickets?")}
                      className="px-2.5 py-1.5 text-[11px] sm:text-xs rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 min-h-[36px]"
                    >
                      "How can AI assist support tickets?"
                    </button>
                    <button
                      onClick={() => handleSendNexa("How does Excel dashboard generation work?")}
                      className="px-2.5 py-1.5 text-[11px] sm:text-xs rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 min-h-[36px]"
                    >
                      "How does Excel dashboard work?"
                    </button>
                    <button
                      onClick={() => handleSendNexa("Why are you a fit for AI Operations?")}
                      className="px-2.5 py-1.5 text-[11px] sm:text-xs rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 min-h-[36px]"
                    >
                      "Why a fit for AI Operations?"
                    </button>
                  </div>

                  <div className="h-52 sm:h-60 overflow-y-auto space-y-3 p-3 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    {nexaMessages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                            m.role === "user"
                              ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/40"
                              : "bg-slate-900 text-slate-200 border border-slate-800"
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendNexa();
                    }}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ask NEXA about workflows or automation..."
                      value={nexaInput}
                      onChange={(e) => setNexaInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 min-h-[44px] text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 min-h-[44px] rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
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
                      <span className="text-slate-300 font-semibold">User Profile A: BBA + AI Exploration</span>
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
              <button
                onClick={() => setActiveModalProject(null)}
                className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors flex items-center justify-center font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
