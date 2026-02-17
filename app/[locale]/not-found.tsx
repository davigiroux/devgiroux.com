import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 font-display text-8xl font-bold text-foreground">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-foreground">
        {t('notFound')}
      </h2>
      <p className="mb-2 text-muted-foreground">
        {t('notFoundDescription')}
      </p>
      <p className="mb-8 text-sm italic text-muted-foreground/60">
        {t('notFoundHumor')}
      </p>
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; {t('backHome')}
      </Link>
    </div>
  );
}
