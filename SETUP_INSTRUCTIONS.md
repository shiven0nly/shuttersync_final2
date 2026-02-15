# ShutterSync - Setup Instructions

## Migration Complete! ✅

Your app has been successfully migrated from Supabase to Clerk + Convex.

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Convex Development Server
Open a terminal and run:
```bash
npx convex dev
```
Keep this running in the background.

### 3. Start Next.js Development Server
Open another terminal and run:
```bash
pnpm dev
```

### 4. Access the Application
- Main app: http://localhost:3000
- Workshop registration: http://localhost:3000/workshops/register
- Admin panel: http://localhost:3000/admin

## Admin Setup

To access the admin panel, you need to create a Clerk account with the admin email:

1. Go to http://localhost:3000/sign-up
2. Sign up with email: `admin@shuttersync.com`
3. Use password: `shuttersync2025`
4. Complete the verification
5. Navigate to http://localhost:3000/admin

## Features

### For Users:
- Sign up/Sign in with Clerk (email or OAuth providers)
- Register for workshops
- View registration status
- Get notified if registration is cancelled

### For Admins:
- View all workshop registrations
- Cancel registrations (users will see "Registration Cancelled" status)
- Reactivate cancelled registrations
- Real-time updates across all clients

## Environment Variables

Your `.env.local` already has:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CONVEX_URL=https://limitless-quail-599.convex.cloud
CONVEX_DEPLOYMENT=dev:limitless-quail-599
```

## Database Schema

The Convex database has one table: `workshop_registrations`

Fields:
- `userId` - Clerk user ID
- `fullName` - User's full name
- `email` - User's email
- `phoneNumber` - User's phone number
- `workshopId` - Workshop identifier (default: 2)
- `status` - "active" or "cancelled"
- `cancelledBy` - Admin email who cancelled (optional)
- `cancelledAt` - Timestamp of cancellation (optional)

## API Functions (Convex)

Located in `convex/registrations.ts`:

### Mutations:
- `register` - Create new registration
- `cancelRegistration` - Cancel a registration (admin only)
- `reactivateRegistration` - Reactivate cancelled registration (admin only)

### Queries:
- `getUserRegistration` - Get user's registration for a workshop
- `getAllRegistrations` - Get all registrations (admin only)

## Testing the Flow

1. **User Registration:**
   - Sign up as a regular user
   - Go to /workshops/register
   - Fill out the form and submit
   - You should see "You're Registered!" message

2. **Admin Cancellation:**
   - Sign in as admin@chillthrive.com
   - Go to /admin
   - Find a registration and click "Cancel"
   - The registration moves to "Cancelled Registrations" section

3. **User Sees Cancellation:**
   - Sign in as the user whose registration was cancelled
   - Go to /workshops/register
   - You should see "Registration Cancelled" message

4. **Admin Reactivation:**
   - As admin, click "Reactivate" on a cancelled registration
   - The registration moves back to "Active Registrations"

## Troubleshooting

### Convex not connecting:
```bash
npx convex dev --once
```

### Build errors:
```bash
pnpm build
```

### Clear cache:
```bash
rm -rf .next
pnpm dev
```

## Production Deployment

1. Deploy to Vercel/Netlify
2. Set environment variables in deployment platform
3. Run `npx convex deploy` for production Convex deployment
4. Update `NEXT_PUBLIC_CONVEX_URL` with production URL

## Support

- Clerk Docs: https://clerk.com/docs
- Convex Docs: https://docs.convex.dev
- Next.js Docs: https://nextjs.org/docs
