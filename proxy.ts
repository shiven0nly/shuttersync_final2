import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

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
]);

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/workshops/register(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
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
