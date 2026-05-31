const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
export const IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

export const POSTER_URL = `${IMAGE_URL}/w500`;
export const BACKDROP_URL = `${IMAGE_URL}/original`;

async function fetchFromTMDB(endpoint: string, page: number = 1) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json();
}

export async function getTrendingMovies(page: number = 1) {
  return fetchFromTMDB('/trending/movie/week', page);
}

export async function getPopularMovies(page: number = 1) {
  return fetchFromTMDB('/movie/popular', page);
}

export async function getMovieDetails(id: string) {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieCredits(id: string) {
  return fetchFromTMDB(`/movie/${id}/credits`);
}

export async function getMovieVideos(id: string) {
  return fetchFromTMDB(`/movie/${id}/videos`);
}

export async function searchMovies(query: string, page: number = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json();
}

export interface DiscoverParams {
  page?: number;
  genreId?: string;
  year?: string;
  minRating?: string;
  sortBy?: string;
}

export async function discoverMovies(params: DiscoverParams = {}) {
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
  return response.json();
}

export async function getGenres() {
  return fetchFromTMDB('/genre/movie/list');
}
