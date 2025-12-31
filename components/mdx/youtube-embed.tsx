interface YouTubeEmbedProps {
  id: string;
  title?: string;
}

export function YouTubeEmbed({ id, title = 'YouTube video' }: YouTubeEmbedProps) {
  return (
    <div className="my-8">
      <div className="relative w-full overflow-hidden rounded-lg border border-violet-500/20" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
