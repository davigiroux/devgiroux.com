'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SearchDialog, SearchPost } from './search-dialog';

interface SearchContextValue {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}

interface SearchProviderProps {
  posts: SearchPost[];
  children: ReactNode;
}

export function SearchProvider({ posts, children }: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);
  const toggleSearch = () => setIsOpen((prev) => !prev);

  // Cmd/Ctrl + K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch, toggleSearch }}>
      {children}
      <SearchDialog posts={posts} open={isOpen} onOpenChange={setIsOpen} />
    </SearchContext.Provider>
  );
}
