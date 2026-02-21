import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

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
    optimizePackageImports: ['@remixicon/react'],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
