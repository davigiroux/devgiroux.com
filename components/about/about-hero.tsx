'use client';

import { useTranslations } from 'next-intl';
import { User, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function AboutHero() {
  const t = useTranslations('about.hero');

  const socialLinks = [
    { name: 'GitHub', url: siteConfig.links.github },
    { name: 'Twitter', url: siteConfig.links.twitter },
    { name: 'Instagram', url: siteConfig.links.instagram },
    { name: 'YouTube', url: siteConfig.links.youtube },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-surface">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:32px_32px]" />

      <div className="container relative mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Avatar placeholder */}
          <div className="mb-8 inline-flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/20 bg-primary/10 backdrop-blur">
            <User className="h-16 w-16 text-primary" />
          </div>

          {/* Greeting */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('greeting')}
          </h1>

          {/* Tagline */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
            <Sparkles className="h-4 w-4" />
            <span>{t('tagline')}</span>
          </div>

          {/* Current status */}
          <p className="mb-6 text-lg text-muted-foreground">
            <span className="font-semibold text-primary">{t('currentStatus')}</span>
          </p>

          {/* Description */}
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t('description')}
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
