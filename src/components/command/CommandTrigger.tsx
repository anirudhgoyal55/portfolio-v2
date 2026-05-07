"use client";

import { useEffect, useState } from "react";
import { commandEvent } from "./CommandMenu";

export function CommandTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      onClick={() => commandEvent.dispatch()}
      aria-label="Open command menu"
      className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] lowercase tracking-wide opacity-70 hover:opacity-100 transition-opacity"
    >
      <kbd className="px-1.5 py-0.5 border rounded-sm">
        {isMac ? "⌘" : "ctrl"}
      </kbd>
      <kbd className="px-1.5 py-0.5 border rounded-sm">k</kbd>
    </button>
  );
}
