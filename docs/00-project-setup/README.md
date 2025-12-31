# Step 00: Project Setup

**Status: DONE**

## Overview
Initialize the Next.js project with all required dependencies and base configuration.

## Completed Tasks

- [x] Initialize Next.js 14+ with App Router, TypeScript, Tailwind CSS
- [x] Install dependencies:
  - MDX: gray-matter, reading-time, rehype-slug, rehype-autolink-headings, rehype-pretty-code, shiki, next-mdx-remote
  - UI: lucide-react, next-themes, class-variance-authority, clsx, tailwind-merge
  - Analytics: @vercel/analytics, @vercel/og
  - Search: fuse.js
  - RSS: feed
- [x] Configure shadcn/ui with components: button, card, dialog, input, badge, dropdown-menu
- [x] Create base lib utilities:
  - `lib/utils.ts` - cn() helper
  - `lib/config.ts` - Site configuration
  - `lib/posts.ts` - Post fetching utilities
- [x] Create layout components:
  - `components/layout/theme-provider.tsx`
  - `components/layout/theme-toggle.tsx`
  - `components/layout/header.tsx`
  - `components/layout/footer.tsx`

## Files Created

```
/app
  globals.css (default, needs customization)
  layout.tsx (default, needs customization)
  page.tsx (default)
/components
  /layout
    footer.tsx
    header.tsx
    theme-provider.tsx
    theme-toggle.tsx
  /ui
    badge.tsx
    button.tsx
    card.tsx
    dialog.tsx
    dropdown-menu.tsx
    input.tsx
/lib
  config.ts
  posts.ts
  utils.ts
/content
  /posts (empty)
/public
  /images (empty)
```

## Next Step
Proceed to [01-theme-and-layout](../01-theme-and-layout/README.md)
