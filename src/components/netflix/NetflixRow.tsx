import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Check, ThumbsUp, ChevronDown } from "lucide-react";
import { NetflixPoster } from "./NetflixPosters";
import { NetflixTitleItem } from "./NetflixModal";
import { netflixAudio } from "../../utils/netflixAudio";

interface NetflixRowProps {
  title: string;
  items: NetflixTitleItem[];
  isTop10?: boolean;
  onSelectTitle: (item: NetflixTitleItem) => void;
  myListIds: string[];
  onToggleMyList: (id: string) => void;
}

interface MovieCard3DProps {
  item: NetflixTitleItem;
  inList: boolean;
  onSelect: () => void;
  onToggleList: () => void;
  className?: string;
}

const MovieCard3D: React.FC<MovieCard3DProps> = ({
  item,
  inList,
  onSelect,
  onToggleList,
  className = "",
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className={`relative select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={onSelect}
        className="relative aspect-video rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 transition-all duration-300 ease-out cursor-pointer shadow-lg hover:border-red-500/80 hover:shadow-[0_20px_45px_rgba(229,9,20,0.35),0_10px_20px_rgba(0,0,0,0.8)]"
        style={{
          transform: isHovered
            ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.08, 1.08, 1.08) translateZ(15px)`
            : "rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        }}
      >
        <NetflixPoster id={item.id} className="w-full h-full" />

        {/* 3D Specular Light Glare Reflection Following Mouse */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-opacity"
            style={{
              transform: `translateX(${tilt.x * 4}px) translateY(${tilt.y * 4}px)`,
            }}
          />
        )}

        {/* 3D Interactive Hover Quick Action Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity flex flex-col justify-between p-3 ${
            isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ transform: "translateZ(25px)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-emerald-400 drop-shadow">
              {item.matchScore}% Match
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-neutral-300 border border-neutral-700">
              {item.rating}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              type="button"
              className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg"
              title="Play demo"
            >
              <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleList();
              }}
              type="button"
              className="w-7 h-7 rounded-full border border-neutral-400 bg-neutral-900/80 text-white flex items-center justify-center hover:border-white hover:scale-110 active:scale-95 transition-all shadow"
              title={inList ? "In My List" : "Add to My List"}
            >
              {inList ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              type="button"
              className="w-7 h-7 rounded-full border border-neutral-400 bg-neutral-900/80 text-white flex items-center justify-center hover:border-white hover:scale-110 transition-all ml-auto"
              title="More info"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NetflixRow: React.FC<NetflixRowProps> = ({
  title,
  items,
  isTop10 = false,
  onSelectTitle,
  myListIds,
  onToggleMyList,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    netflixAudio.playClick();
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="relative my-6 sm:my-8 px-4 sm:px-10 group/row">
      {/* Row Title */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide flex items-center gap-2 group-hover/row:text-red-500 transition-colors">
          <span>{title}</span>
          <ChevronRight className="w-5 h-5 text-red-500 opacity-0 group-hover/row:opacity-100 transition-opacity" />
        </h2>
      </div>

      {/* Row Container with Left/Right Nav Paddles */}
      <div className="relative">
        {/* Left Paddle */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll("left")}
            type="button"
            aria-label="Scroll left"
            className="absolute -left-3 sm:-left-6 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 rounded-r shadow-2xl backdrop-blur-sm"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {/* Right Paddle */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll("right")}
            type="button"
            aria-label="Scroll right"
            className="absolute -right-3 sm:-right-6 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 rounded-l shadow-2xl backdrop-blur-sm"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}

        {/* Horizontal Scroll Track with 3D Depth */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-5 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => {
            const inList = myListIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`relative flex-shrink-0 cursor-pointer ${
                  isTop10 ? "w-64 sm:w-72" : "w-56 sm:w-64 md:w-72"
                }`}
              >
                {/* TOP 10 3D EXTRUDED RANK NUMBER GRAPHIC */}
                {isTop10 && (
                  <div className="flex items-end">
                    <div
                      className="font-black select-none pointer-events-none text-neutral-800 text-8xl sm:text-9xl leading-none tracking-tighter"
                      style={{
                        WebkitTextStroke: "4px #595959",
                        textShadow:
                          "3px 3px 0 #2b2b2b, 6px 6px 0 #181818, 10px 10px 25px rgba(0,0,0,0.95)",
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Movie Card overlapping the number with 3D tilt */}
                    <MovieCard3D
                      item={item}
                      inList={inList}
                      onSelect={() => onSelectTitle(item)}
                      onToggleList={() => onToggleMyList(item.id)}
                      className="-ml-6 sm:-ml-8 flex-1"
                    />
                  </div>
                )}

                {/* STANDARD CARD (Non-Top 10) with 3D Tilt */}
                {!isTop10 && (
                  <MovieCard3D
                    item={item}
                    inList={inList}
                    onSelect={() => onSelectTitle(item)}
                    onToggleList={() => onToggleMyList(item.id)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
