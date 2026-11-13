/** Small round "Made in Malaysia" badge laid over the bottom of Ace pod pictures. */
export function MadeInMalaysia({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/badges/made-in-malaysia.png"
      alt="Made in Malaysia"
      className={`pointer-events-none rounded-full bg-white shadow-sm ring-1 ring-black/5 ${className}`}
    />
  );
}
