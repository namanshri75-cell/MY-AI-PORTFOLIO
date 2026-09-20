import React from "react";
import { PERSONAL_INFO, ABOUT_TEXT, EXPERIENCE_DATA, SKILL_CATEGORIES, ACHIEVEMENTS, EDUCATION_ITEM, CERTIFICATION_ITEM, LEADERSHIP_ITEM } from "../data/portfolioData";
import { generateResumePDF } from "../utils/resumePdf";
import { X, FileDown, CheckCircle2, Building2, MapPin, Mail, Linkedin, Github } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bespoke-card shadow-2xl overflow-hidden max-h-[92vh] flex flex-col !border-white/20">
        {/* Top Control Bar */}
        <div className="p-3.5 sm:p-5 border-b border-white/[0.08] bg-[#070a12]/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 flex-shrink-0" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider truncate">
              Resume • {PERSONAL_INFO.name}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => generateResumePDF()}
              className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all flex items-center justify-center gap-1.5 shadow-sm font-mono tracking-wide cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Download PDF</span>
              <span className="xs:hidden sm:hidden">PDF</span>
            </button>
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Clean Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-[#0a0d16] text-slate-200 font-sans space-y-6">
          {/* Header with DP */}
          <div className="border-b border-white/[0.08] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.name.toUpperCase()}
              </h1>
              <p className="text-xs font-mono text-cyan-400 font-semibold tracking-wider mt-1">
                {PERSONAL_INFO.title}
              </p>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-cyan-400" />
                  {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {PERSONAL_INFO.location}
                </span>
                <span>Focus: {PERSONAL_INFO.targetRole}</span>
              </div>
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-md flex-shrink-0">
              <img
                src="/naman_dp.jpg"
                alt="Naman Srivastava"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1.5 border-b border-slate-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ABOUT_TEXT.lead} {ABOUT_TEXT.secondary}
            </p>
          </div>

          {/* Skills (No Programming languages, accurate categories) */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-2 border-b border-slate-800 pb-1">
              Core Competencies (No Code / Low Code / Operations)
            </h2>
            <div className="space-y-1.5 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-100 min-w-[170px]">{cat.title}:</span>
                  <span className="text-slate-400">{cat.skills.map((s) => s.name).join(" • ")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-2 border-b border-slate-800 pb-1">
              Professional Experience
            </h2>
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                <span>{EXPERIENCE_DATA.role} — {EXPERIENCE_DATA.company}</span>
                <span className="font-mono text-slate-400">{EXPERIENCE_DATA.period}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {EXPERIENCE_DATA.summary}
              </p>
              <div className="space-y-2 pl-2 border-l border-slate-800 text-xs text-slate-400">
                {EXPERIENCE_DATA.pillars.map((p, idx) => (
                  <div key={idx}>
                    <span className="font-bold text-slate-200 block">• {p.title}:</span>
                    <ul className="list-disc list-inside pl-2 space-y-0.5 mt-0.5">
                      {p.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-2 border-b border-slate-800 pb-1">
              Selected AI & Automation Explorations
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-white">NEXA — AI Assistant:</span>
                <span className="text-slate-400 ml-1">An AI assistant concept focused on conversational interaction, personalization, voice interaction, and an engaging web-based experience.</span>
              </div>
              <div>
                <span className="font-bold text-white">AI-Powered Excel Dashboard:</span>
                <span className="text-slate-400 ml-1">An AI-assisted dashboard concept designed to transform uploaded spreadsheet data into useful visual dashboards and reports.</span>
              </div>
              <div>
                <span className="font-bold text-white">AI Social Media Web Application:</span>
                <span className="text-slate-400 ml-1">An AI-powered social networking concept exploring personalized user matching based on interests and compatibility.</span>
              </div>
              <div>
                <span className="font-bold text-white">Local AI & API Integration:</span>
                <span className="text-slate-400 ml-1">An experimental project exploring local AI models and API-based integration using tools such as Ollama and FastAPI.</span>
              </div>
            </div>
          </div>

          {/* Education, Leadership & Achievements */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-2 border-b border-slate-800 pb-1">
              Education, Leadership & Achievements
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div>• <strong>Education:</strong> {EDUCATION_ITEM.degree}, {EDUCATION_ITEM.institution}</div>
              <div>• <strong>Leadership:</strong> {LEADERSHIP_ITEM.role} — {LEADERSHIP_ITEM.organization}</div>
              <div>• <strong>Certification:</strong> {CERTIFICATION_ITEM.title} — {CERTIFICATION_ITEM.issuer}</div>
              <div>• <strong>Hackathon Winner:</strong> Won hackathon through problem-solving and rapid concept prototyping.</div>
              <div>• <strong>IIT Roorkee:</strong> Delivered an AI-related concept speech and presentation at IIT Roorkee.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
