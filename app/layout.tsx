import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShutterSync-Photography Community",
  description:
    "A hub for photographers to share their clicks, discuss editing techniques, participate in weekly challenges, and connect. Sync your vision with ShutterSync.",
  keywords:
    "photography, community, gallery, challenges, photo walks, workshops, ShutterSync",
  openGraph: {
    title: "ShutterSync — Photography Community",
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
