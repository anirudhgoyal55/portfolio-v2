import type { Metadata } from "next";
import { getAllWork, type Work } from "@/lib/content";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects. Personal builds, paid engagements, editorial pitches, and live data dashboards.",
};

export default function WorkIndexPage() {
  const work = getAllWork();

  // Group by year for visual separators in the list, preserving sort order
  const groups: Array<{ year: number; items: Work[] }> = [];
  for (const item of work) {
    const last = groups[groups.length - 1];
    if (last && last.year === item.frontmatter.year) {
      last.items.push(item);
    } else {
      groups.push({ year: item.frontmatter.year, items: [item] });
    }
  }

  let runningIndex = 0;

  return (
    <div className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-20">
      <Reveal>
        <p className="eyebrow">work / {String(work.length).padStart(2, "0")}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em] max-w-2xl">
          Selected work
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-base opacity-80">
          A running list of what I&rsquo;ve shipped. Personal projects, paid engagements, editorial pitches.
        </p>
      </Reveal>

      <div className="mt-12 space-y-8">
        {groups.map((group) => (
          <section key={group.year}>
            <h2
              aria-label={`Year ${group.year}`}
              className="font-mono text-[11px] lowercase tracking-widest opacity-50 mb-2"
            >
              {group.year}
            </h2>
            <div>
              {group.items.map((w) => {
                const idx = runningIndex++;
                return <ProjectCard key={w.slug} work={w} index={idx} />;
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
