# Migration from Supabase to Clerk + Convex

## Overview
This project has been successfully migrated from Supabase (auth + database) to Clerk (auth) + Convex (database).

## What Changed

### Authentication
- **Before**: Supabase Auth with email/password and Google OAuth
- **After**: Clerk with built-in authentication UI and multiple providers

### Database
- **Before**: Supabase PostgreSQL with Row Level Security
- **After**: Convex real-time database with TypeScript schema

### Key Features
1. **Workshop Registration**: Users can register for workshops
2. **Admin Panel**: Admins can view all registrations and cancel/reactivate them
3. **Real-time Updates**: When admin cancels a registration, it reflects immediately for the user
4. **Secure Access**: Only admin@shuttersync.com can access the admin panel

## Environment Variables
Make sure your `.env.local` has:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment
```

## Running the Project

1. Install dependencies:
```bash
pnpm install
```

2. Start Convex dev server:
```bash
npx convex dev
```

3. In another terminal, start Next.js:
```bash
pnpm dev
```

## Admin Access
To access the admin panel:
1. Create a Clerk account with email: `admin@chillthrive.com`
2. Navigate to `/admin`
3. You'll see all workshop registrations with options to cancel/reactivate

## Convex Schema
The database schema is defined in `convex/schema.ts`:
- `workshop_registrations` table with fields:
  - userId (Clerk user ID)
  - fullName
  - email
  - phoneNumber
  - workshopId
  - status (active/cancelled)
  - cancelledBy (admin email)
  - cancelledAt (timestamp)

## API Functions
Located in `convex/registrations.ts`:
- `register`: Create a new workshop registration
- `getUserRegistration`: Get user's registration for a specific workshop
- `getAllRegistrations`: Get all registrations (admin only)
- `cancelRegistration`: Cancel a registration (admin only)
- `reactivateRegistration`: Reactivate a cancelled registration (admin only)

## Pages Updated
- `/sign-in`: Clerk sign-in page
- `/sign-up`: Clerk sign-up page
- `/workshops/register`: Workshop registration with Convex
- `/admin`: Admin panel with Clerk auth and Convex queries
- Header component: Updated to use Clerk's useUser hook

## Removed Files
- `app/lib/supabase.ts`
- `app/auth/callback/route.ts`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- Supabase dependencies from package.json
