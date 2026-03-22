import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes
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
  '/api/(.*)',
  '/certificates/(.*)',
]);

// Define admin protected routes
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)'
]);

// Define specific workshop protected routes
const isProtectedWorkshopRoute = createRouteMatcher([
  '/workshops/register(.*)',
  '/workshops/color-grading',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();

  // Protect Admin routes explicitly
  if (isProtectedRoute(request)) {
    await auth.protect();
    
    if (!userId) {
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Fetch the user from Clerk to check metadata directly
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    // Check if user has an admin role
    const role = (user.publicMetadata as any)?.role;
    if (role !== 'admin') {
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Protect workshop routes explicitly
  if (isProtectedWorkshopRoute(request)) {
    if (!userId) {
      await auth.protect();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
