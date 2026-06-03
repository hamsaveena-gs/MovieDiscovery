interface SearchNoResultsProps {
  query: string;
}

export default function SearchNoResults({ query }: SearchNoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-24 gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
        <span className="text-3xl text-gray-600">?</span>
      </div>
      <h2 className="text-xl font-semibold text-white">No results found</h2>
      <p className="text-gray-500 text-sm max-w-sm">
        We could not find any movies matching{' '}
        <span className="text-white font-medium">&ldquo;{query}&rdquo;</span>.
        Try a different keyword.
      </p>
    </div>
  );
}
