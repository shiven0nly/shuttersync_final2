export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-foreground/50">Loading sign up...</p>
      </div>
    </div>
  );
}
