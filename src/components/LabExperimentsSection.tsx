import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  GitBranch, 
  RefreshCw, 
  Globe, 
  Database, 
  Bell, 
  Play, 
  Pause, 
  RotateCw, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  Code2, 
  Copy, 
  Check, 
  Eye, 
  Workflow, 
  Layers, 
  ArrowRight,
  Maximize2,
  Clock,
  Terminal,
  Cpu,
  Radio
} from "lucide-react";

export interface WorkflowNode {
  id: number;
  label: string;
  role: string;
  category: "trigger" | "validator" | "ai-core" | "router" | "transform" | "gateway" | "storage" | "notify";
  icon: React.ComponentType<{ className?: string; size?: number }>;
  status: "active" | "idle" | "executing" | "verified";
  latency: string;
  throughput: string;
  description: string;
  inputPayload: Record<string, unknown>;
  outputPayload: Record<string, unknown>;
  configSnippet: string;
}

export interface WorkflowPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  throughputSla: string;
  efficiencyGain: string;
  nodes: WorkflowNode[];
}

const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    id: "preset-enterprise-support",
    name: "Enterprise Customer Triage & Autonomous SLA Rescue",
    category: "Customer Support & Incident Escalation",
    description: "High-throughput event pipeline that intercepts urgent support tickets, analyzes customer sentiment, validates enterprise SLAs, and triggers priority recovery workflows.",
    throughputSla: "<140ms Total Roundtrip",
    efficiencyGain: "92% Human Touchpoints Eliminated",
    nodes: [
      {
        id: 1,
        label: "Webhook Inbound Trigger",
        role: "Event Ingestion & Signature Verification",
        category: "trigger",
        icon: Zap,
        status: "verified",
        latency: "11ms",
        throughput: "1,400 req/sec",
        description: "Listens for inbound HTTP POST events from CRM webhooks. Verifies HMAC-SHA256 signatures and responds with instant 202 Accepted status.",
        inputPayload: {
          event: "ticket.created",
          source: "Zendesk_Webhook_Listener",
          priority: "urgent",
          ticketId: "CR-90412",
          customerTier: "Enterprise_VIP",
          bodyText: "CRITICAL: Automated database migration locked user sessions. Requesting immediate executive intervention."
        },
        outputPayload: {
          status: "ACCEPTED",
          trackingId: "EVT-90412-TRK",
          ingestionTimestamp: new Date().toISOString(),
          signatureValid: true
        },
        configSnippet: `// Webhook Ingestion Configuration
export const webhookConfig = {
  path: "/webhooks/inbound/support-triage",
  httpMethod: "POST",
  auth: { type: "HMAC_SHA256", secretKeyEnv: "WEBHOOK_SECRET" },
  rateLimit: { maxPerMinute: 5000, burst: 200 }
};`
      },
      {
        id: 2,
        label: "Schema Sanitizer & Normalizer",
        role: "Payload Sanitization & Contract Validation",
        category: "validator",
        icon: ShieldCheck,
        status: "verified",
        latency: "4ms",
        throughput: "3,200 ops/sec",
        description: "Validates incoming JSON structure against strict schemas. Strips unauthorized fields, sanitizes raw string inputs, and injects organizational metadata.",
        inputPayload: {
          rawTicketId: "CR-90412",
          customerEmail: "CTO@ENTERPRISE-CLIENT.COM ",
          body: "CRITICAL: Automated database migration locked user sessions..."
        },
        outputPayload: {
          normalizedTicketId: "CR-90412",
          cleanEmail: "cto@enterprise-client.com",
          schemaVersion: "v2.4",
          dataIntegrityPassed: true
        },
        configSnippet: `// Strict Schema Normalization
function validatePayload(inbound) {
  const schema = z.object({
    ticketId: z.string().regex(/^CR-\\d{5}$/),
    email: z.string().email().toLowerCase().trim(),
    body: z.string().min(10).max(4000)
  });
  return schema.parse(inbound);
}`
      },
      {
        id: 3,
        label: "Cognitive Reasoning Core",
        role: "Multi-Model Intelligence & Intent Extraction",
        category: "ai-core",
        icon: Sparkles,
        status: "verified",
        latency: "178ms",
        throughput: "450 evals/sec",
        description: "Evaluates incident urgency, customer churn risk, and sentiment. Synthesizes a structured JSON classification with confidence scoring.",
        inputPayload: {
          text: "Automated database migration locked user sessions. Requesting immediate executive intervention.",
          customerTier: "Enterprise_VIP"
        },
        outputPayload: {
          urgencyTier: "P1_CRITICAL",
          sentimentScore: -0.92,
          churnRisk: "HIGH",
          suggestedAction: "IMMEDIATE_ESCALATION_SUPERVISOR",
          confidence: 0.984
        },
        configSnippet: `// Cognitive Classifier Prompt Protocol
const systemDirective = \`You are an Autonomous Support Triage Reasoner.
Analyze ticket severity, extract urgency level (P1-P4), and return
strict JSON adhering to the Operational Escalation Protocol.\`;`
      },
      {
        id: 4,
        label: "Dynamic Policy Router",
        role: "Conditional Execution Branching",
        category: "router",
        icon: GitBranch,
        status: "verified",
        latency: "6ms",
        throughput: "4,000 checks/sec",
        description: "Evaluates conditional operational rules. Routes P1 critical cases through fast-track escalation while sending P3/P4 tickets to standard queues.",
        inputPayload: {
          urgencyTier: "P1_CRITICAL",
          confidence: 0.984,
          customerTier: "Enterprise_VIP"
        },
        outputPayload: {
          routeChosen: "BRANCH_ALPHA_CRITICAL_ESC",
          slaDeadline: "15 minutes",
          priorityMultiplier: 2.5
        },
        configSnippet: `// Branch Evaluation Rules
if (urgency === "P1_CRITICAL" && customerTier === "Enterprise_VIP") {
  return dispatchBranch("FAST_TRACK_HOTLINE");
} else {
  return dispatchBranch("STANDARD_ASYNC_QUEUE");
}`
      },
      {
        id: 5,
        label: "Data Transformation Engine",
        role: "Payload Synthesis & Context Augmentation",
        category: "transform",
        icon: RefreshCw,
        status: "verified",
        latency: "5ms",
        throughput: "2,800 ops/sec",
        description: "Reshapes synthesized intelligence into standardized payloads required by external incident management systems and on-call paging platforms.",
        inputPayload: {
          ticketId: "CR-90412",
          urgency: "P1_CRITICAL",
          sentiment: -0.92
        },
        outputPayload: {
          incidentSummary: "[P1 CRITICAL] Enterprise Migration Block - CR-90412",
          escalationPayload: {
            serviceKey: "SRV-OPS-DB",
            urgency: "HIGH",
            assignedSquad: "Core-Infrastructure-Team"
          }
        },
        configSnippet: `// Payload Transformation Transform Node
return {
  summary: \`[\${item.urgency}] \${item.ticketId}\`,
  timestamp: new Date().toISOString(),
  targetSquad: resolveSquad(item.urgency)
};`
      },
      {
        id: 6,
        label: "External Gateway Connector",
        role: "Secure REST Dispatch & Circuit Breaking",
        category: "gateway",
        icon: Globe,
        status: "verified",
        latency: "64ms",
        throughput: "850 calls/sec",
        description: "Dispatches authenticated REST requests to external incident management endpoints with exponential backoff and circuit breaker failover.",
        inputPayload: {
          targetUrl: "https://api.incident-management.internal/v1/incidents",
          method: "POST",
          headers: { "Authorization": "Bearer tok_***" }
        },
        outputPayload: {
          httpStatus: 201,
          incidentId: "INC-991204",
          dispatchSuccess: true,
          retryCount: 0
        },
        configSnippet: `// Resilient HTTP Request Node
const response = await fetchWithBackoff(targetUrl, {
  method: "POST",
  headers: { "Authorization": \`Bearer \${token}\` },
  body: JSON.stringify(transformedPayload),
  timeoutMs: 3000
});`
      },
      {
        id: 7,
        label: "State Persistence Store",
        role: "Idempotent Transaction Auditing",
        category: "storage",
        icon: Database,
        status: "verified",
        latency: "19ms",
        throughput: "1,900 writes/sec",
        description: "Persists complete execution trace, decision metadata, and response timestamps into indexed transaction storage for compliance auditing.",
        inputPayload: {
          trackingId: "EVT-90412-TRK",
          incidentId: "INC-991204",
          durationMs: 287
        },
        outputPayload: {
          databaseRecordId: "DB_AUDIT_771892",
          writeCommitted: true,
          replicaSyncState: "IN_SYNC"
        },
        configSnippet: `// Storage Persistence Query
await db.query(
  \`INSERT INTO workflow_audit_logs (tracking_id, incident_id, total_latency_ms) 
   VALUES ($1, $2, $3) ON CONFLICT (tracking_id) DO NOTHING\`,
  [trackingId, incidentId, duration]
);`
      },
      {
        id: 8,
        label: "Multi-Channel Broadcast Hub",
        role: "Real-Time Team Notifications",
        category: "notify",
        icon: Bell,
        status: "verified",
        latency: "32ms",
        throughput: "1,200 msgs/sec",
        description: "Dispatches synchronized alerts to Slack operations channels, mobile pager alerts to engineering leads, and updates executive status dashboards.",
        inputPayload: {
          channels: ["#ops-critical-escalations", "#leadership-briefs"],
          headline: "P1 Incident Auto-Triaged: Database Migration Issue Handled",
          etaToResolution: "<15 min"
        },
        outputPayload: {
          slackDelivered: true,
          pagerAck: true,
          dashboardUpdated: true
        },
        configSnippet: `// Notification Broadcast Engine
await Promise.all([
  postToSlackWebhook(alertPayload),
  triggerPagerDutyIncident(alertPayload),
  updateStatusDashboard(incidentStats)
]);`
      }
    ]
  },
  {
    id: "preset-etl-lake",
    name: "Multi-Sheet Financial ETL & Real-Time KPI Sync",
    category: "Financial Analytics & Data Warehousing",
    description: "Automated ingestion pipeline for parsing raw multi-sheet workbooks, calculating margin variance metrics, reconciling discrepancies, and streaming aggregated reports to executive dashboards.",
    throughputSla: "<1.2s for 15,000 Records",
    efficiencyGain: "100% Automated Weekly Reconciliation",
    nodes: [
      {
        id: 1,
        label: "Cloud Drive File Poller",
        role: "File Upload Detection & Stream Ingestion",
        category: "trigger",
        icon: Zap,
        status: "verified",
        latency: "22ms",
        throughput: "120 workbooks/hr",
        description: "Monitors secure shared drive directories for uploaded weekly spreadsheets. Streams binary buffers without loading entire files into memory.",
        inputPayload: { file: "Q3_Consolidated_Revenue_v4.xlsx", sizeMb: 8.4, sheetCount: 5 },
        outputPayload: { bufferStreamId: "STRM_8819", streamReady: true },
        configSnippet: `// Poller Ingestion Rule
watchDirectory({ path: "/shared/finance/incoming", interval: "30s" });`
      },
      {
        id: 2,
        label: "Spreadsheet Schema Parser",
        role: "Tabular Row Extraction & Type Validation",
        category: "validator",
        icon: ShieldCheck,
        status: "verified",
        latency: "45ms",
        throughput: "12,000 rows/sec",
        description: "Extracts tabular data streams, resolves mismatched date formats, strips trailing whitespace, and coerces currency strings into numeric decimals.",
        inputPayload: { rawRows: 14800, sheets: ["Domestic", "APAC", "EMEA"] },
        outputPayload: { validRows: 14782, quarantinedRows: 18 },
        configSnippet: `// CSV / XLSX Parser
const records = parseWorkbookStream(stream, { sanitizeHeaders: true });`
      },
      {
        id: 3,
        label: "Variance & KPI Math Engine",
        role: "Automated Financial Metric Computations",
        category: "ai-core",
        icon: Sparkles,
        status: "verified",
        latency: "38ms",
        throughput: "50,000 calc/sec",
        description: "Calculates YoY revenue growth, profit margin percentiles, variance versus quarterly forecasts, and flags anomalies exceeding 15%.",
        inputPayload: { grossRevenue: "$4,280,000", costOfSales: "$1,890,000" },
        outputPayload: { grossMargin: "55.84%", yoyVariance: "+18.2%", anomalyDetected: false },
        configSnippet: `// Financial Computation Logic
const grossMargin = ((rev - cogs) / rev) * 100;
const variance = ((rev - forecast) / forecast) * 100;`
      },
      {
        id: 4,
        label: "Discrepancy Branch Switch",
        role: "Conditional Audit Flagging",
        category: "router",
        icon: GitBranch,
        status: "verified",
        latency: "3ms",
        throughput: "10,000 checks/sec",
        description: "Checks if variance exceeds tolerance thresholds. If within normal bounds, routes straight to executive database sync; otherwise routes to compliance review.",
        inputPayload: { anomalyDetected: false, toleranceThreshold: 0.15 },
        outputPayload: { route: "AUTO_APPROVE_SYNC", requiresHumanSignoff: false },
        configSnippet: `if (row.variance > 0.15) route("FLAG_AUDIT"); else route("DIRECT_LOAD");`
      },
      {
        id: 5,
        label: "Analytical Aggregator",
        role: "Multi-Dimension Cube Aggregation",
        category: "transform",
        icon: RefreshCw,
        status: "verified",
        latency: "28ms",
        throughput: "8,000 aggregations/sec",
        description: "Groups operational figures by regional entity, product line, and fiscal month for direct ingestion into executive business intelligence dashboards.",
        inputPayload: { regionalData: ["Domestic", "APAC", "EMEA"] },
        outputPayload: { aggregatedKpis: { totalEbitda: "$1.42M", growthRate: "14.6%" } },
        configSnippet: `// Multi-dimensional Data Rollup
return groupByRegionAndQuarter(cleanDataset);`
      },
      {
        id: 6,
        label: "Warehouse Streaming Pipe",
        role: "Analytical Data Warehouse Sync",
        category: "gateway",
        icon: Globe,
        status: "verified",
        latency: "84ms",
        throughput: "2,500 batches/min",
        description: "Streams aggregated rows into cloud data warehouses via bulk upsert APIs with transactional rollbacks on integrity errors.",
        inputPayload: { batchSize: 5000, targetTable: "fact_weekly_revenues" },
        outputPayload: { insertedRows: 14782, batchCommitTimeMs: 84 },
        configSnippet: `// Warehouse Ingestion
await warehouse.bulkInsert("fact_weekly_revenues", cleanDataset);`
      },
      {
        id: 7,
        label: "Cold Storage Ledger Archive",
        role: "Immutable Historical Ledger",
        category: "storage",
        icon: Database,
        status: "verified",
        latency: "35ms",
        throughput: "500 writes/sec",
        description: "Archives complete normalized dataset snapshot in encrypted cold object storage for statutory financial record-keeping.",
        inputPayload: { snapshotId: "SNAP-2024-Q3-W38", compression: "gzip" },
        outputPayload: { archiveUrl: "s3://finance-archive/q3/w38.gz", sha256: "9a8f...21c" },
        configSnippet: `// Cold Storage Archival
await coldStorage.putObject(archiveKey, compressedGzip);`
      },
      {
        id: 8,
        label: "Executive Briefing Broadcaster",
        role: "Automated Email & Slack KPI Delivery",
        category: "notify",
        icon: Bell,
        status: "verified",
        latency: "40ms",
        throughput: "300 dispatches/min",
        description: "Generates formatted executive summary card with interactive chart links and delivers to financial leaders via Slack & automated email digests.",
        inputPayload: { targetRecipients: ["cfo@company.com", "vpop@company.com"] },
        outputPayload: { emailDelivered: true, slackNotified: true },
        configSnippet: `// Executive Email & Slack Broadcast
await sendExecutiveEmail({ to: recipients, subject: "Q3 Revenue Verified", body: report });`
      }
    ]
  },
  {
    id: "preset-private-agent",
    name: "Autonomous Multi-Agent Decision Cascade",
    category: "Autonomous Systems & Local AI",
    description: "Multi-stage agentic workflow orchestrating local LLM inferences, tool-calling pipelines, dynamic safety filters, and autonomous task dispatch with zero cloud egress.",
    throughputSla: "<320ms Local Pipeline",
    efficiencyGain: "100% Data Confidentiality & $0 Cloud API Fees",
    nodes: [
      {
        id: 1,
        label: "Prompt Ingress Gateway",
        role: "Client Query Capture & Token Budgeting",
        category: "trigger",
        icon: Zap,
        status: "verified",
        latency: "8ms",
        throughput: "600 req/sec",
        description: "Receives user tasks via internal REST endpoints. Calculates token limits and authenticates client application session.",
        inputPayload: { query: "Audit system security policies and generate compliance check report.", maxTokens: 1024 },
        outputPayload: { sanitizedQuery: "Audit system security policies...", tokenAllowance: 1024 },
        configSnippet: `// Ingress Gateway Filter
const tokenBudget = estimateTokens(query.text);`
      },
      {
        id: 2,
        label: "Injection Defense Filter",
        role: "Defensive Prompt Boundary Check",
        category: "validator",
        icon: ShieldCheck,
        status: "verified",
        latency: "6ms",
        throughput: "2,400 checks/sec",
        description: "Scans inbound query for prompt injection vectors, jailbreak delimiters, and system override attempts using compiled AST rules.",
        inputPayload: { rawText: "Audit system security policies..." },
        outputPayload: { jailbreakDetected: false, safetyScore: 1.0 },
        configSnippet: `// Guardrail Validator
if (hasPromptInjection(input)) throw new SecurityViolation();`
      },
      {
        id: 3,
        label: "Local Reasoner Model",
        role: "Private On-Device LLM Inference",
        category: "ai-core",
        icon: Sparkles,
        status: "verified",
        latency: "192ms",
        throughput: "45 tokens/sec",
        description: "Runs local quantized model via FastAPI bridge. Generates tool call arguments and reasoning chain without sending bytes to external clouds.",
        inputPayload: { model: "llama-3-8b-instruct", prompt: "Evaluate system security policies" },
        outputPayload: { toolNeeded: "scan_firewall_rules", args: { level: "thorough" } },
        configSnippet: `// Local Inference Bridge
const res = await callLocalOllama({ model: "llama3", prompt });`
      },
      {
        id: 4,
        label: "Tool Execution Router",
        role: "Sandboxed Function Dispatcher",
        category: "router",
        icon: GitBranch,
        status: "verified",
        latency: "12ms",
        throughput: "1,200 tools/sec",
        description: "Validates tool permissions in a sandboxed runtime. Executes local security scanner and captures output buffers.",
        inputPayload: { tool: "scan_firewall_rules", allowed: true },
        outputPayload: { scanComplete: true, openPortsCount: 2, policyCompliant: true },
        configSnippet: `// Sandboxed Tool Dispatcher
const result = await sandbox.run(toolName, toolArgs);`
      },
      {
        id: 5,
        label: "Result Synthesizer",
        role: "Multi-Tool Output Aggregation",
        category: "transform",
        icon: RefreshCw,
        status: "verified",
        latency: "14ms",
        throughput: "3,000 ops/sec",
        description: "Aggregates raw outputs from multiple internal diagnostic tools into a concise, unified incident matrix.",
        inputPayload: { scanFindings: { openPorts: 2 }, auditStatus: "PASS" },
        outputPayload: { complianceGrade: "A+", vulnerabilitiesFound: 0 },
        configSnippet: `// Synthesizer Aggregator
return compileAuditMatrix(scanFindings);`
      },
      {
        id: 6,
        label: "Local Vector Memory Sync",
        role: "Semantic Embedding Indexing",
        category: "gateway",
        icon: Globe,
        status: "verified",
        latency: "35ms",
        throughput: "800 queries/sec",
        description: "Computes sentence embeddings locally and stores operational memories in local vector database for instant future recall.",
        inputPayload: { textToEmbed: "Security policy audit: Grade A+ completed on schedule." },
        outputPayload: { vectorId: "VEC-89104", indexUpdated: true },
        configSnippet: `// Local Vector Database Store
await vectorDb.upsert({ id: eventId, values: embeddings });`
      },
      {
        id: 7,
        label: "Audit Ledger Storage",
        role: "Local Append-Only Audit Log",
        category: "storage",
        icon: Database,
        status: "verified",
        latency: "9ms",
        throughput: "4,500 logs/sec",
        description: "Appends tamper-evident cryptographic hash of the execution outcome to internal on-premise log file.",
        inputPayload: { action: "AGENT_AUDIT_COMPLETED", hash: "SHA256:e3b0c442..." },
        outputPayload: { blockHeight: 14092, verified: true },
        configSnippet: `// Tamper-Evident Ledger
ledger.append({ timestamp: Date.now(), hash: computeSha256(result) });`
      },
      {
        id: 8,
        label: "Console Dispatch Notification",
        role: "Secure Admin Broadcast",
        category: "notify",
        icon: Bell,
        status: "verified",
        latency: "10ms",
        throughput: "1,500 alerts/sec",
        description: "Streams live notification message to local systems dashboard and administrative console with zero external cloud dependencies.",
        inputPayload: { target: "admin_terminal_dock", status: "HEALTHY" },
        outputPayload: { rendered: true, timestamp: new Date().toISOString() },
        configSnippet: `// Admin Console Stream
adminSocket.emit("AUDIT_COMPLETED", { grade: "A+", elapsed: 320 });`
      }
    ]
  }
];

export const LabExperimentsSection: React.FC = () => {
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [selectedNodeId, setSelectedNodeId] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [viewMode, setViewMode] = useState<"orbital" | "grid">("orbital");
  
  // Execution pulse state
  const [isExecutingPulse, setIsExecutingPulse] = useState<boolean>(false);
  const [executingNodeIndex, setExecutingNodeIndex] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [pulseLogs, setPulseLogs] = useState<Array<{ timestamp: string; step: string; message: string; duration: string }>>([]);

  const currentPreset = WORKFLOW_PRESETS[activePresetIndex];
  const selectedNode = currentPreset.nodes.find((n) => n.id === selectedNodeId) || currentPreset.nodes[0];

  // Auto-rotation effect
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isRotating && !isExecutingPulse && viewMode === "orbital") {
        setRotationAngle((prev) => (prev + dt * 14 * rotationSpeed) % 360);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isRotating, isExecutingPulse, rotationSpeed, viewMode]);

  // Execute workflow pulse simulation
  const handleTriggerPulse = () => {
    if (isExecutingPulse) return;
    setIsExecutingPulse(true);
    setPulseLogs([]);

    const totalNodes = currentPreset.nodes.length;
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < totalNodes) {
        const node = currentPreset.nodes[currentIdx];
        setExecutingNodeIndex(currentIdx);
        setSelectedNodeId(node.id);

        const now = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setPulseLogs((prev) => [
          ...prev,
          {
            timestamp: now,
            step: `[NODE 0${node.id}]`,
            message: `${node.label} -> ${node.role} (Status: 200 OK)`,
            duration: node.latency
          }
        ]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setExecutingNodeIndex(null);
        setIsExecutingPulse(false);
      }
    }, 450);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedNode.configSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedNode.outputPayload, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Node category badge style
  const getNodeColorClass = (cat: WorkflowNode["category"], isSelected: boolean, isPulseActive: boolean) => {
    if (isPulseActive) {
      return "border-amber-300 bg-amber-400 text-black shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-110";
    }
    if (isSelected) {
      return "border-amber-400 bg-amber-500/25 text-amber-200 shadow-[0_0_20px_rgba(212,175,55,0.6)]";
    }
    return "border-amber-500/35 bg-[#090a10] text-amber-300 hover:border-amber-400/80 hover:bg-[#12121c]";
  };

  return (
    <section 
      id="lab" 
      className="relative py-20 lg:py-28 w-full border-t border-amber-500/20 bg-[#040406] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-none blur-[160px] pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(212,175,55,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Section Header with Exact Name Requested */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bespoke-pill text-amber-300 mb-3 border-amber-500/30">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest">[SYS/09] AUTONOMOUS EXECUTION GRAPH</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            automation workflow design
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl font-sans">
            Interactive rotating workflow canvas modeling real-world automated pipelines. Inspect event ingestion, cognitive reasoners, resilient branch switches, and transaction persistence with live execution telemetry.
          </p>

          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-none mt-4" />
        </div>

        {/* Workflow Preset Switcher Bar */}
        <div className="mb-8 p-3 bg-[#08080c] border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider flex items-center gap-1.5 mr-1">
              <Workflow className="w-3.5 h-3.5" />
              <span>Pipeline:</span>
            </span>
            {WORKFLOW_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setActivePresetIndex(idx);
                  setSelectedNodeId(1);
                  setPulseLogs([]);
                }}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activePresetIndex === idx
                    ? "bg-amber-400 text-black font-bold shadow-sm"
                    : "bg-[#111118] text-neutral-300 border border-amber-500/25 hover:text-amber-300 hover:border-amber-400/60"
                }`}
              >
                {preset.name.split(" ")[0]} {preset.name.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>SLA: <strong className="text-amber-300">{currentPreset.throughputSla}</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-neutral-300">{currentPreset.efficiencyGain}</span>
            </div>
          </div>
        </div>

        {/* MAIN INTERACTIVE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLUMNS: Rotating Workflow Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Canvas Container with Controls */}
            <div className="p-4 sm:p-5 bg-[#07070b] border border-amber-500/30 shadow-2xl relative">
              {/* Top Control Header */}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-none ${isRotating ? "bg-amber-400 animate-ping" : "bg-neutral-600"}`} />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {viewMode === "orbital" ? "Rotating Orbital Flow View" : "Sequential Graph View"}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {currentPreset.nodes.length} NODES
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-amber-500/30 bg-black/60 p-0.5">
                    <button
                      type="button"
                      onClick={() => setViewMode("orbital")}
                      className={`px-2 py-1 text-[10px] font-mono transition-all cursor-pointer ${
                        viewMode === "orbital" ? "bg-amber-400 text-black font-bold" : "text-neutral-400 hover:text-amber-300"
                      }`}
                      title="Orbital 3D Rotating View"
                    >
                      Orbital
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`px-2 py-1 text-[10px] font-mono transition-all cursor-pointer ${
                        viewMode === "grid" ? "bg-amber-400 text-black font-bold" : "text-neutral-400 hover:text-amber-300"
                      }`}
                      title="Linear Graph Canvas"
                    >
                      Linear
                    </button>
                  </div>

                  {/* Play / Pause Rotation */}
                  <button
                    type="button"
                    onClick={() => setIsRotating((prev) => !prev)}
                    className="p-1.5 bg-[#12121a] border border-amber-500/30 text-amber-300 hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
                    title={isRotating ? "Pause Rotation" : "Start Rotation"}
                  >
                    {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  {/* Speed Toggle */}
                  <button
                    type="button"
                    onClick={() => setRotationSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
                    className="px-2 py-1 bg-[#12121a] border border-amber-500/30 text-[10.5px] font-mono text-amber-300 hover:text-white cursor-pointer"
                    title="Change Rotation Speed"
                  >
                    {rotationSpeed}x
                  </button>
                </div>
              </div>

              {/* VIEW A: ORBITAL ROTATING CANVAS */}
              {viewMode === "orbital" && (
                <div className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center bg-[#050508] border border-amber-500/15 overflow-hidden select-none">
                  {/* Central Core: The Golden Autonomous Reactor */}
                  <div className="absolute w-28 h-28 rounded-none border border-amber-400/40 bg-gradient-to-br from-amber-500/20 via-black to-black backdrop-blur-md flex flex-col items-center justify-center z-10 shadow-[0_0_35px_rgba(212,175,55,0.3)]">
                    <div className="w-20 h-20 border border-dashed border-amber-300/30 animate-spin flex items-center justify-center" style={{ animationDuration: "14s" }}>
                      <Cpu className="w-7 h-7 text-amber-300" />
                    </div>
                    <span className="text-[9px] font-mono text-amber-300 font-bold uppercase tracking-wider mt-1">
                      CORE ROUTER
                    </span>
                    <span className="text-[8px] font-mono text-neutral-400">
                      200 OK
                    </span>
                  </div>

                  {/* Concentric Orbital Rings */}
                  <div className="absolute w-[360px] h-[360px] rounded-full border border-amber-500/20 pointer-events-none" />
                  <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-amber-500/15 pointer-events-none animate-spin" style={{ animationDuration: "60s" }} />

                  {/* SVG Connecting Curves between consecutive nodes */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="orbitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>

                    {currentPreset.nodes.map((_, i) => {
                      const total = currentPreset.nodes.length;
                      const nextI = (i + 1) % total;

                      const angle1 = ((i / total) * 360 + rotationAngle) % 360;
                      const angle2 = ((nextI / total) * 360 + rotationAngle) % 360;

                      const rad1 = (angle1 * Math.PI) / 180;
                      const rad2 = (angle2 * Math.PI) / 180;

                      const radiusX = 175;
                      const radiusY = 155;

                      const cx = 270;
                      const cy = 250;

                      const x1 = cx + radiusX * Math.cos(rad1);
                      const y1 = cy + radiusY * Math.sin(rad1);
                      const x2 = cx + radiusX * Math.cos(rad2);
                      const y2 = cy + radiusY * Math.sin(rad2);

                      return (
                        <g key={i}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="url(#orbitLineGrad)"
                            strokeWidth={isExecutingPulse && executingNodeIndex === i ? "3" : "1.2"}
                            strokeDasharray={isExecutingPulse ? "4 4" : "none"}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Rotating Nodes */}
                  {currentPreset.nodes.map((node, index) => {
                    const total = currentPreset.nodes.length;
                    const angle = ((index / total) * 360 + rotationAngle) % 360;
                    const radian = (angle * Math.PI) / 180;

                    const radiusX = 180;
                    const radiusY = 160;

                    const x = radiusX * Math.cos(radian);
                    const y = radiusY * Math.sin(radian);

                    const isSelected = selectedNodeId === node.id;
                    const isPulseActive = executingNodeIndex === index;
                    const NodeIcon = node.icon;

                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                          zIndex: isSelected || isPulseActive ? 40 : 20
                        }}
                        className="absolute flex flex-col items-center cursor-pointer transition-transform duration-100 group"
                      >
                        {/* Node Badge */}
                        <div
                          className={`w-11 h-11 border-2 flex items-center justify-center transition-all duration-300 ${getNodeColorClass(
                            node.category,
                            isSelected,
                            isPulseActive
                          )}`}
                        >
                          <NodeIcon size={18} />
                        </div>

                        {/* Node Label Card */}
                        <div
                          className={`mt-1.5 px-2 py-0.5 text-[9.5px] font-mono tracking-wider whitespace-nowrap border transition-all ${
                            isSelected || isPulseActive
                              ? "bg-black/95 text-amber-300 border-amber-400 font-bold shadow-md"
                              : "bg-black/75 text-neutral-300 border-amber-500/20 group-hover:border-amber-400 group-hover:text-amber-200"
                          }`}
                        >
                          {node.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIEW B: LINEAR STRUCTURED CANVAS */}
              {viewMode === "grid" && (
                <div className="w-full h-[480px] sm:h-[540px] p-4 bg-[#050508] border border-amber-500/15 overflow-y-auto space-y-3">
                  <div className="text-xs font-mono text-neutral-400 mb-2">
                    Sequential Workflow Execution Graph: Click any node to load configuration.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPreset.nodes.map((node, idx) => {
                      const isSelected = selectedNodeId === node.id;
                      const isPulseActive = executingNodeIndex === idx;
                      const NodeIcon = node.icon;

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`p-3 border transition-all cursor-pointer flex items-start gap-3 ${
                            isPulseActive
                              ? "bg-amber-400 text-black border-amber-300 shadow-lg scale-[1.02]"
                              : isSelected
                              ? "bg-[#14141e] border-amber-400 text-white"
                              : "bg-[#090a10] border-amber-500/25 text-neutral-300 hover:border-amber-400/60"
                          }`}
                        >
                          <div
                            className={`p-2 border ${
                              isPulseActive
                                ? "bg-black text-amber-400 border-black"
                                : isSelected
                                ? "bg-amber-400 text-black border-amber-400"
                                : "bg-black text-amber-300 border-amber-500/30"
                            }`}
                          >
                            <NodeIcon size={16} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="font-bold opacity-80">[STEP 0{node.id}]</span>
                              <span>{node.latency}</span>
                            </div>
                            <h4 className="font-mono text-xs font-bold truncate mt-0.5">{node.label}</h4>
                            <p className="text-[10.5px] opacity-75 font-sans line-clamp-1 mt-0.5">
                              {node.role}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Execution Bar */}
              <div className="mt-4 pt-3 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTriggerPulse}
                    disabled={isExecutingPulse}
                    className={`px-4 py-2 font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                      isExecutingPulse
                        ? "bg-amber-500 text-black animate-pulse"
                        : "bg-amber-400 text-black hover:bg-amber-300 active:scale-95"
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>{isExecutingPulse ? "EXECUTING FLOW PULSE..." : "TRIGGER WORKFLOW PULSE"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRotationAngle(0);
                      setSelectedNodeId(1);
                    }}
                    className="px-3 py-2 bg-[#12121a] hover:bg-neutral-800 border border-amber-500/30 text-neutral-300 hover:text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Reset View</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-amber-300/80">
                  Active Node: <strong className="text-white">[0{selectedNode.id}] {selectedNode.label}</strong>
                </div>
              </div>
            </div>

            {/* Live Telemetry Execution Log Console */}
            <div className="p-4 bg-[#060609] border border-amber-500/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10.5px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Real-Time Execution Logs</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {pulseLogs.length > 0 ? `${pulseLogs.length} events logged` : "Awaiting execution pulse"}
                </span>
              </div>

              <div className="h-28 overflow-y-auto bg-black p-2.5 font-mono text-[11px] border border-amber-500/15 space-y-1">
                {pulseLogs.length === 0 ? (
                  <div className="text-neutral-500 italic">
                    Press "TRIGGER WORKFLOW PULSE" above to witness live node routing, data transformations, and SLA metrics...
                  </div>
                ) : (
                  pulseLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 text-neutral-300 animate-in fade-in">
                      <span className="text-neutral-500">[{log.timestamp}]</span>
                      <span className="text-amber-400 font-bold">{log.step}</span>
                      <span className="flex-1 text-neutral-200">{log.message}</span>
                      <span className="text-emerald-400">{log.duration}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Node Configuration & Payload Inspector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 bg-[#08080d] border border-amber-500/30 shadow-2xl">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4 border-b border-amber-500/20 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                      NODE INSPECTOR 0{selectedNode.id}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{selectedNode.status.toUpperCase()}</span>
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    {selectedNode.label}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400 block mt-0.5">
                    {selectedNode.role}
                  </span>
                </div>

                <div className="p-2.5 border border-amber-400/40 bg-black text-amber-300">
                  <selectedNode.icon size={22} />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 font-sans leading-relaxed mb-4 p-3 bg-black/60 border border-amber-500/15">
                {selectedNode.description}
              </p>

              {/* Metric Row */}
              <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-center">
                <div className="p-2.5 bg-[#0f0f18] border border-amber-500/20">
                  <span className="text-[9.5px] text-neutral-400 uppercase block">Node Latency</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5 block">{selectedNode.latency}</span>
                </div>
                <div className="p-2.5 bg-[#0f0f18] border border-amber-500/20">
                  <span className="text-[9.5px] text-neutral-400 uppercase block">Throughput Rate</span>
                  <span className="text-sm font-bold text-emerald-300 mt-0.5 block">{selectedNode.throughput}</span>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Node Logic / Configuration</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-2 py-0.5 bg-[#12121a] hover:bg-amber-400 hover:text-black border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center gap-1 cursor-pointer transition-all"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black border border-amber-500/25 font-mono text-xs text-neutral-300 overflow-x-auto max-h-36 leading-relaxed">
                  <code>{selectedNode.configSnippet}</code>
                </pre>
              </div>

              {/* Output Payload JSON Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Output Schema Payload</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="px-2 py-0.5 bg-[#12121a] hover:bg-amber-400 hover:text-black border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center gap-1 cursor-pointer transition-all"
                  >
                    {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedJson ? "Copied" : "Copy JSON"}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black border border-amber-500/25 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-36 leading-relaxed">
                  <code>{JSON.stringify(selectedNode.outputPayload, null, 2)}</code>
                </pre>
              </div>

              {/* Navigation to Prev / Next Node */}
              <div className="mt-5 pt-3 border-t border-amber-500/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const prevId = selectedNode.id === 1 ? currentPreset.nodes.length : selectedNode.id - 1;
                    setSelectedNodeId(prevId);
                  }}
                  className="px-3 py-1 bg-[#12121a] border border-amber-500/30 hover:border-amber-400 text-xs font-mono text-neutral-300 hover:text-white cursor-pointer"
                >
                  ← Previous Node
                </button>

                <span className="text-xs font-mono text-amber-400">
                  {selectedNode.id} of {currentPreset.nodes.length}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const nextId = selectedNode.id === currentPreset.nodes.length ? 1 : selectedNode.id + 1;
                    setSelectedNodeId(nextId);
                  }}
                  className="px-3 py-1 bg-[#12121a] border border-amber-500/30 hover:border-amber-400 text-xs font-mono text-neutral-300 hover:text-white cursor-pointer"
                >
                  Next Node →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabExperimentsSection;
