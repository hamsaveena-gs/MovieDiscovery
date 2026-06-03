import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

interface TrendingSectionProps {
  movies: Movie[];
}

export default function TrendingSection({ movies }: TrendingSectionProps) {
  if (movies.length === 0) return null;

  return (
    <section className="mb-14">
      <h2 className="section-heading">Trending This Week</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
