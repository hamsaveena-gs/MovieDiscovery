import Image from 'next/image';
import { getMovieDetails, getMovieCredits, getMovieVideos, POSTER_URL, BACKDROP_URL } from '@/lib/tmdb';
import { MovieDetails, Cast, Video } from '@/types/movie';
import FavouriteButton from '@/components/FavouriteButton';

interface MovieContentProps {
  id: string;
}

export default async function MovieContent({ id }: MovieContentProps) {
  const [movie, creditsData, videosData] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
    getMovieVideos(id),
  ]);

  const details: MovieDetails = movie;
  const cast: Cast[] = creditsData.cast?.slice(0, 10) || [];
  const trailer: Video | undefined = videosData.results?.find(
    (v: Video) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div className="min-h-screen">
      {details.backdrop_path && (
        <div className="relative w-full h-72 md:h-420px">
          <Image
            src={`${BACKDROP_URL}${details.backdrop_path}`}
            alt={details.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
        </div>
      )}

      <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10 ${details.backdrop_path ? '-mt-24' : 'mt-0'}`}>
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

        {trailer && (
          <section className="mt-14">
            <h2 className="section-heading">Trailer</h2>
            <div className="aspect-video w-full max-w-2xl rounded-xl overflow-hidden border border-gray-800 shadow-xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </section>
        )}

        {cast.length > 0 && (
          <section className="mt-14">
            <h2 className="section-heading">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {cast.map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 group-hover:border-white transition-colors">
                    {member.profile_path ? (
                      <Image
                        src={`${POSTER_URL}${member.profile_path}`}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold mt-2 text-white">{member.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{member.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
