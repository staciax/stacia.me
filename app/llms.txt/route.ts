import { source } from '@/lib/source';

import { llms } from 'fumadocs-core/source';
import { cacheLife } from 'next/cache';

async function generateLLMText() {
  'use cache';
  cacheLife('max');

  return llms(source).index();
}

export async function GET() {
  return new Response(await generateLLMText());
}
