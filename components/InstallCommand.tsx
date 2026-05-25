"use client";

import { useState } from "react";

export default function InstallCommand({
  command,
  size = "md",
}: {
  command: string;
  size?: "sm" | "md";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={`flex items-center gap-3 bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/8 rounded-md ${size === "md" ? "px-4 py-3" : "px-3 py-2"}`}>
      <span className="text-black/20 dark:text-white/20 font-mono text-xs select-none">$</span>
      <code className={`font-mono ${size === "md" ? "text-sm" : "text-xs"} text-black/55 dark:text-white/55 flex-1 truncate`}>
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="text-black/25 dark:text-white/20 hover:text-black/60 dark:hover:text-white/60 transition-colors shrink-0 cursor-pointer"
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
