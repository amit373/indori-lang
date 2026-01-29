# IndoriLang VS Code Extension

Syntax highlighting, snippets, and language support for IndoriLang (`.il` files) in VS Code.

## Features

- **Syntax highlighting** for all IndoriLang keywords, strings, numbers, and comments
- **Snippets** for common patterns (variables, functions, conditionals, loops, try-catch, etc.)
- **Auto bracket closing** for `{}`, `[]`, `()`
- **Comment** support (`#` line comments)

## Installation

- **From Marketplace**: Search for "IndoriLang" in VS Code Extensions
- **From CLI**: `code --install-extension indori-lang`
- **From source**: Open this folder in VS Code and run the "Run Extension" debug task, or package with `vsce package` and install the `.vsix` file

## Packaging

From repo root:

```bash
pnpm run package:vscode
```

Or from this directory (requires [vsce](https://github.com/microsoft/vscode-vsce)):

```bash
npx @vscode/vsce package
```

## Development

This extension is declarative only (no TypeScript activation script). To modify:

- **Grammar**: `syntaxes/indori.tmLanguage.json`
- **Language config** (brackets, comments): `language-configuration.json`
- **Snippets**: `snippets/indori.json`
