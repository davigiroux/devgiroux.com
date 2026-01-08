Complete publishing workflow - validate, audit, publish, build, and deploy an article.

**Usage:**
- `/publish [slug]` - Run complete publishing workflow
- `/publish [slug] --skip-build` - Skip build test
- `/publish [slug] --auto-push` - Automatically push to remote
- `/publish [slug] --create-pr` - Create pull request after publishing

## Complete Publishing Workflow

This command orchestrates the entire publishing process in one go.

### Overview

The `/publish` command runs these steps automatically:
1. 🎨 **Polish Article** - Grammar, clarity, and quality improvements
2. ✅ **Validation** - Technical checks
3. 🔍 **SEO Audit** - Optimization checks
4. 📝 **Set draft: false** - Mark as published
5. 🏗️ **Test build** - Ensure no errors
6. 📦 **Git commit** - Create standardized commit
7. 🚀 **Deploy** - Push/PR (optional)

### Step-by-Step Process

#### Step 1: Pre-flight Checks

Before starting, verify:
- ✓ Article exists (slug is valid)
- ✓ Working directory is clean (or confirm to continue with uncommitted changes)
- ✓ On correct git branch
- ✓ User confirmation to proceed

**Prompt:**
```
🚀 PUBLISH ARTICLE: [slug]
════════════════════════════════════════════════════

This will:
  1. Polish article (grammar, clarity, quality)
  2. Validate article content
  3. Run SEO audit
  4. Set draft: false (publish)
  5. Test build
  6. Create git commit
  7. Push to remote (if confirmed)

Continue? (y/n):
```

#### Step 2: Polish Article

**Task:** Run `/polish-article [slug] --review` to analyze and improve article quality

**Process:**
1. Analyze both .en.mdx and .pt-BR.mdx files
2. Check grammar, spelling, and clarity
3. Validate structure and formatting
4. Review code examples
5. Check cross-locale consistency
6. Generate quality report with suggestions

**Polish Mode:** Use `--review` mode by default to show suggestions without auto-applying

**If critical issues found:**
```
⚠️ POLISH REVIEW: Critical Issues Found

Article: [slug]
Quality Score: 6/10

Critical Issues (must fix):
  🔴 1. Broken MDX syntax in EN version (line 45)
  🔴 2. Invalid code example in PT-BR version (line 132)

High Priority (recommended):
  🟡 3. Missing code block language tags (5 locations)
  🟡 4. Confusing sentence structure (EN line 78)

Would you like to:
  1. Fix issues interactively (/polish-article [slug] --interactive)
  2. Continue publishing with issues (not recommended)
  3. Cancel publishing

Enter choice (1/2/3):
```

**If user chooses option 1 (interactive):**
- Run `/polish-article [slug] --interactive`
- User reviews and applies suggestions one-by-one
- After polishing, continue to validation step

**If user chooses option 2 (continue):**
- Warn: "Continuing with [N] unresolved issues"
- Continue to validation (may fail if critical issues exist)

**If user chooses option 3 (cancel):**
```
⏸️ Publishing cancelled

Fix issues first:
  • /polish-article [slug] --interactive
  • Manually edit files

Then run /publish again.
```

**If only minor issues or no issues:**
```
✅ Step 1/7: Polish review complete (Score: 9/10)

Found [N] suggestions:
  • [N] high priority
  • [N] medium priority
  • [N] low priority

Apply suggestions? (y/n/skip):
  y - Run interactive polish
  n - Skip polishing
  skip - Continue to next step
```

**Output after polishing:**
```
✅ Step 1/7: Article polished

Applied [X] of [N] suggestions
Quality Score: 9/10 → 10/10

Files modified:
  • content/posts/YYYY/MM/[slug].en.mdx ([N] changes)
  • content/posts/YYYY/MM/[slug].pt-BR.mdx ([N] changes)
```

#### Step 3: Run Validation

**Task:** Run `/validate-posts` on the specific article

**Process:**
1. Find both .en.mdx and .pt-BR.mdx files
2. Validate frontmatter schema
3. Check MDX syntax
4. Verify both locales exist
5. Check metadata matches between locales
6. Validate internal links

**If validation fails:**
```
❌ VALIDATION FAILED

Errors found:
  1. Missing PT-BR translation
  2. Invalid date format in frontmatter

Cannot proceed with publishing.

Fix these issues first:
  • /translate [slug] --to pt-BR
  • Edit frontmatter date to YYYY-MM-DD format

Then run /publish again.
```

**If validation passes:**
```
✅ Step 2/7: Validation passed
```

#### Step 4: Run SEO Audit

**Task:** Run `/seo-audit [slug]` to check SEO

**Process:**
1. Audit the specific article
2. Calculate SEO score
3. Check for critical issues
4. Report warnings

**Scoring thresholds:**
- **90-100**: Excellent, proceed
- **75-89**: Good, proceed with warnings
- **60-74**: Needs improvement, ask to continue
- **<60**: Poor, strongly recommend fixing first

**If score < 75:**
```
⚠️  SEO AUDIT: Score 68/100

Issues found:
  • Description too short (45 chars, recommend 120+)
  • Missing cover image
  • Only 1 tag (recommend 3+)

Recommendations:
  1. Expand description
  2. Add cover image
  3. Add more tags

Continue publishing anyway? (y/n):
```

**If user chooses not to continue:**
```
⏸️  Publishing paused

Fix SEO issues first:
  • Edit description in both .en.mdx and .pt-BR.mdx
  • Add coverImage to frontmatter
  • Add tags

Then run /publish again.
```

**If score >= 75 or user confirms:**
```
✅ Step 3/7: SEO audit complete (Score: 68/100)
```

#### Step 5: Set Draft to False

**Task:** Update both locale files to set `draft: false`

**Process:**
1. Read .en.mdx file
2. Parse frontmatter
3. Change `draft: true` to `draft: false`
4. Write back to file (preserve all other content)
5. Repeat for .pt-BR.mdx
6. Verify both files updated successfully

**Output:**
```
✅ Step 4/7: Article published (draft: false)

Updated files:
  • content/posts/2026/01/my-article.en.mdx
  • content/posts/2026/01/my-article.pt-BR.mdx
```

#### Step 6: Test Build

**Task:** Run `npm run build` to ensure no errors

**Process:**
1. Show message: "Testing build... (this may take 30-60 seconds)"
2. Run: `npm run build`
3. Capture output
4. Check for errors
5. Parse for Next.js route generation

**If build fails:**
```
❌ BUILD FAILED

Build errors detected:
[show error output]

Rolling back changes...

✅ Rolled back: Set draft: true again
❌ Publishing aborted

Fix build errors and try again.
```

**If --skip-build flag:**
```
⚠️  Step 5/7: Build test skipped (--skip-build flag)
```

**If build succeeds:**
```
✅ Step 5/7: Build test passed

Generated routes:
  • /en/blog/my-article
  • /pt-br/blog/my-article
  • Sitemap updated
  • RSS feeds updated
```

#### Step 7: Create Git Commit

**Task:** Stage changes and create standardized commit message

**Process:**
1. Stage article files: `git add content/posts/YYYY/MM/[slug].*`
2. Generate commit message using this template:

**Commit message template:**
```
feat(content): publish [article-title]

Published article: [slug]

Changes:
- Add English version
- Add Portuguese translation
- Set draft: false

Article details:
- Date: YYYY-MM-DD
- Tags: [tag1, tag2, tag3]
- Featured: [yes/no]
- Reading time: [X min read]

URLs:
- EN: /blog/[slug]
- PT-BR: /pt-br/blog/[slug]

🤖 Generated with /publish command
```

**Execute:**
```bash
git add content/posts/YYYY/MM/[slug].en.mdx
git add content/posts/YYYY/MM/[slug].pt-BR.mdx
git commit -m "[commit message]"
```

**Output:**
```
✅ Step 6/7: Git commit created

Commit: abc1234 "feat(content): publish My Article"

Changes staged:
  • content/posts/2026/01/my-article.en.mdx
  • content/posts/2026/01/my-article.pt-BR.mdx
```

#### Step 8: Deploy (Optional)

**Task:** Push to remote and/or create PR

**Default behavior:** Ask user
```
🚀 Ready to deploy!

Options:
  1. Push to remote (git push)
  2. Create pull request (gh pr create)
  3. Skip deployment (done)

Enter choice (1/2/3):
```

**Option 1: Push to remote**
```bash
git push origin [current-branch]
```

**Output:**
```
✅ Step 7/7: Pushed to remote

Branch: main
Remote: origin
Commit: abc1234

View on GitHub:
https://github.com/[user]/[repo]/commit/abc1234
```

**Option 2: Create Pull Request**

Use GitHub CLI to create PR:
```bash
gh pr create \
  --title "feat(content): publish My Article" \
  --body "$(cat <<EOF
## Summary
Published new article: **My Article**

## Article Details
- **Slug:** my-article
- **Date:** 2026-01-05
- **Tags:** react, tutorial, hooks
- **Languages:** EN ✓, PT-BR ✓
- **Featured:** No
- **Reading time:** 8 min read

## URLs
- English: /blog/my-article
- Portuguese: /pt-br/blog/my-article

## Validation Results
- ✅ Technical validation passed
- ✅ SEO audit: 85/100
- ✅ Build test passed

## Preview
[Add preview screenshots if needed]

---

🤖 Generated with /publish command
EOF
)"
```

**Output:**
```
✅ Step 7/7: Pull request created

PR #42: feat(content): publish My Article
https://github.com/[user]/[repo]/pull/42

Review and merge when ready.
```

**Option 3: Skip**
```
⏭️  Step 7/7: Deployment skipped

To deploy manually:
  git push origin main
```

### Final Summary

After completion, show comprehensive summary:

```
════════════════════════════════════════════════════
🎉 PUBLISHING COMPLETE!
════════════════════════════════════════════════════

Article: My Article
Slug: my-article
Status: ✅ Published

Workflow Results:
  ✅ 1. Article polished (quality: 10/10)
  ✅ 2. Validation passed
  ✅ 3. SEO audit: 85/100
  ✅ 4. Set draft: false
  ✅ 5. Build test passed
  ✅ 6. Git commit created (abc1234)
  ✅ 7. Pushed to remote

Article is now live at:
  • https://devgiroux.com/blog/my-article
  • https://devgiroux.com/pt-br/blog/my-article

Next steps:
  • Monitor site deployment
  • Share article on social media
  • Monitor analytics/comments

════════════════════════════════════════════════════

Time saved: ~15 minutes ⏱️
```

## Flags and Options

**Available flags:**

- `--skip-polish` - Skip article polishing step
- `--skip-validation` - Skip validation step (not recommended)
- `--skip-seo` - Skip SEO audit step
- `--skip-build` - Skip build test (faster but risky)
- `--auto-push` - Automatically push without asking
- `--create-pr` - Create PR instead of direct push
- `--force` - Bypass all confirmations (use with caution)
- `--dry-run` - Show what would happen without actually doing it

**Examples:**
```bash
# Standard workflow
/publish my-article

# Fast publish (skip build)
/publish my-article --skip-build

# Auto-push to remote
/publish my-article --auto-push

# Create PR for review
/publish my-article --create-pr

# Dry run (preview only)
/publish my-article --dry-run
```

## Error Handling & Rollback

**Automatic rollback on failure:**

If any step fails after modifying files:
1. Revert `draft: false` back to `draft: true`
2. Discard git changes: `git restore content/posts/`
3. Show clear error message
4. Provide recovery instructions

**Manual rollback:**
```
If something goes wrong after publishing:

1. Unpublish the article:
   /draft-manager --unpublish [slug]

2. Or manually revert the commit:
   git revert [commit-hash]
   git push origin main

3. Then fix issues and republish:
   /publish [slug]
```

## Safety Features

**Confirmations required for:**
- Starting the workflow (unless --force)
- Continuing with SEO warnings
- Pushing to remote (unless --auto-push)
- Creating PR

**Pre-flight checks:**
- Working directory state
- Git branch verification
- Article exists
- Both locales present

**Validation gates:**
- Must pass validation (unless --skip-validation)
- Must pass build (unless --skip-build)
- Git must be in clean state or user confirms

## Integration with Other Commands

This command internally uses:
- `/polish-article [slug] --review` - For article quality analysis
- `/validate-posts` - For validation
- `/seo-audit [slug]` - For SEO checks
- `/draft-manager --publish [slug]` - For setting draft: false (internal logic)

## Performance

**Estimated time:**
- Polish review: ~10-15 seconds (or 2-5 minutes if interactive)
- Validation: ~5 seconds
- SEO audit: ~5 seconds
- Set draft: ~1 second
- Build test: ~30-60 seconds
- Git commit: ~2 seconds
- Push: ~5-10 seconds

**Total: ~1-2 minutes** (review mode) or **~3-7 minutes** (with interactive polish)

Compare to manual process: ~20-30 minutes

## Best Practices

**When to use `/publish`:**
- ✅ Publishing a fully complete article
- ✅ Regular publishing workflow
- ✅ When you want automated validation

**When NOT to use `/publish`:**
- ❌ Article still needs major edits
- ❌ Testing/experimenting with content
- ❌ Translation is incomplete

**Use instead:**
- For drafts: `/draft-manager --list`
- For partial work: Keep draft: true
- For testing: Use --dry-run flag

## Troubleshooting

**"Validation failed"**
- Run `/validate-posts` to see specific errors
- Fix errors and try again

**"Build failed"**
- Check build output for errors
- Usually MDX syntax issues
- Fix and run `npm run build` locally first

**"Git push failed"**
- Check remote repository access
- Verify branch name
- Check for merge conflicts

**"SEO score too low"**
- Run `/seo-audit [slug]` for details
- Fix issues or use `--skip-seo` to bypass
- Consider fixing before publishing

## Future Enhancements

- **Scheduled publishing** - Set future publish date
- **Social media integration** - Auto-post to Twitter/LinkedIn
- **Analytics check** - Verify tracking is set up
- **Image optimization** - Auto-optimize images before publishing
- **Slack/Discord notification** - Notify team when published
- **Deployment tracking** - Monitor actual deployment status
- **Preview link** - Generate preview URL before publishing
