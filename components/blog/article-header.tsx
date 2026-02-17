'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate, getLocalizedPath, Locale } from '@/lib/i18n';
import { Link } from '@/lib/navigation';

interface ArticleHeaderProps {
  title: string;
  date: string;
  readingTime: string;
  author?: string;
  tags?: string[];
  image?: string;
  isFallback?: boolean;
  availableLocales?: Locale[];
}

export function ArticleHeader({
  title,
  date,
  readingTime,
  author = 'Davi Giroux',
  tags = [],
  image,
  isFallback = false,
}: ArticleHeaderProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('languageBadge');
  const formattedDate = formatDate(date, locale);

  return (
    <header className="mb-12">
      {/* Fallback notice — subtle italic */}
      {isFallback && (
        <p className="mb-6 text-sm italic text-muted-foreground">
          {t('unavailable')} — Showing English version
        </p>
      )}

      {/* Title — display font */}
      <h1 className="mb-6 font-display text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      {/* Metadata — plain text with en-dashes, no icons */}
      <p className="text-sm font-light text-muted-foreground">
        {author}
        <span className="mx-2">&mdash;</span>
        <time dateTime={date}>{formattedDate}</time>
        <span className="mx-2">&mdash;</span>
        {readingTime}
      </p>

      {/* Tags — plain comma-separated text */}
      {tags.length > 0 && (
        <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
          {tags.map((tag, i) => (
            <span key={tag}>
              {i > 0 && ', '}
              <Link
                href={getLocalizedPath(`/tag/${encodeURIComponent(tag)}`, locale)}
                className="transition-colors hover:text-primary"
              >
                {tag}
              </Link>
            </span>
          ))}
        </p>
      )}

      {/* Cover image */}
      {image && (
        <div className="relative mt-10 mb-12 aspect-video w-full overflow-hidden rounded-lg animate-image-enter">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
