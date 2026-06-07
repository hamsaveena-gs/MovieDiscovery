import Image from 'next/image';
import { Movie } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb-images';
import NoPoster from '@/components/ui/NoPoster';

export default function MovieCardPoster({ movie, priority = false }: { movie: Movie; priority?: boolean }) {
  return (
    <div className="relative aspect-2/3 w-full">
      {movie.poster_path ? (
        <Image
          src={`${POSTER_URL}${movie.poster_path}`}
          alt={movie.title}
          fill
          priority={priority}
          className="object-cover group-hover:brightness-90 transition-all duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      ) : (
        <NoPoster size="sm" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
