# Quick Start Guide - ShutterSync with Clerk + Convex

## ⚡ Get Started in 3 Steps

### Step 1: Enable Email/Password in Clerk Dashboard

**IMPORTANT:** Before running the app, you need to enable email/password authentication in Clerk.

1. Go to: https://dashboard.clerk.com
2. Select your application
3. Navigate to: **User & Authentication** → **Email, Phone, Username**
4. Toggle ON: **Password** (under "Authentication strategies")
5. Click **Save**

**That's it!** Now your sign-in/sign-up pages will show email and password fields.

### Step 2: Start the Development Servers

Open two terminal windows:

**Terminal 1 - Convex:**
```bash
npx convex dev
```

**Terminal 2 - Next.js:**
```bash
pnpm dev
```

### Step 3: Test the Application

1. **Sign Up:**
   - Go to: http://localhost:3000/sign-up
   - You'll see:
     - Email field
     - Password field
     - Continue with Google (if configured)
   - Create an account

2. **Register for Workshop:**
   - Go to: http://localhost:3000/workshops/register
   - Fill out the registration form
   - Submit

3. **Access Admin Panel:**
   - Sign up with email: `admin@shuttersync.com`
   - Use password: `shuttersync2025`
   - Go to: http://localhost:3000/admin
   - View all registrations
   - Cancel/Reactivate registrations

## 🎨 What You'll See

### Sign-In Page (`/sign-in`)
```
┌─────────────────────────────────┐
│                                 │
│     Welcome back                │
│     Sign in to ShutterSync      │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Email                   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Password                │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │      SIGN IN            │   │
│  └─────────────────────────┘   │
│                                 │
│  ────── or ──────              │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔵 Continue with Google │   │
│  └─────────────────────────┘   │
│                                 │
│  Don't have an account?         │
│  Sign Up                        │
│                                 │
└─────────────────────────────────┘
```

### Sign-Up Page (`/sign-up`)
```
┌─────────────────────────────────┐
│                                 │
│     Create your account         │
│     Join ShutterSync            │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Email                   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Password                │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │      SIGN UP            │   │
│  └─────────────────────────┘   │
│                                 │
│  ────── or ──────              │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔵 Continue with Google │   │
│  └─────────────────────────┘   │
│                                 │
│  Already have an account?       │
│  Sign In                        │
│                                 │
└─────────────────────────────────┘
```

## 🔐 Authentication Features

✅ Email/Password sign-in
✅ Email/Password sign-up
✅ Google OAuth (if configured)
✅ Email verification
✅ Password reset (via Clerk)
✅ Session management
✅ Protected routes
✅ Admin-only access

## 📋 User Flow

1. **New User:**
   - Sign up → Verify email → Redirected to homepage
   - Can register for workshops
   - Can view their registration status

2. **Admin User:**
   - Sign up with `admin@shuttersync.com`
   - Access `/admin` panel
   - View all registrations
   - Cancel/Reactivate registrations
   - Changes reflect in real-time for users

3. **Cancelled Registration:**
   - User sees "Registration Cancelled" message
   - Shows who cancelled and when
   - Admin can reactivate if needed

## 🛠️ Troubleshooting

### "Password authentication is not enabled"
→ Go to Clerk Dashboard and enable Password under Authentication strategies

### Can't see email/password fields
→ Clear browser cache and refresh the page
→ Make sure you saved changes in Clerk Dashboard

### Sign-up not working
→ Check Clerk Dashboard → Restrictions → "Allow sign-ups" is ON

### Admin panel shows "Access Denied"
→ Make sure you signed up with exactly: `admin@shuttersync.com`

## 📚 Documentation

- Full setup: `CLERK_SETUP.md`
- Migration details: `MIGRATION_GUIDE.md`
- Setup instructions: `SETUP_INSTRUCTIONS.md`

## 🚀 Ready to Deploy?

1. Build the app: `pnpm build`
2. Deploy Convex: `npx convex deploy`
3. Deploy to Vercel/Netlify
4. Update environment variables in production
5. Configure production Clerk settings

---

**Need Help?** Check `CLERK_SETUP.md` for detailed Clerk configuration instructions.
