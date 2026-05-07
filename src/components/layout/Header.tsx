import Link from "next/link";
import { siteConfig } from "../../../site.config";
import { ThemeToggle } from "./ThemeToggle";
import { CommandTrigger } from "../command/CommandTrigger";
import { MonogramMark } from "./MonogramMark";

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

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] lowercase tracking-wide opacity-65 hover:opacity-100 hover:text-[color:var(--color-accent)] transition-all"
              >
                {item.label.toLowerCase()}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <CommandTrigger />
            <ThemeToggle />
          </div>
        </div>

        {/* mobile nav */}
        <nav
          aria-label="Primary mobile"
          className="md:hidden flex flex-wrap items-center gap-x-5 gap-y-2 pb-3"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] lowercase tracking-wide opacity-65 hover:opacity-100"
            >
              {item.label.toLowerCase()}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
