export function MovieCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 animate-pulse shadow-lg">
      <div className="aspect-[2/3] w-full bg-gray-800" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="flex items-center justify-between mt-1.5">
          <div className="h-3 bg-gray-800 rounded w-10" />
          <div className="h-3 bg-gray-800 rounded w-8" />
        </div>
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Backdrop */}
      <div className="w-full h-72 md:h-[420px] bg-gray-800" />

      <div className="max-w-5xl mx-auto px-6 py-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-48 h-72 bg-gray-700 rounded-xl shrink-0 mx-auto md:mx-0 border border-gray-700 shadow-2xl" />

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-700 rounded w-1/3" />

            {/* Badges */}
            <div className="flex gap-3 mt-4">
              <div className="h-7 bg-gray-700 rounded-full w-16" />
              <div className="h-7 bg-gray-700 rounded-full w-16" />
              <div className="h-7 bg-gray-700 rounded-full w-20" />
            </div>

            {/* Genres */}
            <div className="flex gap-2">
              <div className="h-6 bg-gray-700 rounded-full w-20" />
              <div className="h-6 bg-gray-700 rounded-full w-20" />
              <div className="h-6 bg-gray-700 rounded-full w-16" />
            </div>

            {/* Overview */}
            <div className="space-y-2 mt-2">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>

            {/* Button */}
            <div className="h-10 bg-gray-700 rounded-lg w-52 mt-2" />
          </div>
        </div>

        {/* Trailer */}
        <div className="mt-14">
          <div className="h-7 bg-gray-700 rounded w-32 mb-4" />
          <div className="aspect-video w-full max-w-2xl bg-gray-800 rounded-xl border border-gray-800" />
        </div>

        {/* Cast */}
        <div className="mt-14">
          <div className="h-7 bg-gray-700 rounded w-24 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-700 border-2 border-gray-700" />
                <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto mt-3" />
                <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
