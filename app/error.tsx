'use client';

import { useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground italic">Oops, something went wrong.</h2>
          <p className="text-foreground/60 mb-10 text-lg">
            We encountered an unexpected error. Please try again or contact support if the issue persists.
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-foreground text-background rounded-full font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-lg shadow-black/5"
          >
            Try Again
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
