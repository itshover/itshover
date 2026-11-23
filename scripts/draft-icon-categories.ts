/**
 * One-off helper to validate category slug assignments. Run: npx tsx scripts/draft-icon-categories.ts
 */
import { getIconSlugs } from "../lib/icon-registry";
import {
  CATEGORY_ICON_SLUGS,
  getCategoriesForIcon,
  getIconsForCategory,
  getIndexableCategories,
} from "../lib/icon-categories";

const slugs = new Set(getIconSlugs());
const allAssigned = new Set<string>();

for (const [cat, list] of Object.entries(CATEGORY_ICON_SLUGS)) {
  for (const icon of list) {
    if (!slugs.has(icon)) {
      console.error(`Unknown icon in ${cat}: ${icon}`);
    }
    allAssigned.add(icon);
  }
}

for (const icon of slugs) {
  if (!allAssigned.has(icon)) {
    console.warn("Unassigned:", icon);
  }
}

console.log("\nIndexable categories:");
for (const cat of getIndexableCategories()) {
  console.log(`  ${cat.slug}: ${cat.count}`);
}

const below = (
  Object.keys(CATEGORY_ICON_SLUGS) as (keyof typeof CATEGORY_ICON_SLUGS)[]
).filter((s) => getIconsForCategory(s).length < 8);
console.log("\nBelow gate (excluded):", below.join(", ") || "none");

const multi = [...slugs].filter(
  (s) => getCategoriesForIcon(s).length > 1,
).length;
console.log(`Icons in multiple categories: ${multi}`);
