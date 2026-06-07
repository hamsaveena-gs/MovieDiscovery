import Image from 'next/image';
import { Suggestion } from '@/types/movie';
import { POSTER_URL } from '@/lib/tmdb-images';

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  activeIndex: number;
  onSelect: (suggestion: Suggestion) => void;
}

export default function SearchSuggestions({
  suggestions,
  activeIndex,
  onSelect,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <ul
      id="search-suggestions-listbox"
      role="listbox"
      className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-y-auto max-h-80"
    >
      {suggestions.map((suggestion, index) => {
        const year = suggestion.release_date
          ? new Date(suggestion.release_date).getFullYear()
          : null;
        const isActive = index === activeIndex;

        return (
          <li
            key={suggestion.id}
            role="option"
            aria-selected={isActive}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(suggestion);
            }}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <div className="w-8 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-700">
              {suggestion.poster_path ? (
                <Image
                  src={`${POSTER_URL}${suggestion.poster_path}`}
                  alt={suggestion.title}
                  width={32}
                  height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                  ?
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-medium truncate">{suggestion.title}</span>
              {year && <span className="text-gray-400 text-xs">{year}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
