"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import HistoryCircleIcon from "@/icons/history-circle-icon";
import TwitterXIcon from "@/icons/twitter-x-icon";
import LinkIcon from "@/icons/link-icon";
import ExternalLinkIcon from "@/icons/external-link-icon";
import { Tweet } from "react-tweet";
import SlidersHorizontalIcon from "@/icons/sliders-horizontal-icon";
import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";

export type TimelineEntryType = "text" | "tweet" | "image" | "video" | "link";
export type TimelineCategory =
  | "all"
  | "release"
  | "milestone"
  | "social"
  | "bags-hackathon";

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: TimelineEntryType;
  content: string; // tweet ID, image URL, video ID, or link URL
  link?: string;
  image?: string;
  category: TimelineCategory | TimelineCategory[];
  action?: {
    label: string;
    href: string;
  };
}

const TimelineItem = ({
  entry,
  isLast,
}: {
  entry: TimelineEntry;
  isLast: boolean;
}) => {
  const renderContent = () => {
    switch (entry.type) {
      case "tweet":
        return (
          <div className="bg-muted/20 hover:bg-muted/30 flex flex-col gap-2 rounded-xl border p-4 transition-colors">
            <div className="text-muted-foreground flex items-center gap-2">
              <TwitterXIcon size={16} />
              <span className="text-xs font-medium lowercase">tweet</span>
            </div>
            <div className="border-border/50 mt-2 overflow-hidden rounded-xl border bg-transparent shadow-sm">
              <Tweet id={entry.content} />
            </div>
          </div>
        );
      case "video":
        return (
          <div className="aspect-video overflow-hidden rounded-xl border bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${entry.content}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      case "image":
        return (
          <div className="flex flex-col gap-2">
            <div className="bg-muted/20 overflow-hidden rounded-xl border">
              <Image
                src={entry.content}
                alt={entry.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "auto" }}
                className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {entry.description && (
              <p className="text-muted-foreground text-sm">
                {entry.description}
              </p>
            )}
          </div>
        );
      case "link":
        return (
          <div className="bg-muted/20 hover:bg-muted/30 flex flex-col gap-2 rounded-xl border p-4 font-sans transition-colors">
            <div className="text-muted-foreground flex items-center gap-2">
              <LinkIcon size={16} />
              <span className="text-xs font-medium lowercase">link</span>
            </div>
            <h4 className="text-sm font-semibold lowercase">{entry.title}</h4>
            <p className="line-clamp-2 text-sm">{entry.description}</p>
            <a
              href={entry.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center gap-1 text-xs hover:underline"
            >
              {entry.content} <ExternalLinkIcon size={12} />
            </a>
          </div>
        );
      default:
        return entry.description ? (
          <p className="text-muted-foreground text-sm">{entry.description}</p>
        ) : null;
    }
  };

  return (
    <div className="relative pb-12 pl-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="bg-border absolute top-0 bottom-0 left-[11px] w-[2px]" />
      )}

      {/* Timeline dot */}
      <div className="bg-background text-primary ring-background absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border shadow-sm ring-4">
        <div className="h-2 w-2 rounded-full bg-current" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <span className="text-primary/60 text-xs font-medium">
            {entry.date}
          </span>
          <h3 className="text-foreground text-lg font-bold tracking-tight lowercase">
            {entry.title}
          </h3>
        </div>
        <div className="mt-1">{renderContent()}</div>
        {entry.image && (
          <div className="border-border/50 bg-muted/30 mt-4 mb-2 overflow-hidden rounded-2xl border">
            <Image
              src={entry.image}
              alt={entry.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "auto" }}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        {entry.action && (
          <div className="mt-2">
            <a
              href={entry.action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium lowercase transition-colors focus-visible:ring-1 focus-visible:outline-none"
            >
              {entry.action.label}
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const Timeline = ({ entries }: { entries: TimelineEntry[] }) => {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState<TimelineCategory>("all");
  const [sortOrder, setSortOrder] = React.useState<"newest" | "oldest">(
    "newest",
  );
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "failed to subscribe");

      setStatus("success");
      setEmail("");
      setMessage("welcome to the loop!");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "something went wrong.");
    }
  };

  const filteredEntries = React.useMemo(() => {
    const result = entries
      .map((entry, index) => ({ ...entry, originalIndex: index }))
      .filter((entry) => {
        const matchesCategory =
          selectedCategory === "all" ||
          (Array.isArray(entry.category)
            ? entry.category.includes(selectedCategory)
            : entry.category === selectedCategory);
        const searchLower = search.toLowerCase();
        const matchesSearch =
          entry.title.toLowerCase().includes(searchLower) ||
          entry.date.toLowerCase().includes(searchLower) ||
          (entry.description &&
            entry.description.toLowerCase().includes(searchLower));

        return matchesCategory && matchesSearch;
      });

    return result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) {
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      }
      // If same date, use original index to maintain order
      return sortOrder === "newest"
        ? b.originalIndex - a.originalIndex
        : a.originalIndex - b.originalIndex;
    });
  }, [entries, search, sortOrder, selectedCategory]);

  const categories: { label: string; value: TimelineCategory }[] = [
    { label: "all", value: "all" },
    { label: "bags hackathon", value: "bags-hackathon" },
    { label: "releases", value: "release" },
    { label: "milestones", value: "milestone" },
    { label: "social", value: "social" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-12 flex flex-col items-center gap-2 text-center">
        <div className="bg-primary/10 text-primary flex items-center justify-center rounded-full p-3">
          <HistoryCircleIcon size={32} />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
          timeline
        </h1>
        <p className="text-muted-foreground max-w-[600px] lowercase sm:text-lg">
          follow the journey of itshover. see how we evolve.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchInput
            placeholder="search milestones..."
            value={search}
            onChange={setSearch}
            className="h-10 lowercase"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="border-border/50 bg-muted/20 hover:bg-muted/30 h-[50px] gap-2 rounded-xl lowercase sm:h-auto"
        >
          <SlidersHorizontalIcon size={16} />
          {sortOrder === "newest" ? "newest first" : "oldest first"}
        </Button>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2 overflow-x-auto pb-2 sm:overflow-visible sm:pb-0">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={cn(
              "h-8 rounded-full border px-4 text-xs font-medium whitespace-nowrap lowercase transition-all",
              selectedCategory === cat.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/20 text-muted-foreground border-border/50 hover:bg-muted/30",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              isLast={index === filteredEntries.length - 1}
            />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground lowercase">
              no milestones found matching your criteria.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="text-primary mt-2 lowercase"
            >
              clear all filters
            </Button>
          </div>
        )}

        {/* Newsletter Loop Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-primary/20 bg-background/80 relative z-10 mt-12 rounded-3xl border p-8 text-center backdrop-blur-sm"
        >
          <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <HistoryCircleIcon size={24} />
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight lowercase">
            stay in the loop
          </h2>
          <p className="text-muted-foreground mb-6 lowercase">
            get major milestones and release notes delivered to your inbox.
          </p>
          <form className="mx-auto flex max-w-sm gap-2" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border/50 bg-background focus:ring-primary/50 h-11 flex-1 rounded-xl border px-4 text-sm focus:ring-2 focus:outline-none"
              required
              disabled={status === "loading" || status === "success"}
            />
            <Button
              type="submit"
              className="h-11 rounded-xl lowercase"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "..." : "subscribe"}
            </Button>
          </form>
          {message && (
            <p
              className={cn(
                "animate-in fade-in slide-in-from-top-1 mt-4 text-xs lowercase",
                status === "success"
                  ? "text-primary font-medium"
                  : "text-destructive",
              )}
            >
              {message}
            </p>
          )}
          <p className="text-muted-foreground mt-4 text-[10px] tracking-widest uppercase">
            no spam. just momentum.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
