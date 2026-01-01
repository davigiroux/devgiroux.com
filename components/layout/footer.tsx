'use client';

import Link from "next/link"
import { useLocale, useTranslations } from 'next-intl'
import { Github, Twitter, Instagram, Youtube, Rss } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { getLocalizedPath, Locale } from "@/lib/i18n"

const socialLinks = [
  { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
  { href: siteConfig.links.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.links.youtube, icon: Youtube, label: "YouTube" },
  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
]

export function Footer() {
  const locale = useLocale() as Locale
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  // RSS feed URL based on locale
  const feedUrl = locale === 'pt-BR' ? '/pt-br/feed.xml' : '/feed.xml'

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link
              href={getLocalizedPath('/', locale)}
              className="text-lg font-semibold transition-colors hover:text-primary"
            >
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {siteConfig.author.name}. {t('copyright')}.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
            <Link
              href={feedUrl}
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="RSS Feed"
            >
              <Rss className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
