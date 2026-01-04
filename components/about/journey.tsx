'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, Building2, Rocket, Code } from 'lucide-react';

export function Journey() {
  const t = useTranslations('about.journey');

  const timelineItems = [
    {
      icon: GraduationCap,
      label: t('timeline.education'),
      key: 'education',
    },
    {
      icon: Building2,
      label: t('timeline.bigCompany'),
      key: 'bigCompany',
    },
    {
      icon: Rocket,
      label: t('timeline.transition'),
      key: 'transition',
    },
    {
      icon: Code,
      label: t('timeline.current'),
      key: 'current',
    },
  ];

  return (
    <section className="border-b border-border bg-surface py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('description')}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.key}
                    className={`relative flex items-center gap-8 ${
                      isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md sm:max-w-[calc(50%-3rem)] ${
                        isEven ? 'sm:text-right sm:mr-12' : 'sm:text-left sm:ml-12'
                      }`}
                    >
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.label}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {t(`content.${item.key}`)}
                      </p>
                    </div>

                    {/* Spacer for desktop layout */}
                    <div className="hidden flex-1 sm:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
