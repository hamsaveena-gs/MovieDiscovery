import { Suspense } from 'react';
import MovieGrid from '@/components/ui/MovieGrid';
import Pagination from '@/components/pagination/Pagination';
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
      <MovieGrid movies={movies} />
      <Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </>
  );
}
