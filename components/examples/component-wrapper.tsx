"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CopyIcon from "@/icons/copy-icon";
import SimpleCheckedIcon from "@/icons/simple-checked-icon";

export interface Example {
  componentName: string;
  slug?: string;
  createdBy?: string;
  description?: string;
  tags?: string[];
  code: string;
  fullWidth?: boolean;
  component: React.ComponentType<{ isAnimated?: boolean }>;
}

const CodeViewer = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-accent text-foreground relative max-h-[400px] w-full overflow-auto rounded-md p-4 text-sm">
      <button
        onClick={copyToClipboard}
        className="bg-muted/50 text-muted-foreground hover:text-foreground absolute top-4 right-4 z-10 rounded-md p-1 backdrop-blur-sm transition-colors"
      >
        {copied ? (
          <SimpleCheckedIcon className="text-green-500" />
        ) : (
          <CopyIcon />
        )}
      </button>
      <pre className="font-mono text-xs">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const ExampleDetail = ({ example }: { example: Example }) => {
  const [isAnimated, setIsAnimated] = useState(true);

  return (
    <div className="border-border bg-card/50 w-full overflow-hidden rounded-xl border shadow-sm backdrop-blur-xl">
      <Tabs defaultValue="preview" className="flex w-full flex-col">
        <div className="border-border bg-card/50 flex items-center justify-between border-b px-6 py-3">
          <TabsList className="bg-muted">
            <TabsTrigger value="preview" className="cursor-pointer">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="cursor-pointer">
              Code
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">Animation</span>
            <button
              role="switch"
              aria-checked={isAnimated}
              aria-label="Toggle animation"
              onClick={() => setIsAnimated(!isAnimated)}
              className={cn(
                "relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
                isAnimated ? "bg-indigo-600" : "bg-input",
              )}
            >
              <span
                className={cn(
                  "inline-block h-3 w-3 transform rounded-full bg-white transition-transform",
                  isAnimated ? "translate-x-5" : "translate-x-1",
                )}
              />
            </button>
          </div>
        </div>

        <TabsContent value="preview" className="mt-0 flex-1 p-0">
          <div
            className={cn(
              "bg-muted/50 flex h-full min-h-[500px] w-full overflow-x-auto",
              example.fullWidth ? "items-center p-4" : "p-8",
            )}
          >
            <div className={example.fullWidth ? "w-full" : "m-auto"}>
              <example.component isAnimated={isAnimated} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0 flex-1 p-0">
          <CodeViewer code={example.code} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
