"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  href?: string;
}

interface Provider {
  id: string;
  name: string;
  count: number;
}

function useCountUp(target: number, duration = 1200, startDelay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
        else setCount(target);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [started, target, duration, startDelay]);

  return { count, ref };
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const { count, ref } = useCountUp(stat.value, 1400, delay);
  const content = (
    <div className="flex flex-col gap-1 group cursor-default">
      <span
        ref={ref}
        className="font-mono text-3xl sm:text-4xl font-bold text-black dark:text-white tabular-nums tracking-tight transition-all"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {count.toLocaleString()}{stat.suffix}
      </span>
      <span className="font-mono text-[10px] tracking-widest uppercase text-black/30 dark:text-white/25">
        {stat.label}
      </span>
    </div>
  );

  if (stat.href) {
    return (
      <Link href={stat.href} className="group hover:opacity-70 transition-opacity">
        {content}
      </Link>
    );
  }
  return content;
}

export default function HeroStats({
  stats,
  providers,
}: {
  stats: Stat[];
  providers: Provider[];
}) {
  // Duplicate for seamless loop
  const row1 = [...providers, ...providers];
  const row2 = [...providers].reverse();
  const row2doubled = [...row2, ...row2];

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* Counters — only shown when stats provided */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-0 sm:divide-x divide-black/8 dark:divide-white/8 border border-black/8 dark:border-white/8 rounded-xl px-8 py-7 bg-black/[0.01] dark:bg-white/[0.02]">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`flex ${i > 0 ? "sm:pl-8" : ""}`}>
              <StatItem stat={stat} delay={i * 120} />
            </div>
          ))}
        </div>
      )}

      {/* Marquee tickers */}
      <div className="flex flex-col gap-2.5 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden">
          <div className="marquee-left flex gap-3 shrink-0">
            {row1.map((p, i) => (
              <Link
                key={`r1-${p.id}-${i}`}
                href={`/skills/${p.id}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/15 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all shrink-0 group"
              >
                <span className="font-mono text-xs text-black/60 dark:text-white/55 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {p.name}
                </span>
                <span className="font-mono text-[10px] text-black/25 dark:text-white/20 tabular-nums">
                  {p.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex overflow-hidden">
          <div className="marquee-right flex gap-3 shrink-0">
            {row2doubled.map((p, i) => (
              <Link
                key={`r2-${p.id}-${i}`}
                href={`/skills/${p.id}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/15 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all shrink-0 group"
              >
                <span className="font-mono text-xs text-black/60 dark:text-white/55 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {p.name}
                </span>
                <span className="font-mono text-[10px] text-black/25 dark:text-white/20 tabular-nums">
                  {p.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
