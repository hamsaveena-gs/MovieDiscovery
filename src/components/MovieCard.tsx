'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { Movie } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb';
import { useFavourites } from '@/hooks/useFavourites';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const favourited = isFavourite(movie.id);

  const handleFavourite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (favourited) {
      removeFavourite(movie.id);
    } else {
      addFavourite(movie);
    }
  }, [favourited, movie, addFavourite, removeFavourite]);

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative block rounded-xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-white/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/10"
    >
      <div className="relative aspect-[2/3] w-full">
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleFavourite}
          className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5 hover:scale-110 transition-transform backdrop-blur-sm"
        >
          <Image
            src={favourited ? '/img/heart-red.png' : '/img/heart-white.png'}
            alt="favourite"
            width={18}
            height={18}
          />
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm truncate text-white">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-white text-xs font-medium flex items-center gap-1">
            <Image src="/img/favourites.png" alt="rating" width={12} height={12} />
            {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-gray-500 text-xs">
            {movie.release_date?.slice(0, 4)}
          </span>
        </div>
      </div>
    </Link>
  );
}
