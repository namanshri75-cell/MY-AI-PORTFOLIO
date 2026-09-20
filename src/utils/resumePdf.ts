import { jsPDF } from "jspdf";
import { PERSONAL_INFO, ABOUT_TEXT, EXPERIENCE_DATA, SKILL_CATEGORIES, ACHIEVEMENTS, EDUCATION_ITEM, CERTIFICATION_ITEM, LEADERSHIP_ITEM } from "../data/portfolioData";

export function generateResumePDF(): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header background banner
  doc.setFillColor(10, 15, 26);
  doc.rect(0, 0, pageWidth, 42, "F");

  // Accent line
  doc.setFillColor(0, 255, 198);
  doc.rect(0, 41, pageWidth, 1.2, "F");

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(PERSONAL_INFO.name.toUpperCase(), 14, 16);

  // Subtitle
  doc.setFontSize(10);
  doc.setTextColor(0, 255, 198);
  doc.text(PERSONAL_INFO.title, 14, 23);

  // Contact info row
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 210, 225);
  doc.text(
    `Email: ${PERSONAL_INFO.email}   |   Location: ${PERSONAL_INFO.location}   |   Focus: ${PERSONAL_INFO.targetRole}`,
    14,
    31
  );
  doc.text(
    `LinkedIn: ${PERSONAL_INFO.linkedin}   |   GitHub: ${PERSONAL_INFO.github}`,
    14,
    37
  );

  y = 48;

  // Helper for Section Headers
  const drawSectionHeader = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(10, 25, 50);
    doc.text(title.toUpperCase(), 14, y);

    doc.setDrawColor(0, 200, 165);
    doc.setLineWidth(0.6);
    doc.line(14, y + 2, pageWidth - 14, y + 2);
    y += 7;
  };

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeader("Professional Summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(40, 50, 65);
  const summaryText = `${ABOUT_TEXT.lead} ${ABOUT_TEXT.secondary} Focused on bridging business insight with automated workflows and practical AI prototyping.`;
  const splitSummary = doc.splitTextToSize(summaryText, pageWidth - 28);
  doc.text(splitSummary, 14, y);
  y += splitSummary.length * 4.4 + 4;

  // 2. SKILLS
  drawSectionHeader("Core Competencies & Tools (No Code / Low Code / Operations)");
  SKILL_CATEGORIES.forEach((cat) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${cat.title}:`, 14, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(50, 65, 85);
    const skillList = cat.skills.map((s) => s.name).join(" • ");
    const splitSkills = doc.splitTextToSize(skillList, pageWidth - 55);
    doc.text(splitSkills, 55, y);
    y += Math.max(splitSkills.length * 4, 4.5);
  });
  y += 4;

  // 3. EXPERIENCE
  drawSectionHeader("Professional Experience");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`${EXPERIENCE_DATA.role} — ${EXPERIENCE_DATA.company}`, 14, y);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(90, 105, 125);
  doc.text(`${EXPERIENCE_DATA.period}  |  ${EXPERIENCE_DATA.location}  |  ${EXPERIENCE_DATA.type}`, pageWidth - 14, y, { align: "right" });
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 65, 80);
  const expSummary = doc.splitTextToSize(EXPERIENCE_DATA.summary, pageWidth - 28);
  doc.text(expSummary, 14, y);
  y += expSummary.length * 4 + 2;

  EXPERIENCE_DATA.pillars.forEach((p) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 30, 45);
    doc.text(`• ${p.title}:`, 16, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(55, 65, 80);
    p.points.forEach((pt) => {
      const splitPoint = doc.splitTextToSize(`- ${pt}`, pageWidth - 36);
      doc.text(splitPoint, 20, y);
      y += splitPoint.length * 3.8;
    });
  });
  y += 3;

  // 4. SELECTED AI PROJECTS & EXPLORATIONS
  drawSectionHeader("Selected AI & Automation Projects");
  const projects = [
    {
      name: "NEXA — AI Assistant",
      tag: "Generative AI, AI Assistants, Firebase, Voice Tech",
      desc: "Conceptualized and prototyped an interactive AI assistant focusing on warm conversational UX, context awareness, and voice synthesis.",
    },
    {
      name: "AI-Powered Excel Dashboard",
      tag: "Excel Data, AI-assisted Analysis, KPI Dashboards",
      desc: "Designed an automated concept transforming raw spreadsheets into visual executive summaries and actionable KPI reports.",
    },
    {
      name: "AI Social Media Web Application",
      tag: "User Matching, Compatibility Logic, Product UX",
      desc: "Explored an interest-based matchmaking concept connecting individuals based on shared growth and curiosity vectors.",
    },
    {
      name: "Local AI & API Integration",
      tag: "Ollama, FastAPI, Local Inference, REST APIs",
      desc: "Experimented with running local open-weights LLMs offline and orchestrating endpoints via lightweight Python FastAPI scripts.",
    },
  ];

  projects.forEach((proj) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${proj.name}`, 14, y);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(0, 140, 115);
    doc.text(`[${proj.tag}]`, 85, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(60, 70, 85);
    const splitDesc = doc.splitTextToSize(proj.desc, pageWidth - 30);
    doc.text(splitDesc, 18, y);
    y += splitDesc.length * 3.8 + 1.5;
  });
  y += 2;

  // 5. ACHIEVEMENTS & LEADERSHIP
  drawSectionHeader("Achievements, Leadership & Education");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("• Hackathon Winner:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 85);
  doc.text("Won hackathon through collaborative problem-solving and rapid concept development.", 48, y);
  y += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("• IIT Roorkee Presentation:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 85);
  doc.text("Delivered an AI-related concept presentation and speech at IIT Roorkee.", 55, y);
  y += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("• Content Head — Udaan Dramatics:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 85);
  doc.text("Led content-related initiatives, stage copywriting, and digital communication at BBD University.", 66, y);
  y += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("• Education:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 85);
  doc.text(`${EDUCATION_ITEM.degree} — ${EDUCATION_ITEM.institution}`, 34, y);
  y += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("• Certification:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 85);
  doc.text(`${CERTIFICATION_ITEM.title} — ${CERTIFICATION_ITEM.issuer}`, 36, y);

  // Footer note
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(140, 150, 165);
  doc.text(
    `Verified factual profile & resume for Naman Srivastava | AI Applications & Automation`,
    pageWidth / 2,
    290,
    { align: "center" }
  );

  doc.save(PERSONAL_INFO.resumeFilename);
}
