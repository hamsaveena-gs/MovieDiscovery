import { searchMovies } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/features/search/components/SearchResults';
import SearchNoResults from '@/features/search/components/SearchNoResults';
import SearchEmptyState from '@/features/search/components/SearchEmptyState';

interface SearchContentProps {
  query: string;
  currentPage: number;
}

export default async function SearchContent({ query, currentPage }: SearchContentProps) {
  let movies: Movie[] = [];
  let totalPages = 0;

  if (query) {
    const data = await searchMovies(query, currentPage);
    movies = data.results;
    totalPages = Math.min(data.total_pages, 500);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="page-title mb-8 text-center">Search Movies</h1>

      <SearchBar defaultValue={query} />

      {!query && <SearchEmptyState />}
      {query && movies.length === 0 && <SearchNoResults query={query} />}
      {query && movies.length > 0 && (
        <SearchResults
          movies={movies}
          query={query}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
