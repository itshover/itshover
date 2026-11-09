"use client";

import { ICON_LIST } from "@/icons/index";
import IconCard from "@/components/ui/icon-card";
import { useMemo } from "react";

export default function RelatedIconsSection({
  relatedIconSlugs,
}: {
  relatedIconSlugs: string[];
}) {
  const relatedIcons = useMemo(
    () =>
      relatedIconSlugs
        .map((slug) => ICON_LIST.find((icon) => icon.name === slug))
        .filter((icon): icon is (typeof ICON_LIST)[number] => Boolean(icon)),
    [relatedIconSlugs],
  );

  if (relatedIcons.length === 0) return null;

  return (
    <section className="mt-10 border-t pt-10">
      <h2 className="mb-4 text-xl font-semibold">Related icons</h2>
      <div className="flex flex-wrap items-center justify-start gap-4">
        {relatedIcons.map((icon) => (
          <IconCard key={icon.name} name={icon.name} icon={icon.icon} />
        ))}
      </div>
    </section>
  );
}
