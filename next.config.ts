/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Ensures it creates a single deployable build
  distDir: 'build',     // Sets the output directory to './build'
};

module.exports = nextConfig;
