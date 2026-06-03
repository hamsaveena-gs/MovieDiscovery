import { getMovieDetails, getMovieCredits, getMovieVideos } from '@/lib/tmdb';
import { MovieDetails, Cast, Video } from '@/types/movie';
import MovieBackdrop from '@/features/movie/components/MovieBackdrop';
import MovieInfo from '@/features/movie/components/MovieInfo';
import MovieTrailer from '@/features/movie/components/MovieTrailer';
import MovieCast from '@/features/movie/components/MovieCast';

interface MovieContentProps {
  id: string;
}

export default async function MovieContent({ id }: MovieContentProps) {
  const [movie, creditsData, videosData] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
    getMovieVideos(id),
  ]);

  const details: MovieDetails = movie;
  const cast: Cast[] = creditsData.cast?.slice(0, 10) || [];
  const trailer: Video | undefined = videosData.results?.find(
    (v: Video) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div className="min-h-screen">
      {details.backdrop_path && (
        <MovieBackdrop backdropPath={details.backdrop_path} title={details.title} />
      )}
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10 ${details.backdrop_path ? '-mt-24' : 'mt-0'}`}>
        <MovieInfo details={details} />
        {trailer && <MovieTrailer trailerKey={trailer.key} />}
        <MovieCast cast={cast} />
      </div>
    </div>
  );
}
