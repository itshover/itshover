# Contributing to Its Hover

Thank you for your interest in contributing to Its Hover! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Adding New Icons](#adding-new-icons)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to @itshover (GitHub) or maintainer email.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git for version control
- A code editor (VS Code recommended)
- Basic knowledge of Next.js, Typescript motion and shadcn/ui

## Ways to Contribute

You can contribute to itshover.com in two ways:

### 1. Improving Functionality / Optimizing the Website

- Fix bugs
- Improve performance
- Add new features
- Enhance UI/UX
- Improve accessibility

### 2. Adding New Icons

See the [Adding New Icons](#adding-new-icons) section for detailed steps.

## Development Setup

### Fork and Clone

```bash
git clone https://github.com/itshover/itshover.git
cd itshover
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Open in Browser

Navigate to http://localhost:3000

## Project Structure

```
itshover/
├── app/              # Next.js pages and routes
├── components/       # React components
│   └── ui/           # Reusable UI primitives
├── icons/            # Animated icon components (186+)
├── lib/              # Utilities and helpers
├── actions/          # Server actions
├── public/           # Static assets
└── registry.json     # shadcn CLI registry
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define types and interfaces for all data structures
- Avoid `any` types
- Use type inference where appropriate

### React

- Use functional components with hooks
- Use `forwardRef` for icon components
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

### Code Style

- Follow existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### File Naming

- Components: `kebab-case.tsx` (e.g., `github-icon.tsx`)
- Utilities: `kebab-case.ts` (e.g., `icon-names.ts`)

### Linting and Formatting

```bash
# Check for linting errors
npm run lint

# Format code
npm run format

# Type check
npm run typecheck

# Run all checks
npm run check
```

Always run `npm run check` before committing your changes.

### Import Organization

```tsx
// 1. React and Next.js
import { forwardRef, useImperativeHandle } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { motion, useAnimate } from "motion/react";

// 3. Internal components and utilities
import type { AnimatedIconProps } from "./types";
import { cn } from "@/lib/utils";
```

## Adding New Icons

### Step 1: Create the Icon Component

Create a new file in `icons/` directory. Follow the exact same pattern as existing icons:

```tsx
import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const YourIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(".icon-group", { scale: 1.1 }, { duration: 0.3 });
    };

    const stop = () => {
      animate(".icon-group", { scale: 1 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g className="icon-group" style={{ transformOrigin: "center" }}>
          {/* Your SVG paths here */}
        </motion.g>
      </motion.svg>
    );
  },
);

YourIcon.displayName = "YourIcon";
export default YourIcon;
```

Key requirements:

- Use `forwardRef` with `AnimatedIconHandle` from `./types`
- Use `motion/react` for animations
- Implement `startAnimation` and `stopAnimation` via `useImperativeHandle`
- Check existing icons like `github-icon.tsx` for reference

### Step 2: Register the Icon

Add your icon in three places:

**a) Import and add to ICON_LIST in `icons/index.ts`:**

```tsx
// Add import at the top
import YourIcon from "./your-icon";

// Add to ICON_LIST array
{
  name: "your-icon",
  icon: YourIcon,
  keywords: ["your", "keywords", "here"],
}
```

**b) Add to `lib/icons.ts` (ICONS array for routing):**

```tsx
{
  name: "your icon",
  path: "/icons/your-icon",
}
```

**c) `registry.json`:**

Auto-generated when you run `npm run registry:build` in the next step.

### Step 3: Build Registry

```bash
npm run registry:build
```

This command does three things:

1. **Generates `registry.json`** from `icons/index.ts` (ensures all icons are included)
2. **Builds individual JSON files** in `public/r/` for the shadcn CLI
3. **Formats** `registry.json` and `public/r/*.json` files

Wait for it to succeed before proceeding.

### Step 4: Run All Checks

```bash
npm run format
npm run lint
npm run typecheck
npm run build
```

Or run all at once:

```bash
npm run check
npm run build
```

### Step 5: Create PR

See [Submitting Changes](#submitting-changes) section.

## Testing

Before submitting your changes, verify that icons work correctly:

### Visual Testing (Doc Site)

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/icons in your browser

3. Verify:
   - Your icon appears in the gallery
   - Hover animations work correctly
   - No console errors appear
   - Click on the icon to view its detail page

### Testing as a Library Consumer

To verify icons work when installed via the shadcn CLI:

1. Create a test project (outside or inside the repo):

   ```bash
   npx create-next-app@latest test-consumer --typescript --tailwind --app
   cd test-consumer
   npm install motion
   npx shadcn@latest init --defaults
   ```

2. Add an icon from your local registry:

   ```bash
   npx shadcn@latest add "http://localhost:3000/r/github-icon.json"
   ```

3. Create a test page (`app/page.tsx`):

   ```tsx
   "use client";
   import { useRef } from "react";
   import GithubIcon from "@/components/ui/github-icon";
   import type { AnimatedIconHandle } from "@/components/ui/types";

   export default function Home() {
     const iconRef = useRef<AnimatedIconHandle>(null);

     return (
       <div className="flex flex-col items-center gap-4 p-10">
         <GithubIcon ref={iconRef} size={48} />
         <button onClick={() => iconRef.current?.startAnimation()}>
           Start Animation
         </button>
       </div>
     );
   }
   ```

4. Run the test project:

   ```bash
   npm run dev
   ```

5. Verify:
   - Icon renders correctly
   - Hover animation works
   - Button triggers animation via ref
   - No TypeScript errors

### Quick Checklist

```bash
# Run all checks before submitting
npm run check

# Verify registry syncs successfully (generates + builds)
npm run registry:build
```

## Making Changes

### Branch Strategy

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# or for bug fixes
git checkout -b fix/bug-description
```

### Commit Message Format

Follow conventional commits format:

```
<type>: <subject>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks

Examples:

```
feat: add volume-icon with wave animation
fix: correct heart-icon animation timing
docs: update contributing guidelines
```

## Submitting Changes

### Pull Request Process

1. **Push Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to the GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR description

3. **PR Description Template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] New icon(s)
   - [ ] Documentation update

   ## Checklist

   - [ ] Code follows project style guidelines
   - [ ] `npm run check` passes
   - [ ] `npm run registry:build` passes (for new icons)
   - [ ] Icons work on all screen sizes
   - [ ] Self-review completed
   ```

4. **Respond to Feedback**
   - Address review comments
   - Make requested changes
   - Keep the PR updated

### PR Review Criteria

Your PR will be reviewed for:

- Does it work as intended?
- Is the code clean and maintainable?
- Does it follow existing patterns?
- Has it been tested?

## Bug Reports

### Reporting Bugs

Use the bug report template and include:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Bug Report Template

```markdown
## Bug Description

[Clear description of the bug]

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Environment

- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
```

## Feature Requests

### Suggesting Features

1. Check existing issues for similar requests
2. Create a new issue with the "Feature Request" label
3. Include:
   - Clear description
   - Use case and benefits
   - Examples or mockups if possible

## Getting Help

- Open a GitHub Issue for questions
- Check existing issues and discussions
- Review the code for examples
- Reach out on [Twitter](https://x.com/abhijitwt)

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.

---

Thank you for contributing to Its Hover!
