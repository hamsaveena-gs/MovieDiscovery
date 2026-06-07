'use client';

import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import FavouritesHeader from '@/features/favourites/components/FavouritesHeader';
import FavouritesEmptyState from '@/features/favourites/components/FavouritesEmptyState';
import FavouritesGrid from '@/features/favourites/components/FavouritesGrid';

export default function FavouritesContent() {
  const { favourites } = useFavourites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <FavouritesHeader />
      {favourites.length === 0 ? (
        <FavouritesEmptyState />
      ) : (
        <FavouritesGrid movies={favourites} />
      )}
    </div>
  );
}
