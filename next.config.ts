import type { NextConfig } from "next";

// 获取环境变量中的 API URL，如果没有设置则使用默认值
const getApiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    return apiUrl;
  }
  
  // 根据 NODE_ENV 设置默认值
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment 
    ? 'https://dev3.potatoswap.finance' 
    : 'https://v3.potatoswap.finance';
};

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.okx.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'potatoswap.finance',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tokens.pancakeswap.finance',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.potatoswap.finance',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    const apiBaseUrl = getApiBaseUrl();

    return [
      // page
      {
        source: '/swap',
        destination: process.env.NEXT_PUBLIC_APP_ENV === 'development' ? '/swap-contract' : '/swap-api',
      },
      // api
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
  serverExternalPackages: ["geoip-lite"],

  // catch control
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
