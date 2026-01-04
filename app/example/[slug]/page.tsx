import React from "react";
import { getExampleBySlug } from "@/lib/examples";
import { notFound } from "next/navigation";
import { ExampleDetail } from "@/components/examples/component-wrapper";
import Link from "next/link";
import GithubIcon from "@/components/ui/github-icon";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ExampleDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {example.componentName}
            </h1>
            {example.description && (
              <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
                {example.description}
              </p>
            )}
            {example.createdBy && (
              <div className="mt-2 flex items-center gap-2">
                <div className="bg-muted flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                  <GithubIcon className="text-muted-foreground h-4 w-4" />
                </div>
                <Link
                  href={example.createdBy}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  {example.createdBy.split("/").pop()}
                </Link>
              </div>
            )}
          </div>

          {/* Component Preview/Code */}
          <ExampleDetail example={example} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Platform
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary text-secondary-foreground ring-border inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset">
                React
              </span>
              <span className="bg-secondary text-secondary-foreground ring-border inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset">
                TypeScript
              </span>
            </div>
          </div>

          {example.tags && example.tags.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {example.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground ring-border inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExampleDetailPage;
