'use client';

import Image from 'next/image';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { useFavourites } from '@/hooks/useFavourites';

export default function FavouritesContent() {
  const { favourites } = useFavourites();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Image src="/img/heart-red.png" alt="favourites" width={28} height={28} />
        <h1 className="page-title">My Favourites</h1>
      </div>

      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 gap-5 text-gray-500">
          <Image src="/img/heart-white.png" alt="no favourites" width={64} height={64} className="opacity-20" />
          <p className="text-lg font-medium">No favourites yet</p>
          <p className="text-sm text-gray-600">Save movies you love and find them here</p>
          <Link href="/" className="btn btn-primary mt-2">Browse Movies</Link>
        </div>
      ) : (
        <>
          <p className="text-gray-400 text-sm mb-6">
            {favourites.length} saved movie{favourites.length > 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {favourites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
