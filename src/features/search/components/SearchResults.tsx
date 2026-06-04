import { Suspense } from 'react';
import MovieGrid from '@/components/ui/MovieGrid';
import Pagination from '@/components/pagination/Pagination';
import { Movie } from '@/types/movie';
import Text from '@/components/ui/Text';

interface SearchResultsProps {
  movies: Movie[];
  query: string;
  currentPage: number;
  totalPages: number;
}

export default function SearchResults({ movies, query, currentPage, totalPages }: SearchResultsProps) {
  return (
    <>
      <Text variant="secondary" className="mt-6 mb-4">
        Found <Text variant="emphasis" as="span">{movies.length}</Text> results for{' '}
        <Text variant="emphasis" as="span">&ldquo;{query}&rdquo;</Text>
      </Text>
      <MovieGrid movies={movies} />
      <Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </>
  );
}
