/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Use server external packages to handle ESM issues
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "html-to-text",
      "entities",
    ],
  },
};

module.exports = nextConfig;
