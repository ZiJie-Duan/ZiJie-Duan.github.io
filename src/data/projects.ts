import snapshot from "./projects.json";
import type { Lang } from "../lib";
export type Category =
  "ai" | "systems" | "hardware" | "web" | "tools" | "learning";
export type Stage = "ready" | "built" | "lab" | "notes" | "fork";
export type Project = (typeof snapshot.projects)[number];
export const reviewedAt = snapshot.reviewedAt;
export const categories: Record<
  Category,
  { zh: string; en: string; icon: string }
> = {
  ai: { zh: "AI 与交互", en: "AI & interaction", icon: "spark" },
  systems: { zh: "系统与网络", en: "Systems & networks", icon: "network" },
  hardware: { zh: "硬件与制造", en: "Hardware & making", icon: "chip" },
  web: { zh: "Web 应用", en: "Web applications", icon: "globe" },
  tools: { zh: "实用工具", en: "Utilities", icon: "code" },
  learning: { zh: "学习记录", en: "Learning notes", icon: "book" },
};
export const stages: Record<Stage, { zh: string; en: string; rank: number }> = {
  ready: { zh: "可上手", en: "Documented workflow", rank: 0 },
  built: { zh: "主体已实现", en: "Core implemented", rank: 1 },
  lab: { zh: "实验阶段", en: "Experimental", rank: 2 },
  notes: { zh: "资料记录", en: "Learning & content", rank: 3 },
  fork: { zh: "Fork", en: "Fork", rank: 4 },
};
export const projects = [...snapshot.projects].sort(
  (a, b) =>
    stages[a.stage as Stage].rank - stages[b.stage as Stage].rank ||
    a.order - b.order,
);
export const languages = [...new Set(projects.map((p) => p.language))].sort();
export const languageCounts = languages
  .map((name) => ({
    name,
    count: projects.filter((p) => p.language === name).length,
  }))
  .sort((a, b) => b.count - a.count);
export function searchable(project: Project): string {
  return [
    project.id,
    project.name,
    project.summary.zh,
    project.summary.en,
    project.language,
    categories[project.category as Category].zh,
    categories[project.category as Category].en,
  ]
    .join(" ")
    .toLowerCase();
}
export function categoryName(category: string, lang: Lang) {
  return categories[category as Category][lang];
}
export function stageName(stage: string, lang: Lang) {
  return stages[stage as Stage][lang];
}
