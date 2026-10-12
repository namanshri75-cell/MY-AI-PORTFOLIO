import React, { useEffect, useState } from "react";

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background track subtle glow when active */}
      <div
        className="h-full relative transition-[width] duration-75 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
          boxShadow:
            scrollProgress > 0
              ? "0 0 10px rgba(59, 130, 246, 0.6), 0 0 4px rgba(6, 182, 212, 0.8)"
              : "none",
        }}
      >
        {/* Leading tip glow beacon */}
        {scrollProgress > 0 && (
          <span
            className="absolute top-1/2 -right-[2px] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-[0_0_8px_#38bdf8,0_0_12px_#818cf8] opacity-90 animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};
