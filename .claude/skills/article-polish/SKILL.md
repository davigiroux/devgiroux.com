---
name: article-polish
description: Polish and improve blog articles with targeted suggestions while preserving the author's voice. Use when improving article clarity, fixing grammar or typos, enhancing readability, checking structure, improving code examples, or refining content. Works with bilingual EN/PT-BR blog posts.
allowed-tools: Read, Edit, Glob, Grep
---

# Article Polish Skill

This skill helps improve blog articles through small, targeted suggestions while preserving the author's original tone and intent.

## When to Use This Skill

Activate this skill when the user wants to:
- Improve or polish an existing blog article
- Fix grammar, spelling, or typos
- Enhance readability and clarity
- Check article structure and formatting
- Improve code examples or documentation
- Get suggestions for article improvements
- Prepare an article for publication

## How This Skill Works

This skill analyzes articles across four dimensions:
1. **Grammar & Spelling** (EN and PT-BR)
2. **Readability & Clarity** (sentence structure, word choice)
3. **Structure & Formatting** (headings, MDX components, code blocks)
4. **Code Examples** (syntax, comments, best practices)

## Article Location and Structure

Articles are MDX files located at:
```
content/posts/YYYY/MM/[slug].[locale].mdx
```

Each article has:
- English version: `[slug].en.mdx`
- Portuguese version: `[slug].pt-BR.mdx`
- YAML frontmatter (title, date, description, tags, etc.)
- MDX content with custom components (Callout, YouTubeEmbed, code blocks)

## Operating Modes

### 1. Interactive Mode (Recommended)
Present each suggestion with:
- File and line number
- Current text with context
- Suggested improvement
- Explanation of why
- User approval (yes/no/skip/quit)

Apply changes immediately upon approval.

### 2. Review-Only Mode
Generate comprehensive report with:
- Categorized suggestions (Critical, High, Medium, Low)
- Quality metrics (readability scores, word counts)
- Cross-locale consistency checks
- Enhancement opportunities
- No changes made

### 3. Auto-Safe Mode
Automatically apply only high-confidence safe changes:
- Dictionary-based typo fixes
- Missing code block language tags
- Whitespace normalization
- Proper noun capitalization (Next.js, React, TypeScript, etc.)
- Broken markdown syntax

Leave subjective changes for user review.

## Analysis Process

### Step 1: Locate Article
- Ask for article slug if not provided
- Use `lib/posts.ts:getPostBySlug()` to verify it exists
- Check available locales with `getAvailableLocales()`
- Read both EN and PT-BR versions

### Step 2: Parse Content
- Parse frontmatter with `gray-matter`
- Extract MDX content
- Identify code blocks, headings, components

### Step 3: Run Analysis
Analyze for:

**Grammar & Spelling:**
- EN: American English spelling, grammar rules
- PT-BR: Brazilian Portuguese conventions, natural phrasing
- Technical term consistency (Next.js vs NextJS)
- Missing articles, verb tense issues
- Punctuation errors

**Readability:**
- Sentence length (warn >40 words)
- Paragraph length (ideal 3-4 sentences)
- Passive voice (warn >15%)
- Flesch reading ease score
- Unclear or confusing phrasing

**Structure:**
- Heading hierarchy (no skipped levels: h2→h4)
- Code blocks have language tags
- Proper use of MDX components (Callout types)
- Logical flow between sections
- Whitespace consistency

**Code Examples:**
- Syntax correctness
- Helpful comments (explain WHY not just WHAT)
- Best practices
- Complete, runnable examples
- No deprecated APIs

**Cross-locale Consistency:**
- Same heading count
- Same code block count
- Same callout placements
- Frontmatter consistency
- Word count variance <10% (ideal)

### Step 4: Categorize by Priority

**🔴 Critical (Must Fix):**
- Broken MDX syntax
- Invalid code examples
- Broken internal links
- Malformed frontmatter

**🟡 High (Strongly Recommended):**
- Grammar/spelling errors
- Missing code block language tags
- Confusing sentences
- Poor heading hierarchy
- Awkward PT-BR translations

**🟠 Medium (Recommended):**
- Long sentences (>40 words)
- Better word choices
- Flow improvements
- Missing code comments
- Passive voice overuse

**🟢 Low (Optional):**
- Style preferences
- Alternative phrasings
- Enhancement ideas
- Additional cross-references

### Step 5: Present Suggestions
Format suggestions based on chosen mode:
- Interactive: One-by-one with approval prompts
- Review: Full categorized report
- Auto-safe: Apply safe changes, report what was done

### Step 6: Apply Changes
For approved changes:
- Use Edit tool for precise replacements
- Track modifications per file
- Never modify frontmatter without explicit approval
- Preserve MDX components and syntax

## Safety Rules

**What CAN be auto-applied (--auto-safe only):**
- Dictionary typos (confidence >95%)
- Missing code language tags
- Trailing whitespace removal
- Obvious punctuation fixes
- Proper noun capitalization

**What REQUIRES approval:**
- Sentence rewrites
- Word choice changes
- Paragraph restructuring
- Heading level changes
- Adding/removing content
- Code modifications
- Translation improvements

**What to NEVER change:**
- Author's voice and style
- Working code logic
- Personal stories/anecdotes
- Correctly working links
- Technical accuracy

## Author's Voice Guidelines

This section defines the author's established voice based on collaborative tone refinement sessions. **Always reference these guidelines when analyzing articles.**

### Reference Article
The article `/content/posts/2026/01/what-made-me-create-this-blog.{en,pt-BR}.mdx` represents the author's refined authentic voice after collaborative tone adjustment. Use it as a tone exemplar.

### Core Voice Characteristics

**✅ DO:**
- Use conversational but not forced language
- Strategic use of emotional markers (avoid overuse)
- Direct reader address ("you", "let me", "let's")
- Show vulnerability naturally ("scary", "I always end up forgetting")
- Prefer simplicity over adverb-heavy language
- Use natural phrasing over literal translations

**❌ DON'T:**
- Use "Look," as an opener (not the author's natural voice)
- Overuse "honestly" (max 1-2 times per article)
- Add excessive "genuinely", "really", "very" modifiers
- Create forced conversational markers
- Use overly formal academic language

### English-Specific Patterns

**Good Examples:**
- "So, I finally decided..." (casual opener)
- "First, I really want to..." (direct, personal)
- "I'm (still) building..." (parenthetical adds nuance)
- "I've built so many solutions..." (emphasizes creation)
- "And I always end up forgetting!" (natural flow)
- "I'm passionate about..." (simple, direct)
- "it's been a blast" (casual, energetic)

**Avoid:**
- "The decision to create..." (too formal)
- "One of the primary motivations is the desire to..." (essay-like)
- "I'm genuinely passionate..." (unnecessary adverb)
- "Look, I'm building..." (not authentic voice)

### Brazilian Portuguese-Specific Patterns

**Natural Phrasing:**
- Use "pra" instead of "para" for casual tone
- "momento louco" over "momento selvagem" (more natural)
- "bem" + adjective ("bem divertido") over adverb
- "acabo + gerund" for flow ("acabo esquecendo" vs "esqueço")
- Parenthetical asides like "(ainda)" add conversational nuance
- "Vou listá-las pra você" (casual Brazilian)

**Example Transformations:**
```
❌ Formal: "selvagem momento" (literal translation)
✅ Natural: "momento louco"

❌ Stiff: "genuinamente apaixonado"
✅ Better: "apaixonado" (simpler)

❌ Literal: "Peguei tantas soluções"
✅ Creation focus: "Construí tantas soluções"
```

### Cross-Language Consistency

While both languages should feel natural:
- EN and PT-BR should match in emotional beats
- Don't translate word-for-word; adapt for natural flow
- PT-BR can be slightly more informal ("pra" vs "para")
- Both should show same level of vulnerability and enthusiasm

### When Suggesting Changes

**High Priority (Suggest):**
- Overly formal language → conversational
- Adverb overload → simpler phrasing
- Essay-like openers → direct, personal
- Literal PT-BR translations → natural Brazilian phrasing

**Low Priority (Usually Skip):**
- Author's established casual phrases
- Personal storytelling style
- Specific word choices that feel authentic
- Working conversational patterns

### Quality Check

Before suggesting a change, ask:
1. Does this preserve the author's authentic voice?
2. Is this making it more conversational without being forced?
3. Would the author naturally say this?
4. Am I removing necessary emotional markers or adding too many?

## Output Format

### Interactive Session
```
🎨 POLISHING ARTICLE: [slug]
════════════════════════════════════════════════════════════════

Running analysis...
  ✓ Reading EN version (X words)
  ✓ Reading PT-BR version (X words)
  ✓ Analyzing grammar and spelling
  ✓ Checking structure and flow
  ✓ Validating code examples
  ✓ Cross-locale consistency check

Found N suggestions (X critical, X high, X medium, X low)

════════════════════════════════════════════════════════════════

SUGGESTION 1 of N [PRIORITY] - Category

File: [slug].[locale].mdx
Line: XX

Current:
  │ [original text]

Suggested:
  │ [improved text]

Reason: [explanation]

Apply this change? [y/n/s/q]: _
```

### Review Report
```
🎨 ARTICLE POLISH REPORT
════════════════════════════════════════════════════════════════

Article: "[title]"
Slug: [slug]
Overall quality score: X/10

[Summary statistics]
[Categorized issues by priority]
[Quality metrics]
[Enhancement opportunities]
[Recommended next steps]
```

## Integration Points

**Use existing library functions:**
- `lib/posts.ts:getPostBySlug(slug, locale)` - Fetch article
- `lib/posts.ts:getAvailableLocales(slug)` - Check locales
- `lib/posts.ts:getAllBaseSlugs()` - List available articles

**After polishing, suggest:**
- `/validate-posts` - Verify no issues introduced
- `/seo-audit [slug]` - Check SEO if significant changes
- `/publish [slug]` - If article is ready for publication

## Examples

### Example 1: User asks to improve article
```
User: "Can you improve the article I just wrote about React hooks?"
Claude: "I can use the article-polish skill to analyze and improve your article.
         Would you like me to proceed?"
User: "Yes"
Claude: [Activates skill, analyzes article, presents suggestions interactively]
```

### Example 2: User mentions grammar issues
```
User: "I think there might be some typos in my building-this-blog article"
Claude: "I can use the article-polish skill to check for typos and grammar issues.
         Should I proceed?"
User: "Yes, but just auto-fix the obvious ones"
Claude: [Activates skill in auto-safe mode, fixes typos, reports changes]
```

### Example 3: User asks to check structure
```
User: "Is the structure of my welcome article okay?"
Claude: "I can use the article-polish skill to review the article structure.
         Would you like a full report?"
User: "Yes, review only please"
Claude: [Activates skill in review mode, generates report]
```

## Additional Resources

For comprehensive analysis guidelines, see:
- [PRIORITIES.md](PRIORITIES.md) - Priority classification rules
- [EXAMPLES.md](EXAMPLES.md) - Before/after improvement examples

## Notes

- This skill respects the author's voice and makes only targeted improvements
- Bilingual support: Analyzes both EN and PT-BR versions
- Safe by default: Never overwrites without approval
- Integrates with existing blog workflow (validate → polish → audit → publish)
