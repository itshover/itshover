import { buildIconsIndexMarkdown } from "@/lib/markdown-pages";
import { markdownResponse } from "@/lib/markdown-response";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(buildIconsIndexMarkdown(), "/icons");
}
