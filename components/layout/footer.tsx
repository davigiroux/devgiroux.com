'use client';

import { useLocale, useTranslations } from 'next-intl'
import { siteConfig } from "@/lib/config"
import { Link } from "@/lib/navigation"
import { Locale } from "@/lib/i18n"

const socialLinks = [
  { href: siteConfig.links.twitter, label: "Twitter" },
  { href: siteConfig.links.instagram, label: "Instagram" },
  { href: siteConfig.links.youtube, label: "YouTube" },
  { href: siteConfig.links.github, label: "GitHub" },
  { href: siteConfig.links.linkedin, label: "LinkedIn" },
]

export function Footer() {
  const locale = useLocale() as Locale
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  const feedUrl = locale === 'pt-BR' ? '/pt-br/feed.xml' : '/feed.xml'

  return (
    <footer className="mt-auto">
      {/* Fading divider */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="h-px bg-gradient-to-r from-border to-transparent" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 md:items-start">
          {/* Site name + tagline */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <Link
              href="/"
              className="font-display text-lg font-bold text-foreground transition-opacity hover:opacity-80"
            >
              DevGiroux<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('tagline')}
            </p>
          </div>

          {/* Social links as plain text with slashes */}
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm md:justify-start">
            {socialLinks.map((link, i) => (
              <span key={link.label} className="inline-flex items-center">
                {i > 0 && (
                  <span className="mx-1.5 text-muted-foreground/30 select-none">/</span>
                )}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </span>
            ))}
            <span className="mx-1.5 text-muted-foreground/30 select-none">/</span>
            <Link
              href={feedUrl}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              RSS
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60">
            &copy; {currentYear} {siteConfig.author.name}. {t('copyright')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
