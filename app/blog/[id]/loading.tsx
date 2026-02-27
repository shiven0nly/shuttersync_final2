// Optimistic UI: Minimal skeleton for slow loads only
export default function BlogPostLoading() {
  return (
    <article className="pt-32 pb-20 animate-in fade-in duration-300">
      <div className="relative w-full h-[60vh] mb-12 bg-black/5 animate-pulse" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="w-full h-12 bg-black/5 rounded-lg mb-6 animate-pulse" />
        <div className="w-3/4 h-12 bg-black/5 rounded-lg mb-8 animate-pulse" />
        
        <div className="space-y-4">
          <div className="w-full h-6 bg-black/5 rounded animate-pulse" />
          <div className="w-full h-6 bg-black/5 rounded animate-pulse" />
          <div className="w-5/6 h-6 bg-black/5 rounded animate-pulse" />
        </div>
      </div>
    </article>
  );
}
