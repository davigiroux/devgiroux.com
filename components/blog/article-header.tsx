'use client';

import Image from 'next/image';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { TagBadge } from './tag-badge';
import { formatDate, getLocalizedPath, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

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
  availableLocales = ['en'],
}: ArticleHeaderProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('languageBadge');
  const formattedDate = formatDate(date, locale);

  return (
    <header className="mb-12">
      {/* Fallback Notice */}
      {isFallback && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-600 dark:text-yellow-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{t('unavailable')} - Showing English version</span>
        </div>
      )}

      <div className="mb-8">
        {/* Language Badges */}
        <div className="mb-4 flex gap-2">
          {availableLocales.map((loc) => (
            <span
              key={loc}
              className={cn(
                "rounded px-2 py-1 text-xs font-medium",
                loc === locale && !isFallback
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {loc === 'en' ? t('en') : t('ptBR')}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formattedDate}</time>
          </div>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                href={getLocalizedPath(`/tag/${encodeURIComponent(tag)}`, locale)}
              />
            ))}
          </div>
        )}
      </div>

      {image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
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
