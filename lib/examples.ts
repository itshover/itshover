import XSidebar from "@/components/examples/x-sidebar";
import AnimatedNavbar from "@/components/examples/animated-navbar";
import CollapsibleSidebar from "@/components/examples/collapsible-sidebar";
import fs from "fs";
import path from "path";
import TakeuforwardNavbar from "@/components/examples/takeuforward-navbar";

// Define the registry of examples
// Add new examples to this array
const EXAMPLE_REGISTRY = [
  {
    componentName: "X Sidebar",
    slug: "x-sidebar",
    createdBy: "https://github.com/Abhijit-Jha",
    filePath: "components/examples/x-sidebar.tsx",
    component: XSidebar,
    description:
      "An animated sidebar navigation component inspired by X (formerly Twitter). Features smooth hover effects and individual icon animations.",
    tags: ["Sidebar", "Navigation", "Animation", "Framer Motion"],
  },
  {
    componentName: "Animated Navbar",
    slug: "animated-navbar",
    createdBy: "https://github.com/KompallyAkhil",
    filePath: "components/examples/animated-navbar.tsx",
    component: AnimatedNavbar,
    description:
      "A responsive top navigation bar with a sliding active indicator and hover-triggered icon animations. Collapses to icons on mobile.",
    tags: [
      "Navbar",
      "Navigation",
      "Responsive",
      "Framer Motion",
      "Micro-interactions",
    ],
  },
  {
    componentName: "Collapsible Sidebar",
    slug: "collapsible-sidebar",
    createdBy: "https://github.com/KompallyAkhil",
    filePath: "components/examples/collapsible-sidebar.tsx",
    component: CollapsibleSidebar,
    description:
      "A dashboard sidebar that expands and collapses with a smooth transition. Features icon-only mode with tooltips and animated toggle button.",
    tags: ["Sidebar", "Collapsible", "Dashboard", "Framer Motion", "Tooltip"],
  },
  {
    componentName: "Takeuforward Navbar",
    slug: "takeuforward-navbar",
    createdBy: "https://github.com/Abhijit-Jha",
    filePath: "components/examples/takeuforward-navbar.tsx",
    component: TakeuforwardNavbar,
    description:
      "A modern, interactive component featuring advanced animations and smooth state transitions.",
    tags: ["UI", "Animation", "Framer Motion", "Interactive"],
    fullWidth: true,
  },
];

export function getExamples() {
  return EXAMPLE_REGISTRY.map((example) => {
    let code = "";
    try {
      code = fs.readFileSync(
        path.join(process.cwd(), example.filePath),
        "utf8",
      );
    } catch (error) {
      console.error(
        `Error reading file for example ${example.slug} at ${example.filePath}:`,
        error,
      );
      code = "// Error loading component code";
    }

    return {
      componentName: example.componentName,
      slug: example.slug,
      createdBy: example.createdBy,
      description: example.description,
      tags: example.tags,
      code,
      component: example.component,
      fullWidth: example.fullWidth ?? false,
    };
  });
}

export function getExampleBySlug(slug: string) {
  const examples = getExamples();
  return examples.find((example) => example.slug === slug);
}
