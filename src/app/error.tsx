'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-4">
      <h2 className="error-heading">Something went wrong</h2>
      <p className="text-gray-400 max-w-md">
        We could not load the content. This may be a network issue or the API may be unavailable.
      </p>
      <div className="flex gap-4 mt-4">
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
        <Link href="/" className="btn btn-secondary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
