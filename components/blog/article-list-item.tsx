'use client';

import { useLocale } from 'next-intl';
import { formatShortDate, Locale } from '@/lib/i18n';
import { Link } from '@/lib/navigation';

interface ArticleListItemProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

export function ArticleListItem({
  slug,
  title,
  description,
  date,
  tags = [],
}: ArticleListItemProps) {
  const locale = useLocale() as Locale;
  const formattedDate = formatShortDate(date, locale);

  return (
    <Link href={`/blog/${slug}`}>
      <article className="group flex flex-col gap-1 border-b border-border/50 py-6 transition-all duration-200 sm:flex-row sm:items-baseline sm:gap-6 hover:translate-x-1 hover:border-l-2 hover:border-l-primary hover:pl-4">
        {/* Date */}
        <time
          dateTime={date}
          className="shrink-0 font-mono text-sm text-muted-foreground sm:w-32"
        >
          {formattedDate}
        </time>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Tags — hidden on mobile */}
        {tags.length > 0 && (
          <p className="hidden shrink-0 text-xs text-muted-foreground/70 sm:block">
            {tags.slice(0, 2).join(', ')}
          </p>
        )}
      </article>
    </Link>
  );
}
