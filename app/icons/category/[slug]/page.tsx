import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageContent from "./category-page-content";
import { JsonLd } from "@/components/json-ld";
import {
  CATEGORY_META,
  type CategorySlug,
  getIconsForCategory,
  getIndexableCategories,
  isIndexableCategorySlug,
} from "@/lib/icon-categories";
import { categoryPageDescription, categoryPageTitle } from "@/lib/category-seo";
import { buildPageMetadata, iconDisplayName, pageUrl } from "@/lib/seo";
import { LINKS } from "@/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getIndexableCategories().map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isIndexableCategorySlug(slug)) {
    return { title: "Category not found | Its Hover" };
  }
  const categorySlug = slug as CategorySlug;
  const count = getIconsForCategory(categorySlug).length;
  return buildPageMetadata({
    title: categoryPageTitle(categorySlug, count),
    description: categoryPageDescription(categorySlug, count),
    path: `/icons/category/${categorySlug}`,
    markdownPath: `/icons/category/${categorySlug}.md`,
  });
}

export default async function IconCategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!isIndexableCategorySlug(slug)) {
    notFound();
  }
  const categorySlug = slug as CategorySlug;
  const icons = getIconsForCategory(categorySlug);
  const label = CATEGORY_META[categorySlug].label;

  const itemListElements = icons.map((iconSlug, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: iconDisplayName(iconSlug),
    url: pageUrl(`/icons/${iconSlug}`),
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Animated ${label} icons for React`,
    url: pageUrl(`/icons/category/${categorySlug}`),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: icons.length,
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Categories",
        item: pageUrl("/icons/categories"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: label,
        item: pageUrl(`/icons/category/${categorySlug}`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionJsonLd, breadcrumbJsonLd]} />
      <CategoryPageContent slug={categorySlug} />
    </>
  );
}
