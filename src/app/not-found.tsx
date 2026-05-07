import Link from "next/link";
import { siteConfig } from "../../site.config";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 md:px-10 py-24 text-center">
      <p className="eyebrow opacity-60">404</p>
      <h1 className="mt-3 font-serif italic text-4xl md:text-5xl">
        Lost your way.
      </h1>
      <p className="mt-5 max-w-md mx-auto opacity-80 text-base">
        Nothing at this address. Try one of the routes below or head home.
      </p>

      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <li>
          <Link href="/" className="link-underline text-sm">Home</Link>
        </li>
        {siteConfig.nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-underline text-sm">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
