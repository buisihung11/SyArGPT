/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
  images: {
    domains: ["syargpt-media-bucket.s3.us-west-2.amazonaws.com"] // defined image source can load on app
  }
}

module.exports = nextConfig
