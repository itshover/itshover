import XSidebar from "@/components/examples/x-sidebar";
import CircularMenu from "@/components/examples/circular-menu";
import ExpandableActions from "@/components/examples/expandable-actions";
import AnimatedNavbar from "@/components/examples/animated-navbar";
import CollapsibleSidebar from "@/components/examples/collapsible-sidebar";
import fs from "fs";
import path from "path";

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
    componentName: "Circular Menu",
    slug: "circular-menu",
    createdBy: "https://github.com/KompallyAkhil",
    filePath: "components/examples/circular-menu.tsx",
    component: CircularMenu,
    description:
      "A radial menu that expands from a toggle button. Uses physics-based springs for a satisfying deployment animation.",
    tags: ["Menu", "FAB", "Animation", "Framer Motion", "Radial"],
  },
  {
    componentName: "Expandable Actions",
    slug: "expandable-actions",
    createdBy: "https://github.com/KompallyAkhil",
    filePath: "components/examples/expandable-actions.tsx",
    component: ExpandableActions,
    description:
      "A compact pill-shaped button that smoothly expands to reveal a toolbar of action icons.",
    tags: ["Toolbar", "Button", "Animation", "Framer Motion", "Expandable"],
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
    };
  });
}

export function getExampleBySlug(slug: string) {
  const examples = getExamples();
  return examples.find((example) => example.slug === slug);
}
