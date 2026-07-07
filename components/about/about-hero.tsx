'use client';

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

export function AboutHero() {
  const t = useTranslations('about.hero');

  const socialLinks = [
    { name: 'GitHub', url: siteConfig.links.github },
    { name: 'Twitter', url: siteConfig.links.twitter },
    { name: 'Instagram', url: siteConfig.links.instagram },
    { name: 'YouTube', url: siteConfig.links.youtube },
    { name: 'LinkedIn', url: siteConfig.links.linkedin },
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="max-w-3xl">
          {/* Small caps label */}
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground animate-reveal-up">
            ABOUT
          </p>

          {/* Display font greeting */}
          <h1 className="mb-4 font-display text-5xl font-bold leading-[1.05] text-foreground animate-text-reveal lg:text-7xl">
            {t('greeting')}
          </h1>

          {/* Tagline */}
          <p className="mb-8 text-lg font-medium text-primary animate-reveal-up" style={{ animationDelay: '150ms' }}>
            {t('tagline')}
          </p>

          {/* Description */}
          <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground animate-reveal-up" style={{ animationDelay: '300ms' }}>
            {t('description')}
          </p>

          {/* Social links as inline text */}
          <p className="text-sm text-muted-foreground animate-reveal-up" style={{ animationDelay: '450ms' }}>
            Find me on{' '}
            {socialLinks.map((link, i) => (
              <span key={link.name}>
                {i > 0 && i < socialLinks.length - 1 && ', '}
                {i === socialLinks.length - 1 && ', and '}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </a>
              </span>
            ))}
            .
          </p>
        </div>
      </div>
    </section>
  );
}
