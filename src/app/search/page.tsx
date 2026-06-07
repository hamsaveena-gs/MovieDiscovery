import { Metadata } from 'next';
import SearchContent from '@/features/search/SearchContent';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" — Search | MovieDiscovery` : 'Search Movies | MovieDiscovery',
    description: q ? `Search results for "${q}"` : 'Search for your favourite movies.',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  return <SearchContent query={q || ''} currentPage={Number(page) || 1} />;
}

