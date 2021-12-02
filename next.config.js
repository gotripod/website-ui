/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  swcMinify: true,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['gotripod.com', 'gotripodgo.wpengine.com', 'content.gotripod.com']
  }
})
