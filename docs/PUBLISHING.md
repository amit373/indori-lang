# Publishing Guide

This guide explains how to publish IndoriLang to npm, VS Code Marketplace, and deploy the playground website.

## Prerequisites

1. **NPM Account**: Create accounts on npmjs.com
2. **VS Code Publisher Account**: Create a publisher account at https://marketplace.visualstudio.com/manage
3. **Netlify Account**: For playground deployment (or use GitHub Pages/Vercel)

## 1. Publishing NPM Packages

**Important**: ✅ **Yes, you can use pnpm locally and publish to npm!** The workspace manager (pnpm/npm/yarn) only affects local development. When publishing, you publish individual packages to npm, and npm doesn't care which package manager you used locally.

### Quick Publish (from root using pnpm)

```bash
# Build all packages first
pnpm run build

# Publish compiler package
pnpm run publish:compiler

# Publish CLI package  
pnpm run publish:cli
```

### Using npm (works with any workspace manager)

#### Compiler Package (@indori-lang/compiler)

```bash
cd packages/compiler
npm login
npm publish --access public
```

#### CLI Package (@indori-lang/cli)

```bash
cd packages/cli
npm login
npm publish --access public
```

### Using pnpm (if using pnpm workspaces)

#### Compiler Package (@indori-lang/compiler)

```bash
cd packages/compiler
pnpm login  # or npm login
pnpm publish --access public
```

#### CLI Package (@indori-lang/cli)

```bash
cd packages/cli
pnpm login  # or npm login
pnpm publish --access public
```

**Note**: Make sure both packages are built before publishing:
```bash
# With npm workspaces
npm run build

# With pnpm workspaces
pnpm run build
```

### Publishing from Root (pnpm workspaces)

Since this project uses pnpm, you can publish from the root:

```bash
# Build all packages first
pnpm run build

# Publish specific package using pnpm filter
pnpm --filter @indori-lang/compiler publish --access public
pnpm --filter @indori-lang/cli publish --access public

# Or use the npm scripts (recommended)
pnpm run publish:compiler
pnpm run publish:cli
```

**Note**: Both `pnpm publish` and `npm publish` work the same way when publishing to npm. The package manager you use locally doesn't affect the published package on npm.

## 2. Publishing VS Code Extension

### Setup

1. Install `vsce` (VS Code Extension manager):
```bash
npm install -g @vscode/vsce
```

2. Create a publisher account at https://marketplace.visualstudio.com/manage

3. Get a Personal Access Token from https://dev.azure.com

### Publish

```bash
cd packages/vscode-extension
vsce login indori-lang
vsce package
vsce publish
```

Or publish a specific version:
```bash
vsce publish minor  # or patch, major
```

## 3. Deploying Playground Website

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Build settings:
   - **Base directory**: `packages/playground`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `packages/playground/dist`
3. The `netlify.toml` file is already configured

### Manual Deployment

```bash
cd packages/playground
npm install
npm run build
# Upload dist/ folder to your hosting service
```

### Alternative: GitHub Pages

1. Update `vite.config.ts` to set `base: '/indori-lang/'` (if using GitHub Pages)
2. Build and push to `gh-pages` branch

## 4. Version Management

### Update Version

Update version in all `package.json` files:
- `packages/compiler/package.json`
- `packages/cli/package.json`
- `packages/vscode-extension/package.json`
- Root `package.json` (if needed)

### Semantic Versioning

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes

## 5. Release Checklist

- [ ] Update version numbers in all package.json files
- [ ] Update CHANGELOG.md (if exists)
- [ ] Run tests: `npm test`
- [ ] Build all packages: `npm run build`
- [ ] Test playground locally: `npm run dev:playground`
- [ ] Test CLI installation: `npm install -g ./packages/cli`
- [ ] Test compiler package: `npm install ./packages/compiler`
- [ ] Publish compiler package
- [ ] Publish CLI package
- [ ] Publish VS Code extension
- [ ] Deploy playground website
- [ ] Update documentation
- [ ] Announce release

## 6. Post-Publishing

### Verify NPM Packages

```bash
npm install -g @indori-lang/cli
indori version

npm install @indori-lang/compiler
# Test in a new project
```

### Verify VS Code Extension

1. Search for "IndoriLang" in VS Code Extensions
2. Install and test syntax highlighting
3. Test snippets

### Verify Playground

1. Visit the deployed URL
2. Test compilation
3. Test examples
4. Test sharing functionality (if implemented)

## Troubleshooting

### NPM Publishing Issues

- **403 Forbidden**: Check npm login and package name availability
- **Package name taken**: Use scoped package name or different name
- **Build errors**: Ensure TypeScript compiles successfully

### VS Code Extension Issues

- **Publisher not found**: Create publisher account first
- **Token expired**: Generate new Personal Access Token
- **Package too large**: Optimize or split extension

### Playground Deployment Issues

- **Build fails**: Check Node version (should be 18+)
- **Routes not working**: Ensure redirects are configured in netlify.toml
- **Assets not loading**: Check base path in vite.config.ts

## Useful Commands

```bash
# Build all packages
npm run build

# Test all packages
npm test

# Lint all packages
npm run lint

# Format all code
npm run format

# Run playground locally
npm run dev:playground

# Check package size before publishing
npm pack
tar -tzf *.tgz | head -20
```
