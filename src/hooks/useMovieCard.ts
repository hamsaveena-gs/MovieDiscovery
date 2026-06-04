'use client';

import { useCallback } from 'react';
import { Movie } from '@/types/movie';
import { useToggleFavourite } from '@/features/favourites/hooks/useToggleFavourite';

export function useMovieCard(movie: Movie) {
  const { favourited, toggle } = useToggleFavourite(movie);

  const handleFavourite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    toggle();
  }, [toggle]);

  return { favourited, handleFavourite };
}
