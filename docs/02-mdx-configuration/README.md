# Step 02: MDX Configuration

**Status: COMPLETED**

## Overview
Configure MDX processing with syntax highlighting and custom components.

## Tasks

- [x] Update `next.config.ts` for MDX support
- [x] Create `lib/mdx.ts` for MDX processing
- [x] Create `components/mdx/mdx-components.tsx`
- [x] Create `components/mdx/youtube-embed.tsx`
- [x] Create `components/mdx/callout.tsx`
- [x] Test syntax highlighting with a sample code block

## Files to Create/Modify

### `next.config.ts`
Configure next-mdx-remote with rehype plugins:
- rehype-slug (heading IDs)
- rehype-autolink-headings (anchor links)
- rehype-pretty-code with shiki (syntax highlighting)

### `lib/mdx.ts`
MDX compilation utilities:
- `compileMDX()` - Compile MDX string to React
- Configure rehype plugins

### `components/mdx/mdx-components.tsx`
Custom components for MDX rendering:
- Headings (h1-h6) with anchor links
- Code blocks with copy button
- Images with next/image optimization
- Links with external detection
- Blockquotes styled
- Lists styled

### `components/mdx/youtube-embed.tsx`
Responsive YouTube embed component:
```tsx
<YouTube id="video-id" />
```

### `components/mdx/callout.tsx`
Alert/callout boxes:
```tsx
<Callout type="info|warning|error">
  Content here
</Callout>
```

## Syntax Highlighting Theme
Use a dark theme compatible with our Electric Violet design:
- Theme: `github-dark` or `one-dark-pro`
- Line highlighting support
- Language labels

## Expected Outcome
- MDX files render correctly
- Code blocks have syntax highlighting
- YouTube embeds are responsive
- Callouts display with proper styling

## Implementation Details

All MDX components have been created and configured:

### Using MDX Compilation

```typescript
import { compileMDXContent } from '@/lib/mdx';

const { content, frontmatter } = await compileMDXContent({
  source: mdxString,
});
```

### Using Custom Components in MDX

Components are automatically available in MDX files:

```mdx
# This heading will have an anchor link

<Callout type="info">
  This is an informational callout
</Callout>

<YouTubeEmbed id="dQw4w9WgXcQ" title="Video Title" />
```

### Available Components

- **Callout**: Alert boxes with `type="info|warning|error"`
- **YouTubeEmbed**: Responsive YouTube embeds with `id` prop
- All standard MDX components (headings, links, code blocks, etc.) are styled

### Syntax Highlighting

Code blocks automatically get syntax highlighting with:
- Theme: `github-dark`
- Copy button on hover
- Line highlighting support
- Multiple language support via Shiki

## Verification

A test MDX file has been created at `components/mdx/test-sample.mdx` demonstrating all features.

## Next Step
Proceed to [03-blog-components](../03-blog-components/README.md)
