import { LINKS } from "@/constants";
import type { CategorySlug } from "@/lib/icon-categories";
import {
  CATEGORY_META,
  getCategoriesForIcon,
  getIconsForCategory,
  getIndexableCategories,
  isIndexableCategorySlug,
} from "@/lib/icon-categories";
import {
  categoryH1,
  categoryIntroParagraph,
  categoriesHubIntro,
} from "@/lib/category-seo";
import {
  DOCS_ACCESSIBILITY_NOTE,
  DOCS_INSTALL_MULTIPLE,
  DOCS_MANUAL_DEPENDENCY,
  DOCS_NEXT_NOTE,
  DOCS_REF_EXAMPLE,
  DOCS_VITE_NOTE,
  getDocsFaqs,
} from "@/lib/docs-content";
import { getExamples, getExampleBySlug } from "@/lib/examples";
import {
  getIconCount,
  getIconMeta,
  getIconSlugs,
  getRelatedIconSlugs,
} from "@/lib/icons-data";
import { iconDisplayName, pageUrl } from "@/lib/seo";

const REGISTRY_HOST = "https://itshover.com";

function relatedMarkdown(slug: string): string {
  const related = getRelatedIconSlugs(slug, 8);
  if (related.length === 0) return "";
  const lines = related.map(
    (name) => `- [${iconDisplayName(name)}](${pageUrl(`/icons/${name}`)})`,
  );
  return `\n## Related icons\n\n${lines.join("\n")}\n`;
}

export function buildHomeMarkdown(): string {
  const n = getIconCount();
  return `# Its Hover: ${n} animated React icons built with Motion

Free, open-source animated React icons built with Motion. ${n} icons animate on hover; add any with the shadcn CLI or copy the TSX into your app.

- [Browse icons](${pageUrl("/icons")})
- [Examples](${pageUrl("/example")})
- [Sponsor](${pageUrl("/sponsor")})
- [GitHub](${LINKS.GITHUB})
`;
}

export function buildIconsIndexMarkdown(): string {
  const n = getIconCount();
  const categories = getIndexableCategories();
  const categoryLines = categories.map(
    (c) =>
      `- [${c.label} (${c.count})](${pageUrl(`/icons/category/${c.slug}`)})`,
  );
  return `# ${n} animated React icons

Browse ${n} animated React icons built with Motion. Search by name or keyword on the site, then install with the shadcn CLI.

- [Browse by category](${pageUrl("/icons/categories")})
- [Docs](${pageUrl("/docs")})

## Categories

${categoryLines.join("\n")}

Canonical: ${pageUrl("/icons")}
`;
}

export function buildIconMarkdown(slug: string): string | null {
  const icon = getIconMeta(slug);
  if (!icon) return null;
  const name = iconDisplayName(slug);
  const custom =
    icon.customProps && icon.customProps.length > 0
      ? `\n- Custom props: ${icon.customProps.map((p) => p.name).join(", ")}`
      : "";

  const categoryLines = getCategoriesForIcon(slug).map(
    (cat) =>
      `- [${CATEGORY_META[cat].label}](${pageUrl(`/icons/category/${cat}`)})`,
  );
  const categoryBlock =
    categoryLines.length > 0
      ? `\n## Categories\n\n${categoryLines.join("\n")}\n`
      : "";

  return `# ${name} animated icon

${name} is a free animated React icon from Its Hover, built with Motion. It animates on hover and can be triggered from code with startAnimation() and stopAnimation().

## At a glance

- Dependency: motion
- Props: size, color, strokeWidth, className${custom}
- File: icons/${slug}.tsx
- License: Apache-2.0
- Keywords: ${icon.keywords.join(", ")}

## Install

\`\`\`bash
npx shadcn@latest add ${REGISTRY_HOST}/r/${slug}.json
\`\`\`

Manual: install \`motion\`, copy \`icons/${slug}.tsx\` from ${LINKS.GITHUB}.
${categoryBlock}${relatedMarkdown(slug)}
`;
}

export function buildCategoriesHubMarkdown(): string {
  const categories = getIndexableCategories();
  const intro = categoriesHubIntro(categories.length, getIconCount());
  const lines = categories.map(
    (c) =>
      `- [${c.label} (${c.count})](${pageUrl(`/icons/category/${c.slug}`)})`,
  );
  return `# Icon categories

${intro}

${lines.join("\n")}

Canonical: ${pageUrl("/icons/categories")}
`;
}

export function buildCategoryMarkdown(slug: string): string | null {
  if (!isIndexableCategorySlug(slug)) return null;
  const categorySlug = slug as CategorySlug;
  const icons = getIconsForCategory(categorySlug);
  const iconLines = icons.map(
    (name) => `- [${iconDisplayName(name)}](${pageUrl(`/icons/${name}`)})`,
  );
  return `# ${categoryH1(categorySlug)}

${categoryIntroParagraph(categorySlug)}

## Icons (${icons.length})

${iconLines.join("\n")}

Canonical: ${pageUrl(`/icons/category/${categorySlug}`)}
`;
}

export function buildDocsMarkdown(): string {
  const faqs = getDocsFaqs();
  const faqBlock = faqs
    .map((f) => `## ${f.question}\n\n${f.answer}`)
    .join("\n\n");

  return `# Install and animate React icons

Install with shadcn CLI or copy TSX manually. Control hover motion or call startAnimation() / stopAnimation() from a ref.

## Install

\`\`\`bash
npx shadcn@latest add https://www.itshover.com/r/github-icon.json
\`\`\`

Several icons:

\`\`\`bash
${DOCS_INSTALL_MULTIPLE}
\`\`\`

Manual: \`${DOCS_MANUAL_DEPENDENCY}\`, copy \`icons/types.ts\`, copy icon TSX.

## Usage

${DOCS_NEXT_NOTE}

${DOCS_VITE_NOTE}

## API

Props: size, color, strokeWidth, className (see icons/types.ts).

Ref: startAnimation(), stopAnimation().

\`\`\`tsx
${DOCS_REF_EXAMPLE}
\`\`\`

## Accessibility

${DOCS_ACCESSIBILITY_NOTE}

## FAQ

${faqBlock}

Canonical: ${pageUrl("/docs")}
`;
}

export function buildExampleIndexMarkdown(): string {
  const examples = getExamples();
  const lines = examples.map(
    (ex) =>
      `- [${ex.componentName}](${pageUrl(`/example/${ex.slug}`)}) — ${ex.description}`,
  );
  return `# Animated icon examples

${examples.length} example layouts using Its Hover icons.

${lines.join("\n")}
`;
}

export function buildExampleMarkdown(slug: string): string | null {
  const example = getExampleBySlug(slug);
  if (!example) return null;
  return `# ${example.componentName} example

${example.description}

Tags: ${example.tags.join(", ")}

View live: ${pageUrl(`/example/${slug}`)}
`;
}

export function getAllIconSlugsForMarkdown(): string[] {
  return [...new Set(getIconSlugs())].sort((a, b) => a.localeCompare(b));
}
