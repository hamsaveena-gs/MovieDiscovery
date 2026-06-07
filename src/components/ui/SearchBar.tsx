'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SearchSuggestions from '@/components/ui/SearchSuggestions';
import { Suggestion } from '@/types/movie';

// ---------------------------------------------------------------------------
// Reducer — manages the three tightly-coupled suggestion states
// ---------------------------------------------------------------------------

interface SuggestionsState {
  suggestions: Suggestion[];
  showSuggestions: boolean;
  activeIndex: number;
}

type SuggestionsAction =
  | { type: 'OPEN' }                                // debounce fired → show dropdown, reset index
  | { type: 'FETCH_SUCCESS'; results: Suggestion[] } // API returned results
  | { type: 'FETCH_ERROR' }                         // API failed → clear list
  | { type: 'QUERY_TOO_SHORT' }                     // query < 2 chars → reset everything
  | { type: 'CLEAR' }                               // input cleared / navigated away
  | { type: 'HIDE' }                                // blur or click outside
  | { type: 'SHOW' }                                // input focused with existing results
  | { type: 'ARROW_DOWN' }                          // move highlight down
  | { type: 'ARROW_UP' }                            // move highlight up
  | { type: 'ESCAPE' };                             // close dropdown, reset index

const initialState: SuggestionsState = {
  suggestions: [],
  showSuggestions: false,
  activeIndex: -1,
};

function suggestionsReducer(
  state: SuggestionsState,
  action: SuggestionsAction
): SuggestionsState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, showSuggestions: true, activeIndex: -1 };

    case 'FETCH_SUCCESS':
      return { ...state, suggestions: action.results };

    case 'FETCH_ERROR':
      return { ...state, suggestions: [] };

    case 'QUERY_TOO_SHORT':
    case 'CLEAR':
      return { suggestions: [], showSuggestions: false, activeIndex: -1 };

    case 'HIDE':
      return { ...state, showSuggestions: false };

    case 'SHOW':
      return { ...state, showSuggestions: state.suggestions.length > 0 };

    case 'ARROW_DOWN':
      return {
        ...state,
        activeIndex: (state.activeIndex + 1) % state.suggestions.length,
      };

    case 'ARROW_UP':
      return {
        ...state,
        activeIndex:
          state.activeIndex <= 0
            ? state.suggestions.length - 1
            : state.activeIndex - 1,
      };

    case 'ESCAPE':
      return { ...state, showSuggestions: false, activeIndex: -1 };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SearchBarProps {
  // uncontrolled (search page)
  defaultValue?: string;
  // controlled (navbar)
  value?: string;
  onChange?: (val: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  // options
  autoFocus?: boolean;
  iconButton?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
}

export default function SearchBar({
  defaultValue = '',
  value,
  onChange,
  onSubmit,
  autoFocus,
  iconButton = false,
  placeholder = 'Search for movies...',
  id = 'search',
  name = 'search',
}: SearchBarProps) {
  const router = useRouter();
  const isControlled = value !== undefined;

  // internalQuery stays as useState — it is the input value, not suggestion state
  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const query = isControlled ? value : internalQuery;

  const [{ suggestions, showSuggestions, activeIndex }, dispatch] = useReducer(
    suggestionsReducer,
    initialState
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    try {
      const res = await fetch(`/api/suggestions?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', results: data.results ?? [] });
    } catch {
      dispatch({ type: 'FETCH_ERROR' });
    }
  }, []);

  // Debounce suggestion fetching whenever query changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      dispatch({ type: 'QUERY_TOO_SHORT' });
      return;
    }

    debounceRef.current = setTimeout(() => {
      dispatch({ type: 'OPEN' });
      fetchSuggestions(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        dispatch({ type: 'HIDE' });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (val: string) => {
    if (isControlled) {
      onChange?.(val);
    } else {
      setInternalQuery(val);
    }
  };

  const handleClear = () => {
    handleChange('');
    dispatch({ type: 'CLEAR' });
    if (!isControlled) {
      router.push('/search');
    }
  };

  const navigateTo = (suggestion: Suggestion) => {
    dispatch({ type: 'CLEAR' });
    router.push(`/movies/${suggestion.id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'HIDE' });

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigateTo(suggestions[activeIndex]);
      return;
    }

    if (isControlled) {
      onSubmit?.(e);
    } else {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      dispatch({ type: 'ARROW_DOWN' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      dispatch({ type: 'ARROW_UP' });
    } else if (e.key === 'Escape') {
      dispatch({ type: 'ESCAPE' });
    } else if (e.key === 'Enter' && activeIndex >= 0 && suggestions[activeIndex]) {
      e.preventDefault();
      navigateTo(suggestions[activeIndex]);
    }
  };

  const handleFocus = () => {
    dispatch({ type: 'SHOW' });
  };

  const handleBlur = () => {
    setTimeout(() => dispatch({ type: 'HIDE' }), 150);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1" ref={containerRef}>
        <Input
          id={id}
          name={name}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-controls="search-suggestions-listbox"
          className={iconButton ? 'pr-8 w-full' : 'py-3 bg-gray-800 placeholder-gray-400 pr-10 w-full'}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            ✕
          </button>
        )}
        {showSuggestions && (
          <SearchSuggestions
            suggestions={suggestions}
            activeIndex={activeIndex}
            onSelect={(s) => navigateTo(s)}
          />
        )}
      </div>
      {iconButton ? (
        <Button type="submit" variant="primary" className="px-4 py-2 text-sm">
          <Image src="/img/magnifying-glass.png" alt="search" width={16} height={16} />
        </Button>
      ) : (
        <Button type="submit" variant="primary" className="px-6 py-3">
          Search
        </Button>
      )}
    </form>
  );
}
