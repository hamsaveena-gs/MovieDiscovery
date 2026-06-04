'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

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
      <Heading variant="error">Movie Not Found</Heading>
      <Text variant="intro" className="max-w-md">
        We could not load this movie. It may not exist or there was a network issue.
      </Text>
      <div className="flex gap-4 mt-4">
        <Button variant="primary" onClick={reset}>Try Again</Button>
        <Button href="/" variant="secondary">Go Home</Button>
      </div>
    </div>
  );
}
