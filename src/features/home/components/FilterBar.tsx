'use client';

import { Genre } from '@/types/movie';
import { useFilterBar } from '@/features/home/hooks/useFilterBar';
import FilterSelect from '@/features/home/components/FilterSelect';
import FilterBadges from '@/features/home/components/FilterBadges';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';

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

export default function FilterBar({ genres }: FilterBarProps) {
  const {
    currentGenre, currentYear, currentRating, currentSort,
    activeFilterCount, applyFilter, clearFilters,
  } = useFilterBar();

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <Text variant="secondary" as="span" className="font-medium shrink-0">Filter:</Text>

        <FilterSelect
          name="genre"
          value={currentGenre}
          placeholder="All Genres"
          options={genres.map((g) => ({ value: String(g.id), label: g.name }))}
          onChange={(val) => applyFilter('genre', val)}
        />
        <FilterSelect
          name="year"
          value={currentYear}
          placeholder="All Years"
          options={YEARS.map((y) => ({ value: y, label: y }))}
          onChange={(val) => applyFilter('year', val)}
        />
        <FilterSelect
          name="rating"
          value={currentRating}
          placeholder="All Ratings"
          options={RATINGS.map((r) => ({ value: r, label: `Rating ${r}+` }))}
          onChange={(val) => applyFilter('rating', val)}
        />
        <FilterSelect
          name="sort"
          value={currentSort}
          placeholder="Sort By"
          options={SORT_OPTIONS}
          onChange={(val) => applyFilter('sort', val)}
        />

        {activeFilterCount > 0 && (
          <Button variant="outline" onClick={clearFilters} className="py-2.5">
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <FilterBadges
          currentGenre={currentGenre}
          currentYear={currentYear}
          currentRating={currentRating}
          currentSort={currentSort}
          sortLabel={SORT_OPTIONS.find((s) => s.value === currentSort)?.label}
        />
      )}
    </div>
  );
}
