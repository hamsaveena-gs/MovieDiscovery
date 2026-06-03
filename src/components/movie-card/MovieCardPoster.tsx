import Image from 'next/image';
import { Movie } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb';

interface MovieCardPosterProps {
  movie: Movie;
}

export default function MovieCardPoster({ movie }: MovieCardPosterProps) {
  return (
    <div className="relative aspect-2/3 w-full">
      {movie.poster_path ? (
        <Image
          src={`${POSTER_URL}${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover group-hover:brightness-90 transition-all duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500 gap-2">
          <Image src="/img/heart-white.png" alt="no poster" width={36} height={36} className="opacity-20" />
          <span className="text-xs text-gray-500">No Poster</span>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
