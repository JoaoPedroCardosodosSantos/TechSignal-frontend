/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.techsignal.com',
    },
  ],

  },
}

export default nextConfig
