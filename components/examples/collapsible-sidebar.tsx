"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HomeIcon from "../ui/home-icon";
import MagnifierIcon from "../ui/magnifier-icon";
import FilledBellIcon from "../ui/filled-bell-icon";
import MailFilledIcon from "../ui/mail-filled-icon";
import UserCheckIcon from "../ui/user-check-icon";
import UnorderedListIcon from "../ui/unordered-list-icon";
import { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";

const sidebarItems = [
  { icon: HomeIcon, label: "Home", href: "#" },
  { icon: MagnifierIcon, label: "Search", href: "#" },
  { icon: FilledBellIcon, label: "Notifications", href: "#" },
  { icon: MailFilledIcon, label: "Messages", href: "#" },
  { icon: UnorderedListIcon, label: "Lists", href: "#" },
  { icon: UserCheckIcon, label: "Profile", href: "#" },
];

interface CollapsibleSidebarProps {
  className?: string;
  isAnimated?: boolean;
}

const CollapsibleSidebar = ({ className, isAnimated = true }: CollapsibleSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn("flex h-[600px] w-full p-4", className)}>
      <motion.div
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl",
          "border-border/50 backdrop-blur-3xl bg-white/80 dark:bg-neutral-900/80"
        )}
      >
        <div className="flex items-center p-4 pt-6">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl  bg-linear-to-tr  shadow-lg hover:bg-muted/50 cursor-pointer">
             <span className="font-bold text-lg">A</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 flex flex-col overflow-hidden"
              >
                <span className="text-lg font-bold text-foreground truncate">Acme Inc.</span>
                <span className="text-xs text-muted-foreground truncate">Enterprise Plan</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              isCollapsed={isCollapsed}
              isAnimated={isAnimated}
            />
          ))}
        </nav>

        <div className="px-3 pb-2">
           <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="group flex w-full items-center justify-center rounded-xl p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.div>
          </button>
        </div>

        <div className="border-t border-border/10 p-4">
             <div className={cn("flex items-center rounded-xl transition-colors hover:bg-muted/50 p-2", isCollapsed ? "justify-center" : "")}>
                <div className="h-9 w-9 shrink-0 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden border border-border">
                   <div className="h-full w-full bg-linear-to-br from-pink-400 to-orange-400" />
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-3 flex flex-col overflow-hidden"
                    >
                      <span className="text-sm font-medium text-foreground truncate">John Doe</span>
                      <span className="text-xs text-muted-foreground truncate">john@acme.com</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isCollapsed && (
                   <div className="ml-auto">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="16"
                       height="16"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       className="text-muted-foreground"
                     >
                       <path d="m6 9 6 6 6-6" />
                     </svg>
                   </div>
                )}
             </div>
        </div>
      </motion.div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ForwardRefExoticComponent<AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>>;
  label: string;
  href: string;
  isCollapsed: boolean;
  isAnimated: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isCollapsed, isAnimated }: SidebarItemProps) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    if (isAnimated) {
      iconRef.current?.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (isAnimated) {
      iconRef.current?.stopAnimation();
    }
  };

  useEffect(() => {
    if (!isAnimated) {
      iconRef.current?.stopAnimation();
    }
  }, [isAnimated]);

  const content = (
    <Link
      href={href}
      className={cn(
        "group flex items-center rounded-xl p-3 transition-all hover:bg-muted",
        isCollapsed ? "justify-center" : "gap-4"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon
        ref={iconRef}
        className="h-6 w-6 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
        disableHover={true}
      />
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap text-sm font-medium text-muted-foreground group-hover:text-foreground"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="bg-popover text-popover-foreground shadow-md border-border/10 rounded-lg px-3 py-1.5 font-medium text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

export default CollapsibleSidebar;
