'use client';

import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import Button from '@/components/ui/Button';

interface FavouriteButtonProps {
  movie: Movie;
}

export default function FavouriteButton({ movie }: FavouriteButtonProps) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const favourited = isFavourite(movie.id);

  const handleClick = () => {
    if (favourited) {
      removeFavourite(movie.id);
    } else {
      addFavourite(movie);
    }
  };

  return (
    <Button variant="primary" onClick={handleClick} className="flex items-center gap-2">
      <Image
        src={favourited ? '/img/heart-red.png' : '/img/heart-cta.png'}
        alt="favourite"
        width={20}
        height={20}
      />
      {favourited ? 'Remove from Favourites' : 'Add to Favourites'}
    </Button>
  );
}
