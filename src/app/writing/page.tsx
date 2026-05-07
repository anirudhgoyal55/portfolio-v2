import type { Metadata } from "next";
import { getAllWriting } from "@/lib/content";
import { PostCard } from "@/components/writing/PostCard";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes from each project I ship, technical posts when something I learned would have saved me a day, occasional opinion when I have one I can defend.",
};

export default function WritingIndexPage() {
  const posts = getAllWriting();
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
      <Reveal>
        <p className="eyebrow">writing / {String(posts.length).padStart(2, "0")}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.01em] max-w-3xl">
          Writing
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-lg opacity-80">
          Notes from the work, and the rare opinion.
        </p>
      </Reveal>

      <div className="mt-16">
        {posts.length === 0 ? (
          <p className="font-mono text-sm opacity-60">No posts yet.</p>
        ) : (
          posts.map((p) => <PostCard key={p.slug} post={p} />)
        )}
      </div>
    </div>
  );
}
