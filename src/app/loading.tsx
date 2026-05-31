import { MovieGridSkeleton } from '@/components/Skeletons';

export default function HomeLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Filter Bar Skeleton */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-4 w-12 bg-gray-800 rounded animate-pulse" />
          <div className="h-10 w-36 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
          <div className="h-10 w-28 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
          <div className="h-10 w-32 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
          <div className="h-10 w-32 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
        </div>
      </div>

      <section className="mb-14">
        <div className="h-7 w-56 bg-gray-700 rounded animate-pulse mb-6 border-l-4 border-white pl-3" />
        <MovieGridSkeleton count={10} />
      </section>
      <section>
        <div className="h-7 w-48 bg-gray-700 rounded animate-pulse mb-6 border-l-4 border-white pl-3" />
        <MovieGridSkeleton count={10} />
      </section>
    </div>
  );
}

