import type { MetadataRoute } from "next";

/** De app van de monteurs: installeerbaar op het beginscherm, met het BartMooi-logo. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BartMooi Team",
    short_name: "BartMooi",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f6f8",
    theme_color: "#1E5079",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
