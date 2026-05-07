import type { Metadata } from "next";
import { getAllWork } from "@/lib/content";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects. Personal builds, paid engagements, editorial pitches, and live data dashboards.",
};

export default function WorkIndexPage() {
  const work = getAllWork();
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

      <div className="mt-12">
        {work.map((w, i) => (
          <ProjectCard key={w.slug} work={w} index={i} />
        ))}
      </div>
    </div>
  );
}
