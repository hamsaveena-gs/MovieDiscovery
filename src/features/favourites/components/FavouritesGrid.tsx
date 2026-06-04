import MovieGrid from '@/components/ui/MovieGrid';
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
      <MovieGrid movies={movies} />
    </>
  );
}
