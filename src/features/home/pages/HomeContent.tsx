import { getTrendingMovies, getGenres, discoverMovies } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import Pagination from '@/components/pagination/Pagination';
import FilterBar from '@/features/home/components/FilterBar';
import TrendingSection from '@/features/home/components/TrendingSection';
import MovieGrid from '@/features/home/components/MovieGrid';
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
  const isFiltered = !!(genre || year || rating || sort);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Suspense>
        <FilterBar genres={genresData.genres} />
      </Suspense>

      {!isFiltered && <TrendingSection movies={trending} />}

      <MovieGrid movies={movies} isFiltered={isFiltered} />

      <Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
