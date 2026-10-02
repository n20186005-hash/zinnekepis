import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { CANONICAL_HOST, SITE_URL } from './lib/site';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const forwardedProto = request.headers.get('x-forwarded-proto')?.toLowerCase();

  const isApexHost = host === 'zinnekepis.com';
  const isInsecure = forwardedProto === 'http';

  // Consolidate ranking signals on a single host + protocol.
  // zinnekepis.com/*, http://www.zinnekepis.com/*  ->  301 https://www.zinnekepis.com/*
  if (isApexHost || isInsecure) {
    const target = new URL(`${nextUrl.pathname}${nextUrl.search}`, SITE_URL);
    target.host = CANONICAL_HOST;

    if (target.toString() !== nextUrl.toString()) {
      return NextResponse.redirect(target, 301);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
