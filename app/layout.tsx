import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE = "https://skills.vishalvoid.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: "Official AI Agent Skills & MCP Server Directory — skills.vishalvoid.com",
    template: "%s · skills.vishalvoid.com",
  },

  description:
    "Browse 438+ official MCP servers and AI agent skills from Anthropic, Stripe, Supabase, Cloudflare and 35 providers. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible agent. Install in one command.",

  keywords: [
    "mcp servers",
    "mcp server directory",
    "official mcp servers",
    "ai agent skills",
    "model context protocol",
    "mcp servers list",
    "cursor mcp",
    "claude mcp",
    "copilot mcp",
    "ai developer tools",
    "mcp tools",
    "anthropic mcp",
    "stripe mcp",
    "supabase mcp",
    "cloudflare mcp",
    "ai agent tools",
    "developer productivity tools",
    "mcp skills",
    "vishal kumar singh",
    "vishalvoid",
  ],

  authors: [{ name: "Vishal Kumar Singh", url: "https://vishalvoid.com" }],
  creator: "Vishal Kumar Singh",
  publisher: "Vishal Kumar Singh",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "skills.vishalvoid.com",
    title: "Official AI Agent Skills & MCP Server Directory — skills.vishalvoid.com",
    description:
      "Browse 438+ official MCP servers and AI agent skills from Anthropic, Stripe, Supabase, Cloudflare and 35 providers. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible agent.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Official AI Agent Skills & MCP Server Directory",
    description:
      "438+ official MCP servers from 35 providers. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible AI agent. Install in one command. Free.",
    creator: "@vishalvoid",
    site: "@vishalvoid",
  },

  alternates: {
    canonical: BASE,
  },

  icons: {
    icon: [
      { url: "/skills-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/skills-icon.svg",
    shortcut: "/skills-icon.svg",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var dark=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark)}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Official AI Agent Skills & MCP Server Directory",
              url: BASE,
              description:
                "The largest curated directory of official MCP servers and AI agent skills — 438+ tools from Anthropic, Stripe, Supabase, Cloudflare and 35 providers. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible agent.",
              author: {
                "@type": "Person",
                name: "Vishal Kumar Singh",
                url: "https://vishalvoid.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${BASE}/skills?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
