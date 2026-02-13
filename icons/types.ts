import type { SVGProps } from "react";

export type IconEasing =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate";

export interface AnimatedIconProps extends Omit<
  SVGProps<SVGSVGElement>,
  | "ref"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop"
  | "values"
> {
  /** Icon size in pixels or CSS string */
  size?: number | string;
  /** Icon color (defaults to currentColor) */
  color?: string;
  /** SVG stroke width */
  strokeWidth?: number;
  /** Additional CSS classes */
  className?: string;
}

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
