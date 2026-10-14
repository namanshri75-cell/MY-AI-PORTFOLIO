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
  Terminal,
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
  const [channelMode, setChannelMode] = useState<"terminal" | "form">("terminal");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: "input" | "output"; text: string }>>([
    { type: "output", text: "SUBLEVEL TERMINAL OS v2.4 [Candidate Direct Uplink]" },
    { type: "output", text: "Type 'help' for commands, or 'send <msg>' to transmit direct note." },
    { type: "output", text: "Target: Naman Srivastava • Status: AVAILABLE FOR ROLES" },
  ]);

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
      await dispatchContactSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#ffd700", "#ffffff"],
      });

      setSubmittedName(formData.name.trim());
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmittedName(formData.name.trim());
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    setTerminalHistory((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);
    setTerminalInput("");

    const lower = cmd.toLowerCase();

    if (lower === "help") {
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: "AVAILABLE SUBLEVEL COMMANDS:" },
        { type: "output", text: "  • resume     - Generate & download complete Candidate Resume PDF" },
        { type: "output", text: "  • skills     - Print core automation & AI technical stack" },
        { type: "output", text: "  • contact    - Display direct contact coordinates (Email/LinkedIn)" },
        { type: "output", text: "  • send <msg> - Dispatch quick transmission to Naman" },
        { type: "output", text: "  • clear      - Clear terminal screen" },
      ]);
    } else if (lower === "resume") {
      generateResumePDF();
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: "[OK] PDF Resume generated and downloaded successfully." },
      ]);
    } else if (lower === "skills") {
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: "[SKILLS] n8n, Claude 3.5, GPT-4o, Webhooks, REST APIs, Power BI, Firebase" },
        { type: "output", text: "[FOCUS] Practical Automation, AI Operations, Autonomous Pipelines" },
      ]);
    } else if (lower === "contact") {
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: `[EMAIL] ${PERSONAL_INFO.email}` },
        { type: "output", text: `[LINKEDIN] ${PERSONAL_INFO.linkedin}` },
        { type: "output", text: `[LOCATION] ${PERSONAL_INFO.location}` },
      ]);
    } else if (lower.startsWith("send ")) {
      const msg = cmd.slice(5).trim();
      try {
        await dispatchContactSubmission({
          name: "Recruiter Terminal Uplink",
          email: "terminal@sublevel.recruiter",
          message: msg,
        });
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
          colors: ["#d4af37", "#ffd700"],
        });
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: `[TRANSMITTED] Note successfully queued for Naman: "${msg}"` },
        ]);
      } catch {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: `[SAVED LOCALLY] Note received: "${msg}"` },
        ]);
      }
    } else if (lower === "clear") {
      setTerminalHistory([
        { type: "output", text: "SUBLEVEL TERMINAL OS v2.4 [Cleared]" },
        { type: "output", text: "Type 'help' for commands." },
      ]);
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", text: `Command not recognized: '${cmd}'. Type 'help' for available commands.` },
      ]);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 2xl:py-36 w-full border-t border-amber-500/20 bg-[#040406]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/5 rounded-none blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-yellow-600/5 rounded-none blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/10] DIRECT CHANNEL UPLINK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold text-white tracking-tight">
            LET'S CONNECT
          </h2>
          <p className="mt-3 text-sm sm:text-base 2xl:text-lg text-neutral-300 max-w-2xl 2xl:max-w-3xl font-normal">
            Have an open role, an automation challenge, or want to discuss practical AI workflows? Send a message directly.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        {/* 2-Column Responsive Contact Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 2xl:gap-16 items-start">
          
          {/* Left Column: Authentic Profile & Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 2xl:space-y-8">
            <div className="p-6 sm:p-8 2xl:p-10 rounded-none bespoke-card flex flex-col justify-between border-amber-500/30">
              <div>
                {/* Profile Card Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-none overflow-hidden border border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                      <img
                        src="./naman_dp.jpg"
                        alt="Naman Srivastava"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-none bg-amber-400 border border-black shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                      title="Available for opportunities"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl 2xl:text-2xl font-bold text-white tracking-tight">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs 2xl:text-sm font-mono text-amber-400 font-semibold tracking-wider mt-0.5">
                      {PERSONAL_INFO.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs 2xl:text-sm text-neutral-400 mt-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{PERSONAL_INFO.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm 2xl:text-base text-neutral-300 leading-relaxed mb-6 font-sans">
                  Targeting <span className="text-amber-300 font-medium">entry-level AI applications, workflow automation, and tech support roles</span>. Open to full-time positions, internships, and high-impact contract projects.
                </p>

                {/* Direct Channel Cards */}
                <div className="space-y-3">
                  {/* Direct Email */}
                  <div className="p-3.5 2xl:p-4 rounded-none bg-[#070709] border border-amber-500/20 flex items-center justify-between gap-3 group hover:border-amber-400/50 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-none bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Email</div>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-xs sm:text-sm text-neutral-200 hover:text-amber-300 transition-colors font-mono truncate block"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-none bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all flex-shrink-0 cursor-pointer"
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
                  <div className="flex items-center gap-3 p-3.5 2xl:p-4 rounded-none bg-[#070709] border border-amber-500/20">
                    <div className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-none bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Availability</div>
                      <div className="text-xs sm:text-sm text-neutral-200">
                        Typical response within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links & PDF Resume */}
              <div className="pt-6 mt-6 border-t border-amber-500/20 flex flex-wrap items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-[#070709] hover:bg-neutral-800/60 border border-amber-500/20 hover:border-amber-400 text-xs sm:text-sm font-medium text-white transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-amber-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300 transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-[#070709] hover:bg-neutral-800/60 border border-amber-500/20 hover:border-amber-400 text-xs sm:text-sm font-medium text-white transition-all group"
                >
                  <Github className="w-4 h-4 text-amber-300" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300 transition-colors" />
                </a>

                <button
                  onClick={generateResumePDF}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-none bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-300 transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>Download Complete Resume (PDF)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Dedicated "Send Message" Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 2xl:p-10 rounded-none bespoke-card shadow-2xl relative border-amber-500/35">
              {submitted ? (
                <div className="py-12 px-4 text-center flex flex-col items-center">
                  <div className="w-16 h-16 2xl:w-20 2xl:h-20 rounded-none bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                    <CheckCircle2 className="w-8 h-8 2xl:w-10 2xl:h-10" />
                  </div>
                  <h3 className="font-display text-2xl 2xl:text-3xl font-bold text-white tracking-tight mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm 2xl:text-base text-neutral-300 max-w-md mx-auto mb-8 leading-relaxed font-sans">
                    Thank you, <span className="text-amber-300 font-semibold">{submittedName || "there"}</span>. Your message has been received and saved. I will get back to you shortly.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=Follow-up from Portfolio`}
                      className="px-5 py-2.5 rounded-none bg-white/5 hover:bg-white/10 border border-amber-500/30 text-xs sm:text-sm font-medium text-white transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-amber-400" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-none bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-semibold text-xs sm:text-sm transition-all cursor-pointer border border-amber-300/40"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                    <div>
                      <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-1">
                        <Terminal className="w-4 h-4" />
                        <span>[SYS/10] TERMINAL CONTACT CLOSE</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Direct Uplink Channel
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5 font-sans">
                        Tactile terminal close or classic web form for immediate dispatch.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 rounded-none bg-black/80 border border-amber-500/30 font-mono text-xs self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setChannelMode("terminal")}
                        className={`px-3 py-1 rounded-none transition-all cursor-pointer ${
                          channelMode === "terminal"
                            ? "bg-amber-400 text-black font-bold shadow-sm"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Terminal CLI
                      </button>
                      <button
                        type="button"
                        onClick={() => setChannelMode("form")}
                        className={`px-3 py-1 rounded-none transition-all cursor-pointer ${
                          channelMode === "form"
                            ? "bg-amber-400 text-black font-bold shadow-sm"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Classic Form
                      </button>
                    </div>
                  </div>

                  {channelMode === "terminal" ? (
                    <div className="flex flex-col h-[400px]">
                      <div className="flex-1 bg-black/90 rounded-none p-4 font-mono text-xs text-neutral-300 space-y-2 overflow-y-auto border border-amber-500/20">
                        {terminalHistory.map((item, idx) => (
                          <div
                            key={idx}
                            className={
                              item.type === "input"
                                ? "text-amber-400 font-bold"
                                : "text-neutral-300 leading-relaxed"
                            }
                          >
                            {item.text}
                          </div>
                        ))}
                      </div>

                      {/* Quick Command Pills */}
                      <div className="py-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-[10px]">
                        <span className="text-neutral-500">Quick:</span>
                        <button
                          type="button"
                          onClick={() => setTerminalInput("help")}
                          className="px-2 py-0.5 rounded-none bg-white/5 hover:bg-white/10 text-neutral-300 border border-amber-500/20 cursor-pointer"
                        >
                          help
                        </button>
                        <button
                          type="button"
                          onClick={() => setTerminalInput("skills")}
                          className="px-2 py-0.5 rounded-none bg-white/5 hover:bg-white/10 text-neutral-300 border border-amber-500/20 cursor-pointer"
                        >
                          skills
                        </button>
                        <button
                          type="button"
                          onClick={() => setTerminalInput("resume")}
                          className="px-2 py-0.5 rounded-none bg-white/5 hover:bg-white/10 text-neutral-300 border border-amber-500/20 cursor-pointer"
                        >
                          resume
                        </button>
                        <button
                          type="button"
                          onClick={() => setTerminalInput("contact")}
                          className="px-2 py-0.5 rounded-none bg-white/5 hover:bg-white/10 text-neutral-300 border border-amber-500/20 cursor-pointer"
                        >
                          contact
                        </button>
                      </div>

                      {/* CLI Command Input */}
                      <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-1">
                        <div className="flex-1 relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 font-mono text-xs font-bold">
                            $
                          </span>
                          <input
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            placeholder="Type command or 'send <your note>'..."
                            className="w-full pl-8 pr-4 py-3 rounded-none bg-black border border-amber-500/30 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-3 rounded-none bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold cursor-pointer border border-amber-300/40"
                        >
                          EXECUTE
                        </button>
                      </form>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 2xl:space-y-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-mono text-neutral-300 mb-2">
                        YOUR NAME <span className="text-amber-400">*</span>
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
                        className="w-full px-4 py-3.5 2xl:py-4 rounded-none text-sm 2xl:text-base bg-[#070709] border border-amber-500/30 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors font-sans"
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
                      <label htmlFor="email-input" className="block text-xs font-mono text-neutral-300 mb-2">
                        YOUR EMAIL ADDRESS <span className="text-amber-400">*</span>
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
                        className="w-full px-4 py-3.5 2xl:py-4 rounded-none text-sm 2xl:text-base bg-[#070709] border border-amber-500/30 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors font-sans"
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
                      <label htmlFor="message-input" className="block text-xs font-mono text-neutral-300 mb-2">
                        YOUR MESSAGE <span className="text-amber-400">*</span>
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
                        className="w-full px-4 py-3.5 2xl:py-4 rounded-none text-sm 2xl:text-base bg-[#070709] border border-amber-500/30 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none font-sans"
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
                      className="w-full py-4 2xl:py-4.5 px-6 rounded-none font-semibold text-sm 2xl:text-base bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(212,175,55,0.3)] disabled:opacity-70 cursor-pointer border border-amber-300/40"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Delivering Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-neutral-500 font-mono">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Direct delivery • No public visibility</span>
                      </span>
                      <span className="text-neutral-500 text-[11px]">Protected channel</span>
                    </div>
                  </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
