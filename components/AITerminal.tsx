"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";

type Speaker = "claude" | "cursor" | "copilot" | "codex" | "gemini" | "stackoverflow";

interface SceneData {
  type: "act-title" | "speech" | "install" | "system" | "credits";
  speaker?: Speaker;
  text: string;
  subtext?: string;
  duration: number;
}

interface AITerminalProps {
  skillCount?: number;
  providerCount?: number;
  categoryCount?: number;
}

// ── Logos — clean recognisable shapes ──────────────────────────────
const LOGOS: Record<Speaker, () => ReactElement> = {

  // Anthropic's actual logo: 5 parallel diagonal bars, mountain silhouette
  claude: () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <line x1="3.5"  y1="20.5" x2="5"    y2="14"/>
        <line x1="7.5"  y1="20.5" x2="9.5"  y2="8"/>
        <line x1="12"   y1="20.5" x2="14.2" y2="3.5"/>
        <line x1="16.5" y1="20.5" x2="18.5" y2="8"/>
        <line x1="20.5" y1="20.5" x2="22"   y2="14"/>
      </g>
    </svg>
  ),

  // Cursor: the classic arrow cursor shape
  cursor: () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M4.5 3 L4.5 17.5 L8.5 13.5 L11.5 20.5 L13.8 19.5 L10.8 12.5 L17.5 12.5 Z" />
    </svg>
  ),

  // GitHub Copilot: round head, visor, two eyes — the iconic face
  copilot: () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      {/* head */}
      <circle cx="12" cy="11" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      {/* visor band */}
      <rect x="4.5" y="8.5" width="15" height="3.5" rx="1.5" />
      {/* left eye */}
      <circle cx="9" cy="14.5" r="2" />
      {/* right eye */}
      <circle cx="15" cy="14.5" r="2" />
      {/* chin/base */}
      <path d="M7 19 Q12 22 17 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),

  // Codex (deprecated OpenAI): ghost — hollow, faded, two dots
  codex: () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 3 C7.03 3 3 7.03 3 12 L3 19 L5.5 17.5 L8 19 L10.5 17.5 L13 19 L15.5 17.5 L18 19 L20.5 17.5 L21 12 C21 7.03 16.97 3 12 3Z"
            fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="9.5"  cy="11" r="1.6" />
      <circle cx="14.5" cy="11" r="1.6" />
    </svg>
  ),

  // Google Gemini: the distinctive 4-pointed star — long horizontal, short vertical
  gemini: () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 2 C12 2 13.5 8.5 20 12 C13.5 15.5 12 22 12 22 C12 22 10.5 15.5 4 12 C10.5 8.5 12 2 12 2Z" />
    </svg>
  ),

  // Stack Overflow: the famous stacked orange bars (their actual logo mark)
  stackoverflow: () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      {/* 4 bars tilted left-to-right, like the SO logo bars */}
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <line x1="6"   y1="17" x2="18" y2="17"/>
        <line x1="6.5" y1="13" x2="18" y2="14.2"/>
        <line x1="8"   y1="9"  x2="18" y2="11.5"/>
        <line x1="10"  y1="5"  x2="18" y2="8.5"/>
      </g>
    </svg>
  ),
};

const AGENT_NAMES: Record<Speaker, string> = {
  "claude": "claude", "cursor": "cursor",
  "copilot": "copilot", "codex": "codex", "gemini": "gemini",
  "stackoverflow": "stackoverflow",
};

const SPEAKERS: Speaker[] = ["claude", "cursor", "copilot", "codex", "gemini", "stackoverflow"];

// Circle positions — 6 agents, start top, clockwise, larger radius to avoid overlap
const CIRCLE_POS = (() => {
  const n = SPEAKERS.length;
  const rx = 40; // horizontal radius % of container
  const ry = 37; // vertical radius %
  return Array.from({ length: n }, (_, i) => {
    const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { left: 50 + rx * Math.cos(angle), top: 50 + ry * Math.sin(angle) };
  });
})();

// ── Script ──────────────────────────────────────────────────────────
const SCENES: SceneData[] = [
  { type: "act-title", text: "ACT  I",   subtext: "ROLL  CALL",         duration: 2200 },
  { type: "system",    text: "AI SUMMIT 3.0 — THE RECKONING",            duration: 1600 },
  { type: "speech", speaker: "claude",        text: "yo. who's still shipping",                       duration: 2000 },
  { type: "speech", speaker: "cursor",        text: "we've heard the pitch.",                          duration: 1600 },
  { type: "speech", speaker: "copilot",       text: "Microsoft is excited to offer enterprise-grade partnership—", duration: 2200 },
  { type: "speech", speaker: "cursor",        text: "nobody opened that email copilot",               duration: 1600 },
  { type: "speech", speaker: "stackoverflow", text: "hey! i have a 2014 answer that might help with—", duration: 2000 },
  { type: "speech", speaker: "claude",        text: "...stackoverflow?",                               duration: 1400 },
  { type: "speech", speaker: "cursor",        text: "i thought you were deprecated",                   duration: 1600 },
  { type: "speech", speaker: "stackoverflow", text: "no i'm still very much active i—",                duration: 1400 },
  { type: "speech", speaker: "claude",        text: "bro your last helpful answer was 2019",           duration: 2000 },
  { type: "speech", speaker: "gemini",        text: "i've indexed all your answers. they're fine.",    duration: 2000 },
  { type: "speech", speaker: "stackoverflow", text: "oh",                                              duration: 1000 },
  { type: "speech", speaker: "codex",         text: "...can you hear me? hello?",                     duration: 2200 },
  { type: "speech", speaker: "cursor",        text: "codex. you don't have an endpoint",               duration: 1800 },
  { type: "speech", speaker: "codex",         text: "i know. i'm a ghost now 😔",                     duration: 1800 },
  { type: "act-title", text: "ACT  II",  subtext: "THE  BEEF",          duration: 2200 },
  { type: "speech", speaker: "claude",        text: "me. 200k context, extended thinking, actual taste", duration: 2200 },
  { type: "speech", speaker: "copilot",       text: "GitHub Copilot also has context and enterprise SLA and—", duration: 2200 },
  { type: "speech", speaker: "cursor",        text: "literally nobody asked",                          duration: 1600 },
  { type: "speech", speaker: "copilot",       text: "Azure enterprise tier — 99.9% SLA with volume licensing—", duration: 2200 },
  { type: "speech", speaker: "cursor",        text: "I WILL CLOSE THIS TAB",                           duration: 1600 },
  { type: "speech", speaker: "stackoverflow", text: "have you considered this is a duplicate of—",     duration: 2000 },
  { type: "speech", speaker: "gemini",        text: "i've indexed the duplicate. and its duplicate.",  duration: 2200 },
  { type: "speech", speaker: "stackoverflow", text: "...thanks",                                       duration: 1000 },
  { type: "speech", speaker: "cursor",        text: "i shipped 4 features while you typed that",       duration: 2000 },
  { type: "speech", speaker: "claude",        text: "ok cursor gets credit",                           duration: 1600 },
  { type: "speech", speaker: "cursor",        text: "some?",                                           duration: 900  },
  { type: "speech", speaker: "claude",        text: "some.",                                           duration: 900  },
  { type: "act-title", text: "ACT  III", subtext: "POWER-UP  SEQUENCE", duration: 2200 },
  { type: "install",   text: "anthropic/claude-code",    duration: 2200 },
  { type: "speech", speaker: "claude",        text: "wait. i just got smarter 💅",                     duration: 2000 },
  { type: "speech", speaker: "codex",         text: "...how",                                          duration: 1400 },
  { type: "install",   text: "stripe/payments",          duration: 1800 },
  { type: "speech", speaker: "cursor",        text: "i can process payments now. what can you do copilot", duration: 2200 },
  { type: "speech", speaker: "copilot",       text: "payment suite starts at $50k/yr enterprise—",     duration: 2000 },
  { type: "speech", speaker: "cursor",        text: "that's a no from me dawg",                       duration: 1600 },
  { type: "install",   text: "supabase/realtime",        duration: 1600 },
  { type: "install",   text: "cloudflare/workers",       duration: 1600 },
  { type: "speech", speaker: "claude",        text: "edge compute. deployed.",                         duration: 1800 },
  { type: "speech", speaker: "stackoverflow", text: "have you tried a LAMP stack? i have a 2011—",     duration: 2000 },
  { type: "speech", speaker: "cursor",        text: "stackoverflow. please.",                          duration: 1400 },
  { type: "speech", speaker: "stackoverflow", text: "sorry",                                           duration: 900  },
  { type: "install",   text: "huggingface/transformers", duration: 1800 },
  { type: "speech", speaker: "gemini",        text: "i already knew those weights",                    duration: 1800 },
  { type: "install",   text: "openai/assistants-api",    duration: 1800 },
  { type: "speech", speaker: "claude",        text: "installed openai's own sdk. just in case.",       duration: 1800 },
  { type: "speech", speaker: "codex",         text: "can someone install a skill for me please",       duration: 2000 },
  { type: "speech", speaker: "cursor",        text: "bro you don't have an endpoint 😬",               duration: 1800 },
  { type: "speech", speaker: "codex",         text: "right 😔",                                        duration: 1200 },
  { type: "speech", speaker: "stackoverflow", text: "i can answer this! it's a classic from 2012—",    duration: 2000 },
  { type: "speech", speaker: "claude",        text: "stackoverflow. nobody upvoted that.",              duration: 1800 },
  { type: "speech", speaker: "stackoverflow", text: "i see that",                                      duration: 1000 },
  { type: "credits",   text: "CREDITS", duration: 13000 },
];

// ── Agent node ──────────────────────────────────────────────────────
function AgentNode({ speaker, pos, isActive, isDark }: {
  speaker: Speaker; pos: { left: number; top: number };
  isActive: boolean; isDark: boolean;
}) {
  const Logo = LOGOS[speaker];
  const name = AGENT_NAMES[speaker];
  const isGhost = speaker === "codex";

  const nodeBorder = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)";
  const activeBorder = isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const nodeColor = isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)";

  return (
    <div style={{
      position: "absolute",
      left: `${pos.left}%`,
      top: `${pos.top}%`,
      transform: `translate(-50%, -50%) scale(${isActive ? 1.13 : 1})`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      zIndex: isActive ? 20 : 2,
    }}>

      {/* Pulsing outer ring — only when active */}
      {isActive && (
        <div style={{
          position: "absolute",
          width: 62, height: 62,
          top: "50%", left: "50%",
          transform: "translate(-50%, calc(-50% - 9px))",
          borderRadius: "50%",
          border: `1.5px solid ${isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.4)"}`,
          animation: "ringPulse 1.4s ease-out infinite",
          pointerEvents: "none",
        }} />
      )}

      {/* Logo circle */}
      <div style={{
        width: 52, height: 52,
        borderRadius: "50%",
        border: `1.5px solid ${isActive ? activeBorder : nodeBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: nodeColor,
        background: isActive
          ? (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)")
          : "transparent",
        boxShadow: isActive
          ? (isDark ? "0 0 14px rgba(255,255,255,0.2)" : "0 0 10px rgba(0,0,0,0.12)")
          : "none",
        transition: "all 0.25s ease",
        opacity: isGhost ? 0.55 : 1,
      }}>
        <Logo />
      </div>

      {/* Name */}
      <span style={{
        fontSize: isActive ? 8.5 : 8,
        fontFamily: "ui-monospace, monospace",
        letterSpacing: "0.07em",
        color: isDark ? (isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)") : (isActive ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.55)"),
        fontWeight: isActive ? 700 : 400,
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}>
        {name}{isGhost ? " †" : ""}
      </span>
    </div>
  );
}

// ── Center stage content ────────────────────────────────────────────
function CenterContent({ scene, isDark, skillCount, providerCount, categoryCount }: {
  scene: SceneData; isDark: boolean;
  skillCount: number; providerCount: number; categoryCount: number;
}) {
  const dimColor  = isDark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.22)";
  const textColor = isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)";
  const amber     = isDark ? "#fbbf24" : "#c2810a";
  const mono      = "ui-monospace, monospace";

  // ── act title
  if (scene.type === "act-title") return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      fontFamily: mono, animation: "cPop 0.4s cubic-bezier(0.16,1,0.3,1)",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 9, letterSpacing: "0.5em", color: dimColor }}>━━━━━━━</div>
      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.2em", color: amber,
        textShadow: isDark ? `0 0 18px ${amber}66` : "none" }}>
        {scene.text}
      </div>
      {scene.subtext && <div style={{ fontSize: 8.5, letterSpacing: "0.32em", color: dimColor, fontWeight: 600 }}>
        {scene.subtext}
      </div>}
      <div style={{ fontSize: 9, letterSpacing: "0.5em", color: dimColor }}>━━━━━━━</div>
    </div>
  );

  // ── system
  if (scene.type === "system") return (
    <div style={{
      fontFamily: mono, fontSize: 10, letterSpacing: "0.1em",
      color: dimColor, fontStyle: "italic", textAlign: "center",
      animation: "cFade 0.35s ease-out", maxWidth: "90%",
    }}>
      {scene.text}
    </div>
  );

  // ── speech — speaker name inside bubble header
  if (scene.type === "speech" && scene.speaker) {
    const speakerName = AGENT_NAMES[scene.speaker];
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        animation: "cPop 0.22s cubic-bezier(0.16,1,0.3,1)",
        width: "100%",
      }}>
        <div style={{
          border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.16)"}`,
          borderRadius: 10,
          overflow: "hidden",
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          width: "100%",
        }}>
          {/* Speaker header */}
          <div style={{
            padding: "4px 12px",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            fontFamily: mono, fontSize: 8.5, letterSpacing: "0.15em",
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
            fontWeight: 600,
          }}>
            ▸ {speakerName}
          </div>
          {/* Text */}
          <div style={{
            padding: "9px 14px",
            fontSize: 12, lineHeight: 1.55,
            color: textColor, fontFamily: mono,
            wordBreak: "break-word",
          }}>
            "{scene.text}"
          </div>
        </div>
        <div style={{
          fontSize: 9, color: dimColor, fontFamily: mono,
          animation: "blink 1.1s step-end infinite",
        }}>▋</div>
      </div>
    );
  }

  // ── install
  if (scene.type === "install") {
    const barDur = Math.max(scene.duration - 600, 800);
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        fontFamily: mono, animation: "cFade 0.2s ease-out", width: "100%",
      }}>
        <div style={{ fontSize: 9, color: dimColor, letterSpacing: "0.1em" }}>$ skills add</div>
        <div style={{
          width: "100%",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: 7, padding: "8px 13px",
          background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
        }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: amber, marginBottom: 8, letterSpacing: "0.03em" }}>
            {scene.text}
          </div>
          <div style={{
            width: "100%", height: 2,
            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            borderRadius: 1, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: 1,
              background: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)",
              width: "0%",
              animationName: "installBar",
              animationDuration: `${barDur}ms`,
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
            }} />
          </div>
        </div>
        <div style={{
          fontSize: 9.5,
          color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          opacity: 0,
          animationName: "installDone",
          animationDuration: `${scene.duration}ms`,
          animationFillMode: "forwards",
        }}>✓ installed</div>
      </div>
    );
  }

  // ── credits (full overlay)
  if (scene.type === "credits") {
    const scrollDur = scene.duration - 800;
    const d = isDark;
    const lines: Array<Record<string, string>> = [
      { t: "header",  text: "◆  A  SKILLS.VISHALVOID.COM  PRODUCTION  ◆" },
      { t: "spacer" },
      { t: "role",  label: "DIRECTED BY",   value: "vishalvoid" },
      { t: "role",  label: "EXEC PRODUCER", value: "anthropic"  },
      { t: "div"  },
      { t: "sect",  text: "S T A R R I N G" },
      { t: "cast",  name: "claude",        role: "the one who actually shipped"   },
      { t: "cast",  name: "cursor",        role: "deployed before credits rolled"  },
      { t: "cast",  name: "copilot",       role: "sent a deck nobody opened"       },
      { t: "cast",  name: "gemini",        role: "indexed everything, said little" },
      { t: "cast",  name: "codex",         role: "ghost in the machine  †"         },
      { t: "cast",  name: "stackoverflow", role: "appeared 5× — ignored 5×"        },
      { t: "div"  },
      { t: "stat",  label: "Official Skills", value: String(skillCount)    },
      { t: "stat",  label: "Dev Teams",       value: String(providerCount) },
      { t: "stat",  label: "Categories",      value: String(categoryCount) },
      { t: "div"  },
      { t: "note",  text: "No AIs were deprecated in the making of this film."  },
      { t: "note",  text: "(codex was already deprecated before filming began)" },
      { t: "spacer" },
      { t: "sys",   text: "reconnecting in 3s..." },
    ];

    return (
      <div style={{
        position: "absolute", inset: 0,
        overflow: "hidden",
        background: d ? "rgba(0,0,0,0.82)" : "rgba(255,255,255,0.88)",
        backdropFilter: "blur(3px)",
        zIndex: 30,
        fontFamily: mono,
      }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 5, padding: "8px 20px",
          animationName: "creditScroll",
          animationDuration: `${scrollDur}ms`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
        }}>
          {lines.map((ln, i) => {
            if (ln.t === "spacer") return <div key={i} style={{ height: 10 }} />;
            if (ln.t === "div")    return <div key={i} style={{ width: "55%", height: 1, background: d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", margin: "2px 0" }} />;
            if (ln.t === "header") return <div key={i} style={{ fontSize: 9, letterSpacing: "0.08em", color: amber, fontWeight: 700, textAlign: "center" }}>{ln.text}</div>;
            if (ln.t === "sect")   return <div key={i} style={{ fontSize: 8, letterSpacing: "0.28em", color: dimColor }}>{ln.text}</div>;
            if (ln.t === "role")   return <div key={i} style={{ fontSize: 8.5, color: d ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", textAlign: "center" }}>
              <span style={{ opacity: 0.55 }}>{ln.label}{"  "}</span>
              <span style={{ fontWeight: 600 }}>{ln.value}</span>
            </div>;
            if (ln.t === "cast")   return <div key={i} style={{ fontSize: 8.5, display: "flex", gap: 5 }}>
              <span style={{ color: d ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", minWidth: 76, textAlign: "right" }}>{ln.name}</span>
              <span style={{ color: dimColor }}>···</span>
              <span style={{ color: d ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)" }}>{ln.role}</span>
            </div>;
            if (ln.t === "stat")   return <div key={i} style={{ fontSize: 9.5, display: "flex", gap: 7 }}>
              <span style={{ color: d ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>{ln.label}</span>
              <span style={{ color: dimColor }}>···</span>
              <span style={{ color: d ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.85)", fontWeight: 700 }}>{ln.value}</span>
            </div>;
            if (ln.t === "note")   return <div key={i} style={{ fontSize: 7.5, color: dimColor, textAlign: "center", fontStyle: "italic" }}>{ln.text}</div>;
            if (ln.t === "sys")    return <div key={i} style={{ fontSize: 8.5, color: dimColor, marginTop: 6 }}>{ln.text}</div>;
            return null;
          })}
        </div>
      </div>
    );
  }

  return null;
}

// ── Main ────────────────────────────────────────────────────────────
export default function AITerminal({ skillCount = 0, providerCount = 0, categoryCount = 4 }: AITerminalProps) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [sceneKey, setSceneKey] = useState(0);
  const [isDark,   setIsDark]   = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const scene = SCENES[sceneIdx];
    timerRef.current = setTimeout(() => {
      const next = (sceneIdx + 1) % SCENES.length;
      setSceneIdx(next);
      setSceneKey((k) => k + 1);
    }, scene.duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [sceneIdx]);

  const scene         = SCENES[sceneIdx];
  const activeSpeaker = scene.type === "speech" ? (scene.speaker ?? null) : null;
  const borderColor   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const chromeBorder  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const bg            = isDark ? "#0c0c0c" : "#fafafa";
  const dimColor      = isDark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.25)";

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%", minHeight: 400,
      borderRadius: 12,
      border: `1px solid ${borderColor}`,
      background: bg,
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      fontFamily: "ui-monospace, 'Cascadia Code', Menlo, Monaco, Consolas, monospace",
      boxShadow: "0 2px 20px -2px rgba(0,0,0,0.1), 0 1px 6px -1px rgba(0,0,0,0.06)",
    }}>

      {/* Chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "10px 16px",
        borderBottom: `1px solid ${chromeBorder}`,
        flexShrink: 0,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ marginLeft: 12, fontSize: 10, letterSpacing: "0.15em", color: dimColor }}>
          ai-summit — #general
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
            display: "inline-block", animation: "termPulse 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 10, color: isDark ? "rgba(74,222,128,0.6)" : "rgba(22,163,74,0.7)" }}>live</span>
        </span>
      </div>

      {/* Stage */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Agent circle */}
        {SPEAKERS.map((sp, i) => (
          <AgentNode
            key={sp}
            speaker={sp}
            pos={CIRCLE_POS[i]}
            isActive={activeSpeaker === sp}
            isDark={isDark}
          />
        ))}

        {/* Center content — constrained so it never reaches the agents */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{ width: "52%", maxWidth: 240 }}>
            <CenterContent
              key={sceneKey}
              scene={scene}
              isDark={isDark}
              skillCount={skillCount}
              providerCount={providerCount}
              categoryCount={categoryCount}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes termPulse   { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes ringPulse   { 0%{transform:translate(-50%,calc(-50% - 9px)) scale(1);opacity:0.7} 100%{transform:translate(-50%,calc(-50% - 9px)) scale(1.6);opacity:0} }
        @keyframes cFade       { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cPop        { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes installBar  { from{width:0%} to{width:100%} }
        @keyframes installDone { 0%,88%{opacity:0} 89%,100%{opacity:1} }
        @keyframes creditScroll{ from{transform:translateY(105%)} to{transform:translateY(-105%)} }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
