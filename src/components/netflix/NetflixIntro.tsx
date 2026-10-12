import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, FastForward, Play, Sparkles } from "lucide-react";
import { netflixAudio } from "../../utils/netflixAudio";
import netflixIntroVideo from "../../assets/netflix_intro.mp4";

interface NetflixIntroProps {
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ onComplete }) => {
  // Start muted to ensure 100% guaranteed autoplay compliance across all browsers (Chrome, Safari, iOS, GitHub Pages)
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsUserTapToPlay, setNeedsUserTapToPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasFinishedRef = useRef(false);

  // Compute base-relative public fallback URL
  const publicVideoUrl = `${import.meta.env.BASE_URL || "./"}netflix_intro.mp4`.replace(
    /([^:]\/)\/+/g,
    "$1"
  );

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
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
  }, [onComplete]);

  // Attempt video playback on mount
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Safety timeout in case video stalls or fails on very slow connections
    const maxTimeout = setTimeout(() => {
      handleFinish();
    }, 5500);

    // Initial attempt: try unmuted first (works if user has interacted with page)
    vid.muted = false;
    vid.playsInline = true;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setNeedsUserTapToPlay(false);
        })
        .catch(() => {
          // Unmuted autoplay blocked by browser policy (standard on GitHub Pages / fresh visits)
          // Mute and replay immediately — browsers always permit muted autoplay
          vid.muted = true;
          setIsMuted(true);
          vid
            .play()
            .then(() => {
              setIsPlaying(true);
              setNeedsUserTapToPlay(false);
            })
            .catch((e) => {
              console.warn("Autoplay waiting for user touch gesture:", e);
              // Video is ready, waiting for single tap
              setNeedsUserTapToPlay(true);
            });
        });
    }

    return () => clearTimeout(maxTimeout);
  }, [handleFinish]);

  // Screen click or interaction handler: un-mutes and plays immediately
  const handleScreenClick = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.muted = false;
      setIsMuted(false);
      vid.play().then(() => {
        setIsPlaying(true);
        setNeedsUserTapToPlay(false);
      }).catch(() => {
        vid.muted = true;
        vid.play();
      });
    } else if (vid.muted) {
      // Unmute on tap
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

    if (!nextMuted && vid.paused) {
      vid.play().catch(() => {});
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFinish();
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out select-none cursor-pointer ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Netflix Cinematic Video with multiple robust fallback sources */}
      {!videoFailed && (
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted={isMuted}
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          onPlaying={() => setIsPlaying(true)}
          onTimeUpdate={(e) => {
            const vid = e.currentTarget;
            if (vid.duration && vid.currentTime >= vid.duration - 0.35) {
              handleFinish();
            }
          }}
          onEnded={handleFinish}
          onError={() => {
            console.warn("HTML5 video error, engaging synthesized 3D fallback intro");
            setVideoFailed(true);
            netflixAudio.playTadum();
          }}
          className={`w-full h-full object-contain transition-all duration-500 ${
            videoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            backgroundColor: "#000000",
          }}
        >
          {/* 1. Bundled Vite Asset (Highest priority - hashed & relative, guaranteed on GitHub Pages) */}
          <source src={netflixIntroVideo} type="video/mp4" />
          {/* 2. Public base-relative URL */}
          <source src={publicVideoUrl} type="video/mp4" />
          {/* 3. Direct relative fallback */}
          <source src="./netflix_intro.mp4" type="video/mp4" />
          {/* 4. Root fallback */}
          <source src="/netflix_intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback procedural intro if video cannot decode on device */}
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
          <div className="mt-8 tracking-[0.4em] text-xs font-bold text-red-500 uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NAMANFLIX</span>
          </div>
        </div>
      )}

      {/* Tap to Play prompt if strict mobile browser blocked autoplay */}
      {needsUserTapToPlay && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs">
          <button
            onClick={handleScreenClick}
            type="button"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#E50914] hover:bg-red-600 text-white font-black text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(229,9,20,0.8)] transition-all hover:scale-105 active:scale-95 animate-pulse"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Tap to Play Intro</span>
          </button>
        </div>
      )}

      {/* Unmute prompt banner if video is playing muted */}
      {!needsUserTapToPlay && isMuted && isPlaying && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={toggleSound}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-black/95 text-white text-xs border border-red-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all hover:scale-105 active:scale-95 animate-bounce"
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
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all text-xs flex items-center gap-1.5 active:scale-95 hover:border-[#E50914]"
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
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 group hover:border-[#E50914] active:scale-95"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-red-400" />
        </button>
      </div>
    </div>
  );
};
