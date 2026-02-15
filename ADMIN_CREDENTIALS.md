# Admin Credentials

## Admin Account Details

To access the admin panel at `/admin`, use these credentials:

### Email
```
admin@shuttersync.com
```

### Password
```
shuttersync2025
```

## Setup Instructions

1. **Create Admin Account:**
   - Go to: http://localhost:3000/sign-up
   - Enter email: `admin@shuttersync.com`
   - Enter password: `shuttersync2025`
   - Complete email verification (check your inbox)

2. **Access Admin Panel:**
   - Go to: http://localhost:3000/admin
   - You'll see the admin dashboard with all registrations

3. **Admin Capabilities:**
   - ✅ View all workshop registrations
   - ✅ See registration statistics (Total, Active, Cancelled)
   - ✅ Cancel any registration
   - ✅ Reactivate cancelled registrations
   - ✅ Track who cancelled and when

## Security Notes

⚠️ **Important:**
- Only accounts with email `admin@shuttersync.com` can access the admin panel
- Other users will see "Access Denied" if they try to access `/admin`
- The admin check is done on the server side for security
- Change these credentials in production!

## For Production

Before deploying to production:

1. **Change Admin Email:**
   - Update `ADMIN_EMAIL` in `app/admin/page.tsx`
   - Use a secure, private email address

2. **Use Strong Password:**
   - Use a password manager to generate a strong password
   - Never commit credentials to version control

3. **Enable 2FA:**
   - In Clerk Dashboard, enable two-factor authentication
   - Require 2FA for admin accounts

4. **Set Up Webhooks:**
   - Monitor admin actions via Clerk webhooks
   - Log all admin activities

## Testing Admin Features

### Cancel a Registration
1. Sign in as admin
2. Go to `/admin`
3. Find a registration in "Active Registrations"
4. Click "Cancel" button
5. Confirm the action
6. Registration moves to "Cancelled Registrations" section

### Reactivate a Registration
1. Find a cancelled registration
2. Click "Reactivate" button
3. Confirm the action
4. Registration moves back to "Active Registrations"

### User Experience
When a registration is cancelled:
- User sees "Registration Cancelled" message at `/workshops/register`
- Shows who cancelled it (admin email)
- User cannot register again until reactivated

## Troubleshooting

### "Access Denied" Error
- Make sure you're signed in with exactly: `admin@shuttersync.com`
- Email is case-sensitive
- Clear browser cache and try again

### Can't Sign Up with Admin Email
- Email might already be registered
- Try signing in instead of signing up
- Or use Clerk Dashboard to delete the existing account

### Admin Panel Not Loading
- Make sure Convex is running: `npx convex dev`
- Check browser console for errors
- Verify environment variables are set correctly

---

**Remember:** Keep these credentials secure and change them in production!
