"use client";
import React from "react";
import { ICON_LIST } from "@/icons/index";
import { motion } from "motion/react";
import Link from "next/link";
import CopyIcon from "@/icons/copy-icon";
import SimpleCheckedIcon from "@/icons/simple-checked-icon";
import { getIconsContent } from "@/actions/get-icons-content";
import { CodeBlock } from "@/components/ui/code-block";
import ArrowNarrowLeftIcon from "@/icons/arrow-narrow-left-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LINKS } from "@/constants";

export default function IconDetailContent({ slug }: { slug: string }) {
  const [iconCode, setIconCode] = React.useState<string>("");
  const [codeCopied, setCodeCopied] = React.useState(false);
  const [depCopied, setDepCopied] = React.useState(false);

  const iconData = ICON_LIST.find((icon) => icon.name === slug);
  const IconComponent = iconData?.icon;

  React.useEffect(() => {
    if (slug) {
      getIconsContent(slug).then(setIconCode).catch(console.error);
    }
  }, [slug]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(iconCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyDependency = async () => {
    await navigator.clipboard.writeText("npm install motion");
    setDepCopied(true);
    setTimeout(() => setDepCopied(false), 2000);
  };

  if (!iconData || !IconComponent) {
    return (
      <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Icon not found</h1>
          <Link
            href="/icons"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2"
          >
            <ArrowNarrowLeftIcon className="h-4 w-4" />
            Back to Icons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="px-4 py-12 sm:mr-20 sm:ml-20 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/icons"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowNarrowLeftIcon size={18} />
            Back to Icons
          </Link>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-16">
            {/* Left Section - Icon Preview */}
            <div className="flex flex-col items-center md:w-[300px] md:shrink-0">
              <motion.div
                className="bg-muted/30 flex aspect-square w-full max-w-xs items-center justify-center rounded-2xl border p-12"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <IconComponent size={120} />
              </motion.div>

              <motion.h1
                className="mt-6 text-2xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {iconData.name}
              </motion.h1>

              <motion.div
                className="mt-3 flex flex-wrap justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {iconData.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="min-w-0 flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-4 text-xl font-semibold">Installation</h2>
              <Tabs defaultValue="cli" className="w-full">
                <TabsList className="border-border mb-6 h-auto gap-4 rounded-none border-b bg-transparent">
                  <TabsTrigger
                    value="cli"
                    className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary relative items-center rounded-none border-b-2 border-transparent bg-transparent px-6 py-2 font-medium data-[state=active]:shadow-none"
                  >
                    CLI
                  </TabsTrigger>
                  <TabsTrigger
                    value="manual"
                    className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary relative items-center rounded-none border-b-2 border-transparent bg-transparent px-6 py-2 font-medium data-[state=active]:shadow-none"
                  >
                    Manual
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cli" className="mt-0 space-y-4">
                  <div>
                    <CodeBlock
                      command={`${LINKS.SITE_URL}/${iconData.name}.json`}
                      className="w-full"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-8">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium">
                        1
                      </span>
                      <h2 className="text-lg font-semibold">
                        Install Dependency
                      </h2>
                    </div>
                    <div className="bg-muted/30 group relative overflow-hidden rounded-xl border">
                      <div className="flex items-center justify-between border-b px-4 py-2">
                        <span className="text-muted-foreground text-xs">
                          Terminal
                        </span>
                        <button
                          onClick={copyDependency}
                          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          {depCopied ? (
                            <>
                              <SimpleCheckedIcon
                                size={14}
                                className="text-green-500"
                              />
                              Copied
                            </>
                          ) : (
                            <>
                              <CopyIcon size={14} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-sm">
                        <code>
                          <span className="text-primary">$</span> npm install
                          motion
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Step 2: Copy Code */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium">
                        2
                      </span>
                      <h2 className="text-lg font-semibold">Copy the Code</h2>
                    </div>
                    <div className="bg-muted/30 relative overflow-hidden rounded-xl border">
                      <div className="flex items-center justify-between border-b px-4 py-2">
                        <span className="text-muted-foreground text-xs">
                          {iconData.name}.tsx
                        </span>
                        <button
                          onClick={copyCode}
                          disabled={!iconCode}
                          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors disabled:opacity-50"
                        >
                          {codeCopied ? (
                            <>
                              <SimpleCheckedIcon
                                size={14}
                                className="text-green-500"
                              />
                              Copied
                            </>
                          ) : (
                            <>
                              <CopyIcon size={14} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="max-h-[500px] overflow-auto">
                        {iconCode ? (
                          <pre className="p-4 text-sm">
                            <code className="text-foreground/90">
                              {iconCode}
                            </code>
                          </pre>
                        ) : (
                          <div className="flex h-40 items-center justify-center">
                            <span className="text-muted-foreground text-sm">
                              Loading code...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Custom Props Table */}
                  {iconData.customProps && iconData.customProps.length > 0 && (
                    <div>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium">
                          3
                        </span>
                        <h2 className="text-lg font-semibold">Custom Props</h2>
                      </div>
                      <div className="bg-muted/30 overflow-hidden rounded-xl border">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50 border-b">
                            <tr>
                              <th className="px-4 py-3 text-left font-medium">
                                Prop
                              </th>
                              <th className="px-4 py-3 text-left font-medium">
                                Type
                              </th>
                              <th className="px-4 py-3 text-left font-medium">
                                Default
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {iconData.customProps.map((prop) => (
                              <tr
                                key={prop.name}
                                className="border-b last:border-0"
                              >
                                <td className="text-primary px-4 py-3 font-mono">
                                  {prop.name}
                                </td>
                                <td className="text-muted-foreground px-4 py-3 font-mono">
                                  {prop.type}
                                </td>
                                <td className="text-muted-foreground px-4 py-3 font-mono">
                                  {String(prop.defaultValue)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
