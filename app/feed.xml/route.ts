import { Feed } from 'feed';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en',
    image: `${siteConfig.url}/logo.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    updated: posts[0] ? new Date(posts[0].frontmatter.date) : new Date(),
    feedLinks: {
      rss2: `${siteConfig.url}/feed.xml`,
    },
    author: {
      name: siteConfig.author.name,
      link: siteConfig.url,
    },
  });

  for (const postMeta of posts) {
    const post = getPostBySlug(postMeta.slug);
    if (!post) continue;

    const url = `${siteConfig.url}/blog/${post.slug}`;

    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      content: post.content,
      author: [
        {
          name: siteConfig.author.name,
          link: siteConfig.url,
        },
      ],
      date: new Date(post.frontmatter.date),
      image: post.frontmatter.coverImage
        ? post.frontmatter.coverImage.startsWith('http')
          ? post.frontmatter.coverImage
          : `${siteConfig.url}${post.frontmatter.coverImage}`
        : undefined,
      category: post.frontmatter.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
