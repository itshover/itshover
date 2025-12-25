import React from "react";

const GithubStars = () => {
  return (
    <div className="border-border bg-background hover:bg-accent hover:text-accent-foreground flex w-fit items-center justify-center gap-2 rounded-full border px-4 py-2 shadow-sm transition-colors duration-300 ease-in-out">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 text-yellow-500"
      >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />{" "}
      </svg>{" "}
      {/* <span className="text-sm font-medium">Star on GitHub</span>{" "} */}
      <span className="text-muted-foreground text-sm font-medium">1.2k</span>
    </div>
  );
};

export default GithubStars;
