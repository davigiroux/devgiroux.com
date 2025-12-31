# Step 06: SEO and Feeds

**Status: TODO**

## Overview
Complete SEO setup with sitemap, robots.txt, RSS feed, and dynamic OG images.

## Tasks

- [ ] Create `app/sitemap.ts`
- [ ] Create `app/robots.ts`
- [ ] Create `app/feed.xml/route.ts`
- [ ] Create `app/og/[...slug]/route.tsx`
- [ ] Add JSON-LD structured data to article pages

## Files to Create

### `app/sitemap.ts`
Dynamic sitemap generation:
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts()

  return [
    { url: 'https://devgiroux.com', lastModified: new Date() },
    { url: 'https://devgiroux.com/blog', lastModified: new Date() },
    ...posts.map(post => ({
      url: `https://devgiroux.com/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date)
    }))
  ]
}
```

### `app/robots.ts`
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://devgiroux.com/sitemap.xml'
  }
}
```

### `app/feed.xml/route.ts`
RSS feed using `feed` package:
- Include all published posts
- Full content in description
- Proper XML formatting

### `app/og/[...slug]/route.tsx`
Dynamic OG image generation using @vercel/og:
- Blog post images with title, date, tags
- Default image for homepage
- Electric Violet theme styling

## JSON-LD Structured Data
Add to article pages:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2024-01-01",
  "author": { "@type": "Person", "name": "DevGiroux" }
}
```

## Expected Outcome
- `/sitemap.xml` lists all pages
- `/robots.txt` allows crawling
- `/feed.xml` valid RSS feed
- OG images generate dynamically

## Verification
- Test sitemap: https://devgiroux.com/sitemap.xml
- Test RSS: https://devgiroux.com/feed.xml
- Test OG: https://devgiroux.com/og/blog/post-slug

## Next Step
Proceed to [07-sample-content](../07-sample-content/README.md)
