"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { CursorHalo } from "@/components/motion/CursorHalo";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { CommandMenu } from "@/components/command/CommandMenu";
import { KeyboardShortcuts } from "@/components/layout/KeyboardShortcuts";
import { BackToTop } from "@/components/layout/BackToTop";
import { AccentProvider } from "@/components/layout/AccentProvider";
import { PersistentSpotifyPlayer } from "@/components/integrations/PersistentSpotifyPlayer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LenisProvider>
        <AccentProvider />
        {children}
        <CursorSpotlight />
        <CursorHalo />
        <CommandMenu />
        <KeyboardShortcuts />
        <BackToTop />
        <PersistentSpotifyPlayer />
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
