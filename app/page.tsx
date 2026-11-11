import type { Metadata } from "next";
import HomePageContent from "./home-page-content";
import { JsonLd } from "@/components/json-ld";
import { LINKS } from "@/constants";
import { getIconCount } from "@/lib/icons-data";
import { buildPageMetadata, LICENSE_URL, pageUrl } from "@/lib/seo";

const iconCount = getIconCount();

export const metadata: Metadata = buildPageMetadata({
  title: `Its Hover: ${iconCount} animated React icons built with Motion`,
  description: `Free, open-source animated React icons built with Motion. ${iconCount} icons animate on hover; add any with the shadcn CLI or copy the TSX into your app.`,
  path: "/",
  markdownPath: "/index.md",
});

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Its Hover",
    url: LINKS.SITE_URL,
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Its Hover",
    url: LINKS.SITE_URL,
    logo: pageUrl("/logo.png"),
    sameAs: [LINKS.GITHUB, LINKS.TWITTER],
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Its Hover",
    description: `Open-source animated React icons built with Motion (${iconCount} icons).`,
    url: LINKS.SITE_URL,
    codeRepository: LINKS.GITHUB,
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    license: LICENSE_URL,
  };

  return (
    <>
      <JsonLd data={[websiteJsonLd, organizationJsonLd, softwareJsonLd]} />
      <HomePageContent />
    </>
  );
}
