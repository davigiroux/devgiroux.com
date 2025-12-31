import Image from "next/image";
import Link from "next/link";
import { YouTubeEmbed } from "./youtube-embed";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";

function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-500 hover:text-violet-400 underline decoration-violet-500/30 hover:decoration-violet-400/50 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href || ""}
      className="text-violet-500 hover:text-violet-400 underline decoration-violet-500/30 hover:decoration-violet-400/50 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

function CustomImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;

  return (
    <span className="block my-8">
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={400}
        className="rounded-lg border border-violet-500/20"
      />
    </span>
  );
}

function InlineCode({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="rounded bg-violet-500/10 px-2 py-1 text-base font-mono text-violet-400 border border-violet-500/20"
      {...props}
    >
      {children}
    </code>
  );
}

const headingStyles = {
  1: "text-4xl font-bold mt-16 mb-8 leading-tight",
  2: "text-3xl font-bold mt-14 mb-6 leading-tight",
  3: "text-2xl font-semibold mt-12 mb-5 leading-snug",
  4: "text-xl font-semibold mt-10 mb-4 leading-snug",
  5: "text-lg font-semibold mt-8 mb-3 leading-normal",
  6: "text-md font-semibold mt-6 mb-3 leading-normal",
};

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const HeadingComponent = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const className = `${headingStyles[level]} text-violet-50 scroll-mt-20`;

    switch (level) {
      case 1:
        return (
          <h1 className={className} {...props}>
            {children}
          </h1>
        );
      case 2:
        return (
          <h2 className={className} {...props}>
            {children}
          </h2>
        );
      case 3:
        return (
          <h3 className={className} {...props}>
            {children}
          </h3>
        );
      case 4:
        return (
          <h4 className={className} {...props}>
            {children}
          </h4>
        );
      case 5:
        return (
          <h5 className={className} {...props}>
            {children}
          </h5>
        );
      case 6:
        return (
          <h6 className={className} {...props}>
            {children}
          </h6>
        );
    }
  };

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
};

export const MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  img: CustomImage,
  pre: CodeBlock,
  code: InlineCode,
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-violet-500 pl-6 italic my-8 text-zinc-400 text-lg leading-relaxed"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="space-y-3 my-8 ml-6 text-zinc-300 text-lg leading-relaxed list-disc"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="space-y-3 my-8 ml-6 text-zinc-300 text-lg leading-relaxed list-decimal"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="pl-2" {...props}>
      {children}
    </li>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-6 text-zinc-300 text-lg leading-relaxed" {...props}>
      {children}
    </p>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-12 border-violet-500/20" {...props} />
  ),
  table: ({
    children,
    ...props
  }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse border border-violet-500/20"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-left font-semibold text-violet-50"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border border-violet-500/20 px-4 py-2 text-zinc-300"
      {...props}
    >
      {children}
    </td>
  ),
  YouTubeEmbed,
  Callout,
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-violet-50" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-zinc-300" {...props}>
      {children}
    </em>
  ),
};
