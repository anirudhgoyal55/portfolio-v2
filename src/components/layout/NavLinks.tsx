"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../../../site.config";

/**
 * Nav links with active-state indicator. A subtle accent dot precedes the
 * label of the current section.
 */
export function NavLinks({
  className = "hidden md:flex items-center gap-7",
  itemClassName = "font-mono text-[11px] lowercase tracking-wide",
}: {
  className?: string;
  itemClassName?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      {siteConfig.nav.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`${itemClassName} relative inline-flex items-center gap-1.5 transition-all ${
              isActive
                ? "text-[color:var(--color-accent)] opacity-100"
                : "opacity-65 hover:opacity-100 hover:text-[color:var(--color-accent)]"
            }`}
          >
            {isActive && (
              <span
                aria-hidden
                className="block w-1 h-1 rounded-full bg-[color:var(--color-accent)]"
              />
            )}
            {item.label.toLowerCase()}
          </Link>
        );
      })}
    </nav>
  );
}
