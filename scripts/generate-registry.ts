/**
 * Script to generate registry.json from icons directory
 *
 * This ensures the shadcn registry stays in sync with the icon files.
 * Run with: `npm run registry:build`
 */

import * as fs from "fs";
import * as path from "path";
import { getIconRegistry } from "@/lib/icon-registry";
import { iconDisplayName } from "@/lib/seo";

const ICONS_DIR = path.join(__dirname, "..", "icons");
const REGISTRY_PATH = path.join(__dirname, "..", "registry.json");
const SITE_ORIGIN = "https://www.itshover.com";

// Files to exclude from registry (not actual icons)
const EXCLUDED_FILES = ["index.ts", "types.ts"];

interface RegistryFile {
  path: string;
  type: "registry:ui";
}

interface RegistryItem {
  name: string;
  type: "registry:ui";
  title: string;
  description: string;
  categories: string[];
  docs: string;
  meta: { keywords: string[] };
  registryDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
  files: RegistryFile[];
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

function getIconMetaByName(): Map<string, { keywords: string[] }> {
  const map = new Map<string, { keywords: string[] }>();
  for (const entry of getIconRegistry()) {
    map.set(entry.name, { keywords: entry.keywords });
  }
  return map;
}

/**
 * Get all icon files from the icons directory
 */
function getIconFiles(): string[] {
  try {
    const files = fs.readdirSync(ICONS_DIR);

    return files.filter((file) => {
      // Only include .tsx files
      if (!file.endsWith(".tsx")) return false;
      // Exclude non-icon files
      if (EXCLUDED_FILES.includes(file)) return false;
      return true;
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(`❌ Error: Icons directory not found at "${ICONS_DIR}"`);
      console.error(
        "   Make sure you're running this script from the project root.",
      );
    } else if ((error as NodeJS.ErrnoException).code === "EACCES") {
      console.error(`❌ Error: Permission denied reading "${ICONS_DIR}"`);
    } else {
      console.error(`❌ Error reading icons directory: ${error}`);
    }
    process.exit(1);
  }
}

/**
 * Convert filename to registry name (remove .tsx extension)
 */
function fileToRegistryName(filename: string): string {
  return filename.replace(/\.tsx$/, "");
}

function buildCategories(
  slug: string,
  keywords: string[],
): RegistryItem["categories"] {
  const categories: string[] = ["icons"];
  const keywordSet = new Set(keywords.map((kw) => kw.toLowerCase()));
  const isBrand =
    slug.startsWith("brand-") ||
    slug.endsWith("-logo") ||
    keywordSet.has("brand") ||
    keywordSet.has("logo");
  if (isBrand) {
    categories.push("brand");
  }
  return categories;
}

function buildDescription(displayName: string): string {
  return `Animated ${displayName} icon for React, built with Motion. Animates on hover and exposes startAnimation() and stopAnimation() through a ref.`;
}

/**
 * Generate a registry item for an icon file
 */
function generateRegistryItem(
  filename: string,
  iconMetaByName: Map<string, { keywords: string[] }>,
): RegistryItem {
  const name = fileToRegistryName(filename);
  const meta = iconMetaByName.get(name);
  const keywords = meta?.keywords ?? [];
  const title = iconDisplayName(name);
  const description = buildDescription(title);

  return {
    name,
    type: "registry:ui",
    title,
    description,
    categories: buildCategories(name, keywords),
    docs: `${SITE_ORIGIN}/icons/${name}`,
    meta: { keywords },
    registryDependencies: [],
    dependencies: ["motion"],
    devDependencies: [],
    files: [
      {
        path: `icons/${filename}`,
        type: "registry:ui",
      },
      {
        path: "icons/types.ts",
        type: "registry:ui",
      },
    ],
  };
}

/**
 * Extract icon names from icons/index.ts ICON_LIST
 */
function getIconListNames(): string[] {
  return getIconRegistry().map((entry) => entry.name);
}

/**
 * Validate that all icon files are registered in ICON_LIST
 */
function validateIconList(iconFiles: string[]): void {
  const iconListNames = new Set(getIconListNames());
  const fileNames = new Set(iconFiles.map(fileToRegistryName));

  // Find icons in files but not in ICON_LIST
  const missingFromList: string[] = [];
  for (const fileName of fileNames) {
    if (!iconListNames.has(fileName)) {
      missingFromList.push(fileName);
    }
  }

  // Find icons in ICON_LIST but not in files
  const missingFromFiles: string[] = [];
  for (const listName of iconListNames) {
    if (!fileNames.has(listName)) {
      missingFromFiles.push(listName);
    }
  }

  // Report warnings
  if (missingFromList.length > 0) {
    console.log("");
    console.log(
      `⚠️  Warning: ${missingFromList.length} icon(s) not in ICON_LIST (won't show on website):`,
    );
    missingFromList.forEach((name) => console.log(`   - ${name}`));
    console.log("   → Add them to icons/index.ts to display on the website");
  }

  if (missingFromFiles.length > 0) {
    console.log("");
    console.log(
      `⚠️  Warning: ${missingFromFiles.length} ICON_LIST entry(s) without matching file:`,
    );
    missingFromFiles.forEach((name) => console.log(`   - ${name}`));
    console.log("   → Remove them from icons/index.ts or create the file");
  }
}

/**
 * Write registry.json file
 */
function writeRegistry(content: string): void {
  try {
    fs.writeFileSync(REGISTRY_PATH, content);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EACCES") {
      console.error(
        `❌ Error: Permission denied writing to "${REGISTRY_PATH}"`,
      );
    } else if ((error as NodeJS.ErrnoException).code === "ENOSPC") {
      console.error("❌ Error: No space left on disk");
    } else if ((error as NodeJS.ErrnoException).code === "EROFS") {
      console.error("❌ Error: File system is read-only");
    } else {
      console.error(`❌ Error writing registry.json: ${error}`);
    }
    process.exit(1);
  }
}

/**
 * Main function to generate registry.json
 */
function generateRegistry(): void {
  console.log("Scanning icons directory...");
  const iconFiles = getIconFiles();
  console.log(`Found ${iconFiles.length} icon files`);

  const iconMetaByName = getIconMetaByName();

  console.log("Generating registry items...");
  const items = iconFiles.map((file) =>
    generateRegistryItem(file, iconMetaByName),
  );

  // Sort items alphabetically by name
  items.sort((a, b) => a.name.localeCompare(b.name));

  const registry: Registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "itshover",
    homepage: SITE_ORIGIN,
    items,
  };

  console.log("Writing registry.json...");

  // Add auto-generated notice as a JSON field (since JSON doesn't support comments)
  const registryWithNotice = {
    _generated:
      "AUTO-GENERATED FILE - DO NOT EDIT. Run 'npm run registry:build' to regenerate.",
    ...registry,
  };

  const jsonContent = JSON.stringify(registryWithNotice, null, 2) + "\n";
  writeRegistry(jsonContent);

  console.log("");
  console.log("✅ Registry generated successfully!");
  console.log(`  - Total icons: ${items.length}`);

  // Validate ICON_LIST sync
  validateIconList(iconFiles);

  console.log("");
}

// Run the script
generateRegistry();
