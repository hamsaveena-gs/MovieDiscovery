import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  navLinks: NavLink[];
  pathname: string;
}

export default function NavLinks({ navLinks, pathname }: NavLinksProps) {
  return (
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
  );
}
