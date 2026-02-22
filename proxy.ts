import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/homepage(.*)',
  '/events(.*)',
  '/gallery(.*)',
  '/contact(.*)',
  '/challenge(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/forgot-password(.*)',
  '/api(.*)',
  '/certificates/(.*)',
]);

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/workshops/register(.*)',
]);

const isProtectedWorkshopRoute = createRouteMatcher([
  '/workshops/color-grading',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Protect workshop routes - require authentication
  if (isProtectedWorkshopRoute(request)) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Protect specific routes that require authentication
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
