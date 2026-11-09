/**
 * Server-safe icon metadata (parsed from icons/index.ts without React imports).
 * Client components should import ICON_LIST directly when they need icon components.
 */
export {
  getIconCount,
  getIconMeta,
  getIconRegistry,
  getIconSlugs,
  getRelatedIconSlugs,
  type IconRegistryEntry,
} from "@/lib/icon-registry";
