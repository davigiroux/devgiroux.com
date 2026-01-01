'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { TagBadge } from './tag-badge';
import { getLocalizedPath, formatShortDate, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

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
  availableLocales = ['en'],
  isFallback = false,
}: ArticleCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('languageBadge');

  const href = getLocalizedPath(`/blog/${slug}`, locale);
  const formattedDate = formatShortDate(date, locale);

  return (
    <Link href={href}>
      <Card className="group overflow-hidden border-border bg-card backdrop-blur transition-all hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10">
        {image && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}

            {/* Language Badges */}
            <div className="ml-auto flex gap-1">
              {availableLocales.map((loc) => (
                <span
                  key={loc}
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-medium",
                    loc === locale && !isFallback
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {loc === 'en' ? t('en') : t('ptBR')}
                </span>
              ))}
            </div>
          </div>

          <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
            {title}
            {isFallback && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({t('unavailable')})
              </span>
            )}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
