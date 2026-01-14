"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import MagnifierIcon from "../ui/magnifier-icon";
import HomeIcon from "../ui/home-icon";
import UsersIcon from "../ui/users-icon";
import BugIcon from "../ui/bug-icon";
import MailFilledIcon from "../ui/mail-filled-icon";
import UserCheckIcon from "../ui/user-check-icon";
import BookmarkIcon from "../ui/bookmark-icon";
import GearIcon from "../ui/gear-icon";
import WalletIcon from "../ui/wallet-icon";
import LogoutIcon from "../ui/logout-icon";
import QuestionMark from "../ui/question-mark";
import MoonIcon from "../ui/moon-icon";
import UnorderedListIcon from "../ui/unordered-list-icon";
import type { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";

const mainNavItems = [
  { icon: MagnifierIcon, label: "Search", href: "#" },
  { icon: HomeIcon, label: "Home", href: "#" },
  { icon: UsersIcon, label: "Meetings", href: "#" },
  { icon: BugIcon, label: "Notion AI", href: "#" },
  { icon: MailFilledIcon, label: "Inbox", href: "#" },
];

const sharedItems = [
  { icon: UserCheckIcon, label: "Start collaborating", href: "#" },
];

const notionApps = [
  { icon: MailFilledIcon, label: "Notion Mail", href: "#" },
  { icon: BookmarkIcon, label: "Notion Calendar", href: "#" },
];

const privateItems = [
  { icon: MoonIcon, label: "Welcome to Notion!", href: "#" },
  { icon: BookmarkIcon, label: "Student Planner", href: "#" },
  { icon: UsersIcon, label: "Group Project Planner", href: "#" },
  { icon: UnorderedListIcon, label: "Lesson Plans", href: "#" },
];

const footerItems = [
  { icon: GearIcon, label: "Settings", href: "#" },
  { icon: WalletIcon, label: "Marketplace", href: "#" },
  { icon: LogoutIcon, label: "Trash", href: "#" },
  { icon: QuestionMark, label: "Need help", href: "#" },
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
      <Icon
        className={`${isSmall ? "h-4 w-4" : "h-5 w-5"}`}
        ref={ref}
        disableHover={!isAnimated}
      />
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
