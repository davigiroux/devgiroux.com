Create a new blog article with advanced options and templates.

**Title:** $ARGUMENTS

## Usage Examples

```bash
# Basic usage (creates both EN and PT-BR)
/new-article "Understanding React Hooks"

# Advanced usage with flags
/new-article "My Tutorial" --featured --tags "react,tutorial" --cover-image "url"

# Quick draft (skip prompts, use defaults)
/new-article "Quick Post" --quick

# English only
/new-article "English Only Post" --en-only

# No draft (publish immediately)
/new-article "Published Post" --no-draft

# Use specific template
/new-article "Tutorial Post" --template tutorial
```

## Available Flags

Parse these optional flags from $ARGUMENTS:

- `--featured` - Set featured: true (appears on homepage)
- `--no-draft` - Set draft: false (publish immediately, default is true)
- `--tags "tag1,tag2,tag3"` - Pre-fill specific tags (comma-separated)
- `--cover-image "url"` - Set coverImage field
- `--template [tutorial|announcement|guide]` - Use specific content template
- `--quick` - Skip all prompts, use sensible defaults
- `--en-only` - Only create English version (skip Portuguese)
- `--pt-only` - Only create Portuguese version (skip English)

## Tasks:

1. **Parse flags** from $ARGUMENTS:
   - Extract title (text before any --)
   - Extract all flags and their values
   - Store configuration for later use

2. **Check for existing tags** (for suggestions):
   - Read all existing articles via `lib/posts.ts:getAllTags()`
   - Prepare tag suggestions for user (unless --quick or --tags provided)
   - Show top 10 most used tags

3. **Generate URL-safe slug** from the title:
   - Convert to lowercase
   - Replace spaces with hyphens
   - Remove special characters
   - Example: "My Great Post!" → "my-great-post"

4. **Check for slug conflicts**:
   - Search for existing articles with same slug in current month
   - If conflict found:
     - Warn user: "⚠️ Article with slug '{slug}' already exists in YYYY/MM/"
     - Suggest: "{slug}-2" or ask for different title
     - Wait for user confirmation to proceed or abort

5. **Get current date** in YYYY-MM-DD format

6. **Extract year/month** for folder structure (YYYY/MM)

7. **Create folder** if it doesn't exist:
   ```bash
   mkdir -p content/posts/YYYY/MM
   ```

8. **Determine frontmatter values**:
   - `draft`: Use false if --no-draft flag, otherwise true
   - `featured`: Use true if --featured flag, otherwise false
   - `tags`: Use provided tags if --tags flag, otherwise suggest based on title + existing tags
   - `coverImage`: Use provided URL if --cover-image flag, otherwise empty string

9. **Select content template**:
   - If --template flag: Use specified template
   - Otherwise: Use default "post" template

   Available templates:
   - **post** (default): Basic blog post structure
   - **tutorial**: Step-by-step guide with numbered sections
   - **announcement**: Short announcement format
   - **guide**: Comprehensive guide with detailed sections

10. **Create English version** at `content/posts/YYYY/MM/[slug].en.mdx`:

**For "post" template:**
```yaml
---
title: "$ARGUMENTS"
date: "YYYY-MM-DD"
description: "[Generate compelling 1-2 sentence description]"
tags: ["tag1", "tag2", "tag3"]
coverImage: "[from --cover-image or empty]"
draft: [from flags, default: true]
featured: [from flags, default: false]
lang: "en"
---

# $ARGUMENTS

[Brief introduction paragraph about the topic]

## Introduction

[Introduce the problem or topic this article addresses]

## Main Content

[Main points and explanations]

## Conclusion

[Summary and next steps]
```

**For "tutorial" template:**
```yaml
---
title: "$ARGUMENTS"
date: "YYYY-MM-DD"
description: "Step-by-step tutorial on [topic]"
tags: ["tutorial", "tag2", "tag3"]
coverImage: "[from --cover-image or empty]"
draft: [from flags, default: true]
featured: [from flags, default: false]
lang: "en"
---

# $ARGUMENTS

Learn how to [accomplish goal] in this step-by-step tutorial.

## Prerequisites

- Requirement 1
- Requirement 2

## Step 1: [First Step]

[Instructions]

## Step 2: [Second Step]

[Instructions]

## Step 3: [Third Step]

[Instructions]

## Conclusion

[Summary of what was accomplished]

## Next Steps

- [Additional resources or next tutorials]
```

**For "announcement" template:**
```yaml
---
title: "$ARGUMENTS"
date: "YYYY-MM-DD"
description: "[Brief announcement summary]"
tags: ["announcement", "tag2"]
coverImage: "[from --cover-image or empty]"
draft: [from flags, default: true]
featured: true
lang: "en"
---

# $ARGUMENTS

[Main announcement text - keep brief and direct]

## What This Means

[Explanation of impact or significance]

## What's Next

[Call to action or next steps]
```

**For "guide" template:**
```yaml
---
title: "$ARGUMENTS"
date: "YYYY-MM-DD"
description: "Complete guide to [topic]"
tags: ["guide", "tag2", "tag3"]
coverImage: "[from --cover-image or empty]"
draft: [from flags, default: true]
featured: [from flags, default: false]
lang: "en"
---

# $ARGUMENTS

A comprehensive guide to [topic].

## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)
- [Section 3](#section-3)

## Overview

[High-level overview of what this guide covers]

## Section 1

[Detailed content]

## Section 2

[Detailed content]

## Section 3

[Detailed content]

## Best Practices

[Tips and recommendations]

## Common Pitfalls

[Things to avoid]

## Conclusion

[Summary and resources]
```

11. **Create Portuguese version** (unless --en-only flag):
    - Translate the title to Brazilian Portuguese
    - Translate the description
    - Keep tags in English (per codebase convention)
    - Use same frontmatter values as English version
    - Apply appropriate template structure in Portuguese
    - Use Portuguese section headings based on template type

12. **Validation before creating**:
    - Verify folder path is valid
    - Check files don't already exist (warn if they do)
    - Validate coverImage URL if provided (basic URL format check)
    - Ensure all required frontmatter fields are present

13. **Create the files** using Write tool

14. **Post-creation confirmation**:
    - Show paths of created file(s)
    - Confirm frontmatter settings:
      - Draft: [true/false]
      - Featured: [true/false]
      - Tags: [list]
      - Template: [type]
    - Show next steps:
      - "✓ Files created successfully"
      - "📝 Start writing in the MDX files above"
      - "🔍 Run /validate-posts to check for issues"
      - "🌐 Run /translate [slug] --to pt-BR to create/update translation" (if --en-only used)

## Guidelines

**Default Behavior:**
- Create BOTH language versions (unless --en-only or --pt-only)
- Set `draft: true` (unless --no-draft)
- Set `featured: false` (unless --featured)
- Use current date automatically
- Suggest tags based on existing tags + article topic

**Tag Suggestions:**
- Read existing tags via `getAllTags()` from lib/posts.ts
- If --quick: Auto-select top 3 most relevant tags
- If --tags provided: Use those tags (validate they're lowercase, hyphenated)
- Otherwise: Show top 10 existing tags and suggest new ones based on title
- Always keep tags in English for both locales

**Slug Conflict Handling:**
- Check if slug exists in current YYYY/MM folder
- If exists: Warn and suggest "{slug}-2" or ask for new title
- Never overwrite without explicit confirmation

**Cover Image:**
- If --cover-image provided: Validate URL format
- If invalid URL: Warn and ask for correction
- Empty string is acceptable (default)

**Template Selection:**
- Default: "post" (basic blog structure)
- Tutorial: Use for how-to guides
- Announcement: Use for news/updates
- Guide: Use for comprehensive references

**Quick Mode (--quick):**
- Skip all prompts
- Use sensible defaults:
  - Auto-select top 3 relevant tags
  - Use "post" template
  - draft: true
  - featured: false
- Generate description automatically from title
- Create both locales with auto-translation

## Error Handling

- **Missing title**: "Error: Title required. Usage: /new-article 'Title'"
- **Slug conflict**: "⚠️ Article '{slug}' exists. Use different title or append -2?"
- **Invalid flag**: "Warning: Unknown flag '{flag}' ignored"
- **Invalid cover image URL**: "⚠️ Invalid URL format for cover image"
- **Invalid template**: "Error: Unknown template '{template}'. Use: post, tutorial, announcement, guide"

## Integration with Other Commands

After creating a new article:
- Suggest running `/validate-posts` to check for issues
- Suggest running `/translate` if only one locale created
- If draft: Remind about `/draft-manager --publish [slug]` when ready
