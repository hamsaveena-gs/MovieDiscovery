import { Metadata } from 'next';
import FavouritesContent from '@/features/favourites/FavouritesContent';

export const metadata: Metadata = {
  title: 'My Favourites | MovieDiscovery',
  description: 'Your saved favourite movies.',
};

export default function FavouritesPage() {
  return <FavouritesContent />;
}

