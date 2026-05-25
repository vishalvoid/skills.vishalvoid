import { ImageResponse } from "next/og";
import { skills } from "@/data/skills";
import { externalSkills } from "@/data/external-skills";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Engineering Patterns, Ready to Use. — skills.vishalvoid.com";

export default function OGImage() {
  const ownCount = skills.length;
  const extCount = externalSkills.length;

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "420px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          opacity: 0.06,
        }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: "35px",
              borderBottom: "1px solid #ffffff",
            }}
          />
        ))}
      </div>

      {/* Domain label */}
      <div
        style={{
          color: "#444444",
          fontSize: "16px",
          letterSpacing: "0.08em",
          display: "flex",
        }}
      >
        skills.vishalvoid.com
      </div>

      {/* Main content */}
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
            fontSize: "68px",
            fontWeight: 700,
            lineHeight: "1.05",
            letterSpacing: "-2px",
            maxWidth: "760px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Engineering Patterns,</span>
          <span>Ready to Use.</span>
        </div>
        <div
          style={{
            color: "#666666",
            fontSize: "22px",
            maxWidth: "580px",
            lineHeight: "1.5",
            display: "flex",
          }}
        >
          Installable, documented, production-ready patterns by Vishal Kumar Singh.
        </div>
      </div>

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{
              color: "#333333",
              fontSize: "13px",
              letterSpacing: "0.18em",
              display: "flex",
            }}
          >
            28.62° N, 77.37° E
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div
              style={{
                background: "#111111",
                border: "1px solid #222222",
                color: "#555555",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                display: "flex",
              }}
            >
              {ownCount} patterns
            </div>
            <div
              style={{
                background: "#111111",
                border: "1px solid #222222",
                color: "#555555",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                display: "flex",
              }}
            >
              {extCount}+ skills
            </div>
          </div>
        </div>

        {/* Logo mark */}
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
          <span
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            sv
          </span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
