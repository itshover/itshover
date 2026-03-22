"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ModeToggle } from "./ui/toggle-button";
import { Kbd } from "@/components/ui/kbd";
import GithubStars from "./github-stars";
import GithubIcon from "@/icons/github-icon";
import TwitterXIcon from "@/icons/twitter-x-icon";
import MagnifierIcon from "@/icons/magnifier-icon";
import { useCommandMenu } from "./command-menu-context";
import { LINKS } from "@/constants";
import LayersIcon from "@/icons/layers-icon";
import AlignCenterIcon from "@/icons/align-center-icon";
import XIcon from "@/icons/x-icon";
import { isMac, cn } from "@/lib/utils";
import { TOKEN } from "@/constants";
import BrandBagsFmIcon from "@/icons/brand-bags-fm-icon";
import CopyIcon from "@/icons/copy-icon";
import ExternalLinkIcon from "@/icons/external-link-icon";
import ChartLineIcon from "@/icons/chart-line-icon";
import CheckedIcon from "@/icons/checked-icon";
import { AnimatePresence, motion } from "motion/react";
import type { AnimatedIconHandle } from "@/icons/types";
import UsersIcon from "@/icons/users-icon";
import RocketIcon from "@/icons/rocket-icon";
import DownChevron from "@/icons/down-chevron";
import HistoryCircleIcon from "@/icons/history-circle-icon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bagsDropdownOpen, setBagsDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [copiedCA, setCopiedCA] = useState(false);
  const bagsIconRef = useRef<AnimatedIconHandle>(null);
  const mobileBagsIconRef = useRef<AnimatedIconHandle>(null);
  const productsIconRef = useRef<AnimatedIconHandle>(null);
  const holdersIconRef = useRef<AnimatedIconHandle>(null);
  const toolsIconRef = useRef<AnimatedIconHandle>(null);
  const copyIconRef = useRef<AnimatedIconHandle>(null);
  const bagsLinkIconRef = useRef<AnimatedIconHandle>(null);
  const dexIconRef = useRef<AnimatedIconHandle>(null);
  const { toggle: toggleCommandMenu } = useCommandMenu();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCopyCA = async () => {
    await navigator.clipboard.writeText(TOKEN.CA);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  return (
    <nav className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 flex w-full justify-between border-b p-2 backdrop-blur">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-8">
        <div className="flex items-center">
          <Link
            className="mr-10 flex items-center justify-center space-x-2 py-6 text-center text-2xl font-bold text-neutral-600 selection:bg-emerald-500 dark:text-gray-100"
            href="/"
          >
            {/* <Image src="/logo.png" alt="Logo" width={24} height={24} className=""/> */}
            <LayersIcon className="text-primary" />
            <div className="flex flex-col">
              <h1 className="text-foreground font-sans">
                <span className="text-primary">its</span>hover
              </h1>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
          <Link
            className="hover:text-foreground/80 text-muted-foreground transition-colors"
            href="/icons"
          >
            icons
          </Link>
          <div className="relative">
            <button
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              onMouseEnter={() => productsIconRef.current?.startAnimation()}
              onMouseLeave={() => productsIconRef.current?.stopAnimation()}
              onBlur={() =>
                setTimeout(() => setProductsDropdownOpen(false), 200)
              }
              className={cn(
                "hover:text-foreground/80 text-muted-foreground flex items-center gap-1 transition-colors",
                productsDropdownOpen && "text-foreground",
              )}
            >
              products
              <DownChevron
                ref={productsIconRef}
                size={14}
                className={cn(
                  "transition-transform duration-200",
                  productsDropdownOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {productsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="bg-background absolute top-full left-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border p-1 shadow-xl"
                >
                  <Link
                    href={LINKS.HOLDERS}
                    target="_blank"
                    onMouseEnter={() =>
                      holdersIconRef.current?.startAnimation()
                    }
                    onMouseLeave={() => holdersIconRef.current?.stopAnimation()}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                  >
                    <UsersIcon
                      ref={holdersIconRef}
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span>Holders</span>
                  </Link>
                  <Link
                    href={LINKS.TOOLS}
                    target="_blank"
                    onMouseEnter={() => toolsIconRef.current?.startAnimation()}
                    onMouseLeave={() => toolsIconRef.current?.stopAnimation()}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                  >
                    <RocketIcon
                      ref={toolsIconRef}
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span>Tools</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            className="hover:text-foreground/80 text-muted-foreground transition-colors"
            href={LINKS.TIMELINE}
          >
            timeline
          </Link>
          <Link
            className="hover:text-foreground/80 text-muted-foreground transition-colors"
            href="/example"
          >
            example
          </Link>
        </nav>

        <div className="hidden flex-1 items-center justify-end gap-2 sm:gap-2 md:flex md:justify-end">
          <div className="relative mr-1">
            <button
              onClick={() => setBagsDropdownOpen(!bagsDropdownOpen)}
              onMouseEnter={() => bagsIconRef.current?.startAnimation()}
              onMouseLeave={() => bagsIconRef.current?.stopAnimation()}
              onBlur={() => setTimeout(() => setBagsDropdownOpen(false), 200)}
              className={cn(
                "hover:text-foreground/80 text-foreground/60 flex items-center justify-center p-2 text-sm font-medium transition-colors",
                bagsDropdownOpen && "text-foreground",
              )}
            >
              <BrandBagsFmIcon ref={bagsIconRef} size={20} />
            </button>

            <AnimatePresence>
              {bagsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="bg-background absolute top-full right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border p-1 shadow-xl"
                >
                  <button
                    onClick={handleCopyCA}
                    onMouseEnter={() => copyIconRef.current?.startAnimation()}
                    onMouseLeave={() => copyIconRef.current?.stopAnimation()}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                  >
                    <CopyIcon
                      ref={copyIconRef}
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span>Copy CA</span>
                    {copiedCA && (
                      <CheckedIcon
                        size={12}
                        className="ml-auto text-green-500"
                      />
                    )}
                  </button>
                  <Link
                    href={LINKS.BAGS}
                    target="_blank"
                    onMouseEnter={() =>
                      bagsLinkIconRef.current?.startAnimation()
                    }
                    onMouseLeave={() =>
                      bagsLinkIconRef.current?.stopAnimation()
                    }
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                  >
                    <ExternalLinkIcon
                      ref={bagsLinkIconRef}
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span>View on Bags</span>
                  </Link>
                  <Link
                    href={LINKS.DEXSCREENER}
                    target="_blank"
                    onMouseEnter={() => dexIconRef.current?.startAnimation()}
                    onMouseLeave={() => dexIconRef.current?.stopAnimation()}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                  >
                    <ChartLineIcon
                      ref={dexIconRef}
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span>DexScreener</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <GithubStars />
          <Link
            target="__blank"
            className="hover:text-foreground/80 text-foreground/60 mr-1 flex items-center justify-center text-sm font-medium transition-colors"
            href={LINKS.TWITTER}
          >
            <TwitterXIcon className="h-4 w-4" />
          </Link>
          <Link
            target="__blank"
            className="hover:text-foreground/80 text-foreground/60 mr-1 flex items-center justify-center text-sm font-medium transition-colors"
            href={LINKS.GITHUB}
          >
            <GithubIcon size={18} />
          </Link>

          <ModeToggle />

          <button
            onClick={toggleCommandMenu}
            className="text-muted-foreground dark:bg-muted/20 relative flex w-fit cursor-pointer items-center justify-start rounded-xl border border-transparent bg-white px-4 py-2 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/20"
          >
            <div className="flex items-center">
              <MagnifierIcon className="text-neutral-500" size={18} />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search..."
              className="hover:text-foreground/80 text-foreground/60 w-24 cursor-pointer bg-transparent pr-4 pl-2 text-xs font-medium transition-colors outline-none sm:text-sm xl:w-32"
            />
            <Kbd>
              <span className="text-xs">{isMac() ? "⌘" : "Ctrl+"}</span>K
            </Kbd>
          </button>
        </div>

        <div className="flex items-center md:hidden">
          <ModeToggle />
          <button
            className="ml-2 p-2 text-neutral-600 focus:outline-none dark:text-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <AlignCenterIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="bg-background absolute top-16 left-0 z-50 w-full border-b p-4 shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href="/icons"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Icons
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href={LINKS.HOLDERS}
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Holders
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href={LINKS.TOOLS}
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href={LINKS.TIMELINE}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Timeline
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href="/example"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Example
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleCommandMenu();
              }}
              className="text-muted-foreground flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <MagnifierIcon className="text-neutral-500" size={16} />
                <span>Search...</span>
              </div>
            </button>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-4">
                <Link
                  href={LINKS.BAGS}
                  target="_blank"
                  onMouseEnter={() =>
                    mobileBagsIconRef.current?.startAnimation()
                  }
                  onMouseLeave={() =>
                    mobileBagsIconRef.current?.stopAnimation()
                  }
                  className="hover:text-foreground/80 text-foreground/60 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BrandBagsFmIcon ref={mobileBagsIconRef} size={20} />
                </Link>
                <Link
                  target="_blank"
                  className="hover:text-foreground/80 text-foreground/60 text-sm font-medium transition-colors"
                  href={LINKS.GITHUB}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <GithubIcon size={20} />
                </Link>
                <Link
                  target="_blank"
                  className="hover:text-foreground/80 text-foreground/60 text-sm font-medium transition-colors"
                  href={LINKS.TWITTER}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <TwitterXIcon size={20} />
                </Link>
                <div className="mx-1 h-4 w-px bg-white/10" />
                <button
                  onClick={handleCopyCA}
                  className="hover:text-foreground/80 text-foreground/60 flex items-center gap-2 text-xs font-medium transition-colors"
                >
                  <span className="font-mono">
                    {TOKEN.CA.slice(0, 4)}...{TOKEN.CA.slice(-4)}
                  </span>
                  {copiedCA ? (
                    <CheckedIcon size={14} className="text-green-500" />
                  ) : (
                    <CopyIcon size={14} />
                  )}
                </button>
              </div>
              <GithubStars />
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
