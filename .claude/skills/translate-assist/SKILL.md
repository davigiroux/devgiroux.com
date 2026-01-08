---
name: translate-assist
description: Help translate blog articles between English and Brazilian Portuguese. Use when translating articles, creating translations, checking translation status, or finding missing translations. Preserves code blocks, technical terms, and MDX components while providing natural, fluent translations.
allowed-tools: Read, Write, Glob
---

# Translation Assistance Skill

This skill helps translate blog articles between English (EN) and Brazilian Portuguese (PT-BR) while preserving technical accuracy and structure.

## When to Use This Skill

Activate this skill when the user:
- Asks to translate an article
- Wants to create a Portuguese/English version
- Mentions "translation", "translate", "Portuguese version", "English version"
- Just created an article in one language
- Asks to check translation status or find missing translations

## How Translation Works

This skill translates blog articles while:
- ✅ Translating prose content naturally
- ✅ Translating title and description in frontmatter
- ✅ Preserving code blocks exactly (no translation)
- ✅ Preserving MDX components and syntax
- ✅ Keeping tags in English (codebase convention)
- ✅ Maintaining same structure and headings
- ✅ Preserving URLs and links

## Translation Rules

### What Gets Translated
- Article title (frontmatter)
- Description (frontmatter)
- All prose/text content in MDX body
- Heading text
- Paragraph text
- List items (text only)
- Callout content (text inside components)

### What Stays the Same
- **Code blocks** - Never translate code
  ```typescript
  // This stays in English
  function example() { return true }
  ```
- **Tags** - Always in English for both locales
  ```yaml
  tags: ["react", "typescript", "tutorial"]  # Same in EN and PT-BR
  ```
- **Technical terms** - Common terms stay in English
  - Examples: hooks, props, state, component, API, frontend, backend
- **MDX component syntax** - Structure preserved
  ```mdx
  <Callout type="info">
  [Translated text here]
  </Callout>
  ```
- **URLs and links** - Exact same links
- **Frontmatter structure** - Same fields and values except title/description/lang
- **Date** - Same date: "2025-12-30"
- **draft/featured status** - Same boolean values
- **coverImage** - Same URL

## Instructions

### Step 1: Understand Request
Determine what user wants:
- Translate specific article? → Get slug and target locale
- Check translation status? → List all articles with status
- Find missing translations? → List incomplete translations

### Step 2: For Specific Translation

1. **Validate inputs**:
   - Verify slug provided
   - Determine target locale (EN or PT-BR)
   - Source locale is the opposite
   - Check source article exists

2. **Read source article**:
   ```
   Find: content/posts/YYYY/MM/{slug}.{source-locale}.mdx
   Parse frontmatter and content
   ```

3. **Check for conflicts**:
   - If target file exists, ask: "Translation exists. Overwrite?"
   - If user says no, abort

4. **Translate content**:
   - Translate title → Natural, compelling translation
   - Translate description → Natural, SEO-friendly
   - Keep tags → Exactly the same array
   - Translate body:
     - Prose → Natural, fluent translation
     - Code blocks → Keep exact same
     - MDX components → Keep structure, translate text inside
     - URLs → Keep exact same
     - Technical terms → Keep common terms in English

5. **Create translated file**:
   ```yaml
   ---
   title: "[TRANSLATED]"
   date: "[SAME AS SOURCE]"
   description: "[TRANSLATED]"
   tags: [SAME ARRAY]
   coverImage: "[SAME]"
   draft: [SAME BOOLEAN]
   featured: [SAME BOOLEAN]
   lang: "en" or "pt-BR"  # target locale
   ---

   [TRANSLATED CONTENT]
   ```

6. **Validate translation**:
   - Both files exist
   - Frontmatter matches (except title/description/lang)
   - Tags identical
   - Structure preserved
   - Code blocks untranslated

7. **Report completion**:
   ```
   ✅ TRANSLATION COMPLETE

   Source: content/posts/YYYY/MM/{slug}.{source}.mdx
   Target: content/posts/YYYY/MM/{slug}.{target}.mdx

   Translated:
   - Title: [original] → [translated]
   - Description: [original] → [translated]
   - Body: X paragraphs, Y headings

   Preserved:
   - Code blocks: X
   - MDX components: Y
   - Tags: [list]

   Next steps:
   - Review translation for accuracy
   - Run /validate-posts to verify
   - Run /polish-article {slug} --locale {target} to refine
   ```

### Step 3: For Translation Status

1. **Find all articles**:
   ```bash
   Glob: "content/posts/**/*.mdx"
   ```

2. **Group by slug** and check locales

3. **Report status**:
   ```
   📊 TRANSLATION STATUS
   ══════════════════════════════════════════════

   Total articles: X unique slugs

   ✅ Complete (both locales): X articles
   - [slug 1]
   - [slug 2]

   ⚠️  Missing PT-BR: X articles
   - [slug 3] (has EN only)
   - [slug 4] (has EN only)

   ⚠️  Missing EN: X articles
   - [slug 5] (has PT-BR only)

   Use /translate [slug] --to [locale] to create translation
   ```

## Translation Guidelines

### EN → PT-BR
- **Use Brazilian Portuguese** (não Português Europeu)
- **Keep common technical terms in English**:
  - hooks, props, state, component
  - frontend, backend, API, REST
  - framework, library, package
- **Natural phrasing**:
  - ❌ "Nós vamos mergulhar" (literal)
  - ✅ "Vamos explorar" (natural)
- **Common translations**:
  - "Introduction" → "Introdução"
  - "Getting Started" → "Primeiros Passos"
  - "Conclusion" → "Conclusão"
  - "Example" → "Exemplo"
  - "Overview" → "Visão Geral"

### PT-BR → EN
- **Use American English** spelling
  - color (not colour)
  - optimize (not optimise)
- **Maintain blog tone** (informal, friendly)
- **Preserve code terminology**

## Example Interactions

### Example 1: User creates article in English
```
User: I just wrote an article about React hooks in English
Claude: Would you like me to create a Portuguese translation?
        I can use the translate-assist skill to translate it.
User: Yes please
Claude: [Asks for slug, translates, creates PT-BR version]
```

### Example 2: User asks about missing translations
```
User: Which articles don't have Portuguese versions?
Claude: I can check translation status for all your articles.
        Let me use the translate-assist skill.
User: Go ahead
Claude: [Shows list of articles missing PT-BR translations]
        Would you like me to translate any of these?
```

### Example 3: User mentions translation explicitly
```
User: Translate the welcome article to Portuguese
Claude: [Uses translate-assist skill automatically]
        Reading welcome.en.mdx and creating welcome.pt-BR.mdx...
```

## Integration Points

Uses existing library functions:
- `lib/posts.ts:getPostBySlug()` - Read articles
- `lib/posts.ts:getAllBaseSlugs()` - Find all articles
- `lib/posts.ts:getAvailableLocales()` - Check which locales exist

After translation:
- Suggest `/validate-posts` to verify
- Suggest `/polish-article [slug] --locale pt-BR` to refine
- If both locales complete, suggest `/publish [slug]`

Complements the `/translate` slash command.

## Notes

- Natural, fluent translation (not literal)
- Preserves technical accuracy
- Maintains bilingual blog consistency
- Code and technical terms stay in English
- Structure and components unchanged
