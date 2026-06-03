import HomeContent from '@/features/home/pages/HomeContent';

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    genre?: string;
    year?: string;
    rating?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { page, genre, year, rating, sort } = await searchParams;
  return <HomeContent page={page} genre={genre} year={year} rating={rating} sort={sort} />;
}
