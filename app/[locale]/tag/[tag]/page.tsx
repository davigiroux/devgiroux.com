import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { ArticleCard } from '@/components/blog/article-card';
import { locales, Locale, getLocalizedPath } from '@/lib/i18n';
import { Link } from '@/lib/navigation';

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  const params: { locale: string; tag: string }[] = [];

  for (const { tag } of tags) {
    for (const locale of locales) {
      params.push({ locale, tag: encodeURIComponent(tag) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag, locale as Locale);
  const t = await getTranslations({ locale, namespace: 'tag' });

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: t('title', { tag: decodedTag }),
    description: `${t('articlesTagged', { count: posts.length })} ${decodedTag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('tag');
  const tArticle = await getTranslations('article');
  const typedLocale = locale as Locale;

  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag, typedLocale);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* Back link — plain text */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; {tArticle('backToBlog')}
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-5xl font-bold text-foreground">
            {decodedTag}
          </h1>
          <p className="mt-3 font-mono text-sm text-muted-foreground/70">
            {t('articlesTagged', { count: posts.length })}
          </p>
        </div>

        <div className="mb-12 h-px bg-border" />

        {/* Posts — 2-column grid */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
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
      </div>
    </div>
  );
}
