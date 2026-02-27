// Auth pages: Wait for server confirmation (critical action)
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] animate-in fade-in duration-200">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-foreground/50">Loading sign in...</p>
      </div>
    </div>
  );
}
