# How to Disable OTP/Email Verification in Clerk

## Problem
Clerk is requiring OTP (One-Time Password) verification every time you sign in, which is annoying for development.

## Solution - Disable Email Verification

### Step 1: Go to Clerk Dashboard
1. Visit: https://dashboard.clerk.com
2. Select your application (ShutterSync)

### Step 2: Disable Email Verification

#### Option A: Disable for Sign-In (Recommended for Development)
1. In the left sidebar, click **"User & Authentication"**
2. Click **"Email, Phone, Username"**
3. Scroll down to **"Verification"** section
4. Find **"Require verification for sign-in"**
5. Toggle it **OFF** ❌
6. Click **"Save"** at the bottom

#### Option B: Disable Email Verification Completely
1. In the left sidebar, click **"User & Authentication"**
2. Click **"Email, Phone, Username"**
3. Scroll down to **"Verification"** section
4. Find **"Verify email address"**
5. Toggle it **OFF** ❌
6. Click **"Save"** at the bottom

### Step 3: Disable Two-Factor Authentication (If Enabled)
1. In the left sidebar, click **"User & Authentication"**
2. Click **"Multi-factor"**
3. Make sure **"SMS code"** and **"Authenticator app"** are toggled **OFF**
4. Click **"Save"**

### Step 4: Configure Session Settings (Optional)
1. In the left sidebar, click **"Sessions"**
2. Under **"Session lifetime"**, set a longer duration (e.g., 7 days)
3. This reduces how often you need to sign in
4. Click **"Save"**

## Quick Settings for Development

For the fastest development experience:

### Recommended Settings:
- ❌ Verify email address: **OFF**
- ❌ Require verification for sign-in: **OFF**
- ❌ Multi-factor authentication: **OFF**
- ✅ Password authentication: **ON**
- ✅ Session lifetime: **7 days**

## After Making Changes

1. **Clear Browser Cache:**
   - Press `Ctrl + Shift + Delete` (Windows/Linux)
   - Press `Cmd + Shift + Delete` (Mac)
   - Clear cookies and cached data

2. **Sign Out and Sign In Again:**
   - Go to your app
   - Sign out if you're signed in
   - Sign in again with email/password
   - Should work without OTP now! ✅

3. **Test Admin Login:**
   ```
   Email: admin@shuttersync.com
   Password: shuttersync2025
   ```
   Should sign in directly without OTP!

## Visual Guide

### Before (With OTP):
```
Sign In → Enter Email → Enter Password → 
Check Email → Enter OTP Code → Signed In ❌
```

### After (Without OTP):
```
Sign In → Enter Email → Enter Password → Signed In ✅
```

## For Production

⚠️ **Important:** For production, you should:
- ✅ Enable email verification
- ✅ Enable two-factor authentication (optional)
- ✅ Require strong passwords
- ✅ Set shorter session lifetime

But for development, disabling these makes testing much faster!

## Troubleshooting

### Still Asking for OTP?
1. Make sure you saved changes in Clerk Dashboard
2. Clear browser cookies completely
3. Try in incognito/private mode
4. Sign out and sign in again
5. Wait 1-2 minutes for Clerk settings to propagate

### Can't Find the Settings?
1. Make sure you're in the correct application
2. Check you have admin access to the Clerk dashboard
3. Look under "User & Authentication" → "Email, Phone, Username"

### OTP Still Required for Existing Users?
1. Delete the existing user account in Clerk Dashboard
2. Go to "Users" in sidebar
3. Find the user and delete
4. Sign up again with the same email
5. Should work without OTP now

## Alternative: Use Test Mode

Clerk also has a "Test Mode" for development:

1. In Clerk Dashboard, look for environment selector
2. Make sure you're in **"Development"** environment
3. Development environment has more relaxed security by default

## Summary

**Quick Fix:**
1. Clerk Dashboard → User & Authentication → Email, Phone, Username
2. Turn OFF "Require verification for sign-in"
3. Save changes
4. Clear browser cache
5. Sign in again - no OTP needed! ✅

---

**Need Help?** Check Clerk documentation: https://clerk.com/docs/authentication/configuration/email-options
