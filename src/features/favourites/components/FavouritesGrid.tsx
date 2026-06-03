import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

interface FavouritesGridProps {
  movies: Movie[];
}

export default function FavouritesGrid({ movies }: FavouritesGridProps) {
  return (
    <>
      <p className="text-gray-400 text-sm mb-6">
        {movies.length} saved movie{movies.length > 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
