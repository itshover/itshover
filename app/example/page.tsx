import React from "react";
import Link from "next/link";
import { getExamples } from "@/lib/examples";
import { Example } from "@/components/examples/component-wrapper";

const ExamplePage = () => {
  const examples = getExamples();

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="w-full">
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-4xl font-bold">Examples</h1>
          <p className="text-muted-foreground text-lg">
            Explore our collection of animated components.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {examples.map((example) => (
            <ExampleCard key={example.slug} example={example} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ExampleCard = ({ example }: { example: Example }) => {
  return (
    <Link
      href={`/example/${example.slug}`}
      className="group border-border bg-card hover:border-primary/50 hover:bg-accent/5 relative flex flex-col overflow-hidden rounded-xl border transition-all"
    >
      <div className="bg-muted/50 relative aspect-video w-full overflow-hidden p-4">
        <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity duration-300 ease-in group-hover:opacity-100">
          {/* Scale down the component for preview */}
          <div className="pointer-events-none origin-center scale-[0.6] select-none">
            <example.component />
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <h3 className="text-card-foreground group-hover:text-primary text-lg font-semibold transition-colors">
          {example.componentName}
        </h3>
        {example.description && (
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {example.description}
          </p>
        )}
        {example.createdBy && (
          <span className="text-muted-foreground mt-2 text-xs">
            by {example.createdBy.split("/").pop()}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ExamplePage;
