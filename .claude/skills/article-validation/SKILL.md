---
name: article-validation
description: Validate blog posts for common issues and errors. Use when checking articles for problems, validating post structure, finding errors in frontmatter, or ensuring articles follow the correct format. Automatically checks file naming, frontmatter, locale pairing, MDX syntax, and content quality.
allowed-tools: Read, Glob, Grep
---

# Article Validation Skill

This skill validates all blog posts in the project for common issues, errors, and structural problems.

## When to Use This Skill

Activate this skill when the user:
- Asks to check or validate their blog posts
- Wants to find errors in articles
- Mentions issues with articles or posts
- Just created or edited articles
- Says phrases like "check my posts", "are there any errors", "validate articles"

## What This Skill Validates

### 1. File Naming Validation
- Files follow pattern: `{slug}.{locale}.mdx`
- Locale is `en` or `pt-BR`
- Slug is URL-safe (lowercase, hyphens only)

### 2. Frontmatter Validation
**Required fields:**
- `title`: string, 5-100 chars
- `date`: YYYY-MM-DD format, not future date
- `description`: string, 10-200 chars
- `tags`: array, 1-10 tags

**Optional fields (validate if present):**
- `coverImage`: valid URL or empty string
- `draft`: boolean (not string "true")
- `featured`: boolean (not string "true")
- `lang`: must match filename locale

### 3. Locale Pairing Validation
For each slug:
- Both `.en.mdx` and `.pt-BR.mdx` should exist
- Matching frontmatter: date, tags, draft, featured, coverImage
- Tags stay in English for both locales

### 4. Directory Structure
- Files in `content/posts/YYYY/MM/` structure
- YYYY is 2020-2030
- MM is 01-12
- Date in path should match frontmatter date

### 5. MDX Syntax
- Valid YAML frontmatter
- No unclosed JSX tags
- Valid component syntax
- Closed code blocks

### 6. Content Quality
- Article word count >100 words
- Has headings
- Title/description length appropriate
- No broken internal links

### 7. Slug Uniqueness
- No duplicate slugs in same month
- Slugs are unique identifiers

## Instructions

### Step 1: Find All Articles
```bash
# Use Glob to find all MDX files
Glob: "content/posts/**/*.mdx"
```

Group files by slug for paired validation.

### Step 2: Validate Each Article
For each article file:

1. **Parse frontmatter** using Read tool
2. **Check file naming**:   - Extract slug and locale from filename
   - Verify locale is valid
   - Verify slug is URL-safe

3. **Validate frontmatter**:
   - Check all required fields present
   - Validate data types
   - Check field values in range
   - Verify lang matches filename locale

4. **Check directory structure**:
   - Verify YYYY/MM format
   - Compare path date with frontmatter date

5. **Validate MDX syntax**:
   - Parse frontmatter (valid YAML)
   - Check for unclosed tags
   - Verify code blocks closed

### Step 3: Cross-Article Validation
After validating individual files:

1. **Check locale pairing**:
   - Group by slug
   - Verify both locales exist
   - Compare frontmatter fields

2. **Check slug uniqueness**:
   - Detect duplicates within same month
   - Report conflicts

3. **Validate internal links**:
   - Extract all internal links
   - Verify target articles exist

### Step 4: Generate Report
Create comprehensive validation report:

```
📋 BLOG POST VALIDATION REPORT
════════════════════════════════════════════════════════════════

Articles validated: X files (X unique slugs)
Locales checked: EN (X), PT-BR (X)

════════════════════════════════════════════════════════════════
SUMMARY
════════════════════════════════════════════════════════════════

✅ Passed: X articles
⚠️  Warnings: X articles
❌ Errors: X articles

════════════════════════════════════════════════════════════════
❌ ERRORS (X)
════════════════════════════════════════════════════════════════

[List all errors with file paths and line numbers]

════════════════════════════════════════════════════════════════
⚠️  WARNINGS (X)
════════════════════════════════════════════════════════════════

[List all warnings]

════════════════════════════════════════════════════════════════
✅ VALIDATION PASSED (X)
════════════════════════════════════════════════════════════════

[List articles that passed all checks]

════════════════════════════════════════════════════════════════
NEXT STEPS
════════════════════════════════════════════════════════════════

[Recommendations based on findings]
```

## Error Categories

### Critical Errors (❌)
- Missing required frontmatter fields
- Invalid YAML syntax
- Broken MDX syntax
- Malformed date format
- Invalid locale
- Duplicate slugs in same month

### Warnings (⚠️)
- Missing locale pair
- Mismatched frontmatter between locales
- Date path mismatch
- Short article (<100 words)
- No headings
- Single-use tags (possible typos)

### Pass (✅)
- All validations passed
- No issues found

## Integration Points

This skill uses existing library functions:
- `lib/posts.ts:getAllPosts()` - Get all articles
- `lib/posts.ts:getAllBaseSlugs()` - Get unique slugs
- `gray-matter` - Parse frontmatter

After validation, if errors found:
- Suggest fixing specific issues
- Offer to use `/polish-article` for content improvements
- Suggest `/seo-audit` for SEO optimization

## Example Interactions

### Example 1: User asks to check posts
```
User: Can you check if there are any errors in my blog posts?
Claude: I can use the article-validation skill to check all your blog posts
        for common issues. Should I proceed?
User: Yes
Claude: [Runs validation, finds 2 errors and 3 warnings, presents report]
```

### Example 2: After article creation
```
User: I just created a new article about React hooks
Claude: I can validate your new article to ensure it follows the correct
        format. Would you like me to check it?
User: Sure
Claude: [Validates article, reports any issues]
```

## Notes

- This skill is read-only (uses allowed-tools: Read, Glob, Grep)
- Does not modify articles
- Can be run frequently without side effects
- Complements the `/validate-posts` slash command
- Useful as a proactive quality check
