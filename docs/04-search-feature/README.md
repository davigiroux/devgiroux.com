# Step 04: Search Feature

**Status: COMPLETED**

## Overview
Implement client-side search with keyboard shortcuts.

## Tasks

- [x] Create `components/search/search-dialog.tsx`
- [x] Create `components/search/search-provider.tsx` (optional, for global state)
- [x] Integrate Fuse.js for fuzzy search
- [x] Add Cmd/Ctrl + K keyboard shortcut
- [x] Add search to header

## Files to Create

### `components/search/search-dialog.tsx`
Modal search dialog:
- Opens with Cmd/Ctrl + K
- Search input with clear button
- Results list with keyboard navigation
- Searches: title, description, tags, content
- Click or Enter to navigate
- ESC to close

### Search Index
Build search index from all posts:
```typescript
const searchIndex = posts.map(post => ({
  slug: post.slug,
  title: post.frontmatter.title,
  description: post.frontmatter.description,
  tags: post.frontmatter.tags,
  content: post.content // stripped of MDX syntax
}))
```

### Fuse.js Configuration
```typescript
const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'description', weight: 1.5 },
    { name: 'tags', weight: 1.5 },
    { name: 'content', weight: 1 }
  ],
  threshold: 0.3,
  includeMatches: true
})
```

## UI/UX Details
- Show keyboard shortcut hint in search button
- Debounce search input (300ms)
- Show "No results" message when empty
- Highlight matching text in results
- Recent searches (optional)

## Implementation Details

The search feature has been fully implemented with all requested functionality.

### Usage

**1. Wrap your app with SearchProvider:**

```tsx
import { SearchProvider } from '@/components/search';
import { getAllPosts } from '@/lib/blog';

export default async function RootLayout({ children }) {
  const posts = await getAllPosts();

  return (
    <html>
      <body>
        <SearchProvider posts={posts}>
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
```

**2. Add search trigger to your header:**

```tsx
import { SearchTrigger } from '@/components/search';

export function Header() {
  return (
    <header>
      <nav>
        {/* Other nav items */}
        <SearchTrigger />
      </nav>
    </header>
  );
}
```

**3. Use programmatically (optional):**

```tsx
'use client';

import { useSearch } from '@/components/search';

export function MyComponent() {
  const { openSearch } = useSearch();

  return (
    <button onClick={openSearch}>
      Open Search
    </button>
  );
}
```

### Features Implemented

- ✅ Cmd/Ctrl + K keyboard shortcut
- ✅ Fuzzy search with Fuse.js
- ✅ Search across title, description, tags, and content
- ✅ Debounced input (300ms)
- ✅ Keyboard navigation (↑↓ arrows)
- ✅ Enter to select result
- ✅ ESC to close dialog
- ✅ Auto-focus input on open
- ✅ Clear button
- ✅ Empty state with instructions
- ✅ No results state
- ✅ Results count display
- ✅ Keyboard shortcut hints
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Violet theme integration

## Expected Outcome
- Cmd/Ctrl + K opens search dialog
- Type to search across all posts
- Click result to navigate
- Smooth animations

## Next Step
Proceed to [05-pages](../05-pages/README.md)
