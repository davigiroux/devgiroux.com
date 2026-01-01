"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X, Search, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import { siteConfig } from "@/lib/config"
import { useSearch } from "@/components/search"
import { getLocalizedPath, stripLocaleFromPath, Locale } from "@/lib/i18n"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale() as Locale
  const t = useTranslations('nav')
  const tLang = useTranslations('language')

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { openSearch } = useSearch()

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/blog", label: t("blog") },
  ]

  // Switch language while staying on same page
  const switchLocale = (newLocale: Locale) => {
    const { path } = stripLocaleFromPath(pathname)
    const newPath = getLocalizedPath(path, newLocale)
    router.push(newPath)
  }

  // Get localized href
  const getHref = (path: string) => getLocalizedPath(path, locale)

  // Check if path is active
  const isActive = (path: string) => {
    const { path: currentPath } = stripLocaleFromPath(pathname)
    return currentPath === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link
          href={getHref("/")}
          className="flex items-center space-x-2 text-xl font-semibold transition-colors hover:text-primary"
        >
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={getHref(item.href)}
              className={cn(
                "px-4 py-2 text-sm font-light transition-colors hover:text-primary",
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 transition-colors hover:bg-surface-hover"
            onClick={openSearch}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 transition-colors hover:bg-surface-hover"
              >
                <Globe className="h-4 w-4" />
                <span className="sr-only">{tLang('switch')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => switchLocale('en')}
                className={cn(locale === 'en' && 'bg-primary/10')}
              >
                {tLang('en')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchLocale('pt-BR')}
                className={cn(locale === 'pt-BR' && 'bg-primary/10')}
              >
                {tLang('ptBR')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={openSearch}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Mobile Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => switchLocale('en')}
                className={cn(locale === 'en' && 'bg-primary/10')}
              >
                {tLang('en')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchLocale('pt-BR')}
                className={cn(locale === 'pt-BR' && 'bg-primary/10')}
              >
                {tLang('ptBR')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex flex-col space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getHref(item.href)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-light transition-colors hover:bg-surface-hover",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
