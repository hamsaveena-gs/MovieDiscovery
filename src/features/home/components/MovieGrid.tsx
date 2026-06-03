import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  isFiltered: boolean;
}

export default function MovieGrid({ movies, isFiltered }: MovieGridProps) {
  return (
    <section>
      <h2 className="section-heading">
        {isFiltered ? 'Filtered Results' : 'Popular Movies'}
      </h2>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-4">No movies found for the selected filters.</p>
      )}
    </section>
  );
}
