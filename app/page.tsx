import Link from 'next/link';
import { Hero } from '@/components/home/hero';
import { ArticleCard } from '@/components/blog/article-card';
import { TagBadge } from '@/components/blog/tag-badge';
import { getFeaturedPosts, getLatestPosts, getAllTags } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts(6);
  const tags = getAllTags();

  return (
    <>
      <Hero />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="border-b border-border bg-background py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Featured Articles
              </h2>
              <p className="mt-2 text-muted-foreground">
                Handpicked posts you shouldn't miss
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
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
        </section>
      )}

      {/* Latest Articles */}
      <section id="latest" className="border-b border-border bg-surface py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Latest Articles
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fresh insights and tutorials
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              className="hidden text-primary hover:text-primary/80 sm:flex"
            >
              <Link href="/blog">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
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

          <div className="mt-12 text-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/blog">
                View all articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tags Cloud */}
      {tags.length > 0 && (
        <section className="bg-background py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Explore by Topic
              </h2>
              <p className="mt-2 text-muted-foreground">
                Browse articles by category
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {tags.map(({ tag, count }) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  count={count}
                  href={`/tag/${encodeURIComponent(tag)}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
