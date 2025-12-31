'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearch } from './search-provider';

interface SearchTriggerProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showShortcut?: boolean;
  className?: string;
}

export function SearchTrigger({
  variant = 'outline',
  size = 'default',
  showShortcut = true,
  className = '',
}: SearchTriggerProps) {
  const { openSearch } = useSearch();

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcut = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <Button
      variant={variant}
      size={size}
      onClick={openSearch}
      className={`gap-2 ${className}`}
      aria-label="Open search"
    >
      <Search className="h-4 w-4" />
      {size !== 'icon' && <span>Search</span>}
      {showShortcut && size !== 'icon' && (
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-violet-500/20 bg-violet-500/10 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          {shortcut}
        </kbd>
      )}
    </Button>
  );
}
