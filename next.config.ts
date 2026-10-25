import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /*** Redirect memorable taxi search URLs to their canonical, indexed service pages. */
  async redirects() {
    return [
      { source: '/flughafentaxi', destination: '/flughafentransfer', permanent: true },
      { source: '/bahnhoftaxi', destination: '/bahnhoftransfer', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
