import { LINKS } from "@/constants";
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
  return `# ${n} animated React icons

Browse ${n} animated React icons built with Motion. Search by name or keyword on the site, then install with the shadcn CLI.

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
${relatedMarkdown(slug)}
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
