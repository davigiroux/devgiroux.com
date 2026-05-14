import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { ArticleListItem } from '@/components/blog/article-list-item';
import { getFeaturedPosts, getLatestPosts, getAllTags } from '@/lib/posts';
import { getLocalizedPath, Locale } from '@/lib/i18n';
import { Link } from '@/lib/navigation';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('sections');
  const typedLocale = locale as Locale;

  const featuredPosts = getFeaturedPosts(typedLocale);
  const latestPosts = getLatestPosts(6, typedLocale);
  const tags = getAllTags();

  const [firstFeatured, ...restFeatured] = featuredPosts;

  return (
    <>
      <Hero />

      {/* Featured Posts — asymmetric editorial layout */}
      {featuredPosts.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            {/* Section label + draw-line divider */}
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {t('featuredArticles')}
            </p>
            <div className="mb-12 h-px bg-border animate-draw-line" />

            <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
              {/* Left — hero featured post */}
              {firstFeatured && (
                <Link href={`/blog/${firstFeatured.slug}`}>
                  <article className="group">
                    {firstFeatured.frontmatter.coverImage && (
                      <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-lg">
                        <Image
                          src={firstFeatured.frontmatter.coverImage}
                          alt={firstFeatured.frontmatter.title}
                          fill
                          className="object-cover transition-[filter] duration-300 group-hover:brightness-110"
                        />
                      </div>
                    )}
                    {firstFeatured.frontmatter.tags?.length > 0 && (
                      <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        {firstFeatured.frontmatter.tags.slice(0, 3).join(', ')}
                      </p>
                    )}
                    <h3 className="mb-3 font-display text-3xl font-bold text-foreground decoration-primary underline-offset-4 transition-all group-hover:underline">
                      {firstFeatured.frontmatter.title}
                    </h3>
                    <p className="mb-3 text-muted-foreground">
                      {firstFeatured.frontmatter.description}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground/70">
                      {firstFeatured.frontmatter.date}
                    </p>
                  </article>
                </Link>
              )}

              {/* Right — numbered list of remaining featured */}
              {restFeatured.length > 0 && (
                <div className="flex flex-col">
                  {restFeatured.map((post, i) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <article className="group flex gap-4 border-b border-border/50 py-5 transition-colors last:border-b-0">
                        <span className="shrink-0 font-mono text-sm text-primary/60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                            {post.frontmatter.title}
                          </h4>
                          <p className="mt-1 font-mono text-xs text-muted-foreground/70">
                            {post.frontmatter.date}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles — list-style rows */}
      <section id="latest" className="bg-surface py-16 sm:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t('latestArticles')}
          </p>
          <div className="mb-12 h-px bg-border animate-draw-line" />

          <div className="max-w-4xl">
            {latestPosts.map((post) => (
              <ArticleListItem
                key={post.slug}
                slug={post.slug}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                date={post.frontmatter.date}
                tags={post.frontmatter.tags}
              />
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary transition-colors hover:text-primary/80"
            >
              {t('viewAllArticles')}
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics — inline text cloud */}
      {tags.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {t('exploreByTopic')}
            </p>
            <div className="mb-12 h-px bg-border animate-draw-line" />

            <p className="max-w-3xl text-lg leading-loose break-words">
              {tags.map(({ tag, count }, i) => (
                <span key={tag}>
                  {i > 0 && (
                    <>
                      {' '}
                      <span className="text-muted-foreground/30 select-none">/</span>{' '}
                    </>
                  )}
                  <Link
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className={`text-muted-foreground transition-colors hover:text-primary ${
                      count > 5
                        ? 'font-semibold'
                        : count > 2
                          ? 'font-normal'
                          : 'font-light'
                    }`}
                  >
                    {tag}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
