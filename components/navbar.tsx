"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { ModeToggle } from "./ui/toggle-button";
import { Kbd } from "@/components/ui/kbd";
import GithubStars from "./github-stars";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-black text-sm text-white antialiased md:h-6 md:w-6">
              <div className="absolute inset-x-0 -top-10 h-10 w-full rounded-full bg-white/20 blur-xl"></div>
              <div className="relative z-20 text-sm text-emerald-500">
                {/* Logo placeholder or image */}
                <div className="h-4 w-4 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-foreground font-sans">Brand Name</h1>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
          <Link
            className="hover:text-foreground/80 text-muted-foreground transition-colors"
            href="/icons"
          >
            Icons
          </Link>
        </nav>

        <div className="hidden flex-1 items-center justify-end gap-2 sm:gap-2 md:flex md:justify-end">
          <GithubStars />
          <Link
            target="__blank"
            className="hover:text-foreground/80 text-foreground/60 mr-3 text-sm font-medium transition-colors"
            href="https://discord.gg/ftZbQvCdN7"
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
              className="h-4 w-4 text-neutral-500 dark:text-neutral-500"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </Link>
          <Link
            target="__blank"
            className="hover:text-foreground/80 text-foreground/60 text-sm font-medium transition-colors"
            href="https://x.com/abhijitwt"
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
              className="h-4 w-4 text-neutral-500 dark:text-neutral-500"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </Link>

          <ModeToggle />

          <button className="text-muted-foreground dark:bg-muted/20 relative flex w-fit items-center justify-start rounded-xl border border-transparent bg-white px-4 py-2 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/20">
            <Search className="h-4 w-4 text-neutral-500" />
            <span className="hover:text-foreground/80 text-foreground/60 rex pr-4 pl-2 text-xs font-medium transition-colors sm:text-sm">
              Search <span className="hidden xl:inline-block">Components</span>
            </span>
            <Kbd>
              <span className="text-xs">⌘</span>K
            </Kbd>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <button
            className="ml-2 p-2 text-neutral-600 focus:outline-none dark:text-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="bg-background absolute top-16 left-0 z-50 w-full border-b p-4 shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href="/components"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              target="_blank"
              href="https://pro.aceternity.com/templates"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href="/showcase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Showcase
            </Link>
            <Link
              className="hover:text-foreground/80 text-muted-foreground text-sm font-medium transition-colors"
              href="/icons"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Icons
            </Link>
            <div className="flex items-center space-x-4 pt-4">
              <Link
                target="__blank"
                className="hover:text-foreground/80 text-foreground/60 text-sm font-medium transition-colors"
                href="/playground"
              >
                Playground
              </Link>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
