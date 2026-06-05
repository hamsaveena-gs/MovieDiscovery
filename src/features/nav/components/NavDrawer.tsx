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
        <div className="nav-drawer-overlay" onClick={onClose} />
      )}

      <div className={`nav-drawer ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="nav-drawer-header">
          <Text as="span" variant="label" className="text-lg">Menu</Text>
          <Button variant="icon-light" onClick={onClose} className="relative w-8 h-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="block w-5 h-0.5 bg-black rotate-45 absolute" />
              <div className="block w-5 h-0.5 bg-black -rotate-45 absolute" />
            </div>
          </Button>
        </div>

        <ul className="nav-drawer-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`nav-drawer-link${pathname === link.href ? ' nav-drawer-link--active' : ''}`}
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
