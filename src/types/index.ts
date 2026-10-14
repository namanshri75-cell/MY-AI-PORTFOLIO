export interface ProjectMilestone {
  step: string;
  title: string;
  phase: string;
  status: "completed" | "verified" | "live";
  description: string;
  automationOutcome: string;
  toolsUsed: string[];
  metrics: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "AI Assistant" | "Data & Analytics" | "Social Concept" | "Local AI & Systems";
  description: string;
  problemExplored: string;
  myContribution: string;
  technologies: string[];
  githubUrl?: string;
  status: string;
  interactiveType?: "nexa" | "excel" | "social" | "local_ai";
  milestones?: ProjectMilestone[];
}

export interface SkillItem {
  name: string;
  description: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  pillars: {
    title: string;
    points: string[];
  }[];
}

export interface AchievementItem {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  date?: string;
}
