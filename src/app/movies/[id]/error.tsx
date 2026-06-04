'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MovieError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-4">
      <h2 className="error-heading">Movie Not Found</h2>
      <p className="text-gray-400 max-w-md">
        We could not load this movie. It may not exist or there was a network issue.
      </p>
      <div className="flex gap-4 mt-4">
        <Button variant="primary" onClick={reset}>Try Again</Button>
        <ButtonLink href="/" variant="secondary">Go Home</ButtonLink>
      </div>
    </div>
  );
}
