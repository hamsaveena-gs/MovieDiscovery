import SearchContent from '@/features/search/pages/SearchContent';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  return <SearchContent query={q || ''} currentPage={Number(page) || 1} />;
}
