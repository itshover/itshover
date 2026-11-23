import { getIndexableCategories } from "@/lib/icon-categories";
import { buildCategoryMarkdown } from "@/lib/markdown-pages";
import { markdownResponse } from "@/lib/markdown-response";

export const dynamic = "force-static";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getIndexableCategories().map((c) => ({ slug: c.slug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<Params> },
) {
  const { slug } = await context.params;
  const body = buildCategoryMarkdown(slug);
  if (!body) {
    return new Response("Not found", { status: 404 });
  }
  return markdownResponse(body, `/icons/category/${slug}`);
}
