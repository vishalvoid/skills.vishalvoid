import Link from "next/link";
import { Skill } from "@/lib/types";

const categoryBadge: Record<Skill["category"], string> = {
  Patterns: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20",
  Architecture: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/20",
  Design: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20",
};

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/${skill.slug}`}
      className="group flex flex-col gap-4 bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/8 rounded-lg p-5 hover:border-black/20 dark:hover:border-white/15 hover:shadow-sm dark:hover:shadow-none transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${categoryBadge[skill.category]}`}>
          {skill.category}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className="text-black/15 dark:text-white/15 group-hover:text-black/40 dark:group-hover:text-white/40 transition-colors shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-black dark:text-white text-sm leading-snug">
          {skill.name}
        </h2>
        <p className="text-black/50 dark:text-white/50 text-xs leading-relaxed">
          {skill.tagline}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] text-black/35 dark:text-white/30 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
