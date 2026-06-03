import Button from '@/components/ui/Button';

interface NavHamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavHamburger({ isOpen, onToggle }: NavHamburgerProps) {
  return (
    <Button variant="icon-light" onClick={onToggle} className="flex flex-col gap-1">
      <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
      <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
      <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
    </Button>
  );
}
