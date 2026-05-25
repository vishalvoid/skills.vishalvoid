"use client";

import { useState, useMemo } from "react";
import { Skill } from "@/lib/types";
import SkillCard from "@/components/SkillCard";

const CATEGORIES = ["All", "Patterns", "Architecture", "Design"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export default function HomeClient({ skills }: { skills: Skill[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return skills.filter((skill) => {
      const matchesCategory = category === "All" || skill.category === category;
      const matchesQuery =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.tagline.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [skills, query, category]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search + filter row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25 dark:text-white/25 pointer-events-none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="find a skill by name or topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/8 rounded-md pl-9 pr-4 py-2.5 font-mono text-sm text-black/70 dark:text-white/70 placeholder-black/25 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/20 focus:text-black dark:focus:text-white transition-colors"
          />
        </div>
        <div className="flex gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-md font-mono text-xs transition-colors cursor-pointer ${
                category === cat
                  ? "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white"
                  : "text-black/40 dark:text-white/35 hover:text-black/70 dark:hover:text-white/60 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-black/25 dark:text-white/20 font-mono text-sm">
          No skills match &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
