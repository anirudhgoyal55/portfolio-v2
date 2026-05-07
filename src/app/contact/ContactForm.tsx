"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { sendMessage } from "./actions";

const schema = z.object({
  name: z.string().min(1, "Name required").max(100),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Tell me a bit more").max(2000),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("name", data.name);
      fd.set("email", data.email);
      fd.set("message", data.message);
      if (data.honeypot) fd.set("honeypot", data.honeypot);

      const res = await sendMessage(fd);
      if (res.ok) {
        toast.success("Message sent. I'll write back soon.");
        reset();
        setDone(true);
      } else {
        toast.error(res.error ?? "Could not send. Email me directly?");
      }
    });
  };

  if (done) {
    return (
      <div className="mt-10 hairline pt-8">
        <p className="font-serif text-xl">Thanks. I'll write back soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 max-w-lg space-y-5">
      {/* Honeypot — hidden from real users, catches bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("honeypot")}
      />

      <div>
        <label
          htmlFor="name"
          className="eyebrow block mb-1.5"
        >
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
        disabled={pending}
        className="font-mono text-[12px] lowercase tracking-wide px-5 py-2.5 border border-current hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-paper)] hover:border-[color:var(--color-accent)] transition-all disabled:opacity-50 disabled:cursor-wait"
      >
        {pending ? "sending…" : "send message →"}
      </button>
    </form>
  );
}
