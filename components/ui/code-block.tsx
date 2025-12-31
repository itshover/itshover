"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import CopyIcon from "@/icons/copy-icon";
import SimpleCheckedIcon from "@/icons/simple-checked-icon";

interface CodeBlockProps {
  command: string;
  className?: string;
}

export const CodeBlock = ({ command, className }: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("npm");

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCommand = (pm: string) => {
    switch (pm) {
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${command}`;
      case "yarn":
        return `yarn shadcn@latest add ${command}`;
      case "bun":
        return `bunx --bun shadcn@latest add ${command}`;
      default:
        return `npx shadcn@latest add ${command}`;
    }
  };

  const packageManagers = ["npm", "pnpm", "yarn", "bun"];

  return (
    <div
      className={cn(
        "bg-background text-foreground relative w-full max-w-2xl overflow-hidden rounded-xl border shadow-2xl",
        className,
      )}
    >
      <div className="from-primary/10 absolute inset-0 bg-linear-to-tr via-transparent to-transparent opacity-50" />

      <Tabs
        defaultValue="npm"
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative"
      >
        <div className="border-foreground/10 bg-background/5 flex items-center justify-between border-b px-4 py-2 backdrop-blur-sm">
          <TabsList className="relative h-8 bg-transparent p-0">
            {packageManagers.map((pm) => (
              <TabsTrigger
                key={pm}
                value={pm}
                className="text-foreground/60 hover:text-foreground/80 data-[state=active]:text-foreground relative z-10 h-8 rounded-md px-3 text-xs font-medium transition-colors"
              >
                {activeTab === pm && (
                  <motion.div
                    layoutId="activeTab"
                    className="bg-foreground/10 absolute inset-0 rounded-md"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{pm}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
            </div>
          </div>
        </div>

        <div className="group relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-foreground p-4 text-sm"
            >
              <span className="text-primary mr-2">$</span>
              {getCommand(activeTab)}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => copyToClipboard(getCommand(activeTab))}
            className="text-foreground hover:bg-foreground/10 hover:text-foreground absolute top-1/2 right-4 flex -translate-y-1/2 items-center rounded-md p-2 opacity-0 transition-all group-hover:opacity-100 focus:opacity-100"
          >
            {copied ? (
              <SimpleCheckedIcon className="text-green-500" size={18} />
            ) : (
              <CopyIcon size={18} />
            )}
          </button>
        </div>
      </Tabs>
    </div>
  );
};
