import { buildAiTxt } from "@/lib/llms-content";
import { plainTextResponse } from "@/lib/markdown-response";

export const dynamic = "force-static";

export function GET() {
  return plainTextResponse(buildAiTxt());
}
