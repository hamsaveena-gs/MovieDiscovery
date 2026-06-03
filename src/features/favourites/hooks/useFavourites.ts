'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useFavouritesStore } from '@/features/favourites/store/favouritesStore';
import { Movie } from '@/types/movie';

export function useFavourites() {
  const [hydrated, setHydrated] = useState(false);
  const store = useFavouritesStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const favourites = useMemo(
    () => (hydrated ? store.favourites : []),
    [hydrated, store.favourites]
  );

  const addFavourite = useCallback(
    (movie: Movie) => store.addFavourite(movie),
    [store]
  );

  const removeFavourite = useCallback(
    (id: number) => store.removeFavourite(id),
    [store]
  );

  const isFavourite = useCallback(
    (id: number) => (hydrated ? store.isFavourite(id) : false),
    [hydrated, store]
  );

  return {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  };
}
