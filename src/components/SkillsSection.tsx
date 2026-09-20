import React, { useState } from "react";
import { SKILL_CATEGORIES } from "../data/portfolioData";
import { Sparkles, Cpu, Network, Layers, Headphones, Search, Check, Info, Share2, Grid3X3 } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"cards" | "constellation">("cards");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categoryIcons: Record<string, React.ReactNode> = {
    "Artificial Intelligence": <Sparkles className="w-4 h-4 text-cyan-400" />,
    "Automation": <Cpu className="w-4 h-4 text-emerald-400" />,
    "AI & API Tools": <Network className="w-4 h-4 text-blue-400" />,
    "Platforms & Tools": <Layers className="w-4 h-4 text-purple-400" />,
    "Support & Operations": <Headphones className="w-4 h-4 text-amber-400" />,
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (activeCategory !== "All" && cat.title !== activeCategory) {
      return null;
    }
    const matchingSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchingSkills.length === 0) return null;
    return { ...cat, skills: matchingSkills };
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  return (
    <section id="skills" className="relative py-20 lg:py-28 w-full border-t border-slate-900 bg-[#07090e]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRACTICAL COMPETENCIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            SKILLS & CAPABILITIES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-2xl font-normal">
            Practical AI tools, automation engines, API integration concepts, and support operations.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* Recruiter Transparency Guarantee */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bespoke-card border-cyan-500/30 flex items-start sm:items-center gap-3.5 max-w-3xl 2xl:max-w-4xl mx-auto shadow-md">
          <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-[13px] 2xl:text-sm text-slate-300 leading-relaxed font-sans">
            <span className="font-bold text-cyan-300 font-mono text-xs uppercase tracking-wide">Recruiter Note:</span> All skills reflect genuine hands-on tool evaluation, workflow automation, and operational experience. No programming language expertise or fake percentage ratings are claimed.
          </p>
        </div>

        {/* Controls: Category Filter + Search + View Mode */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Category Tabs - horizontally swipeable on mobile */}
          <div className="flex overflow-x-auto no-scrollbar items-center gap-2 w-full md:w-auto pb-1.5 md:pb-0 md:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-3.5 py-2 min-h-[42px] rounded-xl text-xs font-mono transition-all border flex-shrink-0 whitespace-nowrap active:scale-95 ${
                activeCategory === "All"
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm font-semibold"
                  : "bg-white/[0.03] text-slate-400 border-white/[0.07] hover:text-white hover:border-white/20"
              }`}
            >
              All Categories
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(cat.title)}
                className={`px-3.5 py-2 min-h-[42px] rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 border flex-shrink-0 whitespace-nowrap active:scale-95 ${
                  activeCategory === cat.title
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm font-semibold"
                    : "bg-white/[0.03] text-slate-400 border-white/[0.07] hover:text-white hover:border-white/20"
                }`}
              >
                {categoryIcons[cat.title]}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 min-h-[44px] rounded-xl text-sm sm:text-xs bg-slate-950/80 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors font-mono"
              />
            </div>

            <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-white/[0.08] min-h-[44px] flex-shrink-0">
              <button
                onClick={() => setViewMode("cards")}
                aria-label="Cards View"
                className={`p-2 rounded-lg text-xs transition-all min-w-[36px] min-h-[36px] flex items-center justify-center ${
                  viewMode === "cards" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("constellation")}
                aria-label="Constellation View"
                className={`p-2 rounded-lg text-xs transition-all min-w-[36px] min-h-[36px] flex items-center justify-center ${
                  viewMode === "constellation" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-white"
                }`}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Cards View */}
        {viewMode === "cards" && (
          <div className="space-y-10">
            {filteredCategories.map((category) => (
              <div key={category.title} className="flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-xl bespoke-card border-white/10">
                    {categoryIcons[category.title]}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-5">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                        className={`p-5 rounded-2xl bespoke-card transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                          isSelected
                            ? "!border-cyan-400/80 !shadow-[0_0_24px_rgba(0,255,198,0.2)]"
                            : ""
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors tracking-tight">
                              {skill.name}
                            </span>
                            <span className="bespoke-pill px-2 py-0.5 rounded-full text-slate-400">
                              Applied
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors font-sans">
                            {skill.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-cyan-400/90">
                          <span>Workflow Capable</span>
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode 2: Interactive Constellation Node Network */}
        {viewMode === "constellation" && (
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl">
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Connected Competency Constellation
              </span>
              <p className="text-xs text-slate-400">
                Interactive nodal layout showing practical skills grouped by operational domains
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {filteredCategories.flatMap((c) => c.skills).map((skill) => (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill.name)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                    selectedSkill === skill.name
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,255,198,0.3)] scale-105"
                      : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-white"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>

            {selectedSkill && (
              <div className="mt-8 p-4 rounded-xl bg-slate-800/90 border border-cyan-500/50 max-w-md mx-auto text-center animate-in fade-in duration-200">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  Selected Focus Area
                </span>
                <h4 className="text-base font-bold text-white mb-1">{selectedSkill}</h4>
                <p className="text-xs text-slate-300">
                  {filteredCategories
                    .flatMap((c) => c.skills)
                    .find((s) => s.name === selectedSkill)?.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
