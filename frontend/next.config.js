/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
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
