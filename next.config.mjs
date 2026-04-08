/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.techsignal.com', // Modificar com o caminho da API do backend
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    }
  ],

  },
}

export default nextConfig
