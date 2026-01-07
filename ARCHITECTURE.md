# Architecture

Technical overview of Its Hover codebase.

## Tech Stack

| Technology     | Purpose                             |
| -------------- | ----------------------------------- |
| Next.js 16     | App Router, SSR, file-based routing |
| React 18+      | Component library                   |
| motion/react   | Animation engine                    |
| TypeScript     | Type safety                         |
| Tailwind CSS 4 | Styling                             |
| shadcn/ui      | CLI distribution                    |

## Project Structure

```
itshover/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── icons/              # Icon browser pages
│   │   ├── page.tsx        # Icon listing
│   │   └── [slug]/         # Dynamic icon detail
│   └── sponsor/            # Sponsor page
│
├── components/             # React components
│   ├── navbar.tsx          # Navigation bar
│   ├── footer.tsx          # Footer
│   ├── hero-section.tsx    # Homepage hero
│   ├── features.tsx        # Feature showcase
│   ├── icons-list.tsx      # Icon grid display
│   ├── cmdk.tsx            # Command palette (Cmd+K)
│   └── ui/                 # UI primitives
│       ├── icon-card.tsx   # Icon display card
│       ├── code-block.tsx  # Code with syntax highlighting
│       ├── search-input.tsx # Fuzzy search
│       └── ...
│
├── icons/                  # Animated icon components
│   ├── index.ts            # Exports + ICON_LIST registry
│   ├── types.ts            # Shared types
│   └── [icon-name].tsx     # Individual icon components
│
├── lib/                    # Utilities
│   ├── icons.ts            # Icon routing data
│   ├── utils.ts            # Helper functions (cn)
│   └── stars.ts            # GitHub API
│
├── actions/                # Server actions
│   └── get-icons-content.ts # Fetch icon source code
│
├── public/                 # Static assets
│   ├── product/            # Feature images
│   └── og.png              # Open Graph image
│
└── registry.json           # shadcn CLI registry
```

## Icon Component Pattern

Every icon follows this pattern:

```tsx
import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconProps } from "./types";

export type IconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

const Icon = forwardRef<IconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(".icon-group", { /* animation */ }, { duration: 0.3 });
    };

    const stop = () => {
      animate(".icon-group", { /* reset */ }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg ref={scope} onHoverStart={start} onHoverEnd={stop} ...>
        <motion.g className="icon-group">
          {/* SVG paths */}
        </motion.g>
      </motion.svg>
    );
  }
);
```

Key points:

- `forwardRef` for imperative control via ref
- `useAnimate` from motion/react for programmatic animations
- Hover triggers animation automatically
- Exposed `startAnimation`/`stopAnimation` for manual control

## Data Flow

```
icons/index.ts          → ICON_LIST (components + keywords)
lib/icons.ts            → ICONS (name + path for routing)
registry.json           → shadcn CLI (auto-generated)
```

## Key Files

| File                  | Purpose                                                          |
| --------------------- | ---------------------------------------------------------------- |
| `icons/index.ts`      | Master icon registry with components and search keywords         |
| `lib/icons.ts`        | Icon routing data for navigation                                 |
| `registry.json`       | shadcn CLI config for `npx shadcn add`                           |
| `app/layout.tsx`      | Root layout with theme, command menu, and GitHub stars providers |
| `components/cmdk.tsx` | Command palette for icon search                                  |

## Providers

Wrapped in `app/layout.tsx`:

1. **ThemeProvider** - Dark/light mode
2. **GithubStarsProvider** - Cached GitHub star count
3. **CommandMenuProvider** - Cmd+K state
4. **TooltipProvider** - Radix tooltips

## CLI Distribution

Icons are distributed via shadcn CLI:

```bash
npx shadcn@latest add https://itshover.com/r/[icon-name].json
```

### Registry Generation

The registry is auto-generated in two steps:

1. **`scripts/generate-registry.ts`** - Reads `icons/index.ts` and generates `registry.json`
2. **`shadcn build`** - Reads `registry.json` and generates individual JSON files in `public/r/`

Run both with:

```bash
npm run registry:build
```

This ensures the registry stays in sync with `icons/index.ts` and prevents missing icons.

## Code of Conduct

This project is governed by a [Code of Conduct](CODE_OF_CONDUCT.md). All contributors and participants are expected to uphold these standards.
