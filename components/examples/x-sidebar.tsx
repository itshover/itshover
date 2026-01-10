"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import HomeIcon from "../ui/home-icon";
import MagnifierIcon from "../ui/magnifier-icon";
import FilledBellIcon from "../ui/filled-bell-icon";
import MailFilledIcon from "../ui/mail-filled-icon";
import TwitterXIcon from "../ui/twitter-x-icon";
import UnorderedListIcon from "../ui/unordered-list-icon";
import BookmarkIcon from "../ui/bookmark-icon";
import UserCheckIcon from "../ui/user-check-icon";
import UsersIcon from "../ui/users-icon";
import DotsHorizontalIcon from "../ui/dots-horizontal-icon";
import type { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";

const sidebarItems = [
  { icon: HomeIcon, label: "Home", href: "#" },
  { icon: MagnifierIcon, label: "Explore", href: "#" },
  { icon: FilledBellIcon, label: "Notifications", href: "#" },
  { icon: MailFilledIcon, label: "Chat", href: "#" },
  { icon: TwitterXIcon, label: "Premium", href: "#" },
  { icon: UnorderedListIcon, label: "Lists", href: "#" },
  { icon: BookmarkIcon, label: "Bookmarks", href: "#" },
  { icon: UsersIcon, label: "Communities", href: "#" },
  { icon: UserCheckIcon, label: "Profile", href: "#" },
  { icon: DotsHorizontalIcon, label: "More", href: "#" },
];

interface SidebarItemProps {
  icon: React.ComponentType<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
  label: string;
  href: string;
  isAnimated?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isAnimated = true,
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
      className="group hover:bg-accent hover:text-accent-foreground flex w-fit items-center gap-4 rounded-full px-4 py-3 text-xl transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="h-7 w-7" ref={ref} disableHover={!isAnimated} />
      <span className="font-normal">{label}</span>
    </Link>
  );
};

interface XSidebarProps {
  isAnimated?: boolean;
}

const XSidebar = ({ isAnimated = true }: XSidebarProps) => {
  return (
    <div className="bg-background text-foreground flex w-full flex-col p-4 md:w-[275px]">
      <div className="mb-4 px-4">
        <Link
          href="#"
          className="hover:bg-accent hover:text-accent-foreground flex h-12 w-12 items-center justify-center rounded-full"
        >
          <TwitterXIcon
            className="text-foreground h-8 w-8"
            disableHover={!isAnimated}
          />
        </Link>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} {...item} isAnimated={isAnimated} />
        ))}

        <button className="mt-4 w-[90%] rounded-full bg-[#1d9bf0] py-3.5 text-lg font-bold text-white transition-colors hover:bg-[#1a8cd8]">
          Post
        </button>
      </nav>
    </div>
  );
};

export default XSidebar;
