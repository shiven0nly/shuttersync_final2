# Workshop System Documentation

## Overview
Complete workshop management system with registration, gated content access, submission tracking, and certificate generation.

## Features Implemented

### 1. Workshop Registration
- **Location**: `/workshops/register`
- Users register for Color Grading Workshop (workshopId: 2)
- Registration stored in Convex `workshop_registrations` table
- Access button appears after successful registration

### 2. Gated Workshop Content
- **Location**: `/workshops/color-grading`
- **Protection**: Middleware redirects non-authenticated users to `/sign-in`
- **Access Control**: Only registered users (workshopId: 2) can access
- Non-registered users redirected to registration page

### 3. Workshop Content
- Workshop video player (placeholder for actual video embed)
- Manual "video completed" checkbox
- DNG file downloads (3 presets + 3 raw images)
- Challenge instructions with deadline
- Google Drive submission link

### 4. DNG Download Security
- **API Route**: `/api/download-dng`
- Requires authentication (Clerk userId)
- Validates filename to prevent directory traversal
- Only allows downloads from `presets/` and `raw_images/` folders
- Returns files as downloadable attachments

### 5. Submission System
- **Convex Table**: `workshop_submissions`
- Users submit Google Drive link
- Tracks video completion status
- Submission status: pending, approved, rejected
- Can update submission before approval

### 6. Admin Panel
- **Location**: `/admin/workshop-submissions`
- **Access**: Only admin@shuttersync.com
- View all submissions (pending, approved, rejected)
- Approve submissions → generates certificate
- Reject submissions
- View certificate links for approved submissions

### 7. Certificate Generation
- **Convex Table**: `certificates`
- Auto-generated on admin approval
- Unique certificate ID format: `SS-{timestamp}-{random}`
- Stores: certificateId, userId, fullName, workshopTitle, issueDate
- One certificate per submission (no regeneration)

### 8. Certificate Verification
- **Location**: `/certificates/[certificateId]`
- **Public Route**: No authentication required
- Displays certificate details
- Shows verification status (Valid/Not Found)
- Certificate preview with ShutterSync branding
- Founder name: "Rajnish"
- Print-to-PDF functionality

## Database Schema

### workshop_submissions
```typescript
{
  userId: string
  registrationId: Id<"workshop_registrations">
  workshopId: number
  fullName: string
  email: string
  driveLink: string
  videoCompleted: boolean
  status: "pending" | "approved" | "rejected"
  reviewedBy?: string
  reviewedAt?: number
  submittedAt: number
  certificateIssued: boolean
  certificateId?: string
}
```

### certificates
```typescript
{
  certificateId: string
  userId: string
  fullName: string
  workshopTitle: string
  workshopId: number
  issueDate: number
  submissionId: Id<"workshop_submissions">
}
```

## Security Features

1. **Authentication**: Clerk middleware protects workshop routes
2. **Authorization**: Registration check before workshop access
3. **File Downloads**: Authenticated API route with path validation
4. **Admin Access**: Email-based admin verification
5. **Public Certificates**: Verification route is public but doesn't expose sensitive data

## Configuration

### Admin Email
Update in both files:
- `/app/admin/workshop-submissions/page.tsx`
- `/app/admin/page.tsx`

```typescript
const ADMIN_EMAIL = 'admin@shuttersync.com';
```

### Workshop Details
Update in `/app/workshops/color-grading/page.tsx`:
```typescript
const WORKSHOP_ID = 2;
const GOOGLE_DRIVE_LINK = 'https://drive.google.com/drive/folders/...';
const DEADLINE = 'February 23, 2025, 11:59 PM IST';
```

## File Structure
```
app/
├── workshops/
│   ├── register/page.tsx (registration)
│   └── color-grading/page.tsx (workshop content)
├── certificates/
│   └── [certificateId]/page.tsx (verification)
├── admin/
│   └── workshop-submissions/page.tsx (admin panel)
└── api/
    ├── download-dng/route.ts (secure downloads)
    └── generate-certificate/route.ts (certificate API)

convex/
├── workshopSubmissions.ts (submission mutations/queries)
├── certificates.ts (certificate queries)
└── schema.ts (database schema)

middleware.ts (route protection)
```

## User Flow

1. User registers at `/workshops/register`
2. After registration, "Access Workshop" button appears
3. User clicks → redirected to `/workshops/color-grading`
4. User watches video, downloads DNG files
5. User edits images and uploads to Google Drive
6. User submits Drive link
7. Admin reviews at `/admin/workshop-submissions`
8. Admin approves → certificate generated
9. User receives certificate at `/certificates/{certificateId}`
10. Certificate is publicly verifiable

## Next Steps

1. **Upload Certificate Template**: Replace `public/certificate-template.png` with actual design
2. **Embed Video**: Add actual video player/embed code
3. **Email Notifications**: Add email on approval/rejection
4. **Certificate PDF**: Implement actual PDF generation (currently uses browser print)
5. **File Storage**: Consider moving DNG files to cloud storage for better security

## Notes

- Certificate template currently uses CSS-based design
- DNG files served from public folder (consider cloud storage for production)
- Admin email hardcoded (consider environment variable)
- Video player is placeholder (integrate actual video service)
