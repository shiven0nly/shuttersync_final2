# Deployment Checklist for Netlify

## 🚀 Quick Deployment Steps

### 1. Deploy Convex (Do This FIRST!)
```bash
npx convex deploy
```
- [ ] Copy the production URL (e.g., `https://xxx.convex.cloud`)
- [ ] Save it - you'll need it for Netlify!

### 2. Update Clerk Dashboard
- [ ] Go to https://dashboard.clerk.com
- [ ] Add domain: `shuttersync-photography.netlify.app`
- [ ] Add to allowed origins: `https://shuttersync-photography.netlify.app`

### 3. Push to GitHub
```bash
git add .
git commit -m "Production deployment"
git push origin main
```

### 4. Configure Netlify
- [ ] Connect GitHub repository
- [ ] Build command: `pnpm build`
- [ ] Publish directory: `.next`

### 5. Add Environment Variables to Netlify

Copy these from your `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bXVzaWNhbC1mbHktMjYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_y4nCA7nIBz7KxaQCKojSrwxXVk3vMc4Q2eagD7T9E9
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/sso-callback
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sso-callback
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

**IMPORTANT:** Update these with PRODUCTION values:
```env
NEXT_PUBLIC_CONVEX_URL=<YOUR_PRODUCTION_CONVEX_URL>
CONVEX_DEPLOYMENT=prod:<YOUR_DEPLOYMENT_NAME>
```

### 6. Deploy
- [ ] Click "Deploy site" in Netlify
- [ ] Wait for build to complete

### 7. Test Everything
- [ ] Visit: https://shuttersync-photography.netlify.app
- [ ] Test sign up
- [ ] Test sign in
- [ ] Test workshop registration
- [ ] Create admin account: `admin@shuttersync.com`
- [ ] Test admin panel

## ⚠️ Important Notes

### DO NOT Change in .env.local:
- ✅ Redirect URLs are relative paths (`/sign-in`, `/sso-callback`)
- ✅ They work on both localhost and production
- ✅ No need to change them!

### DO Change for Production:
- ⚠️ `NEXT_PUBLIC_CONVEX_URL` - Use production URL from `npx convex deploy`
- ⚠️ `CONVEX_DEPLOYMENT` - Use production deployment name

## 🔍 Quick Test

After deployment:

1. **Sign Up Test:**
   ```
   https://shuttersync-photography.netlify.app/sign-up
   ```

2. **Admin Test:**
   ```
   Email: admin@shuttersync.com
   Password: shuttersync2025
   URL: https://shuttersync-photography.netlify.app/admin
   ```

3. **Workshop Test:**
   ```
   https://shuttersync-photography.netlify.app/workshops/register
   ```

## 📝 Summary

**Your .env.local stays the same!** ✅

The redirect URLs like `/sign-in`, `/sign-up`, `/sso-callback` are relative paths that work everywhere.

**Only update:**
- Convex URL to production
- Add all env vars to Netlify
- Update Clerk Dashboard with production domain

That's it! 🎉
