import Image from 'next/image';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function FavouritesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-32 gap-5">
      <Image src="/img/heart-white.png" alt="no favourites" width={64} height={64} className="opacity-20" />
      <Heading variant="empty">No favourites yet</Heading>
      <Text variant="hint">Save movies you love and find them here</Text>
      <Button href="/" variant="primary" className="mt-2">Browse Movies</Button>
    </div>
  );
}
