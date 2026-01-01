'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLocalizedPath, Locale } from '@/lib/i18n';

export function Hero() {
  const locale = useLocale() as Locale;
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-surface">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:32px_32px]" />

      <div className="container relative mx-auto px-4 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
            <Sparkles className="h-4 w-4" />
            <span>{t('badge')}</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t('title1')}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              {t('title2')}
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              <Link href={getLocalizedPath('/blog', locale)}>
                {t('exploreArticles')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/20 hover:border-primary/50 hover:bg-primary/10"
            >
              <Link href="#latest">
                {t('latestPosts')}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-12">
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="mt-1 text-sm text-muted-foreground">{t('articles')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="mt-1 text-sm text-muted-foreground">{t('topics')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1k+</div>
              <div className="mt-1 text-sm text-muted-foreground">{t('readers')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
