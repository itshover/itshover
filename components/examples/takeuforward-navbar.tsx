"use client";

import { useState, useRef, useEffect } from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { motion, AnimatePresence } from "motion/react";
import HomeIcon from "../ui/home-icon";
import LayoutDashboardIcon from "../ui/layout-dashboard-icon";
import WalletIcon from "../ui/wallet-icon";
import UserIcon from "../ui/users-icon";
import GearIcon from "../ui/gear-icon";
import BugIcon from "../ui/bug-icon";
import UnorderedListIcon from "../ui/unordered-list-icon";
import QuestionMark from "../ui/question-mark";
import MoonIcon from "../ui/moon-icon";
import FilledBellIcon from "../ui/filled-bell-icon";
import LogoutIcon from "../ui/logout-icon";
import LockIcon from "../ui/lock-icon";
import RightCheveron from "../ui/right-cheveron";
import Image from "next/image";
import { AnimatedIconHandle, AnimatedIconProps } from "../ui/types";

const TufLogo = () => (
  <>
    {/* Light mode logos */}
    <div className="flex items-center dark:hidden">
      {/* Full screen */}
      <Image
        src={"/example/tuf/light-full-logo.png"}
        alt="logo"
        width={90}
        height={90}
        className="hidden md:block"
      />
      {/* Small screen */}
      <Image
        src={"/example/tuf/light-small-logo.png"}
        alt="logo"
        width={32}
        height={32}
        className="block md:hidden"
      />
    </div>
    {/* Dark mode logos */}
    <div className="hidden items-center dark:flex">
      {/* Full screen */}
      <Image
        src={"/example/tuf/logo.png"}
        alt="logo"
        width={90}
        height={90}
        className="hidden md:block"
      />
      {/* Small screen */}
      <Image
        src={"/example/tuf/small-logo.png"}
        alt="logo"
        width={32}
        height={32}
        className="block md:hidden"
      />
    </div>
  </>
);

const NavItem = ({
  icon: Icon,
  label,
  isAnimated,
  animationsEnabled,
}: {
  icon: ForwardRefExoticComponent<
    AnimatedIconProps & RefAttributes<AnimatedIconHandle>
  >;
  label: string;
  isAnimated?: boolean;
  animationsEnabled: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isAnimated && animationsEnabled) {
      ref.current?.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isAnimated && animationsEnabled) {
      ref.current?.stopAnimation();
    }
  };

  useEffect(() => {
    if (!isAnimated) {
      ref.current?.stopAnimation();
    }
  }, [isAnimated]);

  return (
    <motion.div
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1.5 transition-colors hover:border-zinc-400 md:border-0 dark:border-zinc-700/50 dark:bg-zinc-800/30 dark:hover:border-zinc-600"
    >
      <Icon
        ref={ref}
        size={16}
        color="currentColor"
        className={`transition-colors duration-200 ${isHovered ? "text-[#eb7134]" : "text-zinc-600 dark:text-zinc-300"}`}
        disableHover={true}
      />
      <span
        className={`text-xs font-medium transition-colors duration-200 ${
          isHovered ? "text-[#eb7134]" : "text-zinc-700 dark:text-zinc-200"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
};

const DropdownItem = ({
  icon: Icon,
  label,
  locked = false,
  hasChevron = false,
  isLogout = false,
  isAnimated = false,
  animationsEnabled = true,
}: {
  icon: ForwardRefExoticComponent<
    AnimatedIconProps & RefAttributes<AnimatedIconHandle>
  >;
  label: string;
  locked?: boolean;
  hasChevron?: boolean;
  isLogout?: boolean;
  isAnimated?: boolean;
  animationsEnabled?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isAnimated && animationsEnabled) {
      ref.current?.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isAnimated && animationsEnabled) {
      ref.current?.stopAnimation();
    }
  };

  return (
    <motion.div
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      className={`flex cursor-pointer items-center justify-between px-4 py-2 transition-colors duration-150 ${
        isHovered ? "bg-zinc-200/50 dark:bg-zinc-800/40" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          ref={ref}
          size={16}
          color={isLogout ? "#ef4444" : "currentColor"}
          className={`transition-colors duration-200 ${isLogout ? "text-red-500" : "text-zinc-600 dark:text-zinc-400"}`}
          disableHover={true}
        />
        <span
          className={`text-[13px] font-medium transition-colors duration-200 ${isLogout ? "text-red-500" : "text-zinc-800 dark:text-zinc-200"}`}
        >
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {locked && <LockIcon size={14} color="#eb7134" />}
        {hasChevron && (
          <RightCheveron
            size={12}
            className="text-zinc-500 dark:text-zinc-400"
          />
        )}
      </div>
    </motion.div>
  );
};

export default function TakeuforwardNavbar({
  isAnimated,
}: {
  isAnimated?: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use the prop directly with fallback to true
  const animationsEnabled = isAnimated ?? true;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex h-fit w-full items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 md:px-8 md:py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative z-10">
        <TufLogo />
      </div>

      <div className="hidden gap-1 md:flex">
        <NavItem
          icon={HomeIcon}
          label="Home"
          isAnimated
          animationsEnabled={animationsEnabled}
        />
        <NavItem
          icon={LayoutDashboardIcon}
          label="Plus"
          isAnimated
          animationsEnabled={animationsEnabled}
        />
        <NavItem
          icon={WalletIcon}
          label="Pricing"
          isAnimated
          animationsEnabled={animationsEnabled}
        />
      </div>

      <div className="relative z-10" ref={dropdownRef}>
        <motion.button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-controls="user-dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="group flex cursor-pointer items-center"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 transition-colors group-hover:border-zinc-300 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:group-hover:border-zinc-500">
            <UserIcon size={18} className="text-zinc-500 dark:text-zinc-400" />
          </div>
        </motion.button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              id="user-dropdown-menu"
              role="menu"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800/80 dark:bg-[#121214]"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 dark:border-zinc-700/50 dark:bg-zinc-800/50">
                  <UserIcon
                    size={20}
                    className="text-zinc-600 dark:text-zinc-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                    Abhijit Jha
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    abhijeetjha913@gmail.com
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1.5">
                <DropdownItem
                  icon={UserIcon}
                  label="My Profile"
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
                <DropdownItem
                  icon={GearIcon}
                  label="Account"
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
                <DropdownItem
                  icon={BugIcon}
                  label="Buganizer"
                  locked
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
                <DropdownItem
                  icon={UnorderedListIcon}
                  label="Sessions"
                  locked
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
                <DropdownItem
                  icon={QuestionMark}
                  label="Troubleshooting"
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
                <DropdownItem
                  icon={MoonIcon}
                  label="Light Mode"
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
                <DropdownItem
                  icon={FilledBellIcon}
                  label="Notification"
                  hasChevron
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
              </div>

              {/* Logout */}
              <div className="border-t border-zinc-200 py-1.5 dark:border-zinc-800/50">
                <DropdownItem
                  icon={LogoutIcon}
                  label="Logout"
                  isLogout
                  isAnimated
                  animationsEnabled={animationsEnabled}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
