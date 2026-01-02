import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization security configuration
  images: {
    // Whitelist of allowed remote image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/raushan0301/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/raushan0301/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      // Add more trusted domains as needed
    ],
    // Responsive image sizes for optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Image formats to support
    formats: ['image/webp'],
  },

  // Security headers to protect against common web vulnerabilities
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // Default: Only load resources from same origin
              "default-src 'self'",
              // Scripts: Allow from same origin + inline scripts (needed for Next.js/React)
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              // Styles: Allow from same origin + inline styles + Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts: Allow from same origin + Google Fonts CDN
              "font-src 'self' https://fonts.gstatic.com",
              // Images: Allow from same origin + data URLs + any HTTPS source
              "img-src 'self' data: https:",
              // Media: Allow from same origin
              "media-src 'self'",
              // AJAX/WebSocket: Allow from same origin
              "connect-src 'self'",
              // Frames: Block all iframes (prevents embedding malicious content)
              "frame-src 'none'",
              // Objects: Block plugins like Flash
              "object-src 'none'",
              // Base URI: Restrict base tag to same origin
              "base-uri 'self'",
              // Form actions: Only allow forms to submit to same origin
              "form-action 'self'",
              // Upgrade insecure requests to HTTPS
              "upgrade-insecure-requests",
            ].join('; '),
          },
          {
            // Prevent clickjacking by blocking iframe embedding
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Prevent MIME-type sniffing attacks
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Control referrer information sent to other sites
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Disable browser features that could be exploited
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            // Enable XSS protection in older browsers
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
