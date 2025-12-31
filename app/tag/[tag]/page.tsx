import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { ArticleCard } from '@/components/blog/article-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `Browse all articles tagged with ${decodedTag}. ${posts.length} ${posts.length === 1 ? 'article' : 'articles'} found.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-zinc-400 hover:text-violet-400"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            <TagIcon className="h-4 w-4" />
            <span>Tag</span>
          </div>

          <h1 className="text-4xl font-bold text-violet-50 sm:text-5xl">
            {decodedTag}
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} tagged with{' '}
            <span className="text-violet-400">{decodedTag}</span>
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              slug={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              date={post.frontmatter.date}
              readingTime={post.readingTime}
              tags={post.frontmatter.tags}
              image={post.frontmatter.coverImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
