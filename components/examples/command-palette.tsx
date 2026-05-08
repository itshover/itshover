"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import HomeIcon from "../ui/home-icon";
import LayoutDashboardIcon from "../ui/layout-dashboard-icon";
import PenIcon from "../ui/pen-icon";
import SendIcon from "../ui/send-icon";
import BookmarkIcon from "../ui/bookmark-icon";
import UserCheckIcon from "../ui/user-check-icon";
import GearIcon from "../ui/gear-icon";
import LogoutIcon from "../ui/logout-icon";
import BookIcon from "../ui/book-icon";
import BugIcon from "../ui/bug-icon";
import MagnifierIcon from "../ui/magnifier-icon";
import type { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";

type Command = {
  category: string;
  label: string;
  icon: React.ComponentType<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
};

const ALL_COMMANDS: Command[] = [
  { category: "Navigate", label: "Home", icon: HomeIcon },
  { category: "Navigate", label: "Dashboard", icon: LayoutDashboardIcon },
  { category: "Actions", label: "New Post", icon: PenIcon },
  { category: "Actions", label: "Send Message", icon: SendIcon },
  { category: "Actions", label: "Bookmarks", icon: BookmarkIcon },
  { category: "Account", label: "Profile", icon: UserCheckIcon },
  { category: "Account", label: "Settings", icon: GearIcon },
  { category: "Account", label: "Sign Out", icon: LogoutIcon },
  { category: "Help", label: "Documentation", icon: BookIcon },
  { category: "Help", label: "Report Bug", icon: BugIcon },
];

interface CommandItemProps {
  command: Command;
  isSelected: boolean;
  isAnimated: boolean;
  onSelect: () => void;
  onHover: () => void;
}

const CommandItem = ({
  command,
  isSelected,
  isAnimated,
  onSelect,
  onHover,
}: CommandItemProps) => {
  const ref = useRef<AnimatedIconHandle>(null);
  const { icon: Icon, label } = command;

  const handleMouseEnter = () => {
    onHover();
    if (isAnimated) ref.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    if (isAnimated) ref.current?.stopAnimation();
  };

  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
        isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
      }`}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        <Icon
          ref={ref}
          size={18}
          className="text-muted-foreground"
          disableHover={!isAnimated}
        />
      </span>
      <span className="flex-1 text-sm">{label}</span>
    </button>
  );
};

interface CommandPaletteProps {
  isAnimated?: boolean;
}

const CommandPalette = ({ isAnimated = true }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () =>
      query.trim()
        ? ALL_COMMANDS.filter((c) =>
            c.label.toLowerCase().includes(query.toLowerCase()),
          )
        : ALL_COMMANDS,
    [query],
  );

  const grouped = useMemo(
    () =>
      query.trim()
        ? null
        : ALL_COMMANDS.reduce<Record<string, Command[]>>((acc, cmd) => {
            if (!acc[cmd.category]) acc[cmd.category] = [];
            acc[cmd.category].push(cmd);
            return acc;
          }, {}),
    [query],
  );

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "p") {
        e.preventDefault();
        if (open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, openPalette, closePalette]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        console.log("Selected:", filtered[selectedIndex]?.label);
        closePalette();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, closePalette]);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [open]);

  return (
    <div className="flex h-64 w-full items-center justify-center">
      {/* Trigger button */}
      <button
        onClick={openPalette}
        className="border-border bg-muted/50 text-muted-foreground hover:bg-muted flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm shadow-sm transition-colors"
      >
        <MagnifierIcon size={16} disableHover={!isAnimated} />
        <span>Search commands...</span>
        <span className="ml-2 flex items-center gap-1">
          {["⌘", "⇧", "P"].map((key) => (
            <kbd
              key={key}
              className="border-border bg-background rounded border px-1.5 py-0.5 font-mono text-[11px] leading-none"
            >
              {key}
            </kbd>
          ))}
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePalette();
          }}
        >
          <div className="border-border bg-background mx-4 w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl">
            {/* Search input */}
            <div className="border-border flex items-center gap-3 border-b px-4 py-3">
              <MagnifierIcon
                size={18}
                className="text-muted-foreground shrink-0"
                disableHover
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search commands..."
                className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
              <kbd className="border-border bg-muted text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-[10px]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="text-muted-foreground py-6 text-center text-sm">
                  No commands found.
                </p>
              ) : query.trim() ? (
                filtered.map((cmd, i) => (
                  <CommandItem
                    key={cmd.label}
                    command={cmd}
                    isSelected={i === selectedIndex}
                    isAnimated={isAnimated}
                    onSelect={() => {
                      console.log("Selected:", cmd.label);
                      closePalette();
                    }}
                    onHover={() => setSelectedIndex(i)}
                  />
                ))
              ) : (
                Object.entries(grouped ?? {}).map(([category, commands]) => (
                  <div key={category} className="mb-2">
                    <p className="text-muted-foreground mb-1 px-3 text-[11px] font-medium tracking-wider uppercase">
                      {category}
                    </p>
                    {commands.map((cmd) => {
                      const globalIndex = ALL_COMMANDS.findIndex(
                        (c) => c.label === cmd.label,
                      );
                      return (
                        <CommandItem
                          key={cmd.label}
                          command={cmd}
                          isSelected={globalIndex === selectedIndex}
                          isAnimated={isAnimated}
                          onSelect={() => {
                            console.log("Selected:", cmd.label);
                            closePalette();
                          }}
                          onHover={() => setSelectedIndex(globalIndex)}
                        />
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandPalette;
