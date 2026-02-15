# Netlify Deployment Guide for ShutterSync

## Your Production Domain
```
https://shuttersync-photography.netlify.app
```

## Pre-Deployment Checklist

### 1. Deploy Convex to Production

**Important:** Do this FIRST before deploying to Netlify!

```bash
npx convex deploy
```

This will:
- Create a production Convex deployment
- Give you a production URL (e.g., `https://your-project.convex.cloud`)
- Save it as `CONVEX_DEPLOYMENT` in your `.env.local`

**Copy the production Convex URL** - you'll need it for Netlify!

### 2. Update Clerk Dashboard

1. Go to: https://dashboard.clerk.com
2. Select your ShutterSync application
3. Click **"Domains"** in the left sidebar
4. Add your production domain:
   ```
   shuttersync-photography.netlify.app
   ```
5. Click **"Add domain"**
6. Clerk will show you the domain is verified ✅

### 3. Configure Clerk Allowed Origins

1. Still in Clerk Dashboard
2. Click **"API Keys"** in the left sidebar
3. Scroll to **"Allowed origins"**
4. Add:
   ```
   https://shuttersync-photography.netlify.app
   ```
5. Click **"Save"**

## Netlify Deployment Steps

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 2: Connect to Netlify

1. Go to: https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** (or your git provider)
4. Select your ShutterSync repository
5. Configure build settings:

**Build Settings:**
```
Build command: pnpm build
Publish directory: .next
```

### Step 3: Add Environment Variables in Netlify

Click **"Add environment variables"** and add these:

#### Clerk Variables (from your .env.local):
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bXVzaWNhbC1mbHktMjYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_y4nCA7nIBz7KxaQCKojSrwxXVk3vMc4Q2eagD7T9E9
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/sso-callback
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sso-callback
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

#### Convex Variables (from production deployment):
```
NEXT_PUBLIC_CONVEX_URL=https://your-production.convex.cloud
CONVEX_DEPLOYMENT=prod:your-deployment-name
```

**Important:** Use the PRODUCTION Convex URL from `npx convex deploy`, not the dev URL!

### Step 4: Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://shuttersync-photography.netlify.app`

## Post-Deployment Configuration

### 1. Test Authentication

1. Go to: `https://shuttersync-photography.netlify.app/sign-up`
2. Create a test account
3. Should redirect properly after sign-up ✅
4. Try signing out and signing in again

### 2. Create Admin Account

1. Go to: `https://shuttersync-photography.netlify.app/sign-up`
2. Sign up with:
   ```
   Email: admin@shuttersync.com
   Password: shuttersync2025
   ```
3. Verify email (if required)
4. Go to: `https://shuttersync-photography.netlify.app/admin`
5. Should see admin dashboard ✅

### 3. Test Workshop Registration

1. Sign in as a regular user
2. Go to: `https://shuttersync-photography.netlify.app/workshops/register`
3. Fill out registration form
4. Submit
5. Should see "You're Registered!" ✅

### 4. Test Admin Cancellation

1. Sign in as admin
2. Go to admin panel
3. Cancel a registration
4. Sign in as that user
5. Should see "Registration Cancelled" ✅

## Environment Variables Summary

### Your .env.local (Keep as is - relative paths work everywhere!)
```env
#Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bXVzaWNhbC1mbHktMjYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_y4nCA7nIBz7KxaQCKojSrwxXVk3vMc4Q2eagD7T9E9
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/sso-callback
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sso-callback
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

#DataBase - UPDATE THIS FOR PRODUCTION!
NEXT_PUBLIC_CONVEX_URL=https://your-production.convex.cloud
CONVEX_DEPLOYMENT=prod:your-deployment-name
```

### Netlify Environment Variables (Same as above)
Copy all variables from `.env.local` to Netlify, but make sure to use PRODUCTION Convex URL!

## Important Notes

### ✅ What Stays the Same:
- All redirect URLs (they're relative paths like `/sign-in`)
- Clerk publishable key and secret key
- All other environment variables

### ⚠️ What Changes:
- `NEXT_PUBLIC_CONVEX_URL` - Must use production URL from `npx convex deploy`
- `CONVEX_DEPLOYMENT` - Must use production deployment name

### 🔒 Security for Production:

1. **Enable Email Verification in Clerk:**
   - Clerk Dashboard → Email, Phone, Username
   - Toggle ON "Verify email address"

2. **Enable Strong Password Requirements:**
   - Clerk Dashboard → Password
   - Set minimum 8 characters
   - Require uppercase, lowercase, numbers

3. **Set Session Lifetime:**
   - Clerk Dashboard → Sessions
   - Set to 1 day or 7 days

4. **Monitor Admin Actions:**
   - Check Convex dashboard regularly
   - Monitor who's accessing admin panel

## Troubleshooting

### Build Fails on Netlify
```bash
# Check build logs in Netlify
# Common issues:
- Missing environment variables
- Wrong Node.js version
- Missing dependencies
```

**Fix:** Add `NODE_VERSION=18` to Netlify environment variables

### Authentication Not Working
- Check Clerk Dashboard → Domains
- Make sure `shuttersync-photography.netlify.app` is added
- Check Clerk Dashboard → API Keys → Allowed origins
- Make sure production URL is added

### Convex Not Connecting
- Make sure you ran `npx convex deploy`
- Check `NEXT_PUBLIC_CONVEX_URL` in Netlify env vars
- Should be production URL, not dev URL
- Check Convex dashboard for errors

### Admin Panel Not Working
- Sign up with exactly: `admin@shuttersync.com`
- Check Convex data to verify user exists
- Check browser console for errors

### Redirects Not Working
- Check Netlify build logs
- Make sure `proxy.ts` is included in build
- Check browser console for errors
- Try clearing browser cache

## Continuous Deployment

Once set up, every time you push to GitHub:
1. Netlify automatically builds
2. Deploys to production
3. Your site updates automatically ✅

## Custom Domain (Optional)

If you want to use your own domain:

1. In Netlify, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `shuttersync.com`)
4. Follow DNS configuration instructions
5. Update Clerk Dashboard with new domain

## Monitoring

### Netlify Analytics
- Go to Netlify Dashboard → Analytics
- Monitor traffic, performance, errors

### Convex Dashboard
- Go to: https://dashboard.convex.dev
- Monitor database queries
- Check function logs
- View real-time data

### Clerk Dashboard
- Go to: https://dashboard.clerk.com
- Monitor user sign-ups
- Check authentication logs
- View active sessions

## Quick Deployment Checklist

- [ ] Run `npx convex deploy` and copy production URL
- [ ] Add production domain to Clerk Dashboard
- [ ] Push code to GitHub
- [ ] Connect repository to Netlify
- [ ] Add all environment variables to Netlify
- [ ] Use PRODUCTION Convex URL in Netlify env vars
- [ ] Deploy site
- [ ] Test authentication
- [ ] Create admin account
- [ ] Test workshop registration
- [ ] Test admin panel

---

**Your site will be live at:** https://shuttersync-photography.netlify.app 🚀

**Need help?** Check Netlify docs: https://docs.netlify.com
