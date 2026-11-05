import Image from "next/image";

type VultrMarkProps = {
  /** Rendered height in pixels. Width follows the wordmark aspect ratio. */
  height?: number;
  className?: string;
};

const VultrMark = ({ height = 28, className }: VultrMarkProps) => {
  const style = { height, width: "auto" } as const;

  return (
    <span className={className}>
      <Image
        src="/assets/vultr.png"
        alt="Vultr"
        width={1450}
        height={347}
        style={style}
        className="dark:hidden"
      />
      <Image
        src="/assets/vultr-white.png"
        alt=""
        width={907}
        height={217}
        aria-hidden
        style={style}
        className="hidden dark:block"
      />
    </span>
  );
};

export default VultrMark;
