import { getIconRegistry } from "@/lib/icon-registry";
import { iconDisplayName } from "@/lib/seo";

export const MIN_ICONS_PER_CATEGORY = 8;

export type CategorySlug = keyof typeof CATEGORY_META;

export const CATEGORY_META = {
  "brand-logos": {
    label: "Brand logos",
    headline: "brand logo",
  },
  "ai-logos": {
    label: "AI logos",
    headline: "AI logo",
  },
  arrows: {
    label: "Arrows",
    headline: "arrow",
  },
  "navigation-layout": {
    label: "Navigation & layout",
    headline: "navigation and layout",
  },
  "communication-social": {
    label: "Communication & social",
    headline: "communication and social",
  },
  "files-text-editing": {
    label: "Files, text & editing",
    headline: "text and editing",
  },
  media: {
    label: "Media",
    headline: "media",
  },
  "commerce-finance-crypto": {
    label: "Commerce, finance & crypto",
    headline: "commerce and finance",
  },
  "weather-nature": {
    label: "Weather & nature",
    headline: "weather and nature",
  },
  devices: {
    label: "Devices",
    headline: "device",
  },
  "time-calendar": {
    label: "Time & calendar",
    headline: "time and calendar",
  },
  "emoji-faces": {
    label: "Emoji & faces",
    headline: "emoji and face",
  },
  "accessibility-system": {
    label: "Accessibility & system",
    headline: "accessibility and system",
  },
} as const satisfies Record<string, { label: string; headline: string }>;

export const CATEGORY_ICON_SLUGS = {
  "accessibility-system": [
    "accessibility-icon",
    "brightness-down-icon",
    "bug-icon",
    "checked-icon",
    "double-check-icon",
    "download-icon",
    "eye-icon",
    "eye-off-icon",
    "filled-checked-icon",
    "gear-icon",
    "info-circle-icon",
    "lock-icon",
    "question-mark",
    "save-icon",
    "shield-check",
    "simple-checked-icon",
    "sliders-horizontal-icon",
    "toggle-icon",
    "trash-icon",
    "triangle-alert-icon",
    "upload-icon",
  ],
  "ai-logos": [
    "brain-circuit-icon",
    "brand-aistudio-icon",
    "brand-anthropic-icon",
    "brand-cursor-icon",
    "brand-gemini-icon",
    "brand-grok-icon",
    "brand-lmstudio-icon",
    "brand-midjourney-icon",
    "brand-notion-icon",
    "brand-ollama-icon",
    "brand-openai-icon",
    "brand-qwen-icon",
    "brand-xai-icon",
    "github-copilot-icon",
  ],
  arrows: [
    "arrow-back-icon",
    "arrow-back-up-icon",
    "arrow-big-down-dash-icon",
    "arrow-big-down-icon",
    "arrow-big-left-dash-icon",
    "arrow-big-left-icon",
    "arrow-big-right-dash-icon",
    "arrow-big-right-icon",
    "arrow-big-up-dash-icon",
    "arrow-big-up-icon",
    "arrow-down-0-1-icon",
    "arrow-down-1-0-icon",
    "arrow-down-a-z-icon",
    "arrow-narrow-down-dashed-icon",
    "arrow-narrow-down-icon",
    "arrow-narrow-left-dashed-icon",
    "arrow-narrow-left-icon",
    "arrow-narrow-right-dashed-icon",
    "arrow-narrow-right-icon",
    "arrow-narrow-up-dashed-icon",
    "arrow-narrow-up-icon",
    "down-chevron",
    "external-link-icon",
    "right-chevron",
  ],
  "brand-logos": [
    "apple-brand-logo",
    "brain-circuit-icon",
    "brand-aistudio-icon",
    "brand-anthropic-icon",
    "brand-aws-icon",
    "brand-bags-fm-icon",
    "brand-chrome-icon",
    "brand-cursor-icon",
    "brand-gemini-icon",
    "brand-google-icon",
    "brand-grok-icon",
    "brand-lmstudio-icon",
    "brand-midjourney-icon",
    "brand-nextjs-icon",
    "brand-notion-icon",
    "brand-ollama-icon",
    "brand-openai-icon",
    "brand-paypal-icon",
    "brand-qwen-icon",
    "brand-railway-icon",
    "brand-react-icon",
    "brand-react-native-icon",
    "brand-stripe-icon",
    "brand-telegram-icon",
    "brand-threads-icon",
    "brand-twitch-icon",
    "brand-vercel-icon",
    "brand-windows-icon",
    "brand-wordpress-icon",
    "brand-xai-icon",
    "brand-zoom-icon",
    "discord-icon",
    "docker-icon",
    "facebook-icon",
    "figma-icon",
    "github-copilot-icon",
    "github-icon",
    "gitlab-icon",
    "gmail-icon",
    "golang-icon",
    "instagram-icon",
    "javascript-icon",
    "linkedin-icon",
    "mysql-icon",
    "nodejs-icon",
    "pinterest-icon",
    "python-icon",
    "slack-icon",
    "snapchat-icon",
    "spotify-icon",
    "twitter-icon",
    "twitter-x-icon",
    "typescript-icon",
    "whatsapp-icon",
    "x-icon",
    "youtube-icon",
  ],
  "commerce-finance-crypto": [
    "cart-icon",
    "chart-bar-icon",
    "chart-covariate-icon",
    "chart-histogram-icon",
    "chart-line-icon",
    "chart-pie-icon",
    "coin-bitcoin-icon",
    "credit-card",
    "currency-bitcoin-icon",
    "currency-dollar-icon",
    "currency-ethereum-icon",
    "currency-euro-icon",
    "currency-rupee-icon",
    "gauge-icon",
    "rosette-discount-check-icon",
    "rosette-discount-icon",
    "shopping-cart-icon",
    "target-icon",
    "trophy-icon",
    "truck-electric-icon",
    "wallet-icon",
  ],
  "communication-social": [
    "at-sign-icon",
    "bell-off-icon",
    "double-check-icon",
    "filled-bell-icon",
    "hand-heart-icon",
    "hashtag-icon",
    "heart-icon",
    "like-icon",
    "mail-filled-icon",
    "message-circle-icon",
    "phone-volume",
    "qrcode-icon",
    "radio-icon",
    "send-horizontal-icon",
    "send-icon",
    "telephone-icon",
    "user-check-icon",
    "user-icon",
    "user-plus-icon",
    "users-group-icon",
    "users-icon",
  ],
  devices: [
    "battery-charging-icon",
    "battery-icon",
    "battery-pause-icon",
    "bluetooth-connected-icon",
    "brightness-down-icon",
    "cpu-icon",
    "device-airpods-icon",
    "dialpad-icon",
    "focus-icon",
    "gamepad-icon",
    "plug-connected-icon",
    "plug-connected-x-icon",
    "terminal-icon",
    "washing-machine-icon",
    "wifi-icon",
    "wifi-off-icon",
  ],
  "emoji-faces": [
    "angry-icon",
    "annoyed-icon",
    "ghost-icon",
    "heart-icon",
    "like-icon",
    "meh-icon",
    "party-popper-icon",
    "skull-emoji",
    "sparkles-icon",
    "star-icon",
  ],
  "files-text-editing": [
    "align-center-icon",
    "align-vertical-space-around-icon",
    "ampersand-icon",
    "arrow-down-a-z-icon",
    "book-icon",
    "bookmark-icon",
    "code-icon",
    "code-xml-icon",
    "copy-icon",
    "copy-off-icon",
    "copyright-icon",
    "file-description-icon",
    "filter-icon",
    "keyframes-icon",
    "letter-a-icon",
    "letter-b-icon",
    "letter-c-icon",
    "letter-d-icon",
    "letter-e-icon",
    "letter-f-icon",
    "letter-g-icon",
    "letter-h-icon",
    "letter-i-icon",
    "letter-j-icon",
    "letter-k-icon",
    "letter-l-icon",
    "letter-m-icon",
    "letter-n-icon",
    "letter-o-icon",
    "letter-p-icon",
    "letter-q-icon",
    "letter-r-icon",
    "letter-s-icon",
    "letter-t-icon",
    "letter-u-icon",
    "letter-v-icon",
    "letter-w-icon",
    "letter-x-icon",
    "letter-y-icon",
    "letter-z-icon",
    "library-icon",
    "paint-icon",
    "pen-icon",
    "subscript-icon",
    "unordered-list-icon",
  ],
  media: [
    "camera-icon",
    "camera-off-icon",
    "drum-icon",
    "player-icon",
    "satellite-dish-icon",
    "scan-barcode-icon",
    "scan-heart-icon",
    "vinyl-icon",
    "volume-2-icon",
    "volume-x-icon",
  ],
  "navigation-layout": [
    "airplane-icon",
    "dots-horizontal-icon",
    "dots-vertical-icon",
    "expand-icon",
    "globe-icon",
    "home-icon",
    "hotel-icon",
    "layers-icon",
    "layout-bottombar-collapse-icon",
    "layout-dashboard-icon",
    "layout-sidebar-right-collapse-icon",
    "layout-sidebar-right-icon",
    "link-icon",
    "locate-icon",
    "logout-icon",
    "magnifier-icon",
    "map-pin-icon",
    "mouse-pointer-2-icon",
    "passport-icon",
    "router-icon",
    "stack-3-icon",
    "stack-icon",
    "travel-bag",
    "unlink-icon",
    "world-icon",
  ],
  "time-calendar": [
    "alarm-clock-plus-icon",
    "clock-icon",
    "history-circle-icon",
    "refresh-icon",
  ],
  "weather-nature": [
    "ambulance-icon",
    "banana-icon",
    "bulb-svg",
    "candy-cane-icon",
    "cloud-1-icon",
    "cloud-2-icon",
    "cloud-3-icon",
    "coffee-icon",
    "dino-icon",
    "flame-icon",
    "ghost-icon",
    "hand-heart-icon",
    "moon-icon",
    "party-popper-icon",
    "paw-print-icon",
    "rainbow-icon",
    "rocket-icon",
    "skull-emoji",
    "soup-icon",
    "sparkles-icon",
  ],
} as const satisfies Record<CategorySlug, readonly string[]>;

function buildIconToCategories(): Map<string, CategorySlug[]> {
  const map = new Map<string, Set<CategorySlug>>();
  for (const [category, slugs] of Object.entries(CATEGORY_ICON_SLUGS) as [
    CategorySlug,
    readonly string[],
  ][]) {
    for (const slug of slugs) {
      if (!map.has(slug)) map.set(slug, new Set());
      map.get(slug)!.add(category);
    }
  }
  const out = new Map<string, CategorySlug[]>();
  for (const [slug, set] of map) {
    out.set(
      slug,
      [...set].sort((a, b) =>
        CATEGORY_META[a].label.localeCompare(CATEGORY_META[b].label),
      ),
    );
  }
  return out;
}

let iconToCategories: Map<string, CategorySlug[]> | null = null;

function getIconToCategories() {
  if (!iconToCategories) iconToCategories = buildIconToCategories();
  return iconToCategories;
}

export function getIconsForCategory(slug: CategorySlug): string[] {
  const list = [...CATEGORY_ICON_SLUGS[slug]];
  const registry = new Set(getIconRegistry().map((i) => i.name));
  return list.filter((name) => registry.has(name)).sort();
}

export function getIndexableCategories(): {
  slug: CategorySlug;
  label: string;
  headline: string;
  count: number;
  previewSlugs: string[];
}[] {
  return (Object.keys(CATEGORY_META) as CategorySlug[])
    .map((slug) => {
      const icons = getIconsForCategory(slug);
      return {
        slug,
        label: CATEGORY_META[slug].label,
        headline: CATEGORY_META[slug].headline,
        count: icons.length,
        previewSlugs: icons.slice(0, 4),
      };
    })
    .filter((entry) => entry.count >= MIN_ICONS_PER_CATEGORY)
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function isIndexableCategorySlug(slug: string): slug is CategorySlug {
  return getIndexableCategories().some((c) => c.slug === slug);
}

export function getCategoriesForIcon(iconSlug: string): CategorySlug[] {
  const indexable = new Set(getIndexableCategories().map((c) => c.slug));
  return (getIconToCategories().get(iconSlug) ?? []).filter((c) =>
    indexable.has(c),
  );
}

const RELATED_OVERRIDES: Partial<Record<CategorySlug, CategorySlug[]>> = {
  "brand-logos": ["ai-logos", "communication-social", "arrows", "media"],
  "ai-logos": [
    "brand-logos",
    "devices",
    "files-text-editing",
    "navigation-layout",
  ],
  arrows: [
    "navigation-layout",
    "communication-social",
    "files-text-editing",
    "accessibility-system",
  ],
  "navigation-layout": [
    "arrows",
    "communication-social",
    "devices",
    "accessibility-system",
  ],
  "communication-social": [
    "brand-logos",
    "emoji-faces",
    "navigation-layout",
    "media",
  ],
  "files-text-editing": [
    "arrows",
    "accessibility-system",
    "commerce-finance-crypto",
    "media",
  ],
  media: ["communication-social", "devices", "brand-logos", "emoji-faces"],
  "commerce-finance-crypto": [
    "brand-logos",
    "navigation-layout",
    "files-text-editing",
    "devices",
  ],
  "weather-nature": [
    "emoji-faces",
    "media",
    "navigation-layout",
    "commerce-finance-crypto",
  ],
  devices: [
    "navigation-layout",
    "media",
    "accessibility-system",
    "commerce-finance-crypto",
  ],
  "emoji-faces": [
    "communication-social",
    "weather-nature",
    "media",
    "accessibility-system",
  ],
  "accessibility-system": [
    "navigation-layout",
    "devices",
    "files-text-editing",
    "arrows",
  ],
};

export function getRelatedCategorySlugs(
  slug: CategorySlug,
  limit = 5,
): CategorySlug[] {
  const indexable = getIndexableCategories().map((c) => c.slug);
  const indexableSet = new Set(indexable);
  const override = RELATED_OVERRIDES[slug];
  if (override) {
    return override
      .filter((s) => indexableSet.has(s) && s !== slug)
      .slice(0, limit);
  }

  const iconsInCategory = new Set(getIconsForCategory(slug));
  const scores = indexable
    .filter((s) => s !== slug)
    .map((other) => {
      const shared = getIconsForCategory(other).filter((i) =>
        iconsInCategory.has(i),
      ).length;
      return { other, shared };
    })
    .filter((e) => e.shared > 0)
    .sort((a, b) => b.shared - a.shared);

  return scores.slice(0, limit).map((e) => e.other);
}

export function categoryExampleNames(slug: CategorySlug, count = 4): string[] {
  return getIconsForCategory(slug)
    .slice(0, count)
    .map((s) => iconDisplayName(s));
}

export function categoryBrandNamesForIntro(slug: CategorySlug): string[] {
  if (slug !== "brand-logos" && slug !== "ai-logos") return [];
  const slugs = getIconsForCategory(slug);
  return slugs
    .map((s) => iconDisplayName(s))
    .filter((name, i, arr) => arr.indexOf(name) === i)
    .sort((a, b) => a.localeCompare(b));
}
