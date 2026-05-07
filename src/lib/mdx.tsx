/**
 * Shared MDX components used by all rendered MDX bodies (work, writing, now, uses).
 */

import type { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";

function MdxLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

function MdxImage(props: ComponentProps<"img">) {
  const { src = "", alt = "", width, height } = props;
  if (typeof src !== "string") return null;
  return (
    <span className="block my-8">
      <Image
        src={src}
        alt={alt}
        width={typeof width === "number" ? width : 1200}
        height={typeof height === "number" ? height : 800}
        className="w-full h-auto rounded-sm"
      />
      {alt && (
        <span className="eyebrow block mt-2 text-center">{alt}</span>
      )}
    </span>
  );
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
};
