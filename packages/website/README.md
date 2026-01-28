# IndoriLang Website

Professional open-source landing page, documentation, and playground for IndoriLang.

## Tech Stack

- **Next.js 14** - App Router with TypeScript
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Monaco Editor** - Code editor with custom IndoriLang syntax highlighting
- **Zustand** - State management for playground
- **MDX** - Documentation pages
- **next-themes** - Dark/Light mode

## Getting Started

```bash
# Install dependencies (from root)
pnpm install

# Run development server
pnpm --filter @indori-lang/website dev

# Build for production
pnpm --filter @indori-lang/website build

# Start production server
pnpm --filter @indori-lang/website start
```

## Project Structure

```
website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Landing page
│   │   ├── playground/   # Playground page
│   │   ├── docs/         # Documentation pages
│   │   └── features/     # Features page
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── lib/             # Utilities
│   │   ├── monaco/      # Monaco language support
│   │   └── ...
│   └── store/           # Zustand stores
└── package.json
```

## Features

- ✅ Responsive design
- ✅ Dark/Light mode
- ✅ SEO optimized
- ✅ Monaco Editor with IndoriLang syntax highlighting
- ✅ Interactive playground
- ✅ MDX documentation
- ✅ GitHub stars & npm downloads counters
- ✅ Shareable playground URLs

## Development

The website uses the `@indori-lang/compiler` package from the workspace. Make sure to build the compiler package first:

```bash
pnpm --filter @indori-lang/compiler build
```

## Deployment

The website can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

Make sure to set up environment variables if needed.
