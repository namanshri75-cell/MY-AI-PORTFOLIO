import React from "react";

/**
 * 3D Ambient Spatial Atmosphere for Netflix Mode
 * Adds subtle floating 3D glass prisms, orbital rings, and volumetric cinema glow
 */
export const Netflix3DAmbient: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
      style={{ perspective: "1400px" }}
    >
      {/* 3D Floating Ruby Prism 1 (Top Right) */}
      <div
        className="absolute top-[18%] -right-12 w-48 h-48 opacity-25 lg:opacity-40"
        style={{
          transformStyle: "preserve-3d",
          animation: "float3d-slow 24s ease-in-out infinite alternate",
        }}
      >
        <div
          className="w-full h-full rounded-3xl border border-red-500/40 bg-gradient-to-br from-red-600/20 via-black/40 to-red-950/20 backdrop-blur-md shadow-[0_0_50px_rgba(229,9,20,0.3)]"
          style={{
            transform: "rotateX(25deg) rotateY(-35deg) rotateZ(15deg)",
          }}
        />
        {/* Internal 3D Floating Ring */}
        <div
          className="absolute inset-4 rounded-full border border-red-400/30"
          style={{
            transform: "translateZ(30px) rotateX(45deg)",
          }}
        />
      </div>

      {/* 3D Floating Glass Orb 2 (Middle Left) */}
      <div
        className="absolute top-[48%] -left-16 w-56 h-56 opacity-20 lg:opacity-35"
        style={{
          transformStyle: "preserve-3d",
          animation: "float3d-reverse 28s ease-in-out infinite alternate",
        }}
      >
        <div
          className="w-full h-full rounded-full border border-red-500/30 bg-gradient-to-tr from-black/80 via-red-900/15 to-transparent backdrop-blur-sm shadow-[0_0_60px_rgba(229,9,20,0.2)]"
          style={{
            transform: "rotateY(40deg) rotateX(-20deg)",
          }}
        />
        <div
          className="absolute inset-8 rounded-full border border-white/10"
          style={{
            transform: "translateZ(40px) rotateY(-30deg)",
          }}
        />
      </div>

      {/* 3D Floating Isometric Cube (Lower Right) */}
      <div
        className="absolute top-[75%] right-8 w-36 h-36 opacity-15 lg:opacity-30"
        style={{
          transformStyle: "preserve-3d",
          animation: "float3d-slow 20s ease-in-out infinite alternate-reverse",
        }}
      >
        <div
          className="w-full h-full rounded-2xl border border-red-600/30 bg-gradient-to-b from-red-950/30 via-black to-red-900/10 backdrop-blur-sm shadow-[0_0_40px_rgba(229,9,20,0.25)]"
          style={{
            transform: "rotateX(55deg) rotateZ(45deg) translateZ(10px)",
          }}
        />
      </div>

      {/* Volumetric Radial Cinema Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[300px] bg-red-900/5 rounded-full blur-[120px]" />

      <style>{`
        @keyframes float3d-slow {
          0% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(-25px) rotateX(15deg) rotateY(20deg);
          }
          100% {
            transform: translateY(15px) rotateX(-10deg) rotateY(-15deg);
          }
        }
        @keyframes float3d-reverse {
          0% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(30px) rotateX(-15deg) rotateY(-25deg);
          }
          100% {
            transform: translateY(-20px) rotateX(10deg) rotateY(15deg);
          }
        }
      `}</style>
    </div>
  );
};
