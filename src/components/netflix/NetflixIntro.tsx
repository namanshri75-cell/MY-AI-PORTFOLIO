import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, FastForward, Play, Sparkles } from "lucide-react";
import { netflixAudio } from "../../utils/netflixAudio";
import { resolvePublicAsset } from "../../utils/resolveAsset";
import netflixIntroVideo from "../../assets/netflix_intro.mp4";

interface NetflixIntroProps {
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ onComplete }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsUserTap, setNeedsUserTap] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [useProceduralFallback, setUseProceduralFallback] = useState(false);

  // Candidate sources in order of resilience
  const candidateSources = React.useMemo(() => [
    resolvePublicAsset("netflix_intro.mp4"),
    netflixIntroVideo,
    "./netflix_intro.mp4",
    "/netflix_intro.mp4",
  ], []);

  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasFinishedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFadingOut(true);

    // Gently lower volume before unmount
    const vid = videoRef.current;
    if (vid && !vid.muted) {
      const fadeInterval = setInterval(() => {
        if (vid.volume > 0.15) {
          vid.volume = Math.max(0, vid.volume - 0.2);
        } else {
          clearInterval(fadeInterval);
        }
      }, 60);
    }

    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Handle video error by trying next candidate source
  const handleVideoError = () => {
    if (currentSourceIndex + 1 < candidateSources.length) {
      console.warn(
        `Video source ${candidateSources[currentSourceIndex]} failed, trying next fallback: ${candidateSources[currentSourceIndex + 1]}`
      );
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      console.warn("All video sources failed, activating procedural Netflix intro fallback");
      setUseProceduralFallback(true);
      netflixAudio.playTadum();
    }
  };

  // Attempt playback on mount or source change
  useEffect(() => {
    if (useProceduralFallback) {
      const proceduralTimer = setTimeout(() => {
        handleFinish();
      }, 3500);
      return () => clearTimeout(proceduralTimer);
    }

    const vid = videoRef.current;
    if (!vid) return;

    // Generous fallback safety timeout
    const safetyTimeout = setTimeout(() => {
      handleFinish();
    }, 12000);

    vid.playsInline = true;

    // Try unmuted playback first (works reliably when user switched themes via click)
    vid.muted = false;
    const playPromise = vid.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setNeedsUserTap(false);
        })
        .catch(() => {
          // Autoplay policy prevented unmuted playback.
          // Switch to muted immediately: muted playback is always permitted.
          vid.muted = true;
          setIsMuted(true);
          vid
            .play()
            .then(() => {
              setIsPlaying(true);
              setNeedsUserTap(false);
            })
            .catch(() => {
              // Both unmuted and muted autoplay restricted by device (e.g. strict low-power mode)
              setNeedsUserTap(true);
            });
        });
    }

    return () => clearTimeout(safetyTimeout);
  }, [currentSourceIndex, useProceduralFallback, handleFinish]);

  // Screen click or interaction: instantly unmute and play
  const handleScreenInteraction = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.muted = false;
      setIsMuted(false);
      vid
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsUserTap(false);
        })
        .catch(() => {
          vid.muted = true;
          vid.play();
        });
    } else if (vid.muted) {
      vid.muted = false;
      setIsMuted(false);
      netflixAudio.playTadum();
    }
  };

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
    netflixAudio.setMuted(nextMuted);

    if (!nextMuted) {
      if (vid.paused) vid.play().catch(() => {});
      netflixAudio.playTadum();
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFinish();
  };

  return (
    <div
      onClick={handleScreenInteraction}
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out select-none cursor-pointer ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* HTML5 Netflix Cinematic MP4 Video */}
      {!useProceduralFallback && (
        <video
          ref={videoRef}
          src={candidateSources[currentSourceIndex]}
          playsInline
          autoPlay
          muted={isMuted}
          preload="auto"
          onPlaying={() => {
            setIsPlaying(true);
            setNeedsUserTap(false);
          }}
          onTimeUpdate={(e) => {
            const vid = e.currentTarget;
            if (vid.duration && vid.currentTime >= vid.duration - 0.25) {
              handleFinish();
            }
          }}
          onEnded={handleFinish}
          onError={handleVideoError}
          className="w-full h-full object-contain bg-black"
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
          }}
        />
      )}

      {/* Synthetic Animated 3D Fallback if video file cannot decode */}
      {useProceduralFallback && (
        <div className="relative flex flex-col items-center justify-center animate-fadeIn">
          <div className="relative w-28 h-44 flex items-center justify-center">
            {/* Left Bar */}
            <div className="absolute top-0 bottom-0 left-0 w-7 bg-gradient-to-b from-[#b8050e] via-[#E50914] to-[#800006] rounded-xs shadow-[0_0_35px_rgba(229,9,20,0.8)] animate-pulse" />
            {/* Right Bar */}
            <div className="absolute top-0 bottom-0 right-0 w-7 bg-gradient-to-b from-[#b8050e] via-[#E50914] to-[#800006] rounded-xs shadow-[0_0_35px_rgba(229,9,20,0.8)] animate-pulse" />
            {/* Diagonal Ribbon */}
            <div
              className="absolute inset-0 z-10 bg-gradient-to-br from-[#ff1e2b] via-[#E50914] to-[#6b0207] shadow-[0_0_45px_rgba(229,9,20,0.9)]"
              style={{
                clipPath: "polygon(0 0, 26% 0, 100% 100%, 74% 100%)",
                filter: "drop-shadow(-8px 4px 12px rgba(0,0,0,0.95))",
              }}
            />
          </div>
          <div className="mt-8 tracking-[0.4em] text-xs font-bold text-red-500 uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NAMANFLIX</span>
          </div>
        </div>
      )}

      {/* Tap to Play prompt if mobile browser blocked initial autoplay */}
      {needsUserTap && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs">
          <button
            onClick={handleScreenInteraction}
            type="button"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#E50914] hover:bg-red-600 text-white font-black text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(229,9,20,0.8)] transition-all hover:scale-105 active:scale-95 animate-pulse cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Tap to Play Netflix Intro</span>
          </button>
        </div>
      )}

      {/* Unmute prompt banner if video is playing in muted mode */}
      {!needsUserTap && isMuted && isPlaying && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={toggleSound}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 hover:bg-black text-white text-xs border border-red-500/60 backdrop-blur-md shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all hover:scale-105 active:scale-95 animate-bounce cursor-pointer"
          >
            <VolumeX className="w-4 h-4 text-red-500" />
            <span>Tap to unmute sound (TA-DUM)</span>
          </button>
        </div>
      )}

      {/* Bottom Controls: Sound Toggle and Skip Intro */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-3 pointer-events-auto">
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isMuted ? "Unmute intro audio" : "Mute intro audio"}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all text-xs flex items-center gap-1.5 active:scale-95 hover:border-[#E50914] cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>

        <button
          onClick={handleSkip}
          type="button"
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 group hover:border-[#E50914] active:scale-95 cursor-pointer"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-red-400" />
        </button>
      </div>
    </div>
  );
};
