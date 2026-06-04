import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

interface SearchNoResultsProps {
  query: string;
}

export default function SearchNoResults({ query }: SearchNoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-24 gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
        <div className="text-3xl text-gray-600">?</div>
      </div>
      <Heading variant="sub">No results found</Heading>
      <Text variant="secondary" className="max-w-sm">
        We could not find any movies matching{' '}
        <Text variant="emphasis" as="span">&ldquo;{query}&rdquo;</Text>.
        Try a different keyword.
      </Text>
    </div>
  );
}
