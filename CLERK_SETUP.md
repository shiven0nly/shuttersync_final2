# Clerk Email/Password Setup Guide

## Enable Email/Password Authentication in Clerk

To enable email and password authentication in your Clerk application, follow these steps:

### 1. Go to Clerk Dashboard
Visit: https://dashboard.clerk.com

### 2. Select Your Application
Choose your ShutterSync application (the one with your publishable key starting with `pk_test_...`)

### 3. Enable Email/Password Authentication

1. In the left sidebar, click on **"User & Authentication"**
2. Click on **"Email, Phone, Username"**
3. Under **"Contact information"**, make sure **Email address** is toggled ON
4. Under **"Authentication strategies"**, toggle ON:
   - **Password** - This enables email/password sign-in
5. Click **"Save"** at the bottom

### 4. Configure Password Settings (Optional)

1. Click on **"Password"** in the left sidebar under "User & Authentication"
2. Configure password requirements:
   - Minimum length (default: 8 characters)
   - Require uppercase letters
   - Require lowercase letters
   - Require numbers
   - Require special characters
3. Click **"Save"**

### 5. Enable Social Providers (Optional)

If you want to keep Google OAuth:
1. Click on **"Social Connections"** in the left sidebar
2. Toggle ON **Google**
3. Follow the setup instructions to add your Google OAuth credentials
4. Click **"Save"**

### 6. Configure Sign-up Settings

1. Click on **"Restrictions"** in the left sidebar
2. Configure:
   - **Allow sign-ups**: Toggle ON (so users can create accounts)
   - **Require email verification**: Toggle OFF for development (ON for production)
3. Click **"Save"**

### 7. Disable OTP for Development (Optional but Recommended)

To avoid entering OTP codes every time during development:

1. Click on **"Email, Phone, Username"** in the left sidebar
2. Scroll down to **"Verification"** section
3. Find **"Require verification for sign-in"**
4. Toggle it **OFF** ❌
5. Click **"Save"**

This allows you to sign in with just email/password without OTP codes!

## Current Configuration

Your Clerk pages are already set up at:
- Sign In: `/sign-in`
- Sign Up: `/sign-up`

The pages include:
- ✅ Email/Password authentication
- ✅ Social OAuth (if configured in Clerk dashboard)
- ✅ Custom styling matching your app design
- ✅ Automatic redirects after authentication

## Testing

After enabling email/password in Clerk dashboard:

1. Go to http://localhost:3000/sign-up
2. You should see:
   - Email input field
   - Password input field
   - "Continue with Google" button (if enabled)
   - Sign up button

3. Create an account with email/password
4. If OTP is disabled: You'll be signed in immediately ✅
5. If OTP is enabled: Verify your email first
6. You'll be redirected to the homepage

## Admin Account

To create the admin account:
1. Sign up with email: `admin@shuttersync.com`
2. Use password: `shuttersync2025` (or any password with minimum 8 characters)
3. Verify the email
4. Navigate to `/admin` to access the admin panel

## Troubleshooting

### "Password authentication is not enabled"
- Go to Clerk Dashboard → User & Authentication → Email, Phone, Username
- Make sure "Password" is toggled ON under Authentication strategies

### OTP/Email verification required every time
- Go to Clerk Dashboard → User & Authentication → Email, Phone, Username
- Scroll to "Verification" section
- Toggle OFF "Require verification for sign-in"
- This is recommended for development (enable for production)

### "Sign-ups are disabled"
- Go to Clerk Dashboard → Restrictions
- Toggle ON "Allow sign-ups"

### Email verification not working
- Check your email spam folder
- In Clerk Dashboard → Email & SMS → Email, make sure email provider is configured
- For development, Clerk provides a test email service

## Production Checklist

Before deploying to production:
- [ ] Configure custom email templates in Clerk Dashboard
- [ ] Set up custom domain for Clerk (optional)
- [ ] Configure production OAuth credentials
- [ ] Enable email verification
- [ ] Set up password reset flow
- [ ] Configure session duration
- [ ] Set up webhooks for user events (optional)

## Support

If you need help:
- Clerk Documentation: https://clerk.com/docs
- Clerk Support: https://clerk.com/support
- Community Discord: https://clerk.com/discord
