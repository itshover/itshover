"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ICON_LIST } from "@/icons/index";
import type { CategorySlug } from "@/lib/icon-categories";

type HubCategory = {
  slug: CategorySlug;
  label: string;
  count: number;
  previewSlugs: string[];
};

function CategoryPreview({ slugs }: { slugs: string[] }) {
  const previews = slugs
    .map((slug) => ICON_LIST.find((i) => i.name === slug))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="mt-4 flex gap-2">
      {previews.map((item) => {
        if (!item) return null;
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="bg-muted/40 flex h-12 w-12 items-center justify-center rounded-lg border"
          >
            <Icon size={28} />
          </div>
        );
      })}
    </div>
  );
}

export default function CategoriesHubContent({
  intro,
  categories,
}: {
  intro: string;
  categories: HubCategory[];
}) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="px-4 py-12 sm:mr-20 sm:ml-20 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/icons"
            className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm transition-colors"
          >
            ← Back to all icons
          </Link>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Icon categories
          </h1>
          <p className="text-muted-foreground mb-10 max-w-3xl text-lg leading-relaxed">
            {intro}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <Link
                  href={`/icons/category/${category.slug}`}
                  className="hover:border-primary/40 bg-card block h-full rounded-xl border p-5 shadow-sm transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-lg font-semibold">{category.label}</h2>
                    <span className="text-muted-foreground text-sm">
                      {category.count}
                    </span>
                  </div>
                  <CategoryPreview slugs={category.previewSlugs} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
