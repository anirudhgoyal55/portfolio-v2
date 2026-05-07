import { ThemeToggle } from "./ThemeToggle";
import { CommandTrigger } from "../command/CommandTrigger";
import { NavLinks } from "./NavLinks";

/**
 * Desktop header: nav links + theme toggle + Cmd+K hint. No logo.
 * Hidden on mobile entirely; mobile uses <BottomNav />.
 */
export function Header() {
  return (
    <header className="hairline-bottom sticky top-0 z-40 hidden md:block backdrop-blur-md bg-[color:var(--color-background)]/80">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="flex items-center justify-between h-12">
          <NavLinks />
          <div className="flex items-center gap-4">
            <CommandTrigger />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
