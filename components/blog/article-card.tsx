import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { TagBadge } from './tag-badge';

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags?: string[];
  image?: string;
}

export function ArticleCard({
  slug,
  title,
  description,
  date,
  readingTime,
  tags = [],
  image,
}: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group overflow-hidden border-border bg-card backdrop-blur transition-all hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10">
        {image && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
