import { getTrendingMovies, getGenres, discoverMovies } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import FilterBar from '@/components/FilterBar';
import { Suspense } from 'react';

interface HomeContentProps {
  page: string | undefined;
  genre: string | undefined;
  year: string | undefined;
  rating: string | undefined;
  sort: string | undefined;
}

export default async function HomeContent({ page, genre, year, rating, sort }: HomeContentProps) {
  const currentPage = Number(page) || 1;
  const isFiltered = genre || year || rating || sort;

  const [genresData, moviesData, trendingData] = await Promise.all([
    getGenres(),
    isFiltered
      ? discoverMovies({ page: currentPage, genreId: genre, year, minRating: rating, sortBy: sort })
      : discoverMovies({ page: currentPage }),
    !isFiltered ? getTrendingMovies(currentPage) : Promise.resolve(null),
  ]);

  const movies: Movie[] = moviesData.results;
  const trending: Movie[] = trendingData?.results || [];
  const totalPages = Math.min(moviesData.total_pages, 500);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Suspense>
        <FilterBar genres={genresData.genres} />
      </Suspense>

      {!isFiltered && trending.length > 0 && (
        <section className="mb-14">
          <h2 className="section-heading">Trending This Week</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

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

      <Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
