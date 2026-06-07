import { Movie, MovieDetails, Cast, Video, Genre, TMDBResponse } from '@/types/movie';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

if (!API_KEY) throw new Error('Missing env: TMDB_API_KEY');
if (!BASE_URL) throw new Error('Missing env: TMDB_BASE_URL');

// Re-export image constants so existing server-component imports still work
export { IMAGE_URL, POSTER_URL, BACKDROP_URL } from '@/lib/tmdb-images';

async function fetchFromTMDB<T>(endpoint: string, page: number = 1): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function getTrendingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/trending/movie/week', page);
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchFromTMDB<MovieDetails>(`/movie/${id}`);
}

export async function getMovieCredits(id: string): Promise<{ cast: Cast[] }> {
  return fetchFromTMDB<{ cast: Cast[] }>(`/movie/${id}/credits`);
}

export async function getMovieVideos(id: string): Promise<{ results: Video[] }> {
  return fetchFromTMDB<{ results: Video[] }>(`/movie/${id}/videos`);
}

export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json() as Promise<TMDBResponse<Movie>>;
}

export interface DiscoverParams {
  page?: number;
  genreId?: string;
  year?: string;
  minRating?: string;
  sortBy?: string;
}

export async function discoverMovies(params: DiscoverParams = {}): Promise<TMDBResponse<Movie>> {
  const { page = 1, genreId, year, minRating, sortBy = 'popularity.desc' } = params;
  const url = new URL(`${BASE_URL}/discover/movie`);
  url.searchParams.set('api_key', API_KEY!);
  url.searchParams.set('page', String(page));
  url.searchParams.set('sort_by', sortBy);
  if (genreId) url.searchParams.set('with_genres', genreId);
  if (year) url.searchParams.set('primary_release_year', year);
  if (minRating) url.searchParams.set('vote_average.gte', minRating);
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
  return response.json() as Promise<TMDBResponse<Movie>>;
}

export async function getGenres(): Promise<{ genres: Genre[] }> {
  return fetchFromTMDB<{ genres: Genre[] }>('/genre/movie/list');
}
