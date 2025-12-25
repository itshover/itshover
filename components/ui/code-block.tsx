"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

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
        return `pnpm add ${command}`;
      case "yarn":
        return `yarn add ${command}`;
      case "bun":
        return `bun add ${command}`;
      default:
        return `npm install ${command}`;
    }
  };

  const packageManagers = ["npm", "pnpm", "yarn", "bun"];

  return (
    <div
      className={cn(
        "relative w-full max-w-2xl overflow-hidden rounded-xl border bg-zinc-950 shadow-2xl",
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
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
          <TabsList className="h-8 bg-transparent p-0">
            {packageManagers.map((pm) => (
              <TabsTrigger
                key={pm}
                value={pm}
                className="relative h-8 rounded-md px-3 text-xs font-medium text-zinc-400 transition-colors hover:text-white data-[state=active]:bg-white/10 data-[state=active]:text-white"
              >
                {pm}
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
              className="p-4 text-sm text-zinc-300"
            >
              <span className="text-primary mr-2">$</span>
              {getCommand(activeTab)}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => copyToClipboard(getCommand(activeTab))}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-2 text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white focus:opacity-100"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </Tabs>
    </div>
  );
};
