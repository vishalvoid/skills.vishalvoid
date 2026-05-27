import type { ExternalSkill } from "../external-skills";

export const composiohqSkills: ExternalSkill[] = [
  {
    "slug": "composio",
    "name": "composio",
    "tagline": "Connect AI agents to 1000+ external apps with managed authentication.",
    "description": "Use 1000+ external apps via Composio - either directly through the CLI or by building AI agents and apps with the SDK",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/ComposioHQ/skills",
    "tags": [
      "composio",
      "tool-router",
      "agents",
      "mcp",
      "tools"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Composio connects AI agents to 1000+ external apps via a unified CLI and SDK, handling OAuth and authentication management automatically.",
    "whenToUse": [
      "User wants to access or interact with external apps (Gmail, Slack, GitHub, Notion, etc.).",
      "User wants to automate a task using an external service (send email, create issue, post message).",
      "Building an AI agent or app that integrates with external tools.",
      "Multi-user apps that need per-user connections to external services."
    ],
    "skillMd": "---\nname: composio\ndescription: Use 1000+ external apps via Composio - either directly through the CLI or by building AI agents and apps with the SDK\ntags: [composio, tool-router, agents, mcp, tools, api, automation, cli]\n---\n\n## When to Apply\n\n- User wants to access or interact with external apps (Gmail, Slack, GitHub, Notion, etc.)\n- User wants to automate a task using an external service (send email, create issue, post message)\n- Building an AI agent or app that integrates with external tools\n- Multi-user apps that need per-user connections to external services\n\n## Setup\n\nCheck if the CLI is installed; if not, install it:\n```bash\ncurl -fsSL https://composio.dev/install | bash\n```\n\nAfter installation, restart your terminal or source your shell config, then authenticate:\n```bash\ncomposio login       # OAuth; interactive org/project picker (use -y to skip)\ncomposio whoami      # verify org_id, project_id, user_id\n```\nFor agents without direct browser access: `composio login --no-wait | jq` to get URL/key, share URL with user, then `composio login --key <cli_key> --no-wait` once they complete login.\n\n---\n\n### 1. Use Apps via Composio CLI\n\n**Use this when:** The user wants to take action on an external app directly — no code writing needed. The agent uses the CLI to search, connect, and execute tools on behalf of the user.\n\nKey commands (new top-level aliases):\n- `composio search \"<query>\"` — find tools by use case\n- `composio execute \"<TOOL_SLUG>\" -d '{...<input params>}'` — execute a tool\n- `composio link [toolkit]` — connect a user account to an app (agents: always use `--no-wait` for non-interactive mode)\n- `composio listen` — listen for real-time trigger events\n\nTypical workflow: **search → link (if needed) → execute**\n\n> Full reference: [Composio CLI Guide](rules/composio-cli.md)\n\n---\n\n### 2. Building Apps and Agents with Composio\n\n**Use this when:** Writing code — an AI agent, app, or backend service that integrates with external tools via the Composio SDK.\n\nRun this first inside the project directory to set up the API key:\n```bash\ncomposio init\n```\n\n> Full reference: [Building with Composio](rules/building-with-composio.md)\n"
  }
];
