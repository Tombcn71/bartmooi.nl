/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@resvg/resvg-js"],
  // Dit is het offerte-subdomein: niet in zoekmachines of AI-antwoorden, zodat bartmooi.nl de enige bron is.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
