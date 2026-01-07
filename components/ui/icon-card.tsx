"use client";

import React from "react";
import Link from "next/link";
import type { AnimatedIconProps, AnimatedIconHandle } from "@/icons/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getIconsContent } from "@/actions/get-icons-content";
import SimpleCheckedIcon from "@/icons/simple-checked-icon";
import CopyIcon from "@/icons/copy-icon";
import TerminalIcon from "@/icons/terminal-icon";
import { LINKS } from "@/constants";
import PlayerIcon from "@/icons/player-icon";

const IconCard = ({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ForwardRefExoticComponent<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
}) => {
  const iconRef = React.useRef<AnimatedIconHandle>(null);

  const [isCopied, setIsCopied] = React.useState(false);
  const [isCommandCopied, setIsCommandCopied] = React.useState(false);

  const copyFileToClipboard = async () => {
    const content = await getIconsContent(name);
    window.navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const copyCommandToClipboard = () => {
    window.navigator.clipboard.writeText(
      `npx shadcn@latest add ${LINKS.SITE_URL}/r/${name}.json`,
    );
    setIsCommandCopied(true);
    setTimeout(() => setIsCommandCopied(false), 1000);
  };

  const playAnimation = () => {
    iconRef.current?.startAnimation();

    // optional auto-stop so it doesn't loop forever
    setTimeout(() => {
      iconRef.current?.stopAnimation();
    }, 1500);
  };

  return (
    <div className="bg-background relative flex min-w-[140px] flex-1 flex-col items-center justify-center gap-4 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md sm:w-48 sm:flex-none">
      <div className="absolute top-2 right-2 hidden sm:hidden [@media(hover:none)]:block">
        <button
          onClick={(e) => {
            e.preventDefault();
            playAnimation();
          }}
          className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-2 transition-colors"
        >
          <PlayerIcon size={16} />
        </button>
      </div>
      {/* Icon Preview */}
      <Link
        href={`/icons/${name}`}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 p-2"
      >
        <Tooltip>
          <TooltipTrigger>
            <Icon ref={iconRef} size={56} />
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={copyFileToClipboard}
            >
              {isCopied ? (
                <SimpleCheckedIcon size={16} className="text-green-500" />
              ) : (
                <CopyIcon size={16} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-foreground text-background"
          >
            <p>Copy {name}.tsx file</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={copyCommandToClipboard}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isCommandCopied ? (
                <SimpleCheckedIcon size={16} className="text-green-500" />
              ) : (
                <TerminalIcon size={16} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-foreground text-background"
          >
            <p>Copy shadcn command</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default IconCard;
