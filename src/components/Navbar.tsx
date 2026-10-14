import React, { useState, useEffect } from "react";
import { Menu, X, FileDown, ArrowUpRight, Volume2, Volume1, VolumeX } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { generateResumePDF } from "../utils/resumePdf";
import { netflixAudio } from "../utils/netflixAudio";

interface NavbarProps {
  onOpenResumePreview?: () => void;
  onSwitchToNetflix?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumePreview, onSwitchToNetflix }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Global soundtrack state (Interstellar - Cornfield Chase, muted by default on site visit)
  const [bgmState, setBgmState] = useState(() => netflixAudio.getBgmState());

  useEffect(() => {
    const unsub = netflixAudio.subscribe((state) => {
      setBgmState(state);
    });
    return unsub;
  }, []);

  const handleToggleSound = () => {
    netflixAudio.toggleBgm();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    netflixAudio.setBgmVolume(vol);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievements", href: "#achievements" },
    { label: "Education", href: "#education" },
    { label: "Why AI?", href: "#why-ai" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#040406]/92 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Candidate Identity — Sharp Gold Box */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
          >
            <div className="relative w-9 h-9 2xl:w-10 2xl:h-10 rounded-none overflow-hidden border border-amber-400 shadow-[0_0_12px_rgba(212,175,55,0.35)] flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="./naman_dp.jpg"
                alt="Naman Srivastava"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs sm:text-sm 2xl:text-base tracking-wider text-white group-hover:text-amber-300 transition-colors truncate">
                NAMAN SRIVASTAVA
              </span>
              <span className="text-[10px] 2xl:text-[11px] font-mono text-amber-400/90 flex items-center gap-1.5 truncate max-w-[170px] min-[380px]:max-w-[220px] sm:max-w-none">
                <span className="w-1.5 h-1.5 rounded-none bg-amber-400 animate-pulse flex-shrink-0" />
                <span className="truncate">AI Applications & Automation</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links — Sharp Obsidian & Gold */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 bg-[#08080a]/80 border border-amber-500/25 rounded-none px-3 xl:px-4 2xl:px-5 py-1.5 2xl:py-2 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-2.5 xl:px-3 2xl:px-3.5 py-1 2xl:py-1.5 text-[11.5px] xl:text-xs 2xl:text-[13px] font-mono rounded-none transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons — Sharp Corners & Gold Finish */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Soundtrack Controller (Interstellar - Cornfield Chase, Muted by default) */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-none border transition-all duration-300 ${
                !bgmState.isMuted
                  ? "bg-[#0b0c10] border-amber-400/60 shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-amber-400/20"
                  : "bg-[#08080a]/70 border-amber-500/20 hover:border-amber-500/40"
              }`}
            >
              <button
                onClick={handleToggleSound}
                type="button"
                aria-label={bgmState.isMuted ? "Turn on Interstellar Soundtrack" : "Mute Soundtrack"}
                title={
                  bgmState.isMuted
                    ? "Turn on Interstellar (Cornfield Chase) on loop (Muted by default)"
                    : "Interstellar (Cornfield Chase) playing on loop • Click to Mute"
                }
                className={`p-1 rounded-none transition-all flex items-center gap-1 cursor-pointer ${
                  !bgmState.isMuted
                    ? "text-amber-400 hover:scale-110 active:scale-95"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {bgmState.isMuted ? (
                  <VolumeX className="w-4 h-4 text-neutral-400 hover:text-amber-400 transition-colors" />
                ) : bgmState.volume < 0.35 ? (
                  <Volume1 className="w-4 h-4 text-amber-400 animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                )}

                {!bgmState.isMuted && (
                  <span className="hidden xl:flex items-end gap-0.5 h-3 ml-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-amber-400 rounded-none animate-bounce h-2" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 bg-amber-400 rounded-none animate-bounce h-3" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 bg-amber-400 rounded-none animate-bounce h-1.5" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
              </button>

              {/* Volume Adjuster (Disabled when muted) */}
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
                  className={`w-14 lg:w-18 h-1.5 rounded-none appearance-none cursor-pointer transition-all ${
                    bgmState.isMuted
                      ? "bg-neutral-800 cursor-not-allowed"
                      : "bg-neutral-700 accent-amber-400 hover:accent-amber-300"
                  }`}
                  style={{
                    background: bgmState.isMuted
                      ? "#1e1e24"
                      : `linear-gradient(to right, #d4af37 ${bgmState.volume * 100}%, #333333 ${bgmState.volume * 100}%)`,
                  }}
                />
                <span
                  className={`text-[10px] font-mono select-none min-w-[24px] text-right font-semibold ${
                    bgmState.isMuted ? "text-neutral-600" : "text-amber-300"
                  }`}
                >
                  {bgmState.isMuted ? "OFF" : `${Math.round(bgmState.volume * 100)}%`}
                </span>
              </div>
            </div>

            {onSwitchToNetflix && (
              <button
                onClick={onSwitchToNetflix}
                type="button"
                className="px-3.5 py-2 min-h-[42px] rounded-none text-xs font-bold bg-gradient-to-r from-red-700 via-[#E50914] to-red-800 text-white hover:brightness-110 shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 border border-red-500/30"
              >
                <span className="text-sm">🍿</span>
                <span>Netflix Theme</span>
              </button>
            )}

            <button
              onClick={() => {
                if (onOpenResumePreview) onOpenResumePreview();
                else generateResumePDF();
              }}
              className="px-3.5 py-2 min-h-[42px] rounded-none text-xs font-semibold bg-[#0a0a0d] text-neutral-200 border border-amber-500/30 hover:border-amber-400 hover:text-amber-200 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Resume PDF</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-4 py-2 min-h-[42px] rounded-none text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black hover:opacity-95 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-1 border border-amber-300/40"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu & Quick Sound Button - 44px touch targets */}
          <div className="flex items-center lg:hidden gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Quick Mobile Sound Toggle Button */}
            <button
              onClick={handleToggleSound}
              type="button"
              aria-label={bgmState.isMuted ? "Turn on Soundtrack" : "Mute Soundtrack"}
              className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-none flex items-center justify-center active:scale-95 transition-all cursor-pointer border ${
                !bgmState.isMuted
                  ? "bg-[#0b0c10] border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                  : "bg-[#08080a] border-amber-500/20 text-neutral-400 hover:text-white"
              }`}
            >
              {bgmState.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
            </button>

            <button
              onClick={() => generateResumePDF()}
              aria-label="Download Resume"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-none bg-[#08080a] text-amber-400 border border-amber-500/30 flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-none bg-[#08080a] text-neutral-300 border border-amber-500/30 hover:text-white flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-neutral-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer — Sharp Obsidian & Gold */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050507]/98 border-b border-amber-500/30 backdrop-blur-2xl px-5 py-5 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Mobile Interstellar Soundtrack Control Panel */}
          <div className="p-3 rounded-none bg-[#0a0a0d] border border-amber-500/30 mb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button
                onClick={handleToggleSound}
                className="flex items-center gap-2 text-xs font-semibold text-neutral-200 cursor-pointer"
              >
                {bgmState.isMuted ? (
                  <VolumeX className="w-4 h-4 text-neutral-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                )}
                <span>Interstellar Soundtrack (Cornfield Chase)</span>
              </button>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-none font-bold ${
                  !bgmState.isMuted
                    ? "bg-amber-400 text-black"
                    : "bg-neutral-800 text-neutral-500"
                }`}
              >
                {!bgmState.isMuted ? "PLAYING" : "MUTED"}
              </span>
            </div>
            {/* Slider disabled when muted */}
            <div
              className={`flex items-center gap-2 pt-1 transition-opacity ${
                bgmState.isMuted ? "opacity-35 pointer-events-none" : "opacity-100"
              }`}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                disabled={bgmState.isMuted}
                value={bgmState.isMuted ? 0 : bgmState.volume}
                onChange={handleVolumeChange}
                aria-label="Mobile Soundtrack Volume Slider"
                className="w-full h-1.5 rounded-none bg-neutral-700 accent-amber-400 cursor-pointer"
              />
              <span className="text-[10px] font-mono text-amber-300 w-8 text-right font-semibold">
                {bgmState.isMuted ? "OFF" : `${Math.round(bgmState.volume * 100)}%`}
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-2 mb-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-none text-sm font-mono tracking-wider transition-colors ${
                    isActive
                      ? "bg-amber-400 text-black font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-amber-500/20 flex flex-col gap-2.5">
            {onSwitchToNetflix && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchToNetflix();
                }}
                className="w-full py-3 rounded-none text-xs font-bold bg-gradient-to-r from-red-700 to-red-800 text-white flex items-center justify-center gap-2"
              >
                <span>🍿 Switch to Netflix Theme</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenResumePreview) onOpenResumePreview();
                else generateResumePDF();
              }}
              className="w-full py-3 rounded-none text-xs font-semibold bg-[#0a0a0d] text-amber-300 border border-amber-500/30 flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>Download Full PDF Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
