/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  concurrentFeatures: true,
    serverComponents: true,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['gotripod.com', 'gotripodgo.wpengine.com', 'content.gotripod.com']
  }
}
