import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CommandMenu } from "@/components/cmdk";
import { CommandMenuProvider } from "@/components/command-menu-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LINKS } from "@/constants";
import { Analytics } from "@vercel/analytics/react";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { GithubStarsProvider } from "@/components/github-stars-context";
import ExternalLinkIcon from "@/icons/external-link-icon";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(LINKS.SITE_URL),
  title: {
    default: "Its Hover",
    template: "%s",
  },
  description: "Animated icons that move with intent.",
  openGraph: {
    title: "Its Hover",
    description: "Animated icons that move with intent.",
    url: LINKS.SITE_URL,
    siteName: "Its Hover",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Its Hover",
    description: "Animated icons that move with intent.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GithubStarsProvider>
            <CommandMenuProvider>
              <TooltipProvider>
                <CommandMenu />
                <StickyBanner
                  className="bg-primary text-primary-foreground h-auto min-h-8 py-2"
                  hideOnScroll
                >
                  <Link
                    href="https://evilcharts.com/?ref=itshover.com"
                    target="_blank"
                    className="flex items-center justify-center gap-2 text-center text-sm font-medium hover:underline"
                  >
                    <span>
                      A Beautiful & Animated Chart UI Website built on top of
                      recharts.
                    </span>
                    <ExternalLinkIcon className="h-4 w-4 shrink-0" />
                  </Link>
                </StickyBanner>
                <Navbar />

                {children}
                <Footer />
              </TooltipProvider>
            </CommandMenuProvider>
          </GithubStarsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
