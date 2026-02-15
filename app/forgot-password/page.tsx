'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6 py-16">
            <div className="w-full max-w-md text-center">
                <Link href="/" className="text-2xl font-serif font-semibold text-foreground block mb-12">
                    ShutterSync
                </Link>

                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                    <Icon name="EnvelopeIcon" size={28} variant="outline" className="text-blue-600" />
                </div>
                <h1 className="text-3xl font-serif text-foreground mb-3">Reset your password</h1>
                <p className="text-foreground/50 mb-8">
                    Password reset is now handled through Clerk. Please go to the sign-in page and click on "Forgot password?" to reset your password.
                </p>
                <Link 
                    href="/sign-in"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-semibold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all"
                >
                    Go to Sign In
                </Link>
            </div>
        </div>
    );
}
