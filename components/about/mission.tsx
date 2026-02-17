'use client';

import { useTranslations } from 'next-intl';

export function Mission() {
  const t = useTranslations('about.mission');

  const values = [
    { key: 'independence', number: '01' },
    { key: 'learning', number: '02' },
    { key: 'growth', number: '03' },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="max-w-3xl">
          {/* Section label */}
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            MISSION
          </p>
          <div className="mb-12 h-px bg-border animate-draw-line" />

          {/* Mission statement as pull-quote */}
          <blockquote className="mb-16 border-l-4 border-accent-warm pl-8">
            <p className="text-2xl font-light leading-relaxed text-foreground lg:text-3xl">
              {t('content')}
            </p>
          </blockquote>

          {/* Values as numbered list */}
          <h3 className="mb-8 text-xl font-semibold text-foreground">
            {t('subtitle')}
          </h3>

          <div className="space-y-6">
            {values.map((value) => (
              <div key={value.key} className="flex gap-4">
                <span className="shrink-0 font-mono text-sm text-primary">
                  {value.number}
                </span>
                <div>
                  <p className="font-semibold text-foreground">
                    {t(`values.${value.key}.label`)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`values.${value.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
