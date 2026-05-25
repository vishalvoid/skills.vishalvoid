import { ImageResponse } from "next/og";
import { externalSkills, getExternalSkillBySlug } from "@/data/external-skills";

export function generateStaticParams() {
  return externalSkills.map((s) => ({ slug: s.slug }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner:     "#4ade80",
  Intermediate: "#fbbf24",
  Advanced:     "#f87171",
};

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getExternalSkillBySlug(slug);
  if (!skill) return new Response("not found", { status: 404 });

  const badge = SOURCE_BADGE_COLORS[skill.source] ?? { bg: "#111", text: "#888", border: "#222" };

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
      {/* Badges row */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <div
          style={{
            background: badge.bg,
            border: `1px solid ${badge.border}`,
            color: badge.text,
            padding: "6px 14px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            display: "flex",
          }}
        >
          {skill.source}
        </div>
        <div
          style={{
            color: DIFFICULTY_COLOR[skill.difficulty] ?? "#888",
            fontSize: "13px",
            display: "flex",
          }}
        >
          {skill.difficulty}
        </div>
      </div>

      {/* Skill name + description */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: skill.name.length > 30 ? "50px" : "60px",
            fontWeight: 700,
            lineHeight: "1.08",
            letterSpacing: "-1.5px",
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {skill.name}
        </div>
        <div
          style={{
            color: "#777777",
            fontSize: "20px",
            maxWidth: "700px",
            lineHeight: "1.5",
            display: "flex",
          }}
        >
          {skill.description.length > 140
            ? skill.description.slice(0, 140) + "…"
            : skill.description}
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
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {skill.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                background: "#0d0d0d",
                border: "1px solid #1f1f1f",
                color: "#555555",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
                display: "flex",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ color: "#333333", fontSize: "14px", display: "flex" }}>
          skills.vishalvoid.com
        </div>
      </div>
    </div>,
    { ...size }
  );
}
