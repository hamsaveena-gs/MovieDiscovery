import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-4">
      <Heading as="h1" variant="404">404</Heading>
      <Heading variant="sub">Page Not Found</Heading>
      <Text variant="intro" className="max-w-md">
        The page you are looking for does not exist or has been moved.
      </Text>
      <Button href="/" variant="primary" className="mt-4">Go Home</Button>
    </div>
  );
}
