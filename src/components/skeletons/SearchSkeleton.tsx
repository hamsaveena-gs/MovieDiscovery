import MovieGridSkeleton from '@/components/skeletons/MovieGridSkeleton';

export default function SearchSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="h-9 w-56 bg-gray-800 rounded animate-pulse mx-auto mb-8" />

      <div className="flex gap-2 w-full max-w-2xl mx-auto mb-6">
        <div className="flex-1 h-12 bg-gray-800 rounded-lg animate-pulse border border-gray-700" />
        <div className="w-24 h-12 bg-gray-700 rounded-lg animate-pulse" />
      </div>

      <div className="h-4 w-48 bg-gray-800 rounded animate-pulse mb-4" />

      <div className="mt-4">
        <MovieGridSkeleton count={10} />
      </div>
    </div>
  );
}
