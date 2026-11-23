import { LINKS } from "@/constants";
import { getIconCount } from "@/lib/icons-data";
import { pageUrl } from "@/lib/seo";

const REGISTRY_HOST = "https://www.itshover.com";

export type DocsFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function getDocsFaqs(): DocsFaqItem[] {
  const iconCount = getIconCount();
  return [
    {
      id: "free-license",
      question: "Is Its Hover free and what license applies?",
      answer:
        "Yes. Icon source on its Hover is licensed under Apache-2.0. See the LICENSE file in the GitHub repository for the full text.",
    },
    {
      id: "nextjs",
      question: "Does it work with Next.js?",
      answer:
        'Yes. Icons are React components built with Motion. In the Next.js App Router, import them from a Client Component file (add "use client" at the top of your file) because Motion runs on the client.',
    },
    {
      id: "motion-package",
      question: "Do I need Framer Motion or Motion?",
      answer:
        'Install the motion package (npm install motion). Its Hover icons import from "motion/react", not the legacy framer-motion package name.',
    },
    {
      id: "trigger-without-hover",
      question: "How do I trigger animation without hover?",
      answer:
        "Attach a ref typed as AnimatedIconHandle and call startAnimation() or stopAnimation() from event handlers—for example onClick on a parent button.",
    },
    {
      id: "size-color",
      question: "How do I change size or color?",
      answer:
        "Pass size (number or CSS string), color (defaults to currentColor), strokeWidth, or className—the same props defined in icons/types.ts on every icon.",
    },
    {
      id: "how-many",
      question: "How many icons are in the library?",
      answer: `Its Hover ships ${iconCount} animated React icons. Browse them at ${pageUrl("/icons")} or by category at ${pageUrl("/icons/categories")}.`,
    },
  ];
}

export const DOCS_INSTALL_SINGLE = `npx shadcn@latest add ${REGISTRY_HOST}/r/github-icon.json`;

export const DOCS_INSTALL_MULTIPLE = `npx shadcn@latest add \\
  ${REGISTRY_HOST}/r/github-icon.json \\
  ${REGISTRY_HOST}/r/heart-icon.json \\
  ${REGISTRY_HOST}/r/plug-connected-icon.json`;

export const DOCS_MANUAL_DEPENDENCY = "npm install motion";

export const DOCS_TYPES_PATH = "icons/types.ts";

export const DOCS_REF_EXAMPLE = `"use client";

import { useRef } from "react";
import type { AnimatedIconHandle } from "@/icons/types";
import HeartIcon from "@/icons/heart-icon";

export function HeartButton() {
  const iconRef = useRef<AnimatedIconHandle>(null);
  return (
    <button
      type="button"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <HeartIcon ref={iconRef} size={32} />
    </button>
  );
}`;

export const DOCS_NEXT_NOTE =
  "In the App Router, the file that imports an icon component should be a Client Component. Server Components cannot use Motion hooks or refs.";

export const DOCS_VITE_NOTE =
  'In Vite or Create React App, import icons normally in any component—no "use client" directive is required.';

export const DOCS_ACCESSIBILITY_NOTE =
  "Most icons render as inline SVG without aria-hidden by default. Decorative uses should set aria-hidden on the icon or provide an accessible name on a parent control. Motion does not automatically respect prefers-reduced-motion in every icon; wrap animations or conditionally call stopAnimation() when matchMedia('(prefers-reduced-motion: reduce)') matches.";

export const DOCS_GITHUB_TYPES = `${LINKS.GITHUB}/blob/master/icons/types.ts`;
