import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { ArticleCard } from '@/components/blog/article-card';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read articles about web development, programming, and technology.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Articles about web development, programming, and technology.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No posts yet
            </h2>
            <p className="text-muted-foreground">
              Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
