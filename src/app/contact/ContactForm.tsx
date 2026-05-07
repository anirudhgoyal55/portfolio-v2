"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { siteConfig } from "../../../site.config";

const schema = z.object({
  name: z.string().min(1, "Name required").max(100),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Tell me a bit more").max(2000),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

/**
 * Contact form. On submit, opens the user's mail client with the message
 * pre-filled. Static-export friendly (no server action).
 *
 * To wire real email/Telegram delivery, redeploy on a host with server
 * functions (Vercel, Workers Paid, etc.) and reintroduce server actions.
 */
export function ContactForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    if (data.honeypot) {
      setDone(true);
      return;
    }
    const subject = encodeURIComponent(`Portfolio: ${data.name}`);
    const body = encodeURIComponent(
      `From: ${data.name} <${data.email}>\n\n${data.message}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-10 hairline pt-8">
        <p className="font-serif text-xl">Thanks. I&rsquo;ll write back soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 max-w-lg space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("honeypot")}
      />

      <div>
        <label htmlFor="name" className="eyebrow block mb-1.5">
          name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full bg-transparent border-b py-2 focus:border-[color:var(--color-accent)] focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-[color:var(--color-accent)]">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="eyebrow block mb-1.5">
          email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full bg-transparent border-b py-2 focus:border-[color:var(--color-accent)] focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-[color:var(--color-accent)]">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block mb-1.5">
          message
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className="w-full bg-transparent border-b py-2 focus:border-[color:var(--color-accent)] focus:outline-none resize-y"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-[color:var(--color-accent)]">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="font-mono text-[12px] lowercase tracking-wide px-5 py-2.5 border border-current hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-paper)] hover:border-[color:var(--color-accent)] transition-all active:scale-[0.97]"
      >
        send message →
      </button>
    </form>
  );
}
