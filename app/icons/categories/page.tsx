import { Metadata } from "next";
import CategoriesHubContent from "./categories-hub-content";
import { JsonLd } from "@/components/json-ld";
import { getIndexableCategories } from "@/lib/icon-categories";
import {
  categoriesHubIntro,
  categoriesHubJsonLdItems,
  categoryHubDescription,
  categoryHubTitle,
} from "@/lib/category-seo";
import { buildPageMetadata, pageUrl } from "@/lib/seo";
import { getIconCount } from "@/lib/icons-data";
import { LINKS } from "@/constants";

const indexable = getIndexableCategories();
const iconCount = getIconCount();

export const metadata: Metadata = buildPageMetadata({
  title: categoryHubTitle(indexable.length),
  description: categoryHubDescription(indexable.length, iconCount),
  path: "/icons/categories",
  markdownPath: "/icons/categories.md",
});

export default function IconCategoriesHubPage() {
  const intro = categoriesHubIntro(indexable.length, iconCount);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Animated React icon categories",
    url: pageUrl("/icons/categories"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: indexable.length,
      itemListElement: categoriesHubJsonLdItems(indexable),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: LINKS.SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Icons",
        item: pageUrl("/icons"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Categories",
        item: pageUrl("/icons/categories"),
      },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionJsonLd, breadcrumbJsonLd]} />
      <CategoriesHubContent intro={intro} categories={indexable} />
    </>
  );
}
