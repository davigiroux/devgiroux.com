Polish and improve blog articles with targeted suggestions while preserving your voice and intent.

**Slug:** $ARGUMENTS

## Usage Examples

```bash
# Interactive mode (default) - review and apply suggestions one-by-one
/polish-article building-this-blog
/polish-article my-article --interactive

# Review-only - generate report without making changes
/polish-article my-article --review

# Auto-apply safe changes only (typos, syntax fixes)
/polish-article my-article --auto-safe

# Polish specific locale only
/polish-article my-article --locale en
/polish-article my-article --locale pt-BR

# Focus on specific aspects
/polish-article my-article --grammar-only
/polish-article my-article --structure-only
/polish-article my-article --code-only

# Combine flags
/polish-article my-article --locale pt-BR --interactive
/polish-article my-article --auto-safe --verbose
```

## Available Flags

Parse these optional flags from $ARGUMENTS:

**Mode flags:**
- `--interactive` / `-i` - Interactive approval mode (default)
- `--review` - Review-only, generate report without changes
- `--auto-safe` - Auto-apply only safe changes (typos, syntax fixes)

**Scope flags:**
- `--locale [en|pt-BR]` - Analyze specific locale only
- `--grammar-only` - Only grammar and spelling checks
- `--structure-only` - Only heading hierarchy and flow
- `--code-only` - Only code examples and syntax
- `--no-cross-locale` - Skip cross-locale consistency checks

**Output flags:**
- `--verbose` / `-v` - Show detailed explanations
- `--quiet` / `-q` - Minimal output (errors only)
- `--json` - Output in JSON format

## Tasks:

1. **Parse flags** from $ARGUMENTS:
   - Extract article slug (text before any --)
   - Extract all flags and their values
   - Store configuration: mode, scope, output preferences
   - Default mode: interactive

2. **Validate article exists**:
   - Use `lib/posts.ts:getPostBySlug(slug, 'en')` to verify article exists
   - Check both locales using `lib/posts.ts:getAvailableLocales(slug)`
   - If article not found:
     - Error: "Article '[slug]' not found. Check available articles with /draft-manager --list"
     - Exit early
   - If --locale flag specified and that locale doesn't exist:
     - Error: "Locale [locale] not found for article '[slug]'"
     - Exit early

3. **Read article content**:
   - Read EN version: `content/posts/YYYY/MM/[slug].en.mdx`
   - Read PT-BR version: `content/posts/YYYY/MM/[slug].pt-BR.mdx` (unless --locale en)
   - Parse frontmatter using `gray-matter`
   - Extract content (without frontmatter)
   - Store file paths for later editing

4. **Run Analysis Engine**:
   Perform comprehensive analysis on specified locale(s). Categorize findings into priorities: Critical, High, Medium, Low.

   **Grammar & Spelling Analysis:**
   - **English version:**
     - Check for common typos using American English spelling
     - Identify missing articles (a, an, the)
     - Check verb tense agreement
     - Identify punctuation issues
     - Check for common grammar mistakes
     - Verify proper noun capitalization (Next.js, React, TypeScript, JavaScript, etc.)
     - Flag inconsistent terminology (Next.js vs NextJS vs next.js)

   - **Portuguese version (PT-BR):**
     - Check for Brazilian Portuguese spelling and grammar
     - Identify awkward translations (literal translations that don't sound natural)
     - Check verb conjugation
     - Verify proper use of articles and prepositions
     - Check for common PT-BR grammar mistakes
     - Ensure natural phrasing

   **Readability & Clarity Analysis:**
   - Calculate readability metrics:
     - Flesch reading ease score
     - Average sentence length (flag if >40 words)
     - Average paragraph length (ideal: 3-4 sentences)
     - Passive voice percentage (warn if >15%)
   - Identify unclear or confusing sentences
   - Flag overly complex sentence structures
   - Suggest better word choices for clarity
   - Check paragraph flow and transitions
   - Identify missing or weak transitions between sections

   **Structure & Formatting Analysis:**
   - Verify heading hierarchy:
     - No skipped levels (h2 → h4 without h3)
     - Logical progression
     - Proper nesting
   - Check for introduction and conclusion sections
   - Validate MDX component usage:
     - `<Callout type="info|tip|warning">` placement
     - Appropriate use of each Callout type
     - `<YouTubeEmbed>` syntax correctness
   - Verify code blocks have language tags:
     ```typescript  ← language tag present
     ```javascript  ← language tag present
     ```          ← missing language tag (flag as HIGH priority)
   - Check list formatting consistency (bullet vs numbered)
   - Identify whitespace issues (excessive blank lines, trailing spaces)
   - Check for internal linking opportunities

   **Code Example Analysis:**
   - Verify syntax highlighting compatibility
   - Check code syntax correctness
   - Evaluate code comments:
     - Are they helpful?
     - Do they explain WHY, not just WHAT?
   - Verify examples are complete and runnable
   - Check for best practices
   - Identify deprecated APIs or patterns
   - Ensure code examples match article language (don't suggest changing working code)

   **Cross-locale Consistency** (unless --no-cross-locale):
   - Compare heading count (should be same)
   - Compare code block count (should be same)
   - Compare Callout placements (should be same)
   - Verify frontmatter consistency:
     - Same tags (tags stay in English)
     - Same date
     - Same draft/featured status
     - Same coverImage
   - Check word count variance:
     - Calculate percentage difference
     - Warn if >10% (may indicate incomplete translation)
   - Verify translation completeness

5. **Categorize and Prioritize Suggestions**:

   Group all findings into priority levels:

   **🔴 Critical (Must Fix):**
   - Broken MDX syntax (unclosed tags, invalid JSX)
   - Invalid code examples (syntax errors)
   - Broken internal links
   - Missing or malformed frontmatter required fields
   - Severe grammar errors that change meaning

   **🟡 High (Strongly Recommended):**
   - Grammar and spelling errors
   - Missing code block language tags
   - Confusing or unclear sentences
   - Poor heading hierarchy (skipped levels)
   - Misused MDX components
   - Inconsistent terminology
   - Awkward PT-BR translations

   **🟠 Medium (Recommended):**
   - Readability improvements (long sentences)
   - Better word choices
   - Flow improvements between sections
   - Missing code comments
   - Table formatting
   - Additional Callout suggestions
   - Passive voice overuse

   **🟢 Low (Optional/Stylistic):**
   - Style preferences
   - Alternative phrasings
   - Enhanced examples
   - Additional cross-references
   - Cover image suggestions
   - Minor formatting tweaks

6. **Determine Safe vs Requires Approval**:

   For each suggestion, classify as "safe" or "needs approval":

   **Safe for auto-apply** (confidence >95%, only with --auto-safe flag):
   - Dictionary-based typo fixes (common misspellings)
   - Missing code block language tags
   - Whitespace normalization (remove trailing spaces, standardize blank lines)
   - Broken markdown syntax (unclosed tags, malformed lists)
   - Proper noun capitalization (Next.js, React, TypeScript, JavaScript, Python, etc.)
   - Obvious punctuation fixes

   **Always requires approval:**
   - Sentence rewrites or restructuring
   - Word choice changes (even if better)
   - Paragraph reorganization
   - Heading level changes
   - Adding or removing content
   - Modifying code examples
   - Translation improvements
   - Any stylistic changes

7. **Present Based on Mode**:

   **Interactive Mode** (default or --interactive):

   Show progress:
   ```
   🎨 POLISHING ARTICLE: [slug]
   ════════════════════════════════════════════════════════════════

   Running analysis...
     ✓ Reading EN version ([word count] words)
     ✓ Reading PT-BR version ([word count] words)
     ✓ Analyzing grammar and spelling
     ✓ Checking structure and flow
     ✓ Validating code examples
     ✓ Cross-locale consistency check

   Found [N] suggestions ([critical] critical, [high] high, [medium] medium, [low] low)

   ════════════════════════════════════════════════════════════════
   ```

   For each suggestion in priority order:
   ```
   SUGGESTION [X] of [N] [PRIORITY] - [Category]

   File: [slug].[locale].mdx
   Line: [number]

   Current:
     │ [original text with context]

   Suggested:
     │ [improved text]

   Reason: [explanation of why this improves the article]

   Apply this change? [y/n/s/q] (y=yes, n=no, s=skip remaining, q=quit): _
   ```

   - Present Critical priority first, then High, then Medium, then Low
   - Show 2-3 lines of context around the change
   - Wait for user input: y/n/s/q
   - Keep running count: "Applied X of N suggestions"
   - After all suggestions or quit:
     - Show summary of changes applied
     - List modified files
     - Suggest next steps

   **Review Mode** (--review):

   Generate comprehensive report without making changes:
   ```
   🎨 ARTICLE POLISH REPORT
   ════════════════════════════════════════════════════════════════

   Article: "[title]"
   Slug: [slug]
   Locales analyzed: [EN ✓, PT-BR ✓]
   Overall quality score: [score]/10

   ════════════════════════════════════════════════════════════════
   📊 SUMMARY
   ════════════════════════════════════════════════════════════════

   Analyzed:
     • Content: [word count] words (EN), [word count] words (PT-BR)
     • Structure: [N] headings, [hierarchy status]
     • Code blocks: [N] ([with/without tags status])
     • Custom components: [N] Callouts, [N] YouTube embeds
     • Internal links: [N] (all valid ✓ / [N] broken)

   Issues found:
     🔴 Critical: [count]
     🟡 High: [count]
     🟠 Medium: [count]
     🟢 Low: [count]

   ═══════════════════════════════════════════════════════════════
   🔴 CRITICAL ISSUES ([count])
   ═══════════════════════════════════════════════════════════════

   [List each critical issue with line numbers, current/suggested, reason]

   ═══════════════════════════════════════════════════════════════
   🟡 HIGH PRIORITY ([count])
   ═══════════════════════════════════════════════════════════════

   [List each high priority issue...]

   [Continue for MEDIUM and LOW priorities...]

   ═══════════════════════════════════════════════════════════════
   📋 CROSS-LOCALE CONSISTENCY
   ═══════════════════════════════════════════════════════════════

   ✓ Same number of headings ([N])
   ✓ Same number of code blocks ([N])
   ⚠️ Word count difference: [X]% (acceptable <10%)
   [etc.]

   ═══════════════════════════════════════════════════════════════
   ✨ ENHANCEMENT OPPORTUNITIES
   ═══════════════════════════════════════════════════════════════

   [Suggest improvements like cover image, additional callouts, internal links]

   ═══════════════════════════════════════════════════════════════
   📊 QUALITY METRICS
   ═══════════════════════════════════════════════════════════════

   EN Version:
     • Readability (Flesch): [score] ([interpretation])
     • Avg sentence length: [N] words ([Good/Too long])
     • Avg paragraph length: [N] sentences ([status])
     • Passive voice: [X]% ([status])

   PT-BR Version:
     • Readability: [score] ([interpretation])
     • Translation quality: [Natural/Needs work]

   ═══════════════════════════════════════════════════════════════
   🎯 NEXT STEPS
   ═══════════════════════════════════════════════════════════════

   Recommended actions:
   1. Fix [N] critical issues
   2. Review [N] high-priority suggestions
   3. Consider [N] enhancement opportunities

   Quick apply:
     /polish-article [slug] --interactive
     /polish-article [slug] --auto-safe
   ```

   **Auto-safe Mode** (--auto-safe):

   - Apply only safe changes automatically
   - Show progress indicators
   - Generate summary:
   ```
   ✅ AUTO-APPLIED SAFE CHANGES
   ════════════════════════════════════════════════════════════════

   Files modified:
     • [slug].en.mdx ([N] changes)
     • [slug].pt-BR.mdx ([N] changes)

   Changes applied:
     ✓ Fixed [N] typos
     ✓ Added [N] missing code block language tags
     ✓ Standardized whitespace ([N] locations)
     ✓ Capitalized proper nouns ([N] locations)

   Remaining suggestions (require review):
     • [N] high priority
     • [N] medium priority
     • [N] low priority

   Run '/polish-article [slug] --interactive' to review remaining suggestions.
   ════════════════════════════════════════════════════════════════
   ```

8. **Apply Changes** (interactive and auto-safe modes):
   - For each approved change:
     - Use Edit tool to make precise replacements
     - Track which file and line was modified
     - Handle multi-line changes carefully
   - Never modify frontmatter (except obvious errors with user approval)
   - Preserve all MDX components and syntax
   - Maintain existing formatting style

9. **Generate Summary**:
   ```
   ════════════════════════════════════════════════════════════════
   ✅ POLISHING COMPLETE
   ════════════════════════════════════════════════════════════════

   Changes applied: [X]/[N]
     ✓ Critical: [X]/[N]
     ✓ High priority: [X]/[N]
     ✓ Medium priority: [X]/[N]
     ✓ Low priority: [X]/[N]

   Files modified:
     • content/posts/YYYY/MM/[slug].en.mdx
     • content/posts/YYYY/MM/[slug].pt-BR.mdx

   Next steps:
     1. Review changes: git diff content/posts/YYYY/MM/[slug].*
     2. Validate: /validate-posts
     3. Check SEO: /seo-audit [slug]
     4. Commit: git add . && git commit -m "polish: improve [slug] article"

   ════════════════════════════════════════════════════════════════
   ```

## Guidelines

**Preserve Author's Voice:**
- NEVER rewrite extensively
- Keep informal language, humor, personal anecdotes
- Respect writing style preferences
- Only suggest changes that improve clarity or correctness
- When in doubt, ask rather than change
- **Reference:** See `.claude/skills/article-polish/SKILL.md` "Author's Voice Guidelines" for comprehensive tone patterns
- **Exemplar Article:** `/content/posts/2026/01/what-made-me-create-this-blog.{en,pt-BR}.mdx` represents the author's refined voice
- **Key Voice Rules:**
  - Avoid "Look," and excessive "honestly" (max 1-2 per article)
  - Prefer simple language over adverb-heavy ("passionate" vs "genuinely passionate")
  - Use natural Brazilian phrasing in PT-BR ("pra" not "para", "louco" not "selvagem")
  - Keep author's established casual phrases (e.g., "it's been a blast")

**Safe Changes (for --auto-safe):**
- Must have >95% confidence
- Must affect <3 lines
- Must be objective improvements (typos, syntax)
- Never subjective (style, word choice, tone)

**Grammar & Spelling:**
- EN: American English spelling (color, not colour)
- PT-BR: Brazilian Portuguese conventions
- Technical terms: Use industry-standard capitalization
  - ✓ Next.js, React, TypeScript, JavaScript, Python, Node.js
  - ✗ NextJS, next.js, Typescript, Javascript, python

**Readability Thresholds:**
- Sentence length: Warn >40 words
- Paragraph length: Ideal 3-4 sentences, warn >6
- Passive voice: Warn >15%
- Reading level: Target college level (Flesch 60-70)

**Structure Rules:**
- Heading hierarchy: No skipped levels
- Every article should have:
  - Introduction (explicit or implicit)
  - Main content sections
  - Conclusion (optional for short posts)
- Code blocks: Always suggest adding language tags
- Callouts: Only suggest where genuinely helpful

**Cross-locale Consistency:**
- Headings: Same count and structure
- Code blocks: Same count and placement
- Callouts: Same count and placement
- Frontmatter: Identical except title/description
- Tags: Always in English, same for both locales
- Word count variance: <10% ideal, warn >15%

**What NOT to Change:**
- Working code (even if style differs)
- Technical accuracy (never "improve" correct info to be wrong)
- Frontmatter metadata (unless fixing obvious errors)
- Personal stories or anecdotes
- Author's unique voice or style
- Correctly working internal links

**Priority Assignment:**
- Critical: Only for breaking issues
- High: Clear errors or significant clarity problems
- Medium: Nice-to-have improvements
- Low: Purely stylistic or optional

## Error Handling

- **Missing article**: "Error: Article '[slug]' not found. Use /draft-manager --list to see available articles."
- **Missing locale**: "Error: Locale [locale] not found for article '[slug]'. Available: [list]"
- **Invalid flag**: "Warning: Unknown flag '[flag]' ignored. See /polish-article --help"
- **Parse error**: "Error: Could not parse [file]. Check MDX syntax with /validate-posts"
- **No suggestions**: "✨ Article is already polished! No suggestions found."
- **User quit**: "Polishing cancelled. Applied [X] of [N] suggestions."

## Integration with Other Commands

**Before polishing:**
- Article should exist (created via /new-article or manually)
- Can be draft or published
- Optionally run /validate-posts first to catch structural issues

**After polishing:**
- **Always suggest**: `/validate-posts` - Verify no issues introduced
- **If significant changes**: `/seo-audit [slug]` - Re-check SEO optimization
- **If article is ready**: `/publish [slug]` - Publish the article
- **If only one locale polished**: `/polish-article [slug] --locale [other]` - Polish the other locale

**Workflow integration:**
```
Create → Write → Polish → Validate → SEO Audit → Publish
  ↓        ↓       ↓         ↓           ↓          ↓
/new    [edit]  /polish  /validate  /seo-audit  /publish
```

**Complementary skills:**
- `/validate-posts` - Structural validation (run before or after)
- `/seo-audit [slug]` - SEO optimization (run after polishing)
- `/translate [slug]` - Create/update translations (polish each locale separately)
- `/draft-manager --list` - Find articles to polish
- `/publish [slug]` - Publish polished article
