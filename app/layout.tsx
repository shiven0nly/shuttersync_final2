import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";
import Script from "next/script";
import { ModalProvider } from '@/store/modal-context';
import { GlobalModal } from '@/components/ui/GlobalModal';


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
  metadataBase: new URL('https://shuttersync-photography.netlify.app'),
  title: {
    default: "ShutterSync - Photography Community | Share, Learn & Connect",
    template: "%s | ShutterSync Photography"
  },
  description:
    "A hub for photographers to share their clicks, discuss editing techniques, participate in weekly challenges, and connect. Sync your vision with ShutterSync.",
  keywords:
    "photography, community, gallery, challenges, photo walks, workshops, ShutterSync, photography courses, photo editing, camera techniques, photography events",
  authors: [{ name: "ShutterSync Photography" }],
  creator: "ShutterSync Photography",
  publisher: "ShutterSync Photography",
  alternates: {
    canonical: "https://shuttersync-photography.netlify.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shuttersync-photography.netlify.app",
    siteName: "ShutterSync Photography Community",
    title: "ShutterSync - Photography Community | Share, Learn & Connect",
    description:
      "Join our vibrant photography community. Share your work, participate in weekly challenges, attend workshops, and connect with fellow photographers.",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "ShutterSync Photography Community Logo",
        type: "image/jpeg",
      },
      {
        url: "/heroSectionbg.jpg",
        width: 1200,
        height: 630,
        alt: "ShutterSync Photography Hero",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShutterSync - Photography Community | Share, Learn & Connect",
    description:
      "Join our vibrant photography community. Share your work, participate in weekly challenges, attend workshops, and connect with fellow photographers.",
    images: ["/logo.jpeg"],
    creator: "@shuttersync",
    site: "@shuttersync",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
    shortcut: "/logo.jpeg",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#dfdaeb"
}

import NavigationLoader from "@/components/common/NavigationLoader";
import ReferralTracker from "@/components/common/ReferralTracker";
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
    },
    {
      "@type": "Blog",
      "name": "ShutterSync Photography Blog",
      "url": "https://shuttersync-photography.netlify.app/blog",
      "description": "Expert photography tips, tutorials, and insights covering composition, lighting, gear reviews, and creative inspiration.",
      "publisher": {
        "@id": "https://shuttersync-photography.netlify.app/#organization"
      },
      "inLanguage": "en-US"
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
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-YSXL7Q8132"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-YSXL7Q8132');
            `}
          </Script>
        </head>

        <body className={`${inter.variable} ${playfair.variable} antialiased`}>
          <ConvexClientProvider>
            <Suspense fallback={null}>
              <NavigationLoader />
              <ReferralTracker />
            </Suspense>
            <ModalProvider>
              {children}
              <GlobalModal />
            </ModalProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
