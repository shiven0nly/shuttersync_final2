export default function BlogLoading() {
  return (
    <div className="pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section Skeleton */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 mb-6 animate-pulse">
            <div className="size-4 bg-black/10 rounded" />
            <div className="w-32 h-3 bg-black/10 rounded" />
          </div>
          <div className="w-3/4 h-12 bg-black/5 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="w-1/2 h-6 bg-black/5 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex items-center justify-between gap-6 mb-12 pb-6 border-b border-black/10">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-10 bg-black/5 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="size-10 bg-black/5 rounded-lg animate-pulse" />
            <div className="size-10 bg-black/5 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-black/5">
              <div className="aspect-[4/3] bg-black/5 animate-pulse" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-full bg-black/5 animate-pulse" />
                  <div className="flex-1">
                    <div className="w-24 h-4 bg-black/5 rounded mb-2 animate-pulse" />
                    <div className="w-16 h-3 bg-black/5 rounded animate-pulse" />
                  </div>
                </div>
                <div className="w-full h-6 bg-black/5 rounded mb-3 animate-pulse" />
                <div className="w-full h-4 bg-black/5 rounded mb-2 animate-pulse" />
                <div className="w-3/4 h-4 bg-black/5 rounded mb-4 animate-pulse" />
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <div className="w-20 h-3 bg-black/5 rounded animate-pulse" />
                  <div className="w-16 h-3 bg-black/5 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
