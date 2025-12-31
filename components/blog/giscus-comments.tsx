'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface GiscusCommentsProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  inputPosition?: 'top' | 'bottom';
  lang?: string;
  loading?: 'lazy' | 'eager';
}

export function GiscusComments({
  repo = 'your-username/your-repo',
  repoId = '',
  category = 'Announcements',
  categoryId = '',
  mapping = 'pathname',
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = 'bottom',
  lang = 'en',
  loading = 'lazy',
}: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    // Show placeholder if not configured
    if (!repoId || !categoryId) {
      const placeholder = document.createElement('div');
      placeholder.className = 'rounded-lg border border-primary/20 bg-zinc-950/50 p-8 text-center';
      placeholder.innerHTML = `
        <p class="text-zinc-400 mb-2">Comments are not configured yet.</p>
        <p class="text-sm text-zinc-500">
          To enable comments, configure Giscus in your repository and update the component props.
        </p>
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-block text-cyan-500 hover:text-cyan-400 underline"
        >
          Learn how to set up Giscus →
        </a>
      `;
      ref.current.appendChild(placeholder);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', reactionsEnabled ? '1' : '0');
    script.setAttribute('data-emit-metadata', emitMetadata ? '1' : '0');
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);
  }, [
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    resolvedTheme,
    lang,
    loading,
  ]);

  // Update theme when it changes
  useEffect(() => {
    if (!repoId || !categoryId) return;

    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: resolvedTheme === 'dark' ? 'dark' : 'light',
            },
          },
        },
        'https://giscus.app'
      );
    }
  }, [resolvedTheme, repoId, categoryId]);

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Comments</h2>
      <div ref={ref} className="giscus" />
    </div>
  );
}
