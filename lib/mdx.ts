import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { MDXComponents } from '@/components/mdx/mdx-components';

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  image?: string;
  author?: string;
  published?: boolean;
  [key: string]: unknown;
}

interface CompileMDXOptions {
  source: string;
  components?: Record<string, React.ComponentType<unknown>>;
}

export async function compileMDXContent<T extends FrontMatter>(
  options: CompileMDXOptions
) {
  const { source, components = {} } = options;

  const { content, frontmatter } = await compileMDX<T>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: false,
              defaultLang: 'plaintext',
              onVisitLine(node: { children: unknown[] }) {
                if (node.children.length === 0) {
                  node.children = [{ type: 'text', value: ' ' }];
                }
              },
              onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
                if (!node.properties.className) {
                  node.properties.className = [];
                }
                node.properties.className.push('highlighted');
              },
              onVisitHighlightedChars(node: { properties: { className?: string[] } }) {
                if (!node.properties.className) {
                  node.properties.className = [];
                }
                node.properties.className.push('highlighted-chars');
              },
            },
          ],
        ],
      },
    },
    components: { ...MDXComponents, ...components },
  });

  return {
    content,
    frontmatter: frontmatter as T,
  };
}
