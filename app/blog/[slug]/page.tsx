import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { compileMDXContent } from '@/lib/mdx';
import { ArticleHeader } from '@/components/blog/article-header';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { ShareButtons } from '@/components/blog/share-buttons';
import { GiscusComments } from '@/components/blog/giscus-comments';
import { siteConfig } from '@/lib/config';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const { frontmatter } = post;
  const url = `${siteConfig.url}/blog/${slug}`;
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
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDXContent({
    source: post.content,
  });

  const url = `${siteConfig.url}/blog/${slug}`;

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
            {/* Main Content */}
            <div className="min-w-0">
              <ArticleHeader
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                readingTime={post.readingTime}
                tags={post.frontmatter.tags}
                image={post.frontmatter.coverImage}
              />

              <article className="article-content max-w-none">
                {content}
              </article>

              <div className="mt-12 border-t border-violet-500/20 pt-8">
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
                />
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents selector="article" />
            </aside>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            image: post.frontmatter.coverImage || `${siteConfig.url}/og-image.png`,
            datePublished: post.frontmatter.date,
            author: {
              '@type': 'Person',
              name: siteConfig.author.name,
            },
            publisher: {
              '@type': 'Organization',
              name: siteConfig.name,
              logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/logo.png`,
              },
            },
            keywords: post.frontmatter.tags.join(', '),
            url,
          }),
        }}
      />
    </div>
  );
}
