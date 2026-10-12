import React, { useState } from "react";

interface PosterProps {
  id: string;
  className?: string;
  variant?: "backdrop" | "card" | "hero";
}

interface TitleVisualMeta {
  imageUrl: string;
  badgeType: "SERIES" | "ORIGINAL" | "FILM" | "SPECIAL" | "DOCUSERIES" | "PREQUEL";
  categoryBadge: string;
  categoryColor: string;
  titlePrimary: string;
  titleSecondary?: string;
  tagline: string;
  accentGradient: string;
}

const TITLE_VISUALS: Record<string, TitleVisualMeta> = {
  billboard_hero: {
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    badgeType: "SERIES",
    categoryBadge: "#1 IN AI APPLICATIONS",
    categoryColor: "text-red-400 border-red-500/40 bg-red-950/60",
    titlePrimary: "NAMAN SRIVASTAVA",
    titleSecondary: "THE AI ARCHITECT",
    tagline: "Bridging Business Administration with Autonomous Operations & AI Pipelines",
    accentGradient: "from-white via-neutral-200 to-red-400",
  },
  hero: {
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    badgeType: "SERIES",
    categoryBadge: "#1 IN AI APPLICATIONS",
    categoryColor: "text-red-400 border-red-500/40 bg-red-950/60",
    titlePrimary: "NAMAN SRIVASTAVA",
    titleSecondary: "THE AI ARCHITECT",
    tagline: "Bridging Business Administration with Autonomous Operations & AI Pipelines",
    accentGradient: "from-white via-neutral-200 to-red-400",
  },
  nexa: {
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    badgeType: "SERIES",
    categoryBadge: "AI ASSISTANT",
    categoryColor: "text-cyan-300 border-cyan-500/40 bg-cyan-950/60",
    titlePrimary: "NEXA",
    titleSecondary: "AI ASSISTANT",
    tagline: "Conversational intelligence, voice synthesis & context",
    accentGradient: "from-cyan-400 to-blue-400",
  },
  "excel-dashboard": {
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "DATA & ANALYTICS",
    categoryColor: "text-emerald-300 border-emerald-500/40 bg-emerald-950/60",
    titlePrimary: "AI EXCEL",
    titleSecondary: "DASHBOARD",
    tagline: "Automated sheet ingestion, formula parsing & KPI visuals",
    accentGradient: "from-emerald-400 to-teal-400",
  },
  excel: {
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "DATA & ANALYTICS",
    categoryColor: "text-emerald-300 border-emerald-500/40 bg-emerald-950/60",
    titlePrimary: "AI EXCEL",
    titleSecondary: "DASHBOARD",
    tagline: "Automated sheet ingestion, formula parsing & KPI visuals",
    accentGradient: "from-emerald-400 to-teal-400",
  },
  "ai-social": {
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "SOCIAL CONCEPT",
    categoryColor: "text-fuchsia-300 border-fuchsia-500/40 bg-fuchsia-950/60",
    titlePrimary: "AI SOCIAL",
    titleSecondary: "NETWORK",
    tagline: "Vector affinity matching & collaborative learning communities",
    accentGradient: "from-fuchsia-400 to-rose-400",
  },
  social: {
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "SOCIAL CONCEPT",
    categoryColor: "text-fuchsia-300 border-fuchsia-500/40 bg-fuchsia-950/60",
    titlePrimary: "AI SOCIAL",
    titleSecondary: "NETWORK",
    tagline: "Vector affinity matching & collaborative learning communities",
    accentGradient: "from-fuchsia-400 to-rose-400",
  },
  "local-ai": {
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "LOCAL AI & SYSTEMS",
    categoryColor: "text-teal-300 border-teal-500/40 bg-teal-950/60",
    titlePrimary: "LOCAL AI",
    titleSecondary: "ORCHESTRATION",
    tagline: "Offline Ollama inference, private testbeds & FastAPI",
    accentGradient: "from-teal-400 to-cyan-400",
  },
  local_ai: {
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "LOCAL AI & SYSTEMS",
    categoryColor: "text-teal-300 border-teal-500/40 bg-teal-950/60",
    titlePrimary: "LOCAL AI",
    titleSecondary: "ORCHESTRATION",
    tagline: "Offline Ollama inference, private testbeds & FastAPI",
    accentGradient: "from-teal-400 to-cyan-400",
  },
  "hackathon-winner": {
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    badgeType: "FILM",
    categoryBadge: "CHAMPION",
    categoryColor: "text-amber-300 border-amber-500/40 bg-amber-950/60",
    titlePrimary: "HACKATHON",
    titleSecondary: "CHAMPION",
    tagline: "Rapid sprint prototyping under high-pressure competitive execution",
    accentGradient: "from-amber-400 to-yellow-300",
  },
  "iit-roorkee": {
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    badgeType: "SPECIAL",
    categoryBadge: "KEYNOTE SPEAKER",
    categoryColor: "text-indigo-300 border-indigo-500/40 bg-indigo-950/60",
    titlePrimary: "IIT ROORKEE",
    titleSecondary: "KEYNOTE",
    tagline: "Presenting generative intelligence paradigms to university engineers",
    accentGradient: "from-indigo-400 to-purple-400",
  },
  "ai-automation": {
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badgeType: "DOCUSERIES",
    categoryBadge: "AUTOMATION LAB",
    categoryColor: "text-sky-300 border-sky-500/40 bg-sky-950/60",
    titlePrimary: "AUTOMATION",
    titleSecondary: "CHRONICLES",
    tagline: "Autonomous n8n pipelines, webhooks, and REST trigger workflows",
    accentGradient: "from-sky-400 to-blue-400",
  },
  "n8n-orchestrator": {
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "AUTOMATION ENGINE",
    categoryColor: "text-amber-300 border-amber-500/40 bg-amber-950/60",
    titlePrimary: "N8N EVENT",
    titleSecondary: "ORCHESTRATOR",
    tagline: "Event-driven webhook routing, autonomous multi-step pipelines",
    accentGradient: "from-amber-400 to-red-400",
  },
  "support-triage-ai": {
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "AI OPERATIONS",
    categoryColor: "text-rose-300 border-rose-500/40 bg-rose-950/60",
    titlePrimary: "SUPPORT TRIAGE",
    titleSecondary: "AI AGENT",
    tagline: "Intelligent ticket categorization, SLA prioritization & log audits",
    accentGradient: "from-rose-400 to-orange-400",
  },
  "doc-parser-ai": {
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "ENTERPRISE AUTOMATION",
    categoryColor: "text-emerald-300 border-emerald-500/40 bg-emerald-950/60",
    titlePrimary: "SCHEMA PARSER",
    titleSecondary: "INTELLIGENCE",
    tagline: "Zero-shot document extraction and automated JSON formatting",
    accentGradient: "from-emerald-400 to-cyan-400",
  },
  "prompt-benchmarks": {
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
    badgeType: "DOCUSERIES",
    categoryBadge: "MODEL EVALUATION",
    categoryColor: "text-violet-300 border-violet-500/40 bg-violet-950/60",
    titlePrimary: "PROMPT EVAL",
    titleSecondary: "BENCHMARK LAB",
    tagline: "Latency profiling, response variance & few-shot optimization",
    accentGradient: "from-violet-400 to-indigo-400",
  },
  "agent-reasoning-sandbox": {
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    badgeType: "SERIES",
    categoryBadge: "AGENTIC AI",
    categoryColor: "text-cyan-300 border-cyan-500/40 bg-cyan-950/60",
    titlePrimary: "AGENT REASONING",
    titleSecondary: "SANDBOX",
    tagline: "Chain-of-thought tool calling, self-reflection & multi-turn state",
    accentGradient: "from-cyan-400 to-teal-400",
  },
  "context-memory-engine": {
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "RAG & EMBEDDINGS",
    categoryColor: "text-blue-300 border-blue-500/40 bg-blue-950/60",
    titlePrimary: "CONTEXT MEMORY",
    titleSecondary: "VECTOR ENGINE",
    tagline: "Semantic memory persistence and sub-second cosine similarity",
    accentGradient: "from-blue-400 to-sky-400",
  },
  "fastapi-inference-gateway": {
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "API ARCHITECTURE",
    categoryColor: "text-teal-300 border-teal-500/40 bg-teal-950/60",
    titlePrimary: "FASTAPI PROXY",
    titleSecondary: "GATEWAY",
    tagline: "High-throughput async streaming model serving and rate limiting",
    accentGradient: "from-teal-400 to-emerald-400",
  },
  "webhook-resiliency-pipeline": {
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "EVENT STREAMING",
    categoryColor: "text-amber-300 border-amber-500/40 bg-amber-950/60",
    titlePrimary: "WEBHOOK RESILIENCY",
    titleSecondary: "PIPELINE",
    tagline: "Idempotent event ingestion, automated retries & DLQ buffering",
    accentGradient: "from-amber-400 to-orange-400",
  },
  "log-diagnostic-pipeline": {
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    badgeType: "SERIES",
    categoryBadge: "DIAGNOSTIC OPS",
    categoryColor: "text-orange-300 border-orange-500/40 bg-orange-950/60",
    titlePrimary: "LOG AUDIT",
    titleSecondary: "DIAGNOSTIC ENGINE",
    tagline: "Automated anomaly detection across order fulfillment logs",
    accentGradient: "from-orange-400 to-red-400",
  },
  "ci-cd-prompt-testing": {
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    badgeType: "ORIGINAL",
    categoryBadge: "MLOPS PIPELINE",
    categoryColor: "text-purple-300 border-purple-500/40 bg-purple-950/60",
    titlePrimary: "PROMPT CI/CD",
    titleSecondary: "REGRESSION SUITE",
    tagline: "Automated test harnesses guarding against model drift",
    accentGradient: "from-purple-400 to-pink-400",
  },
  clickretina: {
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    badgeType: "SERIES",
    categoryBadge: "OPERATIONS OPS",
    categoryColor: "text-orange-300 border-orange-500/40 bg-orange-950/60",
    titlePrimary: "CLICKRETINA",
    titleSecondary: "TECH SUPPORT",
    tagline: "Front-line ticket investigation, log auditing & high-volume SLAs",
    accentGradient: "from-orange-400 to-amber-300",
  },
  bba: {
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    badgeType: "PREQUEL",
    categoryBadge: "BBA GRADUATE",
    categoryColor: "text-emerald-300 border-emerald-500/40 bg-emerald-950/60",
    titlePrimary: "THE PREQUEL",
    titleSecondary: "BBA GRADUATE",
    tagline: "BBD University Lucknow — Business strategy, economics & management",
    accentGradient: "from-emerald-300 to-sky-300",
  },
};

export const NetflixPoster: React.FC<PosterProps> = ({ id, className = "", variant = "card" }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const meta = TITLE_VISUALS[id] || {
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    badgeType: "SERIES",
    categoryBadge: "ORIGINAL",
    categoryColor: "text-neutral-300 border-neutral-700 bg-neutral-900",
    titlePrimary: "NAMANFLIX",
    titleSecondary: "ORIGINAL",
    tagline: "Exploration & Production Ready Concepts",
    accentGradient: "from-white to-red-400",
  };

  const isHero = variant === "hero" || id === "billboard_hero" || id === "hero";

  return (
    <div className={`relative w-full h-full overflow-hidden bg-neutral-950 select-none ${className}`}>
      {/* Background Cinematic Photographic Thumbnail */}
      {!imgError && (
        <img
          src={meta.imageUrl}
          alt={meta.titlePrimary}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isHero ? "scale-105 object-center" : "group-hover:scale-110"
          } ${imgLoaded ? "opacity-75" : "opacity-0"}`}
        />
      )}

      {/* Fallback procedural glow if image loading or error */}
      {(!imgLoaded || imgError) && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#12070a] via-[#0d1017] to-[#040609]" />
      )}

      {/* Ambient Red and Dark Color Washes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30 pointer-events-none" />

      {/* Top Netflix Trademark Watermark & Category Badges */}
      {!isHero && (
        <>
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 drop-shadow">
            <span className="font-black text-[#E50914] text-sm tracking-tighter">N</span>
            <span className="text-[9px] uppercase tracking-widest text-white/90 font-extrabold">
              {meta.badgeType}
            </span>
          </div>

          <div
            className={`absolute top-2.5 right-2.5 z-10 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border shadow ${meta.categoryColor}`}
          >
            {meta.categoryBadge}
          </div>
        </>
      )}

      {/* 4K Ultra HD Micro Badge */}
      {!isHero && (
        <div className="absolute top-8 right-2.5 z-10 bg-black/60 backdrop-blur-md px-1 py-0.2 rounded text-[7.5px] font-mono text-neutral-400 border border-white/10 uppercase">
          4K HDR
        </div>
      )}

      {/* Bottom Title Typography & Description Vignette */}
      {!isHero && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 z-10">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black tracking-tight text-white drop-shadow-md">
              {meta.titlePrimary}
            </span>
            {meta.titleSecondary && (
              <span
                className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${meta.accentGradient}`}
              >
                {meta.titleSecondary}
              </span>
            )}
          </div>
          <div className="text-[10.5px] text-neutral-300 font-sans line-clamp-1 opacity-90 drop-shadow">
            {meta.tagline}
          </div>
        </div>
      )}
    </div>
  );
};
