# Workshop System Setup Guide

## Quick Start

### 1. Deploy Convex Schema
```bash
npx convex dev
```

This will push the new database tables:
- `workshop_submissions`
- `certificates`

### 2. Test the Flow

#### As a User:
1. Go to `/workshops/register`
2. Register for the workshop
3. Click "Access Workshop" button
4. Go to `/workshops/color-grading`
5. Watch video, download DNG files
6. Submit Google Drive link

#### As Admin:
1. Go to `/admin/workshop-submissions`
2. Sign in with `admin@shuttersync.com`
3. Review pending submissions
4. Click "Approve & Generate" to create certificate
5. Certificate ID will be shown

#### Certificate Verification:
1. Go to `/certificates/{certificateId}`
2. View certificate (public, no login required)
3. Click "Download Certificate (PDF)" to print/save

## File Locations

### New Files Created:
```
convex/
├── workshopSubmissions.ts
└── certificates.ts

app/
├── workshops/
│   └── color-grading/
│       ├── page.tsx
│       └── loading.tsx
├── certificates/
│   └── [certificateId]/
│       ├── page.tsx
│       └── loading.tsx
├── admin/
│   └── workshop-submissions/
│       ├── page.tsx
│       └── loading.tsx
└── api/
    ├── download-dng/route.ts
    └── generate-certificate/route.ts

proxy.ts (updated)
convex/schema.ts (updated)
app/workshops/register/page.tsx (updated)
```

## Configuration

### 1. Admin Email
Current: `admin@shuttersync.com`

To change, update in:
- `app/admin/workshop-submissions/page.tsx`
- `app/admin/page.tsx`

### 2. Workshop Settings
File: `app/workshops/color-grading/page.tsx`

```typescript
const WORKSHOP_ID = 2;
const GOOGLE_DRIVE_LINK = 'https://drive.google.com/drive/folders/1dDCiNyplLq9H955MU-ob4SjjCsWGRbgS';
const DEADLINE = 'February 23, 2025, 11:59 PM IST';
```

### 3. Certificate Template
Upload your certificate design to:
`public/certificate-template.png`

## Features

### ✅ Implemented
- User registration for workshop
- Gated access (auth required)
- Registration verification (must be registered)
- Video completion tracking
- Secure DNG file downloads
- Google Drive submission
- Admin approval system
- Automatic certificate generation
- Public certificate verification
- Print-to-PDF functionality

### 🎨 Certificate Design
- ShutterSync branding
- Founder name: "Rajnish"
- Unique certificate ID
- Issue date
- Workshop title
- Student name
- Verification badge

## Security

1. **Authentication**: Clerk protects workshop routes
2. **Authorization**: Registration check before access
3. **File Downloads**: Authenticated API with path validation
4. **Admin Access**: Email-based verification
5. **Public Certificates**: No sensitive data exposed

## Testing Checklist

- [ ] Register for workshop
- [ ] Access workshop page (should work)
- [ ] Try accessing without registration (should redirect)
- [ ] Download DNG files
- [ ] Submit assignment
- [ ] Admin: View submissions
- [ ] Admin: Approve submission
- [ ] View generated certificate
- [ ] Verify certificate is public
- [ ] Test print-to-PDF

## Troubleshooting

### "Not registered" error
- Ensure user is logged in
- Check workshopId matches (2)
- Verify registration in Convex dashboard

### DNG downloads fail
- Check files exist in public/presets and public/raw_images
- Verify user is authenticated
- Check browser console for errors

### Certificate not found
- Verify certificateId is correct
- Check certificates table in Convex
- Ensure submission was approved

## Next Steps

1. **Add Video Player**: Replace placeholder with actual video embed
2. **Email Notifications**: Send emails on approval/rejection
3. **Certificate PDF**: Implement server-side PDF generation
4. **Cloud Storage**: Move DNG files to secure cloud storage
5. **Analytics**: Track completion rates

## Support

For issues or questions, check:
- Convex dashboard for database records
- Browser console for client errors
- Server logs for API errors
