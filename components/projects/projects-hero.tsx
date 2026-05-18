'use client';

import { useTranslations } from 'next-intl';

export function ProjectsHero() {
  const t = useTranslations('projects.hero');

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground animate-reveal-up">
            {t('label')}
          </p>

          <h1 className="mb-4 font-display text-5xl font-bold leading-[1.05] text-foreground animate-text-reveal lg:text-7xl">
            {t('title')}
          </h1>

          <p className="mb-8 text-lg font-medium text-primary animate-reveal-up" style={{ animationDelay: '150ms' }}>
            {t('tagline')}
          </p>

          <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground animate-reveal-up" style={{ animationDelay: '300ms' }}>
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
}
