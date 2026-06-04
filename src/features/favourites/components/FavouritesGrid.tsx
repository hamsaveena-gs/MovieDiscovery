import MovieGrid from '@/components/ui/MovieGrid';
import { Movie } from '@/types/movie';
import Text from '@/components/ui/Text';

interface FavouritesGridProps {
  movies: Movie[];
}

export default function FavouritesGrid({ movies }: FavouritesGridProps) {
  return (
    <>
      <Text variant="meta">
        {movies.length} saved movie{movies.length > 1 ? 's' : ''}
      </Text>
      <MovieGrid movies={movies} />
    </>
  );
}
