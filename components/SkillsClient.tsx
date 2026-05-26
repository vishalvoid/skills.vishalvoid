"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalSkill } from "@/data/external-skills";
import { skills as mySkills } from "@/data/skills";
import type { Skill } from "@/lib/types";

import { angularSkills } from "@/data/external/angular";
import { anthropicSkills } from "@/data/external/anthropic";
import { auth0Skills } from "@/data/external/auth0";
import { betterAuthSkills } from "@/data/external/better-auth";
import { braveSkills } from "@/data/external/brave";
import { browserbaseSkills } from "@/data/external/browserbase";
import { callstackSkills } from "@/data/external/callstack";
import { clickhouseSkills } from "@/data/external/clickhouse";
import { cloudflareSkills } from "@/data/external/cloudflare";
import { coderabbitaiSkills } from "@/data/external/coderabbitai";
import { coinbaseSkills } from "@/data/external/coinbase";
import { composiohqSkills } from "@/data/external/composiohq";
import { expoSkills } from "@/data/external/expo";
import { firecrawlSkills } from "@/data/external/firecrawl";
import { getsentrySkills } from "@/data/external/getsentry";
import { googleGeminiSkills } from "@/data/external/google-gemini";
import { googleLabsCodeSkills } from "@/data/external/google-labs-code";
import { googleWorkspaceSkills } from "@/data/external/googleworkspace";
import { hashicorpSkills } from "@/data/external/hashicorp";
import { huggingfaceSkills } from "@/data/external/huggingface";
import { microsoftSkills } from "@/data/external/microsoft";
import { neondatabaseSkills } from "@/data/external/neondatabase";
import { netlifySkills } from "@/data/external/netlify";
import { remotionDevSkills } from "@/data/external/remotion-dev";
import { replicateSkills } from "@/data/external/replicate";
import { sanityIoSkills } from "@/data/external/sanity-io";
import { stripeSkills } from "@/data/external/stripe";
import { supabaseSkills } from "@/data/external/supabase";
import { tinybirdcoSkills } from "@/data/external/tinybirdco";
import { trailofbitsSkills } from "@/data/external/trailofbits";
import { trycourierSkills } from "@/data/external/trycourier";
import { typefullySkills } from "@/data/external/typefully";
import { veniceaiSkills } from "@/data/external/veniceai";
import { vercelLabsSkills } from "@/data/external/vercel-labs";
import { voltagentSkills } from "@/data/external/voltagent";

interface ProviderItem {
  id: string;
  name: string;
  skills: ExternalSkill[];
  repoPath: string;
  icon: React.ReactNode;
}

const PROVIDER_LIST: ProviderItem[] = [
  {
    id: "angular",
    name: "Angular",
    skills: angularSkills,
    repoPath: "angular/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2L2 5.5l1.5 12.5L12 22l8.5-4L22 5.5L12 2z" fill="#DD0031" />
        <path d="M12 2v20l8.5-4L22 5.5L12 2z" fill="#C3002F" />
        <path d="M12 4.5l-6 11.5h2.5l1.2-3h4.6l1.2 3h2.5L12 4.5zm-1.1 6L12 7.7l1.1 2.8h-2.2z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "anthropic",
    name: "Anthropic",
    skills: anthropicSkills,
    repoPath: "anthropic/skills",
    icon: (
      <svg viewBox="0 0 58 58" className="w-4 h-4 shrink-0" fill="#CCBFB5">
        <path d="M20.93 34.56l7.58-19.53 7.58 19.53H20.93z M22.16.97L0 56.56h12.39l4.53-11.67h23.18l4.53 11.67h12.39L34.87.97H22.16z" />
      </svg>
    )
  },
  {
    id: "auth0",
    name: "Auth0",
    skills: auth0Skills,
    repoPath: "auth0/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2C9.5 3.5 6.5 4.5 3.5 5c0 6.5 3 13 8.5 17 5.5-4 8.5-10.5 8.5-17-3-.5-6-1.5-8.5-3z" fill="#EB5424" />
        <path d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zM12 18.5c-2.5 0-4.5-2-4.5-4.5 0-1.5 1-3 2.5-4 .5 1.5 1 2.5 2 2.5s1.5-1 2-2.5c1.5 1 2.5 2.5 2.5 4 0 2.5-2 4.5-4.5 4.5z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "better-auth",
    name: "Better Auth",
    skills: betterAuthSkills,
    repoPath: "better-auth/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="#F59E0B" strokeWidth="2.5">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "brave",
    name: "Brave",
    skills: braveSkills,
    repoPath: "brave/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2c-.12 0-.25.02-.36.07L4 5.4C2.8 5.92 2 7.12 2 8.44c0 3.76 2.05 7.71 5.9 10.79l3.53 2.56c.35.25.81.25 1.16 0l3.53-2.56c3.85-3.08 5.9-7.03 5.9-10.79 0-1.32-.8-2.52-2-3.04l-7.64-3.33c-.11-.05-.24-.07-.36-.07z" fill="#FB542B" />
        <path d="M12 6.5l3.5 4.5H8.5L12 6.5zM12 18.5l-4-4h8l-4 4z" fill="#FFFFFF" opacity="0.9" />
      </svg>
    )
  },
  {
    id: "browserbase",
    name: "Browserbase",
    skills: browserbaseSkills,
    repoPath: "browserbase/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="#FF5C00" strokeWidth="2.5">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "callstack",
    name: "Callstack",
    skills: callstackSkills,
    repoPath: "callstack/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#E1382A" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E1382A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "clickhouse",
    name: "Clickhouse",
    skills: clickhouseSkills,
    repoPath: "clickhouse/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <rect x="3" y="4" width="4" height="16" fill="#FCD017" rx="1" />
        <rect x="10" y="4" width="4" height="16" fill="#FF6000" rx="1" />
        <rect x="17" y="4" width="4" height="16" fill="#FF6000" rx="1" />
      </svg>
    )
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    skills: cloudflareSkills,
    repoPath: "cloudflare/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M17.5 19H9a5 5 0 0 1-5-5 5 5 0 0 1 4.5-4.9c.7-3.4 3.7-6.1 7.5-6.1 4.3 0 7.8 3.2 8 7.4A4.5 4.5 0 0 1 17.5 19z" fill="#F38020" />
      </svg>
    )
  },
  {
    id: "coderabbitai",
    name: "Coderabbitai",
    skills: coderabbitaiSkills,
    repoPath: "coderabbitai/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#00A36C">
        <path d="M12 2a4 4 0 0 1 4 4v3.2A8 8 0 1 1 8 9.2V6a4 4 0 0 1 4-4zm-2.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    )
  },
  {
    id: "coinbase",
    name: "Coinbase",
    skills: coinbaseSkills,
    repoPath: "coinbase/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0052FF" />
        <path d="M12 6a6 6 0 0 0-6 6 6 6 0 0 0 6 6h2v-2h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2V6h-2z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "composiohq",
    name: "Composio",
    skills: composiohqSkills,
    repoPath: "composiohq/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="#10B981" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "expo",
    name: "Expo",
    skills: expoSkills,
    repoPath: "expo/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <rect width="24" height="24" rx="5" fill="#000020" />
        <path d="M12 4L4 18h16L12 4zm0 3.5l5.5 9.5h-11L12 7.5z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "firecrawl",
    name: "Firecrawl",
    skills: firecrawlSkills,
    repoPath: "firecrawl/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2C9.5 6 6 8.5 6 13.5a6 6 0 1 0 12 0C18 8.5 14.5 6 12 2z" fill="#FF4500" />
        <path d="M12 8c-1.5 2-3 3-3 5.5a3 3 0 1 0 6 0C15 11 13.5 10 12 8z" fill="#FFCC00" />
      </svg>
    )
  },
  {
    id: "getsentry",
    name: "Sentry",
    skills: getsentrySkills,
    repoPath: "getsentry/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#E1567C" strokeWidth="2.5" />
        <circle cx="12" cy="12" r="4" fill="#362D59" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="#E1567C" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: "google-gemini",
    name: "Google Gemini",
    skills: googleGeminiSkills,
    repoPath: "google-gemini/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <defs>
          <linearGradient id="gemini-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B51E0" />
            <stop offset="50%" stopColor="#4285F4" />
            <stop offset="100%" stopColor="#EA4335" />
          </linearGradient>
        </defs>
        <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" fill="url(#gemini-grad-sidebar)" />
      </svg>
    )
  },
  {
    id: "google-labs-code",
    name: "Google Labs",
    skills: googleLabsCodeSkills,
    repoPath: "google-labs-code/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M6 3h12M9 3v6L4.2 18.6C3.7 19.5 4.3 21 5.4 21h13.2c1.1 0 1.7-1.5 1.2-2.4L15 9V3M6 14h12" stroke="#8AB4F8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 15h12v4.5A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5V15z" fill="#C58AF9" opacity="0.8" />
      </svg>
    )
  },
  {
    id: "googleworkspace",
    name: "Google Workspace",
    skills: googleWorkspaceSkills,
    repoPath: "googleworkspace/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <rect x="3" y="3" width="7" height="7" fill="#4285F4" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" fill="#EA4335" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" fill="#FBBC05" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" fill="#34A853" rx="1.5" />
      </svg>
    )
  },
  {
    id: "hashicorp",
    name: "HashiCorp",
    skills: hashicorpSkills,
    repoPath: "hashicorp/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 10v10M2 17l10 5 10-5" stroke="#6029E4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    skills: huggingfaceSkills,
    repoPath: "huggingface/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FFD15C" />
        <circle cx="8.5" cy="10" r="1.5" fill="#000000" />
        <circle cx="15.5" cy="10" r="1.5" fill="#000000" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "microsoft",
    name: "Microsoft",
    skills: microsoftSkills,
    repoPath: "microsoft/skills",
    icon: (
      <svg viewBox="0 0 23 23" className="w-4 h-4 shrink-0" fill="none">
        <rect x="0" y="0" width="10" height="10" fill="#F25022" />
        <rect x="13" y="0" width="10" height="10" fill="#7FBA00" />
        <rect x="0" y="13" width="10" height="10" fill="#00A4EF" />
        <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
      </svg>
    )
  },
  {
    id: "neondatabase",
    name: "Neon",
    skills: neondatabaseSkills,
    repoPath: "neondatabase/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#00E599" />
      </svg>
    )
  },
  {
    id: "netlify",
    name: "Netlify",
    skills: netlifySkills,
    repoPath: "netlify/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2L2 12l10 10 10-10L12 2z" fill="#00AD9F" />
        <path d="M12 6v12M6 12h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "remotion-dev",
    name: "Remotion",
    skills: remotionDevSkills,
    repoPath: "remotion-dev/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <defs>
          <linearGradient id="remotion-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D8FF" />
            <stop offset="100%" stopColor="#0077FF" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#remotion-grad-sidebar)" />
        <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "replicate",
    name: "Replicate",
    skills: replicateSkills,
    repoPath: "replicate/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#000000" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="#333333" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: "sanity-io",
    name: "Sanity",
    skills: sanityIoSkills,
    repoPath: "sanity-io/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#F03E2F" strokeWidth="3" />
        <circle cx="12" cy="12" r="4" fill="#F03E2F" />
      </svg>
    )
  },
  {
    id: "stripe",
    name: "Stripe",
    skills: stripeSkills,
    repoPath: "stripe/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <rect width="24" height="24" rx="5" fill="#635BFF" />
        <path d="M13.5 8.5c-.8 0-1.2.4-1.2.9 0 1 .8 1.2 2.2 1.6 1.4.4 2.5 1 2.5 2.5 0 2.2-1.8 3-3.8 3-2 0-3.8-.8-3.8-2.5h2.2c0 1 .6 1.1 1.6 1.1 1 0 1.4-.4 1.4-1 0-.9-.6-1.2-2-1.6-1.4-.4-2.7-1-2.7-2.6 0-2 1.8-2.8 3.6-2.8 1.8 0 3.2.8 3.2 2.4H14.7c0-.9-.5-1-1.2-1z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "supabase",
    name: "Supabase",
    skills: supabaseSkills,
    repoPath: "supabase/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M19 11h-6.24l4.08-8.16a1 1 0 0 0-1.57-1.23l-11 11a1 1 0 0 0 .71 1.71h6.24l-4.08 8.16a1 1 0 0 0 1.57 1.23l11-11a1 1 0 0 0-.71-1.71z" fill="#3ECF8E" />
      </svg>
    )
  },
  {
    id: "tinybirdco",
    name: "Tinybird",
    skills: tinybirdcoSkills,
    repoPath: "tinybirdco/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 10h3l-4 4-4-4h3V8h2v4z" fill="#00D084" />
      </svg>
    )
  },
  {
    id: "trailofbits",
    name: "Trail of Bits",
    skills: trailofbitsSkills,
    repoPath: "trailofbits/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#D62728" />
        <path d="M12 6v10M8 10h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "trycourier",
    name: "Courier",
    skills: trycourierSkills,
    repoPath: "trycourier/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="#FF5E5B" />
      </svg>
    )
  },
  {
    id: "typefully",
    name: "Typefully",
    skills: typefullySkills,
    repoPath: "typefully/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="#1DA1F2" />
      </svg>
    )
  },
  {
    id: "veniceai",
    name: "Venice AI",
    skills: veniceaiSkills,
    repoPath: "veniceai/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="#F59E0B" opacity="0.2" />
        <path d="M8 10a4 4 0 0 0 8 0" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "vercel-labs",
    name: "Vercel",
    skills: vercelLabsSkills,
    repoPath: "vercel-labs/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
        <path d="M24 22.5L12 1.5L0 22.5H24Z" />
      </svg>
    )
  },
  {
    id: "voltagent",
    name: "VoltAgent",
    skills: voltagentSkills,
    repoPath: "voltagent/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#FBBF24" />
      </svg>
    )
  }
];

const TOTAL_SKILLS = PROVIDER_LIST.reduce((acc, p) => acc + p.skills.length, 0) + mySkills.length;

type FilteredItem =
  | { kind: "personal"; skill: Skill; href: string; repoPath: string }
  | { kind: "external"; skill: ExternalSkill; repoPath: string; href: string };

function matchesPersonal(skill: Skill, q: string): boolean {
  return (
    skill.name.toLowerCase().includes(q) ||
    skill.slug.toLowerCase().includes(q) ||
    skill.description.toLowerCase().includes(q) ||
    skill.tags.some((t) => t.toLowerCase().includes(q))
  );
}

function matchesQuery(skill: ExternalSkill, q: string): boolean {
  return (
    skill.name.toLowerCase().includes(q) ||
    skill.slug.toLowerCase().includes(q) ||
    skill.description.toLowerCase().includes(q) ||
    skill.tags.some((t) => t.toLowerCase().includes(q)) ||
    skill.category.toLowerCase().includes(q)
  );
}

export default function SkillsClient() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedProviders = isExpanded ? PROVIDER_LIST : PROVIDER_LIST.slice(0, 11);
  const remainingCount = PROVIDER_LIST.length - 11;

  const filtered = useMemo((): FilteredItem[] => {
    const q = query.toLowerCase().trim();
    const results: FilteredItem[] = [];

    // Personal skills always first
    if (selectedId === "all" || selectedId === "vishalvoid") {
      for (const skill of mySkills) {
        if (!q || matchesPersonal(skill, q)) {
          results.push({ kind: "personal", skill, href: `/${skill.slug}`, repoPath: "vishalvoid" });
        }
      }
    }

    // External provider skills
    if (selectedId !== "vishalvoid") {
      const pool = selectedId === "all" ? PROVIDER_LIST : PROVIDER_LIST.filter((p) => p.id === selectedId);
      for (const p of pool) {
        for (const skill of p.skills) {
          if (!q || matchesQuery(skill, q)) {
            results.push({ kind: "external", skill, repoPath: p.repoPath, href: `/skills/${p.id}/${skill.slug}` });
          }
        }
      }
    }

    return results;
  }, [selectedId, query]);

  const activeProviderName =
    selectedId === "all" ? "All Providers" :
    selectedId === "vishalvoid" ? "vishalvoid" :
    PROVIDER_LIST.find((p) => p.id === selectedId)?.name ?? selectedId;

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full items-start">
      {/* Sidebar - Providers Filter */}
      <aside className="w-full md:w-72 shrink-0 md:sticky md:top-24 flex flex-col gap-6 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-black/8 dark:border-white/10 md:pr-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-[10px] text-black/40 dark:text-white/30 tracking-widest uppercase font-semibold">
            Providers
          </h3>
          <div className="flex flex-col gap-1.5">
            {/* All Providers */}
            <button
              onClick={() => setSelectedId("all")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${selectedId === "all"
                  ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                  : "text-black/60 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                All Providers
              </span>
              <span className={`text-[10px] opacity-75 font-mono ${selectedId === "all" ? "text-white/70 dark:text-black/70" : "text-black/40 dark:text-white/40"}`}>
                {TOTAL_SKILLS}
              </span>
            </button>

            {/* vishalvoid — personal skills */}
            <button
              onClick={() => setSelectedId("vishalvoid")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${selectedId === "vishalvoid"
                  ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                  : "text-black/60 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                vishalvoid
              </span>
              <span className="text-[10px] opacity-60 font-mono">{mySkills.length}</span>
            </button>

            {/* Providers List with scrollbar for premium aesthetics */}
            <div className="flex flex-col gap-1.5 max-h-[75vh] overflow-y-auto pr-1 mt-1 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
              {displayedProviders.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${selectedId === p.id
                      ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                      : "text-black/60 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {p.icon}
                    {p.name}
                  </span>
                  <span className="text-[10px] opacity-60 font-mono">
                    {p.skills.length}
                  </span>
                </button>
              ))}

              {!isExpanded && remainingCount > 0 && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-black/50 dark:text-white/40 hover:text-black/80 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-dashed border-black/10 dark:border-white/10 mt-1"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0 opacity-60">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Show more
                  </span>
                  <span className="text-[10px] opacity-65 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono font-medium">
                    +{remainingCount}
                  </span>
                </button>
              )}

              {isExpanded && PROVIDER_LIST.length > 11 && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-black/55 dark:text-white/45 hover:text-black/85 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-dashed border-black/10 dark:border-white/10 mt-1"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0 opacity-60">
                      <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Show less
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid Content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
        {/* Active Filter Status, Count & Search Bar */}
        <div className="flex flex-col gap-3 border-b border-black/5 dark:border-white/5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold text-black/80 dark:text-white/90">
              {activeProviderName}
            </h2>
            <p className="text-[11px] text-black/40 dark:text-white/40">
              {filtered.length} of {TOTAL_SKILLS}
              {query && ` matching "${query}"`}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full">
            {/* Search Input */}
            <div className="relative w-full">
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25 dark:text-white/25 pointer-events-none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                id="search-input"
                type="search"
                placeholder="Search skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/8 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 font-mono text-xs text-black/70 dark:text-white/70 placeholder-black/30 dark:placeholder-white/25 focus:outline-none focus:border-black/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-black/20 transition-all duration-200"
              />
            </div>

            {(selectedId !== "all" || query) && (
              <button
                onClick={() => {
                  setSelectedId("all");
                  setQuery("");
                }}
                className="text-[10px] font-mono text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                Clear
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* List of Skills */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-black/[0.01] dark:bg-white/[0.01] border border-dashed border-black/8 dark:border-white/8 rounded-xl flex flex-col gap-2 items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/30 dark:text-white/30">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35M15 9l-6 6" />
            </svg>
            <span className="font-mono text-xs text-black/40 dark:text-white/45">
              No skills found matching those filters.
            </span>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {filtered.map((item, index) => (
              <Link
                key={`${item.repoPath}-${item.skill.slug}`}
                href={item.href}
                className="group flex gap-4 py-4 border-b border-black/5 dark:border-white/5 last:border-none hover:bg-black/[0.06] dark:hover:bg-white/[0.08] px-4 rounded-xl -mx-4 transition-all duration-150 cursor-pointer w-full"
              >
                {/* Index Number */}
                <div className="font-mono text-sm text-black/35 dark:text-white/30 w-8 shrink-0 pt-0.5 text-right select-none">
                  {index + 1}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mono text-base font-bold text-black dark:text-white w-fit truncate">
                      {item.skill.slug}
                    </span>
                    <span className={`font-mono text-xs font-medium tracking-wide ${item.kind === "personal" ? "text-blue-500 dark:text-blue-400" : "text-black/35 dark:text-white/40"}`}>
                      {item.repoPath}
                    </span>
                  </div>
                  <h3 className="text-sm text-black/60 dark:text-white/50 leading-relaxed mt-1.5 w-full font-mono">
                    {item.skill.tagline}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back to home */}
        <div className="border-t border-black/8 dark:border-white/8 pt-6 mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to my patterns
          </Link>
        </div>
      </div>
    </div>
  );
}
