import { getMovieDetails, getMovieCredits, getMovieVideos } from '@/lib/tmdb';
import { Cast, Video } from '@/types/movie';
import MovieBackdrop from '@/features/movie/components/MovieBackdrop';
import MovieInfo from '@/features/movie/components/MovieInfo';
import MovieTrailer from '@/features/movie/components/MovieTrailer';
import MovieCast from '@/features/movie/components/MovieCast';
import { notFound } from 'next/navigation';

interface MovieContentProps {
  id: string;
}

export default async function MovieContent({ id }: MovieContentProps) {
  try {
    const [movie, creditsData, videosData] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getMovieVideos(id),
    ]);

    const cast: Cast[] = creditsData.cast?.slice(0, 10) ?? [];
    const trailer: Video | undefined = videosData.results?.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );

    return (
      <div className="min-h-screen">
        {movie.backdrop_path && (
          <MovieBackdrop backdropPath={movie.backdrop_path} title={movie.title} />
        )}
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10 ${movie.backdrop_path ? '-mt-24' : 'mt-0'}`}>
          <MovieInfo details={movie} />
          {trailer && <MovieTrailer trailerKey={trailer.key} />}
          <MovieCast cast={cast} />
        </div>
      </div>
    );
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('404')) notFound();
    throw new Error('Failed to load movie details. Please try again later.');
  }
}
