'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap — keep Tab inside the drawer while open
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    // Focus the close button when drawer opens
    closeBtnRef.current?.focus();

    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="nav-drawer-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`nav-drawer ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="nav-drawer-header">
          <Text as="span" variant="label" className="text-lg">Menu</Text>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close menu"
            className="btn-icon-light relative w-8 h-8"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="block w-5 h-0.5 bg-black rotate-45 absolute" />
              <div className="block w-5 h-0.5 bg-black -rotate-45 absolute" />
            </div>
          </button>
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
