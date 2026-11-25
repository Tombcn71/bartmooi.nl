import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BartMooi: kunststof en aluminium kozijnen op maat",
    short_name: "BartMooi",
    description: "Kozijnen, deuren, schuifpuien, rolluiken en gratis inmeting.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#13334d",
    lang: "nl-NL",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
