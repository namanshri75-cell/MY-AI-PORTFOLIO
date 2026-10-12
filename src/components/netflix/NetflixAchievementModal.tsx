import React, { useState, useEffect } from "react";
import {
  X,
  Award,
  Trophy,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Layers,
  Star,
  Cpu,
  Share2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { NetflixPoster } from "./NetflixPosters";
import { netflixAudio } from "../../utils/netflixAudio";
import { nexaVoice } from "../../utils/nexaVoice";
import { NetflixTitleItem } from "./NetflixModal";

export interface AchievementBadgeMeta {
  id: string;
  name: string;
  tier: "TIER S • CHAMPION" | "TIER ELITE • KEYNOTE" | "TIER MASTER • AUTOMATOR";
  colorTheme: "amber" | "indigo" | "emerald" | "cyan";
  issuer: string;
  issuedDate: string;
  verificationHash: string;
  icon: string;
  criteria: string[];
  skillsProven: string[];
  judgeVerdict: string;
  metrics: { label: string; value: string }[];
  narrationText: string;
}

const ACHIEVEMENT_BADGES_DATA: Record<string, AchievementBadgeMeta> = {
  "hackathon-winner": {
    id: "hackathon-winner",
    name: "Sprint Hackathon Grand Prix Champion",
    tier: "TIER S • CHAMPION",
    colorTheme: "amber",
    issuer: "Sprint Innovation Council & Tech Jury",
    issuedDate: "2024",
    verificationHash: "SHA-256: 7f8a9e2c4b1d6091f3a5e8c71b04da92",
    icon: "Trophy",
    criteria: [
      "Designed and delivered functional full-stack MVP within high-pressure time limits",
      "Architected prompt engineering logic and AI workflow triggers",
      "Led cross-functional team coordination, wireframing, and prototype testing",
      "Delivered live executive pitch to enterprise jury members with 100% consensus",
    ],
    skillsProven: [
      "Rapid Prototyping",
      "High-Pressure Execution",
      "Team Leadership",
      "AI Prompt Engineering",
      "Executive Pitch Delivery",
      "MVP System Architecture",
    ],
    judgeVerdict:
      "Awarded 1st Place for exceptional end-to-end execution, intuitive user experience, and practical application of AI that solved real user friction rather than theoretical promises.",
    metrics: [
      { label: "Placement", value: "1st Place of 42 Teams" },
      { label: "Build Duration", value: "48-Hour Sprint" },
      { label: "Jury Score", value: "98.5 / 100" },
      { label: "Production Status", value: "Working MVP Shipped" },
    ],
    narrationText:
      "Hackathon Championship: Naman led the architectural sprint against 42 competitive multidisciplinary teams, engineering rapid prompt pipelines and delivering the victorious pitch to executive judges.",
  },
  "iit-roorkee": {
    id: "iit-roorkee",
    name: "IIT Roorkee Distinguished Keynote Orator",
    tier: "TIER ELITE • KEYNOTE",
    colorTheme: "indigo",
    issuer: "Indian Institute of Technology (IIT) Roorkee",
    issuedDate: "2024",
    verificationHash: "SHA-256: 4e9c1d88a2b50731f6e4a3b90c1f72d8",
    icon: "Award",
    criteria: [
      "Selected as invited speaker at prestigious IIT Roorkee tech symposium",
      "Authored 45-minute structured keynote on practical Generative AI applications",
      "Broke down autonomous multi-agent pipelines and real business workflow ROI",
      "Conducted interactive Q&A session with engineering graduates and faculty",
    ],
    skillsProven: [
      "Keynote Public Speaking",
      "Generative AI Paradigms",
      "Audience Engagement",
      "Translating Tech to ROI",
      "Autonomous Agent Theory",
      "Executive Communication",
    ],
    judgeVerdict:
      "Honored for delivering an articulate, highly grounded breakdown of artificial intelligence trends, bridging theoretical model capabilities with tangible industry operations.",
    metrics: [
      { label: "Audience", value: "300+ Engineers & Faculty" },
      { label: "Keynote Length", value: "45 Minutes + Q&A" },
      { label: "Venue", value: "IIT Roorkee Main Stage" },
      { label: "Feedback Rating", value: "4.9 / 5.0" },
    ],
    narrationText:
      "AI Presentation at IIT Roorkee: Naman delivered an honored keynote address on emerging generative intelligence paradigms, demonstrating how practical automation transforms enterprise workflows.",
  },
  "ai-automation": {
    id: "ai-automation",
    name: "Continuous Automation & Lab Research Fellow",
    tier: "TIER MASTER • AUTOMATOR",
    colorTheme: "emerald",
    issuer: "Independent AI Operations & Automation Lab",
    issuedDate: "2024 - Present",
    verificationHash: "SHA-256: 9b2d5a1e7c8f4023e1d6c8b92a40ef77",
    icon: "Cpu",
    criteria: [
      "Constructed 12+ independent autonomous webhook workflows using n8n and REST APIs",
      "Benchmarked local quantized model inference with Ollama against cloud endpoints",
      "Engineered automated ticket triage and spreadsheet formula synthesis pipelines",
      "Maintained zero-failure webhook reliability across test suites",
    ],
    skillsProven: [
      "n8n Workflow Automation",
      "Event-Driven Webhooks",
      "Local LLM Inference (Ollama)",
      "FastAPI REST Endpoints",
      "Prompt Optimization",
      "Error Handling & Retries",
    ],
    judgeVerdict:
      "Demonstrates relentless continuous learning and practical initiative, assembling resilient event-driven architectures that bridge modern models with standard business software.",
    metrics: [
      { label: "Pipelines Built", value: "12+ Production Concepts" },
      { label: "Webhook Latency", value: "< 180ms Response" },
      { label: "Frameworks Used", value: "n8n, FastAPI, Ollama" },
      { label: "Status", value: "Active Continuous Lab" },
    ],
    narrationText:
      "The Automation Chronicles: Naman engineered multiple autonomous event-driven pipelines, validating local model quantization with Ollama and enterprise webhook orchestration.",
  },
};

interface NetflixAchievementModalProps {
  item: NetflixTitleItem | null;
  onClose: () => void;
  isInMyList: boolean;
  onToggleMyList: (id: string) => void;
  onSelectOtherAchievement?: (item: NetflixTitleItem) => void;
}

export const NetflixAchievementModal: React.FC<NetflixAchievementModalProps> = ({
  item,
  onClose,
  isInMyList,
  onToggleMyList,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"badge" | "story" | "metrics" | "verification">("badge");
  const [badgeTilt, setBadgeTilt] = useState({ x: 0, y: 0 });
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    return () => {
      nexaVoice.stop();
    };
  }, [item]);

  if (!item) return null;

  const badgeMeta = ACHIEVEMENT_BADGES_DATA[item.id] || ACHIEVEMENT_BADGES_DATA["hackathon-winner"];

  const handleMouseMoveBadge = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setBadgeTilt({ x: x * 20, y: -y * 20 });
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      nexaVoice.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    nexaVoice.speak(badgeMeta.narrationText, `achievement-${item.id}`, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleCopyHash = () => {
    try {
      navigator.clipboard.writeText(badgeMeta.verificationHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Container */}
      <div
        className={`relative w-full bg-[#121212] text-white rounded-none sm:rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] border border-neutral-800 z-10 transition-all duration-300 my-0 sm:my-6 ${
          isExpanded ? "max-w-6xl min-h-[92vh]" : "max-w-4xl"
        }`}
      >
        {/* Header Action Controls */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
          {/* Narrate Voice Button */}
          <button
            onClick={handleToggleSpeak}
            type="button"
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border transition-all shadow-lg ${
              isSpeaking
                ? "bg-[#E50914] text-white border-red-500 shadow-[0_0_15px_rgba(229,9,20,0.6)] animate-pulse"
                : "bg-black/70 hover:bg-black/90 text-neutral-200 border-white/20 hover:text-white"
            }`}
            title="Hear NEXA narrate this achievement"
          >
            {isSpeaking ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
            <span className="hidden sm:inline">{isSpeaking ? "Narrating..." : "Listen to Story"}</span>
          </button>

          {/* Expand/Collapse Fullscreen Toggle */}
          <button
            onClick={() => {
              netflixAudio.playClick();
              setIsExpanded(!isExpanded);
            }}
            type="button"
            className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 transition-all shadow-lg"
            title={isExpanded ? "Standard modal view" : "Expand to widescreen view"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Modal */}
          <button
            onClick={() => {
              netflixAudio.playClick();
              onClose();
            }}
            type="button"
            className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 transition-all shadow-lg"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Hero Cinematic Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-neutral-950">
          <NetflixPoster id={item.id} className="w-full h-full" variant="backdrop" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E50914] text-white text-[10px] font-black tracking-widest uppercase">
                NETFLIX DOCUMENTARY FEATURE
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>OFFICIAL HONORS</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {item.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl font-medium">
              {item.subtitle || badgeMeta.name}
            </p>

            {/* Quick Actions Row */}
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => onToggleMyList(item.id)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition-all"
              >
                {isInMyList ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
                <span>{isInMyList ? "In My List" : "Add to List"}</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="text-emerald-400 font-bold">{item.matchScore}% Match</span>
                <span>•</span>
                <span>{item.year}</span>
                <span>•</span>
                <span className="px-1.5 py-0.2 rounded border border-neutral-700 text-[10px] text-neutral-300">
                  {item.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="px-6 sm:px-10 border-b border-neutral-800 bg-[#141414] flex items-center gap-6 text-xs sm:text-sm font-bold overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("badge")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === "badge"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#E50914]" />
            <span>AI-Generated Badges</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("story")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === "story"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Detailed Event Story & Plot</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === "metrics"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Measured Impact & Jury Verdict</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("verification")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === "verification"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic Proof & Credentials</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="p-6 sm:p-10 space-y-8 bg-[#121212]">
          {/* TAB 1: AI-GENERATED BADGES */}
          {activeTab === "badge" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 3D Holographic AI Badge Card */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  style={{ perspective: "1000px" }}
                  className="w-full max-w-[340px]"
                  onMouseMove={handleMouseMoveBadge}
                  onMouseEnter={() => setIsBadgeHovered(true)}
                  onMouseLeave={() => {
                    setIsBadgeHovered(false);
                    setBadgeTilt({ x: 0, y: 0 });
                  }}
                >
                  <div
                    className="relative w-full aspect-[4/5] rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-6 border border-neutral-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(229,9,20,0.2)] flex flex-col items-center justify-between text-center overflow-hidden cursor-grab active:cursor-grabbing transition-transform"
                    style={{
                      transform: isBadgeHovered
                        ? `rotateY(${badgeTilt.x}deg) rotateX(${badgeTilt.y}deg) scale3d(1.03, 1.03, 1.03)`
                        : "rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
                      transformStyle: "preserve-3d",
                      transition: isBadgeHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
                    }}
                  >
                    {/* Animated Hologram Glow Aura */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_30%,rgba(229,9,20,0.35),transparent_70%)]"
                      style={{ transform: "translateZ(10px)" }}
                    />

                    {/* Specular Light Sweep */}
                    {isBadgeHovered && (
                      <div
                        className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white/25 to-transparent"
                        style={{
                          transform: `translateX(${badgeTilt.x * 5}px) translateY(${badgeTilt.y * 5}px)`,
                        }}
                      />
                    )}

                    {/* Badge Top Header */}
                    <div className="relative z-10 w-full flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-black/60 border border-neutral-700 text-neutral-300">
                        OFFICIAL AI BADGE
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        VERIFIED
                      </span>
                    </div>

                    {/* Center Emblem Visual: 3D Holographic Crest */}
                    <div
                      className="relative z-10 my-4 flex flex-col items-center"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/40 animate-[spin_20s_linear_infinite]" />
                        {/* Inner glowing orb */}
                        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-red-950 via-neutral-900 to-amber-950/40 border border-red-500/60 shadow-[0_0_25px_rgba(229,9,20,0.5)] flex items-center justify-center">
                          {item.id === "hackathon-winner" ? (
                            <Trophy className="w-14 h-14 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                          ) : item.id === "iit-roorkee" ? (
                            <Award className="w-14 h-14 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.6)]" />
                          ) : (
                            <Cpu className="w-14 h-14 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]" />
                          )}
                        </div>
                      </div>

                      {/* Tier Chip */}
                      <span className="mt-3 px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/60 text-[#E50914] text-[11px] font-mono font-bold tracking-widest shadow-sm">
                        {badgeMeta.tier}
                      </span>
                    </div>

                    {/* Badge Bottom Details */}
                    <div className="relative z-10 w-full" style={{ transform: "translateZ(20px)" }}>
                      <h4 className="text-sm font-bold text-white tracking-wide">{badgeMeta.name}</h4>
                      <p className="text-[11px] font-mono text-neutral-400 mt-1">{badgeMeta.issuer}</p>
                      <div className="mt-2 text-[9px] font-mono text-neutral-500 truncate bg-black/60 px-2 py-1 rounded border border-neutral-800">
                        {badgeMeta.verificationHash}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-400 mt-3 font-mono">
                  ✦ Move mouse to inspect 3D badge perspective & shine
                </span>
              </div>

              {/* Right Column: Badge Criteria & Verified Skills */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-wider">
                      VERIFICATION CRITERIA
                    </span>
                    <span className="text-xs font-mono text-neutral-400">4 / 4 Satisfied</span>
                  </div>
                  <div className="space-y-2.5">
                    {badgeMeta.criteria.map((cr, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">{cr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2.5">
                    COMPETENCIES PROVEN UNDER REVIEW
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {badgeMeta.skillsProven.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1.5 rounded-lg bg-black border border-neutral-700 text-xs text-neutral-200 font-medium hover:border-cyan-500/70 transition-colors"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Judge's Quote */}
                <div className="p-4 rounded-xl bg-neutral-900/70 border-l-4 border-amber-500 border-neutral-800 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                    JURY & PEER EVALUATION
                  </div>
                  <blockquote className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                    "{badgeMeta.judgeVerdict}"
                  </blockquote>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED EVENT STORY */}
          {activeTab === "story" && (
            <div className="space-y-6 max-w-4xl">
              {/* Challenge / Plot Tension */}
              <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                <div className="text-xs font-mono uppercase text-[#E50914] font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E50914]" />
                  <span>The High-Pressure Challenge / Plot Tension</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                  {item.detailedProblem || item.description}
                </p>
              </div>

              {/* Tactical Strategy & Architecture */}
              <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                <div className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Naman's Execution & Tactical Strategy</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                  {item.detailedContribution ||
                    "Coordinated agile development cycles, prompt iteration, front-end state wiring, and executive communication to ship a production-minded proof of concept."}
                </p>
              </div>

              {/* Technologies Leveraged */}
              <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-3">
                <div className="text-xs font-mono uppercase text-neutral-400 font-bold tracking-wider">
                  Frameworks & Tools Utilized
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs border border-neutral-700 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: METRICS & JURY VERDICT */}
          {activeTab === "metrics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badgeMeta.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center flex flex-col justify-center"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-white">{m.value}</span>
                    <span className="text-xs text-neutral-400 mt-1 font-mono">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Official Jury Synthesis</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  "{badgeMeta.judgeVerdict}"
                </p>
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span>Authorized by: {badgeMeta.issuer}</span>
                  <span className="text-emerald-400 font-mono font-bold">100% Unanimous Endorsement</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CRYPTOGRAPHIC PROOF & CREDENTIALS */}
          {activeTab === "verification" && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-sm text-white">Immutable Credential Ledger</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
                    STATUS: ACTIVE & VERIFIED
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-500">HONOR TITLE:</span>
                    <span className="text-white font-bold">{badgeMeta.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-500">ISSUING ENTITY:</span>
                    <span className="text-white">{badgeMeta.issuer}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-500">ISSUE DATE:</span>
                    <span className="text-white">{badgeMeta.issuedDate}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-500">BADGE CLASSIFICATION:</span>
                    <span className="text-[#E50914] font-bold">{badgeMeta.tier}</span>
                  </div>
                </div>

                {/* Hash Box */}
                <div className="p-3 rounded-lg bg-black border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 block font-mono">CRYPTOGRAPHIC FINGERPRINT</span>
                    <span className="text-xs font-mono text-cyan-300 break-all">{badgeMeta.verificationHash}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyHash}
                    className="ml-3 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors flex-shrink-0"
                  >
                    {copiedHash ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
