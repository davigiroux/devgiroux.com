import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/about-hero';
import { Journey } from '@/components/about/journey';
import { Mission } from '@/components/about/mission';
import { Skills } from '@/components/about/skills';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Journey />
      <Mission />
      <Skills />
    </>
  );
}
