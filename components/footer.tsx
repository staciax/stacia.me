import { cacheLife } from 'next/cache';

const CURRENT_YEAR = new Date().getUTCFullYear();

export default async function Footer() {
  'use cache';
  cacheLife('max');

  return (
    <footer className="mt-10 mb-6 flex">
      <p className="text-fd-muted-foreground text-sm">
        &copy; {CURRENT_YEAR} STACiA, All Rights Reserved.
      </p>
    </footer>
  );
}
