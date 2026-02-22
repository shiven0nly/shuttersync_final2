# Certificate Customization Guide

## Current Certificate Design

The certificate is designed with:
- **Organization**: ShutterSync Photography Community
- **Founder**: Rajnish
- **Style**: Modern, clean design with gradient background
- **Colors**: Orange to Red gradient (brand colors)

## Customizing the Certificate

### Location
File: `app/certificates/[certificateId]/page.tsx`

### Design Elements

#### 1. Header Section
```tsx
<h2 className="text-4xl font-serif italic text-foreground mb-2">ShutterSync</h2>
<p className="text-sm text-foreground/60 uppercase tracking-widest">Photography Community</p>
```

#### 2. Title
```tsx
<h3 className="text-3xl font-serif text-foreground mb-4">Certificate of Completion</h3>
```

#### 3. Student Name
```tsx
<p className="text-2xl font-serif text-foreground mb-2">{certificate.fullName}</p>
```

#### 4. Workshop Title
```tsx
<p className="text-lg text-foreground/70 mb-6">{certificate.workshopTitle}</p>
```

#### 5. Founder Signature
```tsx
<div className="text-right">
  <p className="text-lg font-serif text-foreground mb-1">Rajnish</p>
  <p className="text-xs text-foreground/40 uppercase tracking-wider">Founder, ShutterSync</p>
</div>
```

## Using Custom Certificate Template

### Option 1: CSS-Based Design (Current)
The current implementation uses pure CSS/Tailwind for the certificate design. This is:
- ✅ Easy to customize
- ✅ Responsive
- ✅ No external dependencies
- ✅ Works with browser print

### Option 2: Image-Based Template
To use your uploaded certificate image:

1. Upload your certificate template to `public/certificate-template.png`

2. Update the certificate preview section:

```tsx
<div className="aspect-[16/11] relative">
  <img 
    src="/certificate-template.png" 
    alt="Certificate Template"
    className="w-full h-full object-cover rounded-2xl"
  />
  
  {/* Overlay text on specific positions */}
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <p className="text-3xl font-serif" style={{ position: 'absolute', top: '40%' }}>
      {certificate.fullName}
    </p>
    <p className="text-lg" style={{ position: 'absolute', top: '55%' }}>
      {certificate.workshopTitle}
    </p>
    {/* Add more positioned text as needed */}
  </div>
</div>
```

### Option 3: Server-Side PDF Generation
For production-quality certificates, use a PDF library:

1. Install dependencies:
```bash
npm install pdfkit
```

2. Create API route: `app/api/generate-certificate-pdf/route.ts`

```typescript
import PDFDocument from 'pdfkit';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { fullName, workshopTitle, issueDate, certificateId } = await request.json();
  
  const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
  const chunks: Buffer[] = [];
  
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {
    const pdfBuffer = Buffer.concat(chunks);
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate-${certificateId}.pdf"`,
      },
    });
  });
  
  // Add certificate content
  doc.fontSize(40).text('ShutterSync', 100, 100);
  doc.fontSize(30).text(fullName, 100, 200);
  doc.fontSize(20).text(workshopTitle, 100, 250);
  doc.fontSize(12).text(`Certificate ID: ${certificateId}`, 100, 300);
  doc.fontSize(12).text(`Issue Date: ${issueDate}`, 100, 320);
  doc.fontSize(16).text('Rajnish', 500, 400);
  doc.fontSize(10).text('Founder, ShutterSync', 500, 420);
  
  doc.end();
}
```

## Certificate ID Format

Current format: `SS-{timestamp}-{random}`

Example: `SS-1708617600000-A7B9C2D4E`

To customize:
```typescript
// In convex/workshopSubmissions.ts
const certificateId = `CUSTOM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
```

## Colors & Branding

### Current Color Scheme
```css
Primary: Orange (#f97316) to Red (#ef4444)
Background: Orange-50 to Red-50
Text: Foreground (dark)
Accent: Green (for verification badge)
```

### To Change Colors
Update gradient classes in certificate preview:
```tsx
className="bg-gradient-to-br from-orange-50 to-red-50"
className="bg-gradient-to-r from-orange-500 to-red-500"
```

## Print Styles

The certificate includes print-optimized CSS:

```css
@media print {
  body * {
    visibility: hidden;
  }
  .certificate-container, .certificate-container * {
    visibility: visible;
  }
  .certificate-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .no-print {
    display: none !important;
  }
}
```

This ensures only the certificate is printed when user clicks "Download Certificate (PDF)".

## Adding Logo

To add ShutterSync logo:

1. Place logo in `public/logo.png`

2. Add to certificate:
```tsx
<img 
  src="/logo.png" 
  alt="ShutterSync Logo"
  className="w-16 h-16 mx-auto mb-4"
/>
```

## Certificate Verification Badge

The green verification badge appears at the top:

```tsx
<div className="flex items-center justify-center gap-3 mb-8 no-print">
  <CheckCircleIcon className="w-8 h-8 text-green-500" />
  <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
    ✅ Valid Certificate
  </span>
</div>
```

## Tips

1. **Test Print Layout**: Use browser's print preview to check layout
2. **Responsive Design**: Certificate should look good on mobile and desktop
3. **High Resolution**: Use high-quality images for professional look
4. **Consistent Branding**: Match your website's design language
5. **Accessibility**: Ensure text has sufficient contrast

## Example Customizations

### Add QR Code
```tsx
import { QRCodeSVG } from 'qrcode.react';

<QRCodeSVG 
  value={`https://yoursite.com/certificates/${certificate.certificateId}`}
  size={80}
  className="absolute bottom-4 right-4"
/>
```

### Add Border Design
```tsx
<div className="border-8 border-double border-orange-300 rounded-2xl p-8">
  {/* Certificate content */}
</div>
```

### Add Watermark
```tsx
<div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
  <p className="text-9xl font-bold transform rotate-45">CERTIFIED</p>
</div>
```
