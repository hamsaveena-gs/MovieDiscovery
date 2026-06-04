'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface SearchBarProps {
  // uncontrolled (search page)
  defaultValue?: string;
  // controlled (navbar)
  value?: string;
  onChange?: (val: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  // options
  autoFocus?: boolean;
  iconButton?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
}

export default function SearchBar({
  defaultValue = '',
  value,
  onChange,
  onSubmit,
  autoFocus,
  iconButton = false,
  placeholder = 'Search for movies...',
  id = 'search',
  name = 'search',
}: SearchBarProps) {
  const router = useRouter();
  const isControlled = value !== undefined;

  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const query = isControlled ? value : internalQuery;

  const handleChange = (val: string) => {
    if (isControlled) {
      onChange?.(val);
    } else {
      setInternalQuery(val);
    }
  };

  const handleClear = () => {
    handleChange('');
    if (!isControlled) {
      router.push('/search');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (isControlled) {
      onSubmit?.(e);
    } else {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Input
          id={id}
          name={name}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={iconButton ? 'pr-8 w-full' : 'py-3 bg-gray-800 placeholder-gray-400 pr-10 w-full'}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            ✕
          </button>
        )}
      </div>
      {iconButton ? (
        <Button type="submit" variant="primary" className="px-4 py-2 text-sm">
          <Image src="/img/magnifying-glass.png" alt="search" width={16} height={16} />
        </Button>
      ) : (
        <Button type="submit" variant="primary" className="px-6 py-3">
          Search
        </Button>
      )}
    </form>
  );
}
