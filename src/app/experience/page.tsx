import type { Metadata } from "next";
import { getAllExperience } from "@/lib/content";
import { MDXContent } from "@/components/content/MDXContent";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Experience",
  description: "A timeline of roles, engagements, and what shipped at each.",
};

function fmt(date: string): string {
  if (!date || date === "present") return "Present";
  const d = new Date(date.length === 7 ? `${date}-01` : date);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(d);
}

export default function ExperiencePage() {
  const items = getAllExperience();

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
      <Reveal>
        <p className="eyebrow">experience / {String(items.length).padStart(2, "0")}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em] max-w-2xl">
          Experience
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-base opacity-80">
          The roles, engagements, and partnerships behind the work.
        </p>
      </Reveal>

      <div className="mt-12">
        {items.length === 0 ? (
          <p className="font-mono text-sm opacity-60">
            No entries yet. Add MDX files to{" "}
            <code className="opacity-80">content/experience/</code>.
          </p>
        ) : (
          <ol className="space-y-10">
            {items.map((e) => (
              <li key={e.slug} className="hairline-bottom pb-10 last:border-b-0">
                <div className="grid grid-cols-12 items-baseline gap-4">
                  <p className="col-span-12 sm:col-span-3 font-mono text-[11px] opacity-60">
                    {fmt(e.frontmatter.startDate)} —{" "}
                    {fmt(e.frontmatter.endDate)}
                    {e.frontmatter.location ? (
                      <span className="block opacity-80 mt-0.5">
                        {e.frontmatter.location}
                      </span>
                    ) : null}
                  </p>
                  <div className="col-span-12 sm:col-span-9">
                    <h2 className="font-serif text-xl sm:text-2xl leading-tight">
                      {e.frontmatter.role}
                      <span className="opacity-50">
                        {" · "}
                        {e.frontmatter.url ? (
                          <a
                            href={e.frontmatter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[color:var(--color-accent)] transition-colors"
                          >
                            {e.frontmatter.company}
                          </a>
                        ) : (
                          e.frontmatter.company
                        )}
                      </span>
                    </h2>
                    {e.body.trim() && (
                      <div className="prose mt-3 text-sm">
                        <MDXContent source={e.body} />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
