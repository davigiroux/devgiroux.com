import { locales, defaultLocale, type Locale } from '@/i18n';

export { locales, defaultLocale, type Locale };

/**
 * Check if a locale string is a valid supported locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the URL path with locale prefix.
 * English (default) has no prefix, Portuguese uses /pt-br/
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Normalize path to start with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  // Use lowercase for URL (pt-br instead of pt-BR)
  const urlLocale = locale.toLowerCase();
  return `/${urlLocale}${normalizedPath}`;
}

/**
 * Extract locale and clean path from a URL path
 */
export function stripLocaleFromPath(path: string): { locale: Locale; path: string } {
  for (const locale of locales) {
    const urlLocale = locale.toLowerCase();
    if (path.startsWith(`/${urlLocale}/`)) {
      return {
        locale,
        path: path.replace(`/${urlLocale}`, '') || '/',
      };
    }
    if (path === `/${urlLocale}`) {
      return {
        locale,
        path: '/',
      };
    }
  }
  return { locale: defaultLocale, path };
}

/**
 * Format date in long format for the given locale
 * English: "December 31, 2025"
 * Portuguese: "31 de dezembro de 2025"
 */
export function formatDate(date: string | Date, locale: Locale): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (locale === 'pt-BR') {
    return d.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date in short format for article cards
 * English: "Dec 31, 2025"
 * Portuguese: "31 de dez. de 2025"
 */
export function formatShortDate(date: string | Date, locale: Locale): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (locale === 'pt-BR') {
    return d.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get the alternate locale (for language switcher)
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'pt-BR' : 'en';
}

/**
 * Map locale to URL segment
 */
export function localeToUrlSegment(locale: Locale): string {
  return locale.toLowerCase();
}

/**
 * Map URL segment to locale
 */
export function urlSegmentToLocale(segment: string): Locale | null {
  const normalized = segment.toLowerCase();
  if (normalized === 'en') return 'en';
  if (normalized === 'pt-br') return 'pt-BR';
  return null;
}
