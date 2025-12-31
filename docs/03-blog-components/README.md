# Step 03: Blog Components

**Status: COMPLETED**

## Overview
Create all reusable blog UI components.

## Tasks

- [x] Create `components/blog/article-card.tsx`
- [x] Create `components/blog/article-header.tsx`
- [x] Create `components/blog/table-of-contents.tsx`
- [x] Create `components/blog/share-buttons.tsx`
- [x] Create `components/blog/tag-badge.tsx`
- [x] Create `components/blog/giscus-comments.tsx`

## Components Detail

### `article-card.tsx`
Card component for blog listing:
- Cover image (optional)
- Title
- Description
- Date and reading time
- Tags
- Hover effects

### `article-header.tsx`
Header for individual article pages:
- Title (large)
- Date, reading time, author
- Tags row
- Cover image (full width, optional)

### `table-of-contents.tsx`
Sticky sidebar TOC:
- Extract headings from content
- Scroll spy (highlight current section)
- Smooth scroll on click
- Collapsible on mobile

### `share-buttons.tsx`
Social sharing buttons:
- Twitter/X
- LinkedIn
- WhatsApp
- Copy link button
- Accessible labels

### `tag-badge.tsx`
Styled tag/category badges:
- Click to filter by tag
- Variant styles
- Count display (optional)

### `giscus-comments.tsx`
GitHub Discussions-based comments:
- Theme-aware (dark/light)
- Lazy load
- Placeholder until configured

## Implementation Details

All blog components have been created and are ready to use:

### Usage Examples

**Article Card (for blog listings):**
```tsx
import { ArticleCard } from '@/components/blog';

<ArticleCard
  slug="my-post"
  title="Post Title"
  description="Post description"
  date="2025-12-30"
  readingTime="5 min read"
  tags={["react", "nextjs"]}
  image="/images/cover.jpg"
/>
```

**Article Header (for individual posts):**
```tsx
import { ArticleHeader } from '@/components/blog';

<ArticleHeader
  title="Article Title"
  date="2025-12-30"
  readingTime="5 min read"
  author="David Giroux"
  tags={["react", "typescript"]}
  image="/images/cover.jpg"
/>
```

**Table of Contents:**
```tsx
import { TableOfContents } from '@/components/blog';

<TableOfContents selector="article" />
```

**Share Buttons:**
```tsx
import { ShareButtons } from '@/components/blog';

<ShareButtons
  url="https://devgiroux.com/blog/post-slug"
  title="Post Title"
  description="Post description"
/>
```

**Giscus Comments:**
```tsx
import { GiscusComments } from '@/components/blog';

<GiscusComments
  repo="your-username/your-repo"
  repoId="your-repo-id"
  category="Announcements"
  categoryId="your-category-id"
/>
```

### Features

- All components follow the Electric Violet theme
- Responsive design (mobile-first)
- Accessibility features (ARIA labels, semantic HTML)
- Client-side interactivity where needed
- TypeScript type safety

## Expected Outcome
All components render correctly and are ready for use in pages.

## Next Step
Proceed to [04-search-feature](../04-search-feature/README.md)
