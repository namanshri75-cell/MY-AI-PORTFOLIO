import React, { useState } from "react";
import { Terminal, Play, CheckCircle2, RotateCw, Sparkles, Activity, Layers } from "lucide-react";

export const LabExperimentsSection: React.FC = () => {
  const [activeExp, setActiveExp] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [outputLogs, setOutputLogs] = useState<string[]>([
    "[SYS_INIT] Sublevel AI Ops Environment: Ready",
    "[ORCHESTRATOR] n8n Webhook Listener: Listening on :5678",
    "[MODEL] Claude 3.5 Sonnet / GPT-4o Fallback: Configured",
    "[STATUS] Ready for test trigger dispatch...",
  ]);

  const experiments = [
    {
      id: "EXP-01",
      title: "n8n Autonomous Lead Routing & Triage",
      desc: "Simulates webhook reception, sentiment parsing, and auto-dispatching high-value leads to HubSpot/Slack with dynamic confidence scoring.",
      steps: ["Webhook Received (POST /webhook/inbound)", "Gemini 2.5 Flash / Claude Parser", "Confidence Score >= 0.88", "Auto-Draft Response & Notify Team"],
    },
    {
      id: "EXP-02",
      title: "Self-Healing Scraping & Data Harmonizer",
      desc: "Monitors target API schema drift, generates automatic regex fallbacks, and notifies on unresolvable breaking changes.",
      steps: ["Schema Validation Check", "Anomaly Detected in Payload", "Auto-Generate Adaptive Fallback Rule", "Pipeline Healed Without Downtime"],
    },
    {
      id: "EXP-03",
      title: "Automated Meeting Minutes & Action Tracker",
      desc: "Extracts action items, assignees, and deadlines from conversational audio transcripts into Jira / Linear tasks.",
      steps: ["Transcript Chunking & Token Budgeting", "Entity Extraction: Assignee + DueDate", "De-duplication with Existing Epics", "Created 4 Linear Tickets Successfully"],
    },
  ];

  const handleRunExperiment = () => {
    setRunning(true);
    const exp = experiments[activeExp];
    setOutputLogs([
      `[DISPATCH] Executing ${exp.id}: "${exp.title}"...`,
      `[STEP 1] ${exp.steps[0]} -> OK`,
    ]);

    setTimeout(() => {
      setOutputLogs((prev) => [...prev, `[STEP 2] ${exp.steps[1]} -> PROCESSING`]);
    }, 400);

    setTimeout(() => {
      setOutputLogs((prev) => [...prev, `[STEP 3] ${exp.steps[2]} -> VERIFIED`]);
    }, 900);

    setTimeout(() => {
      setOutputLogs((prev) => [
        ...prev,
        `[SUCCESS] ${exp.steps[3]}`,
        `[METRICS] Latency: 218ms | Tokens: 412 | Error Rate: 0.00%`,
      ]);
      setRunning(false);
    }, 1400);
  };

  return (
    <section id="lab" className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406]">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/09] LAB EXPERIMENTS & BENCHMARKS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Interactive Automation Testbed
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl font-mono">
            Live interactive simulations demonstrating automated pipeline orchestration, LLM function calling, and resilient system fallbacks.
          </p>
        </div>

        {/* Experiment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Experiment Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {experiments.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => {
                  setActiveExp(idx);
                  setOutputLogs([
                    `[SWITCH] Activated experiment: ${exp.id}`,
                    `[READY] ${exp.title}`,
                    "Click 'Trigger Pipeline Run' to simulate execution.",
                  ]);
                }}
                className={`p-4 sm:p-5 rounded-none text-left transition-all border cursor-pointer ${
                  activeExp === idx
                    ? "bg-[#0c0d12] border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.25)] text-white"
                    : "bg-[#070709] border-amber-500/20 hover:border-amber-400/50 text-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-black border border-amber-500/40 text-amber-300 font-bold">
                    {exp.id}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400/70">
                    Live Demo
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">{exp.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">{exp.desc}</p>
              </button>
            ))}
          </div>

          {/* Right Column: Tactile Terminal Execution Console */}
          <div className="lg:col-span-7 rounded-none bg-[#070709] border border-amber-500/30 p-5 sm:p-6 flex flex-col min-h-[380px] shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-none bg-amber-600/80" />
                <span className="w-2.5 h-2.5 rounded-none bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-none bg-amber-400/80" />
                <span className="ml-2 text-xs font-mono text-neutral-400">
                  console://sublevel-lab/{experiments[activeExp].id.toLowerCase()}
                </span>
              </div>

              <button
                onClick={handleRunExperiment}
                disabled={running}
                className="px-4 py-1.5 rounded-none bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-mono text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-md shadow-black border border-amber-300/40"
              >
                {running ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Trigger Pipeline Run</span>
                  </>
                )}
              </button>
            </div>

            {/* Console Log Screen */}
            <div className="flex-1 bg-black/90 rounded-none p-4 font-mono text-xs text-neutral-300 space-y-2 overflow-y-auto max-h-[260px] border border-amber-500/15">
              {outputLogs.map((log, i) => (
                <div
                  key={i}
                  className={`leading-relaxed ${
                    log.includes("[SUCCESS]")
                      ? "text-emerald-400 font-semibold"
                      : log.includes("[METRICS]")
                      ? "text-amber-300"
                      : log.includes("[DISPATCH]")
                      ? "text-white font-semibold"
                      : "text-neutral-300"
                  }`}
                >
                  {log}
                </div>
              ))}
              {running && (
                <div className="flex items-center gap-2 text-neutral-500 animate-pulse">
                  <span>Executing next pipeline step</span>
                  <span className="w-1.5 h-3 bg-amber-400 animate-ping inline-block" />
                </div>
              )}
            </div>

            {/* Benchmark Footer Bar */}
            <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] font-mono text-neutral-400 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Deterministic Fallback Matrix Active</span>
              </span>
              <span className="text-neutral-500">n8n Community Node Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabExperimentsSection;
