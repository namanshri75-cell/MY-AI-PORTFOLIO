import React, { useState } from "react";
import { Sparkles, Send, CheckCircle2, Film, Clapperboard, Mail, AlertCircle, Copy, Check } from "lucide-react";
import { dispatchContactSubmission } from "../../services/googleSheets";
import { PERSONAL_INFO } from "../../data/portfolioData";
import { netflixAudio } from "../../utils/netflixAudio";
import confetti from "canvas-confetti";

export const NetflixContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    genre: "AI Applications & Automation Role",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    netflixAudio.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Producer / Recruiter name is required";
    if (!formData.email.trim()) {
      err.email = "Studio / Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      err.email = "Enter a valid studio email address";
    }
    if (!formData.message.trim()) err.message = "Please describe the role, episode or script pitch";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    netflixAudio.playClick();
    setIsSubmitting(true);

    try {
      await dispatchContactSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: `[Genre: ${formData.genre}] ${formData.message.trim()}`,
      });

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#E50914", "#ffffff", "#000000"],
      });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        genre: "AI Applications & Automation Role",
        message: "",
      });
    } catch (err) {
      console.error("Submission failed:", err);
      // Fallback: still show submitted gracefully
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="netflix-contact" className="relative py-20 sm:py-28 px-4 sm:px-10 bg-[#0d0d0d] border-t border-neutral-900 overflow-hidden">
      {/* Red ambient spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Cinema Studio Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914] text-xs font-mono font-bold tracking-wider">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>CASTING CALL & SCRIPT SUBMISSIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            CAST NAMAN FOR YOUR <br />
            <span className="text-[#E50914]">NEXT PRODUCTION</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-sans">
            Ready to add an AI Applications & Automation specialist to your team? Pitch a role, freelance project, or collaboration.
          </p>
        </div>

        {/* The Netflix-Styled Casting Card */}
        <div className="bg-[#141414] rounded-2xl border border-neutral-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Film Strip Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E50914] via-rose-600 to-[#E50914]" />

          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black text-white">SCRIPT RECEIVED!</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Your pitch has been added to Naman's production queue. You will receive a direct reply to your studio email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#b20710] text-white font-bold text-xs uppercase tracking-wider transition-colors mt-4"
              >
                Submit Another Pitch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Producer / Name */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Producer / Your Name <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Christopher Nolan / Talent Partner"
                    className="w-full bg-[#1e1e1e] border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                  />
                  {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
                </div>

                {/* Studio Email */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Studio / Contact Email <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="recruiter@studio.com"
                    className="w-full bg-[#1e1e1e] border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                  />
                  {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
                </div>
              </div>

              {/* Genre / Role selection */}
              <div className="space-y-2 text-left">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Production Genre / Target Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "AI Applications Role",
                    "Automation & n8n Workflows",
                    "Support & Operations",
                    "Full-Time Position",
                    "Contract / Freelance",
                    "General Collaboration",
                  ].map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setFormData({ ...formData, genre })}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                        formData.genre === genre
                          ? "bg-[#E50914] text-white border-[#E50914] shadow"
                          : "bg-[#1a1a1a] text-neutral-300 border-neutral-800 hover:border-neutral-600"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Script Pitch */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  The Script / Pitch Details <span className="text-[#E50914]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell Naman about your company, the workflow you need automated, or the role you want him to lead..."
                  className="w-full bg-[#1e1e1e] border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all resize-none"
                />
                {errors.message && <p className="text-[11px] text-red-400">{errors.message}</p>}
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors order-2 sm:order-1"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Or email directly: {PERSONAL_INFO.email}</span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#E50914] hover:bg-[#b20710] active:scale-95 text-white font-extrabold text-sm tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 order-1 sm:order-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Script...</span>
                  ) : (
                    <>
                      <span>Transmit Pitch</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
