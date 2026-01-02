import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // No prefix for default locale (en)
  localeDetection: false,
});

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and special routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/og') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // Handle invalid locale prefixes - redirect to English equivalent
  const firstSegment = pathname.split('/')[1];
  if (firstSegment) {
    const normalizedSegment = firstSegment.toLowerCase();
    // Check if it looks like a locale but isn't valid
    const validLocaleSegments = locales.map((l) => l.toLowerCase());
    if (
      normalizedSegment.length >= 2 &&
      normalizedSegment.length <= 5 &&
      normalizedSegment.match(/^[a-z]{2}(-[a-z]{2})?$/) &&
      !validLocaleSegments.includes(normalizedSegment)
    ) {
      // Looks like a locale but invalid - redirect to English
      const newPath = pathname.replace(`/${firstSegment}`, '') || '/';
      return NextResponse.redirect(new URL(newPath, request.url));
    }
  }

  // Run next-intl middleware
  const response = intlMiddleware(request);

  // Set locale cookie (1 year expiration)
  // next-intl sets this header when locale is detected/changed
  const locale = response.headers.get('x-middleware-request-x-next-intl-locale');
  if (locale && response instanceof NextResponse) {
    response.cookies.set('locale', locale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 31536000, // 1 year
      path: '/',
    });
  }

  return response;
}

export const config = {
  // Match all pathnames except for:
  // - api routes
  // - _next (Next.js internals)
  // - Static files with extensions
  matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
};
