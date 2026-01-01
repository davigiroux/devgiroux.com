import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-foreground">
        {t('notFound')}
      </h2>
      <p className="mb-8 text-muted-foreground">
        {t('notFoundDescription')}
      </p>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          {t('backHome')}
        </Link>
      </Button>
    </div>
  );
}
