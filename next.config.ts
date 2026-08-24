import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Pozwala budować do osobnego katalogu (NEXT_DIST_DIR=.next-build npm run build),
  // żeby build nie nadpisywał .next używanego przez działający dev server.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
