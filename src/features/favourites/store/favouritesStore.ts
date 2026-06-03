import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/types/movie';

interface FavouritesStore {
  favourites: Movie[];
  addFavourite: (movie: Movie) => void;
  removeFavourite: (id: number) => void;
  isFavourite: (id: number) => boolean;
}

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (movie) =>
        set((state) => ({
          favourites: [...state.favourites, movie],
        })),

      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((m) => m.id !== id),
        })),

      isFavourite: (id) => get().favourites.some((m) => m.id === id),
    }),
    {
      name: 'favourites-storage',
    }
  )
);
