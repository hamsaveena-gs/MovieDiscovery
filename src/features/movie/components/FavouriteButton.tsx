'use client';

import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useToggleFavourite } from '@/features/favourites/hooks/useToggleFavourite';
import Button from '@/components/ui/Button';

interface FavouriteButtonProps {
  movie: Movie;
}

export default function FavouriteButton({ movie }: FavouriteButtonProps) {
  const { favourited, toggle } = useToggleFavourite(movie);

  return (
    <Button variant="primary" onClick={toggle} className="flex items-center gap-2">
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
