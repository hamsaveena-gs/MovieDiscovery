export default function MovieCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 animate-pulse shadow-lg">
      <div className="aspect-2/3 w-full bg-gray-800" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="flex items-center justify-between mt-1.5">
          <div className="h-3 bg-gray-800 rounded w-10" />
          <div className="h-3 bg-gray-800 rounded w-8" />
        </div>
      </div>
    </div>
  );
}
