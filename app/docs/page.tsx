import { Metadata } from "next";
import DocsPageContent from "./docs-page-content";
import { JsonLd } from "@/components/json-ld";
import { getDocsFaqs } from "@/lib/docs-content";
import { buildPageMetadata, pageUrl } from "@/lib/seo";
import { getIconCount } from "@/lib/icons-data";
import { LINKS } from "@/constants";

const iconCount = getIconCount();

export const metadata: Metadata = buildPageMetadata({
  title: "Docs: Install and Animate React Icons | Its Hover",
  description:
    "Install Its Hover icons with the shadcn CLI or manual copy, use them in Next.js and Vite, and trigger Motion animations with startAnimation() and stopAnimation().",
  path: "/docs",
  markdownPath: "/docs.md",
});

export default function DocsPage() {
  const faqs = getDocsFaqs();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Install and animate React icons",
    description:
      "Install Its Hover animated React icons, use Motion in Next.js and Vite, and control animations with refs.",
    url: pageUrl("/docs"),
    author: {
      "@type": "Person",
      name: "Abhijit Jha",
    },
    about: {
      "@type": "SoftwareSourceCode",
      name: "Its Hover",
      programmingLanguage: "TypeScript",
      runtimePlatform: "React",
      codeRepository: LINKS.GITHUB,
    },
    keywords: `React, Motion, animated icons, ${iconCount} icons`,
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
        name: "Docs",
        item: pageUrl("/docs"),
      },
    ],
  };

  return (
    <>
      <JsonLd data={[faqJsonLd, articleJsonLd, breadcrumbJsonLd]} />
      <DocsPageContent />
    </>
  );
}
