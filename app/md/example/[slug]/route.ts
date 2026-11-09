import { getExamples } from "@/lib/examples";
import { buildExampleMarkdown } from "@/lib/markdown-pages";
import { markdownResponse } from "@/lib/markdown-response";

export const dynamic = "force-static";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getExamples().map((example) => ({ slug: example.slug }));
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const body = buildExampleMarkdown(slug);
  if (!body) {
    return new Response("Not Found", { status: 404 });
  }
  return markdownResponse(body, `/example/${slug}`);
}
