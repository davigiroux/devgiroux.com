'use client';

import { useTranslations } from 'next-intl';

export function Skills() {
  const t = useTranslations('about.skills');

  const skillCategories = [
    { key: 'technical' },
    { key: 'business' },
    { key: 'other' },
  ];

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="max-w-3xl">
          {/* Section label */}
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            TOOLKIT
          </p>
          <div className="mb-12 h-px bg-border animate-draw-line" />

          {/* Skill categories in a 3-column grid */}
          <div className="grid gap-12 sm:grid-cols-3">
            {skillCategories.map((category) => {
              const skills = t.raw(`items.${category.key}`) as string[];
              return (
                <div key={category.key}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
                    {t(`categories.${category.key}`)}
                  </h3>
                  <ul className="space-y-2">
                    {skills.map((skill: string) => (
                      <li
                        key={skill}
                        className="text-sm text-muted-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
