import Image from 'next/image';

export default function FavouritesHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Image src="/img/heart-red.png" alt="favourites" width={28} height={28} />
      <h1 className="page-title">My Favourites</h1>
    </div>
  );
}
