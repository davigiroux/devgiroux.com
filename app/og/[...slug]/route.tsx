import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

// Use Node.js runtime since we need fs access for posts
export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';

  // Default OG image for homepage
  if (!slugPath || slugPath === '') {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0f',
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                fontSize: 80,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: 20,
              }}
            >
              {siteConfig.name}
            </h1>
            <p
              style={{
                fontSize: 32,
                color: '#a1a1aa',
                textAlign: 'center',
                maxWidth: 800,
              }}
            >
              {siteConfig.description}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Blog post OG image
  if (slugPath.startsWith('blog/')) {
    const postSlug = slugPath.replace('blog/', '');
    const post = getPostBySlug(postSlug);

    if (!post) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0a0a0f',
              fontSize: 48,
              color: '#fafafa',
            }}
          >
            Post not found
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const { frontmatter } = post;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0a0a0f',
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            padding: 60,
          }}
        >
          {/* Tags */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: 24,
            }}
          >
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  color: '#a78bfa',
                  padding: '8px 16px',
                  borderRadius: 20,
                  fontSize: 20,
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#fafafa',
              lineHeight: 1.2,
              marginBottom: 24,
              maxWidth: 1000,
            }}
          >
            {frontmatter.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 28,
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: 900,
              marginBottom: 'auto',
            }}
          >
            {frontmatter.description}
          </p>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fafafa',
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {siteConfig.author.name.charAt(0)}
              </div>
              <span style={{ color: '#d4d4d8', fontSize: 24 }}>
                {siteConfig.author.name}
              </span>
            </div>

            <span style={{ color: '#71717a', fontSize: 22 }}>
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Fallback
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0f',
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {siteConfig.name}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
