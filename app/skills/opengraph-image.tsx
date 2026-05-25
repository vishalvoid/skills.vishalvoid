import { ImageResponse } from "next/og";
import { externalSkills, SOURCES } from "@/data/external-skills";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Skills Directory — skills.vishalvoid.com";

const SOURCE_BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Anthropic:      { bg: "#1a0f09", text: "#d97757", border: "#3a1f0f" },
  OpenAI:         { bg: "#071510", text: "#10b981", border: "#0f2e20" },
  Google:         { bg: "#080d1a", text: "#3b82f6", border: "#0f1e3a" },
  React:          { bg: "#081520", text: "#38bdf8", border: "#0f2540" },
  "Next.js":      { bg: "#111111", text: "#ffffff", border: "#222222" },
  TypeScript:     { bg: "#080d1a", text: "#93c5fd", border: "#0f1a30" },
  "Node.js":      { bg: "#080f08", text: "#4ade80", border: "#0f200f" },
  Databases:      { bg: "#0d0818", text: "#a78bfa", border: "#1a1030" },
  "CSS & Design": { bg: "#180810", text: "#f472b6", border: "#2a1020" },
  Testing:        { bg: "#181008", text: "#fbbf24", border: "#2a2010" },
  Deployment:     { bg: "#0d1018", text: "#94a3b8", border: "#1a2030" },
};

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 80px",
        fontFamily: "monospace, 'Courier New'",
      }}
    >
      {/* Label */}
      <div style={{ color: "#444444", fontSize: "16px", letterSpacing: "0.08em", display: "flex" }}>
        skills.vishalvoid.com / directory
      </div>

      {/* Title */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "68px",
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: "1.05",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Skills Directory</span>
        </div>
        <div style={{ color: "#666666", fontSize: "22px", display: "flex" }}>
          {externalSkills.length}+ curated skills from across the ecosystem
        </div>

        {/* Source badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
          {SOURCES.map((source) => {
            const colors = SOURCE_BADGE_COLORS[source] ?? { bg: "#111", text: "#888", border: "#222" };
            return (
              <div
                key={source}
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                {source}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ color: "#333333", fontSize: "13px", letterSpacing: "0.18em", display: "flex" }}>
          28.62° N, 77.37° E
        </div>
        <div
          style={{
            background: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, letterSpacing: "-1px" }}>sv</span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
