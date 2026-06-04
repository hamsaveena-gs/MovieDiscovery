'use client';

import { useCallback } from 'react';
import { Movie } from '@/types/movie';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';

export function useToggleFavourite(movie: Movie) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const favourited = isFavourite(movie.id);

  const toggle = useCallback(() => {
    if (favourited) removeFavourite(movie.id);
    else addFavourite(movie);
  }, [favourited, movie, addFavourite, removeFavourite]);

  return { favourited, toggle };
}
