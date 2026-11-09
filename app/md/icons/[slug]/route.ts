import { buildIconMarkdown } from "@/lib/markdown-pages";
import { markdownResponse } from "@/lib/markdown-response";

export const dynamic = "force-static";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getAllIconSlugsForMarkdown } = await import("@/lib/markdown-pages");
  return getAllIconSlugsForMarkdown().map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const body = buildIconMarkdown(slug);
  if (!body) {
    return new Response("Not Found", { status: 404 });
  }
  return markdownResponse(body, `/icons/${slug}`);
}
