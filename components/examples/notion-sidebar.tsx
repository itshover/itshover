"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import MagnifierIcon from "@/icons/magnifier-icon";
import HomeIcon from "@/icons/home-icon";
import UsersGroupIcon from "@/icons/users-group-icon";
import GithubCopilotIcon from "@/icons/github-copilot-icon";
import MailFilledIcon from "@/icons/mail-filled-icon";
import UserPlusIcon from "@/icons/user-plus-icon";
import SendIcon from "@/icons/send-icon";
import BrandNotionIcon from "@/icons/brand-notion-icon";
import GearIcon from "@/icons/gear-icon";
import ShoppingCartIcon from "@/icons/shopping-cart-icon";
import TrashIcon from "@/icons/trash-icon";
import InfoCircleIcon from "@/icons/info-circle-icon";
import SparklesIcon from "@/icons/sparkles-icon";
import BookIcon from "@/icons/book-icon";
import UsersIcon from "@/icons/users-icon";
import PenIcon from "@/icons/pen-icon";
import type { AnimatedIconHandle, AnimatedIconProps } from "@/icons/types";

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
    <Link
      href={href}
      className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className={`${isSmall ? "h-4 w-4" : "h-5 w-5"}`} ref={ref} />
      <span className="text-foreground font-normal">{label}</span>
    </Link>
  );
};

interface NotionSidebarProps {
  isAnimated?: boolean;
}

const NotionSidebar = ({ isAnimated = true }: NotionSidebarProps) => {
  return (
    <div className="bg-background text-foreground flex h-screen w-full flex-col border-r p-2 md:w-[240px]">
      <nav className="mb-5 flex flex-col gap-0.5">
        {mainNavItems.map((item) => (
          <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
        ))}
      </nav>
      <div className="mb-5">
        <h3 className="text-muted-foreground mb-1 px-2 text-xs font-medium">
          Shared
        </h3>
        <div className="flex flex-col gap-0.5">
          {sharedItems.map((item) => (
            <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-muted-foreground mb-1 px-2 text-xs font-medium">
          Notion apps
        </h3>
        <div className="flex flex-col gap-0.5">
          {notionApps.map((item) => (
            <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-muted-foreground mb-1 px-2 text-xs font-medium">
          Private
        </h3>
        <div className="flex flex-col gap-0.5">
          {privateItems.map((item) => (
            <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
          ))}
        </div>
      </div>
      <div className="my-2 border-t" />
      <div className="flex flex-col gap-0.5">
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
  );
};

export default NotionSidebar;
