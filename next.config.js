/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you're using a custom domain (yourusername.github.io), you don't need basePath
  // If you're using a project site (yourusername.github.io/portfolio), uncomment and set this:
  // basePath: '/portfolio',
  // trailingSlash: true,
};

module.exports = nextConfig;
