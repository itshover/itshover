import { Metadata } from "next";
import IconsPageContent from "./icons-page-content";
import { JsonLd } from "@/components/json-ld";
import { getIconCount, getIconSlugs } from "@/lib/icons-data";
import { buildPageMetadata, iconDisplayName, pageUrl } from "@/lib/seo";
import { LINKS } from "@/constants";

const iconCount = getIconCount();

export const metadata: Metadata = buildPageMetadata({
  title: `${iconCount} animated React icons, free and open source | Its Hover`,
  description: `Browse ${iconCount} animated React icons built with Motion. Search by name or keyword, preview the hover animation, then install with the shadcn CLI.`,
  path: "/icons",
  markdownPath: "/icons.md",
});

export default function IconsPage() {
  const slugs = getIconSlugs();

  const itemListElements = slugs.map((slug, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: iconDisplayName(slug),
    url: pageUrl(`/icons/${slug}`),
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Animated React icons",
    url: pageUrl("/icons"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: iconCount,
      itemListElement: itemListElements,
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
    ],
  };

  return (
    <>
      <JsonLd data={[collectionJsonLd, breadcrumbJsonLd]} />
      <IconsPageContent />
    </>
  );
}
