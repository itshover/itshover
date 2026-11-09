import fs from "fs";
import path from "path";

export type IconRegistryEntry = {
  name: string;
  keywords: string[];
  customProps?: {
    name: string;
    type: string;
    defaultValue: string | boolean | number;
  }[];
};

let cachedRegistry: IconRegistryEntry[] | null = null;

function parseKeywords(raw: string): string[] {
  const keywords: string[] = [];
  const stringPattern = /["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = stringPattern.exec(raw)) !== null) {
    keywords.push(match[1]);
  }
  return keywords;
}

function parseCustomProps(raw: string): IconRegistryEntry["customProps"] {
  const props: NonNullable<IconRegistryEntry["customProps"]> = [];
  const propPattern =
    /\{\s*name:\s*["']([^"']+)["'],\s*type:\s*["']([^"']+)["'],\s*defaultValue:\s*([^,}\n]+)\s*\}/g;
  let match: RegExpExecArray | null;
  while ((match = propPattern.exec(raw)) !== null) {
    const defaultRaw = match[3].trim();
    let defaultValue: string | boolean | number = defaultRaw.replace(/["']/g, "");
    if (defaultRaw === "true") defaultValue = true;
    else if (defaultRaw === "false") defaultValue = false;
    else if (/^\d+(\.\d+)?$/.test(defaultRaw)) defaultValue = Number(defaultRaw);
    props.push({ name: match[1], type: match[2], defaultValue });
  }
  return props.length > 0 ? props : undefined;
}

export function getIconRegistry(): IconRegistryEntry[] {
  if (cachedRegistry) return cachedRegistry;

  const indexPath = path.join(process.cwd(), "icons", "index.ts");
  const content = fs.readFileSync(indexPath, "utf-8");
  const listStart = content.indexOf("const ICON_LIST");
  if (listStart === -1) {
    throw new Error("ICON_LIST not found in icons/index.ts");
  }

  const listBody = content.slice(listStart);

  const icons: IconRegistryEntry[] = [];
  const entryPattern =
    /\{\s*name:\s*["']([^"']+)["'],\s*icon:\s*[A-Za-z0-9_]+,[\s\S]*?keywords:\s*\[([\s\S]*?)\]/g;

  let match: RegExpExecArray | null;
  while ((match = entryPattern.exec(listBody)) !== null) {
    const name = match[1];
    const trailing = listBody.slice(match.index, match.index + 2000);
    const customMatch = trailing.match(
      /customProps:\s*\[([\s\S]*?)\]\s*,?\s*\}/,
    );
    icons.push({
      name,
      keywords: parseKeywords(match[2]),
      customProps: customMatch ? parseCustomProps(customMatch[1]) : undefined,
    });
  }

  cachedRegistry = icons;
  return icons;
}

export function getIconCount(): number {
  return getIconRegistry().length;
}

export function getIconSlugs(): string[] {
  return getIconRegistry().map((icon) => icon.name);
}

export function getIconMeta(slug: string): IconRegistryEntry | undefined {
  return getIconRegistry().find((icon) => icon.name === slug);
}

export function getRelatedIconSlugs(slug: string, limit = 8): string[] {
  const current = getIconMeta(slug);
  if (!current) return [];

  const currentKeywords = new Set(current.keywords);

  return getIconRegistry()
    .filter((icon) => icon.name !== slug)
    .map((icon) => ({
      name: icon.name,
      score: icon.keywords.filter((kw) => currentKeywords.has(kw)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit)
    .map((entry) => entry.name);
}
