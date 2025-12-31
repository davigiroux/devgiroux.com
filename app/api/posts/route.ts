import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts();
  const searchPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags,
  }));
  return NextResponse.json(searchPosts);
}
