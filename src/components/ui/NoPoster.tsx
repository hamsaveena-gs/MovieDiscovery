import Image from 'next/image';

interface NoPosterProps {
  size?: 'sm' | 'lg';
}

export default function NoPoster({ size = 'sm' }: NoPosterProps) {
  const iconSize = size === 'lg' ? 48 : 36;
  return (
    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center gap-2">
      <Image src="/img/heart-white.png" alt="no poster" width={iconSize} height={iconSize} className="opacity-20" />
      <span className="text-xs text-gray-500">No Poster</span>
    </div>
  );
}
