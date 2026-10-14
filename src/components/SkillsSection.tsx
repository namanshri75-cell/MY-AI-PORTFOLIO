import React, { useState } from "react";
import { 
  Cpu, 
  Info, 
  Zap, 
  FolderGit2, 
  Box
} from "lucide-react";
import { AgenticFactory3D, StationId } from "@/components/ui/agentic-factory-3d";
import { GlassFolder } from "@/components/ui/glass-folder-cards";

export const SkillsSection: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<StationId | null>(null);

  const stationDetails: Record<StationId, { title: string; subtitle: string; tools: string[]; impact: string }> = {
    cabinet: {
      title: "Data & Event Ingestion",
      subtitle: "Station 01 · Webhooks, JSON payloads, Form triggers",
      tools: ["Webhooks", "JSON Schema Validation", "REST Endpoints", "Rate Limiting"],
      impact: "Captures inbound user events and customer requests in <50ms with zero payload loss.",
    },
    engine: {
      title: "LLM Cognitive Reasoning",
      subtitle: "Station 02 · Intent classification, Entity extraction, Structured JSON",
      tools: ["Claude 3.5 Sonnet", "GPT-4o", "Few-Shot Prompt Engineering", "Strict Pydantic/JSON Output"],
      impact: "Transforms ambiguous customer intent into deterministic execution payloads.",
    },
    admin: {
      title: "n8n Workflow Orchestration",
      subtitle: "Station 03 · Autonomous multi-step branching & API routing",
      tools: ["n8n Workflows", "Conditional Routing", "Error Traps & Retry Queues", "Async Event Loops"],
      impact: "Eliminates 90%+ repetitive operational steps across CRM, email, and databases.",
    },
    storefront: {
      title: "Enterprise UI & Reporting",
      subtitle: "Station 04 · Live executive dashboards & web consoles",
      tools: ["Power BI", "React / Vite UI", "Executive KPI Metrics", "Firebase Realtime DB"],
      impact: "Gives operational stakeholders instantaneous visibility into live pipeline throughput.",
    },
    cashdesk: {
      title: "Automated Dispatch & SLA",
      subtitle: "Station 05 · CRM resolution, Ticket triage & Customer notice",
      tools: ["Ticket Triaging", "Root Cause Analysis (RCA)", "Customer Notification", "SLA Monitoring"],
      impact: "Maintains 99%+ customer satisfaction with verified audit logs and resolution guarantees.",
    },
  };

  return (
    <section id="skills" className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406]">
      {/* Background Gold Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-none blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-yellow-600/5 rounded-none blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Heading — Sharp Luxury Black & Gold */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/04] OPERATIONAL ARCHITECTURE & SKILLS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            SKILLS & CAPABILITIES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl font-normal">
            Autonomous automation engines, prompt engineering pipelines, API integrations, and technical support operations.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        {/* Recruiter Transparency Guarantee */}
        <div className="mb-10 p-4 sm:p-5 rounded-none bespoke-card border-amber-500/30 flex items-start sm:items-center gap-3.5 max-w-4xl mx-auto shadow-xl">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-[13px] 2xl:text-sm text-neutral-300 leading-relaxed font-sans">
            <span className="font-bold text-amber-300 font-mono text-xs uppercase tracking-wide">Recruiter Note:</span> All skills reflect genuine hands-on workflow automation, tool orchestration, and operational problem solving. No inflated programming language claims or fabricated percentage bars.
          </p>
        </div>

        {/* 1. 3D Working Animated Factory */}
        <div className="w-full flex flex-col items-center mb-16">
          <div className="w-full relative border border-amber-500/30 bg-[#020203] shadow-2xl overflow-hidden rounded-none">
            {/* Top Badge inside factory frame */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-[#09090c]/90 border border-amber-500/40 backdrop-blur-md">
              <Box className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-mono text-amber-300 tracking-wider">
                3D AUTOMATION FACTORY · 5 LIVE PIPELINE NODES
              </span>
            </div>

            {/* Subtle gold grid overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(212,175,55,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px"
              }}
            />

            {/* 3D Animated Factory Component */}
            <div className="relative w-full h-[620px] lg:h-[720px]">
              <AgenticFactory3D
                height="100%"
                onStation={(id) => setSelectedStation(id)}
              />
            </div>

            {/* Station Deep Dive Bar if a station is focused */}
            {selectedStation && stationDetails[selectedStation] && (
              <div className="p-4 sm:p-6 bg-[#0a0a0d]/95 backdrop-blur-xl border-t border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 animate-ping rounded-none" />
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">
                      {stationDetails[selectedStation].subtitle}
                    </span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-white mt-0.5">
                    {stationDetails[selectedStation].title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-sans mt-1">
                    {stationDetails[selectedStation].impact}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {stationDetails[selectedStation].tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-none bg-amber-500/10 text-amber-300 border border-amber-500/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Helper caption under 3D Factory */}
          <div className="mt-4 flex items-center justify-between w-full text-xs font-mono text-neutral-400 px-2 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-amber-400/90">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Drag to orbit · Scroll to zoom · Click machine mode buttons or stations to isolate pipelines</span>
            </span>
            <span>THREE.JS 0.160 ENGINE · SHADER ARCHITECTURE</span>
          </div>
        </div>

        {/* 2. Tactile Glass Folder Dossiers (Directly Below 3D Factory) */}
        <div className="w-full pt-8 border-t border-amber-500/15">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-2 border-amber-500/30">
              <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-xs uppercase tracking-widest">[SYS/04.2] ARCHIVED OPERATIONAL DOSSIERS</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tactile Skill Dossiers
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto">
              Interactive physical glass folders containing verified skill playbooks, automation templates, and operational runbooks. Tap or hover any folder to inspect files.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-none mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {/* Folder 1: AI & LLM Systems */}
            <GlassFolder
              label="AI & LLM Architecture"
              meta="6 Production Skills"
              art="verdant"
              seed={101}
              files={[
                { name: "Claude 3.5 Sonnet", meta: "Prompt Design & Function Calls" },
                { name: "GPT-4o Reasoning", meta: "Structured JSON schema" },
                { name: "Prompt Engineering", meta: "Few-shot & System Instructions" },
                { name: "OpenRouter & Gemini", meta: "Multi-Model API Gateway" },
              ]}
            />

            {/* Folder 2: Workflow Automation */}
            <GlassFolder
              label="Workflow Automation Engines"
              meta="Autonomous Pipelines"
              art="ember"
              seed={202}
              files={[
                { name: "n8n Orchestration", meta: "Multi-agent pipelines" },
                { name: "Webhooks Integration", meta: "Real-time event capture" },
                { name: "REST API Architecture", meta: "HTTP payloads & Headers" },
                { name: "FastAPI Integrations", meta: "Lightweight inference bridge" },
              ]}
            />

            {/* Folder 3: Support Operations & BI */}
            <GlassFolder
              label="Operations, BI & Support"
              meta="Verified SLA Metrics"
              art="dusk"
              seed={303}
              files={[
                { name: "Power BI Executive Deck", meta: "DAX & Data Modeling" },
                { name: "Customer Ticket Triage", meta: "99.2% Resolution SLA" },
                { name: "Root Cause Escalations", meta: "Reproducible Bug Logging" },
                { name: "Firebase Auth & Data", meta: "Real-time sync & state" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
