export default function MovieDetailSkeletonCast() {
  return (
    <div className="mt-14">
      <div className="h-7 bg-gray-700 rounded w-24 mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-700 border-2 border-gray-700" />
            <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto mt-3" />
            <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
