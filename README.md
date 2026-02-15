# ShutterSync - Photography Community Platform

A modern photography community platform built with Next.js, featuring workshop registrations, admin management, and real-time updates.

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TailwindCSS
- **Authentication:** Clerk (Email/Password + OAuth)
- **Database:** Convex (Real-time database)
- **Animations:** GSAP, Lenis
- **Icons:** Heroicons
- **Styling:** Tailwind CSS with custom design system

## ✨ Features

### For Users
- 🔐 Sign up/Sign in with email/password or Google OAuth
- 📝 Register for photography workshops
- 👀 View registration status in real-time
- 🔔 Get notified if registration is cancelled
- 📱 Fully responsive design

### For Admins
- 👨‍💼 Admin-only dashboard (`admin@shuttersync.com`)
- 📊 View all workshop registrations
- ❌ Cancel registrations with reason tracking
- ✅ Reactivate cancelled registrations
- ⚡ Real-time updates across all clients

## 🏃 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### 1. Enable Email/Password in Clerk

**IMPORTANT:** Before running the app:

1. Go to https://dashboard.clerk.com
2. Select your application
3. Navigate to: **User & Authentication** → **Email, Phone, Username**
4. Toggle ON: **Password** (under "Authentication strategies")
5. Click **Save**

See `CLERK_SETUP.md` for detailed instructions.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development Servers

**Terminal 1 - Convex:**
```bash
npx convex dev
```

**Terminal 2 - Next.js:**
```bash
pnpm dev
```

### 4. Access the Application

- **Homepage:** http://localhost:3000
- **Sign In:** http://localhost:3000/sign-in
- **Sign Up:** http://localhost:3000/sign-up
- **Workshop Registration:** http://localhost:3000/workshops/register
- **Admin Panel:** http://localhost:3000/admin

## 🔑 Admin Access

To access the admin panel:

1. Go to http://localhost:3000/sign-up
2. Sign up with email: `admin@shuttersync.com`
3. Use password: `shuttersync2025`
4. Complete verification
5. Navigate to http://localhost:3000/admin

## 📁 Project Structure

```
shutterSync/
├── app/
│   ├── admin/                    # Admin dashboard
│   ├── workshops/register/       # Workshop registration
│   ├── sign-in/                  # Clerk sign-in page
│   ├── sign-up/                  # Clerk sign-up page
│   ├── components/               # Reusable components
│   ├── ConvexClientProvider.tsx  # Convex + Clerk integration
│   └── layout.tsx                # Root layout with providers
├── convex/
│   ├── schema.ts                 # Database schema
│   ├── registrations.ts          # API functions (mutations/queries)
│   └── _generated/               # Auto-generated Convex files
├── middleware.ts                 # Clerk authentication middleware
└── .env.local                    # Environment variables
```

## 🗄️ Database Schema

### workshop_registrations

| Field | Type | Description |
|-------|------|-------------|
| userId | string | Clerk user ID |
| fullName | string | User's full name |
| email | string | User's email |
| phoneNumber | string | User's phone number |
| workshopId | number | Workshop identifier |
| status | string | "active" or "cancelled" |
| cancelledBy | string? | Admin email who cancelled |
| cancelledAt | number? | Timestamp of cancellation |

## 🔌 API Functions (Convex)

Located in `convex/registrations.ts`:

### Mutations
- `register` - Create new workshop registration
- `cancelRegistration` - Cancel a registration (admin only)
- `reactivateRegistration` - Reactivate cancelled registration (admin only)

### Queries
- `getUserRegistration` - Get user's registration for a workshop
- `getAllRegistrations` - Get all registrations (admin only)

## 🎨 Pages

- `/` - Homepage with hero, about, services sections
- `/gallery` - Photography gallery
- `/events` - Upcoming events and workshops
- `/challenge` - Weekly photography challenges
- `/contact` - Contact form
- `/workshops/register` - Workshop registration form
- `/admin` - Admin dashboard (protected)
- `/sign-in` - Authentication (Clerk)
- `/sign-up` - Registration (Clerk)

## 🔒 Environment Variables

Your `.env.local` should contain:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment
```

## 🧪 Testing the Flow

### User Registration Flow
1. Sign up at `/sign-up`
2. Verify email
3. Go to `/workshops/register`
4. Fill out registration form
5. See "You're Registered!" confirmation

### Admin Cancellation Flow
1. Sign in as `admin@shuttersync.com`
2. Go to `/admin`
3. Click "Cancel" on a registration
4. Registration moves to "Cancelled" section
5. User sees "Registration Cancelled" message

### Reactivation Flow
1. Admin clicks "Reactivate" on cancelled registration
2. Registration moves back to "Active" section
3. User can see their active registration again

## 📚 Documentation

- `QUICK_START.md` - Quick start guide with visual examples
- `CLERK_SETUP.md` - Detailed Clerk configuration
- `MIGRATION_GUIDE.md` - Migration from Supabase to Clerk+Convex
- `SETUP_INSTRUCTIONS.md` - Complete setup instructions

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy Convex

```bash
npx convex deploy
```

Update `NEXT_PUBLIC_CONVEX_URL` with production URL.

## 🛠️ Build

```bash
pnpm build
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

- **Clerk Docs:** https://clerk.com/docs
- **Convex Docs:** https://docs.convex.dev
- **Next.js Docs:** https://nextjs.org/docs

---

Built with ❤️ for the photography community
