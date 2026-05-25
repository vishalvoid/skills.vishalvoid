export interface SkillDoc {
  title: string;
  content: string;
  code?: string;
  language?: string;
  filename?: string;
}

export interface Skill {
  slug: string;
  name: string;
  category: "Patterns" | "Architecture" | "Design";
  tagline: string;
  description: string;
  tags: string[];
  installCmd: string;
  related?: string[];
  docs: SkillDoc[];
}
