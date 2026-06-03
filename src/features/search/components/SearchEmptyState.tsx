export default function SearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-24 gap-3 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
        <span className="text-3xl text-gray-600">&#128269;</span>
      </div>
      <p className="text-gray-400 font-medium">Start searching for movies</p>
      <p className="text-gray-600 text-sm">Type a movie name in the search bar above</p>
    </div>
  );
}
