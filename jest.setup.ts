import '@testing-library/jest-dom';

// Provide dummy values so tmdb.ts module-level guards don't throw during tests.
// Tests that exercise API calls mock fetch directly and never use these values.
process.env.TMDB_API_KEY = 'test-api-key';
process.env.TMDB_BASE_URL = 'https://api.themoviedb.org/3';
process.env.NEXT_PUBLIC_TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';
