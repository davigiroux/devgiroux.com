'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  selector?: string;
}

export function TableOfContents({ selector = 'article' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const container = document.querySelector(selector);
    if (!container) return;

    const elements = container.querySelectorAll('h2, h3, h4');
    const headingData: Heading[] = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number(element.tagName.charAt(1)),
    }));

    setHeadings(headingData);
  }, [selector]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-20 hidden lg:block">
      <div className="rounded-lg border border-border bg-card backdrop-blur">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-between p-4 text-sm font-semibold text-foreground hover:text-primary transition-colors lg:cursor-default"
          aria-expanded={!isCollapsed}
        >
          <span>Table of Contents</span>
          <span className="lg:hidden">
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </span>
        </button>

        {!isCollapsed && (
          <ul className="space-y-1 p-4 pt-0">
            {headings.map(({ id, text, level }) => (
              <li
                key={id}
                style={{ paddingLeft: `${(level - 2) * 0.75}rem` }}
                className="transition-all"
              >
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`block py-1.5 text-sm transition-colors ${
                    activeId === id
                      ? 'font-medium text-primary border-l-2 border-primary pl-3 -ml-3'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
