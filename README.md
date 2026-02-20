# Its Hover

<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

Animated icon library built with React and Motion. Icons designed to move with intent, not decoration.

![Its Hover Product Screenshot](public/product/svg.png)

## Features

- **Motion-first design** - Every icon animates on interaction, built with motion/react
- **React components** - Drop-in components that work with Next.js, shadcn, and modern tooling
- **Fully customizable** - Copy the source, modify animations, adjust stroke width and colors
- **Open source** - MIT licensed, community owned

## Quick Start

### Via CLI

```bash
npx shadcn@latest add https://itshover.com/r/[icon-name].json
```

### Manual Installation

1. Install dependencies:

```bash
npm install motion
```

2. Copy any icon component from the `icons/` directory into your project

3. Import and use:

```tsx
import GithubIcon from "@/icons/github-icon";

export default function Example() {
  return <GithubIcon className="h-6 w-6" />;
}
```

## Icon Library

186+ animated icons covering:

- UI essentials (arrows, checks, navigation)
- Social (GitHub, Twitter, Discord, LinkedIn)
- Tech (Docker, Node.js, Python, TypeScript)
- Actions (copy, send, cart, settings)
- Currency (Bitcoin, Ethereum, Dollar, Rupee)
- Status (alerts, notifications, loading states)

Browse all icons at [itshover.com/icons](https://itshover.com/icons)

## Tech Stack

- Next.js 16
- React 18+
- motion/react for animations
- Tailwind CSS 4
- shadcn/ui components

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Format code
npm run format

# Run all checks
npm run check
```

## Project Structure

```
icons/           # Animated icon components
components/      # UI components
app/            # Next.js app router pages
lib/            # Utilities
public/         # Static assets
registry.json   # shadcn registry configuration
```

## Contributing

Contributions welcome. Each icon follows this pattern:

1. SVG wrapped in a React component
2. Animation triggered on hover using motion/react
3. Exported with ref forwarding for imperative control

## Links

- Website: [itshover.com](https://itshover.com)
- GitHub: [github.com/itshover/itshover](https://github.com/itshover/itshover)
- Twitter: [x.com/itshoverr](https://x.com/itshoverr)

## Creator

Built by [@abhijitwt](https://x.com/abhijitwt)

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

[Apache 2.0](LICENSE)
