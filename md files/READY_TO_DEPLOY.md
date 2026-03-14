# ✅ Ready to Deploy to Netlify!

## Your Production Convex URL
```
https://loyal-avocet-12.convex.cloud
```

## ✅ .env.local Updated!

Your `.env.local` now has the production Convex URL. Here's what it looks like:

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

#DataBase
NEXT_PUBLIC_CONVEX_URL=https://loyal-avocet-12.convex.cloud
CONVEX_DEPLOYMENT=prod:loyal-avocet-12
```

## 🚀 Next Steps for Netlify Deployment

### Step 1: Update Clerk Dashboard
1. Go to: https://dashboard.clerk.com
2. Click **"Domains"** in sidebar
3. Add domain: `shuttersync-photography.netlify.app`
4. Click **"API Keys"** in sidebar
5. Add to **"Allowed origins"**: `https://shuttersync-photography.netlify.app`
6. Click **"Save"**

### Step 2: Push to GitHub (if not already done)
```bash
git add .
git commit -m "Production deployment with Convex"
git push origin main
```

### Step 3: Deploy to Netlify

1. Go to: https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select your repository
4. Configure:
   - **Build command:** `pnpm build`
   - **Publish directory:** `.next`

### Step 4: Add Environment Variables to Netlify

Click **"Add environment variables"** and add ALL of these:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bXVzaWNhbC1mbHktMjYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_y4nCA7nIBz7KxaQCKojSrwxXVk3vMc4Q2eagD7T9E9
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/sso-callback
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sso-callback
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CONVEX_URL=https://loyal-avocet-12.convex.cloud
CONVEX_DEPLOYMENT=prod:loyal-avocet-12
```

**Important:** Copy these EXACTLY as shown above!

### Step 5: Deploy!
1. Click **"Deploy site"**
2. Wait 2-5 minutes for build
3. Your site will be live! 🎉

## 🧪 Test Your Deployed Site

### 1. Test Homepage
```
https://shuttersync-photography.netlify.app
```
Should load without errors ✅

### 2. Test Sign Up
```
https://shuttersync-photography.netlify.app/sign-up
```
- Create a test account
- Should redirect to homepage after sign up ✅

### 3. Test Sign In
```
https://shuttersync-photography.netlify.app/sign-in
```
- Sign in with your test account
- Should redirect to homepage ✅
- Header should show "Logout" button ✅

### 4. Test Workshop Registration
```
https://shuttersync-photography.netlify.app/workshops/register
```
- Fill out the form
- Submit registration
- Should see "You're Registered!" ✅

### 5. Create Admin Account
```
https://shuttersync-photography.netlify.app/sign-up
```
- Email: `admin@shuttersync.com`
- Password: `shuttersync2025`
- Sign up and verify

### 6. Test Admin Panel
```
https://shuttersync-photography.netlify.app/admin
```
- Sign in as admin
- Should see all registrations ✅
- Try cancelling a registration ✅
- Try reactivating it ✅

## 📋 Environment Variables Checklist

When adding to Netlify, make sure you have:

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`
- [ ] `NEXT_PUBLIC_CONVEX_URL` (with production URL!)
- [ ] `CONVEX_DEPLOYMENT` (with prod: prefix!)

## 🎯 Quick Copy-Paste for Netlify

Just copy this entire block and paste into Netlify environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bXVzaWNhbC1mbHktMjYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_y4nCA7nIBz7KxaQCKojSrwxXVk3vMc4Q2eagD7T9E9
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/sso-callback
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sso-callback
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CONVEX_URL=https://loyal-avocet-12.convex.cloud
CONVEX_DEPLOYMENT=prod:loyal-avocet-12
```

## 🔧 Troubleshooting

### Build Fails
- Check if all environment variables are added
- Make sure `pnpm build` works locally first
- Check Netlify build logs for errors

### Authentication Not Working
- Verify domain is added in Clerk Dashboard
- Check allowed origins in Clerk Dashboard
- Clear browser cache and try again

### Convex Not Connecting
- Verify `NEXT_PUBLIC_CONVEX_URL` is correct
- Should be: `https://loyal-avocet-12.convex.cloud`
- Check Convex dashboard for errors

### Admin Panel Not Working
- Make sure you signed up with: `admin@shuttersync.com`
- Check Convex data to see if user exists
- Try signing out and signing in again

## 🎉 You're All Set!

Your environment is configured and ready for deployment!

**Production URLs:**
- Website: `https://shuttersync-photography.netlify.app`
- Convex: `https://loyal-avocet-12.convex.cloud`
- Clerk: Your existing Clerk app

**Admin Credentials:**
- Email: `admin@shuttersync.com`
- Password: `shuttersync2025`

---

**Ready to deploy?** Follow the steps above and your site will be live in minutes! 🚀
