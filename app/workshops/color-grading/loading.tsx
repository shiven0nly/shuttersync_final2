// Optimistic UI: Lightweight spinner for slow loads
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] animate-in fade-in duration-200">
      <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  );
}
