import MovieCard from '@/components/movie-card/MovieCard';
import { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} priority={index === 0} />
      ))}
    </div>
  );
}
