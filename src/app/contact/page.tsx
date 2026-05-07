import type { Metadata } from "next";
import { siteConfig } from "../../../site.config";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to collaborations, freelance engagements, and conversations.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
      <p className="eyebrow">contact</p>
      <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1]">
        Let&rsquo;s talk.
      </h1>
      <p className="mt-4 max-w-xl text-base opacity-80">
        Open to collaborations, freelance engagements, and conversations about
        cricket data, editorial sites, or anything in this portfolio.
      </p>

      <p className="mt-8 font-mono text-sm">
        Or directly at{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="link-underline link-accent"
        >
          {siteConfig.email}
        </a>
      </p>

      <ContactForm />
    </div>
  );
}
