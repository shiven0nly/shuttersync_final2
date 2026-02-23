import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['Georgia', 'serif'],
});

export const metadata: Metadata = {
  title: "ShutterSync-Photography Community",
  description:
    "A hub for photographers to share their clicks, discuss editing techniques, participate in weekly challenges, and connect. Sync your vision with ShutterSync.",
  keywords:
    "photography, community, gallery, challenges, photo walks, workshops, ShutterSync",
  openGraph: {
    title: "ShutterSync - Photography Community",
    description:
      "A hub for photographers to share their clicks, discuss editing techniques, and participate in weekly challenges.",
    type: "website",
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export const viewport = {
  themeColor: "#dfdaeb"
}

import NavigationLoader from "@/components/common/NavigationLoader";
import { Suspense } from "react";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://shuttersync-photography.netlify.app/#organization",
      "name": "ShutterSync Photography Community",
      "url": "https://shuttersync-photography.netlify.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shuttersync-photography.netlify.app/logo.jpeg",
        "width": 512,
        "height": 512
      },
      "description": "A hub for photographers to share their clicks, discuss editing techniques, participate in weekly challenges, and connect.",
      "sameAs": [
        "https://shuttersync-photography.netlify.app"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://shuttersync-photography.netlify.app/#website",
      "url": "https://shuttersync-photography.netlify.app",
      "name": "ShutterSync Photography Community",
      "description": "A hub for photographers to share their clicks, discuss editing techniques, participate in weekly challenges, and connect. Sync your vision with ShutterSync.",
      "publisher": {
        "@id": "https://shuttersync-photography.netlify.app/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://shuttersync-photography.netlify.app/#webpage",
      "url": "https://shuttersync-photography.netlify.app",
      "name": "ShutterSync - Photography Community",
      "isPartOf": {
        "@id": "https://shuttersync-photography.netlify.app/#website"
      },
      "about": {
        "@id": "https://shuttersync-photography.netlify.app/#organization"
      },
      "description": "A hub for photographers to share their clicks, discuss editing techniques, participate in weekly challenges, and connect. Sync your vision with ShutterSync.",
      "inLanguage": "en-US"
    },
    {
      "@type": "EducationalOrganization",
      "name": "ShutterSync Photography Workshops",
      "url": "https://shuttersync-photography.netlify.app/workshops",
      "description": "Professional photography workshops including color grading, editing techniques, and creative photography skills.",
      "offers": {
        "@type": "Offer",
        "category": "Photography Education",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Event",
      "name": "ShutterSync Photography Events",
      "url": "https://shuttersync-photography.netlify.app/events",
      "description": "Join our photography community events, photo walks, and challenges.",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "organizer": {
        "@id": "https://shuttersync-photography.netlify.app/#organization"
      }
    },
    {
      "@type": "ImageGallery",
      "name": "ShutterSync Photography Gallery",
      "url": "https://shuttersync-photography.netlify.app/gallery",
      "description": "Explore stunning photography from our community members.",
      "creator": {
        "@id": "https://shuttersync-photography.netlify.app/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignInUrl="/sso-callback"
      afterSignUpUrl="/sso-callback"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className={`${inter.variable} ${playfair.variable} antialiased`}>
          <ConvexClientProvider>
            <Suspense fallback={null}>
              <NavigationLoader />
            </Suspense>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
