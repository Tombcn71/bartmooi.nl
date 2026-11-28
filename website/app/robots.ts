import type { MetadataRoute } from "next";
import { SITE } from "./_c/seo";

// Alles mag gevonden worden, ook door de zoekmachines van AI-assistenten (ChatGPT, Gemini, Claude, Perplexity).
export default function robots(): MetadataRoute.Robots {
  // Testomgeving (NOINDEX=1): niets laten indexeren.
  if (process.env.NOINDEX) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/bedankt/", "/kantoor/", "/admin/"] },
      ...["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot", "Claude-User", "anthropic-ai", "Applebot-Extended", "CCBot"].map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
