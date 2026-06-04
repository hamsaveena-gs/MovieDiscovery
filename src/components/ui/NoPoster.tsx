import Image from 'next/image';
import Text from '@/components/ui/Text';

interface NoPosterProps {
  size?: 'sm' | 'lg';
}

export default function NoPoster({ size = 'sm' }: NoPosterProps) {
  const iconSize = size === 'lg' ? 48 : 36;
  return (
    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center gap-2">
      <Image src="/img/photo.png" alt="no poster" width={iconSize} height={iconSize} className="opacity-20" />
      <Text variant="caption" as="span">No Poster</Text>
    </div>
  );
}
