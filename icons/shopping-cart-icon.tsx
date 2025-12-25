import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ShoppingCartIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Add your animations here
  };

  return (
    <motion.div
      ref={scope}
      onHoverStart={hoverAnimation}
      className={`inline-flex cursor-pointer ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="square"
      >
        {/* Cart top */}
        <motion.path
          className="cart-top"
          d="M8.49994 10H41L37.569 21.4367C36.9345 23.5517 34.9879 25 32.7798 25H10.4999"
        />

        {/* Left wheel */}
        <motion.path
          className="cart-wheel cart-wheel-left"
          style={{ transformOrigin: "11px 41px" }}
          d="M11 45C13.2091 45 15 43.2091 15 41C15 38.7909 13.2091 37 11 37C8.79086 37 7 38.7909 7 41C7 43.2091 8.79086 45 11 45Z"
        />

        {/* Right wheel */}
        <motion.path
          className="cart-wheel cart-wheel-right"
          style={{ transformOrigin: "37px 41px" }}
          d="M37 45C39.2091 45 41 43.2091 41 41C41 38.7909 39.2091 37 37 37C34.7909 37 33 38.7909 33 41C33 43.2091 34.7909 45 37 45Z"
        />

        {/* Cart body */}
        <motion.path
          className="cart-body"
          d="M41 32H9.46174C7.17727 32 6.08953 29.1885 7.77914 27.651L10.6923 25L7.81067 5.14103C7.63231 3.91188 6.57863 3.00005 5.33661 3.00003L3 3"
        />

        {/* Item lines */}
        <motion.path className="cart-item cart-item-1" d="M30 16L30 19" />

        <motion.path className="cart-item cart-item-2" d="M24 16L24 19" />

        <motion.path className="cart-item cart-item-3" d="M18 16L18 19" />
      </svg>
    </motion.div>
  );
};

export default ShoppingCartIcon;
