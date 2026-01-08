# Before/After Improvement Examples

This document shows concrete examples of improvements the article-polish skill makes.

## Grammar & Spelling Examples

### Example 1: Missing Article
```diff
BEFORE:
Building personal blog is a rite of passage for developers.

AFTER:
Building a personal blog is a rite of passage for developers.

CATEGORY: High Priority - Grammar
REASON: Missing indefinite article "a"
```

### Example 2: Verb Tense Error
```diff
BEFORE:
Yesterday I implement the search functionality.

AFTER:
Yesterday I implemented the search functionality.

CATEGORY: High Priority - Grammar
REASON: Past tense required for "yesterday"
```

### Example 3: Inconsistent Technical Terms
```diff
BEFORE:
I built this blog with NextJS 15. The next.js framework provides...

AFTER:
I built this blog with Next.js 15. The Next.js framework provides...

CATEGORY: High Priority - Consistency
REASON: Brand name should be consistently "Next.js"
```

### Example 4: Common Typo
```diff
BEFORE:
This recieve function handles the response.

AFTER:
This receive function handles the response.

CATEGORY: High Priority - Spelling
AUTO-SAFE: Yes (confidence: 99%)
```

## Readability Examples

### Example 5: Long Sentence
```diff
BEFORE (52 words):
The search functionality uses Fuse.js for fast, client-side fuzzy
searching which allows users to quickly find articles by searching
through titles, descriptions, tags, and content with a threshold of
0.3 that balances precision and recall effectively.

AFTER (split into 2 sentences):
The search functionality uses Fuse.js for fast, client-side fuzzy
searching. It allows users to quickly find articles by searching
through titles, descriptions, tags, and content with a threshold of
0.3 that balances precision and recall.

CATEGORY: Medium Priority - Readability
REASON: Sentences >40 words reduce readability
```

### Example 6: Passive Voice
```diff
BEFORE:
The blog was built by me using Next.js 15.

AFTER:
I built the blog using Next.js 15.

CATEGORY: Medium Priority - Readability
REASON: Active voice is more direct and engaging
```

### Example 7: Unclear Pronoun
```diff
BEFORE:
The hook updates the state when it changes.

AFTER:
The hook updates the state when the input value changes.

CATEGORY: High Priority - Clarity
REASON: Ambiguous "it" - what changes?
```

## Structure & Formatting Examples

### Example 8: Skipped Heading Level
```diff
BEFORE:
## Main Section
#### Subsection

AFTER:
## Main Section
### Subsection

CATEGORY: High Priority - Structure
REASON: Skipped h3 level breaks heading hierarchy
```

### Example 9: Missing Code Language Tag
```diff
BEFORE:
```
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

AFTER:
```typescript
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

CATEGORY: High Priority - Formatting
AUTO-SAFE: Yes (confidence: 100%)
```

### Example 10: Improper Callout Usage
```diff
BEFORE:
<Callout type="error">
This is just some information about the feature.
</Callout>

AFTER:
<Callout type="info">
This is just some information about the feature.
</Callout>

CATEGORY: Medium Priority - Component Usage
REASON: "error" type is for errors/warnings, not general info
```

## Code Example Improvements

### Example 11: Missing Code Comments
```diff
BEFORE:
export async function generateStaticParams() {
  return getAllBaseSlugs()
}

AFTER:
// Generate static paths for all blog posts at build time
// This enables static HTML generation for better performance
export async function generateStaticParams() {
  return getAllBaseSlugs()
}

CATEGORY: Medium Priority - Code Quality
REASON: Comments explain WHY and provide context
```

### Example 12: Incomplete Code Example
```diff
BEFORE:
```typescript
const result = fetchData()
console.log(result)
```

AFTER:
```typescript
const result = await fetchData()
console.log(result)
```

CATEGORY: Critical - Code Correctness
REASON: Missing 'await' for async function - code would fail
```

## PT-BR Translation Examples

### Example 13: Literal Translation (Awkward)
```diff
BEFORE (PT-BR):
Nós vamos mergulhar profundamente nos conceitos.

AFTER (PT-BR):
Vamos explorar os conceitos em profundidade.

CATEGORY: High Priority - Translation Quality
REASON: "mergulhar profundamente" is literal translation;
        "explorar em profundidade" is more natural in PT-BR
```

### Example 14: Missing Accents
```diff
BEFORE (PT-BR):
Voce pode usar essa funcao para...

AFTER (PT-BR):
Você pode usar essa função para...

CATEGORY: High Priority - Spelling (PT-BR)
AUTO-SAFE: Yes (confidence: 99%)
```

## Cross-Locale Consistency Examples

### Example 15: Missing Translation Update
```diff
EN VERSION:
## Performance Optimizations
[content about caching and lazy loading]

PT-BR VERSION (BEFORE):
## Otimizações de Performance
[only content about caching - missing lazy loading section]

PT-BR VERSION (AFTER):
## Otimizações de Performance
[content about both caching and lazy loading]

CATEGORY: High Priority - Completeness
REASON: PT-BR version missing content that exists in EN
```

### Example 16: Inconsistent Heading Count
```diff
EN VERSION: 8 headings
PT-BR VERSION: 6 headings

ISSUE: Cross-locale consistency check failed
CATEGORY: High Priority - Structure
REASON: Should have same heading structure in both locales
```

## Enhancement Opportunities

### Example 17: Internal Linking Opportunity
```diff
BEFORE:
I also wrote about MDX components in another post.

AFTER:
I also wrote about [MDX components in detail](/posts/2025/12/code-examples).

CATEGORY: Low Priority - Enhancement
REASON: Internal linking improves navigation and SEO
```

### Example 18: Callout Suggestion
```diff
BEFORE:
Note: You must restart the dev server after changing .env files.

AFTER:
<Callout type="warning">
You must restart the dev server after changing .env files.
</Callout>

CATEGORY: Medium Priority - Formatting
REASON: Important warnings should use Callout component
```

## Whitespace & Formatting

### Example 19: Excessive Blank Lines
```diff
BEFORE:
## Section 1



## Section 2

AFTER:
## Section 1

## Section 2

CATEGORY: Low Priority - Formatting
AUTO-SAFE: Yes (confidence: 100%)
```

### Example 20: Trailing Whitespace
```diff
BEFORE:
This line has trailing spaces.
Another line here.

AFTER:
This line has trailing spaces.
Another line here.

CATEGORY: Low Priority - Formatting
AUTO-SAFE: Yes (confidence: 100%)
```

## Voice & Tone Examples

These examples show tone refinements based on the author's established voice (see SKILL.md for full guidelines).

### Example 21: Removing Unnecessary Adverbs (EN)
```diff
BEFORE:
Now, I love code and tech, but here's something you might not expect—I'm genuinely passionate about finance and investing too.

AFTER:
Now, I love code and tech, but here's something you might not expect—I'm passionate about finance and investing too.

CATEGORY: Medium Priority - Voice/Tone
REASON: Author prefers simpler language over adverb-heavy. "Passionate" is stronger without "genuinely"
SOURCE: Manual refinement in what-made-me-create-this-blog article
```

### Example 22: Natural Flow Over Literal (EN)
```diff
BEFORE:
I've picked up so many solutions over the years—snippets, patterns, ideas that have saved me hours of work. And I always forget them!

AFTER:
I've built so many solutions over the years—snippets, patterns, ideas that have saved me hours of work. And I always end up forgetting!

CATEGORY: Medium Priority - Voice/Tone
REASON: "Built" emphasizes creation; "end up forgetting" flows more naturally than "always forget them"
SOURCE: Manual refinement in what-made-me-create-this-blog article
```

### Example 23: Adding Conversational Nuance (EN)
```diff
BEFORE:
I'm building a career in tech. A blog is such a powerful way to show what I can do.

AFTER:
I'm (still) building a career in tech. A blog is such a powerful way to show what I can do.

CATEGORY: Low Priority - Voice/Tone
REASON: Parenthetical "(still)" adds vulnerable, ongoing nuance without being heavy-handed
SOURCE: Manual refinement in what-made-me-create-this-blog article
```

### Example 24: Avoiding Forced Conversational Markers (EN)
```diff
BEFORE:
Look, I'm building a career in tech and I need to show my skills.

AFTER:
I'm building a career in tech. A blog is a great way to show my skills.

CATEGORY: High Priority - Voice/Tone
REASON: "Look," is not part of author's natural voice. Remove forced openers.
```

### Example 25: Natural Brazilian Phrasing (PT-BR)
```diff
BEFORE:
Deixe-me dividi-las para você:

AFTER:
Vou listá-las pra você:

CATEGORY: Medium Priority - Voice/Tone (PT-BR)
REASON: "Vou listá-las pra você" is more casual Brazilian. "pra" instead of "para" matches author's conversational style
SOURCE: Manual refinement in what-made-me-create-this-blog article
```

### Example 26: Natural Word Choice (PT-BR)
```diff
BEFORE:
Estamos vivendo neste momento selvagem na tecnologia agora.

AFTER:
Estamos vivendo neste momento louco na tecnologia agora.

CATEGORY: Medium Priority - Voice/Tone (PT-BR)
REASON: "louco" is more natural in Brazilian Portuguese than "selvagem" for this context
SOURCE: Manual refinement in what-made-me-create-this-blog article
```

### Example 27: Natural Verb Phrasing (PT-BR)
```diff
BEFORE:
Peguei tantas soluções ao longo dos anos. E sempre as esqueço!

AFTER:
Construí tantas soluções ao longo dos anos. E sempre acabo esquecendo!

CATEGORY: Medium Priority - Voice/Tone (PT-BR)
REASON: "Construí" emphasizes creation over "Peguei"; "acabo esquecendo" flows more naturally than "esqueço"
SOURCE: Manual refinement in what-made-me-create-this-blog article
```

### Example 28: Avoiding Overuse of "Honestly"
```diff
BEFORE:
Honestly, there are many reasons. Honestly, I think it's important. And honestly, I'm excited about this.

AFTER:
There are many reasons. I think it's important. And I'm excited about this.

CATEGORY: High Priority - Voice/Tone
REASON: Author uses "honestly" sparingly (max 1-2 times per article). Three uses in quick succession is excessive.
```

### Example 29: Keeping Preferred Casual Phrases
```diff
BEFORE (Suggested Change):
I'm pretty new to investing, and it's been a blast.
→ it's been really fun.

AFTER (User Preference):
I'm pretty new to investing, and it's been a blast.

CATEGORY: Skip - Voice Preference
REASON: Author prefers "it's been a blast" - keep their authentic casual expressions
SOURCE: User feedback during tone refinement
```

### Example 30: Formal to Conversational (EN)
```diff
BEFORE:
The decision to create a personal blog is something I've been thinking about for a while. In this article, I want to share the journey and the motivations behind it.

AFTER:
So, I finally decided to start a blog. It's something I've been putting off for way too long. In this article, I want to share what actually pushed me to do it and what I'm hoping to get out of this.

CATEGORY: High Priority - Voice/Tone
REASON: "So, I finally decided..." is more conversational and authentic than formal essay-style opening
SOURCE: Collaborative tone refinement in what-made-me-create-this-blog article
```

## Quality Metrics

After applying these improvements, expect to see:

**Readability Improvements:**
- Flesch Reading Ease: 55 → 65 (Good)
- Avg Sentence Length: 25 → 18 words
- Passive Voice: 18% → 8%

**Technical Improvements:**
- Code blocks with language tags: 60% → 100%
- Broken links: 2 → 0
- Grammar errors: 12 → 0

**Consistency Improvements:**
- Cross-locale heading mismatch: Yes → No
- Inconsistent terminology: 8 instances → 0
- Translation completeness: 85% → 100%
