# Priority Classification Guide

This document provides detailed rules for classifying suggestions into priority levels.

## 🔴 Critical Priority (Must Fix)

These issues break functionality or prevent the article from rendering correctly.

### Broken MDX Syntax
- Unclosed JSX tags: `<Callout>text` (missing `</Callout>`)
- Invalid JSX: `<Callout type=info>` (missing quotes)
- Malformed components: `<YouTubeEmbed>` (missing required props)
- Unclosed code blocks: ` ```typescript` without closing ` ``` `

### Invalid Code Examples
- Syntax errors that prevent compilation
- Missing imports for used modules
- Undefined variables or functions
- Code that would throw runtime errors

### Broken Internal Links
- Links to non-existent articles: `[See this](/posts/nonexistent)`
- Broken relative paths
- Links with wrong locale references

### Malformed Frontmatter
- Missing required fields: `title`, `date`, `description`, `tags`, `lang`
- Invalid YAML syntax
- Wrong data types: `draft: "true"` (should be boolean)
- Invalid date format: `date: 12/30/2025` (should be YYYY-MM-DD)

## 🟡 High Priority (Strongly Recommended)

Clear errors that significantly impact quality or understandability.

### Grammar & Spelling Errors
- Missing articles: "Building ~~personal~~ **a personal** blog"
- Verb tense errors: "Yesterday I **go**" → "Yesterday I **went**"
- Subject-verb disagreement: "The features **is**" → "The features **are**"
- Common misspellings: "recieve" → "receive"
- Homophones: "their" vs "there" vs "they're"

### Missing Code Block Language Tags
```
BAD:
```
function example() {
  return true
}
```

GOOD:
```typescript
function example() {
  return true
}
```
```

### Confusing or Unclear Sentences
- Ambiguous pronouns: "The hook updates it" (what is "it"?)
- Run-on sentences: Multiple independent clauses without proper punctuation
- Missing context: References to undefined terms

### Poor Heading Hierarchy
```
BAD:
## Section 1
#### Subsection (skipped h3)

GOOD:
## Section 1
### Subsection
```

### Inconsistent Terminology
Using multiple terms for same concept:
- Next.js, NextJS, next.js → Standardize to "Next.js"
- React, ReactJS, react → Standardize to "React"

### Awkward PT-BR Translations
Literal translations that don't sound natural:
- EN: "We'll dive into"
- PT-BR BAD: "Nós vamos mergulhar em"
- PT-BR GOOD: "Vamos explorar"

## 🟠 Medium Priority (Recommended)

Improvements that enhance readability and quality but aren't errors.

### Long Sentences
Sentences over 40 words should be considered for splitting:
```
BAD (52 words):
The search functionality uses Fuse.js for fast, client-side fuzzy
searching which allows users to quickly find articles by searching
through titles, descriptions, tags, and content with a threshold of
0.3 that balances precision and recall effectively.

GOOD (split into 2):
The search functionality uses Fuse.js for fast, client-side fuzzy
searching. It allows users to quickly find articles by searching
through titles, descriptions, tags, and content with a threshold of
0.3 that balances precision and recall.
```

### Better Word Choices
More precise or clearer alternatives:
- "utilize" → "use" (simpler)
- "in order to" → "to" (concise)
- "at this point in time" → "now" (direct)

### Flow Improvements
Missing transitions between sections:
```
BAD:
## Routing
Next.js uses file-based routing.

## Styling
I chose Tailwind CSS.

GOOD:
## Routing
Next.js uses file-based routing.

## Styling
For the visual design, I chose Tailwind CSS.
```

### Missing Code Comments
```
BAD:
export async function generateStaticParams() {
  return getAllBaseSlugs()
}

GOOD:
// Generate static paths for all blog posts at build time
// This enables static HTML generation for better performance
export async function generateStaticParams() {
  return getAllBaseSlugs()
}
```

### Passive Voice Overuse
>15% passive voice reduces readability:
```
BAD:
The blog was built by me using Next.js.

GOOD:
I built the blog using Next.js.
```

### Callout Opportunities
Places where information could be highlighted:
```
SUGGESTION:
Add a Callout after mentioning important caveat:

<Callout type="warning">
Remember to restart the dev server after changing environment variables.
</Callout>
```

## 🟢 Low Priority (Optional/Stylistic)

Subjective improvements that don't affect correctness.

### Style Preferences
Personal writing style choices:
- Oxford comma usage
- Contractions vs formal: "don't" vs "do not"
- Em-dash vs parentheses

### Alternative Phrasings
Different ways to say the same thing:
```
CURRENT:
This approach is better because it's faster.

ALTERNATIVE:
This approach offers better performance.

NOTE: Both are correct, this is just a suggestion.
```

### Enhanced Examples
Additional examples that could help:
```
SUGGESTION:
Consider adding a second example showing the error case:

[Example of success case - already present]

[Suggested: Add example of error handling]
```

### Additional Cross-References
Internal linking opportunities:
```
SUGGESTION:
When mentioning "MDX components," consider linking to the
code-examples article where components are explained in detail.
```

### Cover Image Suggestions
```
SUGGESTION:
Consider adding a cover image to improve social sharing:
- Screenshot of the blog
- Architecture diagram
- Visual representation of the topic
```

## Classification Rules

When categorizing a suggestion:

1. **If it breaks functionality** → Critical
2. **If it's objectively wrong** → High
3. **If it significantly improves clarity** → High
4. **If it improves readability** → Medium
5. **If it's a nice-to-have** → Low

## Confidence Scoring

For auto-safe classification, suggestions need >95% confidence:

**High Confidence (>95%):**
- Dictionary typo: "teh" → "the"
- Missing language tag: ```` ``` → ````typescript
- Proper noun: "nextjs" → "Next.js"

**Medium Confidence (80-95%):**
- Grammar: "Building blog" → "Building a blog" (context dependent)
- Word choice: "utilize" → "use" (stylistic)

**Low Confidence (<80%):**
- Sentence rewrites
- Phrasing alternatives
- Structural changes

Only high-confidence suggestions can be auto-applied with `--auto-safe`.
