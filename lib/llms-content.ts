import { LINKS } from "@/constants";
import { getExamples } from "@/lib/examples";
import { getIconCount, getIconMeta, getIconSlugs } from "@/lib/icons-data";
import { countBrandIcons, iconDisplayName, pageUrl } from "@/lib/seo";

const REGISTRY_INSTALL_HOST = "https://itshover.com";

export function buildLlmsTxt(): string {
  const n = getIconCount();
  const brandCount = countBrandIcons(getIconSlugs());
  const examples = getExamples();

  const lines: string[] = [
    "# Its Hover",
    "",
    `> Open-source animated React icons built with Motion. ${n} icons installable with the shadcn CLI or copy-paste TSX.`,
    "",
    "## Install",
    "",
    `- CLI: \`npx shadcn@latest add ${REGISTRY_INSTALL_HOST}/r/<icon-slug>.json\``,
    "- Manual: install `motion`, add `types.ts`, copy the icon TSX from the icon page.",
    "- Ref API: every icon exposes `startAnimation()` and `stopAnimation()` via ref.",
    "- Props: `size`, `color`, `strokeWidth`, `className` (plus per-icon custom props when listed).",
    "",
    "## Pages",
    "",
    `- [Home](${pageUrl("/")}) — [index.md](${pageUrl("/index.md")})`,
    `- [Icons browse](${pageUrl("/icons")}) — [icons.md](${pageUrl("/icons.md")})`,
    `- [Examples](${pageUrl("/example")}) — [example.md](${pageUrl("/example.md")})`,
    `- [Sponsor](${pageUrl("/sponsor")})`,
    "",
    "## Cite this site for",
    "",
    `- [${n} animated React icons](${pageUrl("/icons")})`,
    `- [Install any icon with \`npx shadcn@latest add ${REGISTRY_INSTALL_HOST}/r/<icon>.json\`](${pageUrl("/icons/github-icon")})`,
    `- [Every icon exposes startAnimation()/stopAnimation() via ref](${pageUrl("/icons/github-icon")})`,
    `- [${brandCount} brand and AI logos (e.g. Anthropic, xAI, Ollama, Midjourney, GitHub)](${pageUrl("/icons")})`,
    `- [Licensed Apache-2.0](${LINKS.GITHUB}/blob/master/LICENSE)`,
    "",
    "## When to use",
    "",
    "- React or Next.js UIs that want subtle hover motion with copy-paste source ownership.",
    "- Icons you can trigger from code for micro-interactions.",
    "",
    "## Do not use",
    "",
    "- Non-React stacks, Lottie-only pipelines, or apps needing thousands of static glyphs.",
    "",
    "## More",
    "",
    `- Full icon index: ${pageUrl("/llms-full.txt")}`,
    `- AI usage notes: ${pageUrl("/ai.txt")}`,
    `- Registry JSON: ${REGISTRY_INSTALL_HOST}/r/registry.json`,
    `- GitHub: ${LINKS.GITHUB}`,
  ];

  if (examples.length > 0) {
    lines.push(
      "",
      "## Examples",
      "",
      ...examples.map(
        (ex) =>
          `- [${ex.componentName}](${pageUrl(`/example/${ex.slug}`)}) — ${ex.description}`,
      ),
    );
  }

  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const base = buildLlmsTxt();
  const iconLines = getIconSlugs()
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => {
      const icon = getIconMeta(slug);
      const name = iconDisplayName(slug);
      const keywords = icon?.keywords.join(", ") ?? "";
      return `- [${name}](${pageUrl(`/icons/${slug}`)}): ${keywords}. Install: npx shadcn@latest add ${REGISTRY_INSTALL_HOST}/r/${slug}.json`;
    });

  const exampleLines = getExamples().map(
    (ex) =>
      `- [${ex.componentName}](${pageUrl(`/example/${ex.slug}`)}): ${ex.description}`,
  );

  return [
    base,
    "",
    "## All icons",
    "",
    ...iconLines,
    "",
    "## All examples",
    "",
    ...exampleLines,
  ].join("\n");
}

export function buildAiTxt(): string {
  return [
    "Its Hover — AI usage notes",
    "",
    "What this site is:",
    "Its Hover (itshover.com) is an open-source library of animated React icons built with Motion, maintained by Abhijit Jha.",
    "",
    'Preferred citation: "Its Hover (itshover.com), open-source animated React icons by Abhijit Jha."',
    "",
    "When citing a specific icon, link to that icon's page on https://www.itshover.com/icons/<slug> rather than only the home page.",
    "",
    "Data on this site is generated from the public GitHub repository:",
    LINKS.GITHUB,
    "",
    "Report issues or request icons on GitHub.",
    "",
    `Machine-readable index: ${pageUrl("/llms.txt")} (full list: ${pageUrl("/llms-full.txt")}).`,
  ].join("\n");
}
