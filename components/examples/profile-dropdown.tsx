"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";
import { motion, AnimatePresence } from "framer-motion";
import UserPlusIcon from "../ui/user-plus-icon";
import GearIcon from "../ui/gear-icon";
import MessageCircleIcon from "../ui/message-circle-icon";
import CreditCard from "../ui/credit-card";
import LogoutIcon from "../ui/logout-icon";
import Image from "next/image";

const items: ProfileDropdownItemProps[] = [
  { icon: UserPlusIcon, label: "Profile", href: "#" },
  { icon: MessageCircleIcon, label: "Community", href: "#" },
  {
    icon: CreditCard,
    label: "Subscription",
    href: "#",
    badge: "PRO",
  },
  { icon: GearIcon, label: "Settings", href: "#" },
  { icon: LogoutIcon, label: "Sign Out", href: "#" },
];

interface ProfileDropdownItemProps {
  icon: React.ComponentType<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
  label: string;
  href: string;
  badge?: string;
  isAnimated?: boolean;
}

const ProfileDropdownItem = ({
  icon: Icon,
  label,
  href,
  badge,
  isAnimated = true,
}: ProfileDropdownItemProps) => {
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
      className="group hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-4 py-2 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="h-5 w-5" ref={ref} disableHover />
      <span>{label}</span>

      {badge && (
        <span className="rounded-full bg-purple-200 px-2 py-0.5 text-xs font-semibold text-purple-800">
          {badge}
        </span>
      )}
    </Link>
  );
};

interface ProfileDropdownProps {
  avatarSrc?: string;
  isAnimated?: boolean;
}

const ProfileDropdown = ({
  avatarSrc,
  isAnimated = true,
}: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle profile menu"
        aria-expanded={isOpen}
        className="hover:ring-accent flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-all hover:ring-2"
      >
        <Image
          src={avatarSrc || "/default-avatar.jpg"}
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="border-border bg-background absolute right-0 z-50 mt-2 min-w-[220px] overflow-hidden rounded-xl border shadow-lg"
          >
            {items.map((item) => (
              <ProfileDropdownItem
                key={item.label}
                {...item}
                isAnimated={isAnimated}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
