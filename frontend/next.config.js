/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "syargpt-media-bucket.s3.us-west-2.amazonaws.com",
        port: ""
      }
    ]
  }
}

module.exports = nextConfig
