import Image from 'next/image';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllPosts } from '@/lib/posts';
import { ArticleCard } from '@/components/blog/article-card';
import { Locale } from '@/lib/i18n';
import { Link } from '@/lib/navigation';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const typedLocale = locale as Locale;
  const posts = getAllPosts(typedLocale);

  const [firstPost, ...restPosts] = posts;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* Header — editorial */}
        <div className="mb-8">
          <h1 className="font-display text-6xl font-bold text-foreground lg:text-8xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            {t('description')}
          </p>
          <p className="mt-2 font-mono text-sm text-muted-foreground/70">
            {t('articlesCount', { count: posts.length })}
          </p>
        </div>

        <div className="mb-16 h-px bg-border" />

        {posts.length > 0 ? (
          <>
            {/* First post — hero treatment */}
            {firstPost && (
              <Link href={`/blog/${firstPost.slug}`}>
                <article className="group mb-16">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {firstPost.frontmatter.coverImage && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                        <Image
                          src={firstPost.frontmatter.coverImage}
                          alt={firstPost.frontmatter.title}
                          fill
                          className="object-cover transition-[filter] duration-300 group-hover:brightness-110"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      {firstPost.frontmatter.tags?.length > 0 && (
                        <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                          {firstPost.frontmatter.tags.slice(0, 3).join(', ')}
                        </p>
                      )}
                      <h2 className="mb-4 font-display text-3xl font-bold text-foreground decoration-primary underline-offset-4 transition-all group-hover:underline">
                        {firstPost.frontmatter.title}
                      </h2>
                      <p className="mb-4 text-muted-foreground">
                        {firstPost.frontmatter.description}
                      </p>
                      <p className="font-mono text-sm text-muted-foreground/70">
                        {firstPost.frontmatter.date}
                        <span className="mx-2">&mdash;</span>
                        {firstPost.readingTime}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Remaining posts — 2-column grid */}
            {restPosts.length > 0 && (
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                {restPosts.map((post) => (
                  <ArticleCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                    date={post.frontmatter.date}
                    readingTime={post.readingTime}
                    tags={post.frontmatter.tags}
                    image={post.frontmatter.coverImage}
                    availableLocales={post.availableLocales}
                    isFallback={post.isFallback}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {t('noPostsYet')}
            </h2>
            <p className="text-muted-foreground">
              {t('checkBackSoon')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
