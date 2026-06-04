import Image from 'next/image';
import Heading from '@/components/ui/Heading';

export default function FavouritesHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Image src="/img/heart-red.png" alt="favourites" width={28} height={28} />
      <Heading as="h1" variant="page">My Favourites</Heading>
    </div>
  );
}
