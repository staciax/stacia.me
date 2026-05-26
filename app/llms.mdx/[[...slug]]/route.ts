import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

async function generateLLMText(slug: string[]) {
  'use cache';
  cacheLife('max');

  const page = source.getPage(slug);
  if (!page) return null;
  return getLLMText(page);
}

export async function GET(
  _req: NextRequest,
  { params }: RouteContext<'/llms.mdx/[[...slug]]'>,
) {
  const { slug } = await params;
  if (!slug) return notFound();

  const text = await generateLLMText(slug);
  if (text === null) notFound();

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
