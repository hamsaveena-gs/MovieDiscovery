import Image from 'next/image';
import { MovieDetails } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb';
import FavouriteButton from '@/features/movie/components/FavouriteButton';
import NoPoster from '@/components/ui/NoPoster';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

interface MovieInfoProps {
  details: MovieDetails;
}

export default function MovieInfo({ details }: MovieInfoProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="img-poster mx-auto md:mx-0">
        {details.poster_path ? (
          <Image src={`${POSTER_URL}${details.poster_path}`} alt={details.title} fill className="object-cover" />
        ) : (
          <NoPoster size="lg" />
        )}
      </div>

      <div className="flex-1">
        <Heading as="h1" variant="page" className="leading-tight">{details.title}</Heading>
        {details.tagline && (
          <Text variant="quote" className="mt-1">{details.tagline}</Text>
        )}

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1 rounded-full">
            <Image src="/img/favourites.png" alt="rating" width={14} height={14} />
            <Text variant="emphasis" as="span">{details.vote_average.toFixed(1)}</Text>
          </div>
          <div className="badge">{details.release_date?.slice(0, 4)}</div>
          {details.runtime && <div className="badge">{details.runtime} min</div>}
        </div>

        {details.genres && (
          <div className="flex flex-wrap gap-2 mt-4">
            {details.genres.map((genre) => (
              <div key={genre.id} className="badge-outline">{genre.name}</div>
            ))}
          </div>
        )}

        <Text variant="body" className="mt-5">{details.overview}</Text>

        <div className="mt-6">
          <FavouriteButton movie={details} />
        </div>
      </div>
    </div>
  );
}
