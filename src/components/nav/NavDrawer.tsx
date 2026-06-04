'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';

interface NavLink {
  href: string;
  label: string;
}

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function NavDrawer({ isOpen, onClose, navLinks }: NavDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 z-50 bg-gray-950 border-l border-gray-800 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <Text as="span" variant="label" className="text-lg">Menu</Text>
          <Button variant="icon-light" onClick={onClose} className="relative w-8 h-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="block w-5 h-0.5 bg-black rotate-45 absolute" />
              <div className="block w-5 h-0.5 bg-black -rotate-45 absolute" />
            </div>
          </Button>
        </div>

        <ul className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
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
