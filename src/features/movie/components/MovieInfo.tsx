import Image from 'next/image';
import { MovieDetails } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb';
import FavouriteButton from '@/features/movie/components/FavouriteButton';

interface MovieInfoProps {
  details: MovieDetails;
}

export default function MovieInfo({ details }: MovieInfoProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="relative w-48 h-72 shrink-0 rounded-xl overflow-hidden shadow-2xl shadow-black/60 mx-auto md:mx-0 border border-gray-700">
        {details.poster_path ? (
          <Image
            src={`${POSTER_URL}${details.poster_path}`}
            alt={details.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center gap-2">
            <Image src="/img/heart-white.png" alt="no poster" width={48} height={48} className="opacity-20" />
            <span className="text-xs text-gray-500">No Poster</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h1 className="page-title leading-tight">{details.title}</h1>
        {details.tagline && (
          <p className="text-gray-400 italic mt-1 text-sm">{details.tagline}</p>
        )}

        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <span className="flex items-center gap-1.5 bg-gray-800 px-3 py-1 rounded-full">
            <Image src="/img/favourites.png" alt="rating" width={14} height={14} />
            <span className="text-white font-semibold">{details.vote_average.toFixed(1)}</span>
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-full text-gray-300">
            {details.release_date?.slice(0, 4)}
          </span>
          {details.runtime && (
            <span className="bg-gray-800 px-3 py-1 rounded-full text-gray-300">
              {details.runtime} min
            </span>
          )}
        </div>

        {details.genres && (
          <div className="flex flex-wrap gap-2 mt-4">
            {details.genres.map((genre) => (
              <span key={genre.id} className="badge-outline">{genre.name}</span>
            ))}
          </div>
        )}

        <p className="mt-5 text-gray-300 leading-relaxed text-sm">{details.overview}</p>

        <div className="mt-6">
          <FavouriteButton movie={details} />
        </div>
      </div>
    </div>
  );
}
