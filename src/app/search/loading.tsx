import { MovieGridSkeleton } from '@/components/Skeletons';

export default function SearchLoading() {
  return (
    <div className="px-6 py-8">
      <div className="h-10 w-48 bg-gray-700 rounded animate-pulse mx-auto mb-8" />
      <div className="h-12 max-w-2xl mx-auto bg-gray-700 rounded-lg animate-pulse mb-6" />
      <MovieGridSkeleton count={10} />
    </div>
  );
}
