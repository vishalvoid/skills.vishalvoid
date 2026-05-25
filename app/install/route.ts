import { skills } from "@/data/skills";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const skillSlug = url.searchParams.get("skill") ?? url.pathname.split("/").pop();

  const skill = skillSlug ? skills.find((s) => s.slug === skillSlug) : null;

  const script = skill
    ? `#!/usr/bin/env bash
set -e

SKILL="${skill.slug}"
SKILL_NAME="${skill.name}"

echo ""
echo "Installing: \${SKILL_NAME}"
echo "Source:     https://skills.vishalvoid.com/\${SKILL}"
echo ""

# Check for required tools
for cmd in curl git node; do
  command -v "\$cmd" >/dev/null 2>&1 || { echo "Error: \$cmd is required but not installed." >&2; exit 1; }
done

echo "Downloading skill files..."
DEST=".skills/\${SKILL}"
mkdir -p "\${DEST}"

curl -fsSL "https://skills.vishalvoid.com/api/skills/\${SKILL}/files" -o "\${DEST}/files.tar.gz" 2>/dev/null || {
  echo "Skill files are not yet available for download."
  echo "Visit https://skills.vishalvoid.com/\${SKILL} for manual setup instructions."
  exit 0
}

echo ""
echo "Done! Skill '\${SKILL_NAME}' installed to \${DEST}/"
echo "Visit https://skills.vishalvoid.com/\${SKILL} for usage documentation."
echo ""
`
    : `#!/usr/bin/env bash
set -e

echo ""
echo "skills.vishalvoid.com"
echo "Engineering patterns by Vishal Kumar Singh"
echo ""
echo "Available skills:"
echo ""
${skills.map((s) => `echo "  ${s.slug.padEnd(30)} ${s.tagline}"`).join("\n")}
echo ""
echo "Install a specific skill:"
echo "  curl -fsSL https://skills.vishalvoid.com/install/<skill-name> | bash"
echo ""
`;

  return new Response(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
