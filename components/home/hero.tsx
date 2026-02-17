'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="py-32 lg:py-48">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Small caps label */}
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground animate-reveal-up">
          DEVGIROUX.
        </p>

        {/* Display heading */}
        <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-7xl lg:text-8xl">
          <span className="block text-foreground animate-text-reveal">
            {t('title1')}
          </span>
          <span className="block text-primary animate-text-reveal" style={{ animationDelay: '150ms' }}>
            {t('title2')}
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground animate-reveal-up" style={{ animationDelay: '300ms' }}>
          {t('description')}
        </p>

        {/* Single text link CTA */}
        <div className="mt-8 animate-reveal-up" style={{ animationDelay: '450ms' }}>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary transition-colors hover:text-primary/80"
          >
            {t('readBlog')}
            <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
