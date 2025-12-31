import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags: string[]
  coverImage?: string
  draft?: boolean
  featured?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
}

export interface PostMeta {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: string
}

function getMDXFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats.text,
  }
}

export function getAllPosts(): PostMeta[] {
  const files = getMDXFiles()

  const posts = files
    .map((file) => {
      const slug = file.replace(".mdx", "")
      const filePath = path.join(postsDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data, content } = matter(fileContent)
      const stats = readingTime(content)

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        readingTime: stats.text,
      }
    })
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })

  return posts
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.frontmatter.featured)
    .slice(0, 3)
}

export function getLatestPosts(count: number = 5): PostMeta[] {
  return getAllPosts().slice(0, count)
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts()
  const tagMap = new Map<string, number>()

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      const normalizedTag = tag.toLowerCase()
      tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1)
    })
  })

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getAllSlugs(): string[] {
  return getMDXFiles().map((file) => file.replace(".mdx", ""))
}

export function searchPosts(query: string): PostMeta[] {
  const posts = getAllPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowerQuery)
    const descriptionMatch = post.frontmatter.description.toLowerCase().includes(lowerQuery)
    const tagMatch = post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    return titleMatch || descriptionMatch || tagMatch
  })
}
