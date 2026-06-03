import MovieDetailSkeletonHero from '@/components/skeletons/MovieDetailSkeletonHero';
import MovieDetailSkeletonTrailer from '@/components/skeletons/MovieDetailSkeletonTrailer';
import MovieDetailSkeletonCast from '@/components/skeletons/MovieDetailSkeletonCast';

export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <MovieDetailSkeletonHero />
      <div className="max-w-5xl mx-auto px-6">
        <MovieDetailSkeletonTrailer />
        <MovieDetailSkeletonCast />
      </div>
    </div>
  );
}
