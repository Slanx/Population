/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  publicRuntimeConfig: {
    SERVER_PORT: process.env.SERVER_PORT,
  },
};

module.exports = nextConfig;
