import MovieGrid from '@/components/ui/MovieGrid';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import { Movie } from '@/types/movie';

interface HomeMovieGridProps {
  movies: Movie[];
  isFiltered: boolean;
}

export default function HomeMovieGrid({ movies, isFiltered }: HomeMovieGridProps) {
  return (
    <section>
      <Heading as="h2" variant="section">
        {isFiltered ? 'Filtered Results' : 'Popular Movies'}
      </Heading>
      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <Text variant="secondary" className="mt-4">No movies found for the selected filters.</Text>
      )}
    </section>
  );
}
