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
    default: "skills · vishalvoid",
    template: "%s · skills.vishalvoid.com",
  },

  description:
    "Reusable engineering patterns by Vishal Kumar Singh — installable, documented, production-ready. Browse 70+ curated skills from React, Next.js, TypeScript, Anthropic, OpenAI, and more.",

  keywords: [
    "engineering patterns",
    "react patterns",
    "nextjs architecture",
    "typescript patterns",
    "software architecture",
    "web development skills",
    "claude api",
    "openai api",
    "tanstack query",
    "prisma",
    "tailwind css",
    "coding patterns",
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
    title: "Engineering Patterns, Ready to Use. — skills.vishalvoid.com",
    description:
      "Reusable engineering patterns by Vishal Kumar Singh — installable, documented, production-ready.",
  },

  twitter: {
    card: "summary_large_image",
    title: "skills · vishalvoid",
    description:
      "Reusable engineering patterns by Vishal Kumar Singh — installable, documented, production-ready.",
    creator: "@vishalvoid",
    site: "@vishalvoid",
  },

  alternates: {
    canonical: BASE,
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
      </head>
      <body>{children}</body>
    </html>
  );
}
