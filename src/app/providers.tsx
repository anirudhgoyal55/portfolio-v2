"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { CursorHalo } from "@/components/motion/CursorHalo";
import { CommandMenu } from "@/components/command/CommandMenu";
import { KeyboardShortcuts } from "@/components/layout/KeyboardShortcuts";
import { BackToTop } from "@/components/layout/BackToTop";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LenisProvider>
        {children}
        <CursorHalo />
        <CommandMenu />
        <KeyboardShortcuts />
        <BackToTop />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              borderRadius: "2px",
            },
          }}
        />
      </LenisProvider>
    </ThemeProvider>
  );
}
