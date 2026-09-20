import React, { useState, useEffect } from "react";
import { Menu, X, FileDown, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { generateResumePDF } from "../utils/resumePdf";

interface NavbarProps {
  onOpenResumePreview?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumePreview }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
          ? "bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Candidate Identity */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
          >
            <div className="relative w-9 h-9 2xl:w-10 2xl:h-10 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,255,198,0.35)] flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/naman_dp.jpg"
                alt="Naman Srivastava"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs sm:text-sm 2xl:text-base tracking-wider text-white group-hover:text-cyan-300 transition-colors truncate">
                NAMAN SRIVASTAVA
              </span>
              <span className="text-[10px] 2xl:text-[11px] font-mono text-cyan-400/90 flex items-center gap-1.5 truncate max-w-[170px] min-[380px]:max-w-[220px] sm:max-w-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                <span className="truncate">AI Applications & Automation</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 xl:px-4 2xl:px-5 py-1.5 2xl:py-2 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-2.5 xl:px-3 2xl:px-3.5 py-1 2xl:py-1.5 text-[11.5px] xl:text-xs 2xl:text-[13px] font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,255,198,0.2)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => {
                if (onOpenResumePreview) onOpenResumePreview();
                else generateResumePDF();
              }}
              className="px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-slate-800/90 text-slate-200 border border-slate-700/70 hover:bg-slate-700 hover:text-white transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume PDF</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,255,198,0.4)] transition-all flex items-center gap-1"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button - 44px touch targets */}
          <div className="flex items-center lg:hidden gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => generateResumePDF()}
              aria-label="Download Resume"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-slate-800/90 text-cyan-400 border border-slate-700/70 flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-slate-800/90 text-slate-300 border border-slate-700/70 hover:text-white flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d16]/98 border-b border-slate-800 backdrop-blur-2xl px-5 py-5 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1 px-3">
              Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 min-h-[44px] rounded-xl text-sm font-medium transition-all flex items-center ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white active:bg-slate-800/80"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenResumePreview) onOpenResumePreview();
                  else generateResumePDF();
                }}
                className="w-full min-h-[44px] py-3 rounded-xl text-xs font-semibold bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                View & Download Resume (PDF)
              </button>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full min-h-[44px] py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 flex items-center justify-center active:scale-[0.98] transition-transform"
              >
                Contact Me Directly
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
