import { Link } from '@/lib/navigation';

interface TagBadgeProps {
  tag: string;
  count?: number;
  href?: string;
  onClick?: () => void;
}

export function TagBadge({ tag, count, href, onClick }: TagBadgeProps) {
  const content = (
    <>
      {count !== undefined && (
        <span className="mr-1 font-mono text-primary/50">({count})</span>
      )}
      {tag}
    </>
  );

  const className = "text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary";

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} type="button" className={className}>
        {content}
      </button>
    );
  }

  return <span className="text-xs uppercase tracking-wide text-muted-foreground">{content}</span>;
}
