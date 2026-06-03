import Image from 'next/image';
import { Cast } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb';

interface MovieCastProps {
  cast: Cast[];
}

export default function MovieCast({ cast }: MovieCastProps) {
  if (cast.length === 0) return null;

  return (
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
  );
}
