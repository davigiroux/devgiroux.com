'use client';

import { useTranslations } from 'next-intl';
import { Target, Heart, TrendingUp } from 'lucide-react';

export function Mission() {
  const t = useTranslations('about.mission');

  const values = [
    {
      icon: Target,
      label: t('values.independence.label'),
      description: t('values.independence.description'),
    },
    {
      icon: Heart,
      label: t('values.learning.label'),
      description: t('values.learning.description'),
    },
    {
      icon: TrendingUp,
      label: t('values.growth.label'),
      description: t('values.growth.description'),
    },
  ];

  return (
    <section className="border-b border-border bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('title')}
            </h2>
            <p className="text-lg font-medium text-primary">
              {t('subtitle')}
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-12 rounded-lg border border-primary/20 bg-primary/5 p-8">
            <p className="text-lg leading-relaxed text-foreground">
              {t('content')}
            </p>
          </div>

          {/* Core Values */}
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.label}
                  className="rounded-lg border border-border bg-surface p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {value.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
