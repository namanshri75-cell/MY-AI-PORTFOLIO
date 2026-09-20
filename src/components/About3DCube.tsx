import React, { useState, useEffect } from "react";
import { Sparkles, Workflow, Bot, Cpu, Network, Layers } from "lucide-react";

export const About3DCube: React.FC = () => {
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(25);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFace, setActiveFace] = useState<string>("AI");
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  // Continuous subtle rotation when not hovered or touched
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.6) % 360);
      setRotX((prev) => Math.sin(Date.now() * 0.001) * 12);
    }, 25);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    if (e.touches.length > 0) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    setRotY((prev) => prev + dx * 0.8);
    setRotX((prev) => Math.max(-60, Math.min(60, prev - dy * 0.8)));
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    setTimeout(() => setIsHovered(false), 2000);
  };

  const faces = [
    {
      name: "AI",
      subtitle: "Cognitive Logic",
      icon: Sparkles,
      color: "text-cyan-400",
      borderColor: "border-cyan-500/40",
      glow: "shadow-[0_0_25px_rgba(0,255,198,0.15)]",
      transform: "translateZ(105px)",
      tag: "CORE_PILLAR"
    },
    {
      name: "Automation",
      subtitle: "Process Engines",
      icon: Cpu,
      color: "text-emerald-400",
      borderColor: "border-emerald-500/40",
      glow: "shadow-[0_0_25px_rgba(16,185,129,0.15)]",
      transform: "rotateY(180deg) translateZ(105px)",
      tag: "PIPELINES"
    },
    {
      name: "LLMs",
      subtitle: "Contextual Models",
      icon: Bot,
      color: "text-purple-400",
      borderColor: "border-purple-500/40",
      glow: "shadow-[0_0_25px_rgba(168,85,247,0.15)]",
      transform: "rotateY(90deg) translateZ(105px)",
      tag: "PROMPTS"
    },
    {
      name: "Workflows",
      subtitle: "Event Automation",
      icon: Workflow,
      color: "text-blue-400",
      borderColor: "border-blue-500/40",
      glow: "shadow-[0_0_25px_rgba(59,130,246,0.15)]",
      transform: "rotateY(-90deg) translateZ(105px)",
      tag: "N8N_ORCHESTRATION"
    },
    {
      name: "APIs",
      subtitle: "REST & Webhooks",
      icon: Network,
      color: "text-amber-400",
      borderColor: "border-amber-500/40",
      glow: "shadow-[0_0_25px_rgba(245,158,11,0.15)]",
      transform: "rotateX(90deg) translateZ(105px)",
      tag: "JSON_PAYLOADS"
    },
    {
      name: "AI Assistants",
      subtitle: "Conversational UX",
      icon: Layers,
      color: "text-teal-400",
      borderColor: "border-teal-500/40",
      glow: "shadow-[0_0_25px_rgba(20,184,166,0.15)]",
      transform: "rotateX(-90deg) translateZ(105px)",
      tag: "USER_AGENTS"
    },
  ];

  return (
    <div
      className="relative flex flex-col items-center justify-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl overflow-hidden group select-none touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle background ambient blur */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full flex items-center justify-between mb-6 sm:mb-8 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-slate-400 uppercase">
            Interactive Concept Matrix
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300 bg-slate-800/70 px-2 py-0.5 rounded border border-cyan-500/30">
          TOUCH / DRAG
        </span>
      </div>

      {/* 3D Scene Viewport */}
      <div
        className="w-[240px] h-[240px] relative flex items-center justify-center my-4"
        style={{ perspective: "800px" }}
      >
        <div
          className="w-[210px] h-[210px] relative transition-transform duration-100 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {faces.map((face) => {
            const IconComponent = face.icon;
            return (
              <div
                key={face.name}
                onClick={() => setActiveFace(face.name)}
                className={`absolute inset-0 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border ${face.borderColor} ${face.glow} flex flex-col items-center justify-between cursor-pointer transition-all duration-300 hover:bg-slate-800/95`}
                style={{
                  transform: face.transform,
                  backfaceVisibility: "visible",
                }}
              >
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{face.tag}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                </div>

                <div className="flex flex-col items-center text-center gap-1.5 my-auto">
                  <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 ${face.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-base tracking-wide text-white">
                    {face.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {face.subtitle}
                  </span>
                </div>

                <div className="w-full text-center text-[10px] font-mono text-slate-400/80 border-t border-slate-800/80 pt-1">
                  PRACTICAL APPLICATION
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Interactive Tags selector */}
      <div className="w-full mt-6 z-10">
        <div className="text-xs font-mono text-slate-400 mb-2.5 text-center">
          Tap label to orient:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {faces.map((f, i) => (
            <button
              key={f.name}
              onClick={() => {
                setActiveFace(f.name);
                if (i === 0) { setRotX(0); setRotY(0); }
                else if (i === 1) { setRotX(0); setRotY(180); }
                else if (i === 2) { setRotX(0); setRotY(-90); }
                else if (i === 3) { setRotX(0); setRotY(90); }
                else if (i === 4) { setRotX(-90); setRotY(0); }
                else if (i === 5) { setRotX(90); setRotY(0); }
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                activeFace === f.name
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,198,0.2)]"
                  : "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:text-white hover:border-slate-600"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
