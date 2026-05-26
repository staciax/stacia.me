import { source } from '@/lib/source';

import { llms } from 'fumadocs-core/source';
import { cacheLife } from 'next/cache';

export async function GET() {
  'use cache';
  cacheLife('max');
  return new Response(llms(source).index());
}
