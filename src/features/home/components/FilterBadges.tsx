import Text from '@/components/ui/Text';

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
      {currentGenre && <Text as="span" variant="secondary" className="badge">Genre applied</Text>}
      {currentYear && <Text as="span" variant="secondary" className="badge">Year: {currentYear}</Text>}
      {currentRating && <Text as="span" variant="secondary" className="badge">Rating: {currentRating}+</Text>}
      {currentSort && <Text as="span" variant="secondary" className="badge">{sortLabel}</Text>}
    </div>
  );
}
