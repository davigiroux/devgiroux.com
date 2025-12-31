import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { TagBadge } from './tag-badge';

interface ArticleHeaderProps {
  title: string;
  date: string;
  readingTime: string;
  author?: string;
  tags?: string[];
  image?: string;
}

export function ArticleHeader({
  title,
  date,
  readingTime,
  author = 'Davi Giroux',
  tags = [],
  image,
}: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      <div className="mb-8">
        <h1 className="mb-6 text-4xl font-bold text-violet-50 sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>

          <div className="h-4 w-px bg-violet-500/20" />

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <div className="h-4 w-px bg-violet-500/20" />

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} />
            ))}
          </div>
        )}
      </div>

      {image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-violet-500/20">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
