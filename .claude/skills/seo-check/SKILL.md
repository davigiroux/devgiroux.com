---
name: seo-check
description: Perform SEO audit on blog posts and provide optimization recommendations. Use when checking SEO, optimizing articles for search engines, improving discoverability, checking meta descriptions, or preparing articles for publication. Scores articles 0-100 and provides actionable recommendations.
allowed-tools: Read, Glob, Grep
---

# SEO Check Skill

This skill performs comprehensive SEO audits on blog posts and provides scored recommendations for optimization.

## When to Use This Skill

Activate this skill when the user:
- Asks about SEO or search engine optimization
- Wants to optimize articles for search
- Mentions "visibility", "ranking", "search results"
- Prepares article for publication
- Asks "how's my SEO", "is this optimized", "will people find this"
- Mentions meta descriptions, titles, or discoverability

## What This Skill Checks

### 1. Title Optimization
- Length: 40-70 characters (ideal for search results)
- Includes primary keyword
- Compelling and specific
- Not ALL CAPS
- Unique across all articles

**Scoring:**
- Perfect (10/10): 50-60 chars, keyword-rich, unique
- Good (7-9/10): 40-70 chars, has keywords
- Fair (4-6/10): <40 or >70 chars
- Poor (0-3/10): Too short, generic, or duplicate

### 2. Description (Meta) Optimization
- Length: 120-160 characters (ideal for snippets)
- Includes call-to-action
- Accurately summarizes content
- Includes target keywords
- Unique, not just title repeated

**Scoring:**
- Perfect (10/10): 150-160 chars, CTA, keywords, unique
- Good (7-9/10): 120-160 chars, descriptive
- Fair (4-6/10): <120 or >160 chars
- Poor (0-3/10): Too short, generic, or duplicate

### 3. Tags Analysis
- Count: 2-5 tags optimal
- Lowercase and hyphenated
- Consistent across blog
- Not too specific (single-use tags)
- Not too many (dilutes focus)

**Scoring:**
- Perfect (10/10): 3-5 tags, consistent, relevant
- Good (7-9/10): 2-8 tags, mostly consistent
- Fair (4-6/10): 1 tag or >8 tags
- Poor (0-3/10): No tags or inconsistent format

### 4. URL/Slug Optimization
- Length: <50 characters
- Includes keywords
- URL-safe (lowercase, hyphens)
- Descriptive and readable

**Scoring:**
- Perfect (10/10): <30 chars, keyword-rich, readable
- Good (7-9/10): <50 chars, includes keywords
- Fair (4-6/10): >50 chars or lacks keywords
- Poor (0-3/10): Very long or non-descriptive

### 5. Content Quality Indicators
- Word count: 800+ words ideal for SEO
- Heading structure: Proper H2-H6 hierarchy
- Internal links: 2-5 links to other articles
- Code examples: Well-documented
- Readability: Flesch score 60-70

**Scoring:**
- Perfect (10/10): 1000+ words, great structure, links
- Good (7-9/10): 500+ words, good headings
- Fair (4-6/10): 300-500 words
- Poor (0-3/10): <300 words, no structure

### 6. Cover Image
- Has cover image (better social sharing)
- Image URL valid
- Image accessible

**Scoring:**
- Perfect (10/10): Has valid cover image
- Good (5-7/10): Has image but validation issues
- Poor (0/10): No cover image

### 7. Bilingual SEO (Cross-locale)
- Both locales optimized equally
- Consistent tags
- Both have meta descriptions
- Hreflang implied by structure

**Scoring:**
- Perfect (10/10): Both locales fully optimized
- Good (7-9/10): Both exist, minor differences
- Fair (4-6/10): One locale missing or incomplete
- Poor (0-3/10): Only one locale or poor quality

## Instructions

### Step 1: Determine Scope
- Single article audit? → Get slug
- Full site audit? → Analyze all articles
- Recent articles? → Filter by date

### Step 2: Read Articles
For each article to audit:
1. Read EN version
2. Read PT-BR version (if exists)
3. Parse frontmatter
4. Extract content for analysis

### Step 3: Run SEO Analysis
For each article, analyze:

**Title Check:**
- Length in characters
- Keyword presence (based on slug/tags)
- Uniqueness (compare to other titles)
- Readability (not ALL CAPS, well-formatted)
- Score 0-10

**Description Check:**
- Length in characters
- Keyword inclusion
- Call-to-action present
- Uniqueness
- Score 0-10

**Tags Check:**
- Count tags
- Format validation (lowercase, hyphens)
- Consistency check (compare to other articles)
- Relevance
- Score 0-10

**Slug Check:**
- Length
- Keyword presence
- Readability
- URL-safe format
- Score 0-10

**Content Quality:**
- Word count
- Heading count and hierarchy
- Internal link count
- Code block count and quality
- Score 0-10

**Cover Image:**
- Exists?
- Valid URL?
- Score 0-10

**Bilingual:**
- Both locales optimized
- Consistency across locales
- Score 0-10

### Step 4: Calculate Overall Score
```
Total Score = (Title + Description + Tags + Slug + Content + Image + Bilingual) / 7 * 10

Score ranges:
90-100: Excellent ⭐⭐⭐⭐⭐
75-89:  Good ⭐⭐⭐⭐
60-74:  Fair ⭐⭐⭐
45-59:  Needs Work ⭐⭐
0-44:   Poor ⭐
```

### Step 5: Generate Recommendations
Prioritize recommendations:

**Quick Wins** (easy, high impact):
- Extend short descriptions
- Shorten long titles
- Add missing cover image
- Fix tag formatting

**High Priority** (important for SEO):
- Improve title keyword usage
- Write compelling descriptions
- Add internal links
- Improve heading structure

**Medium Priority** (nice to have):
- Optimize tag selection
- Increase word count
- Add more examples

**Low Priority** (minor improvements):
- Fine-tune description length
- Consider alternative keywords

### Step 6: Present SEO Report

```
🔍 SEO AUDIT REPORT
════════════════════════════════════════════════════════════════

Article: "[title]"
Slug: [slug]
Overall SEO Score: XX/100 ⭐⭐⭐⭐

════════════════════════════════════════════════════════════════
📊 SCORE BREAKDOWN
════════════════════════════════════════════════════════════════

Title Optimization:        X/10 ⭐⭐⭐⭐
Description Optimization:  X/10 ⭐⭐⭐⭐
Tags:                      X/10 ⭐⭐⭐
URL/Slug:                  X/10 ⭐⭐⭐⭐
Content Quality:           X/10 ⭐⭐⭐⭐
Cover Image:               X/10 ⭐⭐
Bilingual SEO:             X/10 ⭐⭐⭐⭐

════════════════════════════════════════════════════════════════
✅ STRENGTHS
════════════════════════════════════════════════════════════════

• Well-optimized title (55 chars, includes keywords)
• Excellent description (158 chars, clear CTA)
• Good content length (1,200 words)
• [other strengths]

════════════════════════════════════════════════════════════════
⚡ QUICK WINS (Easy, High Impact)
════════════════════════════════════════════════════════════════

1. Add cover image (improves social sharing)
   Suggestion: Screenshot or diagram related to topic

2. Add 2 internal links to related articles
   Suggestion: Link to [related-article-1] and [related-article-2]

════════════════════════════════════════════════════════════════
🎯 PRIORITY RECOMMENDATIONS
════════════════════════════════════════════════════════════════

1. Title: Shorten by 15 characters (currently 85, target 50-70)
   Current: [long title]
   Suggested: [shortened version]

2. Description: Extend by 30 characters (currently 90, target 120-160)
   Current: [short description]
   Suggested: [extended with keywords]

3. Tags: Reduce from 9 to 5 tags (focus is diluted)
   Keep: [main tags]
   Remove: [less relevant tags]

════════════════════════════════════════════════════════════════
💡 ADDITIONAL RECOMMENDATIONS
════════════════════════════════════════════════════════════════

• Consider adding more headings (only 3 H2s found)
• Word count could be increased to 1000+ for better SEO
• [other suggestions]

════════════════════════════════════════════════════════════════
📈 COMPETITIVE ANALYSIS
════════════════════════════════════════════════════════════════

Compared to your other articles:
• Title length: Better than 70% of articles
• Description: Average
• Tags: Below average (too many tags)
• Content length: Above average

════════════════════════════════════════════════════════════════
🎯 NEXT STEPS
════════════════════════════════════════════════════════════════

1. Implement quick wins (5 min)
2. Address priority recommendations (15 min)
3. Re-run audit: /seo-audit [slug]
4. If score >85, ready to publish: /publish [slug]

════════════════════════════════════════════════════════════════
```

## SEO Best Practices

### Title Best Practices
- 50-60 characters optimal
- Front-load important keywords
- Make it compelling (users must want to click)
- Avoid clickbait
- Unique and descriptive

### Description Best Practices
- 150-160 characters optimal (use full space)
- Include primary keyword naturally
- Add call-to-action (Learn how, Discover, See how)
- Accurately summarize content
- Unique for each article

### Tags Best Practices
- 3-5 tags optimal
- Mix broad and specific
- Use consistently across articles
- Research what users search for
- Avoid over-tagging

### Content Best Practices
- 800-1500 words for technical posts
- Clear heading hierarchy (H2 → H3 → H4)
- 2-5 internal links to related content
- Code examples with explanations
- Scannable (lists, short paragraphs)

## Example Interactions

### Example 1: User prepares to publish
```
User: I'm about to publish my article. Is it optimized for SEO?
Claude: I can run an SEO check on your article to see how well it's
        optimized. Would you like me to audit it?
User: Yes
Claude: [Runs SEO audit, shows score 72/100, provides recommendations]
```

### Example 2: User asks about discoverability
```
User: Will people be able to find my blog post on search engines?
Claude: I can use the seo-check skill to analyze how discoverable your
        article is. Should I check it?
User: Please do
Claude: [Analyzes SEO factors, shows areas for improvement]
```

### Example 3: After writing article
```
User: I finished writing about React hooks
Claude: Great! Would you like me to check the SEO optimization before
        you publish?
User: Sure
Claude: [Runs SEO audit automatically]
```

## Integration Points

After SEO audit:
- If score <75: Suggest `/polish-article [slug]` to improve content
- If score 75-89: Suggest specific improvements from report
- If score >90: Article ready for `/publish [slug]`
- Always suggest `/validate-posts` to ensure no errors

Complements:
- `/seo-audit` slash command (explicit invocation)
- `article-polish` skill (content quality)
- `article-validation` skill (structural correctness)

## Notes

- Read-only skill (doesn't modify articles)
- Provides actionable, prioritized recommendations
- Scoring helps track improvements over time
- Considers both EN and PT-BR for bilingual blogs
- Quick wins identified for fast improvements
