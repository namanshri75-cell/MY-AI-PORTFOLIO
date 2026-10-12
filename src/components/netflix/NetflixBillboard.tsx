import React, { useState } from "react";
import { Play, Info, Plus, Check, Volume2, VolumeX, Sparkles, Layers } from "lucide-react";
import { NetflixPoster } from "./NetflixPosters";
import { NetflixTitleItem } from "./NetflixModal";
import { netflixAudio } from "../../utils/netflixAudio";

interface NetflixBillboardProps {
  featuredItem: NetflixTitleItem;
  onPlayDemo: (item: NetflixTitleItem) => void;
  onMoreInfo: (item: NetflixTitleItem) => void;
  isInMyList: boolean;
  onToggleMyList: (id: string) => void;
}

export const NetflixBillboard: React.FC<NetflixBillboardProps> = ({
  featuredItem,
  onPlayDemo,
  onMoreInfo,
  isInMyList,
  onToggleMyList,
}) => {
  const [muted, setMuted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    netflixAudio.setMuted(next);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-[80vh] sm:h-[86vh] lg:h-[90vh] min-h-[580px] overflow-hidden select-none bg-black">
      {/* Cinematic Poster Backdrop */}
      <NetflixPoster id="billboard_hero" className="absolute inset-0 w-full h-full" variant="hero" />

      {/* Ambient Gradient Masks (Bottom & Left) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent w-full lg:w-3/4 pointer-events-none" />

      {/* Billboard Hero Content (Left Side) */}
      <div className="absolute bottom-14 sm:bottom-20 lg:bottom-24 left-4 sm:left-10 md:left-14 max-w-xl lg:max-w-2xl z-20 space-y-4">
        {/* Netflix Series Tag */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="font-black text-[#E50914] text-xl tracking-tighter drop-shadow-md">N</span>
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-white/80">
              SERIES
            </span>
          </div>
          <span className="text-neutral-500">•</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E50914]/20 border border-[#E50914]/50 text-[#E50914] text-xs font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
            <span>#1 IN AI APPLICATIONS TODAY</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          NAMAN SRIVASTAVA: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-red-400">
            THE AI ARCHITECT
          </span>
        </h1>

        {/* Synopsis */}
        <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed line-clamp-3 sm:line-clamp-4 max-w-xl drop-shadow">
          A BBA graduate turned AI operations builder. Blending Generative AI models, autonomous n8n workflows, and battle-tested technical support operations to solve real business bottlenecks.
        </p>

        {/* Meta Stats Badges with 3D Spatial Tag */}
        <div className="flex items-center gap-3 text-xs font-semibold text-neutral-300 pt-1 flex-wrap">
          <span className="text-emerald-400 font-bold">99% Match</span>
          <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] font-mono border border-neutral-700">
            TV-MA
          </span>
          <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] font-mono border border-neutral-700">
            4K ULTRA HD
          </span>
          <span className="px-2 py-0.5 rounded bg-[#E50914]/20 border border-[#E50914]/40 text-[10px] font-mono text-red-300 font-bold flex items-center gap-1 shadow-sm">
            <Layers className="w-3 h-3 text-[#E50914]" />
            <span>3D SPATIAL</span>
          </span>
          <span className="text-neutral-400">4 Seasons • 12 Modules</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5 pt-3 flex-wrap">
          <button
            onClick={() => {
              netflixAudio.playClick();
              onPlayDemo(featuredItem);
            }}
            type="button"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded bg-white hover:bg-neutral-200 text-black font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 shadow-xl"
          >
            <Play className="w-5 h-5 fill-black" />
            <span>Play Interactive Demo</span>
          </button>

          <button
            onClick={() => {
              netflixAudio.playClick();
              onMoreInfo(featuredItem);
            }}
            type="button"
            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded bg-[#505050]/70 hover:bg-[#505050] text-white font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>

          <button
            onClick={() => {
              netflixAudio.playClick();
              onToggleMyList(featuredItem.id);
            }}
            type="button"
            className="p-3 rounded-full border-2 border-neutral-400 hover:border-white bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all"
            title={isInMyList ? "In My List" : "Add to My List"}
          >
            {isInMyList ? <Check className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Right Side: Larger, Softly Blended 3D Interactive Portrait of Naman Srivastava */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden md:flex flex-col items-center absolute bottom-12 right-6 lg:right-16 xl:right-24 z-20 group"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Ambient red and cinematic volumetric aura glowing behind */}
          <div className="absolute -inset-6 bg-gradient-to-t from-[#E50914]/40 via-[#E50914]/15 to-transparent rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Large Softly Blended Portrait Container */}
          <div
            className="relative w-64 sm:w-72 lg:w-84 xl:w-96 aspect-[3/4.2] rounded-3xl overflow-hidden transition-all duration-700 group-hover:scale-[1.03] shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
            style={{
              // Radial & linear gradient blend masks seamlessly melting edges into the Netflix backdrop
              maskImage: "radial-gradient(ellipse 94% 90% at 52% 44%, black 62%, rgba(0,0,0,0.5) 82%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 94% 90% at 52% 44%, black 62%, rgba(0,0,0,0.5) 82%, transparent 100%)",
            }}
          >
            <img
              src="./naman_dp.jpg"
              alt="Naman Srivastava — Starring Lead"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
            />

            {/* Seamless Edge Blending Overlays */}
            {/* Bottom blend into Netflix background */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent pointer-events-none" />
            {/* Left blend into darkness */}
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#141414]/90 via-[#141414]/40 to-transparent pointer-events-none" />
            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#141414]/70 to-transparent pointer-events-none" />
            {/* Subtle cinematic red rim light */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E50914]/25 via-transparent to-transparent pointer-events-none" />

            {/* Moving 3D Specular Light Scan Sheen */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                transform: `translateX(${tilt.x * 3}px) translateY(${tilt.y * 3}px)`,
              }}
            />
          </div>

          {/* 3D Floating Badges Layer (Pops out in Z-space) */}
          <div
            className="absolute top-4 left-4 z-30 transition-transform duration-300"
            style={{ transform: "translateZ(35px)" }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-extrabold text-white shadow-2xl">
              <span className="text-[#E50914] font-black text-sm">N</span>
              <span className="tracking-wider uppercase">ORIGINAL LEAD</span>
            </div>
          </div>

          <div
            className="absolute top-4 right-4 z-30 transition-transform duration-300"
            style={{ transform: "translateZ(35px)" }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 text-[10px] font-bold text-emerald-300 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VERIFIED BUILDER</span>
            </div>
          </div>

          {/* Bottom Floating Character Label in 3D */}
          <div
            className="absolute bottom-6 left-6 right-6 z-30 text-left transition-transform duration-300 pointer-events-none"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="text-[11px] tracking-widest uppercase font-extrabold text-[#E50914] drop-shadow-md">
              STARRING LEAD
            </div>
            <div className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              Naman Srivastava
            </div>
            <div className="text-xs text-neutral-200 font-medium mt-1 drop-shadow flex items-center gap-1.5">
              <span>BBA Graduate</span>
              <span className="text-red-500">•</span>
              <span>AI Operations & Automation</span>
            </div>
          </div>
        </div>

        {/* Sub-tag underneath card */}
        <div className="mt-3.5 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-neutral-800 text-[11px] text-neutral-300 font-mono backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
          <span>PROVEN MULTI-DISCIPLINARY PROBLEM SOLVER</span>
        </div>
      </div>

      {/* Right Edge Maturity & Audio Rating Tab */}
      <div className="absolute bottom-6 sm:bottom-10 right-0 z-20 flex items-center gap-3 pr-4 sm:pr-10">
        <button
          onClick={toggleSound}
          type="button"
          aria-label={muted ? "Unmute audio" : "Mute audio"}
          className="p-2.5 rounded-full border border-neutral-500 bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <div className="bg-neutral-900/80 border-l-2 border-white px-3.5 py-1 text-xs font-mono font-bold text-neutral-300">
          TV-MA • AI OPERATIONS
        </div>
      </div>
    </div>
  );
};
