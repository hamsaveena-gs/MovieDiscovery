'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface NavSearchProps {
  query: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  autoFocus?: boolean;
}

export default function NavSearch({ query, onChange, onSubmit, autoFocus }: NavSearchProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      <Input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies..."
        autoFocus={autoFocus}
      />
      <Button type="submit" variant="primary" className="px-4 py-2 text-sm">
        <Image src="/img/magnifying-glass.png" alt="search" width={16} height={16} />
      </Button>
    </form>
  );
}
