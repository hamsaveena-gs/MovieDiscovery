import MovieGridSkeleton from '@/components/skeletons/MovieGridSkeleton';

export default function FavouritesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-7 h-7 rounded-full bg-gray-800 animate-pulse" />
        <div className="h-9 w-48 bg-gray-800 rounded animate-pulse" />
      </div>

      <div className="h-4 w-32 bg-gray-800 rounded animate-pulse mb-6" />

      <MovieGridSkeleton count={10} />
    </div>
  );
}
