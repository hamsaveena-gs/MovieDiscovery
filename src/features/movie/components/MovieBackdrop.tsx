import Image from 'next/image';
import { BACKDROP_URL } from '@/lib/tmdb';

interface MovieBackdropProps {
  backdropPath: string;
  title: string;
}

export default function MovieBackdrop({ backdropPath, title }: MovieBackdropProps) {
  return (
    <div className="img-backdrop">
      <Image
        src={`${BACKDROP_URL}${backdropPath}`}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
  );
}
