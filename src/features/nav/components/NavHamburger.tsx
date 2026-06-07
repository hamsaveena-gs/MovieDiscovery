import Button from '@/components/ui/Button';

interface NavHamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavHamburger({ isOpen, onToggle }: NavHamburgerProps) {
  return (
    <Button variant="icon-light" onClick={onToggle} aria-label={isOpen ? 'Close menu' : 'Open menu'} className="nav-hamburger">
      <span className={`nav-hamburger-bar${isOpen ? ' rotate-45 translate-y-1.5' : ''}`} />
      <span className={`nav-hamburger-bar${isOpen ? ' opacity-0' : ''}`} />
      <span className={`nav-hamburger-bar${isOpen ? ' -rotate-45 -translate-y-1.5' : ''}`} />
    </Button>
  );
}
