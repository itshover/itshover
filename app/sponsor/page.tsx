"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MessageSquare,
  Coffee,
  QrCode,
  Copy,
  Check,
  Star,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const SponsorPage = () => {
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
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="" target="_blank">
                  <MessageSquare className="h-4 w-4" />
                  Leave Feedback
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="" target="_blank">
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SponsorCard
            title="Buy Me a Coffee"
            description="Support with a small donation."
            icon={<Coffee className="h-6 w-6 text-yellow-500" />}
            delay={0.1}
          >
            <Button
              asChild
              className="w-full bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90"
            >
              <Link href="" target="_blank">
                Buy Me a Coffee
              </Link>
            </Button>
          </SponsorCard>

          <SponsorCard
            title="UPI"
            description="Direct transfer via UPI."
            icon={<QrCode className="h-6 w-6 text-blue-500" />}
            delay={0.2}
          >
            <CopyField label="UPI ID" value="" />
          </SponsorCard>

          {/* Solana */}
          {/* <SponsorCard
                        title="Solana"
                        description="Support via SOL."
                        icon={<Wallet className="h-6 w-6 text-purple-500" />}
                        delay={0.3}
                    >
                        <CopyField label="SOL Address" value="YourSolanaAddressHere" />
                    </SponsorCard> */}

          {/* Ethereum */}
          {/* <SponsorCard
                        title="Ethereum"
                        description="Support via ETH."
                        icon={<Wallet className="h-6 w-6 text-indigo-500" />}
                        delay={0.4}
                    >
                        <CopyField label="ETH Address" value="0xYourEthereumAddressHere" />
                    </SponsorCard> */}
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMO_SPONSORS.map((sponsor, index) => (
                <div
                  key={index}
                  className="bg-card/50 flex items-center gap-4 rounded-xl border p-4 backdrop-blur-sm"
                >
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                    {sponsor.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{sponsor.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {sponsor.message}
                    </div>
                  </div>
                  <div className="ml-auto font-mono text-sm font-medium text-green-500">
                    {sponsor.amount}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-card/50 mt-16 rounded-2xl border p-8 text-center backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary/10 rounded-full p-4">
              <Star className="text-primary h-8 w-8 fill-current" />
            </div>
            <h2 className="text-2xl font-bold">Star us on GitHub</h2>
            <p className="text-muted-foreground max-w-lg">
              If you like this project, please give it a star on GitHub. It
              helps more people discover the project and motivates me to build
              more!
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="" target="_blank">
                <Github className="h-4 w-4" />
                Star Repository
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SponsorCard = ({
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
      className="bg-card hover:border-primary/50 flex flex-col justify-between rounded-xl border p-6 shadow-sm transition-colors"
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
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <div className="bg-muted/50 flex items-center justify-between rounded-md border px-3 py-2">
        <code className="truncate font-mono text-sm">{value}</code>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground ml-2 transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
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

const DEMO_SPONSORS = [
  {
    name: "Alex Johnson",
    amount: "$50",
    message: "Great work! Keep it up.",
  },
  {
    name: "Sarah Smith",
    amount: "$25",
    message: "Love these icons!",
  },
  {
    name: "Mike Brown",
    amount: "$10",
    message: "Thanks for open sourcing.",
  },
];

export default SponsorPage;
