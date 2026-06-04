import Link from 'next/link';
import Text from '@/components/ui/Text';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Text variant="brand" as="span">MovieDiscovery</Text>

        <nav className="footer-links">
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/favourites" className="footer-link">Favourites</Link>
          <Link href="/search" className="footer-link">Search</Link>
        </nav>

        <Text variant="footnote">
          &copy; {new Date().getFullYear()} MovieDiscovery. Powered by{' '}
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="footer-link">
            TMDB
          </a>
          .
        </Text>
      </div>
    </footer>
  );
}
