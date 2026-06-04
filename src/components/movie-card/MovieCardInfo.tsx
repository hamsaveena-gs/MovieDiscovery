import Image from 'next/image';
import { Movie } from '@/types/movie';

export default function MovieCardInfo({ movie }: { movie: Movie }) {
  return (
    <div className="p-3">
      <h3 className="font-semibold text-sm truncate text-white">{movie.title}</h3>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-white text-xs font-medium flex items-center gap-1">
          <Image src="/img/favourites.png" alt="rating" width={12} height={12} />
          {movie.vote_average.toFixed(1)}
        </span>
        <span className="text-gray-500 text-xs">
          {movie.release_date?.slice(0, 4)}
        </span>
      </div>
    </div>
  );
}
