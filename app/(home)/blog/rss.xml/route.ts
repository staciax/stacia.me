import { getRSS } from '@/lib/rss';

import { NextResponse } from 'next/server';

export async function GET() {
  const rss = await getRSS();
  return new NextResponse(rss);
}
