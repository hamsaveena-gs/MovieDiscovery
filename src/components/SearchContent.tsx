import { searchMovies } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import { Suspense } from 'react';

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-white mb-8 text-center">Search Movies</h1>

      <SearchBar defaultValue={query} />

      {query && movies.length > 0 && (
        <p className="text-gray-500 text-sm mt-6 mb-4">
          Found <span className="text-white font-medium">{movies.length}</span> results for{' '}
          <span className="text-white font-medium">&ldquo;{query}&rdquo;</span>
        </p>
      )}

      {movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Suspense>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </Suspense>
        </>
      )}

      {query && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
            <span className="text-3xl text-gray-600">?</span>
          </div>
          <h2 className="text-xl font-semibold text-white">No results found</h2>
          <p className="text-gray-500 text-sm max-w-sm">
            We could not find any movies matching{' '}
            <span className="text-white font-medium">&ldquo;{query}&rdquo;</span>.
            Try a different keyword.
          </p>
        </div>
      )}

      {!query && (
        <div className="flex flex-col items-center justify-center mt-24 gap-3 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
            <span className="text-3xl text-gray-600">&#128269;</span>
          </div>
          <p className="text-gray-400 font-medium">Start searching for movies</p>
          <p className="text-gray-600 text-sm">Type a movie name in the search bar above</p>
        </div>
      )}
    </div>
  );
}
