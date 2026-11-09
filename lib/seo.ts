import type { Metadata } from "next";
import { LINKS } from "@/constants";

const BRAND_DISPLAY_OVERRIDES: Record<string, string> = {
  github: "GitHub",
  "twitter-x": "X (Twitter)",
  xai: "xAI",
  aistudio: "AI Studio",
  lmstudio: "LM Studio",
  wordpress: "WordPress",
  chatgpt: "ChatGPT",
  openai: "OpenAI",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  javascript: "JavaScript",
  typescript: "TypeScript",
  nodejs: "Node.js",
  anthropic: "Anthropic",
  midjourney: "Midjourney",
  ollama: "Ollama",
  gemini: "Gemini",
  grok: "Grok",
  notion: "Notion",
  nextjs: "Next.js",
  react: "React",
  vercel: "Vercel",
  paypal: "PayPal",
  qwen: "Qwen",
  stripe: "Stripe",
  aws: "AWS",
};

export function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.6) {
    return slice.slice(0, lastSpace).trimEnd() + "…";
  }
  return slice.trimEnd() + "…";
}

export function iconDisplayName(slug: string): string {
  let base = slug;
  if (base.endsWith("-icon")) {
    base = base.slice(0, -5);
  } else if (base.endsWith("-logo")) {
    base = base.slice(0, -5);
  } else if (base.endsWith("-svg")) {
    base = base.slice(0, -4);
  }
  if (base.startsWith("brand-")) {
    base = base.slice(6);
  }
  const parts = base.split("-").filter(Boolean);
  return parts
    .map((part) => {
      const lower = part.toLowerCase();
      if (BRAND_DISPLAY_OVERRIDES[lower]) {
        return BRAND_DISPLAY_OVERRIDES[lower];
      }
      if (part.length <= 3 && part === part.toUpperCase()) {
        return part;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

export function pageUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${LINKS.SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  markdownPath,
}: {
  title: string;
  description: string;
  path: string;
  markdownPath?: string;
}) {
  const canonical = path === "/" ? LINKS.SITE_URL : pageUrl(path);

  const alternates: Metadata["alternates"] = { canonical };
  if (markdownPath !== undefined) {
    alternates.types = { "text/markdown": markdownPath };
  } else if (path !== "/sponsor") {
    const mdPath = path === "/" ? "/index.md" : `${path}.md`;
    alternates.types = { "text/markdown": mdPath };
  }

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Its Hover",
      type: "website" as const,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export function iconPageTitle(displayName: string): string {
  const primary = `${displayName} animated icon for React | Its Hover`;
  if (primary.length <= 60) return primary;
  return `${displayName} animated icon | Its Hover`;
}

export function iconPageDescription(
  displayName: string,
  keywords: string[],
): string {
  const keywordSnippet =
    keywords.length > 0
      ? keywords.slice(0, 6).join(", ")
      : displayName.toLowerCase();
  const raw = `Free animated ${displayName} icon for React, built with Motion. Install with the shadcn CLI or copy the TSX. Keywords: ${keywordSnippet}.`;
  return truncateAtWord(raw, 155);
}

export function countBrandIcons(iconNames: string[]): number {
  return iconNames.filter((name) => name.startsWith("brand-")).length;
}

export const LICENSE_URL =
  "https://github.com/itshover/itshover/blob/master/LICENSE";
