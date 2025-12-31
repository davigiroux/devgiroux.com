'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse, { FuseResult } from 'fuse.js';
import { Search, X, FileText, Calendar, Tag } from 'lucide-react';
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

  // Initialize Fuse.js
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

  // Update fuse index when posts change
  useEffect(() => {
    fuse.current.setCollection(posts);
  }, [posts]);

  // Debounced search
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

  // Focus input when dialog opens
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

  // Keyboard navigation
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

  // Scroll selected item into view
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
      <DialogContent className="max-w-2xl p-0 gap-0 border-primary/20 bg-zinc-950" showCloseButton={false}>
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search blog posts</DialogTitle>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-zinc-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 border-primary/20 bg-zinc-900 text-foreground placeholder:text-zinc-500 focus-visible:ring-primary"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 text-zinc-400 hover:text-primary transition-colors"
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
              <Search className="h-12 w-12 text-zinc-700 mb-4" />
              <p className="text-sm text-zinc-400">
                Start typing to search posts...
              </p>
              <p className="text-xs text-zinc-600 mt-2">
                Use ↑ ↓ to navigate, Enter to select, Esc to close
              </p>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-zinc-700 mb-4" />
              <p className="text-sm text-zinc-400">
                No posts found for "{query}"
              </p>
              <p className="text-xs text-zinc-600 mt-2">
                Try different keywords or check your spelling
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((result, index) => (
                <button
                  key={result.item.slug}
                  onClick={() => handleSelectPost(result.item)}
                  className={`w-full text-left rounded-lg border p-4 transition-all ${
                    index === selectedIndex
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-primary/20 bg-zinc-900/50 hover:border-primary/50 hover:bg-zinc-900'
                  }`}
                >
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {result.item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                    {result.item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(result.item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {result.item.tags.length > 0 && (
                      <>
                        <span className="text-primary/30">•</span>
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          <span>{result.item.tags.slice(0, 2).join(', ')}</span>
                        </div>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-primary/20 p-3 px-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-primary/20 text-zinc-400">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-primary/20 text-zinc-400">
                  ↵
                </kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-primary/20 text-zinc-400">
                  Esc
                </kbd>
                Close
              </span>
            </div>
            {results.length > 0 && (
              <span className="text-zinc-600">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
