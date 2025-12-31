"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { siteConfig } from "@/lib/config"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const openSearch = React.useCallback(() => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
    })
    document.dispatchEvent(event)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl font-semibold transition-colors hover:text-primary"
        >
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-light transition-colors hover:text-primary",
                pathname === item.href
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
                href={item.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-light transition-colors hover:bg-surface-hover",
                  pathname === item.href
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
