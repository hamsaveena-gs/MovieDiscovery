'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFavourites } from '@/hooks/useFavourites';

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
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 text-white">
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-extrabold text-white tracking-tight shrink-0 hover:text-gray-300 transition-colors"
          >
            MovieDiscovery
          </Link>

          {pathname !== '/search' && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all"
              />
              <button type="submit" className="btn btn-primary px-4 py-2 text-sm">
                <Image src="/img/magnifying-glass.png" alt="search" width={16} height={16} />
              </button>
            </form>
          )}

          <ul className="hidden md:flex gap-6 shrink-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    pathname === link.href
                      ? 'text-white border-b-2 border-white pb-0.5'
                      : 'text-gray-400'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex md:hidden items-center gap-3">
            {pathname !== '/search' && (
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-icon-light"
              >
                <Image src="/img/magnifying-glass.png" alt="search" width={18} height={18} />
              </button>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn-icon-light flex flex-col gap-1"
            >
              <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {searchOpen && pathname !== '/search' && (
          <div className="md:hidden px-6 pb-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                autoFocus
                className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-white text-sm"
              />
              <button type="submit" className="btn btn-primary px-4 py-2 text-sm">
                <Image src="/img/magnifying-glass.png" alt="search" width={16} height={16} />
              </button>
            </form>
          </div>
        )}
      </nav>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 z-50 bg-gray-950 border-l border-gray-800 shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <span className="text-lg font-extrabold text-white">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="btn-icon-light"
          >
            <span className="block w-5 h-0.5 bg-black rotate-45 translate-y-px" />
            <span className="block w-5 h-0.5 bg-black -rotate-45 -translate-y-px" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-4 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
