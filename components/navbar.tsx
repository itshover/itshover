"use client";
import { useState } from "react";
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
import { isMac } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggle: toggleCommandMenu } = useCommandMenu();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <Link
            className="hover:text-foreground/80 text-muted-foreground transition-colors"
            href="/sponsor"
          >
            sponsor
          </Link>
          <Link
            className="hover:text-foreground/80 text-muted-foreground transition-colors"
            href="/example"
          >
            example
          </Link>
          <Link
            className="bg-primary hover:bg-primary/90 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
            href={LINKS.BAGS_FM}
            target="_blank"
            rel="noreferrer"
          >
            $hover
          </Link>
        </nav>

        <div className="hidden flex-1 items-center justify-end gap-2 sm:gap-2 md:flex md:justify-end">
          <GithubStars />
          <Link
            target="__blank"
            className="hover:text-foreground/80 text-foreground/60 mr-3 flex items-center justify-center text-sm font-medium transition-colors"
            href={LINKS.TWITTER}
          >
            <TwitterXIcon className="h-4 w-4" />
          </Link>
          <Link
            target="__blank"
            className="hover:text-foreground/80 text-foreground/60 flex items-center justify-center text-sm font-medium transition-colors"
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
              placeholder="Search Components..."
              onClick={toggleCommandMenu}
              onFocus={toggleCommandMenu}
              className="hover:text-foreground/80 text-foreground/60 w-32 cursor-pointer bg-transparent pr-4 pl-2 text-xs font-medium transition-colors outline-none sm:text-sm xl:w-40"
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
              href="/sponsor"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sponsor
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href="/example"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Example
            </Link>
            <Link
              className="bg-primary hover:bg-primary/90 inline-flex w-fit items-center rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              href={LINKS.BAGS_FM}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              $hover
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
