import { NextRequest, NextResponse } from 'next/server';
import { Suggestion } from '@/types/movie';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = process.env.TMDB_BASE_URL;

  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query.trim())}&page=1`
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] }, { status: 500 });
    }

    const data = (await res.json()) as { results: Suggestion[] };

    const suggestions: Suggestion[] = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
    }));

    return NextResponse.json({ results: suggestions });
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}

