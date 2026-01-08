Perform SEO audit on all blog posts and provide recommendations.

**Usage:**
- `/seo-audit` - Run complete SEO audit on all articles
- `/seo-audit [slug]` - Audit specific article only
- `/seo-audit --fix` - Auto-fix simple issues (future enhancement)

## SEO Checks

Run comprehensive SEO validation on all articles:

### 1. Title Optimization

For each article, check:
- ✓ Title length is 40-70 characters (ideal for search results)
- ⚠️ Warn if <40 chars (too short, not utilizing space)
- ⚠️ Warn if >70 chars (will be truncated in search results)
- ⚠️ Warn if title is ALL CAPS (poor readability)
- ⚠️ Warn if title lacks descriptive keywords
- ✓ Check for duplicate titles across all articles

**Recommendations:**
- Optimal: 50-60 characters
- Include primary keyword
- Make it compelling and specific

### 2. Description (Meta Description) Optimization

For each article, check:
- ✓ Description length is 120-160 characters (ideal for search snippets)
- ⚠️ Warn if <120 chars (too short, missing opportunity)
- ⚠️ Warn if >160 chars (will be truncated)
- ⚠️ Warn if description is just the title repeated
- ⚠️ Warn if description is too generic
- ✓ Check for duplicate descriptions across all articles

**Recommendations:**
- Optimal: 150-160 characters
- Include call-to-action
- Accurately summarize content
- Include target keywords

### 3. Tags Analysis

For each article, check:
- ✓ Has minimum 2 tags (recommended for categorization)
- ⚠️ Warn if only 1 tag (too narrow)
- ⚠️ Warn if >8 tags (dilutes focus)
- ✓ Check tags are lowercase and hyphenated
- ⚠️ Warn about potential tag issues:
  - Tags with spaces (should use hyphens)
  - Mixed case (should be lowercase)
  - Very similar tags ("react" and "reactjs")
  - Single-use tags (only on one article - might be typo)

**Recommendations:**
- Optimal: 3-5 tags per article
- Use consistent tag names
- Avoid overly specific tags

### 4. URL/Slug Optimization

For each article, check:
- ✓ Slug is URL-safe (lowercase, hyphens only)
- ✓ Slug length is reasonable (<50 chars)
- ⚠️ Warn if slug is very long (>50 chars)
- ⚠️ Warn if slug contains numbers (unless intentional like "top-10")
- ⚠️ Warn if slug doesn't match title keywords
- ✓ Check slug uniqueness (no duplicates)

**Recommendations:**
- Keep slugs short and descriptive
- Include primary keyword
- Avoid stop words (the, a, an, etc.)

### 5. Cover Image Validation

For each article, check:
- ✓ If coverImage specified, validate:
  - URL is well-formed
  - URL is accessible (basic check)
  - Recommended: Image dimensions 1200x630 (OG image standard)
- ⚠️ Warn if coverImage is empty (missing opportunity for social sharing)
- ⚠️ Warn if using external URL (should host locally for reliability)

**Recommendations:**
- Always include cover images
- Use 1200x630 for optimal social sharing
- Host images locally in /public

### 6. Content Quality Checks

For each article, check:
- ⚠️ Warn if article is very short (<300 words)
- ⚠️ Warn if article is extremely long (>5000 words - might need splitting)
- ✓ Check for heading structure:
  - Has at least 2 headings (proper structure)
  - No skipped heading levels (h2 → h4 without h3)
  - Only one h1 (title)
- ⚠️ Warn if no code blocks in tutorial/guide articles
- ✓ Check reading time is calculated

**Recommendations:**
- Optimal length: 800-2000 words for blog posts
- Use proper heading hierarchy
- Include code examples in technical posts

### 7. Bilingual SEO

For each article, check:
- ✓ Both EN and PT-BR versions exist
- ✓ Both versions have same length (within 20%)
- ⚠️ Warn if one version significantly shorter (incomplete translation)
- ✓ Both versions have matching:
  - Same number of headings
  - Same number of code blocks
  - Same featured/draft status

**Recommendations:**
- Keep translations comprehensive
- Don't skip sections in translation

### 8. Sitemap Validation

Check global sitemap:
- ✓ Verify `app/sitemap.ts` generates successfully
- ✓ All published articles (draft: false) appear in sitemap
- ✓ Both locales are represented
- ⚠️ Warn if draft articles are in sitemap
- ✓ Check lastModified dates are valid

### 9. RSS Feed Validation

Check RSS feeds:
- ✓ Verify `/feed.xml/route.ts` generates (EN feed)
- ✓ Verify `/pt-br/feed.xml/route.ts` generates (PT-BR feed)
- ✓ All published articles appear in appropriate feeds
- ✓ Feed descriptions match article descriptions
- ⚠️ Warn if feeds have errors

### 10. Open Graph (OG) Metadata

For each article, check:
- ✓ OG image generation works (`/og/[...slug]/route.tsx`)
- ✓ OG image would be 1200x630 pixels
- ⚠️ Warn if title is too long for OG display (>60 chars)
- ⚠️ Warn if description is too long for OG display (>200 chars)

## Report Format

Generate a comprehensive, actionable report:

```
🔍 SEO AUDIT REPORT
════════════════════════════════════════════════════

📊 OVERALL SCORE: 85/100

✅ EXCELLENT (3 articles):
  • welcome - Score: 95/100
  • building-this-blog - Score: 88/100

⚠️  NEEDS IMPROVEMENT (1 article):
  • code-examples - Score: 72/100

════════════════════════════════════════════════════

📝 DETAILED FINDINGS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Article: welcome
Score: 95/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Title: "Welcome to DevGiroux" (21 chars) ✓
✅ Description: 156 chars ✓
✅ Tags: 3 tags ✓
⚠️  Cover Image: Empty (consider adding)
✅ Both locales exist ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Article: code-examples
Score: 72/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Title: "Code Snippets and Examples" (27 chars - could be more descriptive)
❌ Description: TOO SHORT (45 chars) - recommend 120-160
✅ Tags: 5 tags ✓
⚠️  Missing PT-BR translation
❌ Content very short (250 words) - consider expanding

RECOMMENDATIONS:
1. Expand description to 120+ characters
2. Add PT-BR translation
3. Expand content to 500+ words
4. Add cover image

════════════════════════════════════════════════════

📊 CATEGORY BREAKDOWN

Titles:
  ✅ 2 optimal length
  ⚠️  1 too short

Descriptions:
  ✅ 2 optimal length
  ❌ 1 too short

Tags:
  ✅ All articles tagged properly
  ⚠️  Found 2 similar tags: "react" and "reactjs" (consider consolidating)

Translations:
  ✅ 2 fully translated
  ⚠️  1 missing translation

Images:
  ⚠️  0 articles with cover images
  💡 Recommendation: Add cover images for better social sharing

Content Quality:
  ✅ 2 comprehensive articles
  ⚠️  1 short article

════════════════════════════════════════════════════

🎯 QUICK WINS (Highest Impact)

1. Add cover images to all articles (impacts social sharing)
2. Expand "code-examples" description to 120+ chars
3. Translate missing articles
4. Consolidate similar tags ("react" vs "reactjs")

════════════════════════════════════════════════════

📈 NEXT STEPS

Priority 1 (Critical):
  • Fix description for: code-examples

Priority 2 (Important):
  • Add cover images
  • Complete translations

Priority 3 (Optimization):
  • Review tag consistency
  • Expand short articles

════════════════════════════════════════════════════

💡 PRO TIPS

• Optimal title length: 50-60 characters
• Optimal description: 150-160 characters
• Use 3-5 tags per article
• Always include cover images (1200x630px)
• Keep translations comprehensive and complete

Run /seo-audit [slug] --fix to auto-correct simple issues.
```

## Scoring System

Each article gets a score out of 100:

- **Title (20 points)**
  - 20: Perfect (40-70 chars, descriptive, unique)
  - 15: Good (slight issues)
  - 10: Needs work (too short/long)
  - 5: Poor (major issues)

- **Description (20 points)**
  - 20: Perfect (120-160 chars, compelling)
  - 15: Good (slight issues)
  - 10: Needs work (too short/long)
  - 5: Poor (major issues)

- **Tags (10 points)**
  - 10: Perfect (3-5 tags, well-chosen)
  - 7: Good (2 or 6-7 tags)
  - 5: Needs work (1 or 8+ tags)

- **Cover Image (10 points)**
  - 10: Has image
  - 0: No image

- **Translation (15 points)**
  - 15: Both locales, complete
  - 10: Both locales, one incomplete
  - 5: Only one locale
  - 0: Missing

- **Content Quality (15 points)**
  - 15: Great length, good structure
  - 10: Acceptable
  - 5: Too short or poor structure

- **Technical SEO (10 points)**
  - 10: Perfect (slug, headings, links)
  - 7: Good
  - 5: Needs work

**Overall Score:**
- 90-100: Excellent SEO
- 75-89: Good SEO
- 60-74: Needs improvement
- <60: Poor SEO, urgent fixes needed

## Error Handling

- If no articles found: "No articles to audit in content/posts/"
- If specific slug not found: "Article '{slug}' not found"
- If sitemap fails to generate: Show error with stack trace
- If RSS feed fails: Show specific feed error

## Integration

This command should:
- Read all articles using `lib/posts.ts` functions
- Check sitemap generation
- Validate RSS feeds exist and parse correctly
- Report on OG image generation capability

## Future Enhancement: --fix Flag

When implemented, `--fix` would:
- Truncate overly long titles/descriptions
- Expand short titles/descriptions with AI suggestions
- Normalize tag names (lowercase, hyphenated)
- Add placeholder cover images
- Alert about fixable vs manual issues
