import Link from "next/link";
import { siteConfig } from "../../site.config";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-32 text-center">
      <p className="eyebrow opacity-60">404</p>
      <h1 className="mt-4 font-serif italic text-6xl md:text-7xl">
        Lost your way.
      </h1>
      <p className="mt-6 max-w-md mx-auto opacity-80">
        Nothing at this address. Try one of the routes below or head home.
      </p>

      <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <li>
          <Link href="/" className="link-underline">Home</Link>
        </li>
        {siteConfig.nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
