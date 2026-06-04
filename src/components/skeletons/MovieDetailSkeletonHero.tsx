export default function MovieDetailSkeletonHero() {
  return (
    <>
      <div className="w-full h-72 md:h-[420px] bg-gray-800" />

      <div className="max-w-5xl mx-auto px-6 py-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-48 h-72 bg-gray-700 rounded-xl shrink-0 mx-auto md:mx-0 border border-gray-700 shadow-2xl" />

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-700 rounded w-1/3" />

            <div className="flex gap-3 mt-4">
              <div className="h-7 bg-gray-700 rounded-full w-16" />
              <div className="h-7 bg-gray-700 rounded-full w-16" />
              <div className="h-7 bg-gray-700 rounded-full w-20" />
            </div>

            <div className="flex gap-2">
              <div className="h-6 bg-gray-700 rounded-full w-20" />
              <div className="h-6 bg-gray-700 rounded-full w-20" />
              <div className="h-6 bg-gray-700 rounded-full w-16" />
            </div>

            <div className="space-y-2 mt-2">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>

            <div className="h-10 bg-gray-700 rounded-lg w-52 mt-2" />
          </div>
        </div>
      </div>
    </>
  );
}
