/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stg.api.sersow.otech.id',
      },
    ],
  },
}

module.exports = nextConfig
