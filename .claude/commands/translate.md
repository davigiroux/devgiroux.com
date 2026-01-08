Check translation status or create translation for a blog article.

**Usage:**
- `/translate --status` - List all articles and their translation status
- `/translate --missing` - List articles missing translations
- `/translate [slug] --to pt-BR` - Translate English article to Portuguese
- `/translate [slug] --to en` - Translate Portuguese article to English

## Arguments

- `[slug]` - Article slug (without locale or .mdx extension)
- `--to [locale]` - Target locale (en or pt-BR)
- `--status` - Show translation status for all articles
- `--missing` - Show only articles missing translations

## Tasks

### If --status flag:
1. Find all articles in `content/posts/`
2. For each unique slug:
   - Check if .en.mdx exists
   - Check if .pt-BR.mdx exists
   - Report status (✓ Both, ⚠️ EN only, ⚠️ PT-BR only)
3. Display summary table

### If --missing flag:
1. Find all articles in `content/posts/`
2. List only articles that have EN but not PT-BR, or vice versa
3. Show which locale is missing

### If [slug] --to [locale]:
1. **Validate inputs:**
   - Ensure slug is provided
   - Ensure --to locale is provided (en or pt-BR)
   - Check that source article exists
   - Determine source locale (the opposite of target)

2. **Read source article:**
   - Find file: `content/posts/YYYY/MM/{slug}.{source-locale}.mdx`
   - Parse frontmatter and content
   - Extract: title, description, tags, date, draft, featured, all MDX content

3. **Check for conflicts:**
   - Check if target file already exists
   - If exists, ask user: "Translation already exists. Overwrite? (y/n)"
   - If no, abort

4. **Translate content:**
   - Translate title (frontmatter)
   - Translate description (frontmatter)
   - Keep tags in English (per codebase pattern - do NOT translate)
   - Translate all prose content in MDX body
   - **Preserve exactly:**
     - Code blocks (```language ... ```) - do NOT translate code
     - MDX component syntax (<Callout>, <YouTubeEmbed>, etc.)
     - Technical terms and API names
     - URLs and links
     - Frontmatter structure
     - Heading levels and structure
   - Use natural, fluent translation for the target language

5. **Create translated file:**
   - Same folder as source: `content/posts/YYYY/MM/{slug}.{target-locale}.mdx`
   - Frontmatter:
     ```yaml
     ---
     title: "[TRANSLATED title]"
     date: "YYYY-MM-DD" (same as source)
     description: "[TRANSLATED description]"
     tags: ["same", "as", "source"] (keep in English)
     coverImage: "" (same as source)
     draft: true/false (same as source)
     featured: true/false (same as source)
     lang: "en" or "pt-BR" (target locale)
     ---
     ```
   - Body: Translated content with preserved structure

6. **Validation:**
   - Verify both files now exist
   - Check frontmatter fields match (except title, description, lang)
   - Ensure MDX syntax is valid
   - Confirm tags are identical

7. **Report:**
   - Show paths of both files
   - Confirm translation complete
   - List any warnings (if MDX components detected, remind to review)

## Translation Guidelines

**For EN → PT-BR:**
- Use Brazilian Portuguese, not European Portuguese
- Technical terms: Keep in English when commonly used (e.g., "hooks", "props", "state")
- Informal tone matches English casualness
- Common translations:
  - "Introduction" → "Introdução"
  - "Main Content" → "Conteúdo Principal"
  - "Conclusion" → "Conclusão"
  - "Example" → "Exemplo"

**For PT-BR → EN:**
- Use American English spelling
- Maintain informal/technical blog tone
- Preserve code terminology

## Examples

```bash
# Check all translation status
/translate --status

# Find missing translations
/translate --missing

# Translate "welcome" article to Portuguese
/translate welcome --to pt-BR

# Translate "meu-artigo" to English
/translate meu-artigo --to en
```

## Error Handling

- If slug not found: "Article '{slug}' not found in content/posts/"
- If source locale doesn't exist: "Source article not found. Ensure {slug}.{source}.mdx exists"
- If target already exists: Ask for confirmation before overwriting
- If invalid locale: "Invalid locale. Use 'en' or 'pt-BR'"
