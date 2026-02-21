import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { type NextRequest, NextResponse, type ProxyConfig } from 'next/server';

const { rewrite: rewriteLLM } = rewritePath('/*path', '/llms.mdx/*path');

export async function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const pathname = request.nextUrl.pathname;
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/llms.mdx/index', request.nextUrl));
    }
    const result = rewriteLLM(pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    {
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
};
