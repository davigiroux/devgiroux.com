"use client"

import * as React from "react"
import { Menu, X, Search, Globe } from "lucide-react"
import { useLocale, useTranslations } from 'next-intl'
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
import { Link, usePathname, useRouter } from "@/lib/navigation"
import { Locale } from "@/lib/i18n"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale() as Locale
  const t = useTranslations('nav')
  const tLang = useTranslations('language')

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { openSearch } = useSearch()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/projects", label: t("projects") },
  ]

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background transition-[border-color] duration-300",
        isScrolled ? "border-b border-border" : "border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* Logo — display font, period in primary */}
        <Link
          href="/"
          className="font-display text-lg font-bold text-foreground transition-colors hover:opacity-80"
        >
          DevGiroux<span className="text-primary">.</span>
        </Link>

        {/* Desktop Navigation — editorial style */}
        <nav className="hidden items-center md:flex">
          {navItems.map((item, i) => (
            <React.Fragment key={item.href}>
              {i > 0 && (
                <span className="mx-3 text-border select-none">|</span>
              )}
              <Link
                href={item.href}
                className={cn(
                  "text-sm uppercase tracking-wide transition-colors",
                  isActive(item.href)
                    ? "font-medium text-foreground"
                    : "font-light text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop Utility — smaller, tighter */}
        <div className="hidden items-center gap-1 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 transition-colors hover:bg-surface-hover"
            onClick={openSearch}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="sr-only">Search</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-colors hover:bg-surface-hover"
              >
                <Globe className="h-3.5 w-3.5" />
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
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={openSearch}
          >
            <Search className="h-3.5 w-3.5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Globe className="h-3.5 w-3.5" />
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
            className="h-8 w-8"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu — editorial style */}
      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-4 stagger-children">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "animate-reveal-up py-2 text-sm uppercase tracking-wide transition-colors",
                  isActive(item.href)
                    ? "font-medium text-foreground"
                    : "font-light text-muted-foreground"
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
