interface MovieTrailerProps {
  trailerKey: string;
}

export default function MovieTrailer({ trailerKey }: MovieTrailerProps) {
  return (
    <section className="mt-14">
      <h2 className="section-heading">Trailer</h2>
      <div className="aspect-video w-full max-w-2xl rounded-xl overflow-hidden border border-gray-800 shadow-xl">
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
