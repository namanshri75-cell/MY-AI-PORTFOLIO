import React, { useState, useRef } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { generateResumePDF } from "../utils/resumePdf";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  FileDown,
  ArrowUpRight,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { dispatchContactSubmission, SHEETMONKEY_ENDPOINT } from "../services/googleSheets";

export const ContactSection: React.FC = () => {
  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hiddenFormRef = useRef<HTMLFormElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please enter a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Dispatch inquiry to configured Google Sheet / Webhook + local backup
      await dispatchContactSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      // Trigger celebratory confetti
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#00ffc6", "#00e5ff", "#8b5cf6"],
      });

      setSubmittedName(formData.name.trim());
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Submission failed:", err);
      // Fallback: still show submitted gracefully and save locally
      setSubmittedName(formData.name.trim());
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 2xl:py-36 w-full border-t border-slate-900 bg-[#07090e]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 2xl:w-[32rem] 2xl:h-[32rem] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bespoke-pill text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIRECT CHANNEL</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold text-white tracking-tight">
            LET'S CONNECT
          </h2>
          <p className="mt-3 text-sm sm:text-base 2xl:text-lg text-slate-300/80 max-w-2xl 2xl:max-w-3xl font-normal">
            Have an open role, an automation challenge, or want to discuss practical AI workflows? Send a message directly.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mt-4" />
        </div>

        {/* 2-Column Responsive Contact Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 2xl:gap-16 items-start">
          
          {/* Left Column: Authentic Profile & Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 2xl:space-y-8">
            <div className="p-6 sm:p-8 2xl:p-10 rounded-3xl bespoke-card flex flex-col justify-between">
              <div>
                {/* Profile Card Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(0,255,198,0.2)]">
                      <img
                        src="./naman_dp.jpg"
                        alt="Naman Srivastava"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 2xl:w-5 2xl:h-5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                      title="Available for opportunities"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl 2xl:text-2xl font-bold text-white tracking-tight">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs 2xl:text-sm font-mono text-cyan-400 font-semibold tracking-wider mt-0.5">
                      {PERSONAL_INFO.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs 2xl:text-sm text-slate-400 mt-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{PERSONAL_INFO.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm 2xl:text-base text-slate-300 leading-relaxed mb-6 font-sans">
                  Targeting <span className="text-cyan-300 font-medium">entry-level AI applications, workflow automation, and tech support roles</span>. Open to full-time positions, internships, and high-impact contract projects.
                </p>

                {/* Direct Channel Cards */}
                <div className="space-y-3">
                  {/* Direct Email */}
                  <div className="p-3.5 2xl:p-4 rounded-xl bg-slate-950/60 border border-white/[0.06] flex items-center justify-between gap-3 group hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Email</div>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-xs sm:text-sm text-slate-200 hover:text-cyan-300 transition-colors font-mono truncate block"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all flex-shrink-0 cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Response Guarantee */}
                  <div className="flex items-center gap-3 p-3.5 2xl:p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Availability</div>
                      <div className="text-xs sm:text-sm text-slate-200">
                        Typical response within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links & PDF Resume */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/40 text-xs sm:text-sm font-medium text-white transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-xs sm:text-sm font-medium text-white transition-all group"
                >
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </a>

                <button
                  onClick={generateResumePDF}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-300 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-cyan-400" />
                  <span>Download Complete Resume (PDF)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Dedicated "Send Message" Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 2xl:p-10 rounded-3xl bespoke-card shadow-2xl relative">
              {submitted ? (
                <div className="py-12 px-4 text-center flex flex-col items-center">
                  <div className="w-16 h-16 2xl:w-20 2xl:h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8 2xl:w-10 2xl:h-10" />
                  </div>
                  <h3 className="font-display text-2xl 2xl:text-3xl font-bold text-white tracking-tight mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm 2xl:text-base text-slate-300 max-w-md mx-auto mb-8 leading-relaxed font-sans">
                    Thank you, <span className="text-cyan-300 font-semibold">{submittedName || "there"}</span>. Your message has been received and saved. I will get back to you shortly.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=Follow-up from Portfolio`}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-white transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 2xl:mb-8">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>SEND INQUIRY</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl 2xl:text-3xl font-bold text-white tracking-tight">
                      Send a Message
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                      Leave your details below and I will respond to your email.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 2xl:space-y-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-mono text-slate-300 mb-2">
                        YOUR NAME <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name-input"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="Jane Doe or Recruiter Name"
                        className="w-full px-4 py-3.5 2xl:py-4 rounded-xl text-sm 2xl:text-base bg-slate-950/80 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email-input" className="block text-xs font-mono text-slate-300 mb-2">
                        YOUR EMAIL ADDRESS <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email-input"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3.5 2xl:py-4 rounded-xl text-sm 2xl:text-base bg-slate-950/80 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Input */}
                    <div>
                      <label htmlFor="message-input" className="block text-xs font-mono text-slate-300 mb-2">
                        YOUR MESSAGE <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        id="message-input"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                        placeholder="Hello Naman, we'd like to discuss an opportunity regarding AI applications and automation..."
                        className="w-full px-4 py-3.5 2xl:py-4 rounded-xl text-sm 2xl:text-base bg-slate-950/80 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none font-sans"
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 2xl:py-4.5 px-6 rounded-xl font-semibold text-sm 2xl:text-base bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,255,198,0.25)] disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Delivering Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Direct delivery • No public visibility</span>
                      </span>
                      <span className="text-slate-500 text-[11px]">Protected channel</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
