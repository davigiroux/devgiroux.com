import { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, getAllSlugs, getAvailableLocales } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();
  const tags = getAllTags();

  // Static pages with language alternates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: siteConfig.url,
          'pt-BR': `${siteConfig.url}/pt-br`,
        },
      },
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteConfig.url}/blog`,
          'pt-BR': `${siteConfig.url}/pt-br/blog`,
        },
      },
    },
  ];

  // Blog posts with language alternates
  const postUrls: MetadataRoute.Sitemap = slugs.flatMap((slug) => {
    const post = getAllPosts('en').find((p) => p.slug === slug);
    if (!post) return [];

    return [
      {
        url: `${siteConfig.url}/blog/${slug}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${siteConfig.url}/blog/${slug}`,
            'pt-BR': `${siteConfig.url}/pt-br/blog/${slug}`,
          },
        },
      },
    ];
  });

  // Tag pages with language alternates
  const tagUrls: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
    url: `${siteConfig.url}/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
    alternates: {
      languages: {
        en: `${siteConfig.url}/tag/${encodeURIComponent(tag)}`,
        'pt-BR': `${siteConfig.url}/pt-br/tag/${encodeURIComponent(tag)}`,
      },
    },
  }));

  return [...staticPages, ...postUrls, ...tagUrls];
}
