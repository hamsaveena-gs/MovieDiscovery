import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';

export default function FavouritesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-32 gap-5 text-gray-500">
      <Image src="/img/heart-white.png" alt="no favourites" width={64} height={64} className="opacity-20" />
      <p className="text-lg font-medium">No favourites yet</p>
      <p className="text-sm text-gray-600">Save movies you love and find them here</p>
      <ButtonLink href="/" variant="primary" className="mt-2">Browse Movies</ButtonLink>
    </div>
  );
}
