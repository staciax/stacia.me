import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

// docs: https://nextjs.org/docs/app/api-reference/config/next-config-js

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  reactStrictMode: true,
  logging: {
    browserToTerminal: true,
    fetches: { fullUrl: true },
  },
  serverExternalPackages: ['@takumi-rs/image-response'],
  async rewrites() {
    return [
      {
        source: '/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
