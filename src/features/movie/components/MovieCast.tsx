import Image from 'next/image';
import { Cast } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

interface MovieCastProps {
  cast: Cast[];
}

export default function MovieCast({ cast }: MovieCastProps) {
  if (cast.length === 0) return null;

  return (
    <section className="mt-14">
      <Heading variant="section">Cast</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {cast.map((member) => (
          <div key={member.id} className="text-center group">
            <div className="img-avatar mx-auto group-hover:border-white">
              {member.profile_path ? (
                <Image src={`${POSTER_URL}${member.profile_path}`} alt={member.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                   <Text variant="caption" as="span">No Image</Text>
                </div>
              )}
            </div>
            <Text variant="label" className="mt-2">{member.name}</Text>
            <Text variant="caption" className="mt-0.5">{member.character}</Text>
          </div>
        ))}
      </div>
    </section>
  );
}
