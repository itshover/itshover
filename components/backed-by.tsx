"use client";

import { motion } from "motion/react";
import Link from "next/link";
import SecondaryButton from "./ui/secondary-button";
import { useState } from "react";
import Image from "next/image";
import PenIcon from "./ui/pen-icon";

interface SponsorProps {
  name: string;
  badge?: string;
  badgeColor?: "default" | "success";
  description: string;
  logo?: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
  placeholderText?: string;
  editable?: boolean;
  imageClassName?: string;
}

const SponsorCard = ({ sponsor }: { sponsor: SponsorProps }) => {
  // we use local state here to handle the "live" editing experience
  // it feels way more snappy than waiting for a roundtrip
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(sponsor.name);
  const [description, setDescription] = useState(sponsor.description);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group border-border bg-background/50 hover:bg-background/80 relative flex flex-col overflow-hidden rounded-3xl border backdrop-blur-sm transition-all duration-500 ${
        isEditing ? "ring-primary/30 ring-4" : "hover:shadow-2xl hover:shadow-primary/5"
      }`}
    >
      {/* bit of a glow here, because they bring the light! */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="from-primary/10 absolute inset-0 bg-linear-to-br via-transparent to-transparent" />
      </div>

      {sponsor.editable && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-background/50 border-border/50 text-muted-foreground hover:text-foreground hover:bg-background absolute top-6 right-6 z-20 flex items-center justify-center rounded-full border p-2.5 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100"
          title="Edit this card"
        >
          <PenIcon size={18} className="h-4.5 w-4.5" />
        </button>
      )}

      {/* Top area / Image - making it feel like a gallery piece */}
      <div className={`border-border/50 relative flex h-64 items-center justify-center border-b p-12 transition-colors duration-500  ${sponsor.imageClassName || "bg-gray-200/80 dark:bg-white/20"} `}>
        {isEditing ? (
          <label className="border-primary/50 bg-primary/5 text-primary/80 hover:border-primary hover:bg-primary/10 relative z-10 flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed text-sm transition-all sm:h-56">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {logoPreview ? (
              <>
                <Image
                  src={logoPreview}
                  alt="Logo preview"
                  fill
                  className="object-contain p-8"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity backdrop-blur-[2px] hover:opacity-100">
                  <span className="font-medium text-white text-xs tracking-widest uppercase">Change Image</span>
                </div>
              </>
            ) : (
              <span className="text-xs font-light tracking-widest uppercase opacity-60">Upload Logo</span>
            )}
          </label>
        ) : logoPreview ? (
          <div className="relative z-10 h-48 w-full sm:h-56">
            <Image
              src={logoPreview}
              alt={`${name} logo`}
              fill
              className="object-contain p-8"
            />
          </div>
        ) : sponsor.logo ? (
          <div className="text-foreground z-10 transition-transform duration-500 group-hover:scale-110">{sponsor.logo}</div>
        ) : (
          <div className="border-border/60 text-muted-foreground/40 group-hover:border-border group-hover:text-muted-foreground/60 z-10 flex h-48 w-full items-center justify-center rounded-2xl border border-dashed text-xs font-light tracking-widest uppercase transition-all duration-500 sm:h-56">
            {sponsor.placeholderText || "your image here"}
          </div>
        )}
      </div>

      {/* Content area - keeping it airy with serif fonts and light weights */}
      <div className="relative z-10 flex w-full flex-col p-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          {isEditing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-primary/50 focus:border-primary placeholder:text-muted-foreground/50 max-w-full border-b bg-transparent py-1 text-3xl font-light tracking-tight lowercase outline-none font-serif italic"
              placeholder="company name"
              autoFocus
            />
          ) : (
            <h3 className="text-3xl font-light tracking-tight lowercase font-serif italic">
              {name || "company name"}
            </h3>
          )}

          {sponsor.badge && (
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                sponsor.badgeColor === "success"
                  ? "border-green-500/20 bg-green-500/10 text-green-500"
                  : "bg-muted text-muted-foreground border-border/50"
              }`}
            >
              {sponsor.badge}
            </span>
          )}
        </div>

        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-muted-foreground/80 border-primary/50 focus:border-primary placeholder:text-muted-foreground/50 mb-8 h-32 w-full resize-none rounded-xl border bg-transparent p-4 text-[15px] leading-relaxed font-light lowercase outline-none"
            placeholder="write a short description about how your company supports developers or open source..."
          />
        ) : (
          <p className="text-muted-foreground/70 mb-10 line-clamp-4 text-[15px] leading-relaxed font-light lowercase">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          {sponsor.action && (
            <div className={isEditing ? "pointer-events-none opacity-50" : ""}>
              <Link
                href={sponsor.action.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SecondaryButton className="text-sm lowercase">
                  {sponsor.action.label}
                </SecondaryButton>
              </Link>
            </div>
          )}

          {isEditing && (
            <SecondaryButton
              className="border-primary/50 text-primary hover:bg-primary/10 ml-auto text-xs font-bold tracking-widest uppercase transition-all"
              onClick={() => setIsEditing(false)}
            >
              done editing
            </SecondaryButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function BackedBy() {
  const sponsors: SponsorProps[] = [
    {
      name: "vercel",
      badge: "open source program",
      badgeColor: "default",
      imageClassName: "bg-black dark:bg-black",
      description:
        "providing the robust infrastructure that keeps its hover fast, reliable, and accessible to creators worldwide. vercel enables seamless deployment with zero configuration.",
      logo: (
        <svg
          fill="currentColor"
          viewBox="0 0 512 512"
          width="64"
          height="64"
          className="text-white hover:group:text-black"
        >
          <path d="M256 48l240 416H16z" />
        </svg>
      ),
    },
    {
      name: "your company here",
      description:
        "join us in building the future of interactive icons. sponsor its hover to get your brand featured here, reaching thousands of developers and designers.",
      placeholderText: "your logo here",
      editable: true,
      action: {
        label: "contact us",
        href: "https://x.com/abhijitwt",
      },
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl  px-6 py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-24 flex flex-col items-center space-y-6 text-center"
      >
        <h2 className="text-5xl font-light tracking-tighter font-serif italic md:text-7xl">
          Backed by
        </h2>
          <p className="max-w-2xl text-muted-foreground/80 text-sm">
         <span className="text-primary font-medium">Its hover</span> is built on the shoulders of giants. We&apos;re grateful for the tools and people that make this possible.
        </p>
      </motion.div>

      {/* using a responsive grid that gives cards room to breathe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mx-auto">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <SponsorCard sponsor={sponsor} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
