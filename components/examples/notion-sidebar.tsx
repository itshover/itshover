"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import MagnifierIcon from "../ui/magnifier-icon";
import HomeIcon from "../ui/home-icon";
import UsersGroupIcon from "../ui/users-group-icon";
import GithubCopilotIcon from "../ui/github-copilot-icon";
import MailFilledIcon from "../ui/mail-filled-icon";
import UserPlusIcon from "../ui/user-plus-icon";
import SendIcon from "../ui/send-icon";
import BrandNotionIcon from "../ui/brand-notion-icon";
import GearIcon from "../ui/gear-icon";
import ShoppingCartIcon from "../ui/shopping-cart-icon";
import TrashIcon from "../ui/trash-icon";
import InfoCircleIcon from "../ui/info-circle-icon";
import SparklesIcon from "../ui/sparkles-icon";
import BookIcon from "../ui/book-icon";
import UsersIcon from "../ui/users-icon";
import PenIcon from "../ui/pen-icon";
import ArrowNarrowLeftIcon from "../ui/arrow-narrow-left-icon";
import RightChevron from "../ui/right-chevron";
import type { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const mainNavItems = [
  { icon: MagnifierIcon, label: "Search", href: "#" },
  { icon: HomeIcon, label: "Home", href: "#" },
  { icon: UsersGroupIcon, label: "Meetings", href: "#" },
  { icon: GithubCopilotIcon, label: "Notion AI", href: "#" },
  { icon: MailFilledIcon, label: "Inbox", href: "#" },
];

const sharedItems = [
  { icon: UserPlusIcon, label: "Start collaborating", href: "#" },
];

const notionApps = [
  { icon: SendIcon, label: "Notion Mail", href: "#" },
  { icon: BrandNotionIcon, label: "Notion Calendar", href: "#" },
];

const privateItems = [
  { icon: SparklesIcon, label: "Welcome to Notion!", href: "#" },
  { icon: BookIcon, label: "Student Planner", href: "#" },
  { icon: UsersIcon, label: "Group Project Planner", href: "#" },
  { icon: PenIcon, label: "Lesson Plans", href: "#" },
];

const footerItems = [
  { icon: GearIcon, label: "Settings", href: "#" },
  { icon: ShoppingCartIcon, label: "Marketplace", href: "#" },
  { icon: TrashIcon, label: "Trash", href: "#" },
  { icon: InfoCircleIcon, label: "Need help", href: "#" },
];

interface SidebarItemProps {
  icon: React.ComponentType<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
  label: string;
  href: string;
  isAnimated?: boolean;
  isSmall?: boolean;
  isOpen?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isAnimated = true,
  isSmall = false,
  isOpen = true,
}: SidebarItemProps) => {
  const ref = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    if (isAnimated) {
      ref.current?.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (isAnimated) {
      ref.current?.stopAnimation();
    }
  };

  useEffect(() => {
    if (!isAnimated) {
      ref.current?.stopAnimation();
    }
  }, [isAnimated]);

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          aria-label={label}
          className={`hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors ${
            isOpen ? "justify-start" : "justify-center"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center">
            <Icon
              size={isSmall ? 16 : 20}
              className={`${isSmall ? "h-4 w-4" : "h-5 w-5"}`}
              ref={ref}
              disableHover={!isAnimated}
            />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <span className="text-foreground block w-[170px] leading-tight font-normal">
                  {label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={10}
        className={isOpen ? "hidden" : ""}
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

interface NotionSidebarProps {
  isAnimated?: boolean;
}

const NotionSidebar = ({ isAnimated = true }: NotionSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 240 : 56 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-background text-foreground custom-scrollbar flex h-fit max-h-screen flex-col overflow-x-hidden overflow-y-auto border-r p-2"
      >
        <nav className="mb-4 flex shrink-0 flex-col gap-0.5">
          {mainNavItems.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              isAnimated={isAnimated}
              isOpen={isOpen}
            />
          ))}
        </nav>
        <div className="mb-4 shrink-0">
          {isOpen && (
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground mb-1 px-2 text-xs font-medium"
            >
              Shared
            </motion.h3>
          )}
          <div className="flex flex-col gap-0.5">
            {sharedItems.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
                isAnimated={isAnimated}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>
        <div className="mb-4 shrink-0">
          {isOpen && (
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground mb-1 px-2 text-xs font-medium"
            >
              Notion apps
            </motion.h3>
          )}
          <div className="flex flex-col gap-0.5">
            {notionApps.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
                isAnimated={isAnimated}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>
        <div className="shrink-0">
          {isOpen && (
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground mb-1 px-2 text-xs font-medium"
            >
              Private
            </motion.h3>
          )}
          <div className="flex flex-col gap-0.5">
            {privateItems.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
                isAnimated={isAnimated}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>
        <div className="my-2 shrink-0 border-t" />
        <div className="flex shrink-0 flex-col gap-0.5 pb-2">
          {footerItems.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              isAnimated={isAnimated}
              isSmall
              isOpen={isOpen}
            />
          ))}
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleSidebar}
            className="hover:bg-accent hover:text-accent-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <ArrowNarrowLeftIcon
                ref={triggerRef}
                size={20}
                className="text-foreground"
                disableHover={!isAnimated}
              />
            ) : (
              <RightChevron
                ref={triggerRef}
                size={20}
                className="text-foreground"
                disableHover={!isAnimated}
              />
            )}
          </button>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default NotionSidebar;
