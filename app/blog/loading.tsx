// Optimistic UI: Only shows if data fetch takes > 300ms
export default function BlogLoading() {
  return (
    <div className="pt-32 pb-20 px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Minimal skeleton - appears only on slow loads */}
        <div className="mb-16 text-center">
          <div className="w-3/4 h-12 bg-black/5 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="w-1/2 h-6 bg-black/5 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-black/5">
              <div className="aspect-[4/3] bg-black/5 animate-pulse" />
              <div className="p-6">
                <div className="w-full h-6 bg-black/5 rounded mb-3 animate-pulse" />
                <div className="w-3/4 h-4 bg-black/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
