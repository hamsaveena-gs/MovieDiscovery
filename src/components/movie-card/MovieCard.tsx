'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useMovieCard } from '@/hooks/useMovieCard';
import MovieCardPoster from '@/components/movie-card/MovieCardPoster';
import MovieCardInfo from '@/components/movie-card/MovieCardInfo';
import Button from '@/components/ui/Button';

export default function MovieCard({ movie, priority = false }: { movie: Movie; priority?: boolean }) {
  const { favourited, handleFavourite } = useMovieCard(movie);

  return (
    <div className="group relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-white/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/10">
      <Link href={`/movies/${movie.id}`} className="block">
        <MovieCardPoster movie={movie} priority={priority} />
        <MovieCardInfo movie={movie} />
      </Link>

      <Button
        variant="icon"
        onClick={handleFavourite}
        className="absolute top-2 right-2 z-10 backdrop-blur-sm"
      >
        <Image
          src={favourited ? '/img/heart-red.png' : '/img/heart-white.png'}
          alt="favourite"
          width={18}
          height={18}
        />
      </Button>
    </div>
  );
}
