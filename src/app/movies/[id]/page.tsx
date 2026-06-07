import { Metadata } from 'next';
import { getMovieDetails } from '@/lib/tmdb';
import MovieContent from '@/features/movie/MovieContent';
import { POSTER_URL } from '@/lib/tmdb-images';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const movie = await getMovieDetails(id);
    const posterUrl = movie.poster_path ? `${POSTER_URL}${movie.poster_path}` : undefined;
    return {
      title: `${movie.title} | MovieDiscovery`,
      description: movie.overview || `Watch details for ${movie.title}.`,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: posterUrl ? [{ url: posterUrl }] : [],
      },
    };
  } catch {
    return { title: 'Movie | MovieDiscovery' };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  return <MovieContent id={id} />;
}
