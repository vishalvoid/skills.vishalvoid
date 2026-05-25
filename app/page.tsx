import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallCommand from "@/components/InstallCommand";
import HomeClient from "@/components/HomeClient";
import DirectoryPreview from "@/components/DirectoryPreview";
import { skills } from "@/data/skills";
import { externalSkills } from "@/data/external-skills";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 py-16 flex flex-col gap-16">

        {/* Hero */}
        <section className="flex flex-col gap-6 max-w-xl">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] text-black/30 dark:text-white/25 tracking-widest uppercase">
              28.62° N, 77.37° E
            </p>
            <h1 className="text-2xl font-semibold text-black dark:text-white leading-snug tracking-tight">
              Engineering Patterns,
              <br />
              Ready to Use.
            </h1>
            <p className="text-sm text-black/55 dark:text-white/55 leading-relaxed max-w-sm">
              A curated collection of reusable patterns and architectures for
              building production software — installable in one command.
            </p>
          </div>
          <InstallCommand command="curl -fsSL https://skills.vishalvoid.com/install | bash" />
        </section>

        {/* My patterns */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] text-black/30 dark:text-white/25 tracking-widest uppercase">
              My Patterns
            </p>
            <p className="text-sm text-black/45 dark:text-white/40">
              Installable, production-ready patterns I use across projects.
            </p>
          </div>
          <HomeClient skills={skills} />
        </section>

        {/* Ecosystem directory */}
        <section className="flex flex-col gap-6 border-t border-black/8 dark:border-white/8 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] text-black/30 dark:text-white/25 tracking-widest uppercase">
                Skills Directory
              </p>
              <h2 className="text-lg font-semibold text-black dark:text-white leading-snug">
                Explore the Ecosystem
              </h2>
              <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed max-w-md">
                {externalSkills.length}+ curated skills from Anthropic, React, Next.js, TypeScript,
                and more — each linking to official documentation.
              </p>
            </div>
          </div>

          <DirectoryPreview skills={externalSkills} />
        </section>

      </main>
      <Footer />
    </>
  );
}
