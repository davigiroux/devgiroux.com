import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllPosts } from '@/lib/posts';
import { ArticleCard } from '@/components/blog/article-card';
import { Locale } from '@/lib/i18n';
import { FileText } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('description')}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('articlesCount', { count: posts.length })}
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
                availableLocales={post.availableLocales}
                isFallback={post.isFallback}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
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
