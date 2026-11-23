import Link from "next/link";
import CategoryIconGrid from "@/components/category-icon-grid";
import type { CategorySlug } from "@/lib/icon-categories";
import {
  CATEGORY_META,
  getIconsForCategory,
  getRelatedCategorySlugs,
} from "@/lib/icon-categories";
import {
  categoryAtAGlance,
  categoryH1,
  categoryIntroParagraph,
} from "@/lib/category-seo";

export default function CategoryPageContent({ slug }: { slug: CategorySlug }) {
  const icons = getIconsForCategory(slug);
  const related = getRelatedCategorySlugs(slug, 5);
  const glance = categoryAtAGlance(icons.length);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="px-4 py-12 sm:mr-20 sm:ml-20 sm:px-0">
        <nav className="text-muted-foreground mb-8 flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/icons"
            className="hover:text-foreground transition-colors"
          >
            Icons
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/icons/categories"
            className="hover:text-foreground transition-colors"
          >
            Categories
          </Link>
          <span aria-hidden>·</span>
          <span className="text-foreground">{CATEGORY_META[slug].label}</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {categoryH1(slug)}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-3xl text-lg leading-relaxed">
          {categoryIntroParagraph(slug)}
        </p>

        <div className="bg-muted/30 mb-10 max-w-2xl rounded-xl border p-5">
          <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase">
            At a glance
          </h2>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {glance.map((row) => (
              <li key={row.label} className="flex gap-2">
                <span className="text-muted-foreground min-w-28">
                  {row.label}
                </span>
                <span className="text-foreground font-medium">{row.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <CategoryIconGrid slugs={icons} />

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-3 text-lg font-semibold">Related categories</h2>
            <ul className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-2 text-sm">
              {related.map((rel) => (
                <li key={rel}>
                  <Link
                    href={`/icons/category/${rel}`}
                    className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                  >
                    {CATEGORY_META[rel].label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="text-muted-foreground mt-10 flex flex-wrap gap-4 text-sm">
          <Link
            href="/icons"
            className="hover:text-foreground transition-colors"
          >
            ← All icons
          </Link>
          <Link
            href="/icons/categories"
            className="hover:text-foreground transition-colors"
          >
            All categories
          </Link>
        </div>
      </div>
    </div>
  );
}
