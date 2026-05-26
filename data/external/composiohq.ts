import type { ExternalSkill } from "../external-skills";

export const composiohqSkills: ExternalSkill[] = [
  {
    "slug": "composio",
    "name": "composio",
    "tagline": "Connect AI agents to 1000+ external apps with managed authentication",
    "description": "Connect AI agents to 1000+ external apps with managed authentication",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/ComposioHQ/skills",
    "tags": [
      "composiohq",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Composio connects AI agents and apps to 1000+ external services like Gmail, Slack, GitHub, and Notion. It provides both a CLI for direct tool execution and an SDK for building agents that need per-user connections to external APIs.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: composio\ndescription: Connect AI agents to 1000+ external apps with managed authentication\n---\n\n# composio\n\nComposio connects AI agents and apps to 1000+ external services like Gmail, Slack, GitHub, and Notion. It provides both a CLI for direct tool execution and an SDK for building agents that need per-user connections to external APIs.\n\n## Usage\n\n```bash\nnpx skills add https://github.com/ComposioHQ/skills --skill composio\n```\n"
  }
];
