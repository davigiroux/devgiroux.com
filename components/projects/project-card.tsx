import { Link } from '@/lib/navigation';

export interface Project {
  name: string;
  description: string;
  status: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  blogPostPath?: string;
}

interface ProjectCardProps {
  project: Project;
  labels: {
    code: string;
    visit: string;
    readPost: string;
  };
}

export function ProjectCard({ project, labels }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 border-b border-border/50 py-10 last:border-b-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-3xl font-bold text-foreground">
          {project.name}
        </h3>
        <span className="font-mono text-xs uppercase tracking-wide text-primary">
          {project.status}
        </span>
      </div>

      <p className="max-w-3xl leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="font-mono text-xs uppercase tracking-wide text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary transition-colors hover:text-primary/80"
        >
          {labels.code}
          <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </a>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary transition-colors hover:text-primary/80"
          >
            {labels.visit}
            <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        )}

        {project.blogPostPath && (
          <Link
            href={project.blogPostPath}
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            {labels.readPost}
            <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        )}
      </div>
    </article>
  );
}
