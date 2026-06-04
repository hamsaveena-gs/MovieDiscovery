export default function FilterBarSkeleton() {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-4 w-12 bg-gray-800 rounded animate-pulse" />
        <div className="h-10 w-36 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
        <div className="h-10 w-28 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
        <div className="h-10 w-32 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
        <div className="h-10 w-32 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
