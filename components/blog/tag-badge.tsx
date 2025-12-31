import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface TagBadgeProps {
  tag: string;
  count?: number;
  variant?: 'default' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
}

export function TagBadge({ tag, count, variant = 'secondary', href, onClick }: TagBadgeProps) {
  const badgeContent = (
    <>
      {tag}
      {count !== undefined && <span className="ml-1 text-xs opacity-70">({count})</span>}
    </>
  );

  const badgeClasses = "transition-colors hover:bg-primary/20 hover:border-primary/50";

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        <Badge variant={variant} className={badgeClasses}>
          {badgeContent}
        </Badge>
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} type="button">
        <Badge variant={variant} className={badgeClasses}>
          {badgeContent}
        </Badge>
      </button>
    );
  }

  return <Badge variant={variant}>{badgeContent}</Badge>;
}
