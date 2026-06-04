// Set env vars before the module is loaded (ts-jest uses CommonJS require under the hood,
// but top-level assignments still run after imports. We reset modules so the lib reads them.)
process.env.TMDB_BASE_URL = 'https://api.tmdb.org/3';
process.env.TMDB_API_KEY = 'test_api_key';
process.env.NEXT_PUBLIC_TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

jest.resetModules();

import {
  getTrendingMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  searchMovies,
  discoverMovies,
  getGenres,
} from '@/lib/tmdb';

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
}

function mockErrorResponse(status: number) {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status,
  });
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('tmdb lib', () => {
  describe('getTrendingMovies', () => {
    it('returns trending movies response', async () => {
      const data = { results: [], total_pages: 1, total_results: 0, page: 1 };
      mockOkResponse(data);
      const result = await getTrendingMovies();
      expect(result).toEqual(data);
    });

    it('throws on non-ok response', async () => {
      mockErrorResponse(500);
      await expect(getTrendingMovies()).rejects.toThrow('TMDB API error: 500');
    });
  });

  describe('getMovieDetails', () => {
    it('returns movie details', async () => {
      const data = { id: 1, title: 'Test', runtime: 120 };
      mockOkResponse(data);
      const result = await getMovieDetails('1');
      expect(result).toEqual(data);
    });

    it('throws on non-ok response', async () => {
      mockErrorResponse(404);
      await expect(getMovieDetails('999')).rejects.toThrow('TMDB API error: 404');
    });
  });

  describe('getMovieCredits', () => {
    it('returns cast array', async () => {
      const data = { cast: [{ id: 1, name: 'Actor', character: 'Hero', profile_path: null }] };
      mockOkResponse(data);
      const result = await getMovieCredits('1');
      expect(result.cast).toHaveLength(1);
    });
  });

  describe('getMovieVideos', () => {
    it('returns video results', async () => {
      const data = { results: [{ id: 'v1', key: 'abc', name: 'Trailer', site: 'YouTube', type: 'Trailer' }] };
      mockOkResponse(data);
      const result = await getMovieVideos('1');
      expect(result.results).toHaveLength(1);
    });
  });

  describe('searchMovies', () => {
    it('returns search results', async () => {
      const data = { results: [{ id: 2, title: 'Batman' }], total_pages: 1, total_results: 1, page: 1 };
      mockOkResponse(data);
      const result = await searchMovies('batman');
      expect(result.results[0].title).toBe('Batman');
    });

    it('throws on non-ok response', async () => {
      mockErrorResponse(503);
      await expect(searchMovies('test')).rejects.toThrow('TMDB API error: 503');
    });
  });

  describe('discoverMovies', () => {
    it('returns discover results with defaults', async () => {
      const data = { results: [], total_pages: 1, total_results: 0, page: 1 };
      mockOkResponse(data);
      const result = await discoverMovies();
      expect(result).toEqual(data);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('sort_by=popularity.desc'));
    });

    it('includes genre param when genreId provided', async () => {
      mockOkResponse({ results: [], total_pages: 1, total_results: 0, page: 1 });
      await discoverMovies({ genreId: '28' });
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('with_genres=28'));
    });

    it('includes year param when year provided', async () => {
      mockOkResponse({ results: [], total_pages: 1, total_results: 0, page: 1 });
      await discoverMovies({ year: '2022' });
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('primary_release_year=2022'));
    });

    it('includes minRating param when provided', async () => {
      mockOkResponse({ results: [], total_pages: 1, total_results: 0, page: 1 });
      await discoverMovies({ minRating: '7' });
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('vote_average.gte=7'));
    });

    it('throws on non-ok response', async () => {
      mockErrorResponse(500);
      await expect(discoverMovies()).rejects.toThrow('TMDB API error: 500');
    });
  });

  describe('getGenres', () => {
    it('returns genres list', async () => {
      const data = { genres: [{ id: 28, name: 'Action' }] };
      mockOkResponse(data);
      const result = await getGenres();
      expect(result.genres[0].name).toBe('Action');
    });
  });
});
