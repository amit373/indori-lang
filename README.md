# 🍚 IndoriLang v1.0 - Bhiya Ek Number Programming Language!

> **IndoriLang** - Programming language in authentic Indori slang (bhiya style)

[![npm compiler](https://img.shields.io/npm/v/@indori-lang/compiler.svg)](https://www.npmjs.com/package/@indori-lang/compiler)
[![npm cli](https://img.shields.io/npm/v/@indori-lang/cli.svg)](https://www.npmjs.com/package/@indori-lang/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Playground](https://img.shields.io/badge/Playground-Online-blue.svg)](https://indori-lang.netlify.app)

## 🌟 What is IndoriLang?

IndoriLang is a fun, expressive programming language that uses authentic Indori slang and bhiya-style keywords. It compiles to JavaScript and can be run in Node.js, browsers, or anywhere JavaScript runs!

### 🎯 Key Features

- **Pure Indori Keywords** - All programming concepts in Indori slang
- **TypeScript Powered** - Full type safety and modern tooling
- **Browser Playground** - Try it online with Monaco Editor
- **VS Code Extension** - Syntax highlighting and auto-completion
- **CLI Tool** - Compile and run from command line
- **Easter Eggs** - Fun Indori cultural references (poha_time(), jalebi_mode(), etc.)

## 🚀 Quick Start

### Installation

#### CLI Tool

```bash
npm install -g @indori-lang/cli
```

#### VS Code Extension

```bash
code --install-extension indori-lang
```

#### Browser Playground

Visit [https://indori-lang.netlify.app](https://indori-lang.netlify.app)

### Your First IndoriLang Program

Create a file `hello.il`:

```indori
# Hello World in IndoriLang
bhiya_bol("Ram Ram bhiya log!");
poha_time();
```

Run it:

```bash
indori run hello.il
```

Compile to JavaScript:

```bash
indori compile hello.il hello.js
```

## 📚 Language Reference

### File Extension

`.il` - IndoriLang files

### Comments

```indori
# This is a comment
```

### Variables & Assignment

```indori
kaam x laa_re 10;
kaam name laa_re "Indori";
```

### Data Types

```indori
# Strings
kaam greeting laa_re "Hello Bhiya";

# Numbers (integers only)
kaam age laa_re 25;
kaam count laa_re 42;

# Booleans
kaam isAdult laa_re bilkul_sahi;  # true
kaam isChild laa_re ghapla_hai;     # false
```

### Conditionals

```indori
agar_re (age >= 18) {
  bhiya_bol("Adult ho re!");
} warna_re {
  bhiya_bol("Baccha hai!");
}

agar_re (weather == "sunny" ane_re temperature > 30) {
  bhiya_bol("Garmi bahut!");
} warna_re {
  bhiya_bol("Thanda hai!");
}
```

### Loops

```indori
# While loop
kaam i laa_re 0;
jabtak_re (i < 5) {
  bhiya_bol("Count: " + i);
  i = i + 1;
}

# For loop
kaam j laa_re 0;
ghuma_re (j; j < 3; j = j + 1) {
  bhiya_bol("For: " + j);
}

# Do-while
kaam k laa_re 0;
jabtak_re_kar {
  bhiya_bol("Do-while: " + k);
  k = k + 1;
} (k < 2);
```

### Functions

```indori
bhiya_ka greet(name) {
  de_re "Ram Ram " + name + "!";
}

bhiya_ka add(a, b) {
  de_re a + b;
}

bhiya_bol(greet("bhiya"));
bhiya_bol("Sum: " + add(5, 3));
```

### Arrays

```indori
jama_re fruits = ["apple", "banana", "orange"];
kaam first laa_re nikaal_re(fruits, 0);
kaam count laa_re ketlu_re(fruits);

# Array access and length
bhiya_bol("First fruit: " + nikaal_re(fruits, 0));
bhiya_bol("Array length: " + ketlu_re(fruits));

# Note: Array methods with arrow functions (ghuma_map, chhaan_re, ghuma_reduce) 
# require function syntax which is not yet fully supported in IndoriLang
```

### Objects

```indori
naksha_re person = {
  naam: "Raju",
  age: 25,
  city: "Indore"
};

kaam name laa_re dikha_re(person, "naam");
kaam age laa_re dikha_re(person, "age");
badal_re(person, "age", 26);
```

### Console & Alerts

```indori
bhiya_bol("Normal log");     # console.log
bhiya_chitav("Warning log");  # console.warn  
bhiya_gadbad("Error log");    # console.error
bhiya_suna("Alert message");  # alert
```

### Logical Operators

```indori
agar_re (x > 5 ane_re y < 10) {
  bhiya_bol("Both conditions true");
}

# NOT operator (unary)
agar_re (nako_re isAdult) {
  bhiya_bol("Not adult");
}

# Combining with AND
agar_re (x > 5 ane_re nako_re y) {
  bhiya_bol("x > 5 and not y");
}
```

### Error Handling

```indori
bhiya_try {
  kaam result laa_re 10 / 0;
  bhiya_bol("This won't print");
} bhiya_catch(e) {
  bhiya_gadbad("Error caught: " + e);
} bhiya_finally {
  bhiya_bol("Always executes");
}
```

### Easter Eggs 🎉

```indori
poha_time();      # "Poha time ho gaya re 😎"
jalebi_mode();    # Decorates logs with 🍬
rajwada_mode();   # Logs with 👑 emojis  
sarafa_night();   # Alert "Sarafa chal reha hai 🌙"
```

## 📋 JavaScript Features Support

IndoriLang supports approximately **40-45%** of core JavaScript features, focusing on basic imperative programming, functions, arrays, objects, and control flow.

### ✅ Supported Features

#### **Data Types & Literals**
- ✅ **Numbers** (integers only - no decimals)
- ✅ **Strings** (single or double quotes)
- ✅ **Booleans** (`bilkul_sahi` = true, `ghapla_hai` = false)
- ✅ **Arrays** (declaration and literal syntax)
- ✅ **Objects** (declaration and literal syntax with properties)
- ✅ **null/undefined** (implicitly supported via object property access)

#### **Operators**
- ✅ **Arithmetic**: `+`, `-`, `*`, `/`, `++`, `--`
- ✅ **Comparison**: `==`, `!=`, `<`, `<=`, `>`, `>=`
- ✅ **Logical**: `ane_re` (AND), `ya_re` (OR), `nako_re` (NOT)
- ✅ **Assignment**: `=`

#### **Control Flow**
- ✅ If/else statements (`agar_re`/`warna_re`)
- ✅ While loop (`jabtak_re`)
- ✅ For loop (`ghuma_re`)
- ✅ Do-while loop (`jabtak_re_kar`)
- ✅ Try-catch-finally (`bhiya_try`/`bhiya_catch`/`bhiya_finally`)
- ✅ Nested control structures

#### **Functions**
- ✅ Function declaration (`bhiya_ka`)
- ✅ Function parameters
- ✅ Return statement (`de_re`)
- ✅ Function calls
- ✅ Recursive functions

#### **Arrays**
- ✅ Array declaration (`jama_re`)
- ✅ Array literals `[1, 2, 3]`
- ✅ Array access via index (`nikaal_re(arr, index)`)
- ✅ Array length (`ketlu_re(arr)`)
- ✅ Array methods (runtime helpers): `ghuma_map`, `chhaan_re`, `ghuma_reduce`
- ⚠️ **Note**: Array methods require function callbacks, but arrow functions are not yet supported in IndoriLang syntax

#### **Objects**
- ✅ Object declaration (`naksha_re`)
- ✅ Object literals `{ key: value }`
- ✅ Property access (`dikha_re(obj, "key")`)
- ✅ Property assignment (`badal_re(obj, "key", value)`)
- ✅ Nested objects

#### **Expressions**
- ✅ Binary expressions (arithmetic, comparison)
- ✅ Unary expressions (NOT, negation)
- ✅ Logical expressions (AND, OR)
- ✅ Assignment expressions
- ✅ Call expressions (function calls)
- ✅ Member expressions (property access, array indexing)
- ✅ Array expressions
- ✅ Object expressions
- ✅ Parenthesized expressions

#### **Console & Output**
- ✅ `console.log` (`bhiya_bol`)
- ✅ `console.warn` (`bhiya_chitav`)
- ✅ `console.error` (`bhiya_gadbad`)
- ✅ `alert()` (`bhiya_suna`)

#### **Special Features**
- ✅ Async sleep function (`ruk_re(ms)`)
- ✅ Easter eggs: `poha_time()`, `jalebi_mode()`, `rajwada_mode()`, `sarafa_night()`

### ❌ Not Supported (Yet)

#### **Modern JavaScript Features**
- ❌ Arrow functions (`=>`)
- ❌ Template literals (backticks)
- ❌ Destructuring
- ❌ Spread operator (`...`)
- ❌ Rest parameters
- ❌ Default parameters
- ❌ Optional chaining (`?.`)
- ❌ Nullish coalescing (`??`)

#### **Advanced Features**
- ❌ Classes
- ❌ Modules (import/export)
- ❌ Async/await (only `ruk_re` for sleep)
- ❌ Promises (except via runtime helpers)
- ❌ Generators, Iterators, Symbols, Proxies

#### **Operators**
- ❌ Modulo (`%`)
- ❌ Exponentiation (`**`)
- ❌ Bitwise operators
- ❌ Strict equality (`===`, `!==`)
- ❌ Ternary operator (`? :`)
- ❌ Typeof, Instanceof, In, Delete operators

#### **Data Types**
- ❌ Decimals/Floats (only integers)
- ❌ BigInt, Date objects, RegExp, Typed arrays

#### **Control Flow**
- ❌ Switch statements
- ❌ Break/Continue
- ❌ Labels
- ❌ For-in/For-of loops

#### **Other**
- ❌ Variable scoping (`let`, `const` - only function scope)
- ❌ Hoisting behavior
- ❌ `this`, `new`, `super` keywords
- ❌ `with`, `debugger` statements
- ❌ `use strict`

### 📊 Feature Summary

**Supported**: ~35-40 core features
- Data Types: 6
- Operators: 13
- Control Flow: 7
- Functions: 4
- Arrays: 6
- Objects: 3
- Expressions: 8
- Console: 4
- Special: 5

**Not Supported**: ~50+ modern features

IndoriLang is designed as a **fun, educational language** with Indori slang, focusing on teaching programming concepts in an entertaining way rather than being a full JavaScript replacement!

For a detailed breakdown, see [FEATURES.md](./FEATURES.md).

## 🛠️ Development

### Project Structure

```
indori-lang/
├── packages/
│   ├── compiler/          # TypeScript compiler/transpiler
│   ├── cli/               # Command-line tool
│   ├── website/          # Next.js website + playground
│   └── vscode-extension/  # VS Code extension (syntax, snippets)
├── examples/              # Example .il files
└── README.md
```

### Building from Source

This project uses **pnpm** for workspace management, but publishes to **npm** (you can use pnpm locally and publish to npm - they work together perfectly!).

```bash
# Install pnpm (if not already installed)
npm install -g pnpm

# Install all dependencies
pnpm install

# Build all packages
pnpm run build

# Run website (and playground) locally
pnpm run dev:website

# Run tests
pnpm test

# Publish packages to npm (from root)
pnpm run publish:compiler
pnpm run publish:cli
```

### Development Setup

- **Node.js** 18+ required
- **pnpm** for package management (workspace)
- **TypeScript** for type safety
- **ESLint + Prettier** for code quality
- **Tailwind CSS** for styling

**Note**: We use pnpm for local development, but packages are published to npm. Both work seamlessly together!

## 🌐 Online Playground

Try IndoriLang instantly in your browser at [https://indori-lang.netlify.app](https://indori-lang.netlify.app)

Features:

- ✨ Monaco Editor with syntax highlighting
- 🚀 Real-time compilation and execution
- 🔗 Shareable URLs for your code
- 📚 Built-in examples
- 🎨 Beautiful Tailwind CSS UI
- 📱 Mobile responsive design

## 📦 Packages

### @indori-lang/compiler

Core TypeScript compiler and transpiler

```bash
npm install @indori-lang/compiler
```

### @indori-lang/cli

Command-line interface

```bash
npm install -g @indori-lang/cli
```

## 🔧 CLI Commands

```bash
# Run IndoriLang file
indori run program.il

# Compile to JavaScript
indori compile program.il output.js

# Show version
indori version

# Show help
indori help
```

## 🎨 VS Code Extension

Install from VS Code Marketplace or search for "IndoriLang". The extension source lives in `packages/vscode-extension/`. To package a `.vsix` from the repo: `pnpm run package:vscode`.

Features:

- 🎨 Syntax highlighting for `.il` files
- 🔄 Auto bracket closing
- 📝 Auto-indentation
- 🎯 Snippets for common patterns

## 📚 Examples

Check the [`examples/`](./examples) directory for complete programs:

- [`hello.il`](./examples/hello.il) - Hello World
- [`condition.il`](./examples/condition.il) - Conditionals and logic
- [`loop.il`](./examples/loop.il) - Various loop types
- [`array.il`](./examples/array.il) - Array operations
- [`object.il`](./examples/object.il) - Object manipulation
- [`complex.il`](./examples/complex.il) - Complete program with all features

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Playground**: [https://indori-lang.netlify.app](https://indori-lang.netlify.app)
- **GitHub**: [https://github.com/amit373/indori-lang](https://github.com/amit373/indori-lang)
- **NPM Compiler**: [@indori-lang/compiler](https://www.npmjs.com/package/@indori-lang/compiler)
- **NPM CLI**: [@indori-lang/cli](https://www.npmjs.com/package/@indori-lang/cli)
- **VS Code Marketplace**: [IndoriLang Extension](https://marketplace.visualstudio.com/items?itemName=indori-lang.indori-lang)

---

**Made with ❤️ and lots of poha for the Indori community!**

> *"IndoriLang se coding me maja aa gaya re!"* - Happy Coding! 🍚
