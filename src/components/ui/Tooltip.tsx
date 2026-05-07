"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

/**
 * Quiet tooltip. Mono caps, hairline border, accent on focus.
 * Wraps Radix Tooltip for accessibility (focus, ARIA, escape, etc.).
 */
export function Tooltip({
  children,
  label,
  side = "top",
  delayDuration = 200,
}: {
  children: ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className="z-50 px-2 py-1 rounded-sm bg-[color:var(--color-foreground)] text-[color:var(--color-background)] font-mono text-[10px] tracking-wide lowercase shadow-md data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0"
          >
            {label}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
