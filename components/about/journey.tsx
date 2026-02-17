'use client';

import { useTranslations } from 'next-intl';

export function Journey() {
  const t = useTranslations('about.journey');

  const milestones = [
    { key: 'education', label: t('timeline.education') },
    { key: 'bigCompany', label: t('timeline.bigCompany') },
    { key: 'transition', label: t('timeline.transition') },
    { key: 'current', label: t('timeline.current') },
  ];

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="max-w-3xl">
          {/* Section label */}
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            THE JOURNEY
          </p>
          <div className="mb-8 h-px bg-border animate-draw-line" />

          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="mb-12 text-muted-foreground">
            {t('description')}
          </p>

          {/* Milestones — year markers + prose */}
          <div className="space-y-0">
            {milestones.map((item) => (
              <div
                key={item.key}
                className="flex flex-col gap-2 border-b border-border/50 py-8 last:border-b-0 sm:flex-row sm:gap-6"
              >
                {/* Year/period marker */}
                <div className="shrink-0 sm:w-48">
                  <span className="font-mono text-sm font-medium text-primary">
                    {item.label}
                  </span>
                </div>

                {/* Description */}
                <p className="flex-1 leading-relaxed text-muted-foreground">
                  {t(`content.${item.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
