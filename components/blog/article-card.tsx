'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { formatShortDate, Locale } from '@/lib/i18n';
import { Link } from '@/lib/navigation';

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags?: string[];
  image?: string;
  availableLocales?: Locale[];
  isFallback?: boolean;
}

export function ArticleCard({
  slug,
  title,
  description,
  date,
  readingTime,
  tags = [],
  image,
  isFallback = false,
}: ArticleCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('languageBadge');

  const formattedDate = formatShortDate(date, locale);

  return (
    <Link href={`/blog/${slug}`}>
      <article className="group">
        {image && (
          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-[filter] duration-300 group-hover:brightness-110"
            />
          </div>
        )}

        {/* Tags as plain text */}
        {tags.length > 0 && (
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            {tags.slice(0, 3).join(', ')}
          </p>
        )}

        {/* Title with underline hover */}
        <h3 className="mb-2 font-display text-xl font-bold text-foreground decoration-primary underline-offset-4 transition-all group-hover:underline">
          {title}
          {isFallback && (
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              ({t('en')})
            </span>
          )}
        </h3>

        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{description}</p>

        {/* Metadata — plain text, no icons */}
        <p className="font-mono text-xs text-muted-foreground/70">
          <time dateTime={date}>{formattedDate}</time>
          <span className="mx-2">&mdash;</span>
          <span>{readingTime}</span>
        </p>
      </article>
    </Link>
  );
}
