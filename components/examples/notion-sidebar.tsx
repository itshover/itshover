"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
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
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isAnimated = true,
  isSmall = false,
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          aria-label={label}
          className="hover:bg-accent hover:text-accent-foreground flex items-center justify-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors md:justify-start"
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
          <span className="text-foreground hidden leading-tight font-normal md:block">
            {label}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={10} className="md:hidden">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

interface NotionSidebarProps {
  isAnimated?: boolean;
}

const NotionSidebar = ({ isAnimated = true }: NotionSidebarProps) => {
  return (
    <TooltipProvider>
      <div className="bg-background text-foreground custom-scrollbar flex h-fit max-h-screen w-14 flex-col overflow-x-hidden overflow-y-auto border-r p-2 transition-all duration-300 md:w-[240px]">
        <nav className="mb-5 flex shrink-0 flex-col gap-0.5">
          {mainNavItems.map((item) => (
            <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
          ))}
        </nav>
        <div className="mb-5 shrink-0">
          <h3 className="text-muted-foreground mb-1 hidden px-2 text-xs font-medium md:block">
            Shared
          </h3>
          <div className="flex flex-col gap-0.5">
            {sharedItems.map((item) => (
              <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
            ))}
          </div>
        </div>
        <div className="mb-5 shrink-0">
          <h3 className="text-muted-foreground mb-1 hidden px-2 text-xs font-medium md:block">
            Notion apps
          </h3>
          <div className="flex flex-col gap-0.5">
            {notionApps.map((item) => (
              <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
            ))}
          </div>
        </div>
        <div className="mb-5 shrink-0">
          <h3 className="text-muted-foreground mb-1 hidden px-2 text-xs font-medium md:block">
            Private
          </h3>
          <div className="flex flex-col gap-0.5">
            {privateItems.map((item) => (
              <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
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
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default NotionSidebar;
