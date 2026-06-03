import { Suspense } from 'react';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { Movie } from '@/types/movie';

interface SearchResultsProps {
  movies: Movie[];
  query: string;
  currentPage: number;
  totalPages: number;
}

export default function SearchResults({ movies, query, currentPage, totalPages }: SearchResultsProps) {
  return (
    <>
      <p className="text-gray-500 text-sm mt-6 mb-4">
        Found <span className="text-white font-medium">{movies.length}</span> results for{' '}
        <span className="text-white font-medium">&ldquo;{query}&rdquo;</span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </>
  );
}
