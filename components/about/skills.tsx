'use client';

import { useTranslations } from 'next-intl';
import { Code, Briefcase, Lightbulb } from 'lucide-react';

export function Skills() {
  const t = useTranslations('about.skills');

  const skillCategories = [
    {
      key: 'technical',
      icon: Code,
      skills: t.raw('items.technical') as string[],
    },
    {
      key: 'business',
      icon: Briefcase,
      skills: t.raw('items.business') as string[],
    },
    {
      key: 'other',
      icon: Lightbulb,
      skills: t.raw('items.other') as string[],
    },
  ];

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('title')}
            </h2>
          </div>

          {/* Skill Categories */}
          <div className="space-y-8">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.key} className="rounded-lg border border-border bg-background p-6">
                  {/* Category Header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(`categories.${category.key}`)}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
