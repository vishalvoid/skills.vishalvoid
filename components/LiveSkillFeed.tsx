"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SkillEntry {
  slug: string;
  provider: string;
  providerName: string;
  name: string;
}

const MAX_VISIBLE = 8;
const INTERVAL_MS = 900;

export default function LiveSkillFeed({ entries }: { entries: SkillEntry[] }) {
  const [visible, setVisible] = useState<(SkillEntry & { key: number })[]>([]);
  const [entering, setEntering] = useState<number | null>(null);
  const counterRef = useRef(0);
  const indexRef = useRef(0);

  useEffect(() => {
    // Seed initial entries
    const initial = entries.slice(0, MAX_VISIBLE).map((e, i) => ({
      ...e,
      key: i,
    }));
    counterRef.current = initial.length;
    indexRef.current = initial.length % entries.length;
    setVisible(initial);

    const id = setInterval(() => {
      const next = entries[indexRef.current];
      indexRef.current = (indexRef.current + 1) % entries.length;
      const key = counterRef.current++;

      setEntering(key);
      setVisible((prev) => {
        const updated = [...prev, { ...next, key }];
        return updated.slice(-MAX_VISIBLE);
      });
      setTimeout(() => setEntering(null), 400);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [entries]);

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-xl border border-black/10 dark:border-white/10 bg-black dark:bg-[#0a0a0a] overflow-hidden flex flex-col font-mono text-xs shadow-xl shadow-black/10 dark:shadow-black/40">

      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="ml-3 text-white/20 text-[10px] tracking-widest">skills — live</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400/70 text-[10px]">live</span>
        </span>
      </div>

      {/* Command line */}
      <div className="px-4 py-2 border-b border-white/5 text-white/25 text-[10px]">
        <span className="text-white/40">$</span> skills browse --stream --all
      </div>

      {/* Feed */}
      <div className="flex-1 flex flex-col justify-end px-4 py-3 gap-0 overflow-hidden">
        {visible.map((entry, i) => {
          const isNew = entry.key === entering;
          const globalIndex = counterRef.current - visible.length + i + 1;
          const opacity =
            i === 0 ? "opacity-20" :
            i === 1 ? "opacity-35" :
            i === 2 ? "opacity-50" :
            i === 3 ? "opacity-65" :
            "opacity-100";

          return (
            <Link
              key={entry.key}
              href={`/skills/${entry.provider}/${entry.slug}`}
              className={`group flex items-baseline gap-3 py-[5px] border-b border-white/[0.04] last:border-none transition-all duration-400 hover:bg-white/[0.03] -mx-4 px-4 rounded ${opacity} ${
                isNew ? "animate-[fadeSlideIn_0.35s_ease-out]" : ""
              }`}
              style={isNew ? { animation: "fadeSlideIn 0.35s ease-out" } : undefined}
            >
              <span className="text-white/20 w-7 shrink-0 text-right tabular-nums select-none">
                {String(globalIndex).padStart(3, "0")}
              </span>
              <span className="flex items-center gap-1 text-white/30 shrink-0">
                <span>skills</span>
                <span className="text-white/15">/</span>
                <span className="text-white/50">{entry.providerName}</span>
                <span className="text-white/15">/</span>
              </span>
              <span className="text-white font-medium truncate group-hover:text-white/80 transition-colors">
                {entry.slug}
              </span>
              {i === visible.length - 1 && (
                <span className="ml-0.5 inline-block w-[5px] h-[13px] bg-white/70 animate-[blink_1s_step-end_infinite] shrink-0" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black dark:from-[#0a0a0a] to-transparent pointer-events-none" />

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
