"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalSkill, SourceKey, SOURCES } from "@/data/external-skills";
import ExternalSkillCard from "@/components/ExternalSkillCard";

const ALL = "All" as const;
type Filter = typeof ALL | SourceKey;

// One strong pick from each major source — shown when "All" is active
const FEATURED_SLUGS = [
  "claude-tool-use",           // Anthropic
  "openai-function-calling",   // OpenAI
  "gemini-long-context",       // Google
  "react-server-components",   // React
  "nextjs-server-actions",     // Next.js
  "typescript-generics",       // TypeScript
  "prisma-orm",                // Databases
  "tailwind-css",              // CSS & Design
  "vitest",                    // Testing
];

export default function DirectoryPreview({ skills }: { skills: ExternalSkill[] }) {
  const [source, setSource] = useState<Filter>(ALL);

  const displayed =
    source === ALL
      ? (FEATURED_SLUGS.map((slug) => skills.find((s) => s.slug === slug)).filter(Boolean) as ExternalSkill[])
      : skills.filter((s) => s.source === source).slice(0, 9);

  const browseCount =
    source === ALL ? skills.length : skills.filter((s) => s.source === source).length;

  const browseHref =
    source === ALL ? "/skills" : `/skills?source=${encodeURIComponent(source)}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Source filter tabs */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setSource(ALL)}
          className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer ${
            source === ALL
              ? "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white"
              : "text-black/40 dark:text-white/35 hover:text-black/70 dark:hover:text-white/60 border border-transparent"
          }`}
        >
          All
        </button>
        {SOURCES.map((s) => (
          <button
            key={s}
            onClick={() => setSource(s)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer ${
              source === s
                ? "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white"
                : "text-black/40 dark:text-white/35 hover:text-black/70 dark:hover:text-white/60 border border-transparent"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((skill) => (
          <ExternalSkillCard key={skill.slug} skill={skill} />
        ))}
      </div>

      {/* Browse CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-black/8 dark:border-white/8">
        <p className="font-mono text-xs text-black/30 dark:text-white/25">
          Showing {displayed.length} of {browseCount}
          {source !== ALL ? ` ${source}` : ""} skills
        </p>
        <Link
          href={browseHref}
          className="inline-flex items-center gap-2 font-mono text-xs text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          Browse all {browseCount}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
