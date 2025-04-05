/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  compiler: {
    removeConsole:
      process.env.API_DOC_ENV === "prod"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

module.exports = nextConfig;
