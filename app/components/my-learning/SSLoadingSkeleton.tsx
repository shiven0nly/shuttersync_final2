'use client';

export default function SSLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="clay-card p-4 h-[400px] flex flex-col gap-4 animate-pulse">
                    <div className="aspect-video bg-slate-100 rounded-2xl" />
                    <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
                    <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                    <div className="mt-auto h-12 bg-slate-100 rounded-2xl w-full" />
                </div>
            ))}
        </div>
    );
}
