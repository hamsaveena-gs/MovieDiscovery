import MovieGrid from '@/components/ui/MovieGrid';
import { Movie } from '@/types/movie';

interface HomeMovieGridProps {
  movies: Movie[];
  isFiltered: boolean;
}

export default function HomeMovieGrid({ movies, isFiltered }: HomeMovieGridProps) {
  return (
    <section>
      <h2 className="section-heading">
        {isFiltered ? 'Filtered Results' : 'Popular Movies'}
      </h2>
      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <p className="text-gray-500 text-sm mt-4">No movies found for the selected filters.</p>
      )}
    </section>
  );
}
