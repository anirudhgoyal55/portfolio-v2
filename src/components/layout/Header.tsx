import Link from "next/link";
import { siteConfig } from "../../../site.config";
import { ThemeToggle } from "./ThemeToggle";
import { CommandTrigger } from "../command/CommandTrigger";
import { MonogramMark } from "./MonogramMark";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="hairline-bottom sticky top-0 z-40 backdrop-blur-md bg-[color:var(--color-background)]/80">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="inline-flex items-center transition-transform hover:scale-[1.04]"
          >
            <MonogramMark size={26} />
          </Link>

          <NavLinks />

          <div className="flex items-center gap-4">
            <CommandTrigger />
            <ThemeToggle />
          </div>
        </div>

        {/* mobile nav */}
        <NavLinks
          className="md:hidden flex flex-wrap items-center gap-x-5 gap-y-2 pb-3"
          itemClassName="font-mono text-[11px] lowercase tracking-wide"
        />
      </div>
    </header>
  );
}
