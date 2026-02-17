'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse, { FuseResult } from 'fuse.js';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export interface SearchPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content?: string;
}

interface SearchDialogProps {
  posts: SearchPost[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ posts, open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchPost>[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('search');

  const fuse = useRef(
    new Fuse(posts, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'tags', weight: 1.5 },
        { name: 'content', weight: 1 },
      ],
      threshold: 0.3,
      includeMatches: true,
      minMatchCharLength: 2,
    })
  );

  useEffect(() => {
    fuse.current.setCollection(posts);
  }, [posts]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const timeoutId = setTimeout(() => {
      const searchResults = fuse.current.search(query);
      setResults(searchResults);
      setSelectedIndex(0);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelectPost(results[selectedIndex].item);
      }
    },
    [results, selectedIndex]
  );

  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleSelectPost = (post: SearchPost) => {
    onOpenChange(false);
    router.push(`/blog/${post.slug}`);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
    inputRef.current?.focus();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 border-border bg-background" showCloseButton={false}>
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search blog posts</DialogTitle>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={t('placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 border-border bg-surface text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto p-4" ref={resultsRef}>
          {!query && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                {t('startTyping')}
              </p>
              <p className="text-xs text-muted-foreground/50 mt-2">
                {t('navigationHint')}
              </p>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                {t('noResults', { query })}
              </p>
              <p className="text-xs text-muted-foreground/50 mt-2">
                {t('tryDifferent')}
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={result.item.slug}
                  onClick={() => handleSelectPost(result.item)}
                  className={`w-full text-left rounded-md p-4 transition-all ${
                    index === selectedIndex
                      ? 'bg-surface-hover'
                      : 'hover:bg-surface'
                  }`}
                >
                  <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                    {result.item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {result.item.description}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground/50">
                    {new Date(result.item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {result.item.tags.length > 0 && (
                      <>
                        <span className="mx-2">&mdash;</span>
                        {result.item.tags.slice(0, 2).join(', ')}
                      </>
                    )}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border p-3 px-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground/50">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-muted-foreground">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-muted-foreground">
                  ↵
                </kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-muted-foreground">
                  Esc
                </kbd>
                Close
              </span>
            </div>
            {results.length > 0 && (
              <span className="text-muted-foreground/50">
                {t('results', { count: results.length })}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
