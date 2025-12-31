# Step 07: Sample Content

**Status: TODO**

## Overview
Create sample blog posts demonstrating all features.

## Tasks

- [ ] Create `content/posts/welcome.mdx`
- [ ] Create `content/posts/building-this-blog.mdx`
- [ ] Create `content/posts/code-examples.mdx`
- [ ] Verify all MDX features work

## Sample Posts

### Post 1: `welcome.mdx`
**Purpose:** Introduction post, showcase basic MDX features

Frontmatter:
```yaml
title: "Welcome to DevGiroux"
date: "2024-12-30"
description: "Welcome to my personal blog where I share thoughts on web development, programming, and technology."
tags: ["welcome", "personal"]
featured: true
```

Content:
- Introduction paragraph
- Callout box
- Image example
- Basic code snippet

### Post 2: `building-this-blog.mdx`
**Purpose:** Technical deep-dive, showcase more features

Frontmatter:
```yaml
title: "How I Built This Blog with Next.js"
date: "2024-12-29"
description: "A technical walkthrough of building a modern blog with Next.js, MDX, and Tailwind CSS."
tags: ["nextjs", "tutorial", "web-development"]
featured: true
```

Content:
- Multiple sections with headings (for TOC)
- Code blocks with different languages
- YouTube embed example
- Warning/info callouts

### Post 3: `code-examples.mdx`
**Purpose:** Showcase syntax highlighting

Frontmatter:
```yaml
title: "Code Snippets and Examples"
date: "2024-12-28"
description: "A collection of useful code snippets showcasing syntax highlighting."
tags: ["code", "snippets", "reference"]
featured: false
```

Content:
- TypeScript example
- React component
- CSS example
- Terminal commands
- Line highlighting examples

## Expected Outcome
- All 3 posts appear in blog listing
- Featured posts show on homepage
- All MDX features render correctly
- Tags link to filtered views

## Final Verification
```bash
npm run build
npm run start
```

Check:
- [ ] Homepage displays correctly
- [ ] Blog listing shows all posts
- [ ] Article pages render MDX
- [ ] TOC works on long articles
- [ ] Search finds all posts
- [ ] Theme toggle works
- [ ] Mobile responsive
- [ ] RSS feed valid
- [ ] Sitemap accessible

## Deployment
```bash
# Push to GitHub
git add .
git commit -m "Complete blog implementation"
git push origin main

# Deploy to Vercel
# - Connect repo to Vercel
# - Deploy automatically
```

## Post-Deployment
1. Configure Giscus comments
2. Update analytics settings
3. Add real content!
