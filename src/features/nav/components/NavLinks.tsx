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
    <ul className="nav-links">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`nav-link${pathname === link.href ? ' nav-link--active' : ''}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
