# Skills vs Slash Commands - Summary

This document explains the difference between Skills and Slash Commands in your project, and what was created.

## What Was Created

### ✅ Skills Created (Auto-invoked by Claude)

Located in `.claude/skills/`:

1. **article-polish** - Polish and improve articles
   - Triggers when: "improve article", "fix grammar", "check typos"
   - Supporting files: PRIORITIES.md, EXAMPLES.md

2. **article-validation** - Validate blog posts
   - Triggers when: "check posts", "validate articles", "find errors"
   - Read-only, safe to run anytime

3. **translate-assist** - Translate articles EN ↔ PT-BR
   - Triggers when: "translate article", "create Portuguese version"
   - Preserves code, keeps tags in English

4. **seo-check** - SEO audit and optimization
   - Triggers when: "check SEO", "optimize for search", "is this discoverable"
   - Scores articles 0-100 with recommendations

### ✅ Slash Commands (Explicit invocation)

Located in `.claude/commands/`:

1. `/polish-article [slug]` - Explicit polishing command
2. `/new-article "Title"` - Create new articles
3. `/publish [slug]` - Publishing workflow
4. `/draft-manager` - Manage drafts
5. `/validate-posts` - Explicit validation
6. `/seo-audit [slug]` - Explicit SEO audit
7. `/translate [slug] --to [locale]` - Explicit translation

## Key Differences

| Aspect | Skills | Slash Commands |
|--------|--------|----------------|
| **Invocation** | Automatic (Claude decides) | Manual (you type `/command`) |
| **When** | Based on conversation context | When you explicitly run it |
| **Discovery** | Claude matches against description | You must remember the command |
| **Structure** | Directory with SKILL.md + resources | Single .md file |
| **Best for** | Assistive, context-aware tasks | Explicit, intentional actions |

## How Skills Activate

Skills activate based on their `description` field in the YAML frontmatter. Here's when each activates:

### article-polish
**Activates when you say:**
- "Can you improve this article?"
- "Check for grammar errors"
- "Polish the welcome article"
- "Fix typos in my post"
- "Make this more readable"

**What it does:**
- Analyzes grammar, readability, structure, code examples
- Interactive mode by default (approve each change)
- Can auto-fix safe issues with `--auto-safe` mode

### article-validation
**Activates when you say:**
- "Check my blog posts for errors"
- "Validate my articles"
- "Are there any problems with my posts?"
- "Did I format everything correctly?"

**What it does:**
- Validates file naming, frontmatter, MDX syntax
- Checks locale pairing and consistency
- Reports errors, warnings, and passes
- Read-only, makes no changes

### translate-assist
**Activates when you say:**
- "Translate this article to Portuguese"
- "Create an English version"
- "Which articles are missing translations?"
- "I need a PT-BR version of this"

**What it does:**
- Translates articles between EN and PT-BR
- Preserves code, MDX components, tags
- Natural, fluent translations
- Maintains structure and frontmatter consistency

### seo-check
**Activates when you say:**
- "Is this article optimized for SEO?"
- "Will people find this on Google?"
- "Check the SEO of my post"
- "How's my meta description?"
- "Is this discoverable?"

**What it does:**
- Audits title, description, tags, content
- Scores article 0-100
- Provides quick wins and priority recommendations
- Compares against other articles

## Workflow Integration

### Natural Flow with Skills
```
You: "I just finished writing an article about React hooks"

Claude: "Would you like me to check it for errors? I can use the
         article-validation skill."

You: "Yes, and can you make sure it's optimized?"

Claude: "I'll validate it first, then run an SEO check."
        [Activates article-validation skill]
        [Activates seo-check skill]
        [Reports findings]

Claude: "I found 2 grammar issues. Would you like me to fix them?"
        [Offers to activate article-polish skill]
```

### Explicit Flow with Slash Commands
```bash
# You control exactly what runs and when
/validate-posts
/polish-article react-hooks --interactive
/seo-audit react-hooks
/publish react-hooks
```

## When to Use Which

### Use Skills When:
- ✅ You want Claude to be helpful and proactive
- ✅ You're having a conversation about your content
- ✅ You're not sure exactly what you need
- ✅ You want Claude to suggest improvements

### Use Slash Commands When:
- ✅ You know exactly what you want to run
- ✅ You're following a specific workflow
- ✅ You want explicit control (like `/publish`)
- ✅ You're scripting or automating tasks

## Both Coexist!

You can use both approaches:
- Skills for conversational, assistive work
- Slash commands for explicit control

Example:
```
# Natural conversation triggers skill
You: "Can you check if my article has any issues?"
Claude: [Uses article-validation skill]

# Later, explicit command for control
You: /publish welcome --auto-push
```

## Commands That Stayed as Slash-Only

These are **intentionally not Skills** because they're too explicit/critical:

1. **`/new-article`** - Creating articles is too intentional for auto-trigger
2. **`/publish`** - Publishing is critical, requires explicit confirmation
3. **`/draft-manager`** - Management interface, not assistive task

## Testing Your New Skills

Try these phrases to activate skills:

### Test article-polish
```
"Can you improve the grammar in my welcome article?"
"Polish the building-this-blog post"
"Check for typos in code-examples"
```

### Test article-validation
```
"Are there any errors in my blog posts?"
"Validate all my articles"
"Check if my posts are formatted correctly"
```

### Test translate-assist
```
"Which articles don't have Portuguese translations?"
"Translate the welcome article to PT-BR"
"Do I have translations for all my posts?"
```

### Test seo-check
```
"Is my welcome article optimized for SEO?"
"Check if people can find my blog on Google"
"How's the SEO on building-this-blog?"
```

## Directory Structure

```
.claude/
├── commands/               # Slash commands (explicit)
│   ├── new-article.md
│   ├── publish.md
│   ├── draft-manager.md
│   ├── validate-posts.md
│   ├── seo-audit.md
│   ├── translate.md
│   └── polish-article.md
│
└── skills/                # Skills (auto-invoked)
    ├── article-polish/
    │   ├── SKILL.md
    │   ├── PRIORITIES.md
    │   └── EXAMPLES.md
    ├── article-validation/
    │   └── SKILL.md
    ├── translate-assist/
    │   └── SKILL.md
    └── seo-check/
        └── SKILL.md
```

## Skill Metadata

Each skill has YAML frontmatter that controls its behavior:

```yaml
---
name: skill-name           # Unique identifier
description: When to use   # Claude uses this to decide when to activate
allowed-tools: Read, Edit  # Tools Claude can use without asking
---
```

The `description` field is crucial - it's how Claude knows when to offer the skill.

## Next Steps

1. **Test the skills** - Try the test phrases above
2. **Refine descriptions** - If skills trigger too often/rarely, adjust descriptions
3. **Add more skills** - Identify other assistive tasks that could be skills
4. **Keep both** - Use skills for assistance, slash commands for control

## Benefits

### Skills:
- ✅ More natural conversation flow
- ✅ Claude proactively helps
- ✅ Don't need to remember commands
- ✅ Context-aware assistance

### Slash Commands:
- ✅ Explicit control
- ✅ Predictable behavior
- ✅ Good for workflows
- ✅ Can be scripted

### Both Together:
- ✅ Best of both worlds
- ✅ Flexibility in how you work
- ✅ Natural when needed, explicit when wanted
