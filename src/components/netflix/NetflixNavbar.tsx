import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, Check, FileDown, ExternalLink, Sparkles, X, Undo2, Clapperboard, Volume2, Volume1, VolumeX } from "lucide-react";
import { PERSONAL_INFO } from "../../data/portfolioData";
import { generateResumePDF } from "../../utils/resumePdf";
import { netflixAudio } from "../../utils/netflixAudio";

interface NetflixNavbarProps {
  onSwitchToClassic: () => void;
  onReplayIntro?: () => void;
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
}

export const NetflixNavbar: React.FC<NetflixNavbarProps> = ({
  onSwitchToClassic,
  onReplayIntro,
  onSearchQueryChange,
  searchQuery,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Netflix BGM Soundtrack state (Muted by default per user requirement)
  const [bgmState, setBgmState] = useState(() => netflixAudio.getBgmState());

  useEffect(() => {
    const unsub = netflixAudio.subscribe((state) => {
      setBgmState(state);
    });
    return unsub;
  }, []);

  const handleToggleSound = () => {
    netflixAudio.playClick();
    netflixAudio.toggleBgm();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    netflixAudio.setBgmVolume(vol);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    netflixAudio.playClick();
    const next = !searchOpen;
    setSearchOpen(next);
    if (next) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    } else {
      onSearchQueryChange("");
    }
  };

  const scrollTo = (id: string) => {
    netflixAudio.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl py-3 border-b border-neutral-900"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-10 flex items-center justify-between">
        {/* Left Side: Brand & Nav Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          {/* Namanflix Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
            className="flex items-center gap-1.5 select-none text-left group"
          >
            <span className="text-[#E50914] font-black text-2xl sm:text-3xl tracking-tighter drop-shadow-[0_0_12px_rgba(229,9,20,0.6)]">
              NAMANFLIX
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs lg:text-sm font-medium text-neutral-300">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white font-bold transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("netflix-top10")}
              className="hover:text-white transition-colors"
            >
              Top 10 Series
            </button>
            <button
              onClick={() => scrollTo("netflix-projects")}
              className="hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo("netflix-achievements")}
              className="hover:text-white transition-colors"
            >
              Achievements
            </button>
            <button
              onClick={() => scrollTo("netflix-experience")}
              className="hover:text-white transition-colors"
            >
              Career Seasons
            </button>
            <button
              onClick={() => scrollTo("netflix-genres")}
              className="hover:text-white transition-colors"
            >
              Genres (Skills)
            </button>
            <button
              onClick={() => scrollTo("netflix-contact")}
              className="hover:text-white text-[#E50914] font-semibold transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cast Naman</span>
            </button>
          </nav>
        </div>

        {/* Right Side: Sound Controller, Search, Notifications, Avatar, Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Netflix Interstellar (Cornfield Chase) Soundtrack & Cool Volume Adjuster (Muted by default) */}
          <div className="flex items-center">
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 border ${
                !bgmState.isMuted
                  ? "bg-red-950/40 border-[#E50914]/60 shadow-[0_0_18px_rgba(229,9,20,0.35)] ring-1 ring-red-500/20"
                  : "bg-black/60 border-neutral-800 hover:border-neutral-700 backdrop-blur-md"
              }`}
            >
              {/* Sound Mute/Unmute Toggle Button */}
              <button
                onClick={handleToggleSound}
                type="button"
                aria-label={bgmState.isMuted ? "Turn on Netflix Soundtrack" : "Mute Netflix Soundtrack"}
                title={
                  bgmState.isMuted
                    ? "Turn on Interstellar (Cornfield Chase) on loop (Muted by default)"
                    : "Interstellar (Cornfield Chase) playing on loop • Click to Mute"
                }
                className={`p-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  !bgmState.isMuted
                    ? "text-[#E50914] hover:scale-110 active:scale-95"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {bgmState.isMuted ? (
                  <VolumeX className="w-4 h-4 text-neutral-400 hover:text-red-400 transition-colors" />
                ) : bgmState.volume < 0.35 ? (
                  <Volume1 className="w-4 h-4 text-[#E50914] animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#E50914] animate-pulse" />
                )}

                {/* Animated visualizer pulse dots when unmuted and playing */}
                {!bgmState.isMuted && (
                  <span className="hidden md:flex items-end gap-0.5 h-3 ml-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-[#E50914] rounded-full animate-bounce h-2" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 bg-[#E50914] rounded-full animate-bounce h-3" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 bg-[#E50914] rounded-full animate-bounce h-1.5" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
              </button>

              {/* Cool Volume Adjuster Slider (Disabled when muted) */}
              <div
                className={`flex items-center gap-1.5 transition-all duration-300 ${
                  bgmState.isMuted
                    ? "opacity-30 cursor-not-allowed pointer-events-none"
                    : "opacity-100"
                }`}
                title={
                  bgmState.isMuted
                    ? "Volume adjuster disabled while muted (Turn on sound to adjust)"
                    : `Volume: ${Math.round(bgmState.volume * 100)}%`
                }
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  disabled={bgmState.isMuted}
                  value={bgmState.isMuted ? 0 : bgmState.volume}
                  onChange={handleVolumeChange}
                  aria-label="Soundtrack Volume Adjuster"
                  className={`w-14 sm:w-18 md:w-24 h-1.5 rounded-lg appearance-none cursor-pointer transition-all ${
                    bgmState.isMuted
                      ? "bg-neutral-800 cursor-not-allowed"
                      : "bg-neutral-700 accent-[#E50914] hover:accent-red-500"
                  }`}
                  style={{
                    background: bgmState.isMuted
                      ? "#262626"
                      : `linear-gradient(to right, #E50914 ${bgmState.volume * 100}%, #404040 ${bgmState.volume * 100}%)`,
                  }}
                />
                <span
                  className={`text-[10px] font-mono select-none min-w-[26px] text-right font-semibold ${
                    bgmState.isMuted ? "text-neutral-600" : "text-neutral-300"
                  }`}
                >
                  {bgmState.isMuted ? "OFF" : `${Math.round(bgmState.volume * 100)}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-black/80 border border-white/30 rounded px-2.5 py-1 transition-all w-44 sm:w-64">
                <Search className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  placeholder="Titles, skills, roles..."
                  className="bg-transparent text-white text-xs placeholder-neutral-500 focus:outline-none w-full"
                />
                <button
                  onClick={toggleSearch}
                  className="text-neutral-400 hover:text-white ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleSearch}
                aria-label="Search titles"
                className="p-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                netflixAudio.playClick();
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              aria-label="Notifications"
              className="relative p-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E50914] ring-2 ring-black" />
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-[#141414] border border-neutral-800 rounded-lg shadow-2xl p-4 space-y-3 z-50 text-xs text-neutral-200">
                <div className="font-bold text-white text-sm pb-2 border-b border-neutral-800 flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="text-[10px] font-mono text-[#E50914]">3 New</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2 rounded bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors">
                    <div className="font-bold text-amber-400">🏆 Hackathon Winner</div>
                    <div className="text-[11px] text-neutral-300">
                      Rapid prototyping & sprint champion milestone documented.
                    </div>
                  </div>
                  <div className="p-2 rounded bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors">
                    <div className="font-bold text-sky-400">🎙️ IIT Roorkee Speaker</div>
                    <div className="text-[11px] text-neutral-300">
                      AI emerging concepts presentation honored.
                    </div>
                  </div>
                  <div className="p-2 rounded bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors">
                    <div className="font-bold text-emerald-400">⚡ Status: BBA Graduate</div>
                    <div className="text-[11px] text-neutral-300">
                      Available for AI Applications & Automation Roles.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu (MUST USE Naman's actual photo ./naman_dp.jpg) */}
          <div className="relative">
            <button
              onClick={() => {
                netflixAudio.playClick();
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-1.5 p-0.5 rounded hover:ring-2 hover:ring-white/40 transition-all"
            >
              <div className="w-8 h-8 rounded overflow-hidden border border-neutral-700 shadow flex-shrink-0 bg-neutral-800">
                <img
                  src="./naman_dp.jpg"
                  alt="Naman Srivastava"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* Profile Menu Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-[#141414] border border-neutral-800 rounded-lg shadow-2xl p-3 z-50 text-xs">
                {/* Active Profile */}
                <div className="flex items-center gap-3 p-2 rounded bg-neutral-900/80 mb-2">
                  <img
                    src="./naman_dp.jpg"
                    alt="Naman"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded object-cover object-top border border-[#E50914]"
                  />
                  <div>
                    <div className="font-bold text-white text-xs">Naman Srivastava</div>
                    <div className="text-[10px] text-neutral-400">BBA Graduate • AI Ops</div>
                  </div>
                </div>

                <div className="space-y-1 pt-1 border-t border-neutral-800 text-neutral-300">
                  <button
                    onClick={() => {
                      generateResumePDF();
                      setProfileOpen(false);
                    }}
                    className="w-full px-2.5 py-2 text-left rounded hover:bg-neutral-800 flex items-center justify-between text-xs"
                  >
                    <span>Download Official Resume</span>
                    <FileDown className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-2.5 py-2 text-left rounded hover:bg-neutral-800 flex items-center justify-between text-xs"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-2.5 py-2 text-left rounded hover:bg-neutral-800 flex items-center justify-between text-xs"
                  >
                    <span>GitHub Repositories</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>

                  {/* Interstellar (Cornfield Chase) Soundtrack Toggle & Volume Slider */}
                  <div className="flex flex-col gap-1.5 p-2 rounded bg-neutral-900/80 border border-neutral-800">
                    <button
                      onClick={() => {
                        handleToggleSound();
                      }}
                      type="button"
                      className="w-full text-left rounded flex items-center justify-between text-xs cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        {bgmState.isMuted ? (
                          <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-[#E50914] animate-pulse" />
                        )}
                        <span>Soundtrack (Cornfield Chase)</span>
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-[#E50914]">
                        {bgmState.isMuted ? "MUTED" : `${Math.round(bgmState.volume * 100)}%`}
                      </span>
                    </button>
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        disabled={bgmState.isMuted}
                        value={bgmState.isMuted ? 0 : bgmState.volume}
                        onChange={handleVolumeChange}
                        aria-label="Mobile Soundtrack Volume Adjuster"
                        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer transition-all ${
                          bgmState.isMuted ? "bg-neutral-800 opacity-30 cursor-not-allowed pointer-events-none" : "accent-[#E50914]"
                        }`}
                        style={{
                          background: bgmState.isMuted
                            ? "#262626"
                            : `linear-gradient(to right, #E50914 ${bgmState.volume * 100}%, #404040 ${bgmState.volume * 100}%)`,
                        }}
                      />
                    </div>
                  </div>

                  {onReplayIntro && (
                    <button
                      onClick={() => {
                        netflixAudio.playClick();
                        setProfileOpen(false);
                        onReplayIntro();
                      }}
                      className="w-full px-2.5 py-2 text-left rounded hover:bg-neutral-800 text-white font-medium flex items-center justify-between text-xs"
                    >
                      <span className="flex items-center gap-1.5">
                        <Clapperboard className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>Replay Netflix Intro (TA-DUM)</span>
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onSwitchToClassic();
                    }}
                    className="w-full px-2.5 py-2 text-left rounded hover:bg-red-950/40 text-red-400 font-bold flex items-center justify-between text-xs mt-1 border-t border-neutral-800/80"
                  >
                    <span>Exit Netflix Theme</span>
                    <Undo2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prominent Switch to Classic Theme Button */}
          <button
            onClick={() => {
              netflixAudio.playClick();
              onSwitchToClassic();
            }}
            type="button"
            className="px-3 sm:px-4 py-1.5 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 hover:border-neutral-500 transition-all flex items-center gap-1.5 shadow"
          >
            <Undo2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Classic Portfolio</span>
            <span className="sm:hidden">Classic</span>
          </button>
        </div>
      </div>
    </header>
  );
};
