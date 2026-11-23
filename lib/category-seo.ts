import { LINKS } from "@/constants";
import type { CategorySlug } from "@/lib/icon-categories";
import {
  CATEGORY_META,
  categoryBrandNamesForIntro,
  categoryExampleNames,
  getIconsForCategory,
} from "@/lib/icon-categories";
import { truncateAtWord } from "@/lib/seo";

const REGISTRY_HOST = "https://www.itshover.com";

export function categoryPageTitle(slug: CategorySlug, count: number): string {
  const label = CATEGORY_META[slug].label;
  const candidates = [
    `${count} Animated ${label} Icons for React (2026) | Its Hover`,
    `${count} Animated ${label} for React (2026) | Its Hover`,
    `Animated ${label} Icons for React | Its Hover`,
  ];
  return (
    candidates.find((t) => t.length <= 60) ?? candidates[candidates.length - 1]
  );
}

export function categoryHubTitle(indexableCount: number): string {
  const raw = `Icon categories (${indexableCount}) | Its Hover`;
  return raw.length <= 60 ? raw : "Icon categories | Its Hover";
}

export function categoryPageDescription(
  slug: CategorySlug,
  count: number,
): string {
  const examples = categoryExampleNames(slug, 3).join(", ");
  const headline = CATEGORY_META[slug].headline;
  const raw = `Browse ${count} animated ${headline} icons for React on Its Hover. Includes ${examples}. Install with \`npx shadcn@latest add ${REGISTRY_HOST}/r/<slug>.json\`.`;
  return truncateAtWord(raw, 155);
}

export function categoryHubDescription(
  categoryCount: number,
  iconCount: number,
): string {
  const raw = `Explore ${categoryCount} curated collections of ${iconCount} animated React icons—brand logos, AI marks, arrows, media, and more. Each icon uses Motion and installs via the shadcn CLI.`;
  return truncateAtWord(raw, 155);
}

export function categoryIntroParagraph(slug: CategorySlug): string {
  const count = getIconsForCategory(slug).length;
  const examples = categoryExampleNames(slug, 4);
  const exampleList = examples.join(", ");

  if (slug === "brand-logos" || slug === "ai-logos") {
    const brands = categoryBrandNamesForIntro(slug);
    const sample =
      brands.length > 14
        ? `${brands.slice(0, 12).join(", ")}, and ${brands.length - 12} more`
        : brands.join(", ");
    const focus =
      slug === "ai-logos" ? "AI and ML product" : "company and product";
    return `This collection lists ${count} animated ${focus} logos for React—${sample}. Each is a Motion component that animates on hover and exposes startAnimation() and stopAnimation() through a ref. Install any icon with \`npx shadcn@latest add ${REGISTRY_HOST}/r/<slug>.json\`.`;
  }

  return `Its Hover includes ${count} animated ${CATEGORY_META[slug].headline} icons for React, including ${exampleList}. Each component is built with Motion, plays on hover, and exposes startAnimation() and stopAnimation() via ref. Add one with \`npx shadcn@latest add ${REGISTRY_HOST}/r/<slug>.json\`.`;
}

export function categoryH1(slug: CategorySlug): string {
  return `Animated ${CATEGORY_META[slug].headline} icons for React`;
}

export function categoriesHubIntro(
  indexableCount: number,
  totalIcons: number,
): string {
  return `Browse ${indexableCount} curated categories covering ${totalIcons} animated React icons on Its Hover. Every icon is a Motion component with hover animation and ref-based startAnimation()/stopAnimation() control.`;
}

export const CATEGORY_LICENSE_LINE = "Apache-2.0";

export const CATEGORY_INSTALL_LINE = `npx shadcn@latest add ${REGISTRY_HOST}/r/<icon-slug>.json`;

export function categoryAtAGlance(count: number) {
  return [
    { label: "Icons in category", value: String(count) },
    { label: "Dependency", value: "motion" },
    { label: "Install", value: "shadcn CLI or copy TSX" },
    { label: "License", value: CATEGORY_LICENSE_LINE },
  ] as const;
}

export function categoriesHubJsonLdItems(
  categories: { slug: CategorySlug; label: string; count: number }[],
) {
  return categories.map((cat, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${cat.label} (${cat.count})`,
    url: `${LINKS.SITE_URL}/icons/category/${cat.slug}`,
  }));
}
