Validate all blog posts for common issues and errors.

**Usage:**
- `/validate-posts` - Run all validation checks
- `/validate-posts --fix` - Auto-fix simple issues (future enhancement)

## Validation Checks

Run comprehensive validation on all articles in `content/posts/`:

### 1. File Discovery
- Find all `.mdx` files in `content/posts/` recursively
- Skip hidden directories (`.obsidian`, etc.)
- Group files by slug for paired validation

### 2. File Naming Validation
For each file, check:
- ✓ Follows pattern: `{slug}.{locale}.mdx`
- ✓ Locale is either `en` or `pt-BR`
- ✓ Slug is URL-safe (lowercase, hyphens only, no special chars)
- ⚠️ Warn: Files without locale suffix (legacy format)

### 3. Frontmatter Validation
For each file, parse YAML frontmatter and check:

**Required fields:**
- ✓ `title`: string, not empty, length 5-100 chars
- ✓ `date`: string, valid format YYYY-MM-DD, not future date
- ✓ `description`: string, not empty, length 10-200 chars
- ✓ `tags`: array, minimum 1 tag, maximum 10 tags

**Optional fields (validate if present):**
- ✓ `coverImage`: string (URL or path), if not empty validate it's a valid URL or file exists
- ✓ `draft`: boolean (true or false), not string
- ✓ `featured`: boolean (true or false), not string
- ✓ `lang`: string, must match locale from filename

**Common errors:**
- ❌ Missing required fields
- ❌ Empty strings for required fields
- ❌ Invalid date format (e.g., "12-30-2025" instead of "2025-12-30")
- ❌ Tags as string instead of array
- ❌ draft/featured as string ("true") instead of boolean
- ❌ lang mismatch (lang: "pt-BR" but filename is .en.mdx)

### 4. Locale Pairing Validation
For each unique slug:
- ✓ Check if both .en.mdx and .pt-BR.mdx exist
- ⚠️ Warn if only one locale exists (list missing locale)
- ✓ If both exist, validate they have matching:
  - Same `date` field
  - Same `tags` array (order doesn't matter)
  - Same `draft` status
  - Same `featured` status
  - Same `coverImage` (if specified)

**Common errors:**
- ❌ Mismatched dates between locales
- ❌ Different tags between locales (tags should be in English for both)
- ❌ One is draft, other is published
- ❌ One is featured, other is not

### 5. Slug Uniqueness
- ✓ Check that no two different articles have the same slug
- ✓ Account for date-based directory structure (same slug in different YYYY/MM is different article)
- ❌ Error if duplicate slug in same month

### 6. Directory Structure Validation
For each file:
- ✓ Check file is in `content/posts/YYYY/MM/` structure
- ✓ Validate YYYY is 2020-2030 (reasonable range)
- ✓ Validate MM is 01-12
- ⚠️ Warn if date in filename path doesn't match frontmatter date

### 7. MDX Syntax Validation
For each file:
- ✓ Attempt to parse frontmatter (valid YAML)
- ✓ Check for common MDX issues:
  - Unclosed JSX tags
  - Invalid component syntax
  - Malformed code blocks (``` without closing)
- ⚠️ Warn about potentially problematic patterns:
  - Bare HTML tags (should use MDX components)
  - Multiple h1 headings (should only be one)
  - Very long lines (>500 chars) that might need breaking

### 8. Internal Links Validation
For each file:
- Find all internal links: `[text](/blog/slug)` or `[text](/pt-br/blog/slug)`
- ✓ Verify linked article exists
- ❌ Error if link points to non-existent article
- ⚠️ Warn if link doesn't respect locale (PT-BR article linking to EN-only article)

### 9. Content Quality Checks
For each file:
- ⚠️ Warn if title is very short (<10 chars) or very long (>80 chars)
- ⚠️ Warn if description is very short (<50 chars) or very long (>200 chars)
- ⚠️ Warn if article has <100 words (might be stub)
- ⚠️ Warn if article has no headings (poor structure)
- ✓ Verify reading time can be calculated

### 10. Tag Consistency
- Get all unique tags across all articles (via `getAllTags()` in lib/posts.ts)
- ⚠️ Warn about potential typos:
  - Similar tags that might be duplicates ("react" vs "reactjs")
  - Case inconsistencies (should be lowercase)
  - Tags with spaces (should use hyphens)

## Output Format

Generate a comprehensive report:

```
📊 VALIDATION REPORT
════════════════════════════════════════

✓ Total articles found: 6 files (3 unique slugs)
✓ All files follow naming convention
✓ All frontmatter valid

ERRORS (2):
❌ content/posts/2025/12/welcome.pt-BR.mdx
   - Missing required field: description

❌ content/posts/2025/12/building-this-blog.en.mdx
   - Invalid date format: "12-29-2025" (should be "2025-12-29")

WARNINGS (3):
⚠️  content/posts/2025/12/code-examples.en.mdx
   - Only EN locale exists (missing PT-BR translation)

⚠️  content/posts/2025/12/welcome.en.mdx
   - Title very long (82 chars, recommended <70)

⚠️  content/posts/2025/12/building-this-blog.pt-BR.mdx
   - Different tags than EN version (should match)

SUMMARY:
════════════════════════════════════════
Files checked: 6
Errors: 2 ❌
Warnings: 3 ⚠️
Passed: 1 ✓

Next steps:
1. Fix all ERRORS before deploying
2. Review WARNINGS and fix if appropriate
3. Run /validate-posts again to confirm
```

## Exit Behavior

- If ERRORS found: Exit with error status, show "⚠️ Validation FAILED"
- If only WARNINGS: Exit successfully, show "✓ Validation PASSED (with warnings)"
- If no issues: Show "✓ All validations PASSED"

## Integration Points

This command should use:
- `lib/posts.ts` functions: `getAllBaseSlugs()`, `getAllTags()`, `getPostBySlug()`
- `gray-matter` for frontmatter parsing (already in use)
- File system to validate paths and existence

## Future Enhancements (--fix flag)

When `--fix` flag is provided:
- Auto-fix date format issues
- Auto-correct boolean strings to actual booleans
- Auto-sync tags between locales
- Auto-lowercase and normalize tag names
- Add missing required fields with placeholders

For now, just report issues - don't auto-fix.
