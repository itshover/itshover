"use client";

import * as React from "react";
import { Command } from "cmdk";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { motion } from "motion/react";
import { ICONS } from "@/lib/icons";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

export const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 pt-[20vh] sm:items-center sm:pt-0"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-popover text-popover-foreground w-full max-w-[450px] overflow-hidden rounded-xl border shadow-2xl"
      >
        <CommandInput placeholder="Search for icons..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Icons">
            {ICONS.map((icon) => (
              <CommandItem
                key={icon.name}
                className="gap-4"
                onSelect={() => {
                  router.push(icon.path);
                  setOpen(false);
                }}
              >
                <MoveRight className="h-4 w-4" />
                {icon.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </motion.div>
    </Command.Dialog>
  );
};
