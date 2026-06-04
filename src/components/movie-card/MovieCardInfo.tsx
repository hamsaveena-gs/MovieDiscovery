import Image from 'next/image';
import { Movie } from '@/types/movie';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function MovieCardInfo({ movie }: { movie: Movie }) {
  return (
    <div className="p-3">
      <Heading as="h3" variant="card">{movie.title}</Heading>
      <div className="flex items-center justify-between mt-1.5">
        <Text variant="emphasis" as="span" className="text-xs flex items-center gap-1">
          <Image src="/img/favourites.png" alt="rating" width={12} height={12} />
          {movie.vote_average.toFixed(1)}
        </Text>
        <Text variant="caption" as="span" className="text-xs">
          {movie.release_date?.slice(0, 4)}
        </Text>
      </div>
    </div>
  );
}
