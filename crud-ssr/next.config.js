/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/users",
        destination: "/",
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
};

// module.exports = nextConfig;
module.exports = {
  async rewrites() {
    return [{ source: "/users", destination: "/" }];
  },
};
