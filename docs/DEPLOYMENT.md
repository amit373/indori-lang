# Deployment Guide

Quick reference for deploying all three components of IndoriLang.

## 🚀 Quick Deploy Commands

### 1. NPM Packages

```bash
# Compiler Package
cd packages/compiler
npm run build
npm publish --access public

# CLI Package  
cd packages/cli
npm run build
npm publish --access public
```

### 2. VS Code Extension

```bash
cd packages/vscode-extension
npm install -g @vscode/vsce
vsce login indori-lang
vsce publish
```

### 3. Playground Website

**Netlify (Automatic):**
- Connect GitHub repo to Netlify
- Build settings are in `netlify.toml`
- Auto-deploys on push to main

**Manual:**
```bash
cd packages/playground
npm install
npm run build
# Upload dist/ to hosting service
```

## 📋 Pre-Deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] All packages build: `npm run build`
- [ ] Version numbers updated in all package.json files
- [ ] README files updated
- [ ] CHANGELOG updated (if exists)
- [ ] Playground tested locally
- [ ] CLI tested after install
- [ ] VS Code extension tested

## 🔗 URLs

- **Playground**: https://indori-lang.netlify.app
- **NPM Compiler**: https://www.npmjs.com/package/@indori-lang/compiler
- **NPM CLI**: https://www.npmjs.com/package/@indori-lang/cli
- **VS Code Extension**: https://marketplace.visualstudio.com/items?itemName=indori-lang.indori-lang
