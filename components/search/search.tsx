'use client';

import { useEffect, useState } from 'react';
import { SearchProvider } from './search-provider';
import type { SearchPost } from './search-dialog';

interface SearchProps {
  children?: React.ReactNode;
}

export function Search({ children }: SearchProps) {
  const [posts, setPosts] = useState<SearchPost[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return <SearchProvider posts={posts}>{children}</SearchProvider>;
}
