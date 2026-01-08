Manage draft articles - list, publish, or archive drafts.

**Usage:**
- `/draft-manager --list` - List all draft articles
- `/draft-manager --publish [slug]` - Publish a draft article
- `/draft-manager --unpublish [slug]` - Mark published article as draft
- `/draft-manager --archive [slug]` - Archive old draft
- `/draft-manager --stats` - Show draft statistics

## Commands

### 1. List Drafts (`--list`)

**Task:** Show all articles with `draft: true`

**Output format:**
```
📝 DRAFT ARTICLES
════════════════════════════════════════════════════

Found 3 draft articles:

┌─────────────────────────────────────────────────┐
│ my-new-feature                                   │
├─────────────────────────────────────────────────┤
│ 📅 Date: 2026-01-05                             │
│ 🏷️  Tags: react, hooks, tutorial                │
│ 🌐 Locales: EN ✓, PT-BR ✓                       │
│ ⭐ Featured: No                                  │
│ 📊 Status: Ready to publish ✓                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ work-in-progress                                 │
├─────────────────────────────────────────────────┤
│ 📅 Date: 2026-01-03                             │
│ 🏷️  Tags: nextjs                                │
│ 🌐 Locales: EN ✓, PT-BR ✗ (missing)            │
│ ⭐ Featured: No                                  │
│ ⚠️  Status: Incomplete (missing translation)    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ old-draft                                        │
├─────────────────────────────────────────────────┤
│ 📅 Date: 2025-11-20 (45 days old)              │
│ 🏷️  Tags: announcement                          │
│ 🌐 Locales: EN ✓, PT-BR ✓                       │
│ ⭐ Featured: No                                  │
│ ⚠️  Status: Stale (consider archiving)          │
└─────────────────────────────────────────────────┘

════════════════════════════════════════════════════

Summary:
  • Total drafts: 3
  • Ready to publish: 1
  • Incomplete: 1
  • Stale (>30 days): 1

Quick actions:
  • /draft-manager --publish my-new-feature
  • /draft-manager --archive old-draft
```

**Information to show for each draft:**
- Slug
- Date (show age if >30 days)
- Tags
- Locale availability (EN ✓/✗, PT-BR ✓/✗)
- Featured status
- Readiness status:
  - ✓ Ready to publish (both locales, no issues)
  - ⚠️ Incomplete (missing locale)
  - ⚠️ Stale (>30 days old)
  - ❌ Has validation errors

### 2. Publish Draft (`--publish [slug]`)

**Task:** Set `draft: false` in both EN and PT-BR versions, after validation.

**Validation before publishing:**

1. **Check article exists**
   - Verify slug exists in content/posts/
   - Find both .en.mdx and .pt-BR.mdx files

2. **Verify both locales exist**
   - ✓ Both EN and PT-BR must exist
   - ❌ If only one locale: Error with message:
     ```
     ❌ Cannot publish: Missing PT-BR translation

     Run this first:
     /translate [slug] --to pt-BR
     ```

3. **Run content validation**
   - Check frontmatter is complete:
     - title (not empty)
     - date (valid format)
     - description (not empty)
     - tags (minimum 2)
   - Validate MDX syntax (parseable)
   - Check for broken internal links

4. **Verify metadata matches**
   - Same date in both locales
   - Same tags in both locales
   - Same featured status in both locales
   - Same coverImage in both locales

5. **Content quality check**
   - ⚠️ Warn if article <500 words (but allow publishing)
   - ⚠️ Warn if no cover image (but allow publishing)
   - ⚠️ Warn if description <100 chars (but allow publishing)

**If all validations pass:**

1. **Update both files**
   - Change `draft: true` to `draft: false` in EN version
   - Change `draft: true` to `draft: false` in PT-BR version
   - Preserve all other frontmatter

2. **Confirmation**
   ```
   ✅ Published successfully!

   Files updated:
     • content/posts/2026/01/my-new-feature.en.mdx
     • content/posts/2026/01/my-new-feature.pt-BR.mdx

   Article is now live at:
     • /blog/my-new-feature (EN)
     • /pt-br/blog/my-new-feature (PT-BR)

   Next steps:
     • Run /seo-audit to check SEO
     • Build and deploy: npm run build
     • Commit changes: git add . && git commit -m "feat(content): publish my-new-feature"
   ```

**If validation fails:**
```
❌ Cannot publish - validation errors found:

1. Missing PT-BR translation
2. Description too short (45 chars, recommend 120+)
3. Only 1 tag (recommend 2+)

Fix these issues and try again:
  • /translate my-new-feature --to pt-BR
  • Edit description in both locales
  • Add more tags
```

### 3. Unpublish Article (`--unpublish [slug]`)

**Task:** Revert published article back to draft status.

**Use case:** Article needs updates, or want to temporarily hide it.

**Process:**
1. Find article files (EN and PT-BR)
2. Check current status (must be published)
3. Set `draft: true` in both files
4. Confirm action

**Confirmation:**
```
⚠️  This will hide the article from the site.

Article: my-article
Current status: Published
Action: Set draft: true

Continue? (y/n)
```

**If confirmed:**
```
✅ Article unpublished

Files updated:
  • content/posts/2026/01/my-article.en.mdx
  • content/posts/2026/01/my-article.pt-BR.mdx

Article is now hidden from:
  • Homepage (if featured)
  • Blog listing page
  • Sitemap
  • RSS feeds

It's now a draft and can be edited safely.
```

### 4. Archive Draft (`--archive [slug]`)

**Task:** Move old/abandoned drafts to archive folder.

**Use case:** Clean up drafts that won't be published.

**Process:**
1. Find draft files (must be drafts, not published)
2. Confirm age and status
3. Ask for confirmation
4. Move to `content/posts/archive/` folder
5. Or delete if user prefers

**Confirmation:**
```
⚠️  Archive draft article?

Article: old-draft
Age: 45 days old
Locales: EN ✓, PT-BR ✓

Choose action:
  1. Move to archive/ (keep for reference)
  2. Delete permanently
  3. Cancel

Enter choice (1/2/3):
```

**If archived:**
```
✅ Draft archived

Moved files:
  FROM: content/posts/2025/11/old-draft.en.mdx
  TO:   content/posts/archive/2025/11/old-draft.en.mdx

  FROM: content/posts/2025/11/old-draft.pt-BR.mdx
  TO:   content/posts/archive/2025/11/old-draft.pt-BR.mdx

Files are now in archive/ and won't appear in listings.
To restore: Move them back manually.
```

**If deleted:**
```
⚠️  FINAL WARNING: This cannot be undone!

Delete these files?
  • content/posts/2025/11/old-draft.en.mdx
  • content/posts/2025/11/old-draft.pt-BR.mdx

Type 'DELETE' to confirm:
```

### 5. Draft Statistics (`--stats`)

**Task:** Show overview of draft status.

**Output:**
```
📊 DRAFT STATISTICS
════════════════════════════════════════════════════

Total Articles: 10
  📝 Drafts: 3 (30%)
  ✅ Published: 7 (70%)

Draft Breakdown:
  ✓ Ready to publish: 1
  ⚠️ Incomplete (missing translation): 1
  ⚠️ Stale (>30 days): 1
  ❌ Has errors: 0

Age Distribution:
  • <7 days: 1 draft
  • 7-30 days: 1 draft
  • >30 days: 1 draft (consider archiving)

Translation Status:
  • Complete (both EN + PT-BR): 2 drafts
  • Missing PT-BR: 1 draft
  • Missing EN: 0 drafts

Featured Articles:
  • Published & featured: 2
  • Drafts & featured: 0

════════════════════════════════════════════════════

Recommendations:
  1. Publish 1 ready draft: my-new-feature
  2. Complete 1 missing translation
  3. Archive 1 stale draft: old-draft

Next actions:
  • /draft-manager --list (see all drafts)
  • /draft-manager --publish my-new-feature
  • /draft-manager --archive old-draft
```

## Guidelines

**Publishing Rules:**
- ✅ Must have both EN and PT-BR versions
- ✅ All required frontmatter fields must be complete
- ✅ MDX must parse without errors
- ⚠️ Warnings allowed (short content, no image) but notify user

**Stale Draft Detection:**
- Draft >30 days old = Stale (suggest archiving)
- Draft >60 days old = Very stale (emphasize archiving)

**Safety Checks:**
- Always confirm before unpublishing
- Always confirm before archiving/deleting
- Show clear what will happen
- Provide undo information

**Integration with Other Commands:**
- After publishing: Suggest `/seo-audit [slug]`
- If missing translation: Suggest `/translate [slug] --to [locale]`
- If validation errors: Suggest `/validate-posts`
- Before publishing: Automatically run validation

## Error Handling

- **Slug not found**: "Article '{slug}' not found in content/posts/"
- **Already published**: "Article '{slug}' is already published (draft: false)"
- **Already draft**: "Article '{slug}' is already a draft"
- **Missing locale**: "Cannot publish: Missing {locale} translation"
- **Validation errors**: List all errors with suggested fixes
- **Permission errors**: "Cannot write to file: {path}"

## File Operations

All file operations should:
1. Read current file content
2. Parse frontmatter
3. Update only the `draft` field
4. Preserve all other frontmatter exactly
5. Preserve all content exactly
6. Write back to same file
7. Verify write was successful

**Use Edit tool for updating, not Write** (to preserve content).

## Future Enhancements

- Schedule publishing (set future publish date)
- Batch operations (publish multiple drafts)
- Draft templates (save common draft structures)
- Preview draft locally before publishing
- Notification when drafts become stale
- Draft approval workflow (for team blogs)
