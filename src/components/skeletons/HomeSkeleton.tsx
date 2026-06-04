import MovieGridSkeleton from '@/components/skeletons/MovieGridSkeleton';
import FilterBarSkeleton from '@/components/skeletons/FilterBarSkeleton';

export default function HomeSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <FilterBarSkeleton />

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
