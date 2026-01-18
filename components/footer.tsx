"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { LINKS, SPONSOR } from "@/constants";
import GithubIcon from "@/icons/github-icon";
import TwitterXIcon from "@/icons/twitter-x-icon";
import HeartIcon from "@/icons/heart-icon";
import RocketIcon from "@/icons/rocket-icon";
import StarIcon from "@/icons/star-icon";
import SparklesIcon from "@/icons/sparkles-icon";
import CoffeeIcon from "@/icons/coffee-icon";
import CodeIcon from "@/icons/code-icon";
import BulbSvg from "@/icons/bulb-svg";
import FlameIcon from "@/icons/flame-icon";
import LikeIcon from "@/icons/like-icon";
import BookmarkIcon from "@/icons/bookmark-icon";
import CameraIcon from "@/icons/camera-icon";
import MoonIcon from "@/icons/moon-icon";
import BellOffIcon from "@/icons/bell-off-icon";
import LockIcon from "@/icons/lock-icon";
import RefreshIcon from "@/icons/refresh-icon";
import GearIcon from "@/icons/gear-icon";
import MessageCircleIcon from "@/icons/message-circle-icon";
import SendIcon from "@/icons/send-icon";
import CheckedIcon from "@/icons/checked-icon";
import RequestIconModal from "./request-icon-modal";

const CryptoAddress = ({
  label,
  address,
}: {
  label: string;
  address: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="hover:text-foreground group flex cursor-pointer items-center gap-1.5 text-left text-xs transition-colors"
    >
      <span className="truncate">
        {label}: {address.slice(0, 20)}...
      </span>
      {copied && <CheckedIcon className="h-3 w-3 shrink-0 text-green-500" />}
    </button>
  );
};

const Footer = () => {
  const featuredIcons = [
    { Icon: HeartIcon, name: "heart", path: "heart-icon" },
    { Icon: RocketIcon, name: "rocket", path: "rocket-icon" },
    { Icon: StarIcon, name: "star", path: "star-icon" },
    { Icon: SparklesIcon, name: "sparkles", path: "sparkles-icon" },
    { Icon: CoffeeIcon, name: "coffee", path: "coffee-icon" },
    { Icon: CodeIcon, name: "code", path: "code-icon" },
    { Icon: BulbSvg, name: "bulb", path: "bulb-svg" },
    { Icon: FlameIcon, name: "flame", path: "flame-icon" },
    { Icon: LikeIcon, name: "like", path: "like-icon" },
    { Icon: BookmarkIcon, name: "bookmark", path: "bookmark-icon" },
    { Icon: CameraIcon, name: "camera", path: "camera-icon" },
    { Icon: MoonIcon, name: "moon", path: "moon-icon" },
    { Icon: BellOffIcon, name: "bell-off", path: "bell-off-icon" },
    { Icon: LockIcon, name: "lock", path: "lock-icon" },
    { Icon: RefreshIcon, name: "refresh", path: "refresh-icon" },
    { Icon: GearIcon, name: "gear", path: "gear-icon" },
    { Icon: MessageCircleIcon, name: "message", path: "message-circle-icon" },
    { Icon: SendIcon, name: "send", path: "send-icon" },
    { Icon: GithubIcon, name: "github", path: "github-icon" },
    { Icon: TwitterXIcon, name: "twitter", path: "twitter-x-icon" },
  ];

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-t"
    >
      <div className="w-full px-4 py-12 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/icons"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Icons
              </Link>
              <Link
                href="/sponsor"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sponsor
              </Link>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="text-muted-foreground hover:text-foreground text-left transition-colors"
              >
                Request an Icon
              </button>
              <Link
                href={LINKS.GITHUB}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href={LINKS.BAGS_FM}
                target="_blank"
                rel="noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              >
                $hover
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sponsor</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href={SPONSOR.buymeacoffee}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
              >
                <CoffeeIcon size={16} />
                Buy Me a Coffee
              </Link>
              <div className="text-muted-foreground space-y-2 text-sm">
                <p className="text-foreground font-medium">Crypto</p>
                <CryptoAddress label="BTC" address={SPONSOR.btc} />
                <CryptoAddress label="ETH" address={SPONSOR.eth} />
                <CryptoAddress label="SOL" address={SPONSOR.sol} />
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold">Featured Icons</h3>
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-10">
              {featuredIcons.map(({ Icon, name, path }) => (
                <Link
                  key={name}
                  href={`/icons/${path}`}
                  aria-label={`${name} icon`}
                  className="hover:bg-accent flex items-center justify-center rounded-lg border p-2 transition-colors"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <Icon size={20} />
                  </motion.span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted-foreground text-center text-sm md:text-left">
              Built by{" "}
              <Link
                href={LINKS.CREATOR}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground font-medium underline underline-offset-4 transition-colors"
              >
                Abhijit
              </Link>
              . The source code is available on{" "}
              <Link
                href={LINKS.GITHUB}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground font-medium underline underline-offset-4 transition-colors"
              >
                GitHub
              </Link>
              .
            </p>

            <div className="flex items-center gap-4">
              <Link
                href={LINKS.BAGS_FM}
                target="_blank"
                rel="noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                aria-label="$hover token"
              >
                $hover
              </Link>
              <Link
                href={LINKS.GITHUB}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </Link>
              <Link
                href={LINKS.TWITTER}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <TwitterXIcon size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <RequestIconModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </motion.footer>
  );
};

export default Footer;
