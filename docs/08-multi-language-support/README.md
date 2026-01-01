# Multi-Language Support Specification

This document defines the complete internationalization (i18n) implementation for the devgiroux blog, supporting English and Brazilian Portuguese.

---

## Overview

| Aspect | Decision |
|--------|----------|
| Supported Languages | English (en), Brazilian Portuguese (pt-BR) |
| Primary Language | English |
| i18n Library | next-intl |
| Extensibility | Optimized for two languages |

> **Note:** The Portuguese variant used throughout this site is **Brazilian Portuguese (pt-BR)**, not European Portuguese (pt-PT). This affects spelling, vocabulary, and date formatting conventions.

---

## URL Structure

### Routing Strategy

- **English (primary):** No prefix — served at root `/`
- **Brazilian Portuguese:** Prefixed with `/pt-br/`

```
English:  /blog/building-this-blog
Portuguese: /pt-br/blog/building-this-blog
```

### Slug Handling

Slugs remain **identical across languages**. The same slug is used regardless of language:

```
/blog/my-article        → English version
/pt-br/blog/my-article  → Brazilian Portuguese version
```

### Invalid Locale Handling

If a user requests an unsupported locale prefix (e.g., `/es/`, `/fr/`), redirect to the **English equivalent** of the requested path.

---

## Language Detection & Persistence

### First-Time Visitors

1. Read `Accept-Language` header from browser
2. If Portuguese (`pt`, `pt-BR`) is preferred, redirect to `/pt-br/`
3. Otherwise, serve English at root `/`

> **Note:** European Portuguese (`pt-PT`) users will also be served Brazilian Portuguese content, as the differences are minor for a technical blog.

### Returning Visitors

- Store language preference in an **HttpOnly cookie** with 1-year expiration
- Cookie takes precedence over browser detection on subsequent visits

### Cookie Specification

```
Name: locale
Value: "en" | "pt-BR"
HttpOnly: true
Secure: true (in production)
SameSite: Lax
Max-Age: 31536000 (1 year)
Path: /
```

---

## Content Management

### File Structure

Use **separate MDX files** per language with a naming convention:

```
content/posts/
├── building-this-blog.en.mdx
├── building-this-blog.pt-BR.mdx
├── welcome.en.mdx
├── welcome.pt-BR.mdx
└── code-examples.en.mdx          ← No Portuguese version yet
```

### Frontmatter Schema

```yaml
---
title: "Building This Blog"
description: "A deep dive into the tech stack..."
date: "2025-01-15"
tags: ["nextjs", "mdx", "tutorial"]
lang: "en"                    # Required: "en" | "pt-BR"
---
```

**Note:** Metadata like `date`, `tags`, and `author` are **shared** across translations. Only `title`, `description`, and content differ.

### Translation Fallback

When a Portuguese translation does not exist:

- **Behavior:** Display the English version
- **No placeholder or stub** — content simply falls back to English
- The language switcher should indicate the translation is unavailable

### Code Blocks

Code blocks remain **in English** regardless of article language:
- Variable names stay in English
- Comments stay in English
- This follows universal developer conventions

---

## UI Translation

### Translation Files

Use JSON translation files for static UI copy:

```
locales/
├── en.json
└── pt-BR.json
```

### Structure Example

```json
// en.json
{
  "nav": {
    "home": "Home",
    "blog": "Blog",
    "about": "About"
  },
  "search": {
    "placeholder": "Search articles...",
    "noResults": "No articles found"
  },
  "article": {
    "readingTime": "{minutes} min read",
    "publishedOn": "Published on {date}",
    "shareArticle": "Share this article"
  },
  "errors": {
    "notFound": "Page not found",
    "notFoundDescription": "The page you're looking for doesn't exist."
  },
  "footer": {
    "copyright": "All rights reserved"
  }
}
```

```json
// pt-BR.json
{
  "nav": {
    "home": "Início",
    "blog": "Blog",
    "about": "Sobre"
  },
  "search": {
    "placeholder": "Buscar artigos...",
    "noResults": "Nenhum artigo encontrado"
  },
  "article": {
    "readingTime": "{minutes} min de leitura",
    "publishedOn": "Publicado em {date}",
    "shareArticle": "Compartilhar artigo"
  },
  "errors": {
    "notFound": "Página não encontrada",
    "notFoundDescription": "A página que você procura não existe."
  },
  "footer": {
    "copyright": "Todos os direitos reservados"
  }
}
```

---

## UI/UX Components

### Language Switcher

**Location:** Header navigation bar

**Display:** Language codes (`EN` / `PT-BR`) or flags

**Behavior:**
1. Clicking switches to the same page in the other language
2. If translation exists → navigate to translated version
3. If translation doesn't exist → navigate but show fallback English content
4. Updates the locale cookie

### Translation Availability Badges

**Location:** Article cards on listing pages

**Display:** Small badge or icon indicating available languages

```
┌──────────────────────────────────┐
│ Building This Blog               │
│ A deep dive into...              │
│                                  │
│ Jan 15, 2025    [EN] [PT-BR]     │ ← Language badges
└──────────────────────────────────┘
```

### Error Pages

Error pages (404, 500) are **fully localized** in the current language.

---

## Date & Number Formatting

### Full Localization

Dates follow locale conventions:

| English | Portuguese |
|---------|------------|
| December 31, 2025 | 31 de dezembro de 2025 |
| Jan 15, 2025 | 15 jan. 2025 |

Use `next-intl`'s formatting utilities:

```tsx
const formattedDate = format(date, 'MMMM d, yyyy', { locale: currentLocale });
```

### Reading Time

Reading time is calculated from the **English version** only for consistency across languages.

---

## Search Functionality

### Cross-Language Search

Search returns results from **all languages** with clear labels:

```
Search: "nextjs"

Results:
────────────────────────────
Building This Blog [EN]
A deep dive into the Next.js...

Construindo Este Blog [PT]
Um mergulho profundo no Next.js...
────────────────────────────
```

Each result displays a language indicator badge.

---

## Tags & Taxonomy

### Unified English Tags

Tags remain in English across all languages:

- URL: `/tag/nextjs` (not `/pt/tag/nextjs`)
- The tag page at `/tag/nextjs` shows posts in **both languages**
- Tag display names are not translated

This keeps the taxonomy simple and URLs consistent.

---

## RSS Feeds

### Separate Feeds Per Language

```
/feed.xml         → English posts only
/pt-br/feed.xml   → Brazilian Portuguese posts only
```

Each feed includes only posts in that language. If a post only exists in English, it appears only in `/feed.xml`.

---

## SEO Configuration

### Sitemap

**Single sitemap** with hreflang annotations:

```xml
<url>
  <loc>https://devgiroux.com/blog/building-this-blog</loc>
  <xhtml:link rel="alternate" hreflang="en"
              href="https://devgiroux.com/blog/building-this-blog"/>
  <xhtml:link rel="alternate" hreflang="pt-BR"
              href="https://devgiroux.com/pt-br/blog/building-this-blog"/>
  <xhtml:link rel="alternate" hreflang="x-default"
              href="https://devgiroux.com/blog/building-this-blog"/>
</url>
```

### Canonical URLs

**Self-referencing canonicals** — each language version is canonical to itself:

```html
<!-- On /blog/my-article -->
<link rel="canonical" href="https://devgiroux.com/blog/my-article" />

<!-- On /pt-br/blog/my-article -->
<link rel="canonical" href="https://devgiroux.com/pt-br/blog/my-article" />
```

### Hreflang Tags

Every page includes hreflang link tags:

```html
<link rel="alternate" hreflang="en" href="https://devgiroux.com/blog/my-article" />
<link rel="alternate" hreflang="pt-BR" href="https://devgiroux.com/pt-br/blog/my-article" />
<link rel="alternate" hreflang="x-default" href="https://devgiroux.com/blog/my-article" />
```

### Open Graph Images

OG images use **English text only** for brand consistency across social shares.

### HTML Lang Attribute

```html
<html lang="en">  <!-- or "pt-BR" -->
```

---

## Comments (Giscus)

### Shared Discussions

Both language versions of an article share the **same GitHub discussion thread**.

**Mapping strategy:** Use the English slug as the discussion identifier regardless of current language.

```tsx
<Giscus
  repo="devgiroux/blog-comments"
  mapping="specific"
  term={englishSlug}  // Always use English slug
  // ...
/>
```

This keeps the community unified rather than fragmenting discussions.

---

## Internal Linking

### Language-Aware Links

When linking between posts within MDX content, links automatically resolve to the same-language version:

```markdown
<!-- In English article -->
Check out my [previous post](/blog/welcome)
→ Links to /blog/welcome

<!-- In Brazilian Portuguese article -->
Veja meu [post anterior](/blog/welcome)
→ Automatically resolves to /pt-br/blog/welcome
```

Implementation: Middleware or custom Link component that prepends locale when needed.

---

## MDX Components

### Locale Prop Pattern

MDX components receive the current locale and can adapt their display:

```tsx
interface CalloutProps {
  type: 'info' | 'warning' | 'tip';
  locale: 'en' | 'pt-BR';
  children: React.ReactNode;
}

const labels = {
  'en': { info: 'Info', warning: 'Warning', tip: 'Tip' },
  'pt-BR': { info: 'Info', warning: 'Aviso', tip: 'Dica' }
};

function Callout({ type, locale, children }: CalloutProps) {
  return (
    <div className={`callout callout-${type}`}>
      <span className="callout-label">{labels[locale][type]}</span>
      {children}
    </div>
  );
}
```

### Table of Contents

TOC headings are **extracted from the translated content** — they automatically reflect the language of the current article.

---

## Homepage & Static Pages

### Hero Section

Same structure across languages, with translated text:

| Element | English | Portuguese |
|---------|---------|------------|
| Headline | "Welcome to my blog" | "Bem-vindo ao meu blog" |
| Tagline | "Thoughts on web development" | "Reflexões sobre desenvolvimento web" |
| CTA | "Read Latest" | "Ler Mais Recente" |

---

## Technical Implementation

### Next.js Configuration

```ts
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  // existing config
});
```

### Middleware

```ts
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'  // No prefix for default locale
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

### App Directory Structure

```
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── tag/
│   │   └── [tag]/
│   │       └── page.tsx
│   └── not-found.tsx
├── api/
└── globals.css
```

### Provider Setup

```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## File Changes Summary

### New Files

| File | Purpose |
|------|---------|
| `locales/en.json` | English UI translations |
| `locales/pt-BR.json` | Brazilian Portuguese UI translations |
| `middleware.ts` | Locale detection and routing |
| `i18n.ts` | next-intl configuration |
| `lib/i18n.ts` | Helper functions for i18n |

### Modified Files

| File | Changes |
|------|---------|
| `next.config.ts` | Add next-intl plugin |
| `app/layout.tsx` | Move to `app/[locale]/layout.tsx` |
| `app/page.tsx` | Move to `app/[locale]/page.tsx` |
| `app/blog/*` | Move under `[locale]` segment |
| `lib/posts.ts` | Add locale filtering logic |
| `lib/mdx.ts` | Handle `.en.mdx` / `.pt-BR.mdx` files |
| `components/layout/header.tsx` | Add language switcher |
| `components/blog/article-card.tsx` | Add language badges |
| `app/sitemap.ts` | Add hreflang annotations |
| `app/feed.xml/route.ts` | Split into locale-specific feeds |

### Content Migration

Rename existing MDX files (keeping `.en.mdx` suffix for English, `.pt-BR.mdx` for Portuguese):

```
building-this-blog.mdx → building-this-blog.en.mdx
welcome.mdx → welcome.en.mdx
code-examples.mdx → code-examples.en.mdx
```

---

## Implementation Checklist

- [ ] Install and configure `next-intl`
- [ ] Create middleware for locale detection
- [ ] Restructure app directory under `[locale]`
- [ ] Create translation JSON files
- [ ] Update `lib/posts.ts` for locale-aware post fetching
- [ ] Update `lib/mdx.ts` for new file naming convention (`.en.mdx` / `.pt-BR.mdx`)
- [ ] Migrate existing MDX files to `.en.mdx` naming
- [ ] Add language switcher to header
- [ ] Add language badges to article cards
- [ ] Update sitemap with hreflang
- [ ] Split RSS feeds by locale
- [ ] Update Giscus configuration
- [ ] Implement locale-aware internal linking
- [ ] Add locale prop to MDX components
- [ ] Localize error pages
- [ ] Update date formatting utilities
- [ ] Test browser detection and cookie persistence
- [ ] Verify SEO: hreflang, canonicals, structured data
