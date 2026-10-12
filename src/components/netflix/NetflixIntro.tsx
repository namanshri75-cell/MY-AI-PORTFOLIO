import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, FastForward } from "lucide-react";
import { netflixAudio } from "../../utils/netflixAudio";

interface NetflixIntroProps {
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ onComplete }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [needsUserTapForSound, setNeedsUserTapForSound] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Maximum fallback timeout in case video stalls or fails to end
  useEffect(() => {
    const maxTimeout = setTimeout(() => {
      handleFinish();
    }, 4500);

    return () => clearTimeout(maxTimeout);
  }, []);

  // Try playing video with audio on mount
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = isMuted;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Unmuted autoplay restricted by browser policy, muting for autoplay:", err);
        // If unmuted autoplay fails, mute and play, and prompt user
        vid.muted = true;
        setIsMuted(true);
        setNeedsUserTapForSound(true);
        vid.play().catch((e) => {
          console.warn("Autoplay completely prevented:", e);
          setVideoFailed(true);
        });
      });
    }
  }, []);

  const handleFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    // Soft audio fade out so TA-DUM finishes smoothly
    const vid = videoRef.current;
    if (vid && !vid.muted) {
      const fadeInterval = setInterval(() => {
        if (vid.volume > 0.15) {
          vid.volume = Math.max(0, vid.volume - 0.2);
        } else {
          clearInterval(fadeInterval);
        }
      }, 70);
    }

    setTimeout(() => {
      onComplete();
    }, 650);
  };

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
    setNeedsUserTapForSound(false);

    // Also sync netflixAudio engine
    netflixAudio.setMuted(nextMuted);
  };

  const handleUnmutePromptClick = () => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = false;
      setIsMuted(false);
      setNeedsUserTapForSound(false);
      vid.play().catch(() => {});
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out select-none backdrop-blur-md ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Exact Pinterest Video - https://pin.it/2xbfspzDZ */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src="/netflix_intro.mp4"
          playsInline
          autoPlay
          muted={isMuted}
          onCanPlay={() => setVideoLoaded(true)}
          onTimeUpdate={(e) => {
            const vid = e.currentTarget;
            if (vid.duration && vid.currentTime >= vid.duration - 0.45) {
              handleFinish();
            }
          }}
          onEnded={handleFinish}
          onError={() => {
            console.warn("Intro video error, falling back to procedural sequence");
            setVideoFailed(true);
          }}
          className={`w-full h-full object-contain transition-all duration-500 ${
            videoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            backgroundColor: "#000000",
          }}
        />
      )}

      {/* Fallback procedural intro if video fails to load or codec unsupported */}
      {videoFailed && (
        <div className="relative flex flex-col items-center justify-center animate-fadeIn">
          <div className="relative w-28 h-44 flex items-center justify-center">
            {/* Left Bar */}
            <div className="absolute top-0 bottom-0 left-0 w-7 bg-gradient-to-b from-[#b8050e] via-[#E50914] to-[#800006] rounded-xs shadow-[0_0_35px_rgba(229,9,20,0.8)] animate-pulse" />
            {/* Right Bar */}
            <div className="absolute top-0 bottom-0 right-0 w-7 bg-gradient-to-b from-[#b8050e] via-[#E50914] to-[#800006] rounded-xs shadow-[0_0_35px_rgba(229,9,20,0.8)] animate-pulse" />
            {/* Diagonal Bar */}
            <div
              className="absolute inset-0 z-10 bg-gradient-to-br from-[#ff1e2b] via-[#E50914] to-[#6b0207] shadow-[0_0_45px_rgba(229,9,20,0.9)]"
              style={{
                clipPath: "polygon(0 0, 26% 0, 100% 100%, 74% 100%)",
                filter: "drop-shadow(-8px 4px 12px rgba(0,0,0,0.95))",
              }}
            />
          </div>
          <div className="mt-8 tracking-[0.4em] text-xs font-bold text-red-500 uppercase">
            NAMANFLIX
          </div>
        </div>
      )}

      {/* Unmute prompt banner if browser muted autoplay */}
      {needsUserTapForSound && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={handleUnmutePromptClick}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-black/95 text-white text-xs border border-red-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all hover:scale-105 active:scale-95 animate-bounce"
          >
            <VolumeX className="w-4 h-4 text-red-500" />
            <span>Tap to unmute sound</span>
          </button>
        </div>
      )}

      {/* Bottom Controls: Sound Toggle and Skip Intro */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-3">
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isMuted ? "Unmute intro audio" : "Mute intro audio"}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all text-xs flex items-center gap-1.5 active:scale-95 hover:border-[#E50914]"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>

        <button
          onClick={handleFinish}
          type="button"
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 group hover:border-[#E50914] active:scale-95"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-red-400" />
        </button>
      </div>
    </div>
  );
};
