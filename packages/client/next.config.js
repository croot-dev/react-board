/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  transpilePackages: ['@react-board/common'],
};

module.exports = nextConfig;
