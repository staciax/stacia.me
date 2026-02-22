import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

// docs: https://nextjs.org/docs/app/api-reference/config/next-config-js

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
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
    optimizePackageImports: ['@remixicon/react'],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
