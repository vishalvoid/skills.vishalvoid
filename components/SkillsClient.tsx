"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ExternalSkill, SourceKey, SOURCES } from "@/data/external-skills";
import ExternalSkillCard from "@/components/ExternalSkillCard";

const ALL = "All" as const;
type Filter = typeof ALL | SourceKey;

function isSourceKey(value: string): value is SourceKey {
  return (SOURCES as readonly string[]).includes(value);
}

export default function SkillsClient({ skills }: { skills: ExternalSkill[] }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<Filter>(ALL);

  // Initialize from URL ?source= param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("source");
    if (s && isSourceKey(s)) setSource(s);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return skills.filter((skill) => {
      const matchesSource = source === ALL || skill.source === source;
      const matchesQuery =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.tags.some((t) => t.toLowerCase().includes(q)) ||
        skill.source.toLowerCase().includes(q);
      return matchesSource && matchesQuery;
    });
  }, [skills, query, source]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
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
          placeholder="search skills, sources, or topics"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/8 rounded-md pl-9 pr-4 py-2.5 font-mono text-sm text-black/70 dark:text-white/70 placeholder-black/25 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/20 focus:text-black dark:focus:text-white transition-colors"
        />
      </div>

      {/* Source filters */}
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

      {/* Result count */}
      <p className="font-mono text-xs text-black/30 dark:text-white/25">
        {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
        {query || source !== ALL ? " found" : " total"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-black/25 dark:text-white/20 font-mono text-sm">
          No skills match &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <ExternalSkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}

      {/* Back to home */}
      <div className="border-t border-black/8 dark:border-white/8 pt-6 mt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to my patterns
        </Link>
      </div>
    </div>
  );
}
