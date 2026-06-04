import MovieGrid from '@/components/ui/MovieGrid';
import { Movie } from '@/types/movie';

interface TrendingSectionProps {
  movies: Movie[];
}

export default function TrendingSection({ movies }: TrendingSectionProps) {
  if (movies.length === 0) return null;

  return (
    <section className="mb-14">
      <h2 className="section-heading">Trending This Week</h2>
      <MovieGrid movies={movies} />
    </section>
  );
}
