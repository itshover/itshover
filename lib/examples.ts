import XSidebar from "@/components/examples/x-sidebar";
import PaymentCheckoutExample from "@/components/examples/payment-checkout";
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
    componentName: "Payment Checkout",
    slug: "payment-checkout",
    createdBy: "https://github.com/forever-ivy",
    filePath: "components/examples/payment-checkout.tsx",
    component: PaymentCheckoutExample,
    description:
      "A polished payment checkout component with expandable order summary and animated payment method selection. Features smooth layout transitions and hover-triggered icon animations.",
    tags: ["Payment", "Checkout", "Animation", "Framer Motion"],
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
