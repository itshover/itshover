"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { LINKS, SPONSOR } from "@/constants";
import QrCodeIcon from "@/icons/qrcode-icon";
import GithubIcon from "@/icons/github-icon";
import AtSignIcon from "@/icons/at-sign-icon";
import CheckedIcon from "@/icons/checked-icon";
import CopyIcon from "@/icons/copy-icon";
import XIcon from "@/icons/x-icon";
import CoffeeIcon from "@/icons/coffee-icon";
import MessageCircleIcon from "@/icons/message-circle-icon";
import CurrencyBitcoinIcon from "@/icons/currency-bitcoin-icon";
import CurrencyEthereumIcon from "@/icons/currency-ethereum-icon";
import Image from "next/image";
import { ISponsor } from "@/models/sponsor";
import { SponsorCard as SponsorListCard } from "@/components/sponsor-card";

const DonationCard = ({
  title,
  description,
  icon,
  children,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card hover:border-primary/50 flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border p-6 shadow-sm transition-colors"
    >
      <div className="mb-4">
        <div className="mb-4 inline-flex rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="mt-auto pt-4">{children}</div>
    </motion.div>
  );
};

const CopyField = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-1.5">
      <span className="text-muted-foreground block text-xs font-medium wrap-break-word">
        {label}
      </span>
      <div className="bg-muted/50 flex items-center gap-2 rounded-md border px-3 py-2">
        <code className="min-w-0 flex-1 truncate font-mono text-xs sm:text-sm">
          {value}
        </code>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground flex shrink-0 justify-center text-center transition-colors"
              >
                {copied ? (
                  <CheckedIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default function SponsorContent({
  sponsors = [],
}: {
  sponsors?: ISponsor[];
}) {
  const [showQrCode, setShowQrCode] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Support the Project
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
              This project is completely open-sourced and free to use. If you
              find it valuable, consider sponsoring to help keep it running and
              inspire future updates. Alternatively, your feedback is incredibly
              valuable!
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
                <Link href={LINKS.CREATOR} target="_blank">
                  <MessageCircleIcon className="h-4 w-4" />
                  Leave Feedback
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto"
              >
                <Link href={LINKS.GITHUB} target="_blank">
                  <GithubIcon className="h-4 w-4" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid min-w-0 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DonationCard
            title="Buy Me a Coffee"
            description="Support with a small donation."
            icon={<CoffeeIcon className="h-6 w-6 text-yellow-500" />}
            delay={0.1}
          >
            <Button
              asChild
              className="w-full bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90"
            >
              <Link href={SPONSOR.buymeacoffee} target="_blank">
                Buy Me a Coffee
              </Link>
            </Button>
          </DonationCard>

          <div className="relative">
            <DonationCard
              title="UPI"
              description="Direct transfer via UPI."
              icon={<AtSignIcon className="h-6 w-6 text-blue-500" />}
              delay={0.2}
            >
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setShowQrCode(true)}
                        className="text-muted-foreground hover:text-primary absolute top-6 right-6 transition-colors"
                      >
                        <QrCodeIcon className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>See QR Code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <CopyField label="UPI ID" value={SPONSOR.upiId} />
              </>
            </DonationCard>
          </div>

          <DonationCard
            title="Bitcoin (BTC)"
            description="Support via Bitcoin."
            icon={<CurrencyBitcoinIcon className="h-6 w-6 text-orange-500" />}
            delay={0.3}
          >
            <CopyField label="BTC Address" value={SPONSOR.btc} />
          </DonationCard>

          <DonationCard
            title="Ethereum (ETH)"
            description="Support via Ethereum."
            icon={<CurrencyEthereumIcon className="h-6 w-6 text-purple-500" />}
            delay={0.4}
          >
            <CopyField label="ETH Address" value={SPONSOR.eth} />
          </DonationCard>

          <DonationCard
            title="Solana (SOL)"
            description="Support via Solana."
            icon={<AtSignIcon className="h-6 w-6 text-green-500" />}
            delay={0.5}
          >
            <CopyField label="SOL Address" value={SPONSOR.sol} />
          </DonationCard>
        </div>

        <div className="mt-24 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Recent Sponsors
            </h2>
            {sponsors.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sponsors.map((sponsor) => (
                  <SponsorListCard
                    key={sponsor._id as string}
                    sponsor={sponsor}
                  />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center justify-center">
                No sponsors yet
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-card/50 mt-16 rounded-2xl border p-8 text-center backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Star us on GitHub</h2>
            <p className="text-muted-foreground max-w-lg">
              If you like this project, please give it a star on GitHub. It
              helps more people discover the project and motivates me to build
              more!
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href={LINKS.GITHUB} target="_blank">
                <GithubIcon className="h-4 w-4" />
                Star Repository
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* QR Code Modal */}
        {showQrCode && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setShowQrCode(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-card relative w-full max-w-md rounded-2xl border p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQrCode(false)}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-4 transition-colors"
              >
                <XIcon className="h-5 w-5" />
              </button>
              <h3 className="mb-4 text-xl font-semibold">UPI QR Code</h3>
              <div className="rounded-lg bg-white p-4">
                <Image
                  src={SPONSOR.qrCode}
                  alt="UPI QR Code"
                  width={200}
                  height={200}
                  className="h-auto w-full"
                />
              </div>
              <p className="text-muted-foreground mt-4 text-center text-sm">
                Scan this QR code to make a UPI payment
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
