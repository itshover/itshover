import { LINKS } from "@/constants";

export const dynamic = "force-static";

const ROBOTS_BODY = `# Its Hover: open-source animated React icons.
# AI agents: a plain-text index is at ${LINKS.SITE_URL}/llms.txt (full: /llms-full.txt); usage notes at /ai.txt
User-agent: *
Allow: /

User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
Allow: /

Sitemap: ${LINKS.SITE_URL}/sitemap.xml
`;

export function GET() {
  return new Response(ROBOTS_BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
