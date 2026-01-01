import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { ArticleCard } from '@/components/blog/article-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';
import { locales, Locale, getLocalizedPath } from '@/lib/i18n';

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
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            <Link href={getLocalizedPath('/blog', typedLocale)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {tArticle('backToBlog')}
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <TagIcon className="h-4 w-4" />
            <span>{tArticle('tag')}</span>
          </div>

          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            {decodedTag}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            {t('articlesTagged', { count: posts.length })}{' '}
            <span className="text-primary">{decodedTag}</span>
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
              availableLocales={post.availableLocales}
              isFallback={post.isFallback}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
