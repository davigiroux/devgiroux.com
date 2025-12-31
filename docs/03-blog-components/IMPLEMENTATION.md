# Blog Components - Implementation Summary

## Completed: 2025-12-30

### Overview
Successfully implemented all reusable blog UI components with full TypeScript support, responsive design, and Electric Violet theme integration.

## Files Created

### 1. `components/blog/tag-badge.tsx`
Styled tag/category badge component:

**Features:**
- Optional click handler or href for filtering
- Optional post count display
- Three variant styles (default, secondary, outline)
- Hover effects with violet theme
- Can be used as button or link

**Props:**
```typescript
{
  tag: string;
  count?: number;
  variant?: 'default' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
}
```

**Usage:**
```tsx
<TagBadge tag="react" count={5} href="/blog?tag=react" />
```

### 2. `components/blog/article-card.tsx`
Card component for blog post listings:

**Features:**
- Optional cover image with hover zoom effect
- Title with hover color change to violet-400
- Description with line clamp (2 lines max)
- Date and reading time with icons
- Tags display (shows first 3 tags)
- Card wrapper with link to full post
- Violet border and shadow on hover
- Backdrop blur effect

**Props:**
```typescript
{
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags?: string[];
  image?: string;
}
```

**Usage:**
```tsx
<ArticleCard
  slug="my-first-post"
  title="Getting Started with Next.js"
  description="Learn how to build modern web apps"
  date="2025-12-30"
  readingTime="5 min read"
  tags={["nextjs", "react", "typescript"]}
  image="/images/nextjs-cover.jpg"
/>
```

### 3. `components/blog/article-header.tsx`
Header component for individual article pages:

**Features:**
- Large responsive title (4xl/5xl/6xl)
- Author, date, and reading time metadata with icons
- Visual dividers between metadata items
- Tags row with clickable badges (links to filtered view)
- Optional full-width cover image
- Proper semantic HTML (header, h1, time)
- Violet theme styling throughout

**Props:**
```typescript
{
  title: string;
  date: string;
  readingTime: string;
  author?: string;
  tags?: string[];
  image?: string;
}
```

**Usage:**
```tsx
<ArticleHeader
  title="Building a Modern Blog with Next.js 14"
  date="2025-12-30"
  readingTime="8 min read"
  author="David Giroux"
  tags={["nextjs", "react", "mdx"]}
  image="/images/blog-header.jpg"
/>
```

### 4. `components/blog/share-buttons.tsx`
Social sharing buttons component:

**Features:**
- Twitter/X sharing (opens popup)
- LinkedIn sharing (opens popup)
- WhatsApp sharing (opens popup)
- Copy link button with success feedback
- Custom SVG icons for each platform
- Proper accessibility labels
- 2-second success message on copy
- Violet theme with hover effects
- Opens share dialogs in 600x400 popup windows

**Props:**
```typescript
{
  url: string;
  title: string;
  description?: string;
}
```

**Usage:**
```tsx
<ShareButtons
  url="https://devgiroux.com/blog/my-post"
  title="My Awesome Blog Post"
  description="Check out this amazing content"
/>
```

### 5. `components/blog/giscus-comments.tsx`
GitHub Discussions-based comments:

**Features:**
- Full Giscus integration with GitHub Discussions
- Theme-aware (switches between dark/light automatically)
- Lazy loading support
- Placeholder when not configured (with setup link)
- Dynamic theme switching (listens to theme changes)
- Configurable repository and category
- Reactions enabled by default
- Proper iframe cleanup

**Props:**
```typescript
{
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  inputPosition?: 'top' | 'bottom';
  lang?: string;
  loading?: 'lazy' | 'eager';
}
```

**Usage:**
```tsx
<GiscusComments
  repo="davidgiroux/blog"
  repoId="R_kgDOJxxx"
  category="Announcements"
  categoryId="DIC_kwDOJxxx"
/>
```

**Setup:**
1. Enable GitHub Discussions in your repository
2. Install Giscus app: https://github.com/apps/giscus
3. Get your repo and category IDs from: https://giscus.app
4. Pass the IDs to the component

### 6. `components/blog/table-of-contents.tsx`
Sticky sidebar table of contents with scroll spy:

**Features:**
- Automatic heading extraction (h2, h3, h4 from article)
- Scroll spy using IntersectionObserver API
- Active section highlighting with violet left border
- Smooth scroll to section on click
- Sticky positioning (top-20)
- Collapsible on mobile (with chevron icons)
- Hidden on small screens (lg:block)
- Indentation based on heading level
- Proper cleanup of observers
- Zero headings = component doesn't render

**Props:**
```typescript
{
  selector?: string; // Default: 'article'
}
```

**Usage:**
```tsx
<article>
  {/* Your MDX content */}
</article>

<aside>
  <TableOfContents selector="article" />
</aside>
```

### 7. `components/blog/index.ts`
Barrel export file for convenient imports:

```typescript
export { ArticleCard } from './article-card';
export { ArticleHeader } from './article-header';
export { TableOfContents } from './table-of-contents';
export { ShareButtons } from './share-buttons';
export { TagBadge } from './tag-badge';
export { GiscusComments } from './giscus-comments';
```

## Technical Details

### Dependencies Used
- **next/link** - Client-side navigation
- **next/image** - Optimized images
- **next-themes** - Theme detection for Giscus
- **lucide-react** - Icons (Calendar, Clock, User, Share2, etc.)
- **@/components/ui/badge** - Badge component from shadcn/ui
- **@/components/ui/button** - Button component from shadcn/ui
- **@/components/ui/card** - Card component from shadcn/ui

### Client Components
These components use 'use client':
- `table-of-contents.tsx` (IntersectionObserver, state)
- `share-buttons.tsx` (clipboard API, state)
- `giscus-comments.tsx` (script injection, theme listener)

### Server Components
These can be server components:
- `article-card.tsx`
- `article-header.tsx`
- `tag-badge.tsx`

### Theme Integration
All components follow the Electric Violet theme:
- Primary: `violet-500` (#8B5CF6)
- Hover: `violet-400`
- Active: `violet-400`
- Borders: `violet-500/20` (20% opacity)
- Backgrounds: `zinc-950`, `zinc-900`
- Text: `violet-50`, `zinc-300`, `zinc-400`

### Accessibility Features
- Semantic HTML (header, article, nav, time, etc.)
- ARIA labels on buttons (aria-label, aria-expanded)
- Proper link attributes (rel="noopener noreferrer")
- Keyboard navigation support
- Focus states on interactive elements
- Screen reader friendly text

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- TOC hidden on mobile, visible on lg+
- Cards adapt to container width
- Images use Next.js responsive sizing
- Flexible layouts with flex and grid

## Complete Example: Blog Post Page

```tsx
import { ArticleHeader } from '@/components/blog/article-header';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { ShareButtons } from '@/components/blog/share-buttons';
import { GiscusComments } from '@/components/blog/giscus-comments';
import { compileMDXContent } from '@/lib/mdx';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { content, frontmatter } = await compileMDXContent({
    source: mdxContent,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
        <div>
          <ArticleHeader
            title={frontmatter.title}
            date={frontmatter.date}
            readingTime={frontmatter.readingTime}
            tags={frontmatter.tags}
            image={frontmatter.image}
          />

          <article className="prose prose-invert max-w-none">
            {content}
          </article>

          <ShareButtons
            url={`https://devgiroux.com/blog/${params.slug}`}
            title={frontmatter.title}
            description={frontmatter.description}
          />

          <GiscusComments
            repo="davidgiroux/blog"
            repoId="R_xxx"
            category="Announcements"
            categoryId="DIC_xxx"
          />
        </div>

        <aside>
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
```

## Complete Example: Blog Listing Page

```tsx
import { ArticleCard } from '@/components/blog';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-violet-50 mb-8">Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            readingTime={post.readingTime}
            tags={post.tags}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}
```

## Next Steps
1. Create blog data utilities (getAllPosts, getPostBySlug)
2. Implement search functionality
3. Create blog pages (listing, individual post)
4. Add RSS feed generation
5. Implement tag filtering

## Notes
- All components are fully typed with TypeScript
- Images should be placed in `public/images/`
- Giscus requires GitHub repository setup
- Table of contents requires article headings to have IDs (provided by rehype-slug)
- Share buttons work best with absolute URLs
- All components are production-ready and tested
