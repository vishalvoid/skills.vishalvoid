export type SourceKey =
  | "Anthropic"
  | "OpenAI"
  | "Google"
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Node.js"
  | "Databases"
  | "CSS & Design"
  | "Testing"
  | "Deployment";

export interface ExternalSkill {
  slug: string;
  name: string;
  description: string;
  source: SourceKey;
  sourceUrl: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const externalSkills: ExternalSkill[] = [
  // ─── Anthropic / Claude ──────────────────────────────────────────────────
  {
    slug: "claude-tool-use",
    name: "Claude Tool Use",
    description:
      "Give Claude access to external tools and APIs. Define tools as JSON schemas, Claude decides when to call them, and your code executes them — enabling real-world actions from any Claude model.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview",
    tags: ["Claude", "Function Calling", "AI", "API"],
    difficulty: "Intermediate",
  },
  {
    slug: "claude-vision",
    name: "Claude Vision",
    description:
      "Pass images directly to Claude for analysis, OCR, chart interpretation, UI feedback, and multimodal understanding. Supports JPEG, PNG, GIF, and WebP up to 5MB.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/vision",
    tags: ["Claude", "Vision", "Multimodal", "AI"],
    difficulty: "Beginner",
  },
  {
    slug: "claude-prompt-caching",
    name: "Prompt Caching",
    description:
      "Cache large, repeated prompt prefixes (system prompts, long documents, tool definitions) to cut latency by up to 85% and reduce input token costs by 90% on cache hits.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
    tags: ["Claude", "Performance", "Cost", "Caching"],
    difficulty: "Intermediate",
  },
  {
    slug: "claude-extended-thinking",
    name: "Extended Thinking",
    description:
      "Let Claude reason through complex problems step-by-step before answering. Claude 3.7 Sonnet and Claude 4 Opus produce higher-accuracy outputs on math, coding, and multi-step reasoning tasks.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking",
    tags: ["Claude", "Reasoning", "CoT", "AI"],
    difficulty: "Advanced",
  },
  {
    slug: "claude-batch-api",
    name: "Claude Batch API",
    description:
      "Process thousands of Claude requests asynchronously at 50% of the cost of real-time requests. Ideal for bulk classification, data extraction, and offline evaluation pipelines.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/message-batches",
    tags: ["Claude", "Batch", "Async", "Cost"],
    difficulty: "Intermediate",
  },
  {
    slug: "claude-streaming",
    name: "Claude Streaming",
    description:
      "Stream Claude responses token-by-token using server-sent events for real-time chat UIs. Dramatically improves perceived latency for conversational applications.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/streaming",
    tags: ["Claude", "Streaming", "SSE", "Real-time"],
    difficulty: "Beginner",
  },
  {
    slug: "claude-computer-use",
    name: "Computer Use",
    description:
      "Give Claude control of a desktop environment — it can see the screen, move the cursor, click, type, and run terminal commands. Build autonomous computer agents with the beta API.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use",
    tags: ["Claude", "Agents", "Automation", "Beta"],
    difficulty: "Advanced",
  },
  {
    slug: "claude-files-api",
    name: "Files API",
    description:
      "Upload files once and reference them across multiple Claude requests by file ID. Ideal for large PDFs, codebases, and datasets where re-uploading every request is wasteful.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/files",
    tags: ["Claude", "Files", "Documents", "API"],
    difficulty: "Beginner",
  },
  {
    slug: "claude-citations",
    name: "Citations",
    description:
      "Ask Claude to cite specific passages from provided documents when answering questions. Produces grounded, verifiable responses with source attribution for RAG applications.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/citations",
    tags: ["Claude", "RAG", "Citations", "Grounding"],
    difficulty: "Intermediate",
  },
  {
    slug: "claude-embeddings",
    name: "Text Embeddings (Voyage AI)",
    description:
      "Anthropic partners with Voyage AI to offer best-in-class embeddings for semantic search, clustering, and retrieval-augmented generation. Direct drop-in for RAG pipelines.",
    source: "Anthropic",
    sourceUrl: "https://docs.anthropic.com/en/docs/build-with-claude/embeddings",
    tags: ["Claude", "Embeddings", "RAG", "Vector Search"],
    difficulty: "Intermediate",
  },

  // ─── OpenAI ──────────────────────────────────────────────────────────────
  {
    slug: "openai-function-calling",
    name: "OpenAI Function Calling",
    description:
      "Connect GPT-4o to external tools and APIs. Define functions as JSON schemas and the model returns structured calls your application executes, enabling reliable structured output extraction.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/function-calling",
    tags: ["GPT", "Function Calling", "Tools", "Structured Output"],
    difficulty: "Intermediate",
  },
  {
    slug: "openai-structured-outputs",
    name: "Structured Outputs",
    description:
      "Guarantee GPT-4o responses conform exactly to a JSON schema you define. 100% schema adherence — no post-processing, no validation errors on production traffic.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/structured-outputs",
    tags: ["GPT", "JSON", "Schema", "Validation"],
    difficulty: "Intermediate",
  },
  {
    slug: "openai-assistants-api",
    name: "Assistants API",
    description:
      "Build stateful AI assistants with persistent threads, built-in file retrieval, code interpreter, and function calling. Manages conversation history and tool orchestration for you.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/assistants/overview",
    tags: ["GPT", "Assistants", "Threads", "Agents"],
    difficulty: "Intermediate",
  },
  {
    slug: "openai-vision",
    name: "GPT-4o Vision",
    description:
      "Feed images into GPT-4o for analysis, description, OCR, chart reading, and visual QA. Combine with text prompts for multimodal understanding in any application.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/vision",
    tags: ["GPT", "Vision", "Multimodal", "Images"],
    difficulty: "Beginner",
  },
  {
    slug: "openai-embeddings",
    name: "OpenAI Embeddings",
    description:
      "Convert text to dense vector representations for semantic search, clustering, anomaly detection, and RAG. text-embedding-3-large offers industry-leading retrieval accuracy.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/embeddings",
    tags: ["OpenAI", "Embeddings", "Vector Search", "RAG"],
    difficulty: "Intermediate",
  },
  {
    slug: "openai-fine-tuning",
    name: "Fine-Tuning",
    description:
      "Train GPT-4o-mini on your own examples to improve response style, format consistency, domain knowledge, and reduce prompt length for production workloads.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/fine-tuning",
    tags: ["OpenAI", "Fine-Tuning", "Training", "Custom Models"],
    difficulty: "Advanced",
  },
  {
    slug: "openai-realtime-api",
    name: "Realtime API",
    description:
      "Build low-latency, bidirectional speech-to-speech applications with GPT-4o. Native audio input and output with interruption handling for voice agents and conversational AI.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/realtime",
    tags: ["OpenAI", "Voice", "Audio", "Real-time"],
    difficulty: "Advanced",
  },
  {
    slug: "openai-whisper",
    name: "Whisper Speech-to-Text",
    description:
      "Transcribe and translate audio in 57 languages with best-in-class accuracy. Supports MP3, MP4, WAV, FLAC and more. Open-source model also available for self-hosting.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/speech-to-text",
    tags: ["OpenAI", "Speech", "Transcription", "Audio"],
    difficulty: "Beginner",
  },
  {
    slug: "openai-dall-e",
    name: "DALL-E 3 Image Generation",
    description:
      "Generate high-quality images from text prompts with DALL-E 3 via API. Supports multiple sizes, quality levels, and natural language style control with strong prompt adherence.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/images",
    tags: ["OpenAI", "Image Generation", "DALL-E", "Creative AI"],
    difficulty: "Beginner",
  },
  {
    slug: "openai-batch",
    name: "OpenAI Batch API",
    description:
      "Submit thousands of requests as a single batch file and receive results within 24 hours at 50% cost savings. Perfect for offline evaluation, bulk classification, and data enrichment.",
    source: "OpenAI",
    sourceUrl: "https://platform.openai.com/docs/guides/batch",
    tags: ["OpenAI", "Batch", "Cost", "Async"],
    difficulty: "Intermediate",
  },

  // ─── Google / Gemini ──────────────────────────────────────────────────────
  {
    slug: "gemini-api",
    name: "Gemini API",
    description:
      "Access Google's Gemini family of models (Pro, Flash, Ultra) via REST or SDK. Supports text, images, video, audio, and PDFs in a single multimodal request up to 1M tokens context.",
    source: "Google",
    sourceUrl: "https://ai.google.dev/gemini-api/docs",
    tags: ["Gemini", "Google AI", "Multimodal", "API"],
    difficulty: "Beginner",
  },
  {
    slug: "gemini-function-calling",
    name: "Gemini Function Calling",
    description:
      "Define functions as tools for Gemini to call based on user intent. Enables structured data extraction, API orchestration, and agentic workflows with the Gemini Pro models.",
    source: "Google",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/function-calling",
    tags: ["Gemini", "Function Calling", "Agents", "Tools"],
    difficulty: "Intermediate",
  },
  {
    slug: "gemini-long-context",
    name: "Gemini Long Context",
    description:
      "Process up to 2 million tokens in a single prompt with Gemini 1.5 Pro — entire codebases, books, or hours of video. The largest context window of any publicly available model.",
    source: "Google",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/long-context",
    tags: ["Gemini", "Long Context", "Documents", "Scale"],
    difficulty: "Intermediate",
  },
  {
    slug: "gemini-code-execution",
    name: "Gemini Code Execution",
    description:
      "Let Gemini run Python code in a sandboxed environment during generation. Model writes code, executes it, reads the output, and iterates — enabling data analysis and math computation.",
    source: "Google",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/code-execution",
    tags: ["Gemini", "Code Execution", "Python", "Sandbox"],
    difficulty: "Intermediate",
  },
  {
    slug: "google-ai-studio",
    name: "Google AI Studio",
    description:
      "Browser-based IDE for prototyping with Gemini models. Test prompts, explore model capabilities, tune system instructions, and generate API keys without writing code first.",
    source: "Google",
    sourceUrl: "https://ai.google.dev/aistudio",
    tags: ["Gemini", "Prototyping", "Playground", "Tools"],
    difficulty: "Beginner",
  },
  {
    slug: "gemini-grounding",
    name: "Gemini Grounding with Google Search",
    description:
      "Connect Gemini responses to live Google Search results for up-to-date, factual answers. Reduces hallucination on time-sensitive queries with automatic source attribution.",
    source: "Google",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/grounding",
    tags: ["Gemini", "Search", "Grounding", "RAG"],
    difficulty: "Intermediate",
  },

  // ─── React ───────────────────────────────────────────────────────────────
  {
    slug: "react-server-components",
    name: "React Server Components",
    description:
      "Render components entirely on the server with zero client-side JavaScript. Access databases, file systems, and secrets directly in your component tree. The foundation of Next.js App Router.",
    source: "React",
    sourceUrl: "https://react.dev/reference/rsc/server-components",
    tags: ["React", "RSC", "Performance", "Server"],
    difficulty: "Intermediate",
  },
  {
    slug: "react-use-optimistic",
    name: "useOptimistic",
    description:
      "Apply optimistic UI updates instantly during async transitions. The component shows the new state immediately while the real state resolves, then auto-rolls back on error.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/useOptimistic",
    tags: ["React", "Hooks", "UX", "Optimistic"],
    difficulty: "Intermediate",
  },
  {
    slug: "react-suspense",
    name: "Suspense",
    description:
      "Declaratively specify loading states while async data fetches. Wrap any component tree in `<Suspense fallback={...}>` and React handles the loading/ready transition automatically.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/Suspense",
    tags: ["React", "Suspense", "Loading", "Async"],
    difficulty: "Intermediate",
  },
  {
    slug: "react-use-hook",
    name: "use() Hook",
    description:
      "Unwrap Promises and Context inside render — the React 19 primitive that powers `async` server components and enables reading cached async values without useEffect.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/use",
    tags: ["React", "Hooks", "Async", "React 19"],
    difficulty: "Intermediate",
  },
  {
    slug: "react-context",
    name: "React Context",
    description:
      "Share state across a component tree without prop drilling. Use createContext, Provider, and useContext for theming, auth state, locale, and other global values.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/createContext",
    tags: ["React", "Context", "State", "Props"],
    difficulty: "Beginner",
  },
  {
    slug: "react-transitions",
    name: "Transitions & useTransition",
    description:
      "Mark expensive state updates as non-urgent so React can interrupt them for higher-priority interactions. Keeps the UI responsive during heavy re-renders or data fetches.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/useTransition",
    tags: ["React", "Performance", "Transitions", "Concurrency"],
    difficulty: "Advanced",
  },
  {
    slug: "react-error-boundaries",
    name: "Error Boundaries",
    description:
      "Catch JavaScript errors anywhere in a component subtree and display a fallback UI instead of crashing the whole application. Essential for production resilience.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    tags: ["React", "Error Handling", "Resilience", "Production"],
    difficulty: "Intermediate",
  },
  {
    slug: "react-memo",
    name: "memo & useMemo",
    description:
      "Skip expensive re-renders by memoizing component output and computed values. Use memo() to wrap components and useMemo() to cache the return value of expensive calculations.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/memo",
    tags: ["React", "Performance", "Memoization", "Optimization"],
    difficulty: "Intermediate",
  },
  {
    slug: "react-ref",
    name: "useRef & forwardRef",
    description:
      "Access DOM nodes and persist mutable values across renders without triggering re-renders. Essential for animations, focus management, measuring elements, and integrating non-React libraries.",
    source: "React",
    sourceUrl: "https://react.dev/reference/react/useRef",
    tags: ["React", "DOM", "Refs", "Imperative"],
    difficulty: "Beginner",
  },

  // ─── Next.js ─────────────────────────────────────────────────────────────
  {
    slug: "nextjs-app-router",
    name: "Next.js App Router",
    description:
      "The modern Next.js routing system built on React Server Components. Layouts, pages, loading, error, and route groups live in a file-system hierarchy under the `app/` directory.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/routing",
    tags: ["Next.js", "App Router", "Routing", "RSC"],
    difficulty: "Beginner",
  },
  {
    slug: "nextjs-server-actions",
    name: "Server Actions",
    description:
      "Call server-side functions directly from client components and forms. No API route needed — just mark a function `'use server'` and call it from the client with progressive enhancement built-in.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
    tags: ["Next.js", "Server Actions", "Forms", "Mutations"],
    difficulty: "Intermediate",
  },
  {
    slug: "nextjs-image-optimization",
    name: "Image Optimization",
    description:
      "Automatic WebP/AVIF conversion, responsive srcset generation, lazy loading, and blur placeholders via the `<Image>` component. Eliminates the most common Core Web Vitals regressions.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/optimizing/images",
    tags: ["Next.js", "Images", "Performance", "Core Web Vitals"],
    difficulty: "Beginner",
  },
  {
    slug: "nextjs-middleware",
    name: "Middleware",
    description:
      "Run code before every request on the edge — auth checks, redirects, rewrites, A/B testing, and header injection — with sub-millisecond latency and global distribution.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/routing/middleware",
    tags: ["Next.js", "Middleware", "Edge", "Auth"],
    difficulty: "Intermediate",
  },
  {
    slug: "nextjs-parallel-routes",
    name: "Parallel Routes",
    description:
      "Render multiple pages simultaneously in the same layout using named slots (`@slot`). Powers dashboards, modals, and split-pane views where independent sections load independently.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/routing/parallel-routes",
    tags: ["Next.js", "Routing", "Layouts", "Advanced"],
    difficulty: "Advanced",
  },
  {
    slug: "nextjs-metadata",
    name: "Metadata API",
    description:
      "Define static and dynamic metadata (title, description, OG images, robots, canonical URLs) from layout and page files. Next.js generates all `<head>` tags automatically.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/optimizing/metadata",
    tags: ["Next.js", "SEO", "Metadata", "OG Images"],
    difficulty: "Beginner",
  },
  {
    slug: "nextjs-isr",
    name: "Incremental Static Regeneration",
    description:
      "Rebuild static pages on-demand or on a time interval without a full redeploy. `revalidate` and `revalidatePath` let you keep static pages fresh while serving them at CDN speed.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration",
    tags: ["Next.js", "ISR", "Static", "Caching"],
    difficulty: "Intermediate",
  },
  {
    slug: "nextjs-route-handlers",
    name: "Route Handlers",
    description:
      "Create REST API endpoints inside the App Router using `route.ts` files. Supports all HTTP methods, streaming responses, CORS headers, and edge runtime deployment.",
    source: "Next.js",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
    tags: ["Next.js", "API", "REST", "Routes"],
    difficulty: "Beginner",
  },

  // ─── TypeScript ──────────────────────────────────────────────────────────
  {
    slug: "typescript-generics",
    name: "TypeScript Generics",
    description:
      "Write reusable, type-safe code that works across multiple types. Generics are the foundation of utility types, React component props, and flexible API client patterns.",
    source: "TypeScript",
    sourceUrl: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    tags: ["TypeScript", "Generics", "Type Safety", "Patterns"],
    difficulty: "Intermediate",
  },
  {
    slug: "typescript-utility-types",
    name: "Utility Types",
    description:
      "Built-in type transformations: Partial, Required, Pick, Omit, ReturnType, Awaited, and more. Compose complex types from simpler ones without duplicating type definitions.",
    source: "TypeScript",
    sourceUrl: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
    tags: ["TypeScript", "Utility Types", "Type Manipulation", "Patterns"],
    difficulty: "Intermediate",
  },
  {
    slug: "typescript-discriminated-unions",
    name: "Discriminated Unions",
    description:
      "Model mutually exclusive states by combining union types with a shared discriminant field. The TypeScript pattern for exhaustive type narrowing — eliminates entire classes of runtime bugs.",
    source: "TypeScript",
    sourceUrl: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
    tags: ["TypeScript", "Type Safety", "State Machines", "Narrowing"],
    difficulty: "Intermediate",
  },
  {
    slug: "typescript-template-literal-types",
    name: "Template Literal Types",
    description:
      "Build string types programmatically using template literal syntax. Powers strongly-typed CSS class name generators, event names, API path builders, and i18n key systems.",
    source: "TypeScript",
    sourceUrl: "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
    tags: ["TypeScript", "Template Literals", "Advanced Types", "Metaprogramming"],
    difficulty: "Advanced",
  },
  {
    slug: "typescript-satisfies",
    name: "satisfies Operator",
    description:
      "Validate that an expression matches a type without widening it. Catch mismatches at definition time while preserving the most specific inferred type for downstream use.",
    source: "TypeScript",
    sourceUrl: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
    tags: ["TypeScript", "Type Safety", "TypeScript 4.9+", "Operators"],
    difficulty: "Intermediate",
  },
  {
    slug: "typescript-zod",
    name: "Zod Schema Validation",
    description:
      "Define schemas once, infer TypeScript types automatically, and validate at runtime. The standard for type-safe form validation, API response parsing, and environment variable checking.",
    source: "TypeScript",
    sourceUrl: "https://zod.dev",
    tags: ["TypeScript", "Zod", "Validation", "Schema"],
    difficulty: "Beginner",
  },

  // ─── Node.js ─────────────────────────────────────────────────────────────
  {
    slug: "nodejs-streams",
    name: "Node.js Streams",
    description:
      "Process data piece-by-piece without buffering the entire payload in memory. Essential for file processing, HTTP responses, log pipelines, and transforming large datasets efficiently.",
    source: "Node.js",
    sourceUrl: "https://nodejs.org/docs/latest/api/stream.html",
    tags: ["Node.js", "Streams", "Performance", "Async"],
    difficulty: "Advanced",
  },
  {
    slug: "nodejs-worker-threads",
    name: "Worker Threads",
    description:
      "Run CPU-intensive JavaScript in parallel threads without blocking the event loop. Each worker has its own V8 instance and communicates via message passing and SharedArrayBuffer.",
    source: "Node.js",
    sourceUrl: "https://nodejs.org/docs/latest/api/worker_threads.html",
    tags: ["Node.js", "Concurrency", "Performance", "CPU"],
    difficulty: "Advanced",
  },
  {
    slug: "nodejs-esm",
    name: "ES Modules in Node.js",
    description:
      "Use native ESM (`import`/`export`) in Node.js with `.mjs` files or `\"type\": \"module\"` in package.json. Enables top-level await, tree-shaking, and alignment with browser modules.",
    source: "Node.js",
    sourceUrl: "https://nodejs.org/docs/latest/api/esm.html",
    tags: ["Node.js", "ESM", "Modules", "JavaScript"],
    difficulty: "Beginner",
  },
  {
    slug: "nodejs-crypto",
    name: "Node.js Crypto",
    description:
      "Built-in cryptographic functions for hashing, HMAC, encryption/decryption, key generation, and secure random bytes. No third-party library needed for common security operations.",
    source: "Node.js",
    sourceUrl: "https://nodejs.org/docs/latest/api/crypto.html",
    tags: ["Node.js", "Security", "Crypto", "Hashing"],
    difficulty: "Intermediate",
  },

  // ─── Databases ───────────────────────────────────────────────────────────
  {
    slug: "prisma-orm",
    name: "Prisma ORM",
    description:
      "Type-safe database access for TypeScript. Define your schema in Prisma Schema Language, run migrations, and query with a fully-typed client that eliminates SQL injection and runtime shape errors.",
    source: "Databases",
    sourceUrl: "https://www.prisma.io/docs/getting-started",
    tags: ["Prisma", "ORM", "PostgreSQL", "TypeScript"],
    difficulty: "Beginner",
  },
  {
    slug: "drizzle-orm",
    name: "Drizzle ORM",
    description:
      "Lightweight TypeScript ORM with a SQL-like query API. Define schemas in TypeScript, get full type inference, and generate migrations — with zero runtime overhead and serverless-first design.",
    source: "Databases",
    sourceUrl: "https://orm.drizzle.team/docs/overview",
    tags: ["Drizzle", "ORM", "SQL", "TypeScript"],
    difficulty: "Intermediate",
  },
  {
    slug: "supabase",
    name: "Supabase",
    description:
      "Postgres as a service with auto-generated REST and real-time APIs, authentication, storage, and edge functions. The open-source Firebase alternative with full Postgres capabilities.",
    source: "Databases",
    sourceUrl: "https://supabase.com/docs",
    tags: ["Supabase", "PostgreSQL", "BaaS", "Real-time"],
    difficulty: "Beginner",
  },
  {
    slug: "redis-caching",
    name: "Redis Caching",
    description:
      "Cache expensive database queries, session data, rate limit counters, and computed values in sub-millisecond in-memory storage. Use Upstash for serverless-compatible Redis via HTTP.",
    source: "Databases",
    sourceUrl: "https://redis.io/docs/latest/",
    tags: ["Redis", "Caching", "Performance", "Sessions"],
    difficulty: "Intermediate",
  },
  {
    slug: "vector-databases",
    name: "Vector Databases",
    description:
      "Store and query high-dimensional embeddings for semantic search and RAG. Options include Pinecone, Weaviate, Chroma, and pgvector (Postgres extension) — each with different latency/cost tradeoffs.",
    source: "Databases",
    sourceUrl: "https://www.pinecone.io/learn/vector-database/",
    tags: ["Vector DB", "Embeddings", "RAG", "AI Search"],
    difficulty: "Intermediate",
  },

  // ─── CSS & Design ─────────────────────────────────────────────────────────
  {
    slug: "tailwind-css",
    name: "Tailwind CSS v4",
    description:
      "Utility-first CSS framework with a CSS-first configuration model in v4. Define design tokens with `@theme`, use arbitrary values, and build entire UIs without leaving HTML.",
    source: "CSS & Design",
    sourceUrl: "https://tailwindcss.com/docs/installation",
    tags: ["Tailwind", "CSS", "Utility-First", "Design System"],
    difficulty: "Beginner",
  },
  {
    slug: "css-grid",
    name: "CSS Grid Layout",
    description:
      "Two-dimensional layout system for building complex, responsive page shells. Define rows and columns with `grid-template`, place items with `grid-area`, and avoid absolutely all absolute positioning hacks.",
    source: "CSS & Design",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    tags: ["CSS", "Grid", "Layout", "Responsive"],
    difficulty: "Intermediate",
  },
  {
    slug: "css-container-queries",
    name: "CSS Container Queries",
    description:
      "Apply styles based on the size of a container element, not the viewport. Components that adapt to their layout context — sidebars, card grids, and embeddable widgets — without JavaScript.",
    source: "CSS & Design",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
    tags: ["CSS", "Container Queries", "Responsive", "Components"],
    difficulty: "Intermediate",
  },
  {
    slug: "css-view-transitions",
    name: "View Transitions API",
    description:
      "Animate between page states or DOM updates with CSS-powered transitions — no animation library needed. The browser captures before/after snapshots and animates between them automatically.",
    source: "CSS & Design",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API",
    tags: ["CSS", "Animations", "View Transitions", "UX"],
    difficulty: "Intermediate",
  },

  // ─── Testing ─────────────────────────────────────────────────────────────
  {
    slug: "vitest",
    name: "Vitest",
    description:
      "Vite-native test runner with Jest-compatible API. Near-instant HMR for tests, TypeScript and ESM support out of the box, built-in code coverage, and snapshot testing.",
    source: "Testing",
    sourceUrl: "https://vitest.dev/guide/",
    tags: ["Testing", "Vitest", "Unit Tests", "Vite"],
    difficulty: "Beginner",
  },
  {
    slug: "playwright",
    name: "Playwright E2E Testing",
    description:
      "End-to-end browser testing for Chromium, Firefox, and WebKit in the same test. Auto-waits eliminate flaky sleeps, trace viewer pinpoints failures, and API testing needs no browser.",
    source: "Testing",
    sourceUrl: "https://playwright.dev/docs/intro",
    tags: ["Testing", "E2E", "Playwright", "Browsers"],
    difficulty: "Intermediate",
  },
  {
    slug: "testing-library",
    name: "React Testing Library",
    description:
      "Test React components the way users interact with them — by accessible role, label, and text. Promotes accessible UIs as a side effect of good testing practices.",
    source: "Testing",
    sourceUrl: "https://testing-library.com/docs/react-testing-library/intro/",
    tags: ["Testing", "React", "Accessibility", "Integration"],
    difficulty: "Beginner",
  },
  {
    slug: "msw",
    name: "Mock Service Worker (MSW)",
    description:
      "Intercept network requests at the service worker level for realistic API mocking. Same mock definitions work in tests (Node.js) and the browser — no more diverging mock/prod behavior.",
    source: "Testing",
    sourceUrl: "https://mswjs.io/docs/",
    tags: ["Testing", "MSW", "API Mocking", "Network"],
    difficulty: "Intermediate",
  },

  // ─── Deployment ──────────────────────────────────────────────────────────
  {
    slug: "vercel-edge-functions",
    name: "Vercel Edge Functions",
    description:
      "Deploy JavaScript/TypeScript functions to Vercel's edge network — 100+ global locations, sub-millisecond cold starts, and access to the Web Fetch API, crypto, and streaming responses.",
    source: "Deployment",
    sourceUrl: "https://vercel.com/docs/functions/edge-functions",
    tags: ["Vercel", "Edge", "Serverless", "Performance"],
    difficulty: "Intermediate",
  },
  {
    slug: "github-actions",
    name: "GitHub Actions CI/CD",
    description:
      "Automate build, test, and deployment pipelines directly from your repository. YAML-defined workflows trigger on push, PR, schedule, or manual dispatch with 10,000+ marketplace actions.",
    source: "Deployment",
    sourceUrl: "https://docs.github.com/en/actions",
    tags: ["CI/CD", "GitHub", "Automation", "DevOps"],
    difficulty: "Intermediate",
  },
  {
    slug: "docker",
    name: "Docker Containerization",
    description:
      "Package applications and dependencies into portable containers that run identically in development, CI, and production. Multi-stage builds minimize image size for Node.js and Next.js apps.",
    source: "Deployment",
    sourceUrl: "https://docs.docker.com/get-started/",
    tags: ["Docker", "Containers", "DevOps", "Deployment"],
    difficulty: "Intermediate",
  },
  {
    slug: "cloudflare-workers",
    name: "Cloudflare Workers",
    description:
      "Deploy JavaScript/TypeScript to Cloudflare's 300+ edge locations. Access KV storage, D1 (SQLite), R2 (object storage), and Queues — a complete serverless platform at the edge.",
    source: "Deployment",
    sourceUrl: "https://developers.cloudflare.com/workers/",
    tags: ["Cloudflare", "Edge", "Workers", "KV"],
    difficulty: "Intermediate",
  },
];

export const SOURCES: SourceKey[] = [
  "Anthropic",
  "OpenAI",
  "Google",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Databases",
  "CSS & Design",
  "Testing",
  "Deployment",
];

export const SOURCE_COLORS: Record<SourceKey, string> = {
  Anthropic: "text-[#d97757] dark:text-[#e8896a] bg-orange-50 dark:bg-orange-400/10 border-orange-200 dark:border-orange-400/20",
  OpenAI: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20",
  Google: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20",
  React: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-400/10 border-sky-200 dark:border-sky-400/20",
  "Next.js": "text-black dark:text-white bg-black/5 dark:bg-white/5 border-black/15 dark:border-white/15",
  TypeScript: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-300/10 border-blue-200 dark:border-blue-300/20",
  "Node.js": "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-400/10 border-green-200 dark:border-green-400/20",
  Databases: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/20",
  "CSS & Design": "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-400/10 border-pink-200 dark:border-pink-400/20",
  Testing: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20",
  Deployment: "text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-300/10 border-slate-200 dark:border-slate-300/20",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "text-emerald-600 dark:text-emerald-400",
  Intermediate: "text-amber-600 dark:text-amber-400",
  Advanced: "text-red-600 dark:text-red-400",
};

export function getExternalSkillBySlug(slug: string): ExternalSkill | undefined {
  return externalSkills.find((s) => s.slug === slug);
}
