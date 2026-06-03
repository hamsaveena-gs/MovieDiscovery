interface FilterBadgesProps {
  currentGenre: string;
  currentYear: string;
  currentRating: string;
  currentSort: string;
  sortLabel: string | undefined;
}

export default function FilterBadges({ currentGenre, currentYear, currentRating, currentSort, sortLabel }: FilterBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {currentGenre && <span className="badge">Genre applied</span>}
      {currentYear && <span className="badge">Year: {currentYear}</span>}
      {currentRating && <span className="badge">Rating: {currentRating}+</span>}
      {currentSort && <span className="badge">{sortLabel}</span>}
    </div>
  );
}
