import { cacheLife } from 'next/cache';

export default async function Footer() {
  'use cache';
  cacheLife('max');

  return (
    <footer className="mt-10 mb-6 flex">
      <p className="text-fd-muted-foreground text-sm">
        &copy; {new Date().getUTCFullYear()} STACiA, All Rights Reserved.
      </p>
    </footer>
  );
}
