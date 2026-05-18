import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectsHero } from '@/components/projects/projects-hero';
import { ProjectsGrid } from '@/components/projects/projects-grid';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
    </>
  );
}
