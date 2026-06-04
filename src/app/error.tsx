'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

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
      <Heading variant="error">Something went wrong</Heading>
      <Text variant="intro" className="max-w-md">
        We could not load the content. This may be a network issue or the API may be unavailable.
      </Text>
      <div className="flex gap-4 mt-4">
        <Button onClick={reset} variant="primary">Try Again</Button>
        <Button href="/" variant="secondary">Go Home</Button>
      </div>
    </div>
  );
}
