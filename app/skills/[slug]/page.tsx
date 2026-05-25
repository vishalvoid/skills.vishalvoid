import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { externalSkills, getExternalSkillBySlug, SOURCE_COLORS, DIFFICULTY_COLORS } from "@/data/external-skills";

export function generateStaticParams() {
  return externalSkills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/skills/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const skill = getExternalSkillBySlug(slug);
  if (!skill) return {};
  return {
    title: skill.name,
    description: skill.description,
    openGraph: {
      title: `${skill.name} · skills.vishalvoid.com`,
      description: skill.description,
      url: `https://skills.vishalvoid.com/skills/${skill.slug}`,
    },
  };
}

export default async function ExternalSkillPage({
  params,
}: PageProps<"/skills/[slug]">) {
  const { slug } = await params;
  const skill = getExternalSkillBySlug(slug);
  if (!skill) notFound();

  return (
    <main className="flex-1 max-w-[1100px] mx-auto px-6 py-16 w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-xs text-black/30 dark:text-white/25 mb-10">
        <Link href="/" className="hover:text-black/60 dark:hover:text-white/50 transition-colors">
          skills
        </Link>
        <span>/</span>
        <Link href="/skills" className="hover:text-black/60 dark:hover:text-white/50 transition-colors">
          directory
        </Link>
        <span>/</span>
        <span className="text-black/50 dark:text-white/40">{skill.slug}</span>
      </nav>

      <div className="flex flex-col gap-8 max-w-2xl">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-medium border ${SOURCE_COLORS[skill.source]}`}
            >
              {skill.source}
            </span>
            <span className={`font-mono text-xs ${DIFFICULTY_COLORS[skill.difficulty]}`}>
              {skill.difficulty}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-black dark:text-white leading-tight">
            {skill.name}
          </h1>
          <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-black/40 dark:text-white/35 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 px-2.5 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 pt-2">
          <a
            href={skill.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-mono text-sm px-5 py-3 rounded-md hover:opacity-80 transition-opacity w-fit"
          >
            View on {skill.source}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <p className="font-mono text-xs text-black/30 dark:text-white/25">
            Opens official documentation at{" "}
            <span className="text-black/45 dark:text-white/35">{new URL(skill.sourceUrl).hostname}</span>
          </p>
        </div>

        <hr className="border-black/8 dark:border-white/8" />

        {/* Back links */}
        <div className="flex items-center gap-6">
          <Link
            href="/skills"
            className="font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All skills
          </Link>
          <Link
            href="/"
            className="font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 transition-colors"
          >
            My patterns
          </Link>
        </div>
      </div>
    </main>
  );
}
