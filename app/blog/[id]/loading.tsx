export default function BlogPostLoading() {
  return (
    <article className="pt-32 pb-20">
      {/* Back Button Skeleton */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-8">
        <div className="w-32 h-6 bg-black/5 rounded animate-pulse" />
      </div>

      {/* Hero Image Skeleton */}
      <div className="relative w-full h-[60vh] mb-12 bg-black/5 animate-pulse" />

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Category Badge */}
        <div className="mb-6">
          <div className="w-24 h-8 bg-black/5 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="w-full h-12 bg-black/5 rounded-lg mb-6 animate-pulse" />
        <div className="w-3/4 h-12 bg-black/5 rounded-lg mb-6 animate-pulse" />

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-black/5 animate-pulse" />
            <div>
              <div className="w-32 h-4 bg-black/5 rounded mb-2 animate-pulse" />
              <div className="w-48 h-3 bg-black/5 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Article Content Skeleton */}
        <div className="space-y-6">
          <div className="w-full h-6 bg-black/5 rounded animate-pulse" />
          <div className="w-full h-6 bg-black/5 rounded animate-pulse" />
          <div className="w-5/6 h-6 bg-black/5 rounded animate-pulse" />
          <div className="w-full h-10 bg-black/5 rounded-lg mt-8 animate-pulse" />
          <div className="w-full h-6 bg-black/5 rounded animate-pulse" />
          <div className="w-full h-6 bg-black/5 rounded animate-pulse" />
          <div className="w-4/5 h-6 bg-black/5 rounded animate-pulse" />
        </div>
      </div>
    </article>
  );
}
