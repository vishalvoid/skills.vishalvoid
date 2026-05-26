"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { skills } from "@/data/skills";
import { externalSkills, PROVIDER_SLUGS, PROVIDER_NAMES, CATEGORY_COLORS } from "@/data/external-skills";
import type { Skill } from "@/lib/types";
import type { ExternalSkill } from "@/data/external-skills";

// Build slug → providerId map once
const slugToProvider = new Map<string, string>();
for (const { id, slugs } of PROVIDER_SLUGS) {
  for (const slug of slugs) slugToProvider.set(slug, id);
}

type InternalItem = { type: "mine"; skill: Skill };
type ExternalItem = { type: "external"; skill: ExternalSkill; providerId: string };
type SearchItem = InternalItem | ExternalItem;

const ALL_ITEMS: SearchItem[] = [
  ...skills.map((s) => ({ type: "mine" as const, skill: s })),
  ...externalSkills.map((s) => ({
    type: "external" as const,
    skill: s,
    providerId: slugToProvider.get(s.slug) ?? "external",
  })),
];

function filterItems(query: string): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_ITEMS.slice(0, 20);
  return ALL_ITEMS.filter((item) => {
    const s = item.skill;
    return (
      s.name.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      (item.type === "external" && PROVIDER_NAMES[item.providerId]?.toLowerCase().includes(q))
    );
  }).slice(0, 40);
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = filterItems(query);
  const mine = filtered.filter((i): i is InternalItem => i.type === "mine");
  const external = filtered.filter((i): i is ExternalItem => i.type === "external");
  const flat = [...mine, ...external];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const navigate = useCallback((item: SearchItem) => {
    close();
    if (item.type === "mine") {
      router.push(`/${item.skill.slug}`);
    } else {
      router.push(`/skills/${item.providerId}/${item.skill.slug}`);
    }
  }, [close, router]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) { close(); return; }
      if (e.key === "/" && !open &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && flat[selected]) navigate(flat[selected]);
  }

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${selected}"]`)?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  /* ── Trigger button ── */
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Search skills"
        className="w-full flex items-center gap-2 h-8 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] hover:border-black/18 dark:hover:border-white/15 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all group"
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          className="text-black/30 dark:text-white/25 shrink-0 group-hover:text-black/50 dark:group-hover:text-white/40 transition-colors">
          <circle cx="6.5" cy="6.5" r="4.5" /><path d="M11 11l3 3" />
        </svg>
        <span className="font-mono text-[11px] text-black/35 dark:text-white/30 flex-1 text-left group-hover:text-black/55 dark:group-hover:text-white/45 transition-colors">
          Search skills…
        </span>
        <kbd className="inline-flex items-center justify-center h-4 w-4 rounded text-[10px] font-mono text-black/25 dark:text-white/20 bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/10 shrink-0">
          /
        </kbd>
      </button>
    );
  }

  /* ── Modal ── */
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] px-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="w-full max-w-[600px] rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0e0e0e] shadow-2xl shadow-black/25 dark:shadow-black/70 overflow-hidden flex flex-col max-h-[72vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/8 dark:border-white/8">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            className="text-black/30 dark:text-white/25 shrink-0" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="4.5" /><path d="M11 11l3 3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search skills, providers, topics…"
            className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none"
            aria-label="Search"
          />
          {query && (
            <button onClick={() => { setQuery(""); setSelected(0); inputRef.current?.focus(); }}
              className="text-black/25 dark:text-white/20 hover:text-black/50 dark:hover:text-white/40 transition-colors shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="shrink-0 inline-flex items-center justify-center h-5 px-1.5 rounded text-[10px] font-mono text-black/25 dark:text-white/20 bg-black/5 dark:bg-white/7 border border-black/8 dark:border-white/10">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="overflow-y-auto overscroll-contain flex-1">
          {flat.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/20 dark:text-white/15">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <p className="text-sm text-black/30 dark:text-white/25">
                No results for <span className="font-medium text-black/50 dark:text-white/40">&ldquo;{query}&rdquo;</span>
              </p>
            </div>
          ) : (
            <>
              {mine.length > 0 && (
                <section>
                  <div className="px-4 pt-4 pb-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-black/25 dark:text-white/20">
                      vishalvoid
                    </span>
                    <span className="text-[10px] font-mono text-black/18 dark:text-white/15 bg-black/5 dark:bg-white/8 px-1.5 py-0.5 rounded-full">
                      {mine.length}
                    </span>
                  </div>
                  {mine.map((item, i) => {
                    const s = item.skill;
                    const idx = i;
                    return (
                      <button key={s.slug} data-idx={idx}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setSelected(idx)}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                          selected === idx ? "bg-black/5 dark:bg-white/6" : "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="shrink-0 flex flex-col items-start min-w-0 flex-1">
                          {/* Path */}
                          <div className="flex items-center gap-1 font-mono text-[10px] text-black/30 dark:text-white/25 mb-0.5">
                            <span>skills</span>
                            <span className="text-black/15 dark:text-white/12">/</span>
                            <span className="text-blue-500 dark:text-blue-400">vishalvoid</span>
                            <span className="text-black/15 dark:text-white/12">/</span>
                            <span>{s.slug}</span>
                          </div>
                          <span className="text-sm font-medium text-black dark:text-white truncate w-full">{s.name}</span>
                          <span className="text-[11px] text-black/40 dark:text-white/35 truncate w-full mt-0.5">{s.tagline}</span>
                        </div>
                        <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium border ${
                          s.category === "Patterns" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20" :
                          s.category === "Architecture" ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/20" :
                          "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20"
                        }`}>
                          {s.category}
                        </span>
                      </button>
                    );
                  })}
                </section>
              )}

              {external.length > 0 && (
                <section>
                  <div className="px-4 pt-4 pb-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-black/25 dark:text-white/20">
                      Directory
                    </span>
                    <span className="text-[10px] font-mono text-black/18 dark:text-white/15 bg-black/5 dark:bg-white/8 px-1.5 py-0.5 rounded-full">
                      {external.length}
                    </span>
                  </div>
                  {external.map((item, i) => {
                    const s = item.skill;
                    const providerName = PROVIDER_NAMES[item.providerId] ?? item.providerId;
                    const idx = mine.length + i;
                    const colorCls = CATEGORY_COLORS[s.category] ??
                      "text-black/40 dark:text-white/35 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10";
                    return (
                      <button key={`${item.providerId}-${s.slug}`} data-idx={idx}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setSelected(idx)}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                          selected === idx ? "bg-black/5 dark:bg-white/6" : "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="shrink-0 flex flex-col items-start min-w-0 flex-1">
                          {/* Path */}
                          <div className="flex items-center gap-1 font-mono text-[10px] text-black/30 dark:text-white/25 mb-0.5">
                            <span>skills</span>
                            <span className="text-black/15 dark:text-white/12">/</span>
                            <span className="text-black/45 dark:text-white/40">{providerName}</span>
                            <span className="text-black/15 dark:text-white/12">/</span>
                            <span className="truncate">{s.slug}</span>
                          </div>
                          <span className="text-sm font-medium text-black dark:text-white truncate w-full">{s.name}</span>
                          <span className="text-[11px] text-black/40 dark:text-white/35 truncate w-full mt-0.5">{s.tagline}</span>
                        </div>
                        <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium border ${colorCls}`}>
                          {s.category.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </section>
              )}
            </>
          )}
          <div className="h-3" />
        </div>

        {/* Footer */}
        <div className="border-t border-black/8 dark:border-white/8 px-4 py-2 flex items-center gap-4 text-[10px] font-mono text-black/22 dark:text-white/18">
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center w-4 h-4 rounded border border-black/12 dark:border-white/12 text-[9px]">↑</kbd>
            <kbd className="inline-flex items-center justify-center w-4 h-4 rounded border border-black/12 dark:border-white/12 text-[9px]">↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center h-4 px-1.5 rounded border border-black/12 dark:border-white/12 text-[9px]">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center h-4 px-1.5 rounded border border-black/12 dark:border-white/12 text-[9px]">esc</kbd>
            close
          </span>
          <span className="ml-auto text-black/18 dark:text-white/15">
            {flat.length} results
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
