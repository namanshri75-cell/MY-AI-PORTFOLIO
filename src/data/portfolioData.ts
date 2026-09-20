import { Project, SkillCategory, ExperienceItem, AchievementItem } from "../types";

export const PERSONAL_INFO = {
  name: "Naman Srivastava",
  title: "AI APPLICATIONS | AUTOMATION | AI OPERATIONS",
  tagline: "Exploring practical applications of AI and automation to simplify workflows, solve problems, and build useful digital experiences.",
  email: "namansrivastava11345@gmail.com",
  linkedin: "https://www.linkedin.com/in/naman-srivastava-866748258/",
  github: "https://github.com/namanshri75-cell/",
  location: "Lucknow, India",
  targetRole: "AI Applications & Automation Roles",
  resumeFilename: "Naman_Srivastava_AI_Automation_Resume.pdf",
};

export const ABOUT_TEXT = {
  heading: "ABOUT ME",
  lead: "I'm a BBA student with practical experience in technical support and a strong interest in AI applications, automation, Generative AI, and emerging technology.",
  secondary: "I enjoy experimenting with AI tools and turning ideas into practical digital concepts — particularly applications that can simplify repetitive tasks, improve workflows, and create better user experiences.",
  pillars: [
    {
      title: "Business + Technology",
      description: "Combining business administration perspective with practical technology tools to evaluate ROI and user viability."
    },
    {
      title: "Hands-on AI Prototyping",
      description: "Experimenting directly with LLMs, prompt systems, webhooks, and automation pipelines rather than theoretical talk."
    },
    {
      title: "Support Operations",
      description: "Proven front-line problem-solving experience communicating with users, investigating root causes, and resolving issues."
    }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Artificial Intelligence",
    icon: "Sparkles",
    description: "Hands-on exploration of generative models, prompt design, and practical assistant flows.",
    skills: [
      { name: "Generative AI", description: "Experimenting with text, image, and multi-modal generative models" },
      { name: "LLM Applications", description: "Implementing context-aware prompts and real-world assistant interactions" },
      { name: "Prompt Engineering", description: "Structured few-shot, system persona, and step-by-step reasoning prompts" },
      { name: "AI Assistants", description: "Designing conversational logic, persona guidelines, and helpful user agents" },
      { name: "AI Application Prototyping", description: "Rapid proof-of-concept assembly using accessible AI tools and interfaces" },
      { name: "AI Tool Evaluation", description: "Assessing performance, latency, pricing, and suitability across model providers" },
    ],
  },
  {
    title: "Automation",
    icon: "Cpu",
    description: "Designing streamlined, event-driven workflows to reduce repetitive human effort.",
    skills: [
      { name: "n8n", description: "Node-based workflow automation, webhook routing, and AI node orchestration" },
      { name: "Workflow Automation", description: "Trigger-action architectures connecting forms, databases, and notifications" },
      { name: "AI-assisted Workflows", description: "Injecting LLM analysis into data ingestion and email/ticket triage steps" },
      { name: "Task Automation", description: "Automating routine document, spreadsheet, and communication tasks" },
      { name: "Process Automation Concepts", description: "Mapping business bottleneck workflows into structured automated pipelines" },
    ],
  },
  {
    title: "AI & API Tools",
    icon: "Network",
    description: "Connecting diverse services via webhooks, REST principles, and structured JSON payloads.",
    skills: [
      { name: "OpenRouter", description: "Unified gateway routing across diverse open and proprietary model endpoints" },
      { name: "Gemini APIs", description: "Integrating multimodal capabilities and high-throughput Gemini model calls" },
      { name: "REST API Concepts", description: "Understanding HTTP verbs, headers, status codes, query params, and payloads" },
      { name: "JSON", description: "Structuring, validating, and parsing structured data between services" },
      { name: "Webhooks", description: "Configuring real-time inbound/outbound event notifications across web tools" },
      { name: "API Integration", description: "Bridging third-party services with backend endpoints and front-end displays" },
    ],
  },
  {
    title: "Platforms & Tools",
    icon: "Layers",
    description: "Core platforms leveraged for data handling, local AI experiments, and presentation.",
    skills: [
      { name: "Firebase", description: "Auth integration, Firestore collections, and real-time database basics" },
      { name: "Ollama", description: "Running local lightweight open-weights LLMs for privacy and zero-latency exploration" },
      { name: "FastAPI-based AI Integration", description: "Exploring lightweight Python REST interfaces for model inference" },
      { name: "GitHub", description: "Version control basics, repository management, and collaboration workflows" },
      { name: "Microsoft Excel", description: "Formulas, pivot tables, spreadsheet organization, and data cleaning" },
      { name: "Microsoft PowerPoint", description: "Structured executive presentations, concept visual decks, and reporting" },
      { name: "Microsoft Word", description: "Business documentation, process write-ups, and customer-facing guides" },
      { name: "Power BI", description: "Data modeling, KPI card creation, and interactive reporting dashboards" },
    ],
  },
  {
    title: "Support & Operations",
    icon: "Headphones",
    description: "Real-world operational expertise resolving issues, handling tickets, and ensuring customer satisfaction.",
    skills: [
      { name: "Technical Troubleshooting", description: "Systematically diagnosing user issues and identifying root causes" },
      { name: "Customer Support", description: "Empathetic, clear, and professional customer communication under pressure" },
      { name: "Ticket Handling", description: "Prioritizing, triaging, tracking, and updating tickets through to resolution" },
      { name: "Issue Investigation", description: "Cross-referencing order logs, backend states, and customer reports" },
      { name: "Issue Resolution", description: "Delivering actionable fixes, workarounds, and confirmed user outcomes" },
      { name: "Escalation", description: "Synthesizing reproducible bug reports for specialist teams when required" },
      { name: "Customer Communication", description: "Translating technical status updates into clear, reassurance-focused updates" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "nexa",
    title: "NEXA — AI Assistant",
    tagline: "Conversational intelligence concept with voice interactions and personal context.",
    category: "AI Assistant",
    description: "An AI assistant concept focused on conversational interaction, personalization, voice interaction, and an engaging web-based experience.",
    problemExplored: "Examining how digital assistants can move beyond robotic single queries into warm, conversational, context-aware partners with voice feedback and responsive state management.",
    myContribution: "Designed conversational flows, system persona prompts, UI wireframing, Firebase-backed conversation session modeling, and voice synthesis integration concepts.",
    technologies: ["Generative AI", "AI assistants", "Firebase", "AI services", "Voice technologies", "Authentication", "Conversation management"],
    githubUrl: "https://github.com/namanshri75-cell/",
    status: "Prototyped Concept",
    interactiveType: "nexa"
  },
  {
    id: "excel-dashboard",
    title: "AI-Powered Excel Dashboard",
    tagline: "Automated business data ingestion and instant AI-driven visual KPI generation.",
    category: "Data & Analytics",
    description: "An AI-assisted dashboard concept designed to transform uploaded spreadsheet data into useful visual dashboards and reports.",
    problemExplored: "Business teams spend hours manually formatting Excel tables into executive visual summaries; exploring how AI can parse sheet schemas and synthesize interactive charts in seconds.",
    myContribution: "Structured data parsing pipelines, evaluated prompt recipes for formula extraction, designed responsive KPI widgets, and applied Power BI dashboard layout principles.",
    technologies: ["Excel data", "AI-assisted analysis", "Dashboard generation", "Business reporting", "Data visualization concepts"],
    githubUrl: "https://github.com/namanshri75-cell/",
    status: "Prototyped Concept",
    interactiveType: "excel"
  },
  {
    id: "ai-social",
    title: "AI Social Media Web Application",
    tagline: "Concept exploring interest-driven compatibility matching through intelligent vector scoring.",
    category: "Social Concept",
    description: "An AI-powered social networking concept exploring personalized user matching based on interests and compatibility.",
    problemExplored: "Traditional follower-count metrics prioritize noise; exploring how compatibility scoring based on shared learning goals and niche passions can facilitate meaningful collaboration.",
    myContribution: "Formulated user matching scoring models, designed profile curiosity tags, structured onboarding questionnaires, and conceptualized the web interaction flow.",
    technologies: ["AI-powered matching", "Interest compatibility", "Product architecture", "User experience", "Web prototyping"],
    githubUrl: "https://github.com/namanshri75-cell/",
    status: "Exploratory Concept",
    interactiveType: "social"
  },
  {
    id: "local-ai",
    title: "Local AI & API Integration",
    tagline: "Hands-on integration testbed linking local open models with lightweight API endpoints.",
    category: "Local AI & Systems",
    description: "An experimental project exploring local AI models and API-based integration using tools such as Ollama and FastAPI.",
    problemExplored: "Evaluating local, offline inference for sensitive organizational data compared with cloud-hosted API latency, cost efficiency, and webhook responsiveness.",
    myContribution: "Experimented with Ollama local model orchestration, benchmarked response times across quantization levels, created lightweight REST routes via FastAPI, and tested JSON streaming.",
    technologies: ["Ollama", "FastAPI", "Local AI Models", "REST APIs", "JSON parsing", "Local inference"],
    githubUrl: "https://github.com/namanshri75-cell/",
    status: "Hands-on Experiment",
    interactiveType: "local_ai"
  },
];

export const EXPERIENCE_DATA: ExperienceItem = {
  role: "Technical Support",
  company: "Clickretina",
  period: "Professional Experience",
  location: "India",
  type: "Support Operations",
  summary: "Delivered proactive, structured technical assistance and order resolution for customers across high-volume service cycles. Demonstrated practical problem solving, systematic issue investigation, and professional customer communication.",
  pillars: [
    {
      title: "Problem Solving & Technical Investigation",
      points: [
        "Investigated service- and order-related discrepancies through internal system logs and status verification.",
        "Systematically checked order status, delivery stages, and backend service progress to pinpoint root causes.",
        "Troubleshot customer-facing issues with precision, reducing repeat tickets through actionable guidance.",
      ],
    },
    {
      title: "Customer Communication & Empathy",
      points: [
        "Handled customer queries through active listening, rapid responsiveness, and calm de-escalation.",
        "Communicated status updates and clear resolution steps in accessible, non-technical terminology.",
        "Ensured customers felt heard, valued, and informed throughout multi-stage support tickets.",
      ],
    },
    {
      title: "Technical Operations & Escalation Management",
      points: [
        "Managed multiple concurrent support requests while upholding turnaround SLAs.",
        "Documented reproduction steps and escalated edge-case bugs cleanly to internal technical teams.",
        "Maintained ticket tracking accuracy to assist ongoing workflow optimization.",
      ],
    },
  ],
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Hackathon Winner",
    subtitle: "Innovation & Rapid Prototyping",
    badge: "Champion",
    description: "Won a competitive hackathon through pragmatic problem-solving, team coordination, and swift end-to-end project prototyping.",
  },
  {
    title: "AI Presentation — IIT Roorkee",
    subtitle: "Public Speaking & Concept Delivery",
    badge: "Honored Speaker",
    description: "Selected to deliver a presentation and speech on emerging AI concepts and their practical industry impact at prestigious IIT Roorkee.",
  },
  {
    title: "AI & Automation Project Experiments",
    subtitle: "Independent Initiative & Continuous Learning",
    badge: "Continuous Explorer",
    description: "Built and documented multiple independent concepts combining LLMs, automation platforms (n8n), webhooks, and modern web interfaces.",
  },
];

export const LEADERSHIP_ITEM = {
  role: "Content Head",
  organization: "Udaan Dramatics, BBD University",
  description: "Led content-related activities and contributed to creative communication and digital content initiatives. Coordinated team narratives, stage copywriting, and promotional creative messaging.",
};

export const EDUCATION_ITEM = {
  degree: "Bachelor of Business Administration (BBA)",
  institution: "BBD University, Lucknow",
  description: "Studying core business principles, management strategies, organizational behavior, and technology integration. Bridging business economics with digital automation.",
};

export const CERTIFICATION_ITEM = {
  title: "Power BI Workshop",
  issuer: "OfficeMaster",
  credentialType: "Professional Skills Workshop",
  description: "Hands-on intensive workshop focusing on dynamic dashboard assembly, data modeling, DAX fundamentals, and business visual reporting.",
};

export const WHY_AI_CONTENT = {
  quote: "I'm interested in the intersection of business and technology — particularly where AI can reduce repetitive work, improve decision-making, and create better digital experiences. My goal is to continue learning and working on practical AI applications and automation rather than limiting myself to purely theoretical AI.",
  steps: [
    {
      step: "01",
      title: "Problem",
      subtitle: "Identify Friction & Repetition",
      desc: "Dissecting business bottlenecks, repetitive manual tasks, and user confusion points in existing operations.",
      color: "from-rose-500 to-amber-500"
    },
    {
      step: "02",
      title: "AI",
      subtitle: "Cognitive Intelligence",
      desc: "Applying Generative AI, prompt design, and LLM comprehension to summarize, categorize, and extract structured insight.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      step: "03",
      title: "Automation",
      subtitle: "Workflow Execution",
      desc: "Connecting tools via n8n, webhooks, and REST endpoints to route data seamlessly without manual intervention.",
      color: "from-indigo-400 to-purple-500"
    },
    {
      step: "04",
      title: "Solution",
      subtitle: "High-Impact Outcome",
      desc: "Delivering faster turnaround times, clean visual dashboards, and delightful, error-free customer experiences.",
      color: "from-emerald-400 to-teal-500"
    }
  ]
};
