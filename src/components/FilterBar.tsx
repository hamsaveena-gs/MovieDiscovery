'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Genre } from '@/types/movie';

interface FilterBarProps {
  genres: Genre[];
}

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));
const RATINGS = ['9', '8', '7', '6', '5'];
const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'release_date.desc', label: 'Newest' },
  { value: 'release_date.asc', label: 'Oldest' },
];

const selectClass = `
  px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm
  border border-gray-700
  hover:border-gray-500
  focus:outline-none focus:border-white focus:ring-1 focus:ring-white
  transition-all cursor-pointer appearance-none
  bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")]
  bg-no-repeat bg-[right_0.75rem_center] pr-9
`.trim();

export default function FilterBar({ genres }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get('genre') || '';
  const currentYear = searchParams.get('year') || '';
  const currentRating = searchParams.get('rating') || '';
  const currentSort = searchParams.get('sort') || '';

  const activeFilterCount = useMemo(() => {
    return [currentGenre, currentYear, currentRating, currentSort].filter(Boolean).length;
  }, [currentGenre, currentYear, currentRating, currentSort]);

  const applyFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-gray-400 text-sm font-medium shrink-0">Filter:</span>

        <select
          value={currentGenre}
          onChange={(e) => applyFilter('genre', e.target.value)}
          className={`${selectClass} ${currentGenre ? 'border-white text-white' : 'text-gray-400'}`}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={String(g.id)}>{g.name}</option>
          ))}
        </select>

        <select
          value={currentYear}
          onChange={(e) => applyFilter('year', e.target.value)}
          className={`${selectClass} ${currentYear ? 'border-white text-white' : 'text-gray-400'}`}
        >
          <option value="">All Years</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={currentRating}
          onChange={(e) => applyFilter('rating', e.target.value)}
          className={`${selectClass} ${currentRating ? 'border-white text-white' : 'text-gray-400'}`}
        >
          <option value="">All Ratings</option>
          {RATINGS.map((r) => (
            <option key={r} value={r}>Rating {r}+</option>
          ))}
        </select>

        <select
          value={currentSort}
          onChange={(e) => applyFilter('sort', e.target.value)}
          className={`${selectClass} ${currentSort ? 'border-white text-white' : 'text-gray-400'}`}
        >
          <option value="">Sort By</option>
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="px-4 py-2.5 rounded-xl border border-gray-600 text-gray-400 text-sm hover:border-white hover:text-white transition-all"
          >
            Clear ({activeFilterCount})
          </button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {currentGenre && (
            <span className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs text-white">
              Genre applied
            </span>
          )}
          {currentYear && (
            <span className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs text-white">
              Year: {currentYear}
            </span>
          )}
          {currentRating && (
            <span className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs text-white">
              Rating: {currentRating}+
            </span>
          )}
          {currentSort && (
            <span className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs text-white">
              {SORT_OPTIONS.find(s => s.value === currentSort)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
