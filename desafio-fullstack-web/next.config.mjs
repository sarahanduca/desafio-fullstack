/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "build",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/niveis",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
