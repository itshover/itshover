import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { LINKS } from "@/constants";
import {
  DOCS_ACCESSIBILITY_NOTE,
  DOCS_INSTALL_MULTIPLE,
  DOCS_MANUAL_DEPENDENCY,
  DOCS_NEXT_NOTE,
  DOCS_REF_EXAMPLE,
  DOCS_TYPES_PATH,
  DOCS_VITE_NOTE,
  getDocsFaqs,
} from "@/lib/docs-content";

const sections = [
  { id: "install", label: "Install" },
  { id: "usage", label: "Usage" },
  { id: "api", label: "API" },
  { id: "accessibility", label: "Accessibility" },
  { id: "faq", label: "FAQ" },
] as const;

export default function DocsPageContent() {
  const faqs = getDocsFaqs();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="px-4 py-12 sm:mr-20 sm:ml-20 sm:px-0">
        <p className="text-muted-foreground mb-2 text-sm">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Docs</span>
        </p>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Install and animate React icons
        </h1>
        <p className="text-muted-foreground mb-8 max-w-3xl text-lg leading-relaxed">
          Its Hover icons are Motion-powered React components. Install with the
          shadcn CLI or copy TSX manually, then control hover motion or call
          startAnimation() / stopAnimation() from a ref.
        </p>

        <nav
          aria-label="On this page"
          className="text-muted-foreground mb-10 flex flex-wrap gap-3 text-sm"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <section id="install" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-semibold">Install</h2>

          <h3 className="mb-2 text-lg font-medium">One icon (shadcn CLI)</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Same command shown on each icon page:
          </p>
          <CodeBlock
            command={`${LINKS.SITE_URL}/r/github-icon.json`}
            className="mb-8 max-w-2xl"
          />

          <h3 className="mb-2 text-lg font-medium">Several icons</h3>
          <pre className="bg-muted/30 mb-8 max-w-2xl overflow-x-auto rounded-xl border p-4 text-sm">
            <code>{DOCS_INSTALL_MULTIPLE}</code>
          </pre>

          <h3 className="mb-2 text-lg font-medium">Manual install</h3>
          <ol className="text-muted-foreground mb-4 list-decimal space-y-2 pl-5 text-sm">
            <li>
              Run{" "}
              <code className="text-foreground">{DOCS_MANUAL_DEPENDENCY}</code>
            </li>
            <li>
              Copy <code className="text-foreground">{DOCS_TYPES_PATH}</code>{" "}
              from{" "}
              <Link
                href={LINKS.GITHUB}
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                the repository
              </Link>
            </li>
            <li>
              Copy the icon TSX from the icon detail page into your project
            </li>
          </ol>
        </section>

        <section id="usage" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-semibold">Usage</h2>

          <h3 className="mb-2 text-lg font-medium">Next.js App Router</h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {DOCS_NEXT_NOTE}
          </p>

          <h3 className="mb-2 text-lg font-medium">Vite / React</h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {DOCS_VITE_NOTE}
          </p>
        </section>

        <section id="api" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-semibold">API reference</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Every icon accepts{" "}
            <code className="text-foreground">AnimatedIconProps</code> from{" "}
            <code className="text-foreground">icons/types.ts</code>:
          </p>
          <ul className="text-muted-foreground mb-6 list-inside list-disc space-y-1 text-sm">
            <li>
              <code className="text-foreground">size</code> — number or CSS
              string (default 24 on most icons)
            </li>
            <li>
              <code className="text-foreground">color</code> — SVG stroke/fill
              color (default{" "}
              <code className="text-foreground">currentColor</code>)
            </li>
            <li>
              <code className="text-foreground">strokeWidth</code> — number
              (default 2)
            </li>
            <li>
              <code className="text-foreground">className</code> — extra classes
              on the root SVG
            </li>
          </ul>
          <p className="text-muted-foreground mb-4 text-sm">
            Ref handle:{" "}
            <code className="text-foreground">startAnimation()</code> and{" "}
            <code className="text-foreground">stopAnimation()</code>.
          </p>
          <pre className="bg-muted/30 max-w-2xl overflow-x-auto rounded-xl border p-4 text-xs sm:text-sm">
            <code>{DOCS_REF_EXAMPLE}</code>
          </pre>
          <p className="text-muted-foreground mt-4 text-sm">
            Some icons document extra props on their detail page (for example
            trash-icon custom booleans).
          </p>
        </section>

        <section id="accessibility" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-semibold">Accessibility</h2>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            {DOCS_ACCESSIBILITY_NOTE}
          </p>
        </section>

        <section id="faq" className="scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold">FAQ</h2>
          <dl className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} id={faq.id}>
                <dt className="mb-2 text-lg font-medium">{faq.question}</dt>
                <dd className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="text-muted-foreground mt-12 text-sm">
          <Link
            href="/icons/categories"
            className="text-primary hover:underline"
          >
            Browse icon categories
          </Link>
          {" · "}
          <Link href="/icons" className="text-primary hover:underline">
            All icons
          </Link>
        </p>
      </div>
    </div>
  );
}
