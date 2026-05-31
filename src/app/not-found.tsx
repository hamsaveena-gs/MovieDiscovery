import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-4">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <h2 className="sub-heading">Page Not Found</h2>
      <p className="muted-text max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary mt-4">
        Go Home
      </Link>
    </div>
  );
}
