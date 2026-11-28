import type { NextConfig } from "next";

const beveiliging = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // De AI-assistent (offerte.bartmooi.nl) mag de microfoon gebruiken voor de spraakofferte.
  { key: "Permissions-Policy", value: 'camera=(), geolocation=(), microphone=(self "https://offerte.bartmooi.nl")' },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  compress: true,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 31536000, qualities: [10, 45, 60, 75] },
  async headers() {
    return [
      { source: "/:path*", headers: beveiliging },
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  // Oude WordPress-adressen blijven werken (en houden hun plek in Google).
  async redirects() {
    return [
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/category-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/author-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/category/:path*", destination: "/blog/", permanent: true },
      { source: "/author/:path*", destination: "/over-ons/", permanent: true },
      { source: "/feed", destination: "/feed.xml", permanent: true },
      { source: "/feed/", destination: "/feed.xml", permanent: true },
      // Bart logt in via bartmooi.nl/admin; de inlog zelf staat bij de offerte-app.
      { source: "/admin", destination: "https://offerte.bartmooi.nl/admin", permanent: false },
      { source: "/admin/", destination: "https://offerte.bartmooi.nl/admin", permanent: false },
      // De monteurs loggen in via bartmooi.nl/team (de kantoor-app).
      { source: "/team", destination: "https://bartmooi-kantoor.vercel.app/", permanent: false },
      { source: "/team/", destination: "https://bartmooi-kantoor.vercel.app/", permanent: false },
    ];
  },
};

export default nextConfig;
