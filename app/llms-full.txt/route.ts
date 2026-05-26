import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

import { cacheLife } from 'next/cache';

async function generateLLMText() {
  'use cache';
  cacheLife('max');

  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);
  return scanned.join('\n\n');
}

export async function GET() {
  const text = await generateLLMText();
  return new Response(text);
}
