import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

import { cacheLife } from 'next/cache';
export async function GET() {
  'use cache';
  cacheLife('max');

  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
