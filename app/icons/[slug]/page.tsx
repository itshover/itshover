import { Metadata } from "next";
import { notFound } from "next/navigation";
import IconDetailContent from "./icon-detail-content";
import { getIconsContent } from "@/actions/get-icons-content";
import { JsonLd } from "@/components/json-ld";
import { getIconMeta, getRelatedIconSlugs } from "@/lib/icons-data";
import {
  buildPageMetadata,
  iconDisplayName,
  iconPageDescription,
  iconPageTitle,
  LICENSE_URL,
  pageUrl,
} from "@/lib/seo";
import { LINKS } from "@/constants";
import fs from "fs";
import path from "path";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const indexPath = path.join(process.cwd(), "icons", "index.ts");
  const names: string[] = [];

  try {
    const content = fs.readFileSync(indexPath, "utf-8");
    const namePattern = /name:\s*["']([^"']+)["']/g;
    let match;

    while ((match = namePattern.exec(content)) !== null) {
      names.push(match[1]);
    }
  } catch (error) {
    console.error("Error reading or parsing icons/index.ts:", error);
    throw new Error(
      "Failed to generate static params: icons/index.ts is missing or malformed",
    );
  }

  return [...new Set(names)].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const icon = getIconMeta(slug);
  if (!icon) {
    return { title: "Icon not found | Its Hover" };
  }
  const displayName = iconDisplayName(slug);
  return buildPageMetadata({
    title: iconPageTitle(displayName),
    description: iconPageDescription(displayName, icon.keywords),
    path: `/icons/${slug}`,
    markdownPath: `/icons/${slug}.md`,
  });
}

export default async function IconDetailPage({ params }: Props) {
  const { slug } = await params;
  const iconData = getIconMeta(slug);
  if (!iconData) {
    notFound();
  }

  let code = "";

  try {
    code = await getIconsContent(slug);
    if (!code) {
      notFound();
    }
  } catch {
    notFound();
  }

  const displayName = iconDisplayName(slug);
  const relatedIconSlugs = getRelatedIconSlugs(slug, 8);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${displayName} animated icon`,
    url: pageUrl(`/icons/${slug}`),
    codeRepository: LINKS.GITHUB,
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    keywords: iconData.keywords.join(", "),
    license: LICENSE_URL,
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
        name: displayName,
        item: pageUrl(`/icons/${slug}`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={[softwareJsonLd, breadcrumbJsonLd]} />
      <IconDetailContent
        slug={slug}
        code={code}
        displayName={displayName}
        relatedIconSlugs={relatedIconSlugs}
      />
    </>
  );
}
