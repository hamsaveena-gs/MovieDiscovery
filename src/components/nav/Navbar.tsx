'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import Button from '@/components/ui/Button';
import NavDrawer from '@/components/nav/NavDrawer';
import SearchBar from '@/components/ui/SearchBar';
import NavLinks from '@/components/nav/NavLinks';
import NavHamburger from '@/components/nav/NavHamburger';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { favourites } = useFavourites();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/favourites', label: `Favourites (${favourites.length})` },
  ];

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            MovieDiscovery
          </Link>

          {pathname !== '/search' && (
            <div className="nav-search-wrapper">
              <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} iconButton id="nav-search" name="nav-search" placeholder="Search movies..." />
            </div>
          )}

          <NavLinks navLinks={navLinks} pathname={pathname} />

          <div className="nav-actions">
            {pathname !== '/search' && (
              <Button variant="icon-light" onClick={() => setSearchOpen(!searchOpen)}>
                <Image src="/img/magnifying-glass.png" alt="search" width={18} height={18} />
              </Button>
            )}
            <NavHamburger isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>

        {searchOpen && pathname !== '/search' && (
          <div className="nav-search-mobile">
            <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} iconButton id="nav-search" name="nav-search" placeholder="Search movies..." autoFocus />
          </div>
        )}
      </nav>

      <NavDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} navLinks={navLinks} />
    </>
  );
}
