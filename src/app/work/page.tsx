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
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
      <Reveal>
        <p className="eyebrow">work / {String(work.length).padStart(2, "0")}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.01em] max-w-3xl">
          Selected work
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-lg opacity-80">
          A running list of what I've shipped. Personal projects, paid engagements, editorial pitches.
        </p>
      </Reveal>

      <div className="mt-16">
        {work.map((w, i) => (
          <ProjectCard key={w.slug} work={w} index={i} />
        ))}
      </div>
    </div>
  );
}
