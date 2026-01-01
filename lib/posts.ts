import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { Locale, defaultLocale, locales } from "@/lib/i18n"

const postsDirectory = path.join(process.cwd(), "content/posts")

// Cache for file system operations (cleared on file changes in dev via HMR)
const cache = {
  baseSlugs: null as string[] | null,
  availableLocales: new Map<string, Locale[]>(),
  posts: new Map<string, Post | null>(),
  readingTimes: new Map<string, string>(),
}

export interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags: string[]
  coverImage?: string
  draft?: boolean
  featured?: boolean
  lang?: Locale
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
  availableLocales: Locale[]
  isFallback: boolean
}

export interface PostMeta {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: string
  availableLocales: Locale[]
  isFallback: boolean
}

/**
 * Get all unique base slugs (without locale suffix)
 * Handles both old format (slug.mdx) and new format (slug.locale.mdx)
 */
function getAllBaseSlugs(): string[] {
  if (cache.baseSlugs) {
    return cache.baseSlugs
  }

  if (!fs.existsSync(postsDirectory)) {
    cache.baseSlugs = []
    return []
  }

  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"))
  const slugs = new Set<string>()

  for (const file of files) {
    // Match: slug.mdx, slug.en.mdx, or slug.pt-BR.mdx
    const match = file.match(/^(.+?)(?:\.(en|pt-BR))?\.mdx$/)
    if (match) {
      slugs.add(match[1])
    }
  }

  cache.baseSlugs = Array.from(slugs)
  return cache.baseSlugs
}

/**
 * Get available locales for a given slug
 */
export function getAvailableLocales(slug: string): Locale[] {
  if (cache.availableLocales.has(slug)) {
    return cache.availableLocales.get(slug)!
  }

  const available: Locale[] = []

  for (const locale of locales) {
    const filePath = path.join(postsDirectory, `${slug}.${locale}.mdx`)
    if (fs.existsSync(filePath)) {
      available.push(locale)
    }
  }

  // Check for old format (without locale suffix) - treat as English
  if (available.length === 0) {
    const oldFormatPath = path.join(postsDirectory, `${slug}.mdx`)
    if (fs.existsSync(oldFormatPath)) {
      available.push("en")
    }
  }

  cache.availableLocales.set(slug, available)
  return available
}

/**
 * Get post file path with fallback logic
 * Returns null if no file found
 */
function getPostFilePath(
  slug: string,
  locale: Locale
): { path: string; isFallback: boolean } | null {
  // Try requested locale first (new format)
  const localizedPath = path.join(postsDirectory, `${slug}.${locale}.mdx`)
  if (fs.existsSync(localizedPath)) {
    return { path: localizedPath, isFallback: false }
  }

  // Fallback to English if requesting non-default locale
  if (locale !== defaultLocale) {
    const fallbackPath = path.join(postsDirectory, `${slug}.${defaultLocale}.mdx`)
    if (fs.existsSync(fallbackPath)) {
      return { path: fallbackPath, isFallback: true }
    }
  }

  // Try old format (without locale suffix) as final fallback
  const oldFormatPath = path.join(postsDirectory, `${slug}.mdx`)
  if (fs.existsSync(oldFormatPath)) {
    return { path: oldFormatPath, isFallback: locale !== defaultLocale }
  }

  return null
}

/**
 * Get reading time from English version for consistency across locales
 */
function getEnglishReadingTime(slug: string): string {
  if (cache.readingTimes.has(slug)) {
    return cache.readingTimes.get(slug)!
  }

  const enPath = path.join(postsDirectory, `${slug}.en.mdx`)
  const oldPath = path.join(postsDirectory, `${slug}.mdx`)

  const filePath = fs.existsSync(enPath) ? enPath : oldPath
  if (!fs.existsSync(filePath)) {
    cache.readingTimes.set(slug, "1 min read")
    return "1 min read"
  }

  const content = fs.readFileSync(filePath, "utf-8")
  const { content: mdxContent } = matter(content)
  const time = readingTime(mdxContent).text

  cache.readingTimes.set(slug, time)
  return time
}

/**
 * Get a single post by slug and locale
 */
export function getPostBySlug(slug: string, locale: Locale = defaultLocale): Post | null {
  const fileInfo = getPostFilePath(slug, locale)
  if (!fileInfo) {
    return null
  }

  const fileContent = fs.readFileSync(fileInfo.path, "utf-8")
  const { data, content } = matter(fileContent)
  const availableLocales = getAvailableLocales(slug)

  // Use English reading time for consistency
  const readingTimeText = getEnglishReadingTime(slug)

  return {
    slug,
    frontmatter: {
      ...data,
      lang: fileInfo.isFallback ? defaultLocale : locale,
    } as PostFrontmatter,
    content,
    readingTime: readingTimeText,
    availableLocales,
    isFallback: fileInfo.isFallback,
  }
}

/**
 * Get all posts for a specific locale
 * Falls back to English for posts without translations
 */
export function getAllPosts(locale: Locale = defaultLocale): PostMeta[] {
  const slugs = getAllBaseSlugs()

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug, locale)
      if (!post) return null

      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
        availableLocales: post.availableLocales,
        isFallback: post.isFallback,
      }
    })
    .filter((post): post is PostMeta => post !== null && !post.frontmatter.draft)
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })

  return posts
}

/**
 * Get all posts from all locales (for cross-language search)
 * Does not include fallback duplicates
 */
export function getAllPostsAllLocales(): (PostMeta & { locale: Locale })[] {
  const slugs = getAllBaseSlugs()
  const allPosts: (PostMeta & { locale: Locale })[] = []

  for (const slug of slugs) {
    const availableLocales = getAvailableLocales(slug)

    for (const locale of availableLocales) {
      const post = getPostBySlug(slug, locale)
      if (post && !post.frontmatter.draft && !post.isFallback) {
        allPosts.push({
          slug: post.slug,
          frontmatter: post.frontmatter,
          readingTime: post.readingTime,
          availableLocales: post.availableLocales,
          isFallback: post.isFallback,
          locale,
        })
      }
    }
  }

  return allPosts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

/**
 * Get featured posts for a locale
 */
export function getFeaturedPosts(locale: Locale = defaultLocale): PostMeta[] {
  return getAllPosts(locale)
    .filter((post) => post.frontmatter.featured)
    .slice(0, 3)
}

/**
 * Get latest posts for a locale
 */
export function getLatestPosts(count: number = 5, locale: Locale = defaultLocale): PostMeta[] {
  return getAllPosts(locale).slice(0, count)
}

/**
 * Get posts by tag for a locale
 * Tags remain unified (English) across all languages
 */
export function getPostsByTag(tag: string, locale: Locale = defaultLocale): PostMeta[] {
  return getAllPosts(locale).filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

/**
 * Get all tags with counts
 * Tags are unified across all languages, counting unique slugs
 */
export function getAllTags(): { tag: string; count: number }[] {
  const slugs = getAllBaseSlugs()
  const tagMap = new Map<string, Set<string>>()

  for (const slug of slugs) {
    const post = getPostBySlug(slug, "en")
    if (!post || post.frontmatter.draft) continue

    post.frontmatter.tags.forEach((tag) => {
      const normalizedTag = tag.toLowerCase()
      if (!tagMap.has(normalizedTag)) {
        tagMap.set(normalizedTag, new Set())
      }
      tagMap.get(normalizedTag)!.add(slug)
    })
  }

  return Array.from(tagMap.entries())
    .map(([tag, slugSet]) => ({ tag, count: slugSet.size }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get all unique slugs
 */
export function getAllSlugs(): string[] {
  return getAllBaseSlugs()
}

/**
 * Search posts by query
 * If locale is specified, searches only that locale
 * Otherwise searches all posts
 */
export function searchPosts(query: string, locale?: Locale): PostMeta[] {
  const posts = locale ? getAllPosts(locale) : getAllPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowerQuery)
    const descriptionMatch = post.frontmatter.description.toLowerCase().includes(lowerQuery)
    const tagMatch = post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    return titleMatch || descriptionMatch || tagMatch
  })
}
