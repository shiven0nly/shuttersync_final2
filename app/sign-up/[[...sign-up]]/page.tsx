import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-16">
      <div className="w-full max-w-md">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-xl rounded-3xl border border-black/5 bg-white",
              headerTitle: "text-2xl font-serif",
              headerSubtitle: "text-sm text-foreground/50",
              socialButtonsBlockButton: "rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-colors",
              formButtonPrimary: "bg-foreground hover:bg-foreground/90 rounded-xl text-sm font-semibold uppercase tracking-wider",
              formFieldInput: "rounded-xl border-foreground/10 focus:border-foreground/30",
              footerActionLink: "text-foreground hover:text-foreground/80",
              identityPreviewText: "text-sm",
              identityPreviewEditButton: "text-sm",
              formFieldLabel: "text-xs uppercase tracking-wider text-foreground/40",
              dividerLine: "bg-foreground/10",
              dividerText: "text-xs text-foreground/30 uppercase tracking-wider",
              formFieldInputShowPasswordButton: "text-foreground/40 hover:text-foreground",
              otpCodeFieldInput: "rounded-xl border-foreground/10",
              formResendCodeLink: "text-foreground/60 hover:text-foreground",
              alertText: "text-sm",
              formFieldErrorText: "text-xs",
              footerActionText: "text-sm text-foreground/40",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignInUrl="/sso-callback"
          afterSignUpUrl="/sso-callback"
        />
      </div>
    </div>
  );
}
