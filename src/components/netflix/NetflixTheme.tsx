import React, { useState, useMemo } from "react";
import { NetflixNavbar } from "./NetflixNavbar";
import { NetflixBillboard } from "./NetflixBillboard";
import { NetflixRow } from "./NetflixRow";
import { NetflixModal, NetflixTitleItem } from "./NetflixModal";
import { NetflixAchievementModal } from "./NetflixAchievementModal";
import { NetflixContact } from "./NetflixContact";
import { Netflix3DAmbient } from "./Netflix3DAmbient";
import { PROJECTS, ACHIEVEMENTS, EXPERIENCE_DATA, SKILL_CATEGORIES, WHY_AI_CONTENT, PERSONAL_INFO } from "../../data/portfolioData";
import { generateResumePDF } from "../../utils/resumePdf";
import { netflixAudio } from "../../utils/netflixAudio";
import { Play, Sparkles, Trophy, Presentation, Star, Layers, Cpu, Network, ShieldCheck, CheckCircle2, ChevronRight, Undo2, FileDown } from "lucide-react";

interface NetflixThemeProps {
  onSwitchToClassic: () => void;
  onReplayIntro?: () => void;
}

export const NetflixTheme: React.FC<NetflixThemeProps> = ({
  onSwitchToClassic,
  onReplayIntro,
}) => {
  const [selectedTitle, setSelectedTitle] = useState<NetflixTitleItem | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<NetflixTitleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [myListIds, setMyListIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("naman_netflix_my_list");
      return saved ? JSON.parse(saved) : ["nexa", "excel-dashboard", "hackathon-winner"];
    } catch {
      return ["nexa", "excel-dashboard", "hackathon-winner"];
    }
  });

  const toggleMyList = (id: string) => {
    netflixAudio.playClick();
    setMyListIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("naman_netflix_my_list", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSelectTitle = (item: NetflixTitleItem) => {
    netflixAudio.playClick();
    if (["hackathon-winner", "iit-roorkee", "ai-automation"].includes(item.id)) {
      setSelectedAchievement(item);
    } else {
      setSelectedTitle(item);
    }
  };

  // Convert Achievements to Netflix Documentary Titles
  const achievementTitles: NetflixTitleItem[] = useMemo(() => {
    const list: NetflixTitleItem[] = [
      {
        id: "hackathon-winner",
        title: "Hackathon Champion: Sprint Innovation",
        subtitle: "Innovation, Rapid Prototyping & High-Pressure Execution",
        category: "Documentary Feature",
        matchScore: 99,
        year: "2024",
        rating: "TV-PG",
        durationOrSeason: "Champion Award",
        description: ACHIEVEMENTS[0].description,
        detailedProblem: "Competed against high-caliber multidisciplinary teams under strict time constraints to identify high-friction problems and construct a working digital product.",
        detailedContribution: "Led rapid architecture prototyping, prompt engineering recipes, and delivered the victorious final pitch to executive judges.",
        technologies: ["Rapid Prototyping", "Team Leadership", "Pitch Delivery", "AI Integration"],
        interactiveType: "doc",
      },
      {
        id: "iit-roorkee",
        title: "AI Keynote Speaker: IIT Roorkee",
        subtitle: "Public Speaking & Emerging Technology Impact",
        category: "Special Presentation",
        matchScore: 97,
        year: "2024",
        rating: "TV-G",
        durationOrSeason: "Invited Speaker",
        description: ACHIEVEMENTS[1].description,
        detailedProblem: "Translating complex generative artificial intelligence paradigms and business ROI into an inspiring address for engineers and students.",
        detailedContribution: "Delivered a structured keynote address breaking down autonomous agent pipelines, model evaluation, and practical automation.",
        technologies: ["Keynote Address", "AI Concepts", "Public Speaking", "Executive Communication"],
        interactiveType: "doc",
      },
      {
        id: "ai-automation",
        title: "The Automation Chronicles: Laboratory Experiments",
        subtitle: "Independent Initiative & Continuous Exploration",
        category: "Docuseries",
        matchScore: 96,
        year: "2024",
        rating: "TV-14",
        durationOrSeason: "Ongoing Experiments",
        description: ACHIEVEMENTS[2].description,
        detailedProblem: "Evaluating emerging model capabilities, webhook event triggers, and local LLM runtime stability.",
        detailedContribution: "Built and benchmarked multiple independent concepts combining LLMs, n8n platforms, webhooks, and modern web interfaces.",
        technologies: ["n8n", "Webhooks", "REST APIs", "Prompt Workflows", "FastAPI"],
        interactiveType: "doc",
      },
    ];
    return list;
  }, []);

  // Categorized Carousel Row 1: AI Automation Tools
  const aiAutomationTitles: NetflixTitleItem[] = useMemo(() => {
    return [
      {
        id: "nexa",
        title: "NEXA — AI Assistant & Operations Companion",
        subtitle: "Conversational intelligence concept with voice interactions and personal context.",
        category: "AI Assistant",
        matchScore: 99,
        year: "2024",
        rating: "TV-MA",
        durationOrSeason: "Prototyped Concept",
        description: PROJECTS[0].description,
        detailedProblem: PROJECTS[0].problemExplored,
        detailedContribution: PROJECTS[0].myContribution,
        technologies: PROJECTS[0].technologies,
        githubUrl: PROJECTS[0].githubUrl,
        interactiveType: "nexa",
      },
      {
        id: "excel-dashboard",
        title: "AI-Powered Excel Dashboard & Business Analytics",
        subtitle: "Automated business data ingestion and instant AI-driven visual KPI generation.",
        category: "Data & Analytics",
        matchScore: 97,
        year: "2024",
        rating: "TV-PG",
        durationOrSeason: "Prototyped Concept",
        description: PROJECTS[1].description,
        detailedProblem: PROJECTS[1].problemExplored,
        detailedContribution: PROJECTS[1].myContribution,
        technologies: PROJECTS[1].technologies,
        githubUrl: PROJECTS[1].githubUrl,
        interactiveType: "excel",
      },
      {
        id: "n8n-orchestrator",
        title: "n8n Event-Driven Autonomous Webhook Orchestrator",
        subtitle: "Node-based workflow automation and LLM node orchestration across business software.",
        category: "Automation Engine",
        matchScore: 98,
        year: "2024",
        rating: "TV-MA",
        durationOrSeason: "Lab Prototype",
        description: "An event-driven orchestration system built with n8n and webhooks to trigger LLM evaluation on inbound operational data and sync results to communication channels.",
        detailedProblem: "SaaS tools operate in silos requiring manual copy-pasting of customer requests and ticket updates; exploring resilient multi-agent webhook loops.",
        detailedContribution: "Configured custom webhook receivers, designed JSON transformation recipes, handled retry backoffs, and integrated LLM summarizers.",
        technologies: ["n8n", "Webhooks", "JSON Parsing", "LLM Orchestration", "REST APIs", "Error Handling"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
      {
        id: "support-triage-ai",
        title: "AI Customer Support Triage & SLA Priority Dispatcher",
        subtitle: "Front-line urgency classification, order log audit, and empathetic response drafting.",
        category: "AI Operations",
        matchScore: 96,
        year: "2024",
        rating: "TV-14",
        durationOrSeason: "Ops Production Concept",
        description: "Grounding technical support operations into an AI pipeline that parses customer order identifiers, cross-references backend status logs, and drafts resolution messages.",
        detailedProblem: "High ticket volume overwhelms support desks; customers with urgent shipping blocks experience high wait times without immediate reassurance.",
        detailedContribution: "Applied real-world Clickretina support methodologies to construct structured classification prompts, extraction schemas, and CSAT scoring heuristics.",
        technologies: ["Ticket Triage", "Customer Empathy", "Issue Investigation", "Prompt Design", "Operational SLAs"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
      {
        id: "doc-parser-ai",
        title: "Intelligent Document Schema Parser & JSON Extractor",
        subtitle: "Zero-shot extraction transforming messy invoices and text into validated schemas.",
        category: "Enterprise Automation",
        matchScore: 94,
        year: "2024",
        rating: "TV-PG",
        durationOrSeason: "Concept Prototype",
        description: "Automated schema extraction pipeline parsing unformatted PDFs, receipts, and order confirmations directly into typed JSON structures.",
        detailedProblem: "Manual data entry from invoices into ERP and accounting spreadsheets leads to typographical errors and accounting bottlenecks.",
        detailedContribution: "Evaluated few-shot prompting techniques and schema enforcement using structured outputs to ensure zero field drift.",
        technologies: ["Schema Validation", "JSON Extraction", "Document Parsing", "FastAPI", "Prompt Heuristics"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
    ];
  }, []);

  // Categorized Carousel Row 2: Machine Learning Research
  const mlResearchTitles: NetflixTitleItem[] = useMemo(() => {
    return [
      {
        id: "local-ai",
        title: "Local AI & Private Edge Model Orchestration",
        subtitle: "Hands-on integration testbed linking local open models with lightweight API endpoints.",
        category: "Local AI & Systems",
        matchScore: 98,
        year: "2024",
        rating: "TV-MA",
        durationOrSeason: "Hands-on Experiment",
        description: PROJECTS[3].description,
        detailedProblem: PROJECTS[3].problemExplored,
        detailedContribution: PROJECTS[3].myContribution,
        technologies: PROJECTS[3].technologies,
        githubUrl: PROJECTS[3].githubUrl,
        interactiveType: "local_ai",
      },
      {
        id: "ai-social",
        title: "AI Compatibility Matching & Vector Affinity Engine",
        subtitle: "Concept exploring interest-driven compatibility matching through intelligent vector scoring.",
        category: "Social Concept",
        matchScore: 96,
        year: "2024",
        rating: "TV-14",
        durationOrSeason: "Exploratory Concept",
        description: PROJECTS[2].description,
        detailedProblem: PROJECTS[2].problemExplored,
        detailedContribution: PROJECTS[2].myContribution,
        technologies: PROJECTS[2].technologies,
        githubUrl: PROJECTS[2].githubUrl,
        interactiveType: "social",
      },
      {
        id: "prompt-benchmarks",
        title: "Prompt Evaluation Lab & Model Latency Benchmarks",
        subtitle: "Comparative latency, pricing, and perplexity analysis across cloud and local weights.",
        category: "Model Evaluation",
        matchScore: 97,
        year: "2024",
        rating: "TV-PG",
        durationOrSeason: "Research Testbed",
        description: "A structured benchmarking testbed evaluating latency, reasoning capability, token throughput, and cost tradeoffs across frontier APIs and local quantizations.",
        detailedProblem: "Organizations frequently overpay for oversized models for routine tasks; systematic benchmarking is needed to match task complexity with model tier.",
        detailedContribution: "Constructed standard evaluation test suites, logged latency distribution profiles, and authored cost-optimization recommendations.",
        technologies: ["Model Benchmarking", "Latency Profiling", "Prompt Evaluation", "Python", "JSON Reporting"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
      {
        id: "agent-reasoning-sandbox",
        title: "Autonomous Multi-Agent Reasoning & Tool-Use Sandbox",
        subtitle: "Step-by-step reflection, self-correction, and tool-calling loop simulations.",
        category: "Agentic AI",
        matchScore: 95,
        year: "2024",
        rating: "TV-MA",
        durationOrSeason: "Architecture Lab",
        description: "Simulating agentic workflows where autonomous agents break broad goals into discrete tool calls, observe output results, and self-correct errors.",
        detailedProblem: "Single-turn LLMs hallucinate complex calculations; agent loops provide verifiable intermediate reasoning steps and self-healing.",
        detailedContribution: "Designed cyclic decision trees, fallback guards, and human-in-the-loop review triggers for high-stakes business processes.",
        technologies: ["Chain-of-Thought", "Multi-Agent Loops", "Tool Calling", "System Prompts", "State Machines"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
      {
        id: "context-memory-engine",
        title: "Semantic Context Memory & Embedding Retrieval Testbed",
        subtitle: "Vector similarity search and persistent memory representations for long-session dialogues.",
        category: "RAG & Embeddings",
        matchScore: 93,
        year: "2024",
        rating: "TV-PG",
        durationOrSeason: "Research Concept",
        description: "Exploring cosine distance similarity search over document chunks to inject relevant historical memory into conversational assistant sessions.",
        detailedProblem: "Assistant context windows are finite and expensive; dynamic semantic retrieval extracts only the exact paragraphs relevant to the active prompt.",
        detailedContribution: "Implemented text chunking strategies, tested similarity threshold boundaries, and mitigated hallucination via strict ground-truth prompt anchors.",
        technologies: ["Vector Embeddings", "Cosine Similarity", "Chunking Strategies", "RAG Concepts", "Context Management"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
    ];
  }, []);

  // Categorized Carousel Row 3: Ops Pipelines
  const opsPipelinesTitles: NetflixTitleItem[] = useMemo(() => {
    return [
      {
        id: "fastapi-inference-gateway",
        title: "FastAPI High-Throughput Model Serving Gateway",
        subtitle: "Lightweight async REST streaming interface bridging local AI models with web clients.",
        category: "API Architecture",
        matchScore: 99,
        year: "2024",
        rating: "TV-MA",
        durationOrSeason: "Systems Engineering",
        description: "A production-oriented async gateway built with FastAPI to handle concurrent client connections, parse streaming SSE token responses, and enforce rate limits.",
        detailedProblem: "Directly exposing raw model endpoints to client UIs causes security risks and connection bottlenecks; dedicated API proxies provide sanitization.",
        detailedContribution: "Implemented async endpoint routing, CORS middleware configuration, streaming response generators, and JSON validation schemas.",
        technologies: ["FastAPI", "Python AsyncIO", "REST APIs", "Server-Sent Events", "Token Streaming", "Pydantic"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
      {
        id: "webhook-resiliency-pipeline",
        title: "Fault-Tolerant Webhook Ingestion & Resiliency Pipeline",
        subtitle: "Idempotent event processing, exponential backoff retries, and dead-letter queues.",
        category: "Event Streaming",
        matchScore: 98,
        year: "2024",
        rating: "TV-PG",
        durationOrSeason: "Ops Architecture",
        description: "An event ingestion architecture designed to receive external webhooks safely, verify cryptographic signatures, buffer requests, and guarantee delivery.",
        detailedProblem: "Third-party webhook providers drop connections during server traffic spikes; ingestion pipelines must be non-blocking and idempotent.",
        detailedContribution: "Designed signature verification logic, unique event hash deduplication, and automated retry dispatchers.",
        technologies: ["Webhooks", "Idempotency", "Exponential Backoff", "Event Buffering", "REST Architecture"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
      {
        id: "log-diagnostic-pipeline",
        title: "Log Discrepancy & Root Cause Diagnostic Engine",
        subtitle: "Automated anomaly detection across order fulfillment logs and service status stages.",
        category: "Diagnostic Ops",
        matchScore: 97,
        year: "2024",
        rating: "TV-14",
        durationOrSeason: "Operational Analytics",
        description: "Drawing from hands-on Clickretina technical support operations to build automated parsers that flag shipment delays, payment gateway drop-offs, and service discrepancies.",
        detailedProblem: "Front-line support agents waste critical minutes parsing thousands of raw log lines by hand during high-friction customer complaints.",
        detailedContribution: "Engineered automated status code correlation, latency anomaly alerts, and clear human-readable executive summaries.",
        technologies: ["Log Auditing", "Issue Investigation", "Root Cause Analysis", "Regex Parsing", "Support SLAs"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
      {
        id: "ci-cd-prompt-testing",
        title: "Prompt Regression Testing & Continuous Integration Suite",
        subtitle: "Automated test harnesses guarding against model drift, prompt breakage, and hallucinations.",
        category: "MLOps Pipeline",
        matchScore: 95,
        year: "2024",
        rating: "TV-PG",
        durationOrSeason: "Testing Pipeline",
        description: "A continuous integration pipeline running automated validation tests across prompt templates before changes are pushed into staging environments.",
        detailedProblem: "Subtle wording edits in system prompts frequently degrade response formats, breaking downstream JSON parsers in production.",
        detailedContribution: "Constructed deterministic assertion test scripts, schema validation checks, and regression test suites executed via GitHub workflows.",
        technologies: ["CI/CD Concepts", "GitHub Actions", "Regression Testing", "Schema Assertions", "Prompt Engineering"],
        githubUrl: "https://github.com/namanshri75-cell/",
        interactiveType: "doc",
      },
    ];
  }, []);

  // Career Seasons (Experience & Education)
  const careerTitles: NetflixTitleItem[] = useMemo(() => {
    return [
      {
        id: "clickretina",
        title: "Season 1: Technical Support at Clickretina",
        subtitle: "High-Volume Problem Solving & Front-Line Operations",
        category: "Career Season",
        matchScore: 99,
        year: "Professional Exp",
        rating: "TV-14",
        durationOrSeason: "Support Operations",
        description: EXPERIENCE_DATA.summary,
        detailedProblem: "Customers facing urgent order status and delivery discrepancies require rapid investigation through internal logs and reassuring human communication.",
        detailedContribution: "Investigated service logs, resolved discrepancies within strict SLA targets, and authored reproduction steps for backend specialists.",
        technologies: ["Technical Troubleshooting", "Ticket Management", "Issue Investigation", "Customer Communication"],
        interactiveType: "doc",
      },
      {
        id: "bba",
        title: "Prequel: Bachelor of Business Administration (BBA)",
        subtitle: "BBD University, Lucknow — Graduated",
        category: "Academic Foundation",
        matchScore: 95,
        year: "Graduate",
        rating: "TV-G",
        durationOrSeason: "Degree Completed",
        description: "Graduated with a strong foundation in core business principles, management strategies, organizational behavior, and technology integration. Bridging business economics with digital automation.",
        detailedProblem: "Understanding business viability, workflow cost overheads, and executive decision-making before applying technology solutions.",
        detailedContribution: "Synthesized business administration coursework with practical hands-on software experiments and digital operations.",
        technologies: ["Business Administration", "Operational Analysis", "Process Optimization", "Management Strategy"],
        interactiveType: "doc",
      },
    ];
  }, []);

  // Top 10 Ranked List
  const top10Titles: NetflixTitleItem[] = useMemo(() => {
    return [
      aiAutomationTitles[0], // NEXA
      aiAutomationTitles[1], // AI Excel Dashboard
      achievementTitles[0], // Hackathon Winner
      opsPipelinesTitles[0], // FastAPI Gateway
      achievementTitles[1], // IIT Roorkee
      mlResearchTitles[0], // Local AI
      aiAutomationTitles[2], // n8n Orchestrator
      opsPipelinesTitles[2], // Log Diagnostic Pipeline
      mlResearchTitles[1], // AI Social
      achievementTitles[2], // Continuous Automation Lab
    ].filter(Boolean);
  }, [aiAutomationTitles, opsPipelinesTitles, mlResearchTitles, achievementTitles]);

  // Filtered titles if user typed in search bar
  const searchedTitles = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const all = [
      ...aiAutomationTitles,
      ...mlResearchTitles,
      ...opsPipelinesTitles,
      ...achievementTitles,
      ...careerTitles,
    ];
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery, aiAutomationTitles, mlResearchTitles, opsPipelinesTitles, achievementTitles, careerTitles]);

  const featuredBillboard = aiAutomationTitles[0]; // NEXA

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-[#E50914] selection:text-white overflow-x-hidden relative">
      {/* 3D Ambient Spatial Atmosphere */}
      <Netflix3DAmbient />

      {/* Netflix Top Navigation */}
      <NetflixNavbar
        onSwitchToClassic={onSwitchToClassic}
        onReplayIntro={onReplayIntro}
        onSearchQueryChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* SEARCH RESULTS OVERLAY (When user searches) */}
      {searchedTitles !== null ? (
        <div className="pt-28 pb-20 px-4 sm:px-10 max-w-[1920px] mx-auto min-h-[70vh]">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            Search Results for <span className="text-[#E50914]">"{searchQuery}"</span> ({searchedTitles.length})
          </h2>

          {searchedTitles.length === 0 ? (
            <div className="text-neutral-400 py-16 text-center text-sm">
              No titles or skills matched "{searchQuery}". Try searching for "AI", "Excel", "Support", or "Ollama".
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {searchedTitles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectTitle(item)}
                  className="cursor-pointer group aspect-video rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-[#E50914] hover:scale-105 transition-all shadow-lg"
                >
                  <NetflixRow
                    title=""
                    items={[item]}
                    onSelectTitle={handleSelectTitle}
                    myListIds={myListIds}
                    onToggleMyList={toggleMyList}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* NORMAL BROWSE VIEW */
        <main className="flex flex-col w-full pb-16">
          {/* Billboard / Hero */}
          <NetflixBillboard
            featuredItem={featuredBillboard}
            onPlayDemo={(item) => handleSelectTitle(item)}
            onMoreInfo={(item) => handleSelectTitle(item)}
            isInMyList={myListIds.includes(featuredBillboard.id)}
            onToggleMyList={toggleMyList}
          />

          {/* Negative Margin on Rows so the top row overlaps Billboard's dark bottom gradient */}
          <div className="relative -mt-16 sm:-mt-24 lg:-mt-32 z-30 space-y-6 sm:space-y-10">
            {/* ROW 1: TOP 10 IN AI & AUTOMATION TODAY */}
            <div id="netflix-top10">
              <NetflixRow
                title="Top 10 in AI Applications & Automation Today"
                items={top10Titles}
                isTop10={true}
                onSelectTitle={handleSelectTitle}
                myListIds={myListIds}
                onToggleMyList={toggleMyList}
              />
            </div>

            {/* ROW 2: CATEGORIZED ROW - AI AUTOMATION TOOLS */}
            <div id="netflix-ai-automation">
              <NetflixRow
                title="AI Automation Tools & Autonomous Pipelines"
                items={aiAutomationTitles}
                onSelectTitle={handleSelectTitle}
                myListIds={myListIds}
                onToggleMyList={toggleMyList}
              />
            </div>

            {/* ROW 3: CATEGORIZED ROW - MACHINE LEARNING RESEARCH */}
            <div id="netflix-ml-research">
              <NetflixRow
                title="Machine Learning Research & Local Inference"
                items={mlResearchTitles}
                onSelectTitle={handleSelectTitle}
                myListIds={myListIds}
                onToggleMyList={toggleMyList}
              />
            </div>

            {/* ROW 4: CATEGORIZED ROW - OPS PIPELINES */}
            <div id="netflix-ops-pipelines">
              <NetflixRow
                title="Ops Pipelines, Resilient Webhooks & Gateway APIs"
                items={opsPipelinesTitles}
                onSelectTitle={handleSelectTitle}
                myListIds={myListIds}
                onToggleMyList={toggleMyList}
              />
            </div>

            {/* ROW 5: AWARD-WINNING DOCUMENTARIES (ACHIEVEMENTS) */}
            <div id="netflix-achievements">
              <NetflixRow
                title="Award-Winning Documentaries & Keynotes (Achievements)"
                items={achievementTitles}
                onSelectTitle={handleSelectTitle}
                myListIds={myListIds}
                onToggleMyList={toggleMyList}
              />
            </div>

            {/* ROW 6: CAREER SEASONS (EXPERIENCE & EDUCATION) */}
            <div id="netflix-experience">
              <NetflixRow
                title="Career Seasons: Support Operations & Business Leadership"
                items={careerTitles}
                onSelectTitle={handleSelectTitle}
                myListIds={myListIds}
                onToggleMyList={toggleMyList}
              />
            </div>

            {/* ROW 5: SKILLS & GENRES SHOWCASE */}
            <div id="netflix-genres" className="px-4 sm:px-10 my-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-2xl font-black text-white tracking-wide">
                  Explore by Technical Genre
                </h2>
                <span className="text-xs font-mono text-neutral-400">4 Core Disciplines</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SKILL_CATEGORIES.slice(0, 4).map((cat, idx) => (
                  <div
                    key={cat.title}
                    className="p-5 rounded-xl bg-[#1a1a1a] border border-neutral-800 hover:border-neutral-600 transition-all group hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#E50914]">
                        GENRE 0{idx + 1}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                        {cat.skills.length} Skills
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {cat.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800">
                      {cat.skills.slice(0, 4).map((s) => (
                        <span
                          key={s.name}
                          className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 6: DIRECTOR'S CUT (WHY AI PHILOSOPHY) */}
            <div className="px-4 sm:px-10 my-12">
              <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-neutral-900 via-[#181818] to-neutral-900 border border-neutral-800 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#E50914] tracking-widest uppercase">
                    DIRECTOR'S COMMENTARY
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white max-w-2xl mb-4">
                  "Why Focus on Practical AI Applications & Automation?"
                </h2>
                <blockquote className="text-sm sm:text-base text-neutral-300 italic max-w-3xl leading-relaxed mb-8 border-l-2 border-[#E50914] pl-4">
                  "{WHY_AI_CONTENT.quote}"
                </blockquote>

                {/* 4 Episodes of the Philosophy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {WHY_AI_CONTENT.steps.map((st) => (
                    <div
                      key={st.step}
                      className="p-4 rounded-xl bg-black/50 border border-neutral-800"
                    >
                      <div className="text-xs font-mono font-bold text-[#E50914] mb-1">
                        EPISODE {st.step}
                      </div>
                      <div className="font-bold text-white text-sm mb-1">{st.title}</div>
                      <div className="text-xs text-neutral-300 font-medium mb-2">{st.subtitle}</div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CAST NAMAN / REQUEST AN EPISODE (CONTACT SECTION) */}
            <NetflixContact />
          </div>
        </main>
      )}

      {/* Netflix Title Detail Modal (Opens when user clicks any standard project) */}
      <NetflixModal
        item={selectedTitle}
        onClose={() => setSelectedTitle(null)}
        isInMyList={selectedTitle ? myListIds.includes(selectedTitle.id) : false}
        onToggleMyList={toggleMyList}
        onSelectTitle={handleSelectTitle}
      />

      {/* Netflix Expandable Achievement Modal (Opens when user clicks an achievement thumbnail) */}
      <NetflixAchievementModal
        item={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        isInMyList={selectedAchievement ? myListIds.includes(selectedAchievement.id) : false}
        onToggleMyList={toggleMyList}
      />

      {/* Netflix Cinema Footer */}
      <footer className="border-t border-neutral-900 bg-black py-12 px-4 sm:px-10 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-[#E50914] text-lg">NAMANFLIX</span>
              <span className="text-neutral-400 font-mono text-[11px]">
                Interactive Portfolio Edition
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={generateResumePDF}
                type="button"
                className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Download Resume (PDF)</span>
              </button>

              <button
                onClick={onSwitchToClassic}
                type="button"
                className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-cyan-400 text-xs font-medium border border-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Return to Classic Theme</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-neutral-400 pt-4 border-t border-neutral-900 text-[11px]">
            <a href="#netflix-top10" className="hover:underline">Top 10 AI Projects</a>
            <a href="#netflix-achievements" className="hover:underline">Honors & Hackathon</a>
            <a href="#netflix-experience" className="hover:underline">Support Operations SLA</a>
            <a href="#netflix-contact" className="hover:underline">Casting & Recruitment Call</a>
          </div>

          <div className="text-[10px] text-neutral-600 pt-2 flex items-center justify-between flex-wrap gap-2">
            <span>© {new Date().getFullYear()} Naman Srivastava. Concept Netflix Theme Experience.</span>
            <span>Designed for AI Applications, Automation & Technical Operations.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
