import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPostBySlug, getAllSlugs, type Post, type PostFrontmatter } from '@/lib/posts';
import { compileMDXContent } from '@/lib/mdx';
import { ArticleHeader } from '@/components/blog/article-header';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { ShareButtons } from '@/components/blog/share-buttons';
import { GiscusComments } from '@/components/blog/giscus-comments';
import { siteConfig } from '@/lib/config';
import { locales, Locale, getLocalizedPath } from '@/lib/i18n';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const slug of slugs) {
    for (const locale of locales) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as Locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const { frontmatter } = post;
  const localizedPath = getLocalizedPath(`/blog/${slug}`, locale as Locale);
  const url = `${siteConfig.url}${localizedPath}`;
  const ogImage = frontmatter.coverImage || `${siteConfig.url}/og/blog/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      locale: locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
      creator: siteConfig.author.twitter,
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${siteConfig.url}/blog/${slug}`,
        'pt-BR': `${siteConfig.url}/pt-br/blog/${slug}`,
        'x-default': `${siteConfig.url}/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const post = getPostBySlug(slug, typedLocale);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDXContent({
    source: post.content,
  });

  const localizedPath = getLocalizedPath(`/blog/${slug}`, typedLocale);
  const url = `${siteConfig.url}${localizedPath}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_220px]">
          {/* Main Content */}
          <div className="min-w-0 max-w-3xl">
            <ArticleHeader
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              readingTime={post.readingTime}
              tags={post.frontmatter.tags}
              image={post.frontmatter.coverImage}
              isFallback={post.isFallback}
              availableLocales={post.availableLocales}
            />

            <article className="article-content max-w-none">
              {content}
            </article>

            {post.frontmatter.faq && post.frontmatter.faq.length > 0 && (
              <section className="article-content mt-12 max-w-none">
                <h2>FAQ</h2>
                {post.frontmatter.faq.map((item, idx) => (
                  <div key={idx}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Three-dot section break */}
            <div className="my-12 text-center text-2xl tracking-[1em] text-muted-foreground/40 select-none">
              &middot;&middot;&middot;
            </div>

            <div className="pt-4">
              <ShareButtons
                url={url}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
              />
            </div>

            {siteConfig.giscus.repoId && siteConfig.giscus.categoryId && (
              <GiscusComments
                repo={siteConfig.giscus.repo}
                repoId={siteConfig.giscus.repoId}
                category={siteConfig.giscus.category}
                categoryId={siteConfig.giscus.categoryId}
                slug={slug}
              />
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents selector="article" />
          </aside>
        </div>
      </div>

      <JsonLd data={blogPostingSchema(post, url, locale)} />
      {post.frontmatter.faq && post.frontmatter.faq.length > 0 && (
        <JsonLd data={faqPageSchema(post.frontmatter.faq)} />
      )}
    </div>
  );
}

function JsonLd({ data }: { data: unknown }) {
  // Escape '<' to prevent script-tag breakout if any author-controlled
  // string contained '</script>' (canonical Next.js JSON-LD pattern).
  const safe = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

function blogPostingSchema(post: Post, url: string, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.coverImage || `${siteConfig.url}/og-image.png`,
    datePublished: post.frontmatter.date,
    inLanguage: locale,
    author: { '@type': 'Person', name: siteConfig.author.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    keywords: post.frontmatter.tags.join(', '),
    url,
  };
}

function faqPageSchema(faq: NonNullable<PostFrontmatter['faq']>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
