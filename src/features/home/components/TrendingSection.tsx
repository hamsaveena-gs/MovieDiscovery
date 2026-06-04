import MovieGrid from '@/components/ui/MovieGrid';
import { Movie } from '@/types/movie';
import Heading from '@/components/ui/Heading';

interface TrendingSectionProps {
  movies: Movie[];
}

export default function TrendingSection({ movies }: TrendingSectionProps) {
  if (movies.length === 0) return null;

  return (
    <section className="mb-14">
      <Heading variant="section">Trending This Week</Heading>
      <MovieGrid movies={movies} />
    </section>
  );
}
