# Step 05: Pages

**Status: COMPLETED**

## Overview
Build all application pages using the components from previous steps.

## Tasks

- [x] Create `components/home/hero.tsx`
- [x] Update `app/page.tsx` (Homepage)
- [x] Create `app/blog/page.tsx` (Blog listing)
- [x] Create `app/blog/[slug]/page.tsx` (Article page)
- [x] Create `app/tag/[tag]/page.tsx` (Tag filtered view)

## Pages Detail

### Homepage (`app/page.tsx`)
Sections:
1. Hero - Introduction, tagline, CTA
2. Featured Posts - Grid of 3 featured posts
3. Latest Articles - List of recent posts
4. Tags Cloud - All tags with counts

### Blog Listing (`app/blog/page.tsx`)
- Page title
- All published posts (sorted by date)
- Pagination (optional, or infinite scroll)

### Article Page (`app/blog/[slug]/page.tsx`)
Layout:
- Article header (title, meta, cover image)
- Two-column layout on desktop:
  - Main content (MDX rendered)
  - Sidebar with TOC
- Share buttons
- Giscus comments
- Related posts (optional)

Metadata:
- Dynamic OG image
- Twitter Card
- JSON-LD structured data

### Tag Page (`app/tag/[tag]/page.tsx`)
- Tag name as title
- Count of posts
- Filtered posts list
- Back to blog link

## Static Generation
Use `generateStaticParams()` for:
- All blog post slugs
- All tag pages

## Implementation Details

All pages have been created with full functionality:

### Usage

**1. Homepage** (`/`):
- Hero section with CTA buttons
- Featured posts (if marked as `featured: true`)
- Latest 6 articles
- Tags cloud with post counts

**2. Blog Listing** (`/blog`):
- All published posts (excluding drafts)
- Sorted by date (newest first)
- Post count display
- Empty state for no posts

**3. Blog Post** (`/blog/[slug]`):
- Two-column layout (content + TOC sidebar)
- Article header with metadata
- MDX content rendering
- Share buttons (Twitter, LinkedIn, WhatsApp, Copy)
- Giscus comments (if configured)
- JSON-LD structured data
- Dynamic OG images and Twitter Cards

**4. Tag Filter** (`/tag/[tag]`):
- Posts filtered by tag
- Post count display
- Back to blog button
- Same grid layout as blog listing

### Static Generation

All pages use `generateStaticParams()` for optimal performance:

```typescript
// Blog posts
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Tag pages
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}
```

### Content Structure

Create MDX files in `content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2025-12-30"
description: "Post description"
tags: ["tag1", "tag2"]
coverImage: "/images/cover.jpg"
draft: false
featured: true
---

Your content here...
```

## Expected Outcome
- All pages render correctly
- Navigation works between pages
- Responsive on all screen sizes
- Fast page loads (SSG)
- SEO optimized with metadata

## Next Step
Proceed to [06-seo-and-feeds](../06-seo-and-feeds/README.md)
