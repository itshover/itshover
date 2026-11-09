import { LINKS } from "@/constants";

export function markdownResponse(
  body: string,
  canonicalPath: string,
): Response {
  const canonical =
    canonicalPath === "/"
      ? LINKS.SITE_URL
      : `${LINKS.SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}

export function plainTextResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
