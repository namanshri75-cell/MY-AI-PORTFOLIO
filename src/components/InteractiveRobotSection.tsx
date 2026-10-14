import React from "react";
import { SplineSceneBasic } from "@/components/ui/demo";
import { Sparkles } from "lucide-react";

export const InteractiveRobotSection: React.FC = () => {
  return (
    <section id="robot" className="relative py-16 lg:py-24 w-full border-t border-white/10 bg-[#060608]">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-neutral-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>[SYS/01.B] 3D INTERACTIVE ROBOT • AI OPERATIONS CORE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Interactive 3D Robot
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl font-mono">
            Cursor-guided 3D model with real-time performance telemetry, spotlight tracking, and zoom controls.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <SplineSceneBasic className="w-full max-w-5xl h-[440px] sm:h-[520px] lg:h-[580px] shadow-2xl" />
        </div>
      </div>
    </section>
  );
};

export default InteractiveRobotSection;
